
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
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (error) {
    // You might want to show an error message before redirecting
    router.push('/login');
    return null;
  }
  
  if (!user) {
    // This is a fallback in case the useEffect doesn't run fast enough
    return null;
  }

  return (
    <SidebarProvider>
        <Sidebar>
          <DashboardNav />
        </Sidebar>
        <SidebarInset>
           <MobileHeader>
                <Logo isCollapsed={true} />
            </MobileHeader>
          {children}
        </SidebarInset>
    </SidebarProvider>
  );
}
