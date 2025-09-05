import { NextRequest, NextResponse } from 'next/server';
import { mockUserStorage } from '@/lib/mock-users';

// Verify token API endpoint
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No authorization token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    try {
      // Decode the simple token
      const payload = JSON.parse(Buffer.from(token, 'base64').toString());
      
      // Check if token is expired
      if (payload.exp && Date.now() > payload.exp) {
        return NextResponse.json(
          { error: 'Token expired' },
          { status: 401 }
        );
      }

      // Find user by ID
      const user = mockUserStorage.findById(payload.userId);
      
      if (!user) {
        return NextResponse.json(
          { error: 'Invalid token' },
          { status: 401 }
        );
      }

      // Return user data (without password)
      const { password, ...userWithoutPassword } = user;

      return NextResponse.json({
        success: true,
        user: userWithoutPassword,
        message: 'Token is valid'
      });
    } catch (decodeError) {
      return NextResponse.json(
        { error: 'Invalid token format' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Token verification error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}