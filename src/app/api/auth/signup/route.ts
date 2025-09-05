import { NextRequest, NextResponse } from 'next/server';
import { createUser, emailExists } from '@/lib/db-auth';
import { demoSignup } from '@/lib/demo-auth';
import { z } from 'zod';

// API input validation schema
const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  role: z.enum(['participant', 'organizer', 'recruiter', 'sponsor']),
});

// Check if we're in a serverless environment
const isServerless = process.env.NETLIFY || process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;

// Signup API endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input data
    const validatedData = signupSchema.parse(body);

    // Use demo authentication in serverless environments
    if (isServerless) {
      const result = await demoSignup({
        email: validatedData.email,
        password: validatedData.password,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        role: validatedData.role,
      });
      
      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: result.error === 'Email already exists' ? 409 : 400 }
        );
      }

      return NextResponse.json({
        success: true,
        user: result.user,
        message: result.message
      }, { status: 201 });
    }

    // Use database authentication in local development
    try {
      // Check if email already exists
      if (await emailExists(validatedData.email)) {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 400 }
        );
      }

      // Create user
      const user = await createUser({
        email: validatedData.email,
        password: validatedData.password,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        role: validatedData.role,
      });

      // Return user data (without password hash)
      const { passwordHash, ...userWithoutPassword } = user;
      
      return NextResponse.json({
        success: true,
        user: userWithoutPassword,
        message: 'User created successfully'
      });
    } catch (dbError) {
      console.error('Database error, falling back to demo auth:', dbError);
      
      // Fallback to demo authentication if database fails
      const result = await demoSignup({
        email: validatedData.email,
        password: validatedData.password,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        role: validatedData.role,
      });
      
      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: result.error === 'Email already exists' ? 409 : 400 }
        );
      }

      return NextResponse.json({
        success: true,
        user: result.user,
        message: result.message
      }, { status: 201 });
    }

  } catch (error) {
    console.error('Signup error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
