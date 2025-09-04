"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Users, 
  UserPlus, 
  Settings, 
  CheckCircle, 
  AlertCircle,
  ChevronRight,
  Shield,
  Target,
  Zap,
  Star,
  Code,
  Database,
  Palette,
  Smartphone,
  Cloud,
  Brain,
  Gamepad2,
  Lock,
  Sparkles,
  Eye,
  UserCheck,
  Users2,
  Crown,
  Award
} from "lucide-react";

export default function OrganizerTeamifyPage() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [maxTeamMembers, setMaxTeamMembers] = useState(4);
  const [newbieProtection, setNewbieProtection] = useState(true);
  const [generatedTeams, setGeneratedTeams] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Mock events data
  const events = [
    {
      id: 1,
      name: "AI Innovation Hackathon",
      date: "2024-02-15",
      participants: 120,
      registered: 95,
      status: "active",
      currentRound: 2,
      maxRounds: 3
    },
    {
      id: 2,
      name: "Blockchain Development Challenge",
      date: "2024-02-20",
      participants: 80,
      registered: 65,
      status: "active",
      currentRound: 1,
      maxRounds: 2
    },
    {
      id: 3,
      name: "Web3 Gaming Tournament",
      date: "2024-02-25",
      participants: 60,
      registered: 45,
      status: "active",
      currentRound: 3,
      maxRounds: 3
    }
  ];

  // Mock participants data with skills and experience
  const participants = [
    {
      id: 1,
      name: "Alex Chen",
      role: "Frontend",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
      experience: "Expert",
      isNewbie: false,
      avatar: "AC"
    },
    {
      id: 2,
      name: "Sarah Kim",
      role: "Backend",
      skills: ["Python", "Django", "PostgreSQL", "Docker"],
      experience: "Expert",
      isNewbie: false,
      avatar: "SK"
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Fullstack",
      skills: ["React", "Node.js", "MongoDB", "AWS"],
      experience: "Advanced",
      isNewbie: false,
      avatar: "MJ"
    },
    {
      id: 4,
      name: "Emma Wilson",
      role: "AI/ML",
      skills: ["Python", "TensorFlow", "PyTorch", "OpenCV"],
      experience: "Expert",
      isNewbie: false,
      avatar: "EW"
    },
    {
      id: 5,
      name: "David Lee",
      role: "Backend",
      skills: ["Java", "Spring Boot", "MySQL", "Redis"],
      experience: "Advanced",
      isNewbie: false,
      avatar: "DL"
    },
    {
      id: 6,
      name: "Lisa Zhang",
      role: "Frontend",
      skills: ["Vue.js", "JavaScript", "CSS", "Figma"],
      experience: "Intermediate",
      isNewbie: true,
      avatar: "LZ"
    },
    {
      id: 7,
      name: "Tom Brown",
      role: "Mobile",
      skills: ["React Native", "Flutter", "Firebase", "iOS"],
      experience: "Advanced",
      isNewbie: false,
      avatar: "TB"
    },
    {
      id: 8,
      name: "Anna Garcia",
      role: "AI/ML",
      skills: ["Python", "Scikit-learn", "Pandas", "Jupyter"],
      experience: "Intermediate",
      isNewbie: true,
      avatar: "AG"
    },
    {
      id: 9,
      name: "John Doe",
      role: "Fullstack",
      skills: ["Angular", "Express.js", "MongoDB", "Docker"],
      experience: "Expert",
      isNewbie: false,
      avatar: "JD"
    },
    {
      id: 10,
      name: "Jane Smith",
      role: "Backend",
      skills: ["C#", ".NET", "SQL Server", "Azure"],
      experience: "Advanced",
      isNewbie: false,
      avatar: "JS"
    },
    {
      id: 11,
      name: "Bob Wilson",
      role: "Frontend",
      skills: ["React", "Redux", "Sass", "Webpack"],
      experience: "Intermediate",
      isNewbie: false,
      avatar: "BW"
    },
    {
      id: 12,
      name: "Alice Johnson",
      role: "Mobile",
      skills: ["Swift", "Kotlin", "Android", "Xcode"],
      experience: "Advanced",
      isNewbie: false,
      avatar: "AJ"
    },
    {
      id: 13,
      name: "Charlie Davis",
      role: "AI/ML",
      skills: ["R", "Python", "Machine Learning", "Statistics"],
      experience: "Expert",
      isNewbie: false,
      avatar: "CD"
    },
    {
      id: 14,
      name: "Sophie Taylor",
      role: "Frontend",
      skills: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      experience: "Beginner",
      isNewbie: true,
      avatar: "ST"
    },
    {
      id: 15,
      name: "Ryan Miller",
      role: "Backend",
      skills: ["Go", "Gin", "PostgreSQL", "Kubernetes"],
      experience: "Advanced",
      isNewbie: false,
      avatar: "RM"
    },
    {
      id: 16,
      name: "Maya Patel",
      role: "Fullstack",
      skills: ["Vue.js", "Laravel", "MySQL", "Vuex"],
      experience: "Intermediate",
      isNewbie: false,
      avatar: "MP"
    }
  ];

  const currentEvent = events.find(e => e.id === selectedEvent);

  // Role compatibility matrix for balanced team formation
  const roleCompatibility = {
    "Frontend": ["Backend", "Fullstack", "Mobile"],
    "Backend": ["Frontend", "Fullstack", "AI/ML"],
    "Fullstack": ["Frontend", "Backend", "Mobile", "AI/ML"],
    "AI/ML": ["Backend", "Fullstack", "Data Science"],
    "Mobile": ["Frontend", "Fullstack", "Backend"],
    "Data Science": ["AI/ML", "Backend"]
  };

  const handleGenerateTeams = () => {
    setIsGenerating(true);
    
    // Simulate team generation process
    setTimeout(() => {
      let pools = { newbies: participants.filter(p => p.isNewbie), experienced: participants.filter(p => !p.isNewbie) };
      let ordered: any[] = [];
      if (newbieProtection) {
        // Pair newbies with newbies, experienced with experienced
        const shuffledNewbies = [...pools.newbies].sort(() => Math.random() - 0.5);
        const shuffledExperienced = [...pools.experienced].sort(() => Math.random() - 0.5);
        ordered = [...shuffledExperienced, ...shuffledNewbies];
      } else {
        ordered = [...participants].sort(() => Math.random() - 0.5);
      }

      const teams: any[] = [];
      let currentTeam: any[] = [];

      for (let i = 0; i < ordered.length; i++) {
        const candidate = ordered[i];
        // If newbieProtection, avoid mixing newbie with experienced within the same team
        if (newbieProtection && currentTeam.length > 0) {
          const hasNewbie = currentTeam.some(m => m.isNewbie);
          if (hasNewbie !== candidate.isNewbie && currentTeam.length > 0) {
            // finalize current team and start a new one for different experience pool
            teams.push({
              id: teams.length + 1,
              name: `Team ${teams.length + 1}`,
              members: [...currentTeam],
              balance: calculateTeamBalance(currentTeam),
              skills: [...new Set(currentTeam.flatMap(m => m.skills))],
              experience: currentTeam.map(m => m.experience)
            });
            currentTeam = [];
          }
        }

        currentTeam.push(candidate);

        if (currentTeam.length === maxTeamMembers || (i === ordered.length - 1 && currentTeam.length >= 2)) {
          teams.push({
            id: teams.length + 1,
            name: `Team ${teams.length + 1}`,
            members: [...currentTeam],
            balance: calculateTeamBalance(currentTeam),
            skills: [...new Set(currentTeam.flatMap(m => m.skills))],
            experience: currentTeam.map(m => m.experience)
          });
          currentTeam = [];
        }
      }

      setGeneratedTeams(teams);
      setIsGenerating(false);
    }, 2000);
  };

  const calculateTeamBalance = (teamMembers: any[]) => {
    const roles = teamMembers.map(m => m.role);
    const experiences = teamMembers.map(m => m.experience);
    
    // Calculate role diversity
    const uniqueRoles = new Set(roles).size;
    const roleDiversity = (uniqueRoles / teamMembers.length) * 100;
    
    // Calculate experience balance
    const experienceLevels = { "Beginner": 1, "Intermediate": 2, "Advanced": 3, "Expert": 4 };
    const avgExperience = experiences.reduce((sum, exp) => sum + experienceLevels[exp], 0) / experiences.length;
    const experienceBalance = Math.max(0, 100 - Math.abs(avgExperience - 2.5) * 20);
    
    return Math.round((roleDiversity + experienceBalance) / 2);
  };

  const handleVerifyTeams = () => {
    setIsVerified(true);
    // In a real app, this would update the database and notify participants
    setTimeout(() => {
      alert("Teams have been successfully created and participants have been notified!");
    }, 1000);
  };

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case "Expert": return "text-[#FFA100] bg-[#FFA100]/10 dark:bg-[#FFA100]/20";
      case "Advanced": return "text-[#FF9000] bg-[#FAF000]/10 dark:bg-[#FAF000]/20";
      case "Intermediate": return "text-green-600 bg-green-100 dark:bg-green-900/20";
      case "Beginner": return "text-orange-600 bg-orange-100 dark:bg-orange-900/20";
      default: return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Frontend": return <Palette className="h-4 w-4" />;
      case "Backend": return <Database className="h-4 w-4" />;
      case "Fullstack": return <Code className="h-4 w-4" />;
      case "AI/ML": return <Brain className="h-4 w-4" />;
      case "Mobile": return <Smartphone className="h-4 w-4" />;
      case "Data Science": return <Target className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-[#FAF000]/5 dark:from-slate-900 dark:to-[#FF9000]">
      <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden">
        <DashboardSidebar userRole="organizer" userName="Sarah Johnson" />
        
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Teamify
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Automatically create balanced teams for your hackathon events
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Events List */}
              <div className="lg:col-span-1">
                <GlowingCard className="h-fit">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Select Event
                    </h2>
                    
                    <div className="space-y-3">
                      {events.map((event) => (
                        <motion.div
                          key={event.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <button
                            onClick={() => setSelectedEvent(event.id)}
                            className={cn(
                              "w-full p-4 rounded-lg border-2 transition-all duration-200 text-left",
                              selectedEvent === event.id
                                ? "border-[#FFA100] bg-[#FAF000]/5 dark:bg-[#FAF000]/20"
                                : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white">
                                  {event.name}
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {event.registered} / {event.participants} participants
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-500">
                                  Round {event.currentRound} of {event.maxRounds}
                                </p>
                              </div>
                              <ChevronRight className="h-5 w-5 text-slate-400" />
                            </div>
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </GlowingCard>
              </div>

              {/* Team Formation Form */}
              <div className="lg:col-span-2">
                {selectedEvent ? (
                  <GlowingCard>
                    <div className="p-6">
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                          <Settings className="h-5 w-5" />
                          Team Formation Settings
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                          Configure team parameters for {currentEvent?.name}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Maximum Team Members
                          </label>
                          <select
                            value={maxTeamMembers}
                            onChange={(e) => setMaxTeamMembers(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FF9000] focus:border-transparent"
                          >
                            <option value={2}>2 members</option>
                            <option value={3}>3 members</option>
                            <option value={4}>4 members</option>
                            <option value={5}>5 members</option>
                            <option value={6}>6 members</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Newbie Protection
                          </label>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setNewbieProtection(!newbieProtection)}
                              className={cn(
                                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                                newbieProtection ? "bg-[#FF9000]" : "bg-slate-300 dark:bg-slate-600"
                              )}
                            >
                              <span
                                className={cn(
                                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                  newbieProtection ? "translate-x-6" : "translate-x-1"
                                )}
                              />
                            </button>
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              {newbieProtection ? "Enabled" : "Disabled"}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                            {newbieProtection 
                              ? "New participants will be paired with new participants; experienced with experienced"
                              : "All participants can be paired together"
                            }
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-6">
                        <button
                          onClick={handleGenerateTeams}
                          disabled={isGenerating}
                          className="flex items-center gap-2 px-6 py-3 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isGenerating ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                              Generating Teams...
                            </>
                          ) : (
                            <>
                              <Zap className="h-4 w-4" />
                              Generate Teams
                            </>
                          )}
                        </button>

                        {generatedTeams.length > 0 && !isVerified && (
                          <button
                            onClick={handleVerifyTeams}
                            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Verify & Create Teams
                          </button>
                        )}

                        {isVerified && (
                          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg">
                            <CheckCircle className="h-4 w-4" />
                            Teams Created Successfully!
                          </div>
                        )}
                      </div>

                      {/* Generated Teams Display */}
                      {generatedTeams.length > 0 && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            <Users2 className="h-5 w-5" />
                            Generated Teams ({generatedTeams.length})
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {generatedTeams.map((team) => (
                              <motion.div
                                key={team.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50 dark:bg-slate-800/50"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="font-semibold text-slate-900 dark:text-white">
                                    {team.name}
                                  </h4>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-yellow-500" />
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                      {team.balance}% balanced
                                    </span>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  {team.members.map((member: any) => (
                                    <div key={member.id} className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FAF000] to-[#FFDD00] flex items-center justify-center text-white text-xs font-bold">
                                        {member.avatar}
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                          <span className="font-medium text-slate-900 dark:text-white text-sm">
                                            {member.name}
                                          </span>
                                          <div className="flex items-center gap-1">
                                            {getRoleIcon(member.role)}
                                            <span className="text-xs text-slate-600 dark:text-slate-400">
                                              {member.role}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                          <span className={cn(
                                            "px-2 py-1 rounded-full text-xs font-medium",
                                            getExperienceColor(member.experience)
                                          )}>
                                            {member.experience}
                                          </span>
                                          {member.isNewbie && (
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
                                              Newbie
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                                  <div className="flex flex-wrap gap-1">
                                    {team.skills.slice(0, 6).map((skill: string) => (
                                      <span
                                        key={skill}
                                        className="px-2 py-1 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 text-[#FFA100] dark:text-[#FAF000] text-xs rounded-full"
                                      >
                                        {skill}
                                      </span>
                                    ))}
                                    {team.skills.length > 6 && (
                                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded-full">
                                        +{team.skills.length - 6} more
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </GlowingCard>
                ) : (
                  <GlowingCard>
                    <div className="p-6 text-center">
                      <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                        Select an Event
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        Choose an event from the list to start creating balanced teams
                      </p>
                    </div>
                  </GlowingCard>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
