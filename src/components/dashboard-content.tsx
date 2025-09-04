"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GlowingCard } from "@/components/ui/glowing-card";
import { 
  Calendar, 
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
  Plus,
  Search,
  Star
} from "lucide-react";

interface DashboardContentProps {
  userRole: "participant" | "organizer" | "recruiter" | "sponsor";
  children?: React.ReactNode;
}

export function DashboardContent({ userRole, children }: DashboardContentProps) {
  const getWelcomeMessage = () => {
    switch (userRole) {
      case "participant":
        return {
          title: "Welcome to Your Hackathon Journey",
          subtitle: "Discover events, build skills, and connect with amazing teams",
          stats: [
            { label: "Events Joined", value: "12" },
            { label: "Skills Learned", value: "8" },
            { label: "Teams Formed", value: "5" },
            { label: "Projects Built", value: "3" }
          ]
        };
      case "organizer":
        return {
          title: "Event Management Hub",
          subtitle: "Create, manage, and analyze your hackathon events",
          stats: [
            { label: "Events Hosted", value: "6" },
            { label: "Total Participants", value: "1,247" },
            { label: "Active Events", value: "2" },
            { label: "Sponsors", value: "15" }
          ]
        };
      case "recruiter":
        return {
          title: "Talent Discovery Center",
          subtitle: "Find and connect with top hackathon talent",
          stats: [
            { label: "Candidates Viewed", value: "342" },
            { label: "Interviews Scheduled", value: "28" },
            { label: "Offers Made", value: "12" },
            { label: "Hires", value: "8" }
          ]
        };
      case "sponsor":
        return {
          title: "Sponsorship Analytics",
          subtitle: "Track your investment and discover new opportunities",
          stats: [
            { label: "Events Sponsored", value: "24" },
            { label: "Total Investment", value: "$125K" },
            { label: "ROI", value: "340%" },
            { label: "Brand Reach", value: "15K" }
          ]
        };
      default:
        return {
          title: "Dashboard",
          subtitle: "Welcome to HackMate",
          stats: []
        };
    }
  };

  const welcomeData = getWelcomeMessage();

  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-6 flex-1 w-full h-full">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
            {welcomeData.title}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg">
            {welcomeData.subtitle}
          </p>
        </motion.div>

        {/* Stats Grid */}
        {welcomeData.stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {welcomeData.stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#FAF000]/5 to-[#FFA100]/5 dark:from-neutral-800 dark:to-neutral-700 p-6 rounded-xl border border-neutral-200 dark:border-neutral-600"
              >
                <div className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getQuickActions(userRole).map((action, index) => (
              <div key={index} className="h-[200px]">
                <GlowingCard
                  icon={action.icon}
                  title={action.title}
                  description={action.description}
                  onClick={action.onClick}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-600">
            <div className="space-y-4">
              {getRecentActivity(userRole).map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#FFA100] rounded-full"></div>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {activity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Custom Content */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function getQuickActions(userRole: string) {
  switch (userRole) {
    case "participant":
      return [
        {
          title: "Join Event",
          description: "Discover and join upcoming hackathons",
          icon: <Calendar className="h-4 w-4" />,
          onClick: () => console.log("Join Event clicked")
        },
        {
          title: "Update Skills",
          description: "Add new skills to your profile",
          icon: <Target className="h-4 w-4" />,
          onClick: () => console.log("Update Skills clicked")
        },
        {
          title: "Find Team",
          description: "Connect with potential teammates",
          icon: <Users className="h-4 w-4" />,
          onClick: () => console.log("Find Team clicked")
        }
      ];
    case "organizer":
      return [
        {
          title: "Create Event",
          description: "Set up a new hackathon event",
          icon: <Plus className="h-4 w-4" />,
          onClick: () => console.log("Create Event clicked")
        },
        {
          title: "Manage Teams",
          description: "Oversee team formation and activities",
          icon: <Users className="h-4 w-4" />,
          onClick: () => console.log("Manage Teams clicked")
        },
        {
          title: "Send Announcement",
          description: "Communicate with participants",
          icon: <Megaphone className="h-4 w-4" />,
          onClick: () => console.log("Send Announcement clicked")
        }
      ];
    case "recruiter":
      return [
        {
          title: "Post Job",
          description: "Create a new job posting",
          icon: <Briefcase className="h-4 w-4" />,
          onClick: () => console.log("Post Job clicked")
        },
        {
          title: "Browse Candidates",
          description: "Find talented developers",
          icon: <Search className="h-4 w-4" />,
          onClick: () => console.log("Browse Candidates clicked")
        },
        {
          title: "Schedule Interview",
          description: "Set up candidate interviews",
          icon: <MessageSquare className="h-4 w-4" />,
          onClick: () => console.log("Schedule Interview clicked")
        }
      ];
    case "sponsor":
      return [
        {
          title: "Find Events",
          description: "Discover hackathons to sponsor",
          icon: <Calendar className="h-4 w-4" />,
          onClick: () => console.log("Find Events clicked")
        },
        {
          title: "View Analytics",
          description: "Check your sponsorship ROI",
          icon: <BarChart3 className="h-4 w-4" />,
          onClick: () => console.log("View Analytics clicked")
        },
        {
          title: "Send Invitation",
          description: "Invite organizers to apply",
          icon: <FileText className="h-4 w-4" />,
          onClick: () => console.log("Send Invitation clicked")
        }
      ];
    default:
      return [];
  }
}

function getRecentActivity(userRole: string) {
  switch (userRole) {
    case "participant":
      return [
        "Joined 'AI Innovation Hackathon'",
        "Completed React.js skill assessment",
        "Connected with 3 new team members",
        "Submitted project for 'Web3 Challenge'"
      ];
    case "organizer":
      return [
        "Created 'Blockchain Hackathon 2024'",
        "Sent announcement to 150 participants",
        "Approved 12 team formations",
        "Updated event schedule"
      ];
    case "recruiter":
      return [
        "Posted 'Senior Frontend Developer' position",
        "Scheduled interview with Sarah Chen",
        "Reviewed 8 candidate profiles",
        "Made offer to Alex Rodriguez"
      ];
    case "sponsor":
      return [
        "Sponsored 'Tech Innovation Summit'",
        "Received ROI report for Q4 events",
        "Invited 5 organizers to apply",
        "Updated sponsorship package"
      ];
    default:
      return [];
  }
}
