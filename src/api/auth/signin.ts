import { NextRequest, NextResponse } from 'next/server';
import { verifyUser, createSession } from '@/lib/db-auth';
import { z } from 'zod';

// Signin validation schema
const signinSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  role: z.enum(['participant', 'organizer', 'recruiter', 'sponsor']),
});

// Signin API endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input data
    const validatedData = signinSchema.parse(body);

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
