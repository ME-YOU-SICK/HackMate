"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useGitHub } from "@/hooks/use-github";
import { formatDate, getLanguageColor } from "@/lib/github-api";
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
  Star,
  ExternalLink,
  Code,
  GitBranch,
  Eye,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Loader2
} from "lucide-react";

export default function ProfilePage() {
  const userRole = "participant";
  const userName = "John Doe";
  const userAvatar = undefined;

  const [githubUsername, setGithubUsername] = useState("");
  const [isEditingGithub, setIsEditingGithub] = useState(false);
  const [tempGithubUsername, setTempGithubUsername] = useState("");
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  const { repos, userInfo, loading, error, fetchRepos, fetchUser, clearError } = useGitHub();

  // Load saved GitHub username from localStorage
  useEffect(() => {
    const savedUsername = localStorage.getItem('githubUsername');
    if (savedUsername) {
      setGithubUsername(savedUsername);
      setTempGithubUsername(savedUsername);
      fetchRepos(savedUsername);
      fetchUser(savedUsername);
    }
  }, [fetchRepos, fetchUser]);

  const handleGithubUsernameChange = async () => {
    if (tempGithubUsername.trim() === githubUsername) {
      setIsEditingGithub(false);
      return;
    }

    try {
      await fetchRepos(tempGithubUsername.trim());
      await fetchUser(tempGithubUsername.trim());
      
      setGithubUsername(tempGithubUsername.trim());
      localStorage.setItem('githubUsername', tempGithubUsername.trim());
      setLastSyncTime(new Date());
      setIsEditingGithub(false);
      clearError();
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handleRefresh = async () => {
    if (githubUsername) {
      await fetchRepos(githubUsername);
      await fetchUser(githubUsername);
      setLastSyncTime(new Date());
    }
  };

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
              className=""
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
                    <button className="p-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white">
                      <Github className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white">
                      <Linkedin className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white">
                      <Twitter className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </GlowingCard>
            </motion.div>

            {/* GitHub Projects Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                  GitHub Projects
                </h2>
                <div className="flex items-center gap-2">
                  {lastSyncTime && (
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      Last synced: {lastSyncTime.toLocaleTimeString()}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={handleRefresh}
                    disabled={loading || !githubUsername}
                    className="p-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* GitHub Username Input */}
              <div className="mb-4">
                <GlowingCard className="h-full">
                  <div className="flex items-center gap-4">
                    <Github className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        GitHub Username
                      </label>
                      {isEditingGithub ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={tempGithubUsername}
                            onChange={(e) => setTempGithubUsername(e.target.value)}
                            placeholder="Enter your GitHub username"
                            className="flex-1 px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleGithubUsernameChange();
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={handleGithubUsernameChange}
                            disabled={loading}
                            className="px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors disabled:opacity-50"
                          >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsEditingGithub(false);
                              setTempGithubUsername(githubUsername);
                            }}
                            className="px-4 py-2 bg-neutral-600 text-white rounded-lg hover:bg-neutral-700 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-900 dark:text-white">
                            {githubUsername || "Not connected"}
                          </span>
                          <button
                            onClick={() => {
                              setIsEditingGithub(true);
                              setTempGithubUsername(githubUsername);
                            }}
                            className="p-1 text-[#FF9000] hover:text-[#FFA100] transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </GlowingCard>
              </div>

              {/* Error Display */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 bg-[#FAF000]/5 dark:bg-[#FAF000]/20 border border-[#FAF000] dark:border-[#FF9000] rounded-lg"
                >
                  <div className="flex items-center gap-2 text-[#FF9000] dark:text-[#FAF000]">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{error}</span>
                    <button
                      onClick={clearError}
                      className="ml-auto text-[#FF9000] dark:text-[#FAF000] hover:text-[#FFA100] dark:hover:text-[#FFDD00]"
                    >
                      ×
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Projects Grid */}
              {githubUsername && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {loading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="">
                        <GlowingCard className="h-full">
                          <div className="animate-pulse">
                            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
                            <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded mb-4"></div>
                            <div className="space-y-2">
                              <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                              <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
                            </div>
                          </div>
                        </GlowingCard>
                      </div>
                    ))
                  ) : repos.length > 0 ? (
                    repos.map((repo, index) => (
                      <motion.div
                        key={repo.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className=""
                      >
                        <GlowingCard
                          icon={<Code className="h-4 w-4" />}
                          title={repo.name}
                          description={repo.description || "No description available"}
                          className="h-full"
                        >
                          <div className="mt-4 space-y-3">
                            {repo.language && (
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: getLanguageColor(repo.language) }}
                                ></div>
                                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                  {repo.language}
                                </span>
                              </div>
                            )}
                            <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4" />
                                {repo.stargazers_count}
                              </div>
                              <div className="flex items-center gap-1">
                                <GitBranch className="h-4 w-4" />
                                {repo.forks_count}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                              <Calendar className="h-4 w-4" />
                              Updated {formatDate(repo.updated_at)}
                            </div>
                            <div className="flex justify-between items-center pt-2">
                              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                {repo.private ? "Private" : "Public"}
                              </span>
                              <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 px-3 py-1 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors text-sm"
                              >
                                View
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          </div>
                        </GlowingCard>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full">
                      <GlowingCard className="h-full">
                        <div className="text-center py-8">
                          <Github className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                            No public repositories found
                          </h3>
                          <p className="text-neutral-600 dark:text-neutral-400">
                            Make sure your GitHub username is correct and you have public repositories.
                          </p>
                        </div>
                      </GlowingCard>
                    </div>
                  )}
                </div>
              )}

              {!githubUsername && (
                <div className="mb-8">
                  <GlowingCard className="h-full pb-6">
                    <div className="text-center py-10">
                      <Github className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                        Connect your GitHub account
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                        Add your GitHub username to showcase your top 5 repositories
                      </p>
                      <button
                        onClick={() => {
                          setIsEditingGithub(true);
                          setTempGithubUsername("");
                        }}
                        className="px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors"
                      >
                        Add GitHub Username
                      </button>
                    </div>
                  </GlowingCard>
                </div>
              )}
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
                  <div key={achievement.id} className="">
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
              <div className="">
                <GlowingCard
                  icon={<Trophy className="h-4 w-4" />}
                  title="Hackathons Won"
                  description="3 first place finishes"
                  className="h-full"
                />
              </div>
              <div className="">
                <GlowingCard
                  icon={<Award className="h-4 w-4" />}
                  title="Projects Built"
                  description="12 completed projects"
                  className="h-full"
                />
              </div>
              <div className="">
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