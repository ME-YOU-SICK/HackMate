
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

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (!user) {
    // This state will be brief before the useEffect redirects.
    // Showing a loader here prevents a flash of content.
     return (
       <div className="flex h-screen items-center justify-center">
        <Loader className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  // If loading is false and a user exists, render the dashboard.
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
