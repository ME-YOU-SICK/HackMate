"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  TrendingUp,
  TrendingDown,
  Users,
  Briefcase,
  Star,
  Code,
  Palette,
  Database,
  Smartphone,
  Cloud,
  Brain,
  Shield,
  Zap,
  Target, 
  BarChart3,
  Filter,
  Search,
  ChevronUp,
  ChevronDown,
  Award, 
  Clock,
  Globe,
  Cpu,
  Layers,
  GitBranch,
  Server,
  Monitor,
  Smartphone as MobileIcon,
  Gamepad2,
  Lock,
  Sparkles,
  BookOpen,
  Lightbulb,
  Rocket,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";

// Mock data for skills and technologies
const skillsData = {
  "Frontend": [
    { name: "React", demand: 85, availability: 45, category: "Frontend", icon: <Code className="h-4 w-4" /> },
    { name: "Next.js", demand: 78, availability: 32, category: "Frontend", icon: <Code className="h-4 w-4" /> },
    { name: "Vue.js", demand: 65, availability: 28, category: "Frontend", icon: <Code className="h-4 w-4" /> },
    { name: "Angular", demand: 72, availability: 38, category: "Frontend", icon: <Code className="h-4 w-4" /> },
    { name: "TypeScript", demand: 88, availability: 42, category: "Frontend", icon: <Code className="h-4 w-4" /> },
    { name: "JavaScript", demand: 95, availability: 78, category: "Frontend", icon: <Code className="h-4 w-4" /> },
    { name: "HTML", demand: 90, availability: 85, category: "Frontend", icon: <Code className="h-4 w-4" /> },
    { name: "CSS", demand: 88, availability: 82, category: "Frontend", icon: <Code className="h-4 w-4" /> },
    { name: "Tailwind CSS", demand: 82, availability: 35, category: "Frontend", icon: <Code className="h-4 w-4" /> },
    { name: "Sass", demand: 58, availability: 25, category: "Frontend", icon: <Code className="h-4 w-4" /> },
    { name: "Figma", demand: 75, availability: 40, category: "Frontend", icon: <Palette className="h-4 w-4" /> },
    { name: "Adobe XD", demand: 45, availability: 20, category: "Frontend", icon: <Palette className="h-4 w-4" /> },
  ],
  "Backend": [
    { name: "Node.js", demand: 85, availability: 48, category: "Backend", icon: <Server className="h-4 w-4" /> },
    { name: "Python", demand: 92, availability: 65, category: "Backend", icon: <Code className="h-4 w-4" /> },
    { name: "Java", demand: 88, availability: 55, category: "Backend", icon: <Code className="h-4 w-4" /> },
    { name: "C#", demand: 75, availability: 42, category: "Backend", icon: <Code className="h-4 w-4" /> },
    { name: "Go", demand: 68, availability: 25, category: "Backend", icon: <Code className="h-4 w-4" /> },
    { name: "Rust", demand: 55, availability: 15, category: "Backend", icon: <Code className="h-4 w-4" /> },
    { name: "Express.js", demand: 78, availability: 38, category: "Backend", icon: <Server className="h-4 w-4" /> },
    { name: "Django", demand: 72, availability: 35, category: "Backend", icon: <Server className="h-4 w-4" /> },
    { name: "Spring Boot", demand: 80, availability: 45, category: "Backend", icon: <Server className="h-4 w-4" /> },
    { name: "FastAPI", demand: 65, availability: 22, category: "Backend", icon: <Server className="h-4 w-4" /> },
    { name: "PostgreSQL", demand: 85, availability: 52, category: "Backend", icon: <Database className="h-4 w-4" /> },
    { name: "MongoDB", demand: 78, availability: 48, category: "Backend", icon: <Database className="h-4 w-4" /> },
    { name: "Redis", demand: 70, availability: 35, category: "Backend", icon: <Database className="h-4 w-4" /> },
    { name: "Docker", demand: 88, availability: 42, category: "Backend", icon: <Cloud className="h-4 w-4" /> },
    { name: "AWS", demand: 90, availability: 38, category: "Backend", icon: <Cloud className="h-4 w-4" /> },
    { name: "Azure", demand: 75, availability: 32, category: "Backend", icon: <Cloud className="h-4 w-4" /> },
  ],
  "Fullstack": [
    { name: "React", demand: 85, availability: 45, category: "Fullstack", icon: <Code className="h-4 w-4" /> },
    { name: "Next.js", demand: 78, availability: 32, category: "Fullstack", icon: <Code className="h-4 w-4" /> },
    { name: "Node.js", demand: 85, availability: 48, category: "Fullstack", icon: <Server className="h-4 w-4" /> },
    { name: "Python", demand: 92, availability: 65, category: "Fullstack", icon: <Code className="h-4 w-4" /> },
    { name: "TypeScript", demand: 88, availability: 42, category: "Fullstack", icon: <Code className="h-4 w-4" /> },
    { name: "PostgreSQL", demand: 85, availability: 52, category: "Fullstack", icon: <Database className="h-4 w-4" /> },
    { name: "MongoDB", demand: 78, availability: 48, category: "Fullstack", icon: <Database className="h-4 w-4" /> },
    { name: "Docker", demand: 88, availability: 42, category: "Fullstack", icon: <Cloud className="h-4 w-4" /> },
    { name: "AWS", demand: 90, availability: 38, category: "Fullstack", icon: <Cloud className="h-4 w-4" /> },
    { name: "Vercel", demand: 65, availability: 25, category: "Fullstack", icon: <Cloud className="h-4 w-4" /> },
    { name: "Supabase", demand: 58, availability: 18, category: "Fullstack", icon: <Database className="h-4 w-4" /> },
    { name: "Prisma", demand: 62, availability: 22, category: "Fullstack", icon: <Database className="h-4 w-4" /> },
    { name: "GraphQL", demand: 70, availability: 28, category: "Fullstack", icon: <GitBranch className="h-4 w-4" /> },
    { name: "REST API", demand: 88, availability: 65, category: "Fullstack", icon: <GitBranch className="h-4 w-4" /> },
  ],
  "Mobile": [
    { name: "React Native", demand: 75, availability: 35, category: "Mobile", icon: <MobileIcon className="h-4 w-4" /> },
    { name: "Flutter", demand: 68, availability: 28, category: "Mobile", icon: <MobileIcon className="h-4 w-4" /> },
    { name: "Swift", demand: 72, availability: 32, category: "Mobile", icon: <MobileIcon className="h-4 w-4" /> },
    { name: "Kotlin", demand: 70, availability: 30, category: "Mobile", icon: <MobileIcon className="h-4 w-4" /> },
    { name: "iOS", demand: 78, availability: 38, category: "Mobile", icon: <MobileIcon className="h-4 w-4" /> },
    { name: "Android", demand: 82, availability: 45, category: "Mobile", icon: <MobileIcon className="h-4 w-4" /> },
    { name: "Expo", demand: 55, availability: 20, category: "Mobile", icon: <MobileIcon className="h-4 w-4" /> },
    { name: "Firebase", demand: 80, availability: 42, category: "Mobile", icon: <Cloud className="h-4 w-4" /> },
    { name: "App Store", demand: 65, availability: 25, category: "Mobile", icon: <MobileIcon className="h-4 w-4" /> },
    { name: "Google Play", demand: 68, availability: 28, category: "Mobile", icon: <MobileIcon className="h-4 w-4" /> },
  ],
  "DevOps": [
    { name: "Docker", demand: 88, availability: 42, category: "DevOps", icon: <Cloud className="h-4 w-4" /> },
    { name: "Kubernetes", demand: 82, availability: 28, category: "DevOps", icon: <Cloud className="h-4 w-4" /> },
    { name: "AWS", demand: 90, availability: 38, category: "DevOps", icon: <Cloud className="h-4 w-4" /> },
    { name: "Azure", demand: 75, availability: 32, category: "DevOps", icon: <Cloud className="h-4 w-4" /> },
    { name: "GCP", demand: 70, availability: 25, category: "DevOps", icon: <Cloud className="h-4 w-4" /> },
    { name: "CI/CD", demand: 85, availability: 35, category: "DevOps", icon: <GitBranch className="h-4 w-4" /> },
    { name: "Jenkins", demand: 65, availability: 30, category: "DevOps", icon: <GitBranch className="h-4 w-4" /> },
    { name: "GitHub Actions", demand: 78, availability: 32, category: "DevOps", icon: <GitBranch className="h-4 w-4" /> },
    { name: "Terraform", demand: 72, availability: 25, category: "DevOps", icon: <Cloud className="h-4 w-4" /> },
    { name: "Ansible", demand: 58, availability: 20, category: "DevOps", icon: <Cloud className="h-4 w-4" /> },
    { name: "Linux", demand: 85, availability: 55, category: "DevOps", icon: <Monitor className="h-4 w-4" /> },
    { name: "Bash", demand: 75, availability: 45, category: "DevOps", icon: <Monitor className="h-4 w-4" /> },
  ],
  "Data Science": [
    { name: "Python", demand: 92, availability: 65, category: "Data Science", icon: <Brain className="h-4 w-4" /> },
    { name: "R", demand: 65, availability: 35, category: "Data Science", icon: <Brain className="h-4 w-4" /> },
    { name: "SQL", demand: 88, availability: 68, category: "Data Science", icon: <Database className="h-4 w-4" /> },
    { name: "Pandas", demand: 80, availability: 45, category: "Data Science", icon: <Brain className="h-4 w-4" /> },
    { name: "NumPy", demand: 75, availability: 42, category: "Data Science", icon: <Brain className="h-4 w-4" /> },
    { name: "Scikit-learn", demand: 78, availability: 38, category: "Data Science", icon: <Brain className="h-4 w-4" /> },
    { name: "TensorFlow", demand: 72, availability: 28, category: "Data Science", icon: <Brain className="h-4 w-4" /> },
    { name: "PyTorch", demand: 68, availability: 25, category: "Data Science", icon: <Brain className="h-4 w-4" /> },
    { name: "Jupyter", demand: 70, availability: 40, category: "Data Science", icon: <Brain className="h-4 w-4" /> },
    { name: "Tableau", demand: 75, availability: 35, category: "Data Science", icon: <BarChart3 className="h-4 w-4" /> },
    { name: "Power BI", demand: 68, availability: 32, category: "Data Science", icon: <BarChart3 className="h-4 w-4" /> },
    { name: "Machine Learning", demand: 85, availability: 38, category: "Data Science", icon: <Brain className="h-4 w-4" /> },
  ],
  "UI/UX": [
    { name: "Figma", demand: 85, availability: 45, category: "UI/UX", icon: <Palette className="h-4 w-4" /> },
    { name: "Adobe XD", demand: 65, availability: 30, category: "UI/UX", icon: <Palette className="h-4 w-4" /> },
    { name: "Sketch", demand: 55, availability: 25, category: "UI/UX", icon: <Palette className="h-4 w-4" /> },
    { name: "InVision", demand: 45, availability: 20, category: "UI/UX", icon: <Palette className="h-4 w-4" /> },
    { name: "Principle", demand: 35, availability: 15, category: "UI/UX", icon: <Palette className="h-4 w-4" /> },
    { name: "User Research", demand: 75, availability: 35, category: "UI/UX", icon: <Users className="h-4 w-4" /> },
    { name: "Wireframing", demand: 80, availability: 42, category: "UI/UX", icon: <Palette className="h-4 w-4" /> },
    { name: "Prototyping", demand: 78, availability: 38, category: "UI/UX", icon: <Palette className="h-4 w-4" /> },
    { name: "Design Systems", demand: 70, availability: 28, category: "UI/UX", icon: <Palette className="h-4 w-4" /> },
    { name: "Accessibility", demand: 65, availability: 25, category: "UI/UX", icon: <Users className="h-4 w-4" /> },
  ],
  "Blockchain": [
    { name: "Solidity", demand: 45, availability: 12, category: "Blockchain", icon: <Shield className="h-4 w-4" /> },
    { name: "Web3.js", demand: 50, availability: 15, category: "Blockchain", icon: <Shield className="h-4 w-4" /> },
    { name: "Ethers.js", demand: 48, availability: 12, category: "Blockchain", icon: <Shield className="h-4 w-4" /> },
    { name: "Hardhat", demand: 42, availability: 10, category: "Blockchain", icon: <Shield className="h-4 w-4" /> },
    { name: "Truffle", demand: 38, availability: 8, category: "Blockchain", icon: <Shield className="h-4 w-4" /> },
    { name: "IPFS", demand: 35, availability: 6, category: "Blockchain", icon: <Shield className="h-4 w-4" /> },
    { name: "Ethereum", demand: 55, availability: 18, category: "Blockchain", icon: <Shield className="h-4 w-4" /> },
    { name: "Polygon", demand: 40, availability: 10, category: "Blockchain", icon: <Shield className="h-4 w-4" /> },
    { name: "Smart Contracts", demand: 52, availability: 15, category: "Blockchain", icon: <Shield className="h-4 w-4" /> },
    { name: "DeFi", demand: 45, availability: 12, category: "Blockchain", icon: <Shield className="h-4 w-4" /> },
    { name: "NFTs", demand: 48, availability: 14, category: "Blockchain", icon: <Shield className="h-4 w-4" /> },
  ],
  "Game Development": [
    { name: "Unity", demand: 65, availability: 28, category: "Game Development", icon: <Gamepad2 className="h-4 w-4" /> },
    { name: "Unreal Engine", demand: 58, availability: 22, category: "Game Development", icon: <Gamepad2 className="h-4 w-4" /> },
    { name: "C#", demand: 75, availability: 42, category: "Game Development", icon: <Code className="h-4 w-4" /> },
    { name: "C++", demand: 70, availability: 35, category: "Game Development", icon: <Code className="h-4 w-4" /> },
    { name: "JavaScript", demand: 60, availability: 40, category: "Game Development", icon: <Code className="h-4 w-4" /> },
    { name: "Blender", demand: 55, availability: 25, category: "Game Development", icon: <Palette className="h-4 w-4" /> },
    { name: "Maya", demand: 45, availability: 18, category: "Game Development", icon: <Palette className="h-4 w-4" /> },
    { name: "3D Modeling", demand: 62, availability: 28, category: "Game Development", icon: <Palette className="h-4 w-4" /> },
  ],
  "Cybersecurity": [
    { name: "Penetration Testing", demand: 75, availability: 25, category: "Cybersecurity", icon: <Shield className="h-4 w-4" /> },
    { name: "Ethical Hacking", demand: 70, availability: 22, category: "Cybersecurity", icon: <Shield className="h-4 w-4" /> },
    { name: "Network Security", demand: 80, availability: 35, category: "Cybersecurity", icon: <Shield className="h-4 w-4" /> },
    { name: "Cryptography", demand: 65, availability: 20, category: "Cybersecurity", icon: <Lock className="h-4 w-4" /> },
    { name: "OWASP", demand: 68, availability: 25, category: "Cybersecurity", icon: <Shield className="h-4 w-4" /> },
    { name: "Kali Linux", demand: 55, availability: 18, category: "Cybersecurity", icon: <Monitor className="h-4 w-4" /> },
    { name: "Wireshark", demand: 60, availability: 20, category: "Cybersecurity", icon: <Monitor className="h-4 w-4" /> },
    { name: "SIEM", demand: 72, availability: 28, category: "Cybersecurity", icon: <Shield className="h-4 w-4" /> },
  ],
  "AI/ML": [
    { name: "Machine Learning", demand: 85, availability: 38, category: "AI/ML", icon: <Brain className="h-4 w-4" /> },
    { name: "Deep Learning", demand: 75, availability: 25, category: "AI/ML", icon: <Brain className="h-4 w-4" /> },
    { name: "Natural Language Processing", demand: 70, availability: 22, category: "AI/ML", icon: <Brain className="h-4 w-4" /> },
    { name: "Computer Vision", demand: 68, availability: 20, category: "AI/ML", icon: <Brain className="h-4 w-4" /> },
    { name: "TensorFlow", demand: 72, availability: 28, category: "AI/ML", icon: <Brain className="h-4 w-4" /> },
    { name: "PyTorch", demand: 68, availability: 25, category: "AI/ML", icon: <Brain className="h-4 w-4" /> },
    { name: "OpenAI API", demand: 65, availability: 18, category: "AI/ML", icon: <Brain className="h-4 w-4" /> },
    { name: "Hugging Face", demand: 58, availability: 15, category: "AI/ML", icon: <Brain className="h-4 w-4" /> },
  ],
  "Cloud Computing": [
    { name: "AWS", demand: 90, availability: 38, category: "Cloud Computing", icon: <Cloud className="h-4 w-4" /> },
    { name: "Azure", demand: 75, availability: 32, category: "Cloud Computing", icon: <Cloud className="h-4 w-4" /> },
    { name: "GCP", demand: 70, availability: 25, category: "Cloud Computing", icon: <Cloud className="h-4 w-4" /> },
    { name: "Docker", demand: 88, availability: 42, category: "Cloud Computing", icon: <Cloud className="h-4 w-4" /> },
    { name: "Kubernetes", demand: 82, availability: 28, category: "Cloud Computing", icon: <Cloud className="h-4 w-4" /> },
    { name: "Terraform", demand: 72, availability: 25, category: "Cloud Computing", icon: <Cloud className="h-4 w-4" /> },
    { name: "Serverless", demand: 68, availability: 22, category: "Cloud Computing", icon: <Cloud className="h-4 w-4" /> },
    { name: "Microservices", demand: 75, availability: 30, category: "Cloud Computing", icon: <Cloud className="h-4 w-4" /> },
  ],
};

