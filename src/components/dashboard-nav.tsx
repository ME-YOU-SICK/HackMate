
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
  SidebarUser,
} from "./sidebar";
import { LayoutDashboard, BrainCircuit, Calendar, User, Settings, LogOut } from "lucide-react";
import { Logo } from "./logo";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { signOutAction } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu";

const navItems = [
  { href: "/dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
  { href: "/dashboard/find-team", icon: <BrainCircuit />, label: "Find a Team" },
  { href: "/dashboard/events", icon: <Calendar />, label: "Events" },
];

const bottomNavItems = [
    { href: "/dashboard/profile", icon: <User />, label: "Profile" },
    { href: "/dashboard/settings", icon: <Settings />, label: "Settings" },
]

export function DashboardNav() {
  const pathname = usePathname();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const { isCollapsed } = useSidebar();

  const handleSignOut = async () => {
    await signOutAction();
    router.push('/login');
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  return (
    <>
      <SidebarHeader>
        <Logo />
        <div className="flex items-center">
            <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem 
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                isActive={pathname === item.href}
                isCollapsed={isCollapsed}
                asChild
            >
                <Link href={item.href} />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="mt-auto">
            {bottomNavItems.map((item) => (
                <SidebarMenuItem 
                    key={item.href}
                    href={item.href}
                    icon={item.icon}
                    label={item.label}
                    isActive={pathname === item.href}
                    isCollapsed={isCollapsed}
                    asChild
                >
                    <Link href={item.href} />
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
        <div className="border-t -mx-4 my-4" />
        {user && (
            <SidebarUser user={{ name: user.displayName, email: user.email, image: user.photoURL }}>
                <Avatar>
                    <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? "User"} />
                    <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                </Avatar>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                </DropdownMenuItem>
            </SidebarUser>
        )}
      </SidebarFooter>
    </>
  );
}
