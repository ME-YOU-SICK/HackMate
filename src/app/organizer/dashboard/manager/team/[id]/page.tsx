"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft,
  Users, 
  Calendar,
  MapPin,
  Building,
  GitBranch,
  FileText,
  Presentation,
  ExternalLink,
  Star,
  CheckCircle,
  Clock,
  Target,
  Award,
  Briefcase,
  Globe,
  Mail,
  Phone,
  Folder,
  Download,
  Eye,
  Edit,
  Plus,
  TrendingUp
} from "lucide-react";

export default function TeamDetailPage() {
  const userRole = "organizer";
  const userName = "Sarah Johnson";
  const userAvatar = undefined;
  const params = useParams();
  const router = useRouter();
  const teamId = params.id as string;
  
  const [team, setTeam] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock team data (in real app, this would be fetched based on teamId)
  const mockTeam = {
    id: "team-1-1",
    name: "Neural Networks",
    panelName: "Panel 1 - AI/ML Track",
    fullName: "Panel 1 - AI/ML Track | Neural Networks",
    members: [
      { name: "Alex Chen", role: "Team Lead", email: "alex@neural-networks.ai", phone: "+1 (555) 123-4567" },
      { name: "Sarah Kim", role: "Data Scientist", email: "sarah@neural-networks.ai", phone: "+1 (555) 234-5678" },
      { name: "Mike Johnson", role: "Backend Dev", email: "mike@neural-networks.ai", phone: "+1 (555) 345-6789" }
    ],
    currentRound: 2,
    status: "active",
    event: "AI Innovation Hackathon 2024",
    submissions: {
      abstract: "Advanced neural network architecture for image recognition with 99.2% accuracy on benchmark datasets. Our solution leverages cutting-edge deep learning techniques including attention mechanisms and transfer learning to achieve state-of-the-art performance in computer vision tasks.",
      githubRepo: "https://github.com/team-neural-networks/ai-hackathon",
      presentation: "https://docs.google.com/presentation/d/123",
      demo: "https://demo.neural-networks.ai",
      documentation: "Comprehensive documentation of our AI solution including architecture diagrams, API documentation, and deployment guides. The system is designed for scalability and can handle real-time image processing at 1000+ images per second.",
      video: "https://youtube.com/watch?v=neural-networks-demo",
      researchPaper: "https://arxiv.org/abs/neural-networks-2024"
    },
    progress: {
      development: 85,
      testing: 70,
      documentation: 90,
      presentation: 80
    },
    milestones: [
      { name: "Project Setup", completed: true, date: "2024-03-01" },
      { name: "Data Collection", completed: true, date: "2024-03-03" },
      { name: "Model Development", completed: true, date: "2024-03-08" },
      { name: "Testing & Validation", completed: false, date: "2024-03-12" },
      { name: "Documentation", completed: false, date: "2024-03-14" },
      { name: "Final Presentation", completed: false, date: "2024-03-15" }
    ],
    feedback: [
      { reviewer: "Judge 1", rating: 4.5, comment: "Excellent technical implementation, strong innovation in the approach." },
      { reviewer: "Judge 2", rating: 4.0, comment: "Good progress, needs more testing and documentation." },
      { reviewer: "Mentor", rating: 4.8, comment: "Outstanding team collaboration and problem-solving skills." }
    ]
  };

  useEffect(() => {
    // In a real app, fetch team data based on teamId
    setTeam(mockTeam);
  }, [teamId]);

  if (!team) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <Clock className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              Loading Team Details...
            </h3>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: <Eye className="h-4 w-4" /> },
    { id: "submissions", label: "Submissions", icon: <FileText className="h-4 w-4" /> },
    { id: "progress", label: "Progress", icon: <TrendingUp className="h-4 w-4" /> },
    { id: "feedback", label: "Feedback", icon: <Star className="h-4 w-4" /> },
    { id: "milestones", label: "Milestones", icon: <CheckCircle className="h-4 w-4" /> }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'eliminated': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'promoted': return 'bg-[#FAF000]/10 text-[#FF9000] dark:bg-[#FAF000] dark:text-[#FAF000]';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full h-screen border border-neutral-200 dark:border-neutral-700 overflow-hidden")}>
        <DashboardSidebar 
          userRole={userRole} 
          userName={userName}
          userAvatar={userAvatar}
        />
        
        {/* Main Content */}
        <div className="flex flex-1">
          <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-6 flex-1 w-full h-full overflow-hidden">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.back()}
                  className="flex items-center gap-2 px-3 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                    {team.fullName}
                  </h1>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {team.event} • Round {team.currentRound}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className={`px-3 py-2 rounded-lg text-sm font-medium ${getStatusColor(team.status)}`}>
                  {team.status}
                </span>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors">
                  <Edit className="h-4 w-4" />
                  Edit Team
                </button>
              </div>
            </motion.div>

            {/* Team Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <GlowingCard
                icon={<Users className="h-4 w-4" />}
                title="Team Members"
                description={`${team.members.length} members`}
              >
                <div className="mt-4 space-y-2">
                  {team.members.map((member: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-neutral-50 dark:bg-neutral-800 rounded">
                      <span className="text-sm font-medium text-neutral-900 dark:text-white">
                        {member.name}
                      </span>
                      <span className="text-xs text-neutral-600 dark:text-neutral-400">
                        {member.role}
                      </span>
                    </div>
                  ))}
                </div>
              </GlowingCard>

              <GlowingCard
                icon={<Target className="h-4 w-4" />}
                title="Current Round"
                description={`Round ${team.currentRound}`}
              >
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">
                      Progress
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Development</span>
                      <span>{team.progress.development}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                      <div 
                        className="bg-[#FFA100] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${team.progress.development}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </GlowingCard>

              <GlowingCard
                icon={<Award className="h-4 w-4" />}
                title="Team Status"
                description={team.status}
              >
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">
                      Quick Actions
                    </span>
                  </div>
                  <div className="space-y-2">
                    <button className="w-full px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                      Promote Team
                    </button>
                    <button className="w-full px-3 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors">
                      Disqualify Team
                    </button>
                  </div>
                </div>
              </GlowingCard>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border-b border-neutral-200 dark:border-neutral-700"
            >
              <div className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-[#FFA100] text-[#FF9000]'
                        : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Tab Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex-1 overflow-y-auto scrollbar-hide"
            >
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Team Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-neutral-900 dark:text-white mb-2">Abstract</h4>
                          <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                            {team.submissions.abstract}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-neutral-900 dark:text-white mb-2">Contact Information</h4>
                          <div className="space-y-2">
                            {team.members.map((member: any, index: number) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <Users className="h-4 w-4 text-neutral-400" />
                                <span className="text-neutral-900 dark:text-white">{member.name}</span>
                                <span className="text-neutral-500">•</span>
                                <span className="text-neutral-600 dark:text-neutral-400">{member.role}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-neutral-900 dark:text-white mb-2">Progress Overview</h4>
                          <div className="space-y-3">
                            {Object.entries(team.progress).map(([key, value]) => (
                              <div key={key}>
                                <div className="flex items-center justify-between text-sm mb-1">
                                  <span className="capitalize text-neutral-600 dark:text-neutral-400">{key}</span>
                                  <span className="text-neutral-900 dark:text-white font-medium">{value}%</span>
                                </div>
                                <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                                  <div 
                                    className="bg-[#FFA100] h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${value}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "submissions" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Team Submissions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <GlowingCard
                        icon={<GitBranch className="h-4 w-4" />}
                        title="GitHub Repository"
                        description="Source code and project files"
                      >
                        <div className="mt-4">
                          <a 
                            href={team.submissions.githubRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[#FF9000] hover:text-[#FFA100] transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                            View Repository
                          </a>
                        </div>
                      </GlowingCard>

                      <GlowingCard
                        icon={<Presentation className="h-4 w-4" />}
                        title="Presentation"
                        description="Project presentation slides"
                      >
                        <div className="mt-4">
                          <a 
                            href={team.submissions.presentation}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[#FF9000] hover:text-[#FFA100] transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                            View Presentation
                          </a>
                        </div>
                      </GlowingCard>

                      <GlowingCard
                        icon={<Globe className="h-4 w-4" />}
                        title="Live Demo"
                        description="Working project demonstration"
                      >
                        <div className="mt-4">
                          <a 
                            href={team.submissions.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[#FF9000] hover:text-[#FFA100] transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                            View Demo
                          </a>
                        </div>
                      </GlowingCard>

                      <GlowingCard
                        icon={<FileText className="h-4 w-4" />}
                        title="Documentation"
                        description="Technical documentation and guides"
                      >
                        <div className="mt-4">
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                            {team.submissions.documentation}
                          </p>
                          <button className="flex items-center gap-2 text-[#FF9000] hover:text-[#FFA100] transition-colors">
                            <Download className="h-4 w-4" />
                            Download Docs
                          </button>
                        </div>
                      </GlowingCard>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "progress" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Development Progress</h3>
                    <div className="space-y-6">
                      {Object.entries(team.progress).map(([key, value]) => (
                        <div key={key} className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-neutral-900 dark:text-white capitalize">
                              {key}
                            </h4>
                            <span className="text-lg font-semibold text-neutral-900 dark:text-white">
                              {value}%
                            </span>
                          </div>
                          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-3">
                            <div 
                              className="bg-[#FFA100] h-3 rounded-full transition-all duration-500"
                              style={{ width: `${value}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "feedback" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Judge & Mentor Feedback</h3>
                    <div className="space-y-4">
                      {team.feedback.map((item: any, index: number) => (
                        <div key={index} className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-neutral-900 dark:text-white">
                              {item.reviewer}
                            </h4>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-neutral-900 dark:text-white font-medium">
                                {item.rating}
                              </span>
                            </div>
                          </div>
                          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                            {item.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "milestones" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Project Milestones</h3>
                    <div className="space-y-3">
                      {team.milestones.map((milestone: any, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            milestone.completed 
                              ? 'bg-green-500 text-white' 
                              : 'bg-neutral-300 dark:bg-neutral-600 text-neutral-600 dark:text-neutral-400'
                          }`}>
                            {milestone.completed ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <Clock className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-medium ${
                              milestone.completed 
                                ? 'text-neutral-900 dark:text-white' 
                                : 'text-neutral-600 dark:text-neutral-400'
                            }`}>
                              {milestone.name}
                            </h4>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                              Due: {milestone.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