// Calculate learn score based on demand and availability
function calculateLearnScore(demand: number, availability: number): number {
  // High demand + low availability = high learn score
  // Low demand + low availability = low learn score
  // High demand + high availability = medium learn score
  // Low demand + high availability = low learn score
  
  const demandWeight = 0.7; // Demand is more important
  const availabilityWeight = 0.3;
  
  // Normalize availability (invert it - lower availability = higher score)
  const normalizedAvailability = 100 - availability;
  
  const learnScore = (demand * demandWeight) + (normalizedAvailability * availabilityWeight);
  return Math.round(learnScore);
}

// Get learn score color and label
function getLearnScoreInfo(score: number): { color: string; label: string; bgColor: string } {
  if (score >= 80) return { color: "text-[#FF9000]", label: "Excellent", bgColor: "bg-[#FAF000]/10 dark:bg-[#FAF000]/20" };
  if (score >= 65) return { color: "text-[#FF9000]", label: "Good", bgColor: "bg-[#FAF000]/10 dark:bg-[#FAF000]/20" };
  if (score >= 50) return { color: "text-[#FF9000]", label: "Fair", bgColor: "bg-[#FAF000]/10 dark:bg-[#FAF000]/20" };
  if (score >= 35) return { color: "text-[#FF9000]", label: "Poor", bgColor: "bg-[#FAF000]/10 dark:bg-[#FAF000]/20" };
  return { color: "text-[#FF9000]", label: "Very Poor", bgColor: "bg-[#FAF000]/10 dark:bg-[#FAF000]/20" };
}

