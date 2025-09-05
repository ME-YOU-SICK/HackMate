"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Trophy, 
  Star,
  Plus,
  Filter,
  Search
} from "lucide-react";

export default function EventsPage() {
  const userRole = "participant"; // This would come from auth context
  const userName = "John Doe";
  const userAvatar = undefined;

  const events = [
    {
      id: 1,
      title: "AI Innovation Hackathon 2024",
      description: "Build the next generation of AI-powered applications",
      date: "March 15-17, 2024",
      location: "San Francisco, CA",
      participants: 150,
      prize: "$10,000",
      status: "upcoming",
      category: "AI/ML"
    },
    {
      id: 2,
      title: "Web3 Development Challenge",
      description: "Create decentralized applications on the blockchain",
      date: "March 22-24, 2024",
      location: "Virtual",
      participants: 200,
      prize: "$15,000",
      status: "upcoming",
      category: "Blockchain"
    },
    {
      id: 3,
      title: "Mobile App Sprint",
      description: "Design and develop innovative mobile applications",
      date: "March 29-31, 2024",
      location: "New York, NY",
      participants: 100,
      prize: "$8,000",
      status: "upcoming",
      category: "Mobile"
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
                  Events
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Discover and join amazing hackathon events
                </p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors">
                  <Plus className="h-4 w-4" />
                  Create Event
                </button>
              </div>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9000]"
              />
            </motion.div>

            {/* Events Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {events.map((event, index) => (
                <div key={event.id} className="h-[400px]">
                  <GlowingCard
                    icon={<Calendar className="h-4 w-4" />}
                    title={event.title}
                    description={event.description}
                    className="h-full"
                  >
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <Clock className="h-4 w-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <Users className="h-4 w-4" />
                        {event.participants} participants
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <Trophy className="h-4 w-4" />
                        {event.prize} prize pool
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="px-2 py-1 bg-[#FAF000]/10 dark:bg-[#FAF000] text-neutral-600 dark:text-neutral-400 text-xs rounded-full">
                          {event.category}
                        </span>
                        <button className="px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors text-sm">
                          Join Event
                        </button>
                      </div>
                    </div>
                  </GlowingCard>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
