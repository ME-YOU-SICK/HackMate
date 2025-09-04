"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Award, 
  Users, 
  Target, 
  Edit3, 
  Save, 
  X, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram,
  ExternalLink,
  CheckCircle,
  Star,
  Briefcase,
  Heart
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";

const SponsorProfile = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);

  // Mock sponsor profile data
  const [profileData, setProfileData] = useState({
    company: {
      name: "TechCorp Ventures",
      industry: "Technology & Innovation",
      size: "500-1000 employees",
      founded: "2015",
      headquarters: "San Francisco, CA",
      website: "techcorp.com",
      description: "A leading technology venture capital firm focused on early-stage startups in AI, fintech, and sustainable technology. We believe in supporting innovation through strategic partnerships and community engagement."
    },
    contact: {
      primaryContact: "Jennifer Martinez",
      title: "Partnerships Director",
      email: "partnerships@techcorp.com",
      phone: "+1 (555) 123-4567",
      linkedin: "linkedin.com/company/techcorp-ventures",
      twitter: "@techcorpventures"
    },
    sponsorship: {
      totalInvested: 485000,
      eventsSponsored: 23,
      averageInvestment: 21000,
      successRate: 89,
      preferredEventTypes: ["Corporate", "Accelerator", "University"],
      focusAreas: ["AI/ML", "Fintech", "Sustainability", "EdTech"]
    },
    social: {
      linkedin: "https://linkedin.com/company/techcorp-ventures",
      twitter: "https://twitter.com/techcorpventures",
      facebook: "https://facebook.com/techcorpventures",
      instagram: "https://instagram.com/techcorpventures"
    }
  });

  const recentSponsorships = [
    {
      id: 1,
      event: "TechCrunch Disrupt 2024",
      organizer: "TechCrunch",
      amount: 25000,
      date: "2024-09-15",
      status: "completed",
      outcome: "Successful partnership, 3 startup investments"
    },
    {
      id: 2,
      event: "AI Innovation Summit",
      organizer: "AI Foundation",
      amount: 15000,
      date: "2024-08-20",
      status: "active",
      outcome: "Ongoing collaboration"
    },
    {
      id: 3,
      event: "MIT Hackathon 2024",
      organizer: "MIT Innovation Lab",
      amount: 20000,
      date: "2024-05-20",
      status: "completed",
      outcome: "2 student teams funded"
    },
    {
      id: 4,
      event: "Climate Hack Challenge",
      organizer: "GreenTech Labs",
      amount: 12000,
      date: "2024-07-10",
      status: "completed",
      outcome: "Environmental impact project launched"
    }
  ];

  const achievements = [
    {
      title: "Top Sponsor 2024",
      description: "Recognized as leading sponsor in tech events",
      icon: <Award className="h-5 w-5" />,
      date: "2024"
    },
    {
      title: "Innovation Partner",
      description: "Partnered with 15+ successful startups",
      icon: <TrendingUp className="h-5 w-5" />,
      date: "2023-2024"
    },
    {
      title: "Community Impact",
      description: "Supported 500+ students and developers",
      icon: <Heart className="h-5 w-5" />,
      date: "2023-2024"
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20";
      case "active": return "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20";
      default: return "text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800";
    }
  };

  const handleEdit = (field: string) => {
    setEditingField(field);
    setShowEditModal(true);
  };

  const handleSave = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
    setEditingField(null);
    setShowEditModal(false);
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
                <User className="h-6 w-6 text-blue-600" />
                Company Profile
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                Manage your company information and sponsorship preferences
              </p>
            </div>
            <button
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit3 className="h-4 w-4" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Company Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <GlowingCard
                  icon={<Building2 className="h-5 w-5" />}
                  title="Company Information"
                  description="Basic company details and description"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                          {profileData.company.name}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400">
                          {profileData.company.industry}
                        </p>
                      </div>
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {profileData.company.name.charAt(0)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-neutral-500" />
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">
                          {profileData.company.size}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-neutral-500" />
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">
                          Founded {profileData.company.founded}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-neutral-500" />
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">
                          {profileData.company.headquarters}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-neutral-500" />
                        <a 
                          href={`https://${profileData.company.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {profileData.company.website}
                        </a>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {profileData.company.description}
                      </p>
                    </div>
                  </div>
                </GlowingCard>
              </div>

              <div>
                <GlowingCard
                  icon={<DollarSign className="h-5 w-5" />}
                  title="Sponsorship Stats"
                  description="Your sponsorship performance"
                >
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                        {formatCurrency(profileData.sponsorship.totalInvested)}
                      </div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">
                        Total Invested
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-semibold text-neutral-900 dark:text-white">
                          {profileData.sponsorship.eventsSponsored}
                        </div>
                        <div className="text-xs text-neutral-600 dark:text-neutral-400">
                          Events Sponsored
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-neutral-900 dark:text-white">
                          {profileData.sponsorship.successRate}%
                        </div>
                        <div className="text-xs text-neutral-600 dark:text-neutral-400">
                          Success Rate
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-lg font-semibold text-neutral-900 dark:text-white">
                        {formatCurrency(profileData.sponsorship.averageInvestment)}
                      </div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400">
                        Average Investment
                      </div>
                    </div>
                  </div>
                </GlowingCard>
              </div>
            </div>

            {/* Contact Information */}
            <GlowingCard
              icon={<Mail className="h-5 w-5" />}
              title="Contact Information"
              description="Primary contact details for partnerships"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                      Primary Contact
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-neutral-500" />
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">
                          {profileData.contact.primaryContact}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-neutral-500" />
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">
                          {profileData.contact.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-neutral-500" />
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">
                          {profileData.contact.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-neutral-500" />
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">
                          {profileData.contact.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                      Social Links
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4 text-blue-600" />
                        <a 
                          href={profileData.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          LinkedIn Profile
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Twitter className="h-4 w-4 text-blue-400" />
                        <a 
                          href={profileData.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Twitter Profile
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Facebook className="h-4 w-4 text-blue-600" />
                        <a 
                          href={profileData.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Facebook Page
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Instagram className="h-4 w-4 text-pink-600" />
                        <a 
                          href={profileData.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Instagram Profile
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlowingCard>

            {/* Sponsorship Preferences */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GlowingCard
                icon={<Target className="h-5 w-5" />}
                title="Preferred Event Types"
                description="Types of events you typically sponsor"
              >
                <div className="flex flex-wrap gap-2">
                  {profileData.sponsorship.preferredEventTypes.map((type, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </GlowingCard>

              <GlowingCard
                icon={<TrendingUp className="h-5 w-5" />}
                title="Focus Areas"
                description="Technology areas you're most interested in"
              >
                <div className="flex flex-wrap gap-2">
                  {profileData.sponsorship.focusAreas.map((area, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 text-sm rounded-full"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </GlowingCard>
            </div>

            {/* Recent Sponsorships */}
            <GlowingCard
              icon={<Calendar className="h-5 w-5" />}
              title="Recent Sponsorships"
              description="Your latest sponsorship activities"
            >
              <div className="space-y-4">
                {recentSponsorships.map((sponsorship) => (
                  <div key={sponsorship.id} className="p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-neutral-900 dark:text-white">
                          {sponsorship.event}
                        </h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          by {sponsorship.organizer}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                          {sponsorship.outcome}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                          {formatCurrency(sponsorship.amount)}
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-500">
                          {new Date(sponsorship.date).toLocaleDateString()}
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(sponsorship.status)}`}>
                          {sponsorship.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlowingCard>

            {/* Achievements */}
            <GlowingCard
              icon={<Award className="h-5 w-5" />}
              title="Achievements & Recognition"
              description="Your sponsorship milestones and awards"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg text-center">
                    <div className="flex justify-center mb-2">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                        {achievement.icon}
                      </div>
                    </div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                      {achievement.description}
                    </p>
                    <div className="text-xs text-neutral-500 dark:text-neutral-500">
                      {achievement.date}
                    </div>
                  </div>
                ))}
              </div>
            </GlowingCard>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                Edit Profile
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              Profile editing functionality would be implemented here with form fields for company information, contact details, and sponsorship preferences.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowEditModal(false)}
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

export default SponsorProfile;
