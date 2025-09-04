"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { 
  Settings, 
  Users, 
  Calendar,
  MapPin,
  Building,
  TrendingUp,
  CheckCircle,
  Clock,
  Star,
  Eye,
  MessageSquare,
  Target,
  Award,
  Briefcase,
  ChevronRight,
  ChevronDown,
  FolderOpen,
  GitBranch,
  FileText,
  Presentation,
  ExternalLink,
  ArrowUp,
  X,
  Plus,
  Folder
} from "lucide-react";

export default function OrganizerManagerPage() {
  const userRole = "organizer";
  const userName = "Sarah Johnson";
  const userAvatar = undefined;
  
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [actionType, setActionType] = useState<"promote" | "disqualify" | null>(null);

  // Mock data for events with complete hierarchy
  const events = [
    {
      id: 1,
      name: "AI Innovation Hackathon 2024",
      date: "2024-03-15",
      location: "Tech Center, San Francisco",
      status: "active",
      totalParticipants: 120,
      totalTeams: 24,
      panels: 3,
      currentRound: 2,
      maxRounds: 3
    },
    {
      id: 2,
      name: "Blockchain Development Challenge",
      date: "2024-03-22",
      location: "Innovation Hub, New York",
      status: "upcoming",
      totalParticipants: 80,
      totalTeams: 16,
      panels: 2,
      currentRound: 1,
      maxRounds: 2
    },
    {
      id: 3,
      name: "Web3 Gaming Tournament",
      date: "2024-02-28",
      location: "Gaming Arena, Los Angeles",
      status: "completed",
      totalParticipants: 60,
      totalTeams: 12,
      panels: 2,
      currentRound: 3,
      maxRounds: 3
    }
  ];

  // Mock data for event hierarchy and teams
  const eventHierarchy = {
    1: {
      panels: [
        {
          id: "panel-1",
          name: "Panel 1 - AI/ML Track",
          location: "Room A",
          teams: [
            {
              id: "team-1-1",
              name: "Neural Networks",
              panelName: "Panel 1 - AI/ML Track",
              fullName: "Panel 1 - AI/ML Track | Neural Networks",
              members: ["Alex Chen", "Sarah Kim", "Mike Johnson"],
              currentRound: 2,
              status: "active",
              submissions: {
                abstract: "Advanced neural network architecture for image recognition",
                githubRepo: "https://github.com/team-neural-networks/ai-hackathon",
                presentation: "https://docs.google.com/presentation/d/123",
                demo: "https://demo.neural-networks.ai",
                documentation: "Comprehensive documentation of our AI solution"
              },
              progress: {
                development: 85,
                testing: 70,
                documentation: 90,
                presentation: 80
              }
            },
            {
              id: "team-1-2",
              name: "Deep Learning Pioneers",
              panelName: "Panel 1 - AI/ML Track",
              fullName: "Panel 1 - AI/ML Track | Deep Learning Pioneers",
              members: ["Emma Wilson", "David Lee"],
              currentRound: 2,
              status: "active",
              submissions: {
                abstract: "Novel deep learning approach for natural language processing",
                githubRepo: "https://github.com/deep-learning-pioneers/nlp-hackathon",
                presentation: "https://docs.google.com/presentation/d/456",
                demo: "https://demo.deep-learning-pioneers.ai",
                documentation: "Research paper and implementation details"
              },
              progress: {
                development: 90,
                testing: 85,
                documentation: 95,
                presentation: 85
              }
            },
            {
              id: "team-1-3",
              name: "AI Visionaries",
              panelName: "Panel 1 - AI/ML Track",
              fullName: "Panel 1 - AI/ML Track | AI Visionaries",
              members: ["Lisa Zhang", "Tom Brown", "Anna Garcia"],
              currentRound: 1,
              status: "eliminated",
              submissions: {
                abstract: "Computer vision solution for autonomous vehicles",
                githubRepo: "https://github.com/ai-visionaries/cv-hackathon",
                presentation: "https://docs.google.com/presentation/d/789",
                demo: "https://demo.ai-visionaries.ai",
                documentation: "Technical specifications and safety analysis"
              },
              progress: {
                development: 60,
                testing: 45,
                documentation: 70,
                presentation: 65
              }
            }
          ]
        },
        {
          id: "panel-2",
          name: "Panel 2 - Full Stack Track",
          location: "Room B",
          teams: [
            {
              id: "team-2-1",
              name: "Full Stack Masters",
              panelName: "Panel 2 - Full Stack Track",
              fullName: "Panel 2 - Full Stack Track | Full Stack Masters",
              members: ["John Doe", "Jane Smith", "Bob Wilson"],
              currentRound: 2,
              status: "active",
              submissions: {
                abstract: "End-to-end web application with modern tech stack",
                githubRepo: "https://github.com/fullstack-masters/web-hackathon",
                presentation: "https://docs.google.com/presentation/d/101",
                demo: "https://demo.fullstack-masters.ai",
                documentation: "Architecture diagrams and API documentation"
              },
              progress: {
                development: 95,
                testing: 90,
                documentation: 85,
                presentation: 90
              }
            },
            {
              id: "team-2-2",
              name: "Web Warriors",
              panelName: "Panel 2 - Full Stack Track",
              fullName: "Panel 2 - Full Stack Track | Web Warriors",
              members: ["Alice Johnson", "Charlie Davis"],
              currentRound: 1,
              status: "eliminated",
              submissions: {
                abstract: "Progressive web app for real-time collaboration",
                githubRepo: "https://github.com/web-warriors/pwa-hackathon",
                presentation: "https://docs.google.com/presentation/d/202",
                demo: "https://demo.web-warriors.ai",
                documentation: "PWA features and performance metrics"
              },
              progress: {
                development: 75,
                testing: 60,
                documentation: 80,
                presentation: 70
              }
            }
          ]
        },
        {
          id: "panel-3",
          name: "Panel 3 - Mobile Development",
          location: "Room C",
          teams: [
            {
              id: "team-3-1",
              name: "Mobile Innovators",
              panelName: "Panel 3 - Mobile Development",
              fullName: "Panel 3 - Mobile Development | Mobile Innovators",
              members: ["Sophie Taylor", "Ryan Miller", "Maya Patel"],
              currentRound: 2,
              status: "active",
              submissions: {
                abstract: "Cross-platform mobile app for health monitoring",
                githubRepo: "https://github.com/mobile-innovators/health-hackathon",
                presentation: "https://docs.google.com/presentation/d/303",
                demo: "https://demo.mobile-innovators.ai",
                documentation: "Mobile app specifications and health compliance"
              },
              progress: {
                development: 88,
                testing: 82,
                documentation: 92,
                presentation: 87
              }
            }
          ]
        }
      ]
    },
    2: {
      panels: [
        {
          id: "panel-2-1",
          name: "Panel 1 - Blockchain Development",
          location: "Room A",
          teams: [
            {
              id: "team-2-1-1",
              name: "DeFi Architects",
              panelName: "Panel 1 - Blockchain Development",
              fullName: "Panel 1 - Blockchain Development | DeFi Architects",
              members: ["Carlos Rodriguez", "Priya Patel", "James Kim"],
              currentRound: 1,
              status: "active",
              submissions: {
                abstract: "Decentralized finance protocol for automated market making",
                githubRepo: "https://github.com/defi-architects/blockchain-hackathon",
                presentation: "https://docs.google.com/presentation/d/401",
                demo: "https://demo.defi-architects.ai",
                documentation: "Smart contract documentation and security audit"
              },
              progress: {
                development: 75,
                testing: 60,
                documentation: 70,
                presentation: 65
              }
            },
            {
              id: "team-2-1-2",
              name: "NFT Pioneers",
              panelName: "Panel 1 - Blockchain Development",
              fullName: "Panel 1 - Blockchain Development | NFT Pioneers",
              members: ["Maria Santos", "Ahmed Hassan"],
              currentRound: 1,
              status: "active",
              submissions: {
                abstract: "NFT marketplace with cross-chain compatibility",
                githubRepo: "https://github.com/nft-pioneers/marketplace-hackathon",
                presentation: "https://docs.google.com/presentation/d/402",
                demo: "https://demo.nft-pioneers.ai",
                documentation: "Marketplace architecture and token standards"
              },
              progress: {
                development: 80,
                testing: 70,
                documentation: 75,
                presentation: 70
              }
            },
            {
              id: "team-2-1-3",
              name: "Smart Contract Masters",
              panelName: "Panel 1 - Blockchain Development",
              fullName: "Panel 1 - Blockchain Development | Smart Contract Masters",
              members: ["Jennifer Liu", "Robert Taylor", "Sofia Martinez"],
              currentRound: 1,
              status: "active",
              submissions: {
                abstract: "Multi-signature wallet with advanced security features",
                githubRepo: "https://github.com/smart-contract-masters/wallet-hackathon",
                presentation: "https://docs.google.com/presentation/d/403",
                demo: "https://demo.smart-contract-masters.ai",
                documentation: "Security protocols and audit reports"
              },
              progress: {
                development: 85,
                testing: 75,
                documentation: 80,
                presentation: 75
              }
            },
            {
              id: "team-2-1-4",
              name: "Blockchain Analytics",
              panelName: "Panel 1 - Blockchain Development",
              fullName: "Panel 1 - Blockchain Development | Blockchain Analytics",
              members: ["Kevin Chen", "Amanda Wilson"],
              currentRound: 1,
              status: "active",
              submissions: {
                abstract: "Real-time blockchain data analytics platform",
                githubRepo: "https://github.com/blockchain-analytics/data-hackathon",
                presentation: "https://docs.google.com/presentation/d/404",
                demo: "https://demo.blockchain-analytics.ai",
                documentation: "Analytics algorithms and data processing pipeline"
              },
              progress: {
                development: 70,
                testing: 65,
                documentation: 85,
                presentation: 80
              }
            }
          ]
        },
        {
          id: "panel-2-2",
          name: "Panel 2 - Web3 Integration",
          location: "Room B",
          teams: [
            {
              id: "team-2-2-1",
              name: "Web3 Warriors",
              panelName: "Panel 2 - Web3 Integration",
              fullName: "Panel 2 - Web3 Integration | Web3 Warriors",
              members: ["Daniel Park", "Lisa Thompson", "Michael Brown"],
              currentRound: 1,
              status: "active",
              submissions: {
                abstract: "Web3 social media platform with token rewards",
                githubRepo: "https://github.com/web3-warriors/social-hackathon",
                presentation: "https://docs.google.com/presentation/d/405",
                demo: "https://demo.web3-warriors.ai",
                documentation: "Social features and tokenomics design"
              },
              progress: {
                development: 90,
                testing: 80,
                documentation: 85,
                presentation: 85
              }
            },
            {
              id: "team-2-2-2",
              name: "Metaverse Builders",
              panelName: "Panel 2 - Web3 Integration",
              fullName: "Panel 2 - Web3 Integration | Metaverse Builders",
              members: ["Rachel Green", "Tom Anderson"],
              currentRound: 1,
              status: "active",
              submissions: {
                abstract: "Virtual world with blockchain-based ownership",
                githubRepo: "https://github.com/metaverse-builders/virtual-hackathon",
                presentation: "https://docs.google.com/presentation/d/406",
                demo: "https://demo.metaverse-builders.ai",
                documentation: "3D world architecture and asset management"
              },
              progress: {
                development: 65,
                testing: 55,
                documentation: 70,
                presentation: 60
              }
            }
          ]
        }
      ]
    },
    3: {
      panels: [
        {
          id: "panel-3-1",
          name: "Panel 1 - Gaming Development",
          location: "Room A",
          teams: [
            {
              id: "team-3-1-1",
              name: "Game Studio Alpha",
              panelName: "Panel 1 - Gaming Development",
              fullName: "Panel 1 - Gaming Development | Game Studio Alpha",
              members: ["Alex Rivera", "Sarah Kim", "David Park", "Emma Chen"],
              currentRound: 3,
              status: "promoted",
              submissions: {
                abstract: "Multiplayer battle royale with NFT character customization",
                githubRepo: "https://github.com/game-studio-alpha/battle-hackathon",
                presentation: "https://docs.google.com/presentation/d/501",
                demo: "https://demo.game-studio-alpha.ai",
                documentation: "Game mechanics and NFT integration"
              },
              progress: {
                development: 100,
                testing: 95,
                documentation: 90,
                presentation: 95
              }
            },
            {
              id: "team-3-1-2",
              name: "Pixel Art Masters",
              panelName: "Panel 1 - Gaming Development",
              fullName: "Panel 1 - Gaming Development | Pixel Art Masters",
              members: ["Luna Rodriguez", "Marcus Johnson"],
              currentRound: 2,
              status: "eliminated",
              submissions: {
                abstract: "Retro-style puzzle game with blockchain achievements",
                githubRepo: "https://github.com/pixel-art-masters/puzzle-hackathon",
                presentation: "https://docs.google.com/presentation/d/502",
                demo: "https://demo.pixel-art-masters.ai",
                documentation: "Game design and achievement system"
              },
              progress: {
                development: 80,
                testing: 70,
                documentation: 75,
                presentation: 70
              }
            },
            {
              id: "team-3-1-3",
              name: "VR Gaming Innovators",
              panelName: "Panel 1 - Gaming Development",
              fullName: "Panel 1 - Gaming Development | VR Gaming Innovators",
              members: ["Zoe Williams", "Ryan Chen", "Maya Patel"],
              currentRound: 3,
              status: "promoted",
              submissions: {
                abstract: "Virtual reality racing game with cryptocurrency rewards",
                githubRepo: "https://github.com/vr-gaming-innovators/racing-hackathon",
                presentation: "https://docs.google.com/presentation/d/503",
                demo: "https://demo.vr-gaming-innovators.ai",
                documentation: "VR implementation and reward mechanics"
              },
              progress: {
                development: 95,
                testing: 90,
                documentation: 85,
                presentation: 90
              }
            }
          ]
        },
        {
          id: "panel-3-2",
          name: "Panel 2 - GameFi & Play-to-Earn",
          location: "Room B",
          teams: [
            {
              id: "team-3-2-1",
              name: "Play-to-Earn Champions",
              panelName: "Panel 2 - GameFi & Play-to-Earn",
              fullName: "Panel 2 - GameFi & Play-to-Earn | Play-to-Earn Champions",
              members: ["Jordan Lee", "Casey Smith", "Taylor Brown"],
              currentRound: 3,
              status: "promoted",
              submissions: {
                abstract: "Farming simulation game with real cryptocurrency rewards",
                githubRepo: "https://github.com/play-to-earn-champions/farming-hackathon",
                presentation: "https://docs.google.com/presentation/d/504",
                demo: "https://demo.play-to-earn-champions.ai",
                documentation: "Tokenomics and reward distribution system"
              },
              progress: {
                development: 100,
                testing: 95,
                documentation: 90,
                presentation: 95
              }
            },
            {
              id: "team-3-2-2",
              name: "NFT Game Collectors",
              panelName: "Panel 2 - GameFi & Play-to-Earn",
              fullName: "Panel 2 - GameFi & Play-to-Earn | NFT Game Collectors",
              members: ["Blake Wilson", "Avery Davis"],
              currentRound: 2,
              status: "eliminated",
              submissions: {
                abstract: "Card collection game with tradable NFT cards",
                githubRepo: "https://github.com/nft-game-collectors/card-hackathon",
                presentation: "https://docs.google.com/presentation/d/505",
                demo: "https://demo.nft-game-collectors.ai",
                documentation: "Card mechanics and trading system"
              },
              progress: {
                development: 75,
                testing: 65,
                documentation: 70,
                presentation: 65
              }
            },
            {
              id: "team-3-2-3",
              name: "DeFi Gaming Guild",
              panelName: "Panel 2 - GameFi & Play-to-Earn",
              fullName: "Panel 2 - GameFi & Play-to-Earn | DeFi Gaming Guild",
              members: ["Morgan Taylor", "Riley Johnson", "Quinn Anderson"],
              currentRound: 3,
              status: "promoted",
              submissions: {
                abstract: "Strategy game with DeFi yield farming mechanics",
                githubRepo: "https://github.com/defi-gaming-guild/strategy-hackathon",
                presentation: "https://docs.google.com/presentation/d/506",
                demo: "https://demo.defi-gaming-guild.ai",
                documentation: "DeFi integration and game balance"
              },
              progress: {
                development: 90,
                testing: 85,
                documentation: 80,
                presentation: 85
              }
            }
          ]
        }
      ]
    }
  };

  const currentEvent = events.find(e => e.id === selectedEvent);
  const currentHierarchy = selectedEvent ? eventHierarchy[selectedEvent as keyof typeof eventHierarchy] : null;

  const handleTeamSelection = (teamId: string) => {
    setSelectedTeams(prev => 
      prev.includes(teamId) 
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    );
  };

  const handleTeamAction = (action: "promote" | "disqualify") => {
    if (selectedTeams.length > 0) {
      setActionType(action);
      // In a real app, this would update the team status
      console.log(`${action} teams:`, selectedTeams);
      alert(`${selectedTeams.length} team(s) ${action === 'promote' ? 'promoted' : 'disqualified'} successfully!`);
      setSelectedTeams([]);
      setActionType(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'eliminated': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'promoted': return 'bg-[#FAF000]/10 text-[#FF9000] dark:bg-[#FAF000] dark:text-[#FAF000]';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getRoundColor = (round: number, maxRounds: number) => {
    const percentage = (round / maxRounds) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
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
              <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                  Event Manager
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Manage event progress, team hierarchy, and submissions
                </p>
              </div>
            </motion.div>

            {/* Content Layout */}
            <div className="flex flex-1 gap-6 overflow-hidden">
              {/* Events List */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="w-80 flex-shrink-0 flex flex-col"
              >
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                  Your Events
                </h2>
                <div className="flex-1 overflow-y-auto scrollbar-hide space-y-3 pr-2">
                  {events.map((event) => (
                    <GlowingCard
                      key={event.id}
                      icon={<Calendar className="h-4 w-4" />}
                      title={event.name}
                      description={`${event.panels} panels • ${event.totalTeams} teams • Round ${event.currentRound}/${event.maxRounds}`}
                      className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                        selectedEvent === event.id ? 'ring-2 ring-[#FF9000]' : ''
                      }`}
                      onClick={() => setSelectedEvent(event.id)}
                    >
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            event.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            event.status === 'upcoming' ? 'bg-[#FAF000]/10 text-[#FF9000] dark:bg-[#FAF000] dark:text-[#FAF000]' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                          }`}>
                            {event.status}
                          </span>
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          {event.date}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${getRoundColor(event.currentRound, event.maxRounds)}`}
                            style={{ width: `${(event.currentRound / event.maxRounds) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-neutral-600 dark:text-neutral-400">
                          {Math.round((event.currentRound / event.maxRounds) * 100)}%
                        </span>
                      </div>
                    </GlowingCard>
                  ))}
                </div>
              </motion.div>

              {/* Event Hierarchy & Management */}
              {selectedEvent && currentHierarchy && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex-1 flex flex-col min-h-0"
                >
                  <div className="flex-1 flex flex-col bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                    {/* Event Header */}
                    <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                            {currentEvent?.name}
                          </h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {currentEvent?.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {currentEvent?.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              Round {currentEvent?.currentRound} of {currentEvent?.maxRounds}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {selectedTeams.length > 0 && (
                            <>
                              <button
                                onClick={() => handleTeamAction("promote")}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                              >
                                <ArrowUp className="h-4 w-4" />
                                Promote ({selectedTeams.length})
                              </button>
                              <button
                                onClick={() => handleTeamAction("disqualify")}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                              >
                                <X className="h-4 w-4" />
                                Disqualify ({selectedTeams.length})
                              </button>
                            </>
                          )}
                          {selectedTeams.length === 1 && (
                            <Link
                              href={`/organizer/dashboard/manager/team/${selectedTeams[0]}`}
                              className="flex items-center gap-2 px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors"
                            >
                              <Eye className="h-4 w-4" />
                              View Details
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Event Hierarchy */}
                    <div className="flex-1 p-4 overflow-y-auto scrollbar-hide">
                      <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">
                          Event Hierarchy
                        </h4>
                        
                        {currentHierarchy.panels.map((panel) => (
                          <div key={panel.id} className="border border-neutral-200 dark:border-neutral-700 rounded-lg">
                            <div className="p-4 bg-neutral-50 dark:bg-neutral-900">
                              <div className="flex items-center gap-3">
                                <Building className="h-5 w-5 text-[#FF9000]" />
                                <div>
                                  <h5 className="font-semibold text-neutral-900 dark:text-white">
                                    {panel.name}
                                  </h5>
                                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    {panel.location} • {panel.teams.length} teams
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="p-4 space-y-3">
                              {panel.teams.map((team) => (
                                <div key={team.id} className="border border-neutral-200 dark:border-neutral-600 rounded-lg">
                                  <div 
                                    className={`p-3 cursor-pointer transition-colors ${
                                      selectedTeams.includes(team.id)
                                        ? 'bg-[#FAF000]/5 dark:bg-[#FAF000]/20 border border-[#FAF000] dark:border-[#FF9000]'
                                        : 'bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                                    }`}
                                    onClick={() => handleTeamSelection(team.id)}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                        <input
                                          type="checkbox"
                                          checked={selectedTeams.includes(team.id)}
                                          onChange={() => handleTeamSelection(team.id)}
                                          className="w-4 h-4 text-[#FF9000] bg-gray-100 border-gray-300 rounded focus:ring-[#FF9000]"
                                        />
                                        <div>
                                          <h6 className="font-medium text-neutral-900 dark:text-white">
                                            {team.name}
                                          </h6>
                                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                            {team.members.join(", ")}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(team.status)}`}>
                                          {team.status}
                                        </span>
                                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                          Round {team.currentRound}
                                        </span>
                                        <Link
                                          href={`/organizer/dashboard/manager/team/${team.id}`}
                                          className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                                        >
                                          <Eye className="h-4 w-4" />
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* No Event Selected */}
              {!selectedEvent && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex-1 flex items-center justify-center"
                >
                  <div className="text-center">
                    <Settings className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                      Select an Event
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Choose an event from the list to manage hierarchy and teams
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
