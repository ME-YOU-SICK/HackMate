"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  DollarSign, 
  MapPin, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Building2, 
  Award, 
  TrendingUp, 
  Star,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ExternalLink
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";

const SponsorInvitations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [minEvents, setMinEvents] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [selectedRequestData, setSelectedRequestData] = useState<any>(null);

  // Mock sponsor information
  const sponsorInfo = {
    name: "TechCorp Ventures",
    email: "partnerships@techcorp.com",
    contactPerson: "Jennifer Martinez",
    phone: "+1 (555) 123-4567",
    website: "techcorp.com",
    industry: "Technology & Innovation"
  };

  // Mock funding requests data
  const fundingRequests = [
    {
      id: "req-001",
      organizer: {
        name: "TechCrunch",
        avatar: null,
        location: "San Francisco, CA",
        eventsHosted: 45,
        rating: 4.8,
        established: "2005",
        website: "techcrunch.com",
        email: "partnerships@techcrunch.com",
        contactPerson: "Sarah Johnson"
      },
      event: {
        name: "TechCrunch Disrupt 2024",
        type: "Corporate",
        date: "2024-09-15",
        duration: "3 days",
        location: "San Francisco, CA",
        expectedParticipants: 450,
        description: "The world's leading startup conference featuring the most innovative companies and entrepreneurs."
      },
      funding: {
        requested: 25000,
        purpose: "Main stage sponsorship, networking events, and participant prizes",
        benefits: ["Logo placement", "Speaking opportunity", "Booth space", "Networking access"]
      },
      status: "pending",
      submittedDate: "2024-01-15",
      priority: "high"
    },
    {
      id: "req-002",
      organizer: {
        name: "AI Foundation",
        avatar: null,
        location: "Boston, MA",
        eventsHosted: 12,
        rating: 4.6,
        established: "2018",
        website: "aifoundation.org",
        email: "events@aifoundation.org",
        contactPerson: "Dr. Michael Chen"
      },
      event: {
        name: "AI Innovation Summit",
        type: "Community",
        date: "2024-08-20",
        duration: "2 days",
        location: "Boston, MA",
        expectedParticipants: 320,
        description: "Exploring the latest advances in artificial intelligence and machine learning."
      },
      funding: {
        requested: 15000,
        purpose: "Research grants, student scholarships, and technology showcase",
        benefits: ["Research collaboration", "Talent recruitment", "Brand visibility", "Thought leadership"]
      },
      status: "pending",
      submittedDate: "2024-01-10",
      priority: "medium"
    },
    {
      id: "req-003",
      organizer: {
        name: "GreenTech Labs",
        avatar: null,
        location: "Austin, TX",
        eventsHosted: 8,
        rating: 4.7,
        established: "2020",
        website: "greentechlabs.org",
        email: "sponsors@greentechlabs.org",
        contactPerson: "Emma Rodriguez"
      },
      event: {
        name: "Climate Hack Challenge",
        type: "Government/NGO",
        date: "2024-07-10",
        duration: "2 days",
        location: "Austin, TX",
        expectedParticipants: 280,
        description: "Hackathon focused on climate change solutions and sustainable technology."
      },
      funding: {
        requested: 12000,
        purpose: "Environmental impact projects, sustainability awards, and community outreach",
        benefits: ["CSR alignment", "Environmental impact", "Community engagement", "Media coverage"]
      },
      status: "pending",
      submittedDate: "2024-01-05",
      priority: "medium"
    },
    {
      id: "req-004",
      organizer: {
        name: "Techstars",
        avatar: null,
        location: "Boulder, CO",
        eventsHosted: 89,
        rating: 4.9,
        established: "2006",
        website: "techstars.com",
        email: "partnerships@techstars.com",
        contactPerson: "David Kim"
      },
      event: {
        name: "Startup Weekend Global",
        type: "Accelerator",
        date: "2024-06-15",
        duration: "3 days",
        location: "Boulder, CO",
        expectedParticipants: 180,
        description: "Global startup weekend bringing together entrepreneurs, developers, and designers."
      },
      funding: {
        requested: 18000,
        purpose: "Startup incubation, mentorship programs, and investment opportunities",
        benefits: ["Investment pipeline", "Startup ecosystem", "Mentorship network", "Global reach"]
      },
      status: "accepted",
      submittedDate: "2024-01-01",
      priority: "high"
    },
    {
      id: "req-005",
      organizer: {
        name: "MIT Innovation Lab",
        avatar: null,
        location: "Cambridge, MA",
        eventsHosted: 23,
        rating: 4.8,
        established: "2015",
        website: "mit.edu/innovation",
        email: "innovation@mit.edu",
        contactPerson: "Prof. Lisa Wang"
      },
      event: {
        name: "MIT Hackathon 2024",
        type: "University",
        date: "2024-05-20",
        duration: "2 days",
        location: "Cambridge, MA",
        expectedParticipants: 350,
        description: "MIT's premier hackathon featuring cutting-edge technology and innovation."
      },
      funding: {
        requested: 20000,
        purpose: "Student prizes, research funding, and technology infrastructure",
        benefits: ["Talent pipeline", "Research collaboration", "University partnership", "Innovation showcase"]
      },
      status: "pending",
      submittedDate: "2024-01-12",
      priority: "high"
    },
    {
      id: "req-006",
      organizer: {
        name: "Blockchain Alliance",
        avatar: null,
        location: "New York, NY",
        eventsHosted: 15,
        rating: 4.5,
        established: "2019",
        website: "blockchainalliance.org",
        email: "sponsors@blockchainalliance.org",
        contactPerson: "Alex Thompson"
      },
      event: {
        name: "Web3 Innovation Summit",
        type: "Community",
        date: "2024-04-25",
        duration: "2 days",
        location: "New York, NY",
        expectedParticipants: 220,
        description: "Exploring the future of Web3, blockchain, and decentralized technologies."
      },
      funding: {
        requested: 10000,
        purpose: "Technology showcase, developer workshops, and community building",
        benefits: ["Web3 expertise", "Developer community", "Technology showcase", "Industry insights"]
      },
      status: "declined",
      submittedDate: "2023-12-20",
      priority: "low"
    }
  ];

  const eventTypes = ["all", "University", "Corporate", "Community", "Accelerator", "Government/NGO"];
  const statuses = ["all", "pending", "accepted", "declined"];
  const priorities = ["all", "high", "medium", "low"];

  // Filter and search logic
  const filteredRequests = useMemo(() => {
    return fundingRequests.filter(request => {
      const matchesSearch = request.organizer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           request.event.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesEventType = selectedEventType === "all" || request.event.type === selectedEventType;
      const matchesStatus = selectedStatus === "all" || request.status === selectedStatus;
      
      const matchesMinEvents = !minEvents || request.organizer.eventsHosted >= parseInt(minEvents);
      const matchesMaxBudget = !maxBudget || request.funding.requested <= parseInt(maxBudget);
      
      return matchesSearch && matchesEventType && matchesStatus && matchesMinEvents && matchesMaxBudget;
    });
  }, [searchTerm, selectedEventType, selectedStatus, minEvents, maxBudget]);

  const handleAccept = (request: any) => {
    setSelectedRequestData(request);
    setShowAcceptModal(true);
  };

  const handleDecline = (request: any) => {
    setSelectedRequestData(request);
    setShowDeclineModal(true);
  };

  const confirmAccept = () => {
    // In a real app, this would send an email to the organizer
    const emailContent = {
      to: selectedRequestData.organizer.email,
      subject: `Funding Interest: ${selectedRequestData.event.name}`,
      body: `
Dear ${selectedRequestData.organizer.contactPerson},

We are interested in funding your event "${selectedRequestData.event.name}" and would like to discuss sponsorship opportunities.

Sponsor Details:
- Company: ${sponsorInfo.name}
- Contact Person: ${sponsorInfo.contactPerson}
- Email: ${sponsorInfo.email}
- Phone: ${sponsorInfo.phone}
- Website: ${sponsorInfo.website}
- Industry: ${sponsorInfo.industry}

Please contact us to discuss the funding details and next steps.

Best regards,
${sponsorInfo.contactPerson}
${sponsorInfo.name}
      `
    };
    
    console.log("Email sent to organizer:", emailContent);
    setShowAcceptModal(false);
    setSelectedRequestData(null);
  };

  const confirmDecline = () => {
    // In a real app, this would send a decline email to the organizer
    const emailContent = {
      to: selectedRequestData.organizer.email,
      subject: `Funding Decision: ${selectedRequestData.event.name}`,
      body: `
Dear ${selectedRequestData.organizer.contactPerson},

Thank you for reaching out regarding funding for "${selectedRequestData.event.name}". 

After careful consideration, we have decided not to pursue this sponsorship opportunity at this time. We wish you the best of luck with your event.

Best regards,
${sponsorInfo.contactPerson}
${sponsorInfo.name}
      `
    };
    
    console.log("Decline email sent to organizer:", emailContent);
    setShowDeclineModal(false);
    setSelectedRequestData(null);
  };

  const handleMessage = (request: any) => {
    // Open chat with organizer
    window.open(`/sponsor/dashboard/messages?organizer=${request.organizer.name}`, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20";
      case "declined": return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20";
      case "pending": return "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20";
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

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full h-screen border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      <DashboardSidebar userRole="sponsor" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <Mail className="h-6 w-6 text-[#FF9000]" />
                Funding Invitations
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                Review and respond to funding requests from event organizers
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {filteredRequests.length} of {fundingRequests.length} requests
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search organizers or events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-[#FF9000] focus:border-transparent"
                />
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex gap-2">
              <select
                value={selectedEventType}
                onChange={(e) => setSelectedEventType(e.target.value)}
                className="px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
              >
                {eventTypes.map(type => (
                  <option key={type} value={type}>
                    {type === "all" ? "All Event Types" : type}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-3 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Min Events Hosted
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 10"
                    value={minEvents}
                    onChange={(e) => setMinEvents(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Max Budget
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 20000"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setMinEvents("");
                      setMaxBudget("");
                      setSelectedEventType("all");
                      setSelectedStatus("all");
                      setSearchTerm("");
                    }}
                    className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-4">
            {filteredRequests.map((request) => (
              <GlowingCard
                key={request.id}
                icon={<Building2 className="h-5 w-5" />}
                title={request.event.name}
                description={`by ${request.organizer.name}`}
              >
                <div className="space-y-4">
                  {/* Organizer Info */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#FAF000] to-[#FF9000] rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {request.organizer.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-white">{request.organizer.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {request.organizer.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {request.organizer.eventsHosted} events
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            {request.organizer.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                      <span className={`text-xs ${getPriorityColor(request.priority)}`}>
                        {request.priority} priority
                      </span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-neutral-900 dark:text-white mb-2">Event Details</h4>
                      <div className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          {new Date(request.event.date).toLocaleDateString()} ({request.event.duration})
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          {request.event.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3" />
                          {request.event.expectedParticipants} expected participants
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-3 w-3" />
                          {request.event.type}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-neutral-900 dark:text-white mb-2">Funding Request</h4>
                      <div className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-3 w-3" />
                          <span className="font-semibold text-green-600 dark:text-green-400">
                            {formatCurrency(request.funding.requested)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          Submitted {new Date(request.submittedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-medium text-neutral-900 dark:text-white mb-2">Event Description</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {request.event.description}
                    </p>
                  </div>

                  {/* Funding Purpose */}
                  <div>
                    <h4 className="font-medium text-neutral-900 dark:text-white mb-2">Funding Purpose</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {request.funding.purpose}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h4 className="font-medium text-neutral-900 dark:text-white mb-2">Sponsorship Benefits</h4>
                    <div className="flex flex-wrap gap-2">
                      {request.funding.benefits.map((benefit, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 text-[#FF9000] dark:text-[#FAF000] text-xs rounded-full"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  {request.status === "pending" && (
                    <div className="flex items-center gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                      <button
                        onClick={() => handleAccept(request)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Accept
                      </button>
                      <button
                        onClick={() => handleDecline(request)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <XCircle className="h-4 w-4" />
                        Decline
                      </button>
                      <button 
                        onClick={() => handleMessage(request)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Message
                      </button>
                    </div>
                  )}

                  {request.status !== "pending" && (
                    <div className="flex items-center gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                      <button 
                        onClick={() => handleMessage(request)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Message
                      </button>
                      <a
                        href={request.organizer.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </GlowingCard>
            ))}

            {filteredRequests.length === 0 && (
              <div className="text-center py-12">
                <Mail className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
                  No funding requests found
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Try adjusting your filters or search terms to find more requests.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Accept Confirmation Modal */}
      {showAcceptModal && selectedRequestData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                Confirm Funding Interest
              </h3>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Are you sure you want to express interest in funding <strong>{selectedRequestData.event.name}</strong> by <strong>{selectedRequestData.organizer.name}</strong>?
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-500 mb-6">
              This will send a confirmation email to the organizer with your contact details. The actual funding will be handled outside of our platform.
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmAccept}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Send Interest Email
              </button>
              <button
                onClick={() => setShowAcceptModal(false)}
                className="flex-1 px-4 py-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Decline Confirmation Modal */}
      {showDeclineModal && selectedRequestData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                Decline Funding Request
              </h3>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Are you sure you want to decline the funding request for <strong>{selectedRequestData.event.name}</strong> by <strong>{selectedRequestData.organizer.name}</strong>?
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-500 mb-6">
              This will send a polite decline email to the organizer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmDecline}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Send Decline Email
              </button>
              <button
                onClick={() => setShowDeclineModal(false)}
                className="flex-1 px-4 py-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SponsorInvitations;
