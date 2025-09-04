"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { 
  DollarSign, 
  Users, 
  Calendar,
  MapPin,
  Building,
  TrendingUp,
  CheckCircle,
  Clock,
  Star,
  Plus,
  Eye,
  MessageSquare,
  Target,
  Award,
  Briefcase
} from "lucide-react";

export default function OrganizerSponsorshipPage() {
  const userRole = "organizer";
  const userName = "Sarah Johnson";
  const userAvatar = undefined;
  
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  // Mock data for events (same as announcements page)
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
      budget: 50000,
      currentSponsors: 3,
      totalFunding: 25000
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
      budget: 30000,
      currentSponsors: 1,
      totalFunding: 10000
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
      budget: 20000,
      currentSponsors: 2,
      totalFunding: 20000
    }
  ];

  // Mock data for sponsors (will be used in sponsor discovery)
  const eventSponsors = {
    1: [
      {
        id: "sponsor-1",
        name: "TechCorp Solutions",
        logo: "TC",
        type: "Technology Partner",
        investment: 15000,
        status: "confirmed",
        contactPerson: "Michael Chen",
        email: "michael@techcorp.com",
        phone: "+1 (555) 123-4567",
        interests: ["AI/ML", "Machine Learning", "Data Science"],
        previousEvents: 5,
        rating: 4.8,
        joinedDate: "2024-01-15"
      },
      {
        id: "sponsor-2",
        name: "Innovation Ventures",
        logo: "IV",
        type: "Gold Sponsor",
        investment: 8000,
        status: "confirmed",
        contactPerson: "Sarah Williams",
        email: "sarah@innovationventures.com",
        phone: "+1 (555) 987-6543",
        interests: ["Startups", "Innovation", "Tech"],
        previousEvents: 3,
        rating: 4.6,
        joinedDate: "2024-02-01"
      },
      {
        id: "sponsor-3",
        name: "CloudTech Inc",
        logo: "CT",
        type: "Silver Sponsor",
        investment: 2000,
        status: "pending",
        contactPerson: "David Rodriguez",
        email: "david@cloudtech.com",
        phone: "+1 (555) 456-7890",
        interests: ["Cloud Computing", "DevOps", "Infrastructure"],
        previousEvents: 2,
        rating: 4.4,
        joinedDate: "2024-02-20"
      }
    ],
    2: [
      {
        id: "sponsor-4",
        name: "Blockchain Capital",
        logo: "BC",
        type: "Platinum Sponsor",
        investment: 10000,
        status: "confirmed",
        contactPerson: "Lisa Park",
        email: "lisa@blockchaincapital.com",
        phone: "+1 (555) 321-0987",
        interests: ["Blockchain", "DeFi", "Web3"],
        previousEvents: 4,
        rating: 4.9,
        joinedDate: "2024-01-20"
      }
    ],
    3: [
      {
        id: "sponsor-5",
        name: "Gaming Studios Ltd",
        logo: "GS",
        type: "Title Sponsor",
        investment: 15000,
        status: "confirmed",
        contactPerson: "Alex Thompson",
        email: "alex@gamingstudios.com",
        phone: "+1 (555) 654-3210",
        interests: ["Gaming", "Web3", "NFTs"],
        previousEvents: 6,
        rating: 4.7,
        joinedDate: "2024-01-10"
      },
      {
        id: "sponsor-6",
        name: "Crypto Exchange Pro",
        logo: "CE",
        type: "Gold Sponsor",
        investment: 5000,
        status: "confirmed",
        contactPerson: "Maria Garcia",
        email: "maria@cryptoexchange.com",
        phone: "+1 (555) 789-0123",
        interests: ["Cryptocurrency", "Trading", "Finance"],
        previousEvents: 3,
        rating: 4.5,
        joinedDate: "2024-01-25"
      }
    ]
  };

  const currentEvent = events.find(e => e.id === selectedEvent);
  const currentSponsors = selectedEvent ? eventSponsors[selectedEvent as keyof typeof eventSponsors] || [] : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    if (type.includes('Platinum') || type.includes('Title')) return 'bg-[#FFA100]/10 text-[#FFA100] dark:bg-[#FFA100] dark:text-[#FAF000]';
    if (type.includes('Gold')) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    if (type.includes('Silver')) return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    return 'bg-[#FAF000]/10 text-[#FF9000] dark:bg-[#FAF000] dark:text-[#FAF000]';
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
                  Sponsorship Management
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Manage sponsors and funding for your events
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
                      description={`${event.currentSponsors} sponsors • $${event.totalFunding.toLocaleString()} raised`}
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
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="text-neutral-600 dark:text-neutral-400">
                          Budget: ${event.budget.toLocaleString()}
                        </span>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          {Math.round((event.totalFunding / event.budget) * 100)}% funded
                        </span>
                      </div>
                    </GlowingCard>
                  ))}
                </div>
              </motion.div>

              {/* Event Details & Sponsors */}
              {selectedEvent && currentEvent && (
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
                            {currentEvent.name}
                          </h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {currentEvent.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {currentEvent.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              ${currentEvent.totalFunding.toLocaleString()} / ${currentEvent.budget.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            href={`/organizer/dashboard/sponsorship/discover?eventId=${selectedEvent}`}
                            className="flex items-center gap-2 px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                            Get Sponsors
                          </Link>
                        </div>
                      </div>
                      
                      {/* Funding Progress */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-neutral-600 dark:text-neutral-400">Funding Progress</span>
                          <span className="text-neutral-900 dark:text-white font-medium">
                            {Math.round((currentEvent.totalFunding / currentEvent.budget) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-[#FFA100] to-green-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((currentEvent.totalFunding / currentEvent.budget) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Sponsors List */}
                    <div className="flex-1 p-4 overflow-y-auto scrollbar-hide">
                      {currentSponsors.length > 0 ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">
                              Current Sponsors ({currentSponsors.length})
                            </h4>
                          </div>
                          
                          {currentSponsors.map((sponsor) => (
                            <div key={sponsor.id} className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 bg-white dark:bg-neutral-800">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4">
                                  <div className="w-12 h-12 bg-gradient-to-br from-[#FAF000] to-[#FFDD00] rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">
                                      {sponsor.logo}
                                    </span>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h5 className="font-semibold text-neutral-900 dark:text-white">
                                        {sponsor.name}
                                      </h5>
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(sponsor.type)}`}>
                                        {sponsor.type}
                                      </span>
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sponsor.status)}`}>
                                        {sponsor.status}
                                      </span>
                                    </div>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                                      Contact: {sponsor.contactPerson} • {sponsor.email}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                                      <div className="flex items-center gap-1">
                                        <DollarSign className="h-4 w-4" />
                                        ${sponsor.investment.toLocaleString()}
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4" />
                                        {sponsor.rating}
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Briefcase className="h-4 w-4" />
                                        {sponsor.previousEvents} events
                                      </div>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {sponsor.interests.map((interest) => (
                                        <span key={interest} className="px-2 py-1 bg-[#FAF000]/10 dark:bg-[#FAF000] text-[#FF9000] dark:text-[#FAF000] rounded text-xs">
                                          {interest}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors">
                                    <Eye className="h-4 w-4" />
                                  </button>
                                  <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors">
                                    <MessageSquare className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                          <Target className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                            No Sponsors Yet
                          </h3>
                          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                            Start building your sponsor network for this event
                          </p>
                          <Link
                            href={`/organizer/dashboard/sponsorship/discover?eventId=${selectedEvent}`}
                            className="flex items-center gap-2 px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                            Find Sponsors
                          </Link>
                        </div>
                      )}
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
                    <DollarSign className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                      Select an Event
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Choose an event from the list to manage sponsors and funding
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