
"use client";

import { SidebarProvider, Sidebar, SidebarInset, MobileHeader } from "@/components/ui/sidebar";
import { DashboardNav } from "@/components/dashboard-nav";
import { Logo } from "@/components/logo";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (error) {
      console.error("Authentication error:", error);
      router.push('/login');
    }
  }, [user, loading, error, router]);

  // While loading the user state, show a spinner. This prevents a flash of content
  // or a premature redirect before the auth state is resolved.
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  // If a user is logged in, render the dashboard.
  if (user) {
    return (
      <div className="flex">
          <SidebarProvider>
              <Sidebar>
                <DashboardNav />
              </Sidebar>
              <SidebarInset>
                {children}
              </SidebarInset>
          </SidebarProvider>
      </div>
    );
  }
  
  // If no user and not loading (i.e., redirect is imminent), show a loader to prevent flashing content.
  // This state is hit just before the useEffect hook triggers the redirect.
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader className="h-12 w-12 animate-spin" />
    </div>
  );
}
