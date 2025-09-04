"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  DollarSign, 
  Users, 
  Building,
  Star,
  Filter,
  Search,
  ArrowLeft,
  Send,
  CheckCircle,
  Clock,
  TrendingUp,
  Target,
  Award,
  Briefcase,
  Globe,
  Mail,
  Phone,
  Calendar,
  X,
  ChevronDown,
  ChevronUp
} from "lucide-react";

function SponsorDiscoveryContent() {
  const userRole = "organizer";
  const userName = "Sarah Johnson";
  const userAvatar = undefined;
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const eventId = searchParams.get('eventId');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    investmentRange: "",
    interests: [] as string[],
    rating: "",
    experience: "",
    location: ""
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSponsors, setSelectedSponsors] = useState<string[]>([]);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");

  // Mock data for events
  const events = {
    1: { name: "AI Innovation Hackathon 2024", date: "2024-03-15", location: "San Francisco" },
    2: { name: "Blockchain Development Challenge", date: "2024-03-22", location: "New York" },
    3: { name: "Web3 Gaming Tournament", date: "2024-02-28", location: "Los Angeles" }
  };

  const currentEvent = eventId ? events[eventId as keyof typeof events] : null;

  // Comprehensive mock sponsor data
  const allSponsors = [
    {
      id: "sponsor-1",
      name: "TechCorp Solutions",
      logo: "TC",
      type: "Technology Partner",
      investmentRange: "10000-20000",
      minInvestment: 10000,
      maxInvestment: 20000,
      status: "available",
      contactPerson: "Michael Chen",
      email: "michael@techcorp.com",
      phone: "+1 (555) 123-4567",
      website: "techcorp.com",
      location: "San Francisco, CA",
      interests: ["AI/ML", "Machine Learning", "Data Science", "Cloud Computing"],
      previousEvents: 5,
      rating: 4.8,
      joinedDate: "2024-01-15",
      description: "Leading technology solutions provider specializing in AI and machine learning innovations.",
      specialties: ["AI Research", "Cloud Infrastructure", "Data Analytics"]
    },
    {
      id: "sponsor-2",
      name: "Innovation Ventures",
      logo: "IV",
      type: "Venture Capital",
      investmentRange: "5000-15000",
      minInvestment: 5000,
      maxInvestment: 15000,
      status: "available",
      contactPerson: "Sarah Williams",
      email: "sarah@innovationventures.com",
      phone: "+1 (555) 987-6543",
      website: "innovationventures.com",
      location: "New York, NY",
      interests: ["Startups", "Innovation", "Tech", "Fintech"],
      previousEvents: 3,
      rating: 4.6,
      joinedDate: "2024-02-01",
      description: "Early-stage venture capital firm focused on innovative technology startups.",
      specialties: ["Startup Funding", "Mentorship", "Network Access"]
    },
    {
      id: "sponsor-3",
      name: "CloudTech Inc",
      logo: "CT",
      type: "Cloud Services",
      investmentRange: "2000-8000",
      minInvestment: 2000,
      maxInvestment: 8000,
      status: "available",
      contactPerson: "David Rodriguez",
      email: "david@cloudtech.com",
      phone: "+1 (555) 456-7890",
      website: "cloudtech.com",
      location: "Austin, TX",
      interests: ["Cloud Computing", "DevOps", "Infrastructure", "Security"],
      previousEvents: 2,
      rating: 4.4,
      joinedDate: "2024-02-20",
      description: "Enterprise cloud solutions provider with focus on scalable infrastructure.",
      specialties: ["Cloud Infrastructure", "DevOps Tools", "Security Solutions"]
    },
    {
      id: "sponsor-4",
      name: "Blockchain Capital",
      logo: "BC",
      type: "Crypto Investment",
      investmentRange: "15000-30000",
      minInvestment: 15000,
      maxInvestment: 30000,
      status: "available",
      contactPerson: "Lisa Park",
      email: "lisa@blockchaincapital.com",
      phone: "+1 (555) 321-0987",
      website: "blockchaincapital.com",
      location: "Miami, FL",
      interests: ["Blockchain", "DeFi", "Web3", "Cryptocurrency"],
      previousEvents: 4,
      rating: 4.9,
      joinedDate: "2024-01-20",
      description: "Leading blockchain and cryptocurrency investment firm.",
      specialties: ["DeFi Protocols", "NFT Platforms", "Crypto Trading"]
    },
    {
      id: "sponsor-5",
      name: "Gaming Studios Ltd",
      logo: "GS",
      type: "Gaming Industry",
      investmentRange: "10000-25000",
      minInvestment: 10000,
      maxInvestment: 25000,
      status: "available",
      contactPerson: "Alex Thompson",
      email: "alex@gamingstudios.com",
      phone: "+1 (555) 654-3210",
      website: "gamingstudios.com",
      location: "Los Angeles, CA",
      interests: ["Gaming", "Web3", "NFTs", "Entertainment"],
      previousEvents: 6,
      rating: 4.7,
      joinedDate: "2024-01-10",
      description: "Premier gaming studio with focus on innovative gaming experiences.",
      specialties: ["Game Development", "NFT Gaming", "Esports"]
    },
    {
      id: "sponsor-6",
      name: "Crypto Exchange Pro",
      logo: "CE",
      type: "Financial Services",
      investmentRange: "5000-12000",
      minInvestment: 5000,
      maxInvestment: 12000,
      status: "available",
      contactPerson: "Maria Garcia",
      email: "maria@cryptoexchange.com",
      phone: "+1 (555) 789-0123",
      website: "cryptoexchange.com",
      location: "Chicago, IL",
      interests: ["Cryptocurrency", "Trading", "Finance", "DeFi"],
      previousEvents: 3,
      rating: 4.5,
      joinedDate: "2024-01-25",
      description: "Leading cryptocurrency exchange platform with global reach.",
      specialties: ["Trading Platforms", "DeFi Integration", "Financial Services"]
    },
    {
      id: "sponsor-7",
      name: "AI Research Labs",
      logo: "AR",
      type: "Research Institution",
      investmentRange: "8000-18000",
      minInvestment: 8000,
      maxInvestment: 18000,
      status: "available",
      contactPerson: "Dr. James Wilson",
      email: "james@airesearchlabs.com",
      phone: "+1 (555) 234-5678",
      website: "airesearchlabs.com",
      location: "Boston, MA",
      interests: ["AI/ML", "Research", "Academic", "Innovation"],
      previousEvents: 4,
      rating: 4.8,
      joinedDate: "2024-01-05",
      description: "Cutting-edge AI research institution focused on breakthrough technologies.",
      specialties: ["AI Research", "Academic Partnerships", "Technology Transfer"]
    },
    {
      id: "sponsor-8",
      name: "FinTech Innovations",
      logo: "FI",
      type: "Financial Technology",
      investmentRange: "6000-15000",
      minInvestment: 6000,
      maxInvestment: 15000,
      status: "available",
      contactPerson: "Jennifer Lee",
      email: "jennifer@fintechinnovations.com",
      phone: "+1 (555) 345-6789",
      website: "fintechinnovations.com",
      location: "Seattle, WA",
      interests: ["Fintech", "Banking", "Payments", "Blockchain"],
      previousEvents: 2,
      rating: 4.3,
      joinedDate: "2024-02-10",
      description: "Innovative financial technology solutions for modern banking.",
      specialties: ["Payment Systems", "Banking APIs", "Financial Analytics"]
    }
  ];

  // Filter sponsors based on search and filters
  const filteredSponsors = allSponsors.filter(sponsor => {
    const matchesSearch = sponsor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sponsor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sponsor.interests.some(interest => interest.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesInvestment = !selectedFilters.investmentRange || 
                             (sponsor.minInvestment >= parseInt(selectedFilters.investmentRange.split('-')[0]) &&
                              sponsor.maxInvestment <= parseInt(selectedFilters.investmentRange.split('-')[1]));
    
    const matchesInterests = selectedFilters.interests.length === 0 ||
                            selectedFilters.interests.some(filterInterest => 
                              sponsor.interests.some(sponsorInterest => 
                                sponsorInterest.toLowerCase().includes(filterInterest.toLowerCase())
                              )
                            );
    
    const matchesRating = !selectedFilters.rating || sponsor.rating >= parseFloat(selectedFilters.rating);
    
    const matchesExperience = !selectedFilters.experience ||
                             (selectedFilters.experience === "high" && sponsor.previousEvents >= 4) ||
                             (selectedFilters.experience === "medium" && sponsor.previousEvents >= 2 && sponsor.previousEvents < 4) ||
                             (selectedFilters.experience === "low" && sponsor.previousEvents < 2);
    
    const matchesLocation = !selectedFilters.location || 
                           sponsor.location.toLowerCase().includes(selectedFilters.location.toLowerCase());

    return matchesSearch && matchesInvestment && matchesInterests && matchesRating && matchesExperience && matchesLocation;
  });

  const handleSponsorSelect = (sponsorId: string) => {
    setSelectedSponsors(prev => 
      prev.includes(sponsorId) 
        ? prev.filter(id => id !== sponsorId)
        : [...prev, sponsorId]
    );
  };

  const handleSendRequests = () => {
    if (selectedSponsors.length > 0) {
      setShowRequestModal(true);
    }
  };

  const handleSubmitRequests = () => {
    console.log("Sending requests to sponsors:", selectedSponsors, "Message:", requestMessage);
    // In a real app, this would send the requests
    alert(`Sponsor requests sent successfully to ${selectedSponsors.length} sponsor(s)!`);
    setShowRequestModal(false);
    setRequestMessage("");
    setSelectedSponsors([]);
  };

  const investmentRanges = [
    { label: "Under $5,000", value: "0-5000" },
    { label: "$5,000 - $10,000", value: "5000-10000" },
    { label: "$10,000 - $20,000", value: "10000-20000" },
    { label: "$20,000+", value: "20000-50000" }
  ];

  const allInterests = Array.from(new Set(allSponsors.flatMap(s => s.interests)));

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
                    Discover Sponsors
                  </h1>
                  {currentEvent && (
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Finding sponsors for: <span className="font-medium">{currentEvent.name}</span>
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {selectedSponsors.length > 0 && (
                  <button
                    onClick={handleSendRequests}
                    className="flex items-center gap-2 px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors"
                  >
                    <Send className="h-4 w-4" />
                    Send Requests ({selectedSponsors.length})
                  </button>
                )}
              </div>
            </motion.div>

            {/* Search and Filters */}
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search sponsors by name, contact, or interests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                />
              </div>

              {/* Filters Panel */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Investment Range */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Investment Range
                      </label>
                      <select
                        value={selectedFilters.investmentRange}
                        onChange={(e) => setSelectedFilters(prev => ({ ...prev, investmentRange: e.target.value }))}
                        className="w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white"
                      >
                        <option value="">Any Range</option>
                        {investmentRanges.map(range => (
                          <option key={range.value} value={range.value}>{range.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Minimum Rating
                      </label>
                      <select
                        value={selectedFilters.rating}
                        onChange={(e) => setSelectedFilters(prev => ({ ...prev, rating: e.target.value }))}
                        className="w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white"
                      >
                        <option value="">Any Rating</option>
                        <option value="4.5">4.5+ Stars</option>
                        <option value="4.0">4.0+ Stars</option>
                        <option value="3.5">3.5+ Stars</option>
                        <option value="3.0">3.0+ Stars</option>
                      </select>
                    </div>

                    {/* Experience */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Experience Level
                      </label>
                      <select
                        value={selectedFilters.experience}
                        onChange={(e) => setSelectedFilters(prev => ({ ...prev, experience: e.target.value }))}
                        className="w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white"
                      >
                        <option value="">Any Experience</option>
                        <option value="high">High (4+ events)</option>
                        <option value="medium">Medium (2-3 events)</option>
                        <option value="low">Low (0-1 events)</option>
                      </select>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        placeholder="City, State"
                        value={selectedFilters.location}
                        onChange={(e) => setSelectedFilters(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                      />
                    </div>
                  </div>

                  {/* Interests */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Interests
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {allInterests.map(interest => (
                        <button
                          key={interest}
                          onClick={() => {
                            setSelectedFilters(prev => ({
                              ...prev,
                              interests: prev.interests.includes(interest)
                                ? prev.interests.filter(i => i !== interest)
                                : [...prev.interests, interest]
                            }));
                          }}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            selectedFilters.interests.includes(interest)
                              ? 'bg-[#FF9000] text-white'
                              : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'
                          }`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => setSelectedFilters({
                        investmentRange: "",
                        interests: [],
                        rating: "",
                        experience: "",
                        location: ""
                      })}
                      className="px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sponsors Grid */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredSponsors.map((sponsor) => (
                  <motion.div
                    key={sponsor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                      selectedSponsors.includes(sponsor.id)
                        ? 'border-[#FFA100] bg-[#FAF000]/5 dark:bg-[#FAF000]/20'
                        : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800'
                    }`}
                    onClick={() => handleSponsorSelect(sponsor.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#FAF000] to-[#FFDD00] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {sponsor.logo}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-neutral-900 dark:text-white">
                            {sponsor.name}
                          </h3>
                          <span className="px-2 py-1 bg-[#FAF000]/10 dark:bg-[#FAF000] text-[#FF9000] dark:text-[#FAF000] rounded text-xs">
                            {sponsor.type}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                          {sponsor.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {sponsor.investmentRange}
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
                        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                          <div className="flex items-center gap-1">
                            <Building className="h-4 w-4" />
                            {sponsor.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {sponsor.contactPerson}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {sponsor.interests.slice(0, 3).map((interest) => (
                            <span key={interest} className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded text-xs">
                              {interest}
                            </span>
                          ))}
                          {sponsor.interests.length > 3 && (
                            <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded text-xs">
                              +{sponsor.interests.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {selectedSponsors.includes(sponsor.id) && (
                          <CheckCircle className="h-5 w-5 text-[#FF9000]" />
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle individual sponsor contact
                          }}
                          className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                        >
                          <Mail className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {filteredSponsors.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <Target className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                    No Sponsors Found
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Try adjusting your search terms or filters
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sponsor Request Modal */}
      {showRequestModal && (
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
              <h2 className="text-2xl font-bold text-white">Send Sponsor Requests</h2>
              <button
                onClick={() => setShowRequestModal(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Selected Sponsors ({selectedSponsors.length})</h3>
              <div className="space-y-2">
                {selectedSponsors.map(sponsorId => {
                  const sponsor = allSponsors.find(s => s.id === sponsorId);
                  return sponsor ? (
                    <div key={sponsorId} className="flex items-center gap-3 p-2 bg-neutral-800 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#FAF000] to-[#FFDD00] rounded flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{sponsor.logo}</span>
                      </div>
                      <span className="text-white">{sponsor.name}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Event Information
                </label>
                {currentEvent && (
                  <div className="p-3 bg-neutral-800 rounded-lg">
                    <p className="text-white font-medium">{currentEvent.name}</p>
                    <p className="text-white/60 text-sm">{currentEvent.date} • {currentEvent.location}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Request Message
                </label>
                <textarea
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  placeholder="Write a personalized message to the sponsors..."
                  rows={6}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9000] text-white placeholder-neutral-400 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowRequestModal(false)}
                className="flex-1 px-4 py-3 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitRequests}
                className="flex-1 px-4 py-3 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors"
              >
                Send Requests
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default function SponsorDiscoveryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SponsorDiscoveryContent />
    </Suspense>
  );
}
