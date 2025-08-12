
"use client";

import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { DashboardNav } from "@/components/dashboard-nav";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { Loader } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (error) {
     return (
       <div className="flex h-screen items-center justify-center">
        <p>An error occurred: {error.message}. Please try again later.</p>
      </div>
    )
  }

  if (!user) {
    // We can't redirect from here as it causes loops.
    // The page components themselves should handle auth checks if needed,
    // or a middleware approach should be used. For now, we prevent the redirect.
    // A user seeing this page without being logged in should be an edge case
    // if entry points (login, signup) work correctly.
     return (
       <div className="flex h-screen items-center justify-center">
        <Loader className="h-12 w-12 animate-spin" />
        <p className="ml-4">Authenticating...</p>
      </div>
    )
  }
  
  // User is authenticated, render the dashboard layout
  return (
    <>
        <SidebarProvider>
            <Sidebar>
              <DashboardNav />
            </Sidebar>
            <SidebarInset>
              {children}
            </SidebarInset>
        </SidebarProvider>
    </>
  );
}