export default function SkillsPage() {
  const userRole = "participant";
  const userName = "John Doe";
  const userAvatar = undefined;

  const [activeTab, setActiveTab] = useState<"skills" | "technologies">("skills");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"learnScore" | "demand" | "availability" | "name">("learnScore");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Flatten all skills and deduplicate by name, keeping the one with highest demand
  const allSkillsRaw = Object.values(skillsData).flat();
  const skillMap = new Map();
  
  // Deduplicate skills by name, keeping the one with highest demand
  allSkillsRaw.forEach(skill => {
    const existing = skillMap.get(skill.name);
    if (!existing || skill.demand > existing.demand) {
      skillMap.set(skill.name, {
        ...skill,
        id: skill.name, // Use skill name as unique ID
        categories: [skill.category] // Track all categories this skill belongs to
      });
    } else if (existing && skill.demand === existing.demand) {
      // If demand is same, add category to the list
      existing.categories.push(skill.category);
    }
  });
  
  const allSkills = Array.from(skillMap.values());
  const categories = ["All", ...Object.keys(skillsData)];

  // Filter and sort skills
  const filteredSkills = allSkills
    .filter(skill => {
      const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || skill.categories.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (sortBy) {
        case "learnScore":
          aValue = calculateLearnScore(a.demand, a.availability);
          bValue = calculateLearnScore(b.demand, b.availability);
          break;
        case "demand":
          aValue = a.demand;
          bValue = b.demand;
          break;
        case "availability":
          aValue = a.availability;
          bValue = b.availability;
          break;
        case "name":
          aValue = a.name;
          bValue = b.name;
          break;
        default:
          aValue = calculateLearnScore(a.demand, a.availability);
          bValue = calculateLearnScore(b.demand, b.availability);
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }

      return sortOrder === "asc" ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
    });

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full h-screen border border-neutral-200 dark:border-neutral-700 overflow-hidden")}>
        <DashboardSidebar userRole={userRole} userName={userName} userAvatar={userAvatar} />
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
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Skills Tracker</h1>
                <p className="text-neutral-600 dark:text-neutral-400">Track skill demand, availability, and learning opportunities</p>
              </div>
            </motion.div>

            {/* Toggle Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex gap-2 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg"
            >
              <button
                onClick={() => setActiveTab("skills")}
                className={cn(
                  "flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  activeTab === "skills"
                    ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                )}
              >
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Skills & Technologies
                        </div>
                          </button>
            </motion.div>

            {/* Search and Filters */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col md:flex-row gap-4"
            >
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search skills and technologies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                />
                        </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Sort Options */}
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white"
                >
                  <option value="learnScore">Learn Score</option>
                  <option value="demand">Demand</option>
                  <option value="availability">Availability</option>
                  <option value="name">Name</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  className="px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                >
                  {sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>
            </motion.div>

            {/* Stats Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <GlowingCard className="h-full">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 rounded-lg">
                    <Target className="h-5 w-5 text-[#FF9000]" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Total Skills</p>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-white">{allSkills.length}</p>
                  </div>
                </div>
              </GlowingCard>

              <GlowingCard className="h-full">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-[#FF9000]" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">High Demand</p>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {allSkills.filter(s => s.demand >= 80).length}
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
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Low Availability</p>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {allSkills.filter(s => s.availability <= 30).length}
                    </p>
                  </div>
                </div>
              </GlowingCard>

              <GlowingCard className="h-full">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 rounded-lg">
                    <Star className="h-5 w-5 text-[#FF9000]" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Excellent Learn Score</p>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {allSkills.filter(s => calculateLearnScore(s.demand, s.availability) >= 80).length}
                    </p>
                  </div>
                </div>
              </GlowingCard>
            </motion.div>

            {/* Skills Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {filteredSkills.map((skill, index) => {
                const learnScore = calculateLearnScore(skill.demand, skill.availability);
                const scoreInfo = getLearnScoreInfo(learnScore);
                
                return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                  >
                    <GlowingCard className="h-full">
                      <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                            {skill.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">
                              {skill.name}
                            </h3>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {skill.categories.map((category, idx) => (
                                <span key={idx} className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs rounded-full">
                                  {category}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Metrics */}
                        <div className="space-y-3 flex-1">
                          {/* Learn Score */}
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-neutral-600 dark:text-neutral-400">Learn Score</span>
                            <div className={cn("px-2 py-1 rounded-full text-xs font-medium", scoreInfo.bgColor, scoreInfo.color)}>
                              {learnScore} - {scoreInfo.label}
                            </div>
                          </div>

                          {/* Demand */}
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-neutral-600 dark:text-neutral-400">Demand</span>
                              <span className="text-xs font-medium text-neutral-900 dark:text-white">{skill.demand}%</span>
                        </div>
                        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                          <div 
                                className="bg-[#FF9000] h-2 rounded-full transition-all duration-300"
                                style={{ width: `${skill.demand}%` }}
                              />
                        </div>
                          </div>

                          {/* Availability */}
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-neutral-600 dark:text-neutral-400">Availability</span>
                              <span className="text-xs font-medium text-neutral-900 dark:text-white">{skill.availability}%</span>
                            </div>
                            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                              <div 
                                className="bg-[#FF9000] h-2 rounded-full transition-all duration-300"
                                style={{ width: `${skill.availability}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-700">
                          <a
                            href={`/participant/dashboard/skills/${encodeURIComponent(skill.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""))}`}
                            className="block w-full text-center px-3 py-2 bg-[#FF9000] text-white text-xs font-medium rounded-lg hover:bg-[#FFA100] transition-colors"
                          >
                            Learn More
                          </a>
                        </div>
                      </div>
                    </GlowingCard>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* No Results */}
            {filteredSkills.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center py-12"
              >
                <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Search className="h-8 w-8 text-neutral-400" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">No skills found</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Try adjusting your search terms or category filter
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
