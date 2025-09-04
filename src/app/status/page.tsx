"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { 
  Activity, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Clock, 
  Server,
  Database,
  Globe,
  Mail,
  MessageCircle,
  Calendar,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";
import { useState, useEffect } from "react";

export default function StatusPage() {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Update timestamp every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      name: "Web Application",
      status: "operational",
      description: "Main HackMate platform",
      uptime: "99.9%",
      responseTime: "120ms"
    },
    {
      name: "API Services",
      status: "operational",
      description: "REST API and GraphQL endpoints",
      uptime: "99.8%",
      responseTime: "85ms"
    },
    {
      name: "Database",
      status: "operational",
      description: "Primary database cluster",
      uptime: "99.95%",
      responseTime: "45ms"
    },
    {
      name: "Authentication",
      status: "operational",
      description: "User authentication and authorization",
      uptime: "99.9%",
      responseTime: "65ms"
    },
    {
      name: "File Storage",
      status: "operational",
      description: "User uploads and media storage",
      uptime: "99.7%",
      responseTime: "200ms"
    },
    {
      name: "Email Service",
      status: "operational",
      description: "Transactional and notification emails",
      uptime: "99.6%",
      responseTime: "300ms"
    },
    {
      name: "Real-time Chat",
      status: "operational",
      description: "WebSocket messaging service",
      uptime: "99.5%",
      responseTime: "50ms"
    },
    {
      name: "CDN",
      status: "operational",
      description: "Content delivery network",
      uptime: "99.9%",
      responseTime: "25ms"
    }
  ];

  const incidents = [
    {
      id: 1,
      title: "Scheduled Maintenance - Database Optimization",
      status: "resolved",
      severity: "minor",
      startTime: "2024-01-15T02:00:00Z",
      endTime: "2024-01-15T04:00:00Z",
      description: "Planned maintenance to optimize database performance and add new indexes."
    },
    {
      id: 2,
      title: "API Rate Limiting Issues",
      status: "resolved",
      severity: "major",
      startTime: "2024-01-10T14:30:00Z",
      endTime: "2024-01-10T16:45:00Z",
      description: "Temporary issues with API rate limiting causing some requests to fail."
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "degraded":
        return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      case "outage":
        return <XCircle className="h-5 w-5 text-red-400" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-400";
      case "degraded":
        return "text-yellow-400";
      case "outage":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "minor":
        return "bg-[#FAF000]/10 text-[#FF9000] dark:bg-[#FAF000]/20 dark:text-[#FAF000]";
      case "major":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const overallStatus = "operational";
  const overallUptime = "99.8%";

  return (
    <div className="min-h-screen bg-black w-full">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF9000]/20 to-[#FFA100]/20 border border-[#FF9000]/30 rounded-full text-[#FAF000] text-sm font-medium mb-6">
              <Activity className="h-4 w-4" />
              <span>System Status</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              HackMate Status
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Real-time status of all HackMate services. We're committed to providing 
              reliable service and transparent communication about any issues.
            </p>
            
            {/* Overall Status */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl">
              {getStatusIcon(overallStatus)}
              <span className={`text-lg font-semibold ${getStatusColor(overallStatus)}`}>
                All Systems Operational
              </span>
              <span className="text-white/60 text-sm">
                {overallUptime} uptime
              </span>
            </div>
          </motion.div>

          {/* Services Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Service Status</h2>
              <div className="text-white/60 text-sm">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.05 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(service.status)}
                      <div>
                        <h3 className="text-white font-semibold text-lg">{service.name}</h3>
                        <p className="text-white/60 text-sm">{service.description}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${getStatusColor(service.status)}`}>
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/60">Uptime:</span>
                      <span className="text-white font-medium ml-2">{service.uptime}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Response:</span>
                      <span className="text-white font-medium ml-2">{service.responseTime}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Incidents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8">Recent Incidents</h2>
            
            {incidents.length > 0 ? (
              <div className="space-y-4">
                {incidents.map((incident, index) => (
                  <motion.div
                    key={incident.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(incident.status)}
                        <div>
                          <h3 className="text-white font-semibold text-lg">{incident.title}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                              {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                            </span>
                            <span className="text-white/60 text-sm">
                              {new Date(incident.startTime).toLocaleDateString()} - {new Date(incident.endTime).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className={`text-sm font-medium ${getStatusColor(incident.status)}`}>
                        {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-white/70">{incident.description}</p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Recent Incidents</h3>
                <p className="text-white/60">All systems are running smoothly with no recent issues.</p>
              </div>
            )}
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8">Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF9000] to-[#FFA100] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Average Response Time</h3>
                <div className="text-3xl font-bold text-[#FAF000] mb-1">95ms</div>
                <p className="text-white/60 text-sm">Last 24 hours</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-[#FF9000] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Server className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">System Uptime</h3>
                <div className="text-3xl font-bold text-green-400 mb-1">99.8%</div>
                <p className="text-white/60 text-sm">Last 30 days</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FFA100] to-[#FFDD00] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Active Users</h3>
                <div className="text-3xl font-bold text-[#FFA100] mb-1">12.5K</div>
                <p className="text-white/60 text-sm">Currently online</p>
              </div>
            </div>
          </motion.div>

          {/* Subscribe to Updates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center bg-gradient-to-r from-[#FF9000]/10 to-[#FFA100]/10 border border-[#FF9000]/20 rounded-3xl p-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to status updates and get notified immediately when there are any service issues or maintenance windows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF9000] focus:border-transparent"
              />
              <button className="bg-gradient-to-r from-[#FF9000] to-[#FFA100] hover:from-[#FFA100] hover:to-[#FFDD00] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2">
                <Mail className="h-5 w-5" />
                Subscribe
              </button>
            </div>
            <p className="text-white/50 text-sm mt-4">
              We'll only send you important status updates. No spam, ever.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
