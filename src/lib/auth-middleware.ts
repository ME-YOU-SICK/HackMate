import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { verifySession } from './db-auth';
import { UserRole } from './auth';

export interface AuthenticatedUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isVerified: boolean;
  isActive: boolean;
}

export async function authenticateRequest(request: NextRequest): Promise<AuthenticatedUser | null> {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // Verify session with database
    const user = await verifySession(token);
    
    if (!user) {
      return null;
    }

    // Return user data (without password hash)
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword as AuthenticatedUser;
    
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export function requireRole(user: AuthenticatedUser | null, allowedRoles: UserRole[]): boolean {
  if (!user) return false;
  return allowedRoles.includes(user.role);
}

export function requireAuth(user: AuthenticatedUser | null): boolean {
  return user !== null && user.isActive;
}

export function requireVerified(user: AuthenticatedUser | null): boolean {
  return user !== null && user.isActive && user.isVerified;
}
