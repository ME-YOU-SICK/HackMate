
"use client";

import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { DashboardNav } from "@/components/dashboard-nav";
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
  }, [user, loading, router]);

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
        <p>An error occurred. Please try again later.</p>
      </div>
    )
  }

  if (!user) {
    // This can show briefly before the redirect happens, or if the redirect fails.
    // Or it can be a loader itself while redirecting.
    return (
       <div className="flex h-screen items-center justify-center">
        <Loader className="h-12 w-12 animate-spin" />
        <p className="ml-4">Redirecting to login...</p>
      </div>
    )
  }
  
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
