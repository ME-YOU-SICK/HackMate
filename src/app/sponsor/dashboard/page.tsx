"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Mail, 
  BarChart3, 
  User, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar, 
  Award, 
  CheckCircle, 
  Clock, 
  Star, 
  Building2, 
  Target, 
  MessageSquare, 
  Bell, 
  ArrowUpRight, 
  ArrowDownRight,
  Eye,
  Plus,
  Filter,
  Search,
  X
} from "lucide-react";
import Link from "next/link";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";

const SponsorDashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  // Mock data
  const userName = "Jennifer Martinez";
  const userAvatar = undefined;

  const mockNotifications = [
    {
      id: 1,
      title: "New funding request",
      message: "GreenTech Labs has sent a funding request for Climate Hack Challenge",
      time: "2 hours ago",
      unread: true,
      type: "funding_request"
    },
    {
      id: 2,
      title: "Event update",
      message: "TechCrunch Disrupt 2024 has been confirmed for September 15th",
      time: "5 hours ago",
      unread: true,
      type: "event_update"
    },
    {
      id: 3,
      title: "Partnership success",
      message: "Your sponsorship of MIT Hackathon resulted in 2 successful startup investments",
      time: "1 day ago",
      unread: true,
      type: "success"
    },
    {
      id: 4,
      title: "New message",
      message: "AI Foundation sent you a message about AI Innovation Summit",
      time: "2 days ago",
      unread: false,
      type: "message"
    },
    {
      id: 5,
      title: "Event completed",
      message: "Climate Hack Challenge has been completed successfully",
      time: "3 days ago",
      unread: false,
      type: "completion"
    }
  ];

  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, unread: false }))
    );
  };

  const clearNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "funding_request": return <Mail className="h-4 w-4 text-[#FF9000]" />;
      case "event_update": return <Calendar className="h-4 w-4 text-green-600" />;
      case "success": return <Award className="h-4 w-4 text-yellow-600" />;
      case "message": return <MessageSquare className="h-4 w-4 text-[#BABD00]" />;
      case "completion": return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <Bell className="h-4 w-4 text-[#FF9000]" />;
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  const analytics = {
    totalInvested: 485000,
    activeSponsorships: 8,
    completedEvents: 23,
    successRate: 89,
    monthlyGrowth: 15,
    averageROI: 45
  };

  const quickActions = [
    {
      title: "View Invitations",
      description: "Review funding requests",
      icon: <Mail className="h-5 w-5 text-white" />,
      href: "/sponsor/dashboard/invitations",
      color: "bg-[#FFA100]"
    },
    {
      title: "Analytics",
      description: "Track performance",
      icon: <BarChart3 className="h-5 w-5 text-white" />,
      href: "/sponsor/dashboard/analytics",
      color: "bg-[#FF9000]"
    },
    {
      title: "Profile",
      description: "Manage company info",
      icon: <User className="h-5 w-5 text-white" />,
      href: "/sponsor/dashboard/profile",
      color: "bg-[#FFA100]"
    },
    {
      title: "Messages",
      description: "Chat with organizers",
      icon: <MessageSquare className="h-5 w-5 text-white" />,
      href: "/sponsor/dashboard/messages",
      color: "bg-[#FF9000]"
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full h-screen border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      <DashboardSidebar userRole="sponsor" />
      
      <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-700">
        {/* Header */}
        <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <LayoutDashboard className="h-6 w-6 text-[#FFA100]" />
                Dashboard
              </h1>
              <p className="text-[#FF9000] dark:text-neutral-400 mt-1">
                Welcome back, {userName}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 bg-neutral-100 dark:bg-neutral-800 text-[#FF9000] dark:text-neutral-400 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors relative"
                >
                  <Bell className="h-5 w-5 text-[#FFA100]" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-neutral-900 dark:text-white">Notifications</h3>
                        <div className="flex items-center gap-2">
                          {unreadCount > 0 && (
                            <button
                              onClick={markAllAsRead}
                              className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-[#FFA100] dark:hover:text-[#FFDD00]"
                            >
                              Mark all read
                            </button>
                          )}
                          {notifications.length > 0 && (
                            <button
                              onClick={clearAllNotifications}
                              className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                            >
                              Clear all
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-neutral-600 dark:text-neutral-400">
                          <Bell className="h-8 w-8 mx-auto mb-2 opacity-50 text-[#FFA100]" />
                          <p className="text-sm">No notifications</p>
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`p-4 border-b border-neutral-100 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors ${
                              notification.unread ? 'bg-[#FAF000]/5 dark:bg-[#FAF000]/10' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 mt-1">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h4 className={`font-medium text-sm ${
                                      notification.unread 
                                        ? 'text-neutral-900 dark:text-white' 
                                        : 'text-neutral-700 dark:text-neutral-300'
                                    }`}>
                                      {notification.title}
                                    </h4>
                                    <p className="text-xs text-[#FF9000] dark:text-neutral-400 mt-1 line-clamp-2">
                                      {notification.message}
                                    </p>
                                    <p className="text-xs text-[#FF9000] dark:text-[#FF9000] mt-1">
                                      {notification.time}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-1 ml-2">
                                    {notification.unread && (
                                      <div className="w-2 h-2 bg-[#FFA100] rounded-full flex-shrink-0" />
                                    )}
                                    <button
                                      onClick={() => clearNotification(notification.id)}
                                      className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <X className="h-3 w-3 text-[#FF9000]" />
                                    </button>
                                  </div>
                                </div>
                                {notification.unread && (
                                  <button
                                    onClick={() => markAsRead(notification.id)}
                                    className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 hover:text-[#FFA100] dark:hover:text-[#FFDD00]"
                                  >
                                    Mark as read
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="p-3 border-t border-neutral-200 dark:border-neutral-700">
                        <Link
                          href="/sponsor/dashboard/invitations"
                          className="block w-full text-center text-sm text-neutral-600 dark:text-neutral-400 hover:text-[#FFA100] dark:hover:text-[#FFDD00] py-2"
                          onClick={() => setShowNotifications(false)}
                        >
                          View all notifications →
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <GlowingCard
                icon={<DollarSign className="h-5 w-5 text-[#FFA100]" />}
                title="Total Invested"
                description="All-time sponsorship investments"
              >
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {formatCurrency(analytics.totalInvested)}
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-[#FFA100]" />
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">+{analytics.monthlyGrowth}% this month</span>
                </div>
              </GlowingCard>

              <GlowingCard
                icon={<Calendar className="h-5 w-5 text-[#FFA100]" />}
                title="Active Sponsorships"
                description="Currently sponsored events"
              >
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {analytics.activeSponsorships}
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <Clock className="h-4 w-4 text-[#FFA100]" />
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">{analytics.completedEvents} completed</span>
                </div>
              </GlowingCard>

              <GlowingCard
                icon={<Target className="h-5 w-5 text-[#FFA100]" />}
                title="Success Rate"
                description="Successful partnerships"
              >
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {analytics.successRate}%
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 dark:text-green-400">Excellent performance</span>
                </div>
              </GlowingCard>

              <GlowingCard
                icon={<TrendingUp className="h-5 w-5 text-[#FFA100]" />}
                title="Average ROI"
                description="Return on investment"
              >
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {analytics.averageROI}%
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 dark:text-green-400">Strong returns</span>
                </div>
              </GlowingCard>
            </div>

            {/* Quick Actions */}
            <GlowingCard
              icon={<Plus className="h-5 w-5 text-[#FFA100]" />}
              title="Quick Actions"
              description="Access your main features"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className="p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${action.color} text-white`}>
                        {action.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-white group-hover:text-[#FF9000] dark:group-hover:text-[#FAF000] transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-[#FF9000] dark:text-neutral-400">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </GlowingCard>

            {/* Recent Activity & Upcoming Events */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GlowingCard
                icon={<Clock className="h-5 w-5 text-[#FFA100]" />}
                title="Recent Activity"
                description="Latest updates and actions"
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/20">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-neutral-900 dark:text-white">
                        Accepted TechCrunch Disrupt 2024
                      </h4>
                      <p className="text-xs text-[#FF9000] dark:text-neutral-400">
                        Funding request accepted for $25,000
                      </p>
                      <p className="text-xs text-[#FF9000] dark:text-[#FF9000] mt-1">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <div className="p-1 rounded-full bg-[#FAF000]/10 dark:bg-[#FAF000]/20">
                      <MessageSquare className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-neutral-900 dark:text-white">
                        New message from AI Foundation
                      </h4>
                      <p className="text-xs text-[#FF9000] dark:text-neutral-400">
                        Discussion about AI Innovation Summit
                      </p>
                      <p className="text-xs text-[#FF9000] dark:text-[#FF9000] mt-1">
                        4 hours ago
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <div className="p-1 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
                      <Mail className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-neutral-900 dark:text-white">
                        New funding request
                      </h4>
                      <p className="text-xs text-[#FF9000] dark:text-neutral-400">
                        MIT Innovation Lab - MIT Hackathon 2024
                      </p>
                      <p className="text-xs text-[#FF9000] dark:text-[#FF9000] mt-1">
                        1 day ago
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <Link
                    href="/sponsor/dashboard/invitations"
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-[#FFA100] dark:hover:text-[#FFDD00]"
                  >
                    View all invitations →
                  </Link>
                </div>
              </GlowingCard>

              <GlowingCard
                icon={<Calendar className="h-5 w-5 text-[#FFA100]" />}
                title="Upcoming Events"
                description="Your confirmed and pending sponsorships"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <div>
                      <h4 className="text-sm font-medium text-neutral-900 dark:text-white">
                        AI Innovation Summit
                      </h4>
                      <p className="text-xs text-[#FF9000] dark:text-neutral-400">
                        by AI Foundation
                      </p>
                      <p className="text-xs text-[#FF9000] dark:text-[#FF9000]">
                        Aug 20, 2024
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                        $15,000
                      </div>
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                        confirmed
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <div>
                      <h4 className="text-sm font-medium text-neutral-900 dark:text-white">
                        Startup Weekend Global
                      </h4>
                      <p className="text-xs text-[#FF9000] dark:text-neutral-400">
                        by Techstars
                      </p>
                      <p className="text-xs text-[#FF9000] dark:text-[#FF9000]">
                        Jun 15, 2024
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                        $18,000
                      </div>
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400">
                        pending
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <div>
                      <h4 className="text-sm font-medium text-neutral-900 dark:text-white">
                        Web3 Innovation Summit
                      </h4>
                      <p className="text-xs text-[#FF9000] dark:text-neutral-400">
                        by Blockchain Alliance
                      </p>
                      <p className="text-xs text-[#FF9000] dark:text-[#FF9000]">
                        Apr 25, 2024
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                        $10,000
                      </div>
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                        confirmed
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <Link
                    href="/sponsor/dashboard/analytics"
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-[#FFA100] dark:hover:text-[#FFDD00]"
                  >
                    View analytics →
                  </Link>
                </div>
              </GlowingCard>
            </div>

            {/* Top Performing Organizers */}
            <GlowingCard
              icon={<Award className="h-5 w-5 text-[#FFA100]" />}
              title="Top Performing Organizers"
              description="Your most successful partnerships"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#FAF000] to-[#FF9000] rounded-full flex items-center justify-center text-white font-bold">
                      T
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 dark:text-white">
                        TechCrunch
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-[#FF9000] dark:text-neutral-400">
                        <span>3 events</span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          4.9
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-neutral-900 dark:text-white">
                      $75,000
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400">
                      95% success
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#FAF000] to-[#FF9000] rounded-full flex items-center justify-center text-white font-bold">
                      M
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 dark:text-white">
                        MIT Innovation Lab
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-[#FF9000] dark:text-neutral-400">
                        <span>2 events</span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          4.8
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-neutral-900 dark:text-white">
                      $40,000
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400">
                      90% success
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#FAF000] to-[#FF9000] rounded-full flex items-center justify-center text-white font-bold">
                      A
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 dark:text-white">
                        AI Foundation
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-[#FF9000] dark:text-neutral-400">
                        <span>2 events</span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          4.7
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-neutral-900 dark:text-white">
                      $30,000
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400">
                      85% success
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <Link
                  href="/sponsor/dashboard/profile"
                  className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-[#FFA100] dark:hover:text-[#FFDD00]"
                >
                  Manage partnerships →
                </Link>
              </div>
            </GlowingCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SponsorDashboardPage() {
  return <SponsorDashboard />;
}