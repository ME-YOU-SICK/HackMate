import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { mockUserStorage } from '@/lib/mock-users';

// Signin validation schema
const signinSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  role: z.enum(['participant', 'organizer', 'recruiter', 'sponsor']),
});

// Simple JWT-like token generation (for demo purposes)
function generateToken(userId: string): string {
  const payload = {
    userId,
    iat: Date.now(),
    exp: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

// Signin API endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input data
    const validatedData = signinSchema.parse(body);

    // Find user in mock storage
    const user = mockUserStorage.findByCredentials(validatedData.email, validatedData.password);

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

    // Generate token
    const token = generateToken(user.id);

    // Return user data and token (without password)
    const { password, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token,
      message: 'Signed in successfully'
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