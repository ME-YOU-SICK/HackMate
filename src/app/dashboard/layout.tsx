import { SidebarProvider, Sidebar, SidebarInset, MobileHeader } from "@/components/ui/sidebar";
import { DashboardNav } from "@/components/dashboard-nav";
import { Logo } from "@/components/logo";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
