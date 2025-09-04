"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  Target, 
  TrendingUp, 
  Award, 
  BookOpen,
  Plus,
  Search,
  Filter,
  Star,
  CheckCircle
} from "lucide-react";

export default function SkillsPage() {
  const userRole = "participant";
  const userName = "John Doe";
  const userAvatar = undefined;

  const skills = [
    {
      id: 1,
      name: "React",
      level: 85,
      category: "Frontend",
      projects: 12,
      lastUsed: "2 days ago",
      status: "learning"
    },
    {
      id: 2,
      name: "Python",
      level: 92,
      category: "Backend",
      projects: 18,
      lastUsed: "1 day ago",
      status: "expert"
    },
    {
      id: 3,
      name: "Machine Learning",
      level: 68,
      category: "AI/ML",
      projects: 5,
      lastUsed: "1 week ago",
      status: "learning"
    },
    {
      id: 4,
      name: "Docker",
      level: 75,
      category: "DevOps",
      projects: 8,
      lastUsed: "3 days ago",
      status: "intermediate"
    }
  ];

  const learningPaths = [
    {
      id: 1,
      title: "Full Stack Development",
      description: "Master both frontend and backend technologies",
      progress: 65,
      skills: ["React", "Node.js", "MongoDB", "Express"],
      estimatedTime: "3 months"
    },
    {
      id: 2,
      title: "AI/ML Engineer",
      description: "Build intelligent applications with machine learning",
      progress: 30,
      skills: ["Python", "TensorFlow", "Pandas", "Scikit-learn"],
      estimatedTime: "6 months"
    },
    {
      id: 3,
      title: "DevOps Specialist",
      description: "Deploy and scale applications efficiently",
      progress: 45,
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
      estimatedTime: "4 months"
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
                  Skills Tracker
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Track your progress and discover new skills to learn
                </p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors">
                  <Plus className="h-4 w-4" />
                  Add Skill
                </button>
              </div>
            </motion.div>

            {/* Skills Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                Your Skills
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill) => (
                  <div key={skill.id} className="h-[280px]">
                    <GlowingCard
                      icon={<Target className="h-4 w-4" />}
                      title={skill.name}
                      description={`${skill.level}% proficiency • ${skill.projects} projects`}
                      className="h-full"
                    >
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            Proficiency
                          </span>
                          <span className="text-sm font-medium text-neutral-900 dark:text-white">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-[#FFA100] to-[#FFA100] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <Award className="h-4 w-4" />
                          {skill.category}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <TrendingUp className="h-4 w-4" />
                          Last used: {skill.lastUsed}
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            skill.status === 'expert' ? 'bg-[#FAF000]/10 dark:bg-[#FAF000] text-[#FF9000] dark:text-[#FAF000]' :
                            skill.status === 'intermediate' ? 'bg-[#FAF000]/10 dark:bg-[#FAF000] text-[#FF9000] dark:text-[#FAF000]' :
                            'bg-[#FAF000]/10 dark:bg-[#FAF000] text-[#FF9000] dark:text-[#FAF000]'
                          }`}>
                            {skill.status}
                          </span>
                          <button className="px-3 py-1 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors text-sm">
                            Practice
                          </button>
                        </div>
                      </div>
                    </GlowingCard>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Learning Paths */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                Learning Paths
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learningPaths.map((path) => (
                  <div key={path.id} className="h-[320px]">
                    <GlowingCard
                      icon={<BookOpen className="h-4 w-4" />}
                      title={path.title}
                      description={path.description}
                      className="h-full"
                    >
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            Progress
                          </span>
                          <span className="text-sm font-medium text-neutral-900 dark:text-white">
                            {path.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-[#FF9000] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${path.progress}%` }}
                          ></div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Skills to learn:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {path.skills.map((skill, index) => (
                              <span key={index} className="px-2 py-1 bg-[#FAF000]/10 dark:bg-[#FAF000] text-[#FF9000] dark:text-[#FAF000] text-xs rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <CheckCircle className="h-4 w-4" />
                          Est. time: {path.estimatedTime}
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button className="flex-1 px-3 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors text-sm">
                            Continue
                          </button>
                          <button className="px-3 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                            <Star className="h-4 w-4" />
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
