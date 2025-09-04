"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  Award, 
  ExternalLink,
  Code,
  Target
} from "lucide-react";

export default function QuizzesPage() {
  const userRole = "participant";
  const userName = "John Doe";
  const userAvatar = undefined;





  const codingPlatforms = [
    {
      id: 1,
      name: "HackerRank",
      description: "Practice coding challenges and technical interviews",
      category: "Interview Prep",
      difficulty: "All Levels",
      problems: "1000+",
      color: "from-[#FAF000] to-[#FFDD00]"
    },
    {
      id: 2,
      name: "LeetCode",
      description: "Algorithm and data structure problems",
      category: "Algorithms",
      difficulty: "All Levels",
      problems: "2000+",
      color: "from-[#FFA100] to-[#FF9000]"
    },
    {
      id: 3,
      name: "Codeforces",
      description: "Competitive programming contests and problems",
      category: "Competitive",
      difficulty: "Advanced",
      problems: "8000+",
      color: "from-[#FAF000] to-[#FFDD00]"
    },
    {
      id: 4,
      name: "TopCoder",
      description: "Algorithm competitions and SRM contests",
      category: "Competitive",
      difficulty: "Advanced",
      problems: "2000+",
      color: "from-[#FAF000] to-[#FFA100]"
    },
    {
      id: 5,
      name: "Codewars",
      description: "Kata challenges to improve coding skills",
      category: "Practice",
      difficulty: "All Levels",
      problems: "5000+",
      color: "from-[#FF9000] to-[#FFA100]"
    },
    {
      id: 6,
      name: "Project Euler",
      description: "Mathematical and computational problems",
      category: "Mathematics",
      difficulty: "Advanced",
      problems: "800+",
      color: "from-[#FFA100] to-[#FFDD00]"
    },
    {
      id: 7,
      name: "Exercism",
      description: "Learn programming languages through exercises",
      category: "Learning",
      difficulty: "All Levels",
      problems: "3000+",
      color: "from-[#FFDD00] to-[#FAF000]"
    },
    {
      id: 8,
      name: "AtCoder",
      description: "Japanese competitive programming platform",
      category: "Competitive",
      difficulty: "All Levels",
      problems: "4000+",
      color: "from-[#FAF000] to-[#FFA100]"
    },
    {
      id: 9,
      name: "Coderbyte",
      description: "Coding challenges and interview preparation",
      category: "Interview Prep",
      difficulty: "All Levels",
      problems: "500+",
      color: "from-[#FFA100] to-[#FF9000]"
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
                  Coding Practice
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Access coding platforms and track your progress
                </p>
              </div>

            </motion.div>



            {/* Coding Platforms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                Coding Platforms
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {codingPlatforms.map((platform) => (
                  <div key={platform.id} className="">
                    <GlowingCard
                      icon={<Code className="h-4 w-4 text-[#FFA100]" />}
                      title={platform.name}
                      description={platform.description}
                      className="h-full"
                    >
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <Target className="h-4 w-4 text-[#FFA100]" />
                          {platform.problems} problems
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <Award className="h-4 w-4 text-[#FFA100]" />
                          {platform.difficulty}
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <span className="px-2 py-1 bg-[#FAF000]/10 dark:bg-[#FAF000] text-[#FF9000] dark:text-[#FAF000] text-xs rounded-full">
                            {platform.category}
                          </span>
                          <button className={`flex items-center gap-2 px-3 py-2 bg-gradient-to-r ${platform.color} text-white rounded-lg hover:opacity-90 transition-opacity text-sm`}>
                            <ExternalLink className="h-3 w-3 text-white" />
                            Visit
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
