"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserRole } from '@/lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  fallbackPath?: string;
}

export default function ProtectedRoute({ 
  children, 
  requiredRole, 
  fallbackPath = '/' 
}: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (isLoading) return;
      
      setIsChecking(false);
      
      if (!isAuthenticated) {
        // User is not authenticated, redirect to signin
        router.push('/signin');
        return;
      }

      if (!user) {
        router.push('/signin');
        return;
      }

      // Extract role from current path
      const pathRole = extractRoleFromPath(pathname);
      
      if (pathRole && user.role !== pathRole) {
        // User is trying to access a different role's routes
        console.warn(`Access denied: User with role '${user.role}' tried to access '${pathRole}' routes`);
        router.push('/');
        return;
      }

      if (requiredRole && user.role !== requiredRole) {
        // User doesn't have the required role, redirect to their dashboard
        router.push(`/${user.role}/dashboard`);
        return;
      }
    };

    checkAccess();
  }, [isLoading, isAuthenticated, user, requiredRole, pathname, router]);

  // Show loading spinner while checking authentication
  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#FAF000]/20 border-t-[#FAF000] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated or wrong role
  if (!isAuthenticated || !user) {
    return null;
  }

  // Check role-based access
  const pathRole = extractRoleFromPath(pathname);
  if (pathRole && user.role !== pathRole) {
    return null;
  }

  if (requiredRole && user.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}

function extractRoleFromPath(pathname: string): UserRole | null {
  if (pathname.startsWith('/participant')) return 'participant';
  if (pathname.startsWith('/organizer')) return 'organizer';
  if (pathname.startsWith('/recruiter')) return 'recruiter';
  if (pathname.startsWith('/sponsor')) return 'sponsor';
  return null;
}