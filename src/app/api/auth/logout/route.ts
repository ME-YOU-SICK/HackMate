import { NextRequest, NextResponse } from 'next/server';
import { deleteSession } from '@/lib/db-auth';
import { demoLogout } from '@/lib/demo-auth';

// Check if we're in a serverless environment
const isServerless = process.env.NETLIFY || process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;

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
    
    // Use demo authentication in serverless environments
    if (isServerless) {
      const result = await demoLogout(token);
      
      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        message: result.message
      });
    }

    // Use database authentication in local development
    try {
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
    } catch (dbError) {
      console.error('Database error, falling back to demo auth:', dbError);
      
      // Fallback to demo authentication if database fails
      const result = await demoLogout(token);
      
      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        message: result.message
      });
    }

  } catch (error) {
    console.error('Logout error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
