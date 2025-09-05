"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Users, 
  Search, 
  Filter, 
  ChevronDown,
  MessageCircle,
  Eye,
  MapPin,
  Calendar,
  Star,
  Code,
  Database,
  Smartphone,
  Cloud,
  Shield,
  Brain,
  Gamepad2,
  Palette,
  Zap,
  Globe,
  Heart,
  Music,
  Car,
  ShoppingBag,
  Award,
  Trophy,
  Building,
  Mail,
  Github,
  Linkedin,
  Twitter
} from "lucide-react";

export default function RecruiterConnectionsPage() {
  const router = useRouter();
  const userRole = "recruiter";
  const userName = "Alex Thompson";
  const userAvatar = undefined;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const mockParticipants = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Full Stack Developer",
      location: "San Francisco, CA",
      experience: "3 years",
      skills: ["React", "Node.js", "Python", "AWS"],
      rating: 4.8,
      projects: 12,
      hackathons: 8,
      joined: "2023-01-15",
      avatar: "SC",
      status: "available",
      github: "sarahchen",
      linkedin: "sarah-chen-dev",
      twitter: "sarahchen_dev"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      title: "AI/ML Engineer",
      location: "Austin, TX",
      experience: "5 years",
      skills: ["Python", "TensorFlow", "PyTorch", "Docker"],
      rating: 4.9,
      projects: 18,
      hackathons: 12,
      joined: "2022-08-20",
      avatar: "MJ",
      status: "available",
      github: "marcusjohnson",
      linkedin: "marcus-johnson-ai",
      twitter: "marcus_ai"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "Frontend Developer",
      location: "New York, NY",
      experience: "2 years",
      skills: ["React", "TypeScript", "Next.js", "Tailwind"],
      rating: 4.7,
      projects: 9,
      hackathons: 6,
      joined: "2023-03-10",
      avatar: "ER",
      status: "busy",
      github: "emilyrodriguez",
      linkedin: "emily-rodriguez-frontend",
      twitter: "emily_frontend"
    },
    {
      id: 4,
      name: "David Kim",
      title: "Backend Developer",
      location: "Seattle, WA",
      experience: "4 years",
      skills: ["Java", "Spring Boot", "PostgreSQL", "Kubernetes"],
      rating: 4.6,
      projects: 15,
      hackathons: 10,
      joined: "2022-11-05",
      avatar: "DK",
      status: "available",
      github: "davidkim",
      linkedin: "david-kim-backend",
      twitter: "david_backend"
    },
    {
      id: 5,
      name: "Lisa Wang",
      title: "Data Scientist",
      location: "Boston, MA",
      experience: "3 years",
      skills: ["Python", "R", "SQL", "Tableau"],
      rating: 4.8,
      projects: 11,
      hackathons: 7,
      joined: "2023-02-28",
      avatar: "LW",
      status: "available",
      github: "lisawang",
      linkedin: "lisa-wang-data",
      twitter: "lisa_data"
    },
    {
      id: 6,
      name: "James Wilson",
      title: "DevOps Engineer",
      location: "Denver, CO",
      experience: "6 years",
      skills: ["AWS", "Docker", "Jenkins", "Terraform"],
      rating: 4.9,
      projects: 20,
      hackathons: 14,
      joined: "2022-05-12",
      avatar: "JW",
      status: "available",
      github: "jameswilson",
      linkedin: "james-wilson-devops",
      twitter: "james_devops"
    },
    {
      id: 7,
      name: "Maria Garcia",
      title: "Mobile Developer",
      location: "Miami, FL",
      experience: "3 years",
      skills: ["React Native", "Flutter", "iOS", "Android"],
      rating: 4.7,
      projects: 13,
      hackathons: 9,
      joined: "2023-01-08",
      avatar: "MG",
      status: "busy",
      github: "mariagarcia",
      linkedin: "maria-garcia-mobile",
      twitter: "maria_mobile"
    },
    {
      id: 8,
      name: "Alex Thompson",
      title: "Blockchain Developer",
      location: "Portland, OR",
      experience: "4 years",
      skills: ["Solidity", "Web3", "Ethereum", "Smart Contracts"],
      rating: 4.8,
      projects: 16,
      hackathons: 11,
      joined: "2022-09-15",
      avatar: "AT",
      status: "available",
      github: "alexthompson",
      linkedin: "alex-thompson-blockchain",
      twitter: "alex_blockchain"
    },
    {
      id: 9,
      name: "Rachel Brown",
      title: "UI/UX Designer",
      location: "Chicago, IL",
      experience: "3 years",
      skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
      rating: 4.6,
      projects: 14,
      hackathons: 8,
      joined: "2023-04-22",
      avatar: "RB",
      status: "available",
      github: "rachelbrown",
      linkedin: "rachel-brown-design",
      twitter: "rachel_design"
    },
    {
      id: 10,
      name: "Kevin Lee",
      title: "Cybersecurity Specialist",
      location: "Washington, DC",
      experience: "5 years",
      skills: ["Penetration Testing", "Security Analysis", "Python", "Linux"],
      rating: 4.9,
      projects: 17,
      hackathons: 13,
      joined: "2022-07-30",
      avatar: "KL",
      status: "available",
      github: "kevinlee",
      linkedin: "kevin-lee-security",
      twitter: "kevin_security"
    }
  ];

  const skillCategories = [
    "All", "React", "Node.js", "Python", "AWS", "Java", "TypeScript", 
    "Docker", "Kubernetes", "Machine Learning", "Blockchain", "Mobile", 
    "UI/UX", "Cybersecurity", "DevOps", "Data Science"
  ];

  const getSkillIcon = (skill: string) => {
    const iconMap: { [key: string]: any } = {
      "React": <Code className="h-3 w-3" />,
      "Node.js": <Code className="h-3 w-3" />,
      "Python": <Code className="h-3 w-3" />,
      "AWS": <Cloud className="h-3 w-3" />,
      "Java": <Code className="h-3 w-3" />,
      "TypeScript": <Code className="h-3 w-3" />,
      "Docker": <Cloud className="h-3 w-3" />,
      "Kubernetes": <Cloud className="h-3 w-3" />,
      "Machine Learning": <Brain className="h-3 w-3" />,
      "Blockchain": <Shield className="h-3 w-3" />,
      "Mobile": <Smartphone className="h-3 w-3" />,
      "UI/UX": <Palette className="h-3 w-3" />,
      "Cybersecurity": <Shield className="h-3 w-3" />,
      "DevOps": <Zap className="h-3 w-3" />,
      "Data Science": <Database className="h-3 w-3" />
    };
    return iconMap[skill] || <Code className="h-3 w-3" />;
  };

  const handleMessage = (participantId: number) => {
    // Navigate to messages page with participant
    router.push(`/recruiter/dashboard/messages?participant=${participantId}`);
  };

  const handleViewProfile = (participantId: number) => {
    // Navigate to participant profile
    router.push(`/recruiter/dashboard/connections/${participantId}`);
  };

  const filteredParticipants = mockParticipants.filter(participant => {
    const matchesSearch = participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSkill = selectedSkill === "All" || participant.skills.includes(selectedSkill);
    
    return matchesSearch && matchesSkill;
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
                  Connections
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Connect with talented developers and find your next hire
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
                            Skill
                          </label>
                          <select
                            value={selectedSkill}
                            onChange={(e) => setSelectedSkill(e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white"
                          >
                            {skillCategories.map(skill => (
                              <option key={skill} value={skill}>{skill}</option>
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
                placeholder="Search participants by name, title, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
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
                Showing {filteredParticipants.length} of {mockParticipants.length} connections
              </p>
              {(selectedSkill !== "All" || searchTerm) && (
                <button
                  onClick={() => {
                    setSelectedSkill("All");
                    setSearchTerm("");
                  }}
                  className="text-sm text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  Clear filters
                </button>
              )}
            </motion.div>

            {/* Participants Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredParticipants.map((participant, index) => (
                <motion.div 
                  key={participant.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className=""
                >
                  <GlowingCard
                    title={participant.name}
                    description={participant.title}
                    className="h-full"
                  >
                    <div className="mt-4 space-y-4">
                      {/* Avatar and Status */}
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#FAF000] to-[#FF9000] rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{participant.avatar}</span>
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-neutral-900 ${
                            participant.status === 'available' ? 'bg-green-500' : 'bg-yellow-500'
                          }`}></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium text-neutral-900 dark:text-white">
                              {participant.rating}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            {participant.experience} experience
                          </p>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <MapPin className="h-4 w-4" />
                        {participant.location}
                      </div>

                      {/* Skills */}
                      <div>
                        <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          Skills
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {participant.skills.slice(0, 3).map((skill, skillIndex) => (
                            <span 
                              key={skillIndex}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 text-neutral-600 dark:text-neutral-400 text-xs rounded-full"
                            >
                              {getSkillIcon(skill)}
                              {skill}
                            </span>
                          ))}
                          {participant.skills.length > 3 && (
                            <span className="inline-flex items-center px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 text-xs rounded-full">
                              +{participant.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
                        <div className="flex items-center gap-1">
                          <Trophy className="h-4 w-4" />
                          <span>{participant.hackathons} hackathons</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Code className="h-4 w-4" />
                          <span>{participant.projects} projects</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => handleViewProfile(participant.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-neutral-900 dark:text-white text-sm"
                        >
                          <Eye className="h-4 w-4" />
                          View Profile
                        </button>
                        <button
                          onClick={() => handleMessage(participant.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors text-sm"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Message
                        </button>
                      </div>
                    </div>
                  </GlowingCard>
                </motion.div>
              ))}
            </motion.div>

            {/* No Results */}
            {filteredParticipants.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-12"
              >
                <Users className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  No connections found
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Try adjusting your search terms or filters
                </p>
                <button
                  onClick={() => {
                    setSelectedSkill("All");
                    setSearchTerm("");
                  }}
                  className="px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors"
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
