"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  MessageCircle, 
  Search, 
  Plus,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Online,
  Clock,
  Check,
  CheckCheck,
  User,
  Users,
  Building,
  Award
} from "lucide-react";

export default function ParticipantMessagesPage() {
  const userRole = "participant";
  const userName = "John Doe";
  const userAvatar = undefined;

  const initialConversations = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "participant",
      lastMessage: "Hey! Are you still interested in joining our team for the AI hackathon?",
      timestamp: "2 min ago",
      unread: 2,
      online: true,
      avatar: "SC"
    },
    {
      id: 2,
      name: "TechCorp Recruiter",
      role: "recruiter",
      lastMessage: "We'd love to schedule an interview with you. Are you available this week?",
      timestamp: "1 hour ago",
      unread: 0,
      online: false,
      avatar: "TC"
    },
    {
      id: 3,
      name: "AI Innovation Team",
      role: "team",
      lastMessage: "Great progress on the prototype! Let's meet tomorrow to discuss the presentation.",
      timestamp: "3 hours ago",
      unread: 1,
      online: true,
      avatar: "AI"
    },
    {
      id: 4,
      name: "Hackathon Organizer",
      role: "organizer",
      lastMessage: "Reminder: The final submission deadline is tomorrow at 6 PM.",
      timestamp: "1 day ago",
      unread: 0,
      online: false,
      avatar: "HO"
    }
  ];

  const chatMessages = {
    1: [
      {
        id: 1,
        sender: "Sarah Chen",
        content: "Hey John! I saw your profile and I'm really impressed with your React skills.",
        timestamp: "10:30 AM",
        isOwn: false
      },
      {
        id: 2,
        sender: "You",
        content: "Thanks Sarah! I checked out your projects too - that ML model you built is amazing!",
        timestamp: "10:32 AM",
        isOwn: true
      },
      {
        id: 3,
        sender: "Sarah Chen",
        content: "Are you still interested in joining our team for the AI hackathon? We need a frontend developer.",
        timestamp: "10:35 AM",
        isOwn: false
      },
      {
        id: 4,
        sender: "You",
        content: "Absolutely! I'd love to be part of the team. When does it start?",
        timestamp: "10:37 AM",
        isOwn: true
      },
      {
        id: 5,
        sender: "Sarah Chen",
        content: "Hey! Are you still interested in joining our team for the AI hackathon?",
        timestamp: "2 min ago",
        isOwn: false
      }
    ],
    2: [
      {
        id: 1,
        sender: "TechCorp Recruiter",
        content: "Hi John! We'd love to schedule an interview with you. Are you available this week?",
        timestamp: "1 hour ago",
        isOwn: false
      },
      {
        id: 2,
        sender: "You",
        content: "Yes, I'm available! What time works best for you?",
        timestamp: "1 hour ago",
        isOwn: true
      }
    ],
    3: [
      {
        id: 1,
        sender: "AI Innovation Team",
        content: "Great progress on the prototype! Let's meet tomorrow to discuss the presentation.",
        timestamp: "3 hours ago",
        isOwn: false
      },
      {
        id: 2,
        sender: "You",
        content: "Sounds good! I'll prepare the demo slides.",
        timestamp: "3 hours ago",
        isOwn: true
      }
    ],
    4: [
      {
        id: 1,
        sender: "Hackathon Organizer",
        content: "Reminder: The final submission deadline is tomorrow at 6 PM.",
        timestamp: "1 day ago",
        isOwn: false
      }
    ]
  };

  const [conversations, setConversations] = useState(initialConversations);
  const [selectedConversationId, setSelectedConversationId] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(chatMessages);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewChat, setShowNewChat] = useState(false);
  const [newChatEmail, setNewChatEmail] = useState("");
  const connections = [
    { id: 101, name: "Sarah Chen", email: "sarah@example.com", role: "participant", avatar: "SC" },
    { id: 102, name: "TechCorp Recruiter", email: "recruiter@techcorp.com", role: "recruiter", avatar: "TC" },
    { id: 103, name: "Hackathon Organizer", email: "organizer@hackfest.com", role: "organizer", avatar: "HO" },
  ];

  const filteredConversations = conversations.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const createConversationFrom = (name: string, role: string, avatar: string) => {
    // If a conversation already exists with this name, focus it instead of creating a duplicate
    const existing = conversations.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (existing) {
      setSelectedConversationId(existing.id);
      return;
    }

    const newId = Date.now();
    const newConv = {
      id: newId,
      name,
      role,
      lastMessage: "",
      timestamp: "now",
      unread: 0,
      online: false,
      avatar,
    };
    setConversations(prev => [newConv, ...prev]);
    setSelectedConversationId(newId);
  };

  const handleStartNewChat = () => {
    if (newChatEmail.trim()) {
      const name = newChatEmail.trim();
      const avatar = name.substring(0, 2).toUpperCase();
      createConversationFrom(name, "participant", avatar);
      setShowNewChat(false);
      setNewChatEmail("");
      return;
    }
  };

  const currentChat = conversations.find(conv => conv.id === selectedConversationId) || conversations[0];
  const currentMessages = messages[selectedConversationId as keyof typeof messages] || messages[1];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: Date.now(),
        sender: "You",
        content: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };

      setMessages(prev => ({
        ...prev,
        [selectedConversationId]: [...(prev[selectedConversationId as keyof typeof prev] || []), newMsg]
      }));

      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
                  Messages
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Connect with participants, organizers, recruiters, and sponsors
                </p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowSearch(s => !s)} className="flex items-center gap-2 px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors">
                  <Search className="h-4 w-4" />
                  Search
                </button>
                <button onClick={() => setShowNewChat(true)} className="flex items-center gap-2 px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors">
                  <Plus className="h-4 w-4" />
                  New Chat
                </button>
              </div>
            </motion.div>

            {/* Messages Layout */}
            <div className="flex flex-1 gap-6 overflow-hidden">
              {/* Conversations List */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="w-80 flex-shrink-0 flex flex-col"
              >
                {showSearch && (
                  <div className="mb-3">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by name or role..."
                      className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                    />
                  </div>
                )}
                <div className="flex-1 overflow-y-auto scrollbar-hide space-y-3 pr-2">
                  {filteredConversations.map((conversation) => (
                    <div key={conversation.id} className="">
                      <GlowingCard
                        icon={<MessageCircle className="h-4 w-4" />}
                        title={conversation.name}
                        description={conversation.lastMessage}
                        className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                          conversation.id === selectedConversationId ? 'ring-2 ring-[#FF9000]' : ''
                        }`}
                        onClick={() => setSelectedConversationId(conversation.id)}
                      >
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#FAF000] to-[#FFDD00] rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-xs">
                                {conversation.avatar}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              {conversation.online && (
                                <div className="w-2 h-2 bg-[#FFA100] rounded-full"></div>
                              )}
                              <span className="text-xs text-neutral-600 dark:text-neutral-400">
                                {conversation.role}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-neutral-500 dark:text-neutral-400">
                              {conversation.timestamp}
                            </span>
                            {conversation.unread > 0 && (
                              <div className="w-5 h-5 bg-[#FF9000] text-white rounded-full flex items-center justify-center text-xs">
                                {conversation.unread}
                              </div>
                            )}
                          </div>
                        </div>
                      </GlowingCard>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Chat Area */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-1 flex flex-col min-h-0"
              >
                <div className="flex-1 flex flex-col bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                  {/* Chat Header */}
                  <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#FAF000] to-[#FFDD00] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">SC</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-white">
                          {currentChat.name}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {currentChat.role} • {currentChat.online ? 'Online' : 'Offline'}
                        </p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto scrollbar-hide">
                    {currentMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.isOwn
                              ? 'bg-[#FF9000] text-white'
                              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <span className={`text-xs ${
                              message.isOwn ? 'text-[#FFDD00]' : 'text-neutral-500 dark:text-neutral-400'
                            }`}>
                              {message.timestamp}
                            </span>
                            {message.isOwn && (
                              <CheckCheck className="h-3 w-3 text-[#FFDD00]" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                        <Paperclip className="h-4 w-4" />
                      </button>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                        />
                      </div>
                      <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                        <Smile className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={handleSendMessage}
                        className="p-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            {showNewChat && (
              <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                <div className="w-full max-w-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Start a new chat</h3>
                    <button onClick={() => setShowNewChat(false)} className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-white">✕</button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-1">Email address</label>
                      <input
                        type="email"
                        value={newChatEmail}
                        onChange={(e) => setNewChatEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-2">Or pick from your connections</label>
                      <div className="max-h-48 overflow-y-auto space-y-2 pr-1 scrollbar-hide">
                        {connections.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => {
                              createConversationFrom(c.name, c.role, c.avatar);
                              setShowNewChat(false);
                            }}
                            className="w-full flex items-center justify-between p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-left"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 bg-gradient-to-br from-[#FAF000] to-[#FFDD00] rounded-full flex items-center justify-center text-white text-xs font-bold">{c.avatar}</div>
                              <div>
                                <div className="text-sm text-neutral-900 dark:text-white">{c.name}</div>
                                <div className="text-xs text-neutral-500">{c.email}</div>
                              </div>
                            </div>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-[#FAF000]/10 dark:bg-[#FAF000]/20 text-[#FFA100] dark:text-[#FFDD00]">{c.role}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <button onClick={() => setShowNewChat(false)} className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800">Cancel</button>
                    <button onClick={handleStartNewChat} className="px-4 py-2 rounded-lg bg-[#FF9000] text-white hover:bg-[#FFA100]">Start Chat</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* New Chat Modal */
