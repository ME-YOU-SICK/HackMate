"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Calendar, 
  Users, 
  Trophy, 
  TrendingUp, 
  DollarSign,
  MessageCircle,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  Star,
  Award,
  Building,
  Target,
  Zap,
  Eye,
  UserPlus,
  Mail,
  Bell,
  ChevronRight,
  Plus,
  Filter,
  Search
} from "lucide-react";

export default function OrganizerDashboard() {
  const userRole = "organizer";
  const userName = "Sarah Johnson";
  const userAvatar = undefined;

  const [events, setEvents] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Load events from localStorage
    try {
      const raw = localStorage.getItem('org_events');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEvents(parsed);
        }
      }
    } catch {}
  }, []);

  // Mock analytics data
  const analytics = {
    totalEvents: events.length || 5,
    totalParticipants: 1250,
    totalRevenue: 45000,
    avgRating: 4.8,
    upcomingEvents: 3,
    activeEvents: 1,
    completedEvents: 1,
    totalSponsors: 12,
    messagesUnread: 7,
    teamFormations: 45,
    prizePool: 25000
  };

  const quickActions = [
    {
      title: "Create Event",
      description: "Launch a new hackathon or workshop",
      icon: <Plus className="h-5 w-5" />,
      href: "/organizer/dashboard/events",
      color: "bg-[#FFA100]"
    },
    {
      title: "Manage Teams",
      description: "Review and organize participant teams",
      icon: <Users className="h-5 w-5" />,
      href: "/organizer/dashboard/manager",
      color: "bg-[#FF9000]"
    },
    {
      title: "Find Sponsors",
      description: "Connect with potential sponsors",
      icon: <Building className="h-5 w-5" />,
      href: "/organizer/dashboard/sponsorship/discover",
      color: "bg-[#FFA100]"
    },
    {
      title: "Send Announcements",
      description: "Communicate with participants",
      icon: <Mail className="h-5 w-5" />,
      href: "/organizer/dashboard/announcements",
      color: "bg-[#FF9000]"
    }
  ];

  const recentEvents = events.slice(0, 3).map(event => ({
    ...event,
    status: event.participants > 100 ? 'active' : 'upcoming',
    progress: Math.min((event.participants / 150) * 100, 100)
  }));

  const upcomingEvents = events.filter(e => e.participants < 50).slice(0, 3);

  const mockNotifications = [
    {
      id: 1,
      title: "New Team Registration",
      message: "Team 'Code Warriors' registered for TechCrunch Hackathon",
      time: "2 minutes ago",
      type: "team",
      unread: true
    },
    {
      id: 2,
      title: "Sponsor Interest",
      message: "Microsoft expressed interest in sponsoring your AI Workshop",
      time: "15 minutes ago",
      type: "sponsor",
      unread: true
    },
    {
      id: 3,
      title: "Event Reminder",
      message: "Web3 Masterclass starts in 2 hours",
      time: "1 hour ago",
      type: "event",
      unread: false
    },
    {
      id: 4,
      title: "Participant Question",
      message: "John Doe asked about team formation rules",
      time: "2 hours ago",
      type: "message",
      unread: true
    },
    {
      id: 5,
      title: "Registration Milestone",
      message: "AI Innovation Workshop reached 100 participants!",
      time: "3 hours ago",
      type: "milestone",
      unread: false
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div
        className={cn(
          "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full h-screen border border-neutral-200 dark:border-neutral-700 overflow-hidden"
        )}
      >
        <DashboardSidebar 
          userRole={userRole} 
          userName={userName}
          userAvatar={userAvatar}
        />
        
        {/* Main Content */}
        <div className="flex flex-1">
          <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-6 flex-1 w-full h-full overflow-y-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-between items-center"
            >
              <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                  Welcome back, Sarah! 👋
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Here's what's happening with your events today
                </p>
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-neutral-900 dark:text-white"
                  >
                    <Bell className="h-4 w-4" />
                    <span className="hidden sm:inline">Notifications</span>
                    {mockNotifications.filter(n => n.unread).length > 0 && (
                      <span className="bg-[#FFA100] text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                        {mockNotifications.filter(n => n.unread).length}
                      </span>
                    )}
                  </button>
                  
                  {showNotifications && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
                        <h3 className="font-semibold text-neutral-900 dark:text-white">Notifications</h3>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {mockNotifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`p-4 border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 cursor-pointer ${notification.unread ? 'bg-[#FAF000]/5 dark:bg-[#FAF000]/10' : ''}`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg ${notification.unread ? 'bg-[#FAF000]/10 dark:bg-[#FAF000]/20' : 'bg-neutral-100 dark:bg-neutral-700'}`}>
                                {notification.type === 'team' && <Users className="h-4 w-4 text-[#FF9000] dark:text-[#FAF000]" />}
                                {notification.type === 'sponsor' && <Building className="h-4 w-4 text-[#FF9000] dark:text-[#FAF000]" />}
                                {notification.type === 'event' && <Calendar className="h-4 w-4 text-[#FF9000] dark:text-[#FAF000]" />}
                                {notification.type === 'message' && <Mail className="h-4 w-4 text-[#FF9000] dark:text-[#FAF000]" />}
                                {notification.type === 'milestone' && <Trophy className="h-4 w-4 text-[#FF9000] dark:text-[#FAF000]" />}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-neutral-900 dark:text-white text-sm">
                                  {notification.title}
                                </h4>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                                  {notification.time}
                                </p>
                              </div>
                              {notification.unread && (
                                <div className="w-2 h-2 bg-[#FFA100] rounded-full mt-2"></div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
                        <Link 
                          href="/organizer/dashboard/messages" 
                          className="text-sm text-[#FF9000] hover:text-[#FFA100] dark:text-[#FAF000] dark:hover:text-[#FFDD00]"
                        >
                          View all notifications
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                <Link href="/organizer/dashboard/events" className="flex items-center gap-2 px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Create Event</span>
                </Link>
              </div>
            </motion.div>

            {/* Analytics Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <GlowingCard
                icon={<Calendar className="h-5 w-5" />}
                title="Total Events"
                description={`${analytics.totalEvents} organized`}
                className="h-full"
              >
                <div className="mt-4 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-[#FFA100]" />
                  <span className="text-sm text-[#FF9000] dark:text-[#FAF000]">+2 this month</span>
                </div>
              </GlowingCard>

              <GlowingCard
                icon={<Users className="h-5 w-5" />}
                title="Total Participants"
                description={`${analytics.totalParticipants.toLocaleString()}+ reached`}
                className="h-full"
              >
                <div className="mt-4 flex items-center gap-2">
                  <UserPlus className="h-4 w-4 text-[#FFA100]" />
                  <span className="text-sm text-[#FF9000] dark:text-[#FAF000]">+150 this week</span>
                </div>
              </GlowingCard>

              <GlowingCard
                icon={<DollarSign className="h-5 w-5" />}
                title="Total Revenue"
                description={`$${analytics.totalRevenue.toLocaleString()}`}
                className="h-full"
              >
                <div className="mt-4 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-[#FFA100]" />
                  <span className="text-sm text-[#FF9000] dark:text-[#FAF000]">+12% from last month</span>
                </div>
              </GlowingCard>

              <GlowingCard
                icon={<Star className="h-5 w-5" />}
                title="Average Rating"
                description={`${analytics.avgRating}/5.0`}
                className="h-full"
              >
                <div className="mt-4 flex items-center gap-2">
                  <Star className="h-4 w-4 text-[#FFA100] fill-current" />
                  <span className="text-sm text-[#FF9000] dark:text-[#FAF000]">Excellent feedback</span>
                </div>
              </GlowingCard>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
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
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      className="p-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-[#FFDD00] dark:hover:border-[#FF9000] transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 ${action.color} rounded-lg text-white`}>
                          {action.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-neutral-900 dark:text-white group-hover:text-[#FF9000] dark:group-hover:text-[#FAF000] transition-colors">
                            {action.title}
                          </h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            {action.description}
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-neutral-400 group-hover:text-[#FFA100] transition-colors" />
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Events */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                    Recent Events
                  </h2>
                  <Link href="/organizer/dashboard/events" className="text-sm text-[#FF9000] hover:text-[#FFA100] dark:text-[#FAF000] dark:hover:text-[#FFDD00]">
                    View all
                  </Link>
                </div>
                <div className="space-y-4">
                  {recentEvents.map((event, index) => (
                    <GlowingCard
                      key={event.id}
                      title={event.name}
                      description={event.description}
                      className="h-full"
                    >
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-1 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 text-[#FF9000] dark:text-[#FAF000] text-xs rounded-full">
                            {event.type}
                          </span>
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            {event.participants} participants
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <Calendar className="h-4 w-4" />
                          {event.date}
                        </div>
                        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                          <div 
                            className="bg-[#FF9000] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${event.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            Registration Progress
                          </span>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            {Math.round(event.progress)}%
                          </span>
                        </div>
                      </div>
                    </GlowingCard>
                  ))}
                </div>
              </motion.div>

              {/* Upcoming Events & Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-6"
              >
                {/* Upcoming Events */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                      Upcoming Events
                    </h2>
                    <Link href="/organizer/dashboard/events" className="text-sm text-[#FF9000] hover:text-[#FFA100] dark:text-[#FAF000] dark:hover:text-[#FFDD00]">
                      View all
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {upcomingEvents.map((event, index) => (
                      <div key={event.id} className="p-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-neutral-900 dark:text-white">
                              {event.name}
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              {event.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-neutral-900 dark:text-white">
                              {event.participants}
                            </div>
                            <div className="text-xs text-neutral-500 dark:text-neutral-400">
                              participants
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                    Recent Activity
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                      <div className="p-2 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 rounded-lg">
                        <Users className="h-4 w-4 text-[#FF9000] dark:text-[#FAF000]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-neutral-900 dark:text-white">
                          New team formed for TechCrunch Hackathon
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                      <div className="p-2 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 rounded-lg">
                        <Building className="h-4 w-4 text-[#FF9000] dark:text-[#FAF000]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-neutral-900 dark:text-white">
                          New sponsor joined Web3 Masterclass
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          4 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                      <div className="p-2 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 rounded-lg">
                        <Mail className="h-4 w-4 text-[#FF9000] dark:text-[#FAF000]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-neutral-900 dark:text-white">
                          Announcement sent to 150 participants
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          6 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
