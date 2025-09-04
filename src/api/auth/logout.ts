import { NextRequest, NextResponse } from 'next/server';
import { deleteSession } from '@/lib/db-auth';

// Logout API endpoint
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No authorization token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // Delete session
    const success = await deleteSession(token);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Invalid token or session not found' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });

  } catch (error) {
    console.error('Logout error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
