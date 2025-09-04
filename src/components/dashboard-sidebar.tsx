"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  User, 
  Calendar, 
  Map, 
  Target, 
  Users, 
  BookOpen, 
  HelpCircle,
  Settings,
  Briefcase,
  UserCheck,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Megaphone,
  FileText,
  BarChart3,
  Lightbulb,
  MessageCircle,
  LogOut
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";

interface DashboardSidebarProps {
  userRole: "participant" | "organizer" | "recruiter" | "sponsor";
  userName?: string;
  userAvatar?: string;
}

export function DashboardSidebar({ userRole, userName = "User", userAvatar }: DashboardSidebarProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    auth.logout();
    router.push("/signin");
  };

  // Role-based navigation links
  const getBasePath = () => {
    switch (userRole) {
      case "participant": return "/participant/dashboard";
      case "organizer": return "/organizer/dashboard";
      case "recruiter": return "/recruiter/dashboard";
      case "sponsor": return "/sponsor/dashboard";
      default: return "/participant/dashboard";
    }
  };

  const getNavigationLinks = () => {
    const basePath = getBasePath();
    
    const baseLinks = [
      {
        label: "Dashboard",
        href: basePath,
        icon: <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      },
      {
        label: "Profile",
        href: `${basePath}/profile`,
        icon: <User className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      }
    ];

    switch (userRole) {
      case "participant":
        return [
          ...baseLinks,
          {
            label: "Events",
            href: `${basePath}/events`,
            icon: <Calendar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          },
          {
            label: "Roadmaps",
            href: `${basePath}/roadmaps`,
            icon: <Map className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          },
          {
            label: "Skills Tracker",
            href: `${basePath}/skills`,
            icon: <Target className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          },
          {
            label: "Teamify",
            href: `${basePath}/teamify`,
            icon: <Users className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          },
          {
            label: "Extra Resources",
            href: `${basePath}/resources`,
            icon: <BookOpen className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          },
          {
            label: "Quizzes",
            href: `${basePath}/quizzes`,
            icon: <HelpCircle className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          }
        ];

      case "organizer":
        return [
          ...baseLinks,
          {
            label: "Events",
            href: `${basePath}/events`,
            icon: <Calendar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          },
          {
            label: "Teamify",
            href: `${basePath}/teamify`,
            icon: <Users className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          },
          {
            label: "Manager",
            href: `${basePath}/manager`,
            icon: <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          },
          {
            label: "Sponsorship",
            href: `${basePath}/sponsorship`,
            icon: <DollarSign className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          },
          {
            label: "Announcements",
            href: `${basePath}/announcements`,
            icon: <Megaphone className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          }
        ];

      case "recruiter":
        return [
          ...baseLinks,
          {
            label: "Postings",
            href: `${basePath}/postings`,
            icon: <Briefcase className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          },
          {
            label: "Candidates",
            href: `${basePath}/candidates`,
            icon: <UserCheck className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          },
          {
            label: "Interview Kits",
            href: `${basePath}/interviews`,
            icon: <MessageSquare className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          },
          {
            label: "Connections",
            href: `${basePath}/connections`,
            icon: <Users className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          }
        ];

      case "sponsor":
        return [
          ...baseLinks,
          {
            label: "Invitations",
            href: `${basePath}/invitations`,
            icon: <FileText className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          },
          {
            label: "Analytics",
            href: `${basePath}/analytics`,
            icon: <BarChart3 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          },
          {
            label: "WhoToFund Guide",
            href: `${basePath}/guide`,
            icon: <Lightbulb className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          }
        ];

      default:
        return baseLinks;
    }
  };

  const links = getNavigationLinks();

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {open ? <Logo userRole={userRole} /> : <LogoIcon userRole={userRole} />}
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <SidebarLink
            link={{
              label: "Messages",
              href: `${getBasePath()}/messages`,
              icon: <MessageCircle className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            }}
          />
          <SidebarLink
            link={{
              label: userName,
              href: `${getBasePath()}/profile`,
              icon: userAvatar ? (
                <Image
                  src={userAvatar}
                  className="h-7 w-7 flex-shrink-0 rounded-full"
                  width={50}
                  height={50}
                  alt="Avatar"
                />
              ) : (
                <div className="h-7 w-7 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>
              ),
            }}
          />
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

export const Logo = ({ userRole }: { userRole?: string }) => {
  const getBasePath = () => {
    switch (userRole) {
      case "participant": return "/participant/dashboard";
      case "organizer": return "/organizer/dashboard";
      case "recruiter": return "/recruiter/dashboard";
      case "sponsor": return "/sponsor/dashboard";
      default: return "/participant/dashboard";
    }
  };

  return (
    <Link
      href={getBasePath()}
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        HackMate
      </motion.span>
    </Link>
  );
};

export const LogoIcon = ({ userRole }: { userRole?: string }) => {
  const getBasePath = () => {
    switch (userRole) {
      case "participant": return "/participant/dashboard";
      case "organizer": return "/organizer/dashboard";
      case "recruiter": return "/recruiter/dashboard";
      case "sponsor": return "/sponsor/dashboard";
      default: return "/participant/dashboard";
    }
  };

  return (
    <Link
      href={getBasePath()}
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
