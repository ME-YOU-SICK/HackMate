"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  Map, 
  ExternalLink,
  BookOpen,
  Target,
  Star,
  Users,
  Clock
} from "lucide-react";

export default function RoadmapsPage() {
  const userRole = "participant";
  const userName = "John Doe";
  const userAvatar = undefined;

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
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 rounded-full">
                  <Map className="h-12 w-12 text-[#FF9000]" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                Learning Roadmaps
              </h1>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                Discover comprehensive learning paths for various tech careers and skills
              </p>
            </motion.div>

            {/* Description Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-4xl mx-auto"
            >
              <GlowingCard className="h-full">
                <div className="text-center space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
                      What are Learning Roadmaps?
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                      Learning roadmaps are structured, step-by-step guides that help you navigate your journey 
                      to mastering new technologies and skills. They provide a clear path from beginner to expert, 
                      with curated resources, projects, and milestones along the way.
                    </p>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="p-3 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 rounded-full">
                        <Target className="h-6 w-6 text-[#FF9000]" />
                      </div>
                      <h3 className="font-semibold text-neutral-900 dark:text-white">Structured Learning</h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
                        Follow a clear, organized path with defined milestones and goals
                      </p>
                    </div>

                    <div className="flex flex-col items-center space-y-3">
                      <div className="p-3 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 rounded-full">
                        <BookOpen className="h-6 w-6 text-[#FF9000]" />
                      </div>
                      <h3 className="font-semibold text-neutral-900 dark:text-white">Curated Resources</h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
                        Access handpicked tutorials, articles, and projects for each step
                      </p>
                    </div>

                    <div className="flex flex-col items-center space-y-3">
                      <div className="p-3 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 rounded-full">
                        <Users className="h-6 w-6 text-[#FF9000]" />
                      </div>
                      <h3 className="font-semibold text-neutral-900 dark:text-white">Community Driven</h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
                        Learn from the community and contribute to roadmap improvements
                      </p>
                    </div>
                  </div>

                  {/* Popular Roadmaps */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                      Popular Learning Paths
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3">
                      {[
                        "Frontend Developer",
                        "Backend Developer", 
                        "Full Stack Developer",
                        "DevOps Engineer",
                        "Data Scientist",
                        "AI/ML Engineer",
                        "Cybersecurity Expert",
                        "Mobile Developer"
                      ].map((path, index) => (
                        <span 
                          key={index}
                          className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-sm font-medium"
                        >
                          {path}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                    <a
                      href="https://roadmap.sh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FF9000] to-[#FF9000] text-white text-lg font-semibold rounded-xl hover:from-[#FFA100] hover:to-[#FFDD00] transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <Map className="h-6 w-6" />
                      Explore Roadmaps.sh
                      <ExternalLink className="h-5 w-5" />
                    </a>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3">
                      Opens in a new tab • Free access to all roadmaps
                    </p>
                  </div>
                </div>
              </GlowingCard>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <GlowingCard className="h-full">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 text-neutral-600 dark:text-neutral-400">
                    <Clock className="h-5 w-5" />
                    <span className="text-sm">Updated regularly by the community</span>
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Roadmap.sh is maintained by developers for developers. Each roadmap is carefully curated 
                    and updated to reflect the latest industry trends and best practices.
                  </p>
                </div>
              </GlowingCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}