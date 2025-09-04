"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
  Target,
  Award,
  Eye,
  MessageSquare,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  RefreshCw,
  PieChart,
  Activity,
  Building2,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";

const SponsorAnalytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months");
  const [selectedMetric, setSelectedMetric] = useState("roi");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Dynamic data based on timeframe
  const getDataByTimeframe = (timeframe: string) => {
    switch (timeframe) {
      case "3months":
        return {
          investmentSummary: {
            totalInvested: 75000,
            totalROI: 108000,
            roiPercentage: 44,
            activeEvents: 5,
            completedEvents: 8,
            totalParticipants: 680,
            successfulPlacements: 22
          },
          monthlyData: [
            { month: "Apr", invested: 22000, roi: 35000, events: 6, participants: 320 },
            { month: "May", invested: 25000, roi: 38000, events: 7, participants: 380 },
            { month: "Jun", invested: 25000, roi: 33000, events: 8, participants: 420 }
          ]
        };
      case "6months":
        return {
          investmentSummary: {
            totalInvested: 125000,
            totalROI: 185000,
            roiPercentage: 48,
            activeEvents: 8,
            completedEvents: 23,
            totalParticipants: 1240,
            successfulPlacements: 45
          },
          monthlyData: [
            { month: "Jan", invested: 15000, roi: 22000, events: 3, participants: 180 },
            { month: "Feb", invested: 18000, roi: 26000, events: 4, participants: 220 },
            { month: "Mar", invested: 20000, roi: 31000, events: 5, participants: 280 },
            { month: "Apr", invested: 22000, roi: 35000, events: 6, participants: 320 },
            { month: "May", invested: 25000, roi: 38000, events: 7, participants: 380 },
            { month: "Jun", invested: 25000, roi: 33000, events: 8, participants: 420 }
          ]
        };
      case "1year":
        return {
          investmentSummary: {
            totalInvested: 245000,
            totalROI: 365000,
            roiPercentage: 49,
            activeEvents: 12,
            completedEvents: 45,
            totalParticipants: 2680,
            successfulPlacements: 89
          },
          monthlyData: [
            { month: "Jul", invested: 12000, roi: 18000, events: 2, participants: 120 },
            { month: "Aug", invested: 15000, roi: 22000, events: 3, participants: 180 },
            { month: "Sep", invested: 18000, roi: 26000, events: 4, participants: 220 },
            { month: "Oct", invested: 20000, roi: 31000, events: 5, participants: 280 },
            { month: "Nov", invested: 22000, roi: 35000, events: 6, participants: 320 },
            { month: "Dec", invested: 25000, roi: 38000, events: 7, participants: 380 },
            { month: "Jan", invested: 15000, roi: 22000, events: 3, participants: 180 },
            { month: "Feb", invested: 18000, roi: 26000, events: 4, participants: 220 },
            { month: "Mar", invested: 20000, roi: 31000, events: 5, participants: 280 },
            { month: "Apr", invested: 22000, roi: 35000, events: 6, participants: 320 },
            { month: "May", invested: 25000, roi: 38000, events: 7, participants: 380 },
            { month: "Jun", invested: 25000, roi: 33000, events: 8, participants: 420 }
          ]
        };
      case "all":
        return {
          investmentSummary: {
            totalInvested: 485000,
            totalROI: 725000,
            roiPercentage: 49,
            activeEvents: 15,
            completedEvents: 89,
            totalParticipants: 5680,
            successfulPlacements: 178
          },
          monthlyData: [
            { month: "2022", invested: 45000, roi: 68000, events: 8, participants: 520 },
            { month: "2023", invested: 195000, roi: 292000, events: 32, participants: 2240 },
            { month: "2024", invested: 245000, roi: 365000, events: 57, participants: 2920 }
          ]
        };
      default:
        return {
          investmentSummary: {
            totalInvested: 125000,
            totalROI: 185000,
            roiPercentage: 48,
            activeEvents: 8,
            completedEvents: 23,
            totalParticipants: 1240,
            successfulPlacements: 45
          },
          monthlyData: [
            { month: "Jan", invested: 15000, roi: 22000, events: 3, participants: 180 },
            { month: "Feb", invested: 18000, roi: 26000, events: 4, participants: 220 },
            { month: "Mar", invested: 20000, roi: 31000, events: 5, participants: 280 },
            { month: "Apr", invested: 22000, roi: 35000, events: 6, participants: 320 },
            { month: "May", invested: 25000, roi: 38000, events: 7, participants: 380 },
            { month: "Jun", invested: 25000, roi: 33000, events: 8, participants: 420 }
          ]
        };
    }
  };

  const currentData = getDataByTimeframe(selectedTimeframe);
  const investmentSummary = currentData.investmentSummary;
  const monthlyData = currentData.monthlyData;

  const eventProgressData = [
    {
      id: 1,
      name: "TechCrunch Disrupt 2024",
      organizer: "TechCrunch",
      status: "completed",
      progress: 100,
      participants: 450,
      projects: 89,
      investment: 25000,
      roi: 42000,
      rating: 4.8
    },
    {
      id: 2,
      name: "AI Innovation Summit",
      organizer: "AI Foundation",
      status: "active",
      progress: 75,
      participants: 320,
      projects: 64,
      investment: 20000,
      roi: 0,
      rating: 4.6
    },
    {
      id: 3,
      name: "Climate Hack Challenge",
      organizer: "GreenTech Labs",
      status: "active",
      progress: 60,
      participants: 280,
      projects: 56,
      investment: 18000,
      roi: 0,
      rating: 4.7
    },
    {
      id: 4,
      name: "Startup Weekend Global",
      organizer: "Techstars",
      status: "upcoming",
      progress: 0,
      participants: 0,
      projects: 0,
      investment: 15000,
      roi: 0,
      rating: 4.9
    }
  ];

  const organizerAnalytics = [
    {
      name: "TechCrunch",
      events: 3,
      totalParticipants: 1200,
      avgRating: 4.8,
      totalInvestment: 75000,
      totalROI: 125000,
      successRate: 92,
      trend: "up"
    },
    {
      name: "AI Foundation",
      events: 2,
      totalParticipants: 640,
      avgRating: 4.6,
      totalInvestment: 40000,
      totalROI: 65000,
      successRate: 88,
      trend: "up"
    },
    {
      name: "GreenTech Labs",
      events: 2,
      totalParticipants: 560,
      avgRating: 4.7,
      totalInvestment: 36000,
      totalROI: 58000,
      successRate: 85,
      trend: "stable"
    },
    {
      name: "Techstars",
      events: 1,
      totalParticipants: 0,
      avgRating: 4.9,
      totalInvestment: 15000,
      totalROI: 0,
      successRate: 0,
      trend: "new"
    }
  ];

  const topPerformers = [
    {
      name: "Sarah Chen",
      event: "TechCrunch Disrupt 2024",
      project: "AI-Powered Healthcare Platform",
      investment: 5000,
      outcome: "Acquired by Google Health",
      roi: 15000,
      roiPercentage: 200
    },
    {
      name: "Marcus Rodriguez",
      event: "AI Innovation Summit",
      project: "Autonomous Vehicle Navigation",
      investment: 3000,
      outcome: "Series A Funding - $2M",
      roi: 12000,
      roiPercentage: 300
    },
    {
      name: "Emily Watson",
      event: "Climate Hack Challenge",
      project: "Carbon Footprint Tracker",
      investment: 2500,
      outcome: "Partnership with Tesla",
      roi: 8000,
      roiPercentage: 220
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

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600 dark:text-green-400";
      case "active": return "text-blue-600 dark:text-blue-400";
      case "upcoming": return "text-yellow-600 dark:text-yellow-400";
      default: return "text-neutral-600 dark:text-neutral-400";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 dark:bg-green-900/20";
      case "active": return "bg-blue-100 dark:bg-blue-900/20";
      case "upcoming": return "bg-yellow-100 dark:bg-yellow-900/20";
      default: return "bg-neutral-100 dark:bg-neutral-800";
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full h-screen border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      <DashboardSidebar userRole="sponsor" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-blue-600" />
                Analytics Dashboard
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                Track your sponsorship investments and event performance
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
              >
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
                <option value="all">All Time</option>
              </select>
              <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4" />
              </button>
              <button 
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isRefreshing 
                    ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 cursor-not-allowed" 
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
              >
                <RefreshCw className={`h-4 w-4 transition-transform duration-200 ${isRefreshing ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Investment Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <GlowingCard
                icon={<DollarSign className="h-5 w-5" />}
                title="Total Invested"
                description="All-time sponsorship investments"
              >
                <motion.div 
                  className="text-2xl font-bold text-neutral-900 dark:text-white"
                  key={`${selectedTimeframe}-${isRefreshing ? "loading" : investmentSummary.totalInvested}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {isRefreshing ? "---" : formatCurrency(investmentSummary.totalInvested)}
                </motion.div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-blue-600 dark:text-blue-400">+12% this month</span>
                </div>
              </GlowingCard>

              <GlowingCard
                icon={<TrendingUp className="h-5 w-5" />}
                title="Total ROI"
                description="Return on investment"
              >
                <motion.div 
                  className="text-2xl font-bold text-neutral-900 dark:text-white"
                  key={`${selectedTimeframe}-${isRefreshing ? "loading" : investmentSummary.totalROI}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {isRefreshing ? "---" : formatCurrency(investmentSummary.totalROI)}
                </motion.div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 dark:text-green-400">+{investmentSummary.roiPercentage}% ROI</span>
                </div>
              </GlowingCard>

              <GlowingCard
                icon={<Calendar className="h-5 w-5" />}
                title="Active Events"
                description="Currently sponsored events"
              >
                <motion.div 
                  className="text-2xl font-bold text-neutral-900 dark:text-white"
                  key={`${selectedTimeframe}-${isRefreshing ? "loading" : investmentSummary.activeEvents}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {isRefreshing ? "---" : investmentSummary.activeEvents}
                </motion.div>
                <div className="flex items-center gap-1 mt-2">
                  <Activity className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-blue-600 dark:text-blue-400">{investmentSummary.completedEvents} completed</span>
                </div>
              </GlowingCard>

              <GlowingCard
                icon={<Users className="h-5 w-5" />}
                title="Total Participants"
                description="Across all sponsored events"
              >
                <motion.div 
                  className="text-2xl font-bold text-neutral-900 dark:text-white"
                  key={`${selectedTimeframe}-${isRefreshing ? "loading" : investmentSummary.totalParticipants}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {isRefreshing ? "---" : investmentSummary.totalParticipants.toLocaleString()}
                </motion.div>
                <div className="flex items-center gap-1 mt-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 dark:text-green-400">{investmentSummary.successfulPlacements} placements</span>
                </div>
              </GlowingCard>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Investment vs ROI Chart */}
              <GlowingCard
                icon={<BarChart3 className="h-5 w-5" />}
                title="Investment vs ROI Trend"
                description="Monthly investment and return analysis"
              >
                <div className="h-64 flex items-end justify-between gap-2 p-4">
                  {(() => {
                    // Calculate the maximum combined height for any bar
                    const maxCombinedHeight = Math.max(...monthlyData.map(data => 
                      (data.invested / Math.max(...monthlyData.map(d => d.invested))) * 100 + 
                      (data.roi / Math.max(...monthlyData.map(d => d.roi))) * 100
                    ));
                    
                    // Calculate scale factor to fit within 100px max height
                    const maxAllowedHeight = 100;
                    const scaleFactor = maxCombinedHeight > maxAllowedHeight ? maxAllowedHeight / maxCombinedHeight : 1;
                    
                    return monthlyData.map((data, index) => (
                      <div key={`${selectedTimeframe}-${index}`} className="flex flex-col items-center gap-2 flex-1 h-full">
                        <div className="flex flex-col-reverse gap-1 w-full h-48 justify-start">
                          <motion.div 
                            className="bg-green-500 rounded-b w-full"
                            key={`${selectedTimeframe}-roi-${index}`}
                            initial={{ height: 0 }}
                            animate={{ height: `${(data.roi / Math.max(...monthlyData.map(d => d.roi))) * 100 * scaleFactor}px` }}
                            transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                          />
                          <motion.div 
                            className="bg-blue-500 rounded-t w-full"
                            key={`${selectedTimeframe}-invested-${index}`}
                            initial={{ height: 0 }}
                            animate={{ height: `${(data.invested / Math.max(...monthlyData.map(d => d.invested))) * 100 * scaleFactor}px` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          />
                        </div>
                        <div className="h-8 flex items-center">
                          <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">{data.month}</span>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Investment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">ROI</span>
                  </div>
                </div>
              </GlowingCard>

              {/* Event Performance Chart */}
              <GlowingCard
                icon={<PieChart className="h-5 w-5" />}
                title="Event Status Distribution"
                description="Current event portfolio breakdown"
              >
                <div className="h-64 flex items-center justify-center">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-neutral-200 dark:text-neutral-700"
                      />
                      
                      {/* Completed events (green) */}
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-green-500"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: "0 251.2" }}
                        animate={{ strokeDasharray: `${(investmentSummary.completedEvents / (investmentSummary.completedEvents + investmentSummary.activeEvents + 4)) * 251.2} 251.2` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        style={{ strokeDashoffset: "0" }}
                      />
                      
                      {/* Active events (blue) */}
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-blue-500"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: "0 251.2" }}
                        animate={{ strokeDasharray: `${(investmentSummary.activeEvents / (investmentSummary.completedEvents + investmentSummary.activeEvents + 4)) * 251.2} 251.2` }}
                        transition={{ duration: 1, delay: 0.4 }}
                        style={{ strokeDashoffset: `-${(investmentSummary.completedEvents / (investmentSummary.completedEvents + investmentSummary.activeEvents + 4)) * 251.2}` }}
                      />
                      
                      {/* Upcoming events (yellow) */}
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-yellow-500"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: "0 251.2" }}
                        animate={{ strokeDasharray: `${(4 / (investmentSummary.completedEvents + investmentSummary.activeEvents + 4)) * 251.2} 251.2` }}
                        transition={{ duration: 1, delay: 0.6 }}
                        style={{ strokeDashoffset: `-${((investmentSummary.completedEvents + investmentSummary.activeEvents) / (investmentSummary.completedEvents + investmentSummary.activeEvents + 4)) * 251.2}` }}
                      />
                    </svg>
                    
                    {/* Center content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <motion.div 
                          className="text-xl font-bold text-neutral-900 dark:text-white"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                        >
                          {investmentSummary.activeEvents + investmentSummary.completedEvents + 4}
                        </motion.div>
                        <div className="text-xs text-neutral-600 dark:text-neutral-400">Total Events</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Completed ({investmentSummary.completedEvents})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Active ({investmentSummary.activeEvents})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Upcoming (4)</span>
                  </div>
                </div>
              </GlowingCard>
            </div>

            {/* Event Progress Table */}
            <GlowingCard
              icon={<Activity className="h-5 w-5" />}
              title="Event Progress Tracking"
              description="Detailed view of all sponsored events"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-700">
                      <th className="text-left py-3 px-4 font-semibold text-neutral-900 dark:text-white">Event</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-900 dark:text-white">Organizer</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-900 dark:text-white">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-900 dark:text-white">Progress</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-900 dark:text-white">Participants</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-900 dark:text-white">ROI</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-900 dark:text-white">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventProgressData.map((event) => (
                      <tr key={event.id} className="border-b border-neutral-100 dark:border-neutral-700">
                        <td className="py-3 px-4">
                          <div className="font-medium text-neutral-900 dark:text-white">{event.name}</div>
                          <div className="text-sm text-neutral-600 dark:text-neutral-400">{event.projects} projects</div>
                        </td>
                        <td className="py-3 px-4 text-sm text-neutral-600 dark:text-neutral-400">{event.organizer}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusBg(event.status)} ${getStatusColor(event.status)}`}>
                            {event.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                                style={{ width: `${event.progress}%` }}
                              />
                            </div>
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">{event.progress}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-neutral-600 dark:text-neutral-400">{event.participants}</td>
                        <td className="py-3 px-4">
                          {event.roi > 0 ? (
                            <div className="text-sm font-medium text-green-600 dark:text-green-400">
                              {formatCurrency(event.roi)}
                            </div>
                          ) : (
                            <div className="text-sm text-neutral-500 dark:text-neutral-500">-</div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">{event.rating}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlowingCard>

            {/* Organizer Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GlowingCard
                icon={<Building2 className="h-5 w-5" />}
                title="Organizer Performance"
                description="Top performing event organizers"
              >
                <div className="space-y-4">
                  {organizerAnalytics.map((organizer, index) => (
                    <div key={index} className="p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-neutral-900 dark:text-white">{organizer.name}</h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">{organizer.events} events • {organizer.totalParticipants} participants</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium text-neutral-900 dark:text-white">{organizer.avgRating}</span>
                          </div>
                          <div className="text-sm text-neutral-600 dark:text-neutral-400">{organizer.successRate}% success</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-neutral-600 dark:text-neutral-400">Investment:</span>
                          <div className="font-medium text-neutral-900 dark:text-white">{formatCurrency(organizer.totalInvestment)}</div>
                        </div>
                        <div>
                          <span className="text-neutral-600 dark:text-neutral-400">ROI:</span>
                          <div className="font-medium text-green-600 dark:text-green-400">
                            {organizer.totalROI > 0 ? formatCurrency(organizer.totalROI) : "-"}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlowingCard>

              <GlowingCard
                icon={<Award className="h-5 w-5" />}
                title="Top Performers"
                description="Highest ROI projects and outcomes"
              >
                <div className="space-y-4">
                  {topPerformers.map((performer, index) => (
                    <div key={index} className="p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-neutral-900 dark:text-white">{performer.name}</h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">{performer.project}</p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-500">{performer.event}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-green-600 dark:text-green-400">
                            +{performer.roiPercentage}% ROI
                          </div>
                          <div className="text-xs text-neutral-600 dark:text-neutral-400">
                            {formatCurrency(performer.roi)}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">
                        <strong>Outcome:</strong> {performer.outcome}
                      </div>
                    </div>
                  ))}
                </div>
              </GlowingCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorAnalytics;