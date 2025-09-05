"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useGitHub } from "@/hooks/use-github";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Trophy, 
  Star,
  Code,
  Target,
  BookOpen,
  MessageCircle,
  TrendingUp,
  Award,
  Activity,
  Zap,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  ArrowRight,
  Github,
  Brain,
  Shield,
  Smartphone,
  Cloud,
  Gamepad2,
  Palette,
  Database
} from "lucide-react";

function ParticipantDashboard() {
  const userRole = "participant";
  const userName = "John Doe";
  const userAvatar = undefined;

  const [githubUsername, setGithubUsername] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingSkills, setOnboardingSkills] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("Frontend");
  const [onboardingLinks, setOnboardingLinks] = useState({ github: "", linkedin: "", twitter: "" });
  const { repos, loading: githubLoading } = useGitHub();

  // Load saved GitHub username
  useEffect(() => {
    const savedUsername = localStorage.getItem('githubUsername');
    if (savedUsername) {
      setGithubUsername(savedUsername);
    }
    // Detect pending onboarding - only show if this is a fresh signup
    try {
      const pending = localStorage.getItem('onboarding_pending');
      const onboardingCompleted = localStorage.getItem('onboarding_completed');
      
      // Only show onboarding if it's pending AND not already completed
      if (pending === 'participant' && onboardingCompleted !== 'true') {
        setShowOnboarding(true);
        // Prefill links if available
        const gh = localStorage.getItem('githubUsername') || "";
        setOnboardingLinks((prev) => ({ ...prev, github: gh }));
      }
    } catch {}
  }, []);

  const skillCategories: Record<string, string[]> = {
    Frontend: [
      "React", "Next.js", "Vue.js", "Angular", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Sass", "Figma", "Adobe XD"
    ],
    Backend: [
      "Node.js", "Python", "Java", "C#", "Go", "Rust", "Express.js", "Django", "Spring Boot", "FastAPI", "PostgreSQL", "MongoDB", "Redis", "Docker", "AWS", "Azure"
    ],
    Fullstack: [
      "React", "Next.js", "Node.js", "Python", "TypeScript", "PostgreSQL", "MongoDB", "Docker", "AWS", "Vercel", "Supabase", "Prisma", "GraphQL", "REST API"
    ],
    Mobile: [
      "React Native", "Flutter", "Swift", "Kotlin", "iOS", "Android", "Expo", "Firebase", "App Store", "Google Play"
    ],
    DevOps: [
      "Docker", "Kubernetes", "AWS", "Azure", "GCP", "CI/CD", "Jenkins", "GitHub Actions", "Terraform", "Ansible", "Linux", "Bash"
    ],
    "Data Science": [
      "Python", "R", "SQL", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch", "Jupyter", "Tableau", "Power BI", "Machine Learning"
    ],
    "UI/UX": [
      "Figma", "Adobe XD", "Sketch", "InVision", "Principle", "User Research", "Wireframing", "Prototyping", "Design Systems", "Accessibility"
    ],
    Blockchain: [
      "Solidity", "Web3.js", "Ethers.js", "Hardhat", "Truffle", "IPFS", "Ethereum", "Polygon", "Smart Contracts", "DeFi", "NFTs"
    ],
    "Game Development": [
      "Unity", "Unreal Engine", "C#", "C++", "JavaScript", "Blender", "Maya", "3D Modeling"
    ],
    Cybersecurity: [
      "Penetration Testing", "Ethical Hacking", "Network Security", "Cryptography", "OWASP", "Kali Linux", "Wireshark", "SIEM"
    ],
    "AI/ML": [
      "Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision", "TensorFlow", "PyTorch", "OpenAI API", "Hugging Face"
    ],
    "Cloud Computing": [
      "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "Serverless", "Microservices"
    ],
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    // Track visited/selected categories optionally for styling
    setSelectedCategories((prev) => (prev.includes(category) ? prev : [...prev, category]));
  };

  const toggleSkill = (skill: string) => {
    setOnboardingSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const completeOnboarding = () => {
    try {
      localStorage.setItem('participant_skills', JSON.stringify(onboardingSkills));
      // Save links
      if (onboardingLinks.github) localStorage.setItem('githubUsername', onboardingLinks.github);
      localStorage.setItem('linkedin_url', onboardingLinks.linkedin || "");
      localStorage.setItem('twitter_url', onboardingLinks.twitter || "");
      // Mark onboarding as completed and remove pending flag
      localStorage.setItem('onboarding_completed', 'true');
      localStorage.removeItem('onboarding_pending');
    } catch {}
    setShowOnboarding(false);
    if (onboardingLinks.github) setGithubUsername(onboardingLinks.github);
  };

  const skipOnboarding = () => {
    try {
      // Mark onboarding as completed even when skipped
      localStorage.setItem('onboarding_completed', 'true');
      localStorage.removeItem('onboarding_pending');
    } catch {}
    setShowOnboarding(false);
  };

  // Mock data for dashboard stats
  const dashboardStats = {
    hackathonsParticipated: 8,
    hackathonsWon: 3,
    totalProjects: 12,
    teamCollaborations: 25,
    skillsLearned: 15,
    githubRepos: repos.length,
    currentStreak: 7,
    totalPoints: 2450
  };

  const recentActivity = [
    {
      id: 1,
      type: "hackathon",
      title: "AI Innovation Hackathon 2024",
      description: "Won 1st place with your team",
      date: "2 days ago",
      icon: <Trophy className="h-4 w-4 text-[#FFA100]" />,
      color: "text-[#FF9000]"
    },
    {
      id: 2,
      type: "project",
      title: "Updated React Portfolio",
      description: "Added new projects to your GitHub",
      date: "3 days ago",
      icon: <Code className="h-4 w-4 text-[#FFA100]" />,
      color: "text-[#FF9000]"
    },
    {
      id: 3,
      type: "skill",
      title: "Completed TypeScript Course",
      description: "Advanced TypeScript patterns",
      date: "5 days ago",
      icon: <Target className="h-4 w-4 text-[#FFA100]" />,
      color: "text-[#FF9000]"
    },
    {
      id: 4,
      type: "team",
      title: "Joined Mobile App Team",
      description: "Working on React Native project",
      date: "1 week ago",
      icon: <Users className="h-4 w-4 text-[#FFA100]" />,
      color: "text-[#FF9000]"
    }
  ];

  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      title: "Web3 Development Challenge",
      date: "March 22-24, 2024",
      location: "Virtual",
      participants: 200,
      prize: "$15,000",
      category: "Blockchain"
    },
    {
      id: 2,
      title: "Mobile App Sprint",
      date: "March 29-31, 2024",
      location: "New York, NY",
      participants: 100,
      prize: "$8,000",
      category: "Mobile"
    },
    {
      id: 3,
      title: "Cloud Infrastructure Hackathon",
      date: "April 5-7, 2024",
      location: "Seattle, WA",
      participants: 120,
      prize: "$12,000",
      category: "Cloud Computing"
    }
  ] as any[]);

  useEffect(() => {
    try {
      const rawIds = localStorage.getItem('joined_events');
      const rawMap = localStorage.getItem('joined_events_data');
      const ids: number[] = rawIds ? JSON.parse(rawIds) : [];
      const map = rawMap ? JSON.parse(rawMap) : {};
      const joined = ids
        .map((id) => map[id])
        .filter(Boolean)
        .map((e: any) => ({
          id: Number(e.id),
          title: e.title || `Event #${e.id}`,
          date: e.date || 'TBD',
          location: e.location || 'TBD',
          participants: e.participants || 0,
          prize: e.prize || '$0',
          category: e.category || 'Event'
        }));
      if (joined.length) {
        setUpcomingEvents((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const merged = [...joined.filter((j: any) => !existingIds.has(j.id)), ...prev];
          return merged;
        });
      }
    } catch {}
  }, []);

  const topSkills = [
    { name: "React", level: 85, category: "Frontend" },
    { name: "TypeScript", level: 78, category: "Frontend" },
    { name: "Node.js", level: 72, category: "Backend" },
    { name: "Python", level: 68, category: "Backend" },
    { name: "Docker", level: 65, category: "DevOps" }
  ];

  const quickActions = [
    {
      title: "Join Event",
      description: "Find and join hackathons",
      icon: <Calendar className="h-6 w-6 text-white" />,
      href: "/participant/dashboard/events",
      color: "bg-[#FF9000] hover:bg-[#FFA100]"
    },
    {
      title: "Create Team",
      description: "Build your dream team",
      icon: <Users className="h-6 w-6 text-white" />,
      href: "/participant/dashboard/teamify",
      color: "bg-[#FF9000] hover:bg-[#FFA100]"
    },
    {
      title: "Track Skills",
      description: "Monitor your progress",
      icon: <Target className="h-6 w-6 text-white" />,
      href: "/participant/dashboard/skills",
      color: "bg-[#FF9000] hover:bg-[#FFA100]"
    },
    {
      title: "Practice Coding",
      description: "Improve your skills",
      icon: <Code className="h-6 w-6 text-white" />,
      href: "/participant/dashboard/quizzes",
      color: "bg-[#FF9000] hover:bg-[#FFA100]"
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
            {showOnboarding && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">Welcome! Let's set you up</h3>
                    <button className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200" onClick={skipOnboarding}>✕</button>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-neutral-900 dark:text-white mb-2">Add your skills</h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">Select categories first, then pick relevant skills.</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {Object.keys(skillCategories).map((category) => (
                          <button
                            key={category}
                            onClick={() => handleCategoryClick(category)}
                            className={`px-3 py-1.5 rounded-full border text-sm transition-colors ${
                              activeCategory === category
                                ? "bg-[#FF9000] text-white border-[#FF9000]"
                                : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                      {activeCategory && (
                        <motion.div
                          key={activeCategory}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{activeCategory}</span>
                            <span className="text-xs text-[#FF9000]">Pick relevant skills</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {skillCategories[activeCategory].map((skill) => (
                              <button
                                key={`${activeCategory}-${skill}`}
                                onClick={() => toggleSkill(skill)}
                                className={`px-3 py-1.5 rounded-full border text-sm transition-colors ${
                                  onboardingSkills.includes(skill)
                                    ? "bg-[#FF9000] text-white border-[#FF9000]"
                                    : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                                }`}
                              >
                                {skill}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-1">GitHub Username</label>
                        <input
                          type="text"
                          value={onboardingLinks.github}
                          onChange={(e) => setOnboardingLinks({ ...onboardingLinks, github: e.target.value })}
                          placeholder="your-handle"
                          className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-1">LinkedIn URL</label>
                        <input
                          type="url"
                          value={onboardingLinks.linkedin}
                          onChange={(e) => setOnboardingLinks({ ...onboardingLinks, linkedin: e.target.value })}
                          placeholder="https://linkedin.com/in/username"
                          className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-1">Twitter URL</label>
                        <input
                          type="url"
                          value={onboardingLinks.twitter}
                          onChange={(e) => setOnboardingLinks({ ...onboardingLinks, twitter: e.target.value })}
                          placeholder="https://twitter.com/username"
                          className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <button onClick={skipOnboarding} className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800">Skip for now</button>
                    <button onClick={completeOnboarding} className="px-4 py-2 rounded-lg bg-[#FF9000] text-white hover:bg-[#FFA100]">Save and continue</button>
                  </div>
                </div>
              </div>
            )}
            {/* Welcome Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-between items-center"
            >
              <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                  Welcome back, {userName}! 👋
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Ready to build something amazing today?
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <Activity className="h-4 w-4 text-[#FFA100]" />
                <span>7 day streak</span>
              </div>
            </motion.div>

            {/* Stats Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <GlowingCard className="h-full">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 rounded-lg">
                    <Trophy className="h-5 w-5 text-[#FF9000]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {dashboardStats.hackathonsWon}
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Hackathons Won
                    </p>
                  </div>
                </div>
              </GlowingCard>

              <GlowingCard className="h-full">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 rounded-lg">
                    <Code className="h-5 w-5 text-[#FF9000]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {dashboardStats.totalProjects}
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Projects Built
                    </p>
                  </div>
                </div>
              </GlowingCard>

              <GlowingCard className="h-full">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 rounded-lg">
                    <Users className="h-5 w-5 text-[#FF9000]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {dashboardStats.teamCollaborations}
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Team Collaborations
                    </p>
                  </div>
                </div>
              </GlowingCard>

              <GlowingCard className="h-full">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 rounded-lg">
                    <Zap className="h-5 w-5 text-[#FF9000]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {dashboardStats.totalPoints}
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Total Points
                    </p>
                  </div>
                </div>
              </GlowingCard>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                      className="group cursor-pointer"
                    >
                      <GlowingCard className="h-full">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 ${action.color} rounded-lg text-white transition-colors`}>
                            {action.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-neutral-900 dark:text-white group-hover:text-[#FF9000] dark:group-hover:text-[#FAF000] transition-colors">
                              {action.title}
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              {action.description}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-[#FF9000] group-hover:text-[#FFA100] dark:group-hover:text-[#FFDD00] transition-colors" />
                        </div>
                      </GlowingCard>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                    Recent Activity
                  </h2>
                  <Link href="/participant/dashboard/profile" className="text-sm text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200">
                    View all
                  </Link>
                </div>
                <GlowingCard className="h-full">
                  <div className="space-y-4 pb-6">
                    {recentActivity.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                      >
                        <div className={`p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg ${activity.color}`}>
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-neutral-900 dark:text-white">
                            {activity.title}
                          </h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            {activity.description}
                          </p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                            {activity.date}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </GlowingCard>
              </motion.div>

              {/* Upcoming Events */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                    Upcoming Events
                  </h2>
                  <Link href="/participant/dashboard/events" className="text-sm text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200">
                    View all
                  </Link>
                </div>
                <GlowingCard className="h-full">
                  <div className="space-y-4 pb-6">
                    {upcomingEvents.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                        className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-neutral-900 dark:text-white">
                            {event.title}
                          </h4>
                          <span className="px-2 py-1 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 text-neutral-600 dark:text-neutral-400 text-xs rounded-full">
                            {event.category}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-[#FFA100]" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-[#FFA100]" />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-[#FFA100]" />
                            {event.participants} participants
                          </div>
                          <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-[#FFA100]" />
                            {event.prize} prize pool
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </GlowingCard>
              </motion.div>
            </div>

            {/* Top Skills & GitHub Projects */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Top Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                    Top Skills
                  </h2>
                  <Link href="/participant/dashboard/skills" className="text-sm text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200">
                    View all
                  </Link>
                </div>
                <GlowingCard className="h-full">
                  <div className="space-y-4">
                    {topSkills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 + index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-neutral-900 dark:text-white">
                              {skill.name}
                            </span>
                            <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs rounded-full">
                              {skill.category}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-[#FF9000] to-[#FF9000] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </GlowingCard>
              </motion.div>

              {/* GitHub Projects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                    GitHub Projects
                  </h2>
                  <Link href="/participant/dashboard/profile" className="text-sm text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200">
                    View all
                  </Link>
                </div>
                <GlowingCard className="h-full">
                  {githubUsername ? (
                    <div className="space-y-4">
                      {githubLoading ? (
                        Array.from({ length: 3 }).map((_, index) => (
                          <div key={index} className="animate-pulse">
                            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
                            <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
                            <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
                          </div>
                        ))
                      ) : repos.length > 0 ? (
                        repos.slice(0, 3).map((repo, index) => (
                          <motion.div
                            key={repo.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                            className="p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-neutral-900 dark:text-white">
                                {repo.name}
                              </h4>
                              <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                              >
                                <ExternalLink className="h-4 w-4 text-[#FFA100]" />
                              </a>
                            </div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                              {repo.description || "No description available"}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-[#FF9000] dark:text-neutral-400">
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-[#FFA100]" />
                                {repo.stargazers_count}
                              </div>
                              <div className="flex items-center gap-1">
                                <Github className="h-3 w-3 text-[#FFA100]" />
                                {repo.forks_count}
                              </div>
                              {repo.language && (
                                <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full">
                                  {repo.language}
                                </span>
                              )}
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <Github className="h-12 w-12 text-[#FFA100] mx-auto mb-4" />
                          <p className="text-neutral-600 dark:text-neutral-400">
                            No public repositories found
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Github className="h-12 w-12 text-[#FFA100] mx-auto mb-4" />
                      <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                        Connect GitHub
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                        Add your GitHub username to showcase your projects
                      </p>
                      <Link
                        href="/participant/dashboard/profile"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors text-sm"
                      >
                        <Github className="h-4 w-4 text-[#FFA100]" />
                        Connect GitHub
                      </Link>
                    </div>
                  )}
                </GlowingCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Onboarding Modal UI appended to main render

export default function ParticipantDashboardPage() {
  return <ParticipantDashboard />;
}
