"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Search, 
  Plus, 
  Send, 
  ArrowLeft,
  Building2,
  DollarSign,
  Calendar,
  User,
  Users,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

const SponsorshipInquiries = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewChat, setShowNewChat] = useState(false);
  const [newChatEmail, setNewChatEmail] = useState("");

  // Mock sponsorship inquiry data
  const [inquiries, setInquiries] = useState([
    {
      id: "inquiry-1",
      organizer: {
        name: "TechCrunch",
        avatar: "T",
        email: "partnerships@techcrunch.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        website: "techcrunch.com",
        companySize: "500-1000 employees",
        industry: "Media & Technology"
      },
      event: {
        name: "TechCrunch Disrupt 2024",
        date: "2024-09-15",
        location: "San Francisco, CA",
        expectedParticipants: 5000,
        budget: 25000,
        description: "The world's leading startup conference featuring the most innovative companies and entrepreneurs."
      },
      inquiry: {
        message: "We're looking for a premier sponsor for TechCrunch Disrupt 2024. This is our flagship event with 5,000+ attendees including VCs, entrepreneurs, and tech leaders. We're offering exclusive branding opportunities, speaking slots, and networking access.",
        sentDate: "2024-01-15",
        status: "pending",
        priority: "high"
      },
      messages: [
        {
          id: 1,
          sender: "organizer",
          message: "Hi Jennifer, we'd love to discuss sponsorship opportunities for TechCrunch Disrupt 2024. This is our biggest event of the year with 5,000+ attendees.",
          timestamp: "2024-01-15T10:00:00Z"
        },
        {
          id: 2,
          sender: "sponsor",
          message: "Hi! Thanks for reaching out. I'm interested in learning more about the sponsorship packages and branding opportunities.",
          timestamp: "2024-01-15T14:30:00Z"
        },
        {
          id: 3,
          sender: "organizer",
          message: "Great! I'll send you our sponsorship deck with all the details. We have several tiers available, and I think the Premier tier would be perfect for TechCorp Ventures.",
          timestamp: "2024-01-15T16:45:00Z"
        }
      ]
    },
    {
      id: "inquiry-2",
      organizer: {
        name: "MIT Innovation Lab",
        avatar: "M",
        email: "events@mit.edu",
        phone: "+1 (617) 253-1000",
        location: "Cambridge, MA",
        website: "innovation.mit.edu",
        companySize: "100-500 employees",
        industry: "Education & Research"
      },
      event: {
        name: "MIT Hackathon 2024",
        date: "2024-05-20",
        location: "Cambridge, MA",
        expectedParticipants: 800,
        budget: 20000,
        description: "Annual hackathon bringing together students, researchers, and industry professionals to solve real-world challenges."
      },
      inquiry: {
        message: "We're organizing our annual MIT Hackathon and looking for sponsors who share our passion for innovation and education. The event attracts top talent from MIT and surrounding universities.",
        sentDate: "2024-01-10",
        status: "in_progress",
        priority: "medium"
      },
      messages: [
        {
          id: 1,
          sender: "organizer",
          message: "Hello! We're organizing the MIT Hackathon 2024 and would love to discuss sponsorship opportunities with TechCorp Ventures.",
          timestamp: "2024-01-10T09:00:00Z"
        },
        {
          id: 2,
          sender: "sponsor",
          message: "Hi! MIT Hackathon sounds fantastic. We're very interested in supporting educational initiatives. What kind of sponsorship packages do you offer?",
          timestamp: "2024-01-10T11:15:00Z"
        },
        {
          id: 3,
          sender: "organizer",
          message: "We have several sponsorship levels. The Gold tier includes booth space, judging opportunities, and access to our talent pipeline. Would you like to schedule a call to discuss details?",
          timestamp: "2024-01-10T15:20:00Z"
        },
        {
          id: 4,
          sender: "sponsor",
          message: "Yes, that would be great. I'm available this Thursday afternoon. The Gold tier sounds very appealing.",
          timestamp: "2024-01-10T17:30:00Z"
        }
      ]
    },
    {
      id: "inquiry-3",
      organizer: {
        name: "AI Foundation",
        avatar: "A",
        email: "partnerships@aifoundation.org",
        phone: "+1 (415) 555-0123",
        location: "San Francisco, CA",
        website: "aifoundation.org",
        companySize: "50-100 employees",
        industry: "Non-profit & AI Research"
      },
      event: {
        name: "AI Innovation Summit",
        date: "2024-08-20",
        location: "San Francisco, CA",
        expectedParticipants: 1200,
        budget: 15000,
        description: "Leading AI conference bringing together researchers, practitioners, and industry leaders to discuss the future of artificial intelligence."
      },
      inquiry: {
        message: "We're hosting the AI Innovation Summit and looking for sponsors who are committed to advancing AI research and development. This event focuses on cutting-edge AI applications and ethical considerations.",
        sentDate: "2024-01-08",
        status: "accepted",
        priority: "high"
      },
      messages: [
        {
          id: 1,
          sender: "organizer",
          message: "Hi Jennifer, we'd love to have TechCorp Ventures as a sponsor for our AI Innovation Summit. Given your focus on AI investments, this would be a perfect partnership.",
          timestamp: "2024-01-08T08:00:00Z"
        },
        {
          id: 2,
          sender: "sponsor",
          message: "This sounds like an excellent opportunity! We're very interested in supporting AI innovation. What are the sponsorship benefits?",
          timestamp: "2024-01-08T10:30:00Z"
        },
        {
          id: 3,
          sender: "organizer",
          message: "Our Platinum sponsorship includes keynote speaking opportunity, exclusive networking dinner, and access to our AI research showcase. The investment is $15,000.",
          timestamp: "2024-01-08T14:00:00Z"
        },
        {
          id: 4,
          sender: "sponsor",
          message: "Perfect! We'd like to move forward with the Platinum sponsorship. When can we finalize the details?",
          timestamp: "2024-01-08T16:45:00Z"
        },
        {
          id: 5,
          sender: "organizer",
          message: "Excellent! I'll send over the sponsorship agreement today. Thank you for supporting AI innovation!",
          timestamp: "2024-01-08T17:30:00Z"
        }
      ]
    },
    {
      id: "inquiry-4",
      organizer: {
        name: "GreenTech Labs",
        avatar: "G",
        email: "events@greentechlabs.com",
        phone: "+1 (310) 555-0456",
        location: "Los Angeles, CA",
        website: "greentechlabs.com",
        companySize: "20-50 employees",
        industry: "Sustainability & Clean Tech"
      },
      event: {
        name: "Climate Hack Challenge",
        date: "2024-07-10",
        location: "Los Angeles, CA",
        expectedParticipants: 300,
        budget: 12000,
        description: "Focused hackathon on climate solutions, bringing together environmentalists, developers, and sustainability experts."
      },
      inquiry: {
        message: "We're organizing the Climate Hack Challenge to address environmental issues through technology. We're looking for sponsors who are committed to sustainability and climate action.",
        sentDate: "2024-01-05",
        status: "declined",
        priority: "low"
      },
      messages: [
        {
          id: 1,
          sender: "organizer",
          message: "Hi! We're organizing the Climate Hack Challenge and would love to discuss sponsorship opportunities. This event focuses on climate solutions and sustainability.",
          timestamp: "2024-01-05T09:00:00Z"
        },
        {
          id: 2,
          sender: "sponsor",
          message: "Thank you for reaching out. While we appreciate the mission, we're currently focusing our sponsorship budget on AI and fintech events. We'll keep you in mind for future opportunities.",
          timestamp: "2024-01-05T11:00:00Z"
        }
      ]
    }
  ]);

  const [chatMessages, setChatMessages] = useState<{[key: string]: any[]}>({});

  useEffect(() => {
    // Initialize chat messages
    const initialMessages: {[key: string]: any[]} = {};
    inquiries.forEach(inquiry => {
      initialMessages[inquiry.id] = inquiry.messages;
    });
    setChatMessages(initialMessages);
  }, []);

  const filteredInquiries = inquiries.filter(inquiry =>
    inquiry.organizer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const newMsg = {
      id: Date.now(),
      sender: "sponsor",
      message: newMessage,
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMsg]
    }));

    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20";
      case "in_progress": return "text-[#FF9000] dark:text-[#FAF000] bg-[#FAF000]/10 dark:bg-[#FAF000]/20";
      case "accepted": return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20";
      case "declined": return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20";
      default: return "text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 dark:text-red-400";
      case "medium": return "text-yellow-600 dark:text-yellow-400";
      case "low": return "text-green-600 dark:text-green-400";
      default: return "text-neutral-600 dark:text-neutral-400";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const selectedInquiry = inquiries.find(inquiry => inquiry.id === selectedChat);

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full h-screen border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      <DashboardSidebar userRole="sponsor" />
      
      <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-700">
        {/* Header */}
        <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/sponsor/dashboard/messages"
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-[#FF9000]" />
                  Sponsorship Inquiries
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                  Manage sponsorship requests and communications
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Inquiries List */}
          <div className="w-1/3 border-r border-neutral-200 dark:border-neutral-700 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search inquiries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-[#FF9000] focus:border-transparent"
                />
              </div>
            </div>

            {/* Inquiries List */}
            <div className="flex-1 overflow-y-auto">
              {filteredInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  onClick={() => setSelectedChat(inquiry.id)}
                  className={`p-4 border-b border-neutral-200 dark:border-neutral-700 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors ${
                    selectedChat === inquiry.id ? 'bg-[#FAF000]/5 dark:bg-[#FAF000]/20 border-[#FAF000] dark:border-[#FF9000]' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#FAF000] to-[#FF9000] rounded-full flex items-center justify-center text-white font-bold">
                      {inquiry.organizer.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-neutral-900 dark:text-white truncate">
                          {inquiry.organizer.name}
                        </h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(inquiry.inquiry.status)}`}>
                          {inquiry.inquiry.status}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
                        {inquiry.event.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                          {formatCurrency(inquiry.event.budget)}
                        </span>
                        <span className={`text-xs ${getPriorityColor(inquiry.inquiry.priority)}`}>
                          {inquiry.inquiry.priority} priority
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                        {new Date(inquiry.inquiry.sentDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#FAF000] to-[#FF9000] rounded-full flex items-center justify-center text-white font-bold">
                        {selectedInquiry?.organizer.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-white">
                          {selectedInquiry?.organizer.name}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {selectedInquiry?.event.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedInquiry?.inquiry.status || '')}`}>
                        {selectedInquiry?.inquiry.status}
                      </span>
                      <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                        {formatCurrency(selectedInquiry?.event.budget || 0)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 bg-[#FAF000]/5 dark:bg-[#FAF000]/10">
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Event Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-neutral-500" />
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {new Date(selectedInquiry?.event.date || '').toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-neutral-500" />
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {selectedInquiry?.event.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-neutral-500" />
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {selectedInquiry?.event.expectedParticipants} participants
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-neutral-500" />
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {formatCurrency(selectedInquiry?.event.budget || 0)} budget
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                    {selectedInquiry?.event.description}
                  </p>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages[selectedChat]?.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'sponsor' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'sponsor'
                            ? 'bg-[#FF9000] text-white'
                            : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'sponsor' ? 'text-[#FFDD00]' : 'text-neutral-500 dark:text-neutral-400'
                        }`}>
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-[#FF9000] focus:border-transparent"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                    Select an inquiry
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Choose a sponsorship inquiry from the list to start the conversation
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorshipInquiries;
