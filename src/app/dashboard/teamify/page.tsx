"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter,
  Star,
  MapPin,
  Calendar,
  MessageCircle,
  Plus
} from "lucide-react";

export default function TeamifyPage() {
  const userRole = "participant"; // This would come from auth context
  const userName = "John Doe";
  const userAvatar = undefined;

  const teams = [
    {
      id: 1,
      name: "AI Innovators",
      description: "Building the future of artificial intelligence",
      members: 3,
      maxMembers: 4,
      skills: ["Python", "TensorFlow", "React"],
      lookingFor: ["Backend Developer", "UI/UX Designer"],
      event: "AI Innovation Hackathon 2024"
    },
    {
      id: 2,
      name: "Blockchain Builders",
      description: "Creating decentralized applications",
      members: 2,
      maxMembers: 5,
      skills: ["Solidity", "Web3", "Node.js"],
      lookingFor: ["Smart Contract Developer", "Frontend Developer"],
      event: "Web3 Development Challenge"
    },
    {
      id: 3,
      name: "Mobile Masters",
      description: "Designing innovative mobile experiences",
      members: 4,
      maxMembers: 4,
      skills: ["React Native", "Swift", "Kotlin"],
      lookingFor: [],
      event: "Mobile App Sprint"
    }
  ];

  const availableMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      skills: ["React", "Node.js", "MongoDB"],
      experience: "3 years",
      rating: 4.8,
      avatar: "SC"
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      skills: ["Python", "Machine Learning", "Docker"],
      experience: "5 years",
      rating: 4.9,
      avatar: "AR"
    },
    {
      id: 3,
      name: "Emma Wilson",
      skills: ["UI/UX", "Figma", "CSS"],
      experience: "2 years",
      rating: 4.7,
      avatar: "EW"
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
                  Teamify
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Find teammates and build amazing projects together
                </p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors">
                  <Plus className="h-4 w-4" />
                  Create Team
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
                placeholder="Search teams or members..."
                className="w-full pl-10 pr-4 py-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9000]"
              />
            </motion.div>

            {/* Teams Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                Available Teams
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map((team) => (
                  <div key={team.id} className="h-[350px]">
                    <GlowingCard
                      icon={<Users className="h-4 w-4" />}
                      title={team.name}
                      description={team.description}
                      className="h-full"
                    >
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <Users className="h-4 w-4" />
                          {team.members}/{team.maxMembers} members
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <Calendar className="h-4 w-4" />
                          {team.event}
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Skills:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {team.skills.map((skill, index) => (
                              <span key={index} className="px-2 py-1 bg-[#FAF000]/10 dark:bg-[#FAF000] text-[#FF9000] dark:text-[#FAF000] text-xs rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        {team.lookingFor.length > 0 && (
                          <div className="space-y-2">
                            <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                              Looking for:
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {team.lookingFor.map((role, index) => (
                                <span key={index} className="px-2 py-1 bg-[#FAF000]/10 dark:bg-[#FAF000] text-[#FF9000] dark:text-[#FAF000] text-xs rounded-full">
                                  {role}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="flex gap-2 pt-2">
                          <button className="flex-1 px-3 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors text-sm">
                            Join Team
                          </button>
                          <button className="px-3 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                            <MessageCircle className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </GlowingCard>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Available Members Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                Available Members
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableMembers.map((member) => (
                  <div key={member.id} className="h-[250px]">
                    <GlowingCard
                      icon={<UserPlus className="h-4 w-4" />}
                      title={member.name}
                      description={`${member.experience} experience • ${member.rating}★ rating`}
                      className="h-full"
                    >
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <Star className="h-4 w-4" />
                          {member.rating}★ rating
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Skills:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {member.skills.map((skill, index) => (
                              <span key={index} className="px-2 py-1 bg-[#FAF000]/10 dark:bg-[#FAF000] text-[#FF9000] dark:text-[#FAF000] text-xs rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button className="flex-1 px-3 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors text-sm">
                            Invite
                          </button>
                          <button className="px-3 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                            <MessageCircle className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </GlowingCard>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
