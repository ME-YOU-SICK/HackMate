"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Trophy, 
  Star,
  Filter,
  Search,
  ChevronDown,
  Code,
  Brain,
  Shield,
  Smartphone,
  Cloud,
  Gamepad2,
  Palette,
  Database,
  Zap,
  Globe,
  Heart,
  Music,
  Car,
  ShoppingBag
} from "lucide-react";

export default function EventsPage() {
  const userRole = "participant";
  const userName = "John Doe";
  const userAvatar = undefined;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const events = [
    {
      id: 1,
      title: "AI Innovation Hackathon 2024",
      description: "Build the next generation of AI-powered applications using machine learning and deep learning",
      date: "March 15-17, 2024",
      location: "San Francisco, CA",
      participants: 150,
      prize: "$10,000",
      status: "upcoming",
      category: "AI/ML",
      icon: <Brain className="h-4 w-4" />
    },
    {
      id: 2,
      title: "Web3 Development Challenge",
      description: "Create decentralized applications on the blockchain with smart contracts",
      date: "March 22-24, 2024",
      location: "Virtual",
      participants: 200,
      prize: "$15,000",
      status: "upcoming",
      category: "Blockchain",
      icon: <Shield className="h-4 w-4" />
    },
    {
      id: 3,
      title: "Mobile App Sprint",
      description: "Design and develop innovative mobile applications for iOS and Android",
      date: "March 29-31, 2024",
      location: "New York, NY",
      participants: 100,
      prize: "$8,000",
      status: "upcoming",
      category: "Mobile",
      icon: <Smartphone className="h-4 w-4" />
    },
    {
      id: 4,
      title: "Cloud Infrastructure Hackathon",
      description: "Build scalable cloud solutions using AWS, Azure, and Google Cloud",
      date: "April 5-7, 2024",
      location: "Seattle, WA",
      participants: 120,
      prize: "$12,000",
      status: "upcoming",
      category: "Cloud Computing",
      icon: <Cloud className="h-4 w-4" />
    },
    {
      id: 5,
      title: "Game Development Jam",
      description: "Create immersive games using Unity, Unreal Engine, or web technologies",
      date: "April 12-14, 2024",
      location: "Los Angeles, CA",
      participants: 80,
      prize: "$6,000",
      status: "upcoming",
      category: "Game Development",
      icon: <Gamepad2 className="h-4 w-4" />
    },
    {
      id: 6,
      title: "UI/UX Design Challenge",
      description: "Design beautiful and intuitive user interfaces for web and mobile apps",
      date: "April 19-21, 2024",
      location: "Austin, TX",
      participants: 90,
      prize: "$7,500",
      status: "upcoming",
      category: "UI/UX",
      icon: <Palette className="h-4 w-4" />
    },
    {
      id: 7,
      title: "Data Science Competition",
      description: "Analyze datasets and build predictive models using Python and R",
      date: "April 26-28, 2024",
      location: "Boston, MA",
      participants: 110,
      prize: "$9,000",
      status: "upcoming",
      category: "Data Science",
      icon: <Database className="h-4 w-4" />
    },
    {
      id: 8,
      title: "Cybersecurity Defense Challenge",
      description: "Protect systems from cyber threats and build secure applications",
      date: "May 3-5, 2024",
      location: "Washington, DC",
      participants: 75,
      prize: "$11,000",
      status: "upcoming",
      category: "Cybersecurity",
      icon: <Shield className="h-4 w-4" />
    },
    {
      id: 9,
      title: "Full Stack Web Development",
      description: "Build complete web applications with modern frameworks and databases",
      date: "May 10-12, 2024",
      location: "Chicago, IL",
      participants: 140,
      prize: "$8,500",
      status: "upcoming",
      category: "Web Development",
      icon: <Code className="h-4 w-4" />
    },
    {
      id: 10,
      title: "IoT Innovation Hackathon",
      description: "Create smart devices and IoT solutions for home automation",
      date: "May 17-19, 2024",
      location: "Denver, CO",
      participants: 65,
      prize: "$5,500",
      status: "upcoming",
      category: "IoT",
      icon: <Zap className="h-4 w-4" />
    },
    {
      id: 11,
      title: "FinTech Innovation Challenge",
      description: "Develop financial technology solutions for payments and banking",
      date: "May 24-26, 2024",
      location: "Miami, FL",
      participants: 95,
      prize: "$13,000",
      status: "upcoming",
      category: "FinTech",
      icon: <Globe className="h-4 w-4" />
    },
    {
      id: 12,
      title: "HealthTech Solutions Hackathon",
      description: "Build healthcare applications and medical technology solutions",
      date: "May 31 - June 2, 2024",
      location: "Portland, OR",
      participants: 85,
      prize: "$10,500",
      status: "upcoming",
      category: "HealthTech",
      icon: <Heart className="h-4 w-4" />
    },
    {
      id: 13,
      title: "EdTech Learning Platform",
      description: "Create educational technology solutions for online learning",
      date: "June 7-9, 2024",
      location: "Virtual",
      participants: 130,
      prize: "$7,000",
      status: "upcoming",
      category: "EdTech",
      icon: <Globe className="h-4 w-4" />
    },
    {
      id: 14,
      title: "Music Technology Innovation",
      description: "Develop music production tools and audio processing applications",
      date: "June 14-16, 2024",
      location: "Nashville, TN",
      participants: 60,
      prize: "$6,500",
      status: "upcoming",
      category: "Music Tech",
      icon: <Music className="h-4 w-4" />
    },
    {
      id: 15,
      title: "Automotive Tech Challenge",
      description: "Build solutions for autonomous vehicles and smart transportation",
      date: "June 21-23, 2024",
      location: "Detroit, MI",
      participants: 70,
      prize: "$12,500",
      status: "upcoming",
      category: "Automotive",
      icon: <Car className="h-4 w-4" />
    },
    {
      id: 16,
      title: "E-commerce Innovation Hackathon",
      description: "Create next-generation online shopping and retail solutions",
      date: "June 28-30, 2024",
      location: "Phoenix, AZ",
      participants: 105,
      prize: "$9,500",
      status: "upcoming",
      category: "E-commerce",
      icon: <ShoppingBag className="h-4 w-4" />
    },
    {
      id: 17,
      title: "AR/VR Experience Design",
      description: "Build immersive augmented and virtual reality experiences",
      date: "July 5-7, 2024",
      location: "San Diego, CA",
      participants: 55,
      prize: "$8,000",
      status: "upcoming",
      category: "AR/VR",
      icon: <Gamepad2 className="h-4 w-4" />
    },
    {
      id: 18,
      title: "DevOps & Infrastructure",
      description: "Automate deployment pipelines and build scalable infrastructure",
      date: "July 12-14, 2024",
      location: "Atlanta, GA",
      participants: 90,
      prize: "$7,500",
      status: "upcoming",
      category: "DevOps",
      icon: <Cloud className="h-4 w-4" />
    },
    {
      id: 19,
      title: "Open Source Contribution",
      description: "Contribute to open source projects and build developer tools",
      date: "July 19-21, 2024",
      location: "Virtual",
      participants: 200,
      prize: "$5,000",
      status: "upcoming",
      category: "Open Source",
      icon: <Code className="h-4 w-4" />
    },
    {
      id: 20,
      title: "Sustainability Tech Challenge",
      description: "Develop technology solutions for environmental sustainability",
      date: "July 26-28, 2024",
      location: "Portland, OR",
      participants: 80,
      prize: "$11,000",
      status: "upcoming",
      category: "Green Tech",
      icon: <Globe className="h-4 w-4" />
    }
  ];

  const categories = [
    "All", "AI/ML", "Blockchain", "Mobile", "Cloud Computing", 
    "Game Development", "UI/UX", "Data Science", "Cybersecurity", 
    "Web Development", "IoT", "FinTech", "HealthTech", "EdTech", 
    "Music Tech", "Automotive", "E-commerce", "AR/VR", "DevOps", 
    "Open Source", "Green Tech"
  ];

  const statuses = ["All", "upcoming", "ongoing", "completed"];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" || event.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

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
                <div className="relative">
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-neutral-900 dark:text-white"
                  >
                    <Filter className="h-4 w-4" />
                    Filter
                    <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showFilters && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg shadow-lg z-10 p-4">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Category
                          </label>
                          <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white"
                          >
                            {categories.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Status
                          </label>
                          <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white"
                          >
                            {statuses.map(status => (
                              <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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
                placeholder="Search events by title, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
              />
            </motion.div>

            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex justify-between items-center"
            >
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Showing {filteredEvents.length} of {events.length} events
              </p>
              {(selectedCategory !== "All" || selectedStatus !== "All" || searchTerm) && (
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedStatus("All");
                    setSearchTerm("");
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Clear filters
                </button>
              )}
            </motion.div>

            {/* Events Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredEvents.map((event, index) => (
                <motion.div 
                  key={event.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className=""
                >
                  <GlowingCard
                    icon={event.icon}
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
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-xs rounded-full font-medium">
                          {event.category}
                        </span>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                          Join Event
                        </button>
                      </div>
                    </div>
                  </GlowingCard>
                </motion.div>
              ))}
            </motion.div>

            {/* No Results */}
            {filteredEvents.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-12"
              >
                <Calendar className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  No events found
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Try adjusting your search terms or filters
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedStatus("All");
                    setSearchTerm("");
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}