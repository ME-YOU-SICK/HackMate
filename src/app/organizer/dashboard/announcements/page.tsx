"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Megaphone, 
  Users, 
  User,
  Send,
  ChevronRight,
  ChevronDown,
  Calendar,
  MapPin,
  Clock,
  Target,
  MessageSquare,
  Building,
  Award,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function OrganizerAnnouncementsPage() {
  const userRole = "organizer";
  const userName = "Sarah Johnson";
  const userAvatar = undefined;
  
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [selectedPanel, setSelectedPanel] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null);
  const [showMessageComposer, setShowMessageComposer] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [messageType, setMessageType] = useState<"event" | "panel" | "team" | "individual">("event");

  // Mock data for events
  const events = [
    {
      id: 1,
      name: "AI Innovation Hackathon 2024",
      date: "2024-03-15",
      location: "Tech Center, San Francisco",
      status: "active",
      totalParticipants: 120,
      totalTeams: 24,
      panels: 3
    },
    {
      id: 2,
      name: "Blockchain Development Challenge",
      date: "2024-03-22",
      location: "Innovation Hub, New York",
      status: "upcoming",
      totalParticipants: 80,
      totalTeams: 16,
      panels: 2
    },
    {
      id: 3,
      name: "Web3 Gaming Tournament",
      date: "2024-02-28",
      location: "Gaming Arena, Los Angeles",
      status: "completed",
      totalParticipants: 60,
      totalTeams: 12,
      panels: 2
    }
  ];

  // Mock data for panels, teams, and participants
  const eventData = {
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
              members: [
                { id: "p1", name: "Alex Chen", role: "Team Lead", skills: ["Python", "TensorFlow", "ML"] },
                { id: "p2", name: "Sarah Kim", role: "Data Scientist", skills: ["R", "Pandas", "Statistics"] },
                { id: "p3", name: "Mike Johnson", role: "Backend Dev", skills: ["Node.js", "MongoDB", "API"] }
              ]
            },
            {
              id: "team-1-2",
              name: "Deep Learning Pioneers",
              members: [
                { id: "p4", name: "Emma Wilson", role: "ML Engineer", skills: ["PyTorch", "Computer Vision", "Python"] },
                { id: "p5", name: "David Lee", role: "Frontend Dev", skills: ["React", "TypeScript", "UI/UX"] }
              ]
            },
            {
              id: "team-1-3",
              name: "AI Visionaries",
              members: [
                { id: "p6", name: "Lisa Zhang", role: "Data Engineer", skills: ["Spark", "Kafka", "Big Data"] },
                { id: "p7", name: "Tom Brown", role: "DevOps", skills: ["Docker", "AWS", "CI/CD"] },
                { id: "p8", name: "Anna Garcia", role: "Product Manager", skills: ["Strategy", "Analytics", "Leadership"] }
              ]
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
              members: [
                { id: "p9", name: "John Doe", role: "Full Stack Dev", skills: ["React", "Node.js", "PostgreSQL"] },
                { id: "p10", name: "Jane Smith", role: "UI/UX Designer", skills: ["Figma", "CSS", "Prototyping"] },
                { id: "p11", name: "Bob Wilson", role: "Backend Dev", skills: ["Python", "Django", "Redis"] }
              ]
            },
            {
              id: "team-2-2",
              name: "Web Warriors",
              members: [
                { id: "p12", name: "Alice Johnson", role: "Frontend Dev", skills: ["Vue.js", "TypeScript", "Sass"] },
                { id: "p13", name: "Charlie Davis", role: "Backend Dev", skills: ["Java", "Spring", "MySQL"] }
              ]
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
              members: [
                { id: "p14", name: "Sophie Taylor", role: "iOS Dev", skills: ["Swift", "Xcode", "Core Data"] },
                { id: "p15", name: "Ryan Miller", role: "Android Dev", skills: ["Kotlin", "Android Studio", "Firebase"] },
                { id: "p16", name: "Maya Patel", role: "Cross-platform", skills: ["React Native", "Flutter", "JavaScript"] }
              ]
            }
          ]
        }
      ]
    }
  };

  const currentEvent = events.find(e => e.id === selectedEvent);
  const currentEventData = selectedEvent ? eventData[selectedEvent as keyof typeof eventData] : null;

  const getMessageTargetInfo = () => {
    if (messageType === "event" && currentEvent) {
      return { type: "Event", name: currentEvent.name, count: currentEvent.totalParticipants };
    } else if (messageType === "panel" && selectedPanel && currentEventData) {
      const panel = currentEventData.panels.find(p => p.id === selectedPanel);
      const totalMembers = panel?.teams.reduce((sum, team) => sum + team.members.length, 0) || 0;
      return { type: "Panel", name: panel?.name || "", count: totalMembers };
    } else if (messageType === "team" && selectedTeam && currentEventData) {
      const team = currentEventData.panels
        .flatMap(p => p.teams)
        .find(t => t.id === selectedTeam);
      return { type: "Team", name: team?.name || "", count: team?.members.length || 0 };
    } else if (messageType === "individual" && selectedParticipant) {
      return { type: "Individual", name: selectedParticipant, count: 1 };
    }
    return null;
  };

  const handleSendMessage = () => {
    if (messageTitle.trim() && messageContent.trim()) {
      const target = getMessageTargetInfo();
      console.log("Sending message:", {
        type: messageType,
        target,
        title: messageTitle,
        content: messageContent
      });
      
      // Reset form
      setMessageTitle("");
      setMessageContent("");
      setShowMessageComposer(false);
      setMessageType("event");
      setSelectedPanel(null);
      setSelectedTeam(null);
      setSelectedParticipant(null);
      
      alert(`Message sent successfully to ${target?.type}: ${target?.name} (${target?.count} recipients)`);
    }
  };

  const resetSelections = () => {
    setSelectedPanel(null);
    setSelectedTeam(null);
    setSelectedParticipant(null);
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
                  Announcements
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Send targeted messages to participants, teams, panels, or entire events
                </p>
              </div>
              <button 
                onClick={() => setShowMessageComposer(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors"
              >
                <Megaphone className="h-4 w-4" />
                New Announcement
              </button>
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
                      description={`${event.totalParticipants} participants • ${event.totalTeams} teams`}
                      className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                        selectedEvent === event.id ? 'ring-2 ring-[#FF9000]' : ''
                      }`}
                      onClick={() => {
                        setSelectedEvent(event.id);
                        resetSelections();
                      }}
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
                    </GlowingCard>
                  ))}
                </div>
              </motion.div>

              {/* Event Details & Participants */}
              {selectedEvent && currentEventData && (
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
                              {currentEvent?.totalParticipants} participants
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setMessageType("event");
                              setShowMessageComposer(true);
                            }}
                            className="flex items-center gap-2 px-3 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors text-sm"
                          >
                            <Megaphone className="h-4 w-4" />
                            Message All
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Panels */}
                    <div className="flex-1 p-4 space-y-4 overflow-y-auto scrollbar-hide">
                      {currentEventData.panels.map((panel) => (
                        <div key={panel.id} className="border border-neutral-200 dark:border-neutral-700 rounded-lg">
                          <div 
                            className="p-4 bg-neutral-50 dark:bg-neutral-900 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                            onClick={() => {
                              // Toggle panel selection
                              if (selectedPanel === panel.id) {
                                setSelectedPanel(null);
                              } else {
                                setSelectedPanel(panel.id);
                              }
                              setSelectedTeam(null);
                              setSelectedParticipant(null);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {selectedPanel === panel.id ? (
                                  <ChevronDown className="h-5 w-5 text-[#FF9000]" />
                                ) : (
                                  <ChevronRight className="h-5 w-5 text-neutral-400" />
                                )}
                                <div>
                                  <h4 className="font-semibold text-neutral-900 dark:text-white">
                                    {panel.name}
                                  </h4>
                                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    {panel.location} • {panel.teams.length} teams
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMessageType("panel");
                                  setSelectedPanel(panel.id);
                                  setShowMessageComposer(true);
                                }}
                                className="flex items-center gap-1 px-2 py-1 bg-[#FF9000] text-white rounded text-xs hover:bg-[#FFA100] transition-colors"
                              >
                                <MessageSquare className="h-3 w-3" />
                                Message Panel
                              </button>
                            </div>
                          </div>

                          <motion.div
                            initial={false}
                            animate={{
                              height: selectedPanel === panel.id ? "auto" : 0,
                              opacity: selectedPanel === panel.id ? 1 : 0
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 space-y-3">
                              {panel.teams.map((team) => (
                                <div key={team.id} className="border border-neutral-200 dark:border-neutral-600 rounded-lg">
                                  <div 
                                    className="p-3 bg-white dark:bg-neutral-800 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                                    onClick={() => {
                                      // Toggle team selection
                                      if (selectedTeam === team.id) {
                                        setSelectedTeam(null);
                                      } else {
                                        setSelectedTeam(team.id);
                                      }
                                      setSelectedParticipant(null);
                                    }}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                        {selectedTeam === team.id ? (
                                          <ChevronDown className="h-4 w-4 text-[#FF9000]" />
                                        ) : (
                                          <ChevronRight className="h-4 w-4 text-neutral-400" />
                                        )}
                                        <div>
                                          <h5 className="font-medium text-neutral-900 dark:text-white">
                                            {team.name}
                                          </h5>
                                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                            {team.members.length} members
                                          </p>
                                        </div>
                                      </div>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setMessageType("team");
                                          setSelectedTeam(team.id);
                                          setShowMessageComposer(true);
                                        }}
                                        className="flex items-center gap-1 px-2 py-1 bg-[#FF9000] text-white rounded text-xs hover:bg-[#FFA100] transition-colors"
                                      >
                                        <MessageSquare className="h-3 w-3" />
                                        Message Team
                                      </button>
                                    </div>
                                  </div>

                                  <motion.div
                                    initial={false}
                                    animate={{
                                      height: selectedTeam === team.id ? "auto" : 0,
                                      opacity: selectedTeam === team.id ? 1 : 0
                                    }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                  >
                                    <div className="p-3 space-y-2">
                                      {team.members.map((member) => (
                                        <div 
                                          key={member.id}
                                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                                            selectedParticipant === member.name 
                                              ? 'bg-[#FAF000]/5 dark:bg-[#FAF000]/20 border border-[#FAF000] dark:border-[#FF9000]' 
                                              : 'bg-neutral-50 dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600'
                                          }`}
                                          onClick={() => {
                                            setSelectedParticipant(member.name);
                                            setMessageType("individual");
                                          }}
                                        >
                                          <div className="flex items-center justify-between">
                                            <div>
                                              <h6 className="font-medium text-neutral-900 dark:text-white">
                                                {member.name}
                                              </h6>
                                              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                                {member.role}
                                              </p>
                                              <div className="flex flex-wrap gap-1 mt-1">
                                                {member.skills.slice(0, 3).map((skill) => (
                                                  <span key={skill} className="px-2 py-1 bg-[#FAF000]/10 dark:bg-[#FAF000] text-neutral-600 dark:text-neutral-400 rounded text-xs">
                                                    {skill}
                                                  </span>
                                                ))}
                                              </div>
                                            </div>
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setMessageType("individual");
                                                setSelectedParticipant(member.name);
                                                setShowMessageComposer(true);
                                              }}
                                              className="flex items-center gap-1 px-2 py-1 bg-[#FF9000] text-white rounded text-xs hover:bg-[#FFA100] transition-colors"
                                            >
                                              <MessageSquare className="h-3 w-3" />
                                              Message
                                            </button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </motion.div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        </div>
                      ))}
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
                    <Target className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                      Select an Event
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Choose an event from the list to view participants and send announcements
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Message Composer Modal */}
      {showMessageComposer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-neutral-900 border border-white/20 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Create Announcement</h2>
              <button
                onClick={() => setShowMessageComposer(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Target Info */}
            {getMessageTargetInfo() && (
              <div className="mb-6 p-4 bg-[#FF9000]/20 border border-[#FFA100]/30 rounded-lg">
                <div className="flex items-center gap-2 text-[#FFDD00]">
                  <Target className="h-4 w-4" />
                  <span className="font-medium">Sending to: {getMessageTargetInfo()?.type}</span>
                </div>
                <p className="text-white mt-1">{getMessageTargetInfo()?.name}</p>
                <p className="text-white/60 text-sm">{getMessageTargetInfo()?.count} recipient(s)</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Message Title
                </label>
                <input
                  type="text"
                  value={messageTitle}
                  onChange={(e) => setMessageTitle(e.target.value)}
                  placeholder="Enter announcement title..."
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9000] text-white placeholder-neutral-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Message Content
                </label>
                <textarea
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder="Enter your announcement message..."
                  rows={6}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9000] text-white placeholder-neutral-400 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowMessageComposer(false)}
                className="flex-1 px-4 py-3 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="flex-1 px-4 py-3 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors"
              >
                Send Announcement
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
