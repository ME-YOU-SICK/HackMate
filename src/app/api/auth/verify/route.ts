import { NextRequest, NextResponse } from 'next/server';

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

      // For demo purposes, return a mock user based on userId
      const mockUsers = {
        '1': {
          id: '1',
          email: 'participant@demo.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'participant',
        },
        '2': {
          id: '2',
          email: 'organizer@demo.com',
          firstName: 'Jane',
          lastName: 'Smith',
          role: 'organizer',
        },
        '3': {
          id: '3',
          email: 'recruiter@demo.com',
          firstName: 'Mike',
          lastName: 'Johnson',
          role: 'recruiter',
        },
        '4': {
          id: '4',
          email: 'sponsor@demo.com',
          firstName: 'Sarah',
          lastName: 'Wilson',
          role: 'sponsor',
        },
      };

      const user = mockUsers[payload.userId as keyof typeof mockUsers];
      
      if (!user) {
        return NextResponse.json(
          { error: 'Invalid token' },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        user,
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