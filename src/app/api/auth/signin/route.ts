import { NextRequest, NextResponse } from 'next/server';
import { verifyUser, createSession } from '@/lib/db-auth';
import { demoSignin } from '@/lib/demo-auth';
import { z } from 'zod';

// Signin validation schema
const signinSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  role: z.enum(['participant', 'organizer', 'recruiter', 'sponsor']),
});

// Check if we're in a serverless environment
const isServerless = process.env.NETLIFY || process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;

// Signin API endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input data
    const validatedData = signinSchema.parse(body);

    // Use demo authentication in serverless environments
    if (isServerless) {
      const result = await demoSignin(validatedData.email, validatedData.password, validatedData.role);
      
      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: result.error === 'Invalid email or password' ? 401 : 403 }
        );
      }

      return NextResponse.json({
        success: true,
        user: result.user,
        token: result.token,
        message: result.message
      });
    }

    // Use database authentication in local development
    try {
      // Verify user credentials
      const user = await verifyUser(validatedData.email, validatedData.password);
      
      if (!user) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }

      // Check if user role matches
      if (user.role !== validatedData.role) {
        return NextResponse.json(
          { error: 'Invalid role for this account' },
          { status: 403 }
        );
      }

      // Create session
      const { token, session } = await createSession(user.id);

      // Return user data and token (without password hash)
      const { passwordHash, ...userWithoutPassword } = user;
      
      return NextResponse.json({
        success: true,
        user: userWithoutPassword,
        token,
        message: 'Sign in successful'
      });
    } catch (dbError) {
      console.error('Database error, falling back to demo auth:', dbError);
      
      // Fallback to demo authentication if database fails
      const result = await demoSignin(validatedData.email, validatedData.password, validatedData.role);
      
      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: result.error === 'Invalid email or password' ? 401 : 403 }
        );
      }

      return NextResponse.json({
        success: true,
        user: result.user,
        token: result.token,
        message: result.message
      });
    }

  } catch (error) {
    console.error('Signin error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
