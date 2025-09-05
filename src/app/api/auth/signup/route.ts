import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { mockUserStorage } from '@/lib/mock-users';

// Signup validation schema
const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
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

// Signup API endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input data
    const validatedData = signupSchema.parse(body);

    // Check if email already exists
    const existingUser = mockUserStorage.findByEmail(validatedData.email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }

    // Create new user
    const user = mockUserStorage.create({
      email: validatedData.email,
      password: validatedData.password,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      role: validatedData.role,
    });

    // Generate token
    const token = generateToken(user.id);

    // Return user data and token (without password)
    const { password, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token,
      message: 'Account created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    
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