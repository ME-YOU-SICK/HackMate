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
  Award,
  Briefcase
} from "lucide-react";

export default function RecruiterMessagesPage() {
  const userRole = "recruiter";
  const userName = "Alex Chen";
  const userAvatar = undefined;
  
  const [selectedConversationId, setSelectedConversationId] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState({});

  const conversations = [
    {
      id: 1,
      name: "John Doe",
      role: "participant",
      lastMessage: "Thank you for the interview opportunity! I'm very excited about the role.",
      timestamp: "30 min ago",
      unread: 1,
      online: true,
      avatar: "JD"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "organizer",
      lastMessage: "We'd love to have you as a recruiting partner for our next hackathon.",
      timestamp: "2 hours ago",
      unread: 0,
      online: false,
      avatar: "SJ"
    },
    {
      id: 3,
      name: "Emma Wilson",
      role: "participant",
      lastMessage: "I've completed the technical assessment. When can we schedule the next round?",
      timestamp: "4 hours ago",
      unread: 1,
      online: true,
      avatar: "EW"
    },
    {
      id: 4,
      name: "TechCorp HR Team",
      role: "recruiter",
      lastMessage: "Great job on the recent hires! The candidates you found are excellent.",
      timestamp: "1 day ago",
      unread: 0,
      online: false,
      avatar: "TC"
    },
    {
      id: 5,
      name: "Mike Rodriguez",
      role: "participant",
      lastMessage: "I'm interested in the Senior Developer position. Can we discuss the details?",
      timestamp: "2 days ago",
      unread: 0,
      online: false,
      avatar: "MR"
    }
  ];

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
        [selectedConversationId]: [...(prev[selectedConversationId as keyof typeof prev] || currentChat.messages), newMsg]
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

  const currentChat = {
    id: 1,
    name: "John Doe",
    role: "participant",
    online: true,
    messages: [
      {
        id: 1,
        sender: "You",
        content: "Hi John! I came across your profile and I'm impressed with your React and Node.js projects.",
        timestamp: "9:00 AM",
        isOwn: true
      },
      {
        id: 2,
        sender: "John Doe",
        content: "Thank you! I'm always excited to connect with potential opportunities.",
        timestamp: "9:05 AM",
        isOwn: false
      },
      {
        id: 3,
        sender: "You",
        content: "We have a Senior Frontend Developer position that I think would be a great fit. Are you interested in learning more?",
        timestamp: "9:07 AM",
        isOwn: true
      },
      {
        id: 4,
        sender: "John Doe",
        content: "Absolutely! I'd love to hear more about the role and the company.",
        timestamp: "9:10 AM",
        isOwn: false
      },
      {
        id: 5,
        sender: "You",
        content: "Great! I'll send you the job description and we can schedule a call to discuss further.",
        timestamp: "9:12 AM",
        isOwn: true
      },
      {
        id: 6,
        sender: "John Doe",
        content: "Thank you for the interview opportunity! I'm very excited about the role.",
        timestamp: "30 min ago",
        isOwn: false
      }
    ]
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
                  Connect with candidates, organizers, and other recruiters
                </p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Search className="h-4 w-4" />
                  Search
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="h-4 w-4" />
                  New Chat
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Briefcase className="h-4 w-4" />
                  Schedule Interview
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
                <div className="flex-1 overflow-y-auto scrollbar-hide space-y-3 pr-2">
                  {conversations.map((conversation) => (
                    <div key={conversation.id} className="">
                      <GlowingCard
                        icon={<MessageCircle className="h-4 w-4" />}
                        title={conversation.name}
                        description={conversation.lastMessage}
                        className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                          conversation.id === selectedConversationId ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => setSelectedConversationId(conversation.id)}
                      >
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-xs">
                                {conversation.avatar}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              {conversation.online && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
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
                              <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
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
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">JD</span>
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
                      {(messages[selectedConversationId as keyof typeof messages] || currentChat.messages).map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.isOwn
                                ? 'bg-blue-600 text-white'
                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <span className={`text-xs ${
                                message.isOwn ? 'text-blue-100' : 'text-neutral-500 dark:text-neutral-400'
                              }`}>
                                {message.timestamp}
                              </span>
                              {message.isOwn && (
                                <CheckCheck className="h-3 w-3 text-blue-100" />
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
                            className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                          />
                        </div>
                        <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                          <Smile className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={handleSendMessage}
                          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Send className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
