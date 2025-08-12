
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarMenuButton,
} from "./ui/sidebar";
import { LayoutDashboard, BrainCircuit, Calendar, User, Settings, LogOut, MoreHorizontal } from "lucide-react";
import { Logo } from "./logo";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { signOutAction } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { SheetClose } from "./ui/sheet";

const navItems = [
  { href: "/dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
  { href: "/dashboard/find-team", icon: <BrainCircuit />, label: "Find a Team" },
  { href: "/dashboard/events", icon: <Calendar />, label: "Events" },
  { href: "/dashboard/profile", icon: <User />, label: "Profile" },
  { href: "/dashboard/settings", icon: <Settings />, label: "Settings" },
];

export function DashboardNav() {
  const pathname = usePathname();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const { state: sidebarState } = useSidebar();
  const isCollapsed = sidebarState === 'collapsed';

  const handleSignOut = async () => {
    await signOutAction();
    router.push('/login');
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  const NavLink = ({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) => (
      <SidebarMenuItem>
          <Link href={href} passHref legacyBehavior>
              <SidebarMenuButton
                  isActive={pathname === href}
                  isCollapsed={isCollapsed}
                  tooltip={label}
                  asChild
              >
                  <a>
                      {icon}
                      <span>{label}</span>
                  </a>
              </SidebarMenuButton>
          </Link>
      </SidebarMenuItem>
  );

  return (
    <>
      <SidebarHeader isCollapsed={isCollapsed}>
        <Logo isCollapsed={isCollapsed} />
        <SidebarTrigger className="hidden md:flex" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter isCollapsed={isCollapsed}>
         {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start p-2"
                >
                  <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? "User"} />
                      <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                  </Avatar>
                  {!isCollapsed && (
                    <div className="ml-3 text-left">
                      <p className="font-semibold text-sm">{user.displayName}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  )}
                   {!isCollapsed && <MoreHorizontal className="ml-auto h-5 w-5"/>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mb-2" align="end">
                <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
         )}
      </SidebarFooter>
    </>
  );
}
