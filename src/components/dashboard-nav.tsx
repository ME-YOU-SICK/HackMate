"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarTrigger,
} from "./ui/sidebar";
import { LayoutDashboard, Users, BrainCircuit, Calendar, User, Settings, LogOut } from "lucide-react";
import { Logo } from "./logo";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/find-team", icon: BrainCircuit, label: "Find a Team" },
  { href: "/dashboard/events", icon: Calendar, label: "Events" },
  { href: "/dashboard/profile", icon: User, label: "Profile" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center justify-between">
           <Logo />
           <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <div className="flex items-center gap-3 p-2">
            <Avatar>
                <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="profile picture" />
                <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="text-sm font-semibold">Ada Lovelace</span>
                <span className="text-xs text-muted-foreground">Participant</span>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto" asChild>
              <Link href="/">
                <LogOut />
              </Link>
            </Button>
        </div>
      </SidebarFooter>
    </>
  );
}
