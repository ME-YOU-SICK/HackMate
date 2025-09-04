"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Briefcase, 
  MessageCircle, 
  TrendingUp, 
  Calendar, 
  Star, 
  CheckCircle, 
  Clock, 
  Target, 
  Award, 
  Bell, 
  Plus, 
  Eye, 
  Edit, 
  BarChart3, 
  PieChart, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  UserPlus,
  FileText,
  Settings,
  ExternalLink,
  User
} from "lucide-react";
import Link from "next/link";
import { GlowingCard } from "@/components/ui/glowing-card";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default function RecruiterDashboardPage() {
  const userRole = "recruiter";
  const userName = "Alex Thompson";
  const userAvatar = undefined;

  const [showNotifications, setShowNotifications] = useState(false);

  const quickActions = [
    {
      title: "Create Job Posting",
      description: "Post a new job opportunity",
      icon: <Plus className="h-5 w-5" />,
      href: "/recruiter/dashboard/postings",
      color: "bg-blue-500"
    },
    {
      title: "View Candidates",
      description: "Review job applicants",
      icon: <Users className="h-5 w-5" />,
      href: "/recruiter/dashboard/candidates",
      color: "bg-blue-600"
    },
    {
      title: "Schedule Interview",
      description: "Set up candidate interviews",
      icon: <Calendar className="h-5 w-5" />,
      href: "/recruiter/dashboard/interviews",
      color: "bg-blue-700"
    },
    {
      title: "View Connections",
      description: "Manage your network",
      icon: <UserPlus className="h-5 w-5" />,
      href: "/recruiter/dashboard/connections",
      color: "bg-blue-800"
    }
  ];

  const analytics = {
    totalCandidates: 1250,
    activePostings: 8,
    interviewsScheduled: 24,
    successfulPlacements: 47,
    successRate: 94,
    averageTimeToHire: 18,
    clientSatisfaction: 4.8,
    monthlyGrowth: 12
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50/30 to-blue-50/20 dark:from-neutral-900 dark:via-blue-900/20 dark:to-blue-900/10">
      <div className="flex flex-col md:flex-row bg-white dark:bg-neutral-900 w-full h-screen border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <DashboardSidebar userRole={userRole} userName={userName} userAvatar={userAvatar} />
        
        <div className="w-px bg-neutral-200 dark:bg-neutral-700"></div>
        
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                    Welcome back, Alex! 👋
                  </h1>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Here's what's happening with your recruiting activities today
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href="/recruiter/dashboard/profile"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    View Profile
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                      className="p-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 ${action.color} rounded-lg text-white`}>
                          {action.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {action.title}
                          </h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            {action.description}
                          </p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-neutral-400 group-hover:text-blue-500 transition-colors" />
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Analytics Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                Performance Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Total Candidates</p>
                      <p className="text-2xl font-bold text-neutral-900 dark:text-white">{analytics.totalCandidates.toLocaleString()}</p>
                    </div>
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-blue-600 dark:text-blue-400">+{analytics.monthlyGrowth}% this month</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Active Postings</p>
                      <p className="text-2xl font-bold text-neutral-900 dark:text-white">{analytics.activePostings}</p>
                    </div>
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <Link href="/recruiter/dashboard/postings" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                      Manage postings →
                    </Link>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Success Rate</p>
                      <p className="text-2xl font-bold text-neutral-900 dark:text-white">{analytics.successRate}%</p>
                    </div>
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="h-4 w-4 text-blue-500 fill-current" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">{analytics.clientSatisfaction}/5.0 rating</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Avg. Time to Hire</p>
                      <p className="text-2xl font-bold text-neutral-900 dark:text-white">{analytics.averageTimeToHire} days</p>
                    </div>
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowDownRight className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-blue-600 dark:text-blue-400">-3 days vs last month</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity & Upcoming Interviews */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <GlowingCard
                  icon={<Activity className="h-5 w-5" />}
                  title="Recent Activity"
                  description="Latest updates and actions"
                >
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                      <div className="p-1 rounded-full bg-blue-100 dark:bg-blue-900/20">
                        <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-neutral-900 dark:text-white">
                          Successfully placed Sarah Chen
                        </h4>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                          Senior Frontend Developer at TechCorp
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                      <div className="p-1 rounded-full bg-blue-100 dark:bg-blue-900/20">
                        <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-neutral-900 dark:text-white">
                          Interview scheduled
                        </h4>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                          Marcus Johnson - ML Engineer position
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                          4 hours ago
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                      <div className="p-1 rounded-full bg-blue-100 dark:bg-blue-900/20">
                        <UserPlus className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-neutral-900 dark:text-white">
                          New application received
                        </h4>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                          Emily Rodriguez applied for Product Manager role
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                          6 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                </GlowingCard>
              </motion.div>

              {/* Upcoming Interviews */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <GlowingCard
                  icon={<Calendar className="h-5 w-5" />}
                  title="Upcoming Interviews"
                  description="Next scheduled interviews"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        DK
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-neutral-900 dark:text-white">
                          David Kim
                        </h4>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                          Frontend Developer at TechCorp
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-500">
                          Today, 2:00 PM • Technical Interview
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200">
                          confirmed
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        LW
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-neutral-900 dark:text-white">
                          Lisa Wang
                        </h4>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                          UX Designer at DesignStudio
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-500">
                          Tomorrow, 10:00 AM • Portfolio Review
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200">
                          pending
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                    <Link
                      href="/recruiter/dashboard/interviews"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      View all interviews →
                    </Link>
                  </div>
                </GlowingCard>
              </motion.div>
            </div>

            {/* Top Performers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <GlowingCard
                icon={<Award className="h-5 w-5" />}
                title="Recent Top Placements"
                description="Your most successful recent hires"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      SC
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-neutral-900 dark:text-white">
                        Sarah Chen
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Senior Frontend Developer at TechCorp
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-500">
                        Placed on 2024-01-10
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-4 w-4 text-blue-500 fill-current" />
                        <span className="text-sm font-medium text-neutral-900 dark:text-white">
                          4.9
                        </span>
                      </div>
                      <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        $145,000
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      MJ
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-neutral-900 dark:text-white">
                        Marcus Johnson
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        ML Engineer at DataFlow Inc
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-500">
                        Placed on 2024-01-05
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-4 w-4 text-blue-500 fill-current" />
                        <span className="text-sm font-medium text-neutral-900 dark:text-white">
                          4.8
                        </span>
                      </div>
                      <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        $165,000
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <Link
                    href="/recruiter/dashboard/candidates"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    View all candidates →
                  </Link>
                </div>
              </GlowingCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}