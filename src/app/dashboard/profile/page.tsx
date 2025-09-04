"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar,
  Github,
  Linkedin,
  Twitter,
  Edit,
  Save,
  Camera,
  Award,
  Trophy,
  Star
} from "lucide-react";

export default function ProfilePage() {
  const userRole = "participant"; // This would come from auth context
  const userName = "John Doe";
  const userAvatar = undefined;

  const achievements = [
    {
      id: 1,
      title: "First Hackathon Win",
      description: "Won AI Innovation Hackathon 2024",
      date: "March 2024",
      icon: <Trophy className="h-4 w-4" />
    },
    {
      id: 2,
      title: "Top 10% Developer",
      description: "Ranked in top 10% of all participants",
      date: "February 2024",
      icon: <Award className="h-4 w-4" />
    },
    {
      id: 3,
      title: "Team Player",
      description: "Successfully collaborated in 5+ teams",
      date: "January 2024",
      icon: <Star className="h-4 w-4" />
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
                  Profile
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Manage your profile and showcase your achievements
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors">
                <Edit className="h-4 w-4" />
                Edit Profile
              </button>
            </motion.div>

            {/* Profile Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="h-[200px]"
            >
              <GlowingCard
                icon={<User className="h-4 w-4" />}
                title="John Doe"
                description="Full Stack Developer • 3 years experience"
                className="h-full"
              >
                <div className="mt-4 flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FAF000] to-[#FFDD00] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">JD</span>
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#FF9000] rounded-full flex items-center justify-center hover:bg-[#FFA100] transition-colors">
                      <Camera className="h-3 w-3 text-white" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                      <Mail className="h-4 w-4" />
                      john.doe@example.com
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                      <MapPin className="h-4 w-4" />
                      San Francisco, CA
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <Calendar className="h-4 w-4" />
                      Joined March 2023
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                      <Github className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                      <Linkedin className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                      <Twitter className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </GlowingCard>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                Achievements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="h-[200px]">
                    <GlowingCard
                      icon={achievement.icon}
                      title={achievement.title}
                      description={achievement.description}
                      className="h-full"
                    >
                      <div className="mt-4 flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <Calendar className="h-4 w-4" />
                        {achievement.date}
                      </div>
                    </GlowingCard>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Profile Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="h-[150px]">
                <GlowingCard
                  icon={<Trophy className="h-4 w-4" />}
                  title="Hackathons Won"
                  description="3 first place finishes"
                  className="h-full"
                />
              </div>
              <div className="h-[150px]">
                <GlowingCard
                  icon={<Award className="h-4 w-4" />}
                  title="Projects Built"
                  description="12 completed projects"
                  className="h-full"
                />
              </div>
              <div className="h-[150px]">
                <GlowingCard
                  icon={<Star className="h-4 w-4" />}
                  title="Team Collaborations"
                  description="25 successful teams"
                  className="h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
