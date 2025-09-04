import { NextRequest, NextResponse } from 'next/server';
import { createUser, emailExists } from '@/lib/db-auth';
import { insertUserSchema } from '@/db/schema/auth';
import { z } from 'zod';

// Signup API endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input data
    const validatedData = insertUserSchema.parse({
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      role: body.role,
      password: body.password, // This will be validated but not stored in the schema
    });

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
      password: body.password, // Use original password for hashing
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
