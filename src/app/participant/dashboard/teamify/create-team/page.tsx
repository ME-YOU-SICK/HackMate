"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  Calendar,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Check,
  X,
  Clock,
  Lightbulb,
  Target,
  Sparkles,
  ArrowLeft
} from "lucide-react";

export default function CreateTeamPage() {
  const userRole = "participant";
  const userName = "John Doe";
  const userAvatar = undefined;

  const [selectedEvent, setSelectedEvent] = useState("");
  const [teamSize, setTeamSize] = useState(4);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [expandedRoles, setExpandedRoles] = useState<{ [key: string]: boolean }>({});
  const [selectedSkills, setSelectedSkills] = useState<{ [key: string]: string[] }>({});
  const [projectIdea, setProjectIdea] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [matchedUsers, setMatchedUsers] = useState<any[]>([]);

  const events = [
    "AI Innovation Hackathon 2024",
    "Web3 Development Challenge",
    "Mobile App Sprint",
    "Sustainability Tech Challenge",
    "FinTech Innovation Contest",
    "Healthcare Technology Hackathon",
    "EdTech Solutions Challenge",
    "Climate Change Tech Challenge"
  ];

  const roles = {
    "Frontend": {
      skills: ["React", "Next.js", "Vue.js", "Angular", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Sass", "Figma", "Adobe XD"]
    },
    "Backend": {
      skills: ["Node.js", "Python", "Java", "C#", "Go", "Rust", "Express.js", "Django", "Spring Boot", "FastAPI", "PostgreSQL", "MongoDB", "Redis", "Docker", "AWS", "Azure"]
    },
    "Fullstack": {
      skills: ["React", "Next.js", "Node.js", "Python", "TypeScript", "PostgreSQL", "MongoDB", "Docker", "AWS", "Vercel", "Supabase", "Prisma", "GraphQL", "REST API"]
    },
    "Mobile": {
      skills: ["React Native", "Flutter", "Swift", "Kotlin", "iOS", "Android", "Expo", "Firebase", "App Store", "Google Play"]
    },
    "DevOps": {
      skills: ["Docker", "Kubernetes", "AWS", "Azure", "GCP", "CI/CD", "Jenkins", "GitHub Actions", "Terraform", "Ansible", "Linux", "Bash"]
    },
    "Data Science": {
      skills: ["Python", "R", "SQL", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch", "Jupyter", "Tableau", "Power BI", "Machine Learning"]
    },
    "UI/UX": {
      skills: ["Figma", "Adobe XD", "Sketch", "InVision", "Principle", "User Research", "Wireframing", "Prototyping", "Design Systems", "Accessibility"]
    },
    "Blockchain": {
      skills: ["Solidity", "Web3.js", "Ethers.js", "Hardhat", "Truffle", "IPFS", "Ethereum", "Polygon", "Smart Contracts", "DeFi", "NFTs"]
    }
  };

  const mockUsers = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      experience: "3 years",
      rating: 4.8,
      avatar: "SC",
      connection: "Connected",
      matchScore: 95
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      role: "Backend",
      skills: ["Node.js", "Python", "PostgreSQL", "Docker"],
      experience: "5 years",
      rating: 4.9,
      avatar: "AR",
      connection: "Connected",
      matchScore: 92
    },
    {
      id: 3,
      name: "Emma Wilson",
      role: "UI/UX",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      experience: "2 years",
      rating: 4.7,
      avatar: "EW",
      connection: "Connected",
      matchScore: 88
    },
    {
      id: 4,
      name: "Michael Kim",
      role: "Fullstack",
      skills: ["React", "Node.js", "MongoDB", "AWS"],
      experience: "4 years",
      rating: 4.6,
      avatar: "MK",
      connection: "Not Connected",
      matchScore: 85
    },
    {
      id: 5,
      name: "Lisa Zhang",
      role: "Data Science",
      skills: ["Python", "TensorFlow", "Pandas", "Machine Learning"],
      experience: "3 years",
      rating: 4.8,
      avatar: "LZ",
      connection: "Not Connected",
      matchScore: 90
    },
    {
      id: 6,
      name: "David Park",
      role: "DevOps",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
      experience: "6 years",
      rating: 4.9,
      avatar: "DP",
      connection: "Connected",
      matchScore: 87
    }
  ];

  const toggleRole = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(r => r !== role));
      setExpandedRoles({ ...expandedRoles, [role]: false });
    } else {
      setSelectedRoles([...selectedRoles, role]);
      setExpandedRoles({ ...expandedRoles, [role]: true });
    }
  };

  const toggleSkill = (role: string, skill: string) => {
    const currentSkills = selectedSkills[role] || [];
    if (currentSkills.includes(skill)) {
      setSelectedSkills({
        ...selectedSkills,
        [role]: currentSkills.filter(s => s !== skill)
      });
    } else {
      setSelectedSkills({
        ...selectedSkills,
        [role]: [...currentSkills, skill]
      });
    }
  };

  const handleCreateTeam = async () => {
    setIsCreating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock smart pairing algorithm
    const filteredUsers = mockUsers.filter(user => 
      selectedRoles.includes(user.role) && 
      user.matchScore >= 80
    ).sort((a, b) => b.matchScore - a.matchScore);
    
    setMatchedUsers(filteredUsers.slice(0, teamSize - 1)); // -1 for current user
    setShowResults(true);
    setIsCreating(false);
  };

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
                  Create Team
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Build your dream team for the next hackathon
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/participant/dashboard/teamify"
                  className="flex items-center gap-2 px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 text-[#FFA100]" />
                  Back
                </Link>
              </div>
            </motion.div>

            {!showResults ? (
              <>
                {/* Event Selection */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <GlowingCard
                    icon={<Calendar className="h-4 w-4 text-[#FFA100]" />}
                    title="Select Event"
                    description="Choose the hackathon or event for your team"
                    className="h-full"
                  >
                    <div className="mt-4">
                      <select
                        value={selectedEvent}
                        onChange={(e) => setSelectedEvent(e.target.value)}
                        className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white"
                      >
                        <option value="">Select an event...</option>
                        {events.map((event) => (
                          <option key={event} value={event}>
                            {event}
                          </option>
                        ))}
                      </select>
                    </div>
                  </GlowingCard>
                </motion.div>

                {/* Team Size */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                >
                  <GlowingCard
                    icon={<Users className="h-4 w-4 text-[#FFA100]" />}
                    title="Team Size"
                    description="How many members do you want in your team?"
                    className="h-full"
                  >
                    <div className="mt-4 flex items-center gap-4">
                      <button
                        onClick={() => setTeamSize(Math.max(2, teamSize - 1))}
                        className="p-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-neutral-900 dark:text-white"
                      >
                        <Minus className="h-4 w-4 text-[#FFA100]" />
                      </button>
                      <span className="text-2xl font-bold text-neutral-900 dark:text-white min-w-[3rem] text-center">
                        {teamSize}
                      </span>
                      <button
                        onClick={() => setTeamSize(Math.min(8, teamSize + 1))}
                        className="p-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-neutral-900 dark:text-white"
                      >
                        <Plus className="h-4 w-4 text-[#FFA100]" />
                      </button>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                      Recommended: 3-5 members for optimal collaboration
                    </p>
                  </GlowingCard>
                </motion.div>

                {/* Role Selection */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <GlowingCard
                    icon={<Target className="h-4 w-4 text-[#FFA100]" />}
                    title="Select Roles"
                    description="Choose the roles you need for your team"
                    className="h-full"
                  >
                    <div className="mt-4 space-y-3">
                      {Object.keys(roles).map((role) => (
                        <div key={role} className="border border-neutral-200 dark:border-neutral-700 rounded-lg">
                          <button
                            onClick={() => toggleRole(role)}
                            className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                selectedRoles.includes(role) 
                                  ? 'bg-[#FF9000] border-[#FF9000]' 
                                  : 'border-neutral-300 dark:border-neutral-600'
                              }`}>
                                {selectedRoles.includes(role) && (
                                  <Check className="h-3 w-3 text-white" />
                                )}
                              </div>
                              <span className="font-medium text-neutral-900 dark:text-white">
                                {role}
                              </span>
                            </div>
                            {expandedRoles[role] ? (
                              <ChevronUp className="h-4 w-4 text-[#FFA100]" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-[#FFA100]" />
                            )}
                          </button>
                          
                          {expandedRoles[role] && (
                            <div className="px-4 pb-4 border-t border-neutral-200 dark:border-neutral-700">
                              <div className="pt-3">
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                                  Select skills for {role}:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {roles[role as keyof typeof roles].skills.map((skill) => (
                                    <button
                                      key={skill}
                                      onClick={() => toggleSkill(role, skill)}
                                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                        selectedSkills[role]?.includes(skill)
                                          ? 'bg-[#FF9000] text-white'
                                          : 'bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-700'
                                      }`}
                                    >
                                      {skill}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </GlowingCard>
                </motion.div>

                {/* Project Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                >
                  <GlowingCard
                    icon={<Lightbulb className="h-4 w-4 text-[#FFA100]" />}
                    title="Project Details"
                    description="Optional: Share your project idea and deadline"
                    className="h-full"
                  >
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          Project Idea (Optional)
                        </label>
                        <textarea
                          value={projectIdea}
                          onChange={(e) => setProjectIdea(e.target.value)}
                          placeholder="Describe your project idea, goals, or vision..."
                          className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9000] resize-none text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                          rows={4}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          Project Deadline
                        </label>
                        <input
                          type="date"
                          value={projectDeadline}
                          onChange={(e) => setProjectDeadline(e.target.value)}
                          className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </GlowingCard>
                </motion.div>

                {/* Create Team Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex justify-center"
                >
                  <button
                    onClick={handleCreateTeam}
                    disabled={!selectedEvent || selectedRoles.length === 0 || isCreating}
                    className={`flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
                      !selectedEvent || selectedRoles.length === 0 || isCreating
                        ? 'bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#FF9000] to-[#FFA100] text-white hover:from-[#FFA100] hover:to-[#FFDD00] hover:scale-105 shadow-lg'
                    }`}
                  >
                    {isCreating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Finding Perfect Matches...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 text-[#FFA100]" />
                        Teamify - Find My Team
                      </>
                    )}
                  </button>
                </motion.div>
              </>
            ) : (
              /* Results Section */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                    🎉 Perfect Team Matches Found!
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Our AI has found the best teammates for your project
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchedUsers.map((user) => (
                    <div key={user.id} className="">
                      <GlowingCard
                        icon={<Users className="h-4 w-4 text-[#FFA100]" />}
                        title={user.name}
                        description={`${user.role} • ${user.experience} • ${user.rating}★`}
                        className="h-full"
                      >
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                              Match Score
                            </span>
                            <span className="text-lg font-bold text-[#FF9000]">
                              {user.matchScore}%
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                            <div className={`w-2 h-2 rounded-full ${
                              user.connection === 'Connected' ? 'bg-[#FFA100]' : 'bg-[#FFA100]'
                            }`} />
                            {user.connection}
                          </div>
                          <div className="space-y-2">
                            <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                              Skills:
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {user.skills.map((skill: string, index: number) => (
                                <span key={index} className="px-2 py-1 bg-[#FAF000]/10 dark:bg-[#FAF000] text-[#FF9000] dark:text-[#FAF000] text-xs rounded-full">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <button className="flex-1 px-3 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors text-sm">
                              Invite to Team
                            </button>
                            <button className="px-3 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                              <Users className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </GlowingCard>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setShowResults(false)}
                    className="px-6 py-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    Back to Form
                  </button>
                  <button className="px-6 py-3 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors">
                    Create Team
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
