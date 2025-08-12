
"use client";

import { SidebarProvider, Sidebar, SidebarInset, MobileHeader } from "@/components/ui/sidebar";
import { DashboardNav } from "@/components/dashboard-nav";
import { Logo } from "@/components/logo";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
        setInitialLoad(false);
    }, 1500); // A buffer to ensure Firebase auth state is synced

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && !user && !initialLoad) {
      router.push('/login');
    }
    if (error) {
      console.error("Authentication error:", error);
      router.push('/login');
    }
  }, [user, loading, error, router, initialLoad]);

  if (loading || initialLoad) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="h-12 w-12 animate-spin" />
      </div>
    );
  }

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
  
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader className="h-12 w-12 animate-spin" />
    </div>
  );
}
