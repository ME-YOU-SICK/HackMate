import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/db-auth';
import { demoVerifyToken } from '@/lib/demo-auth';

// Check if we're in a serverless environment
const isServerless = process.env.NETLIFY || process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;

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
    
    // Use demo authentication in serverless environments
    if (isServerless) {
      const result = await demoVerifyToken(token);
      
      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        user: result.user,
        message: result.message
      });
    }

    // Use database authentication in local development
    try {
      // Verify session
      const user = await verifySession(token);
      
      if (!user) {
        return NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        );
      }

      // Return user data (without password hash)
      const { passwordHash, ...userWithoutPassword } = user;
      
      return NextResponse.json({
        success: true,
        user: userWithoutPassword,
        message: 'Token is valid'
      });
    } catch (dbError) {
      console.error('Database error, falling back to demo auth:', dbError);
      
      // Fallback to demo authentication if database fails
      const result = await demoVerifyToken(token);
      
      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        user: result.user,
        message: result.message
      });
    }

  } catch (error) {
    console.error('Token verification error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
