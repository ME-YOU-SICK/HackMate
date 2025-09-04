"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserRole } from '@/lib/auth';

interface RoleProtectedLayoutProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallbackPath?: string;
}

export default function RoleProtectedLayout({ 
  children, 
  allowedRoles, 
  fallbackPath = '/' 
}: RoleProtectedLayoutProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      if (isLoading) return;
      
      setIsChecking(false);
      
      if (!isAuthenticated || !user) {
        // User is not authenticated, redirect to signin
        router.push('/signin');
        return;
      }

      // Check if user's role is allowed
      if (!allowedRoles.includes(user.role)) {
        console.warn(`Access denied: User with role '${user.role}' tried to access routes allowed for: ${allowedRoles.join(', ')}`);
        setAccessDenied(true);
        
        // Redirect to appropriate page based on user role
        setTimeout(() => {
          if (user.role === 'participant') {
            router.push('/participant/dashboard');
          } else if (user.role === 'organizer') {
            router.push('/organizer/dashboard');
          } else if (user.role === 'recruiter') {
            router.push('/recruiter/dashboard');
          } else if (user.role === 'sponsor') {
            router.push('/sponsor/dashboard');
          } else {
            router.push('/');
          }
        }, 2000);
        return;
      }
    };

    checkAccess();
  }, [isLoading, isAuthenticated, user, allowedRoles, router]);

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

  // Show access denied message
  if (accessDenied) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-white/70 mb-6">
            You don't have permission to access this area. You'll be redirected to your dashboard shortly.
          </p>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-[#FAF000] h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated or wrong role
  if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
