"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Edit, 
  MapPin, 
  Calendar, 
  Award, 
  Users, 
  Briefcase, 
  Star, 
  Linkedin, 
  Globe, 
  Mail, 
  Phone,
  Building,
  GraduationCap,
  Target,
  TrendingUp,
  CheckCircle,
  ExternalLink,
  Plus,
  Save,
  X
} from "lucide-react";
import { GlowingCard } from "@/components/ui/glowing-card";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default function RecruiterProfilePage() {
  const userRole = "recruiter";
  const userName = "Alex Thompson";
  const userAvatar = undefined;

  const [showEditModal, setShowEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const recruiterProfile = {
    id: 1,
    name: "Alex Thompson",
    title: "Senior Technical Recruiter",
    company: "TechTalent Solutions",
    location: "San Francisco, CA",
    email: "alex.thompson@techtalent.com",
    phone: "+1 (555) 123-4567",
    bio: "Experienced technical recruiter with 8+ years of expertise in sourcing and placing top-tier software engineers, data scientists, and product managers. Passionate about connecting exceptional talent with innovative companies and building long-term relationships in the tech industry.",
    experience: "8+ years",
    joinDate: "2024-01-15",
    avatar: "AT",
    specialties: [
      "Software Engineering",
      "Data Science & ML",
      "Product Management",
      "DevOps & Cloud",
      "UX/UI Design",
      "Technical Leadership"
    ],
    achievements: [
      {
        title: "Top Performer 2023",
        description: "Exceeded hiring targets by 150%",
        year: "2023"
      },
      {
        title: "Client Satisfaction Award",
        description: "98% client satisfaction rating",
        year: "2023"
      },
      {
        title: "Rapid Placement Specialist",
        description: "Average 15-day placement time",
        year: "2022"
      }
    ],
    stats: {
      totalPlacements: 247,
      activeClients: 23,
      successRate: 94,
      averageTimeToHire: 18,
      candidatePool: 1250
    },
    socialLinks: {
      linkedin: "https://linkedin.com/in/alexthompson",
      indeed: "https://indeed.com/profile/alexthompson",
      glassdoor: "https://glassdoor.com/profile/alexthompson",
      angelList: "https://angel.co/alexthompson",
      wellfound: "https://wellfound.com/alexthompson",
      personalWebsite: "https://alexthompson.recruiter.com"
    },
    education: [
      {
        degree: "MBA in Human Resources",
        school: "Stanford Graduate School of Business",
        year: "2016"
      },
      {
        degree: "Bachelor of Psychology",
        school: "UC Berkeley",
        year: "2014"
      }
    ],
    certifications: [
      "Certified Professional Recruiter (CPR)",
      "SHRM-CP (Society for Human Resource Management)",
      "LinkedIn Recruiter Certification",
      "Technical Recruiting Specialist"
    ],
    recentPlacements: [
      {
        candidate: "Sarah Chen",
        role: "Senior Frontend Developer",
        company: "TechCorp",
        placedDate: "2024-01-10",
        salary: "$145,000"
      },
      {
        candidate: "Marcus Johnson",
        role: "ML Engineer",
        company: "DataFlow Inc",
        placedDate: "2024-01-05",
        salary: "$165,000"
      },
      {
        candidate: "Emily Rodriguez",
        role: "Product Manager",
        company: "InnovateLab",
        placedDate: "2023-12-28",
        salary: "$135,000"
      }
    ]
  };

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleSaveProfile = () => {
    // In a real app, this would save to backend
    setShowEditModal(false);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50/30 to-blue-50/20 dark:from-neutral-900 dark:via-blue-900/20 dark:to-blue-900/10">
      <div className="flex flex-col md:flex-row bg-white dark:bg-neutral-900 w-full h-screen border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <DashboardSidebar userRole={userRole} userName={userName} userAvatar={userAvatar} />
        
        <div className="w-px bg-neutral-200 dark:bg-neutral-700"></div>
        
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
                      Profile
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Manage your recruiter profile and showcase your expertise
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleEditProfile}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Profile Info */}
              <div className="lg:col-span-1 space-y-6">
                {/* Profile Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <GlowingCard
                    icon={
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                        {recruiterProfile.avatar}
                      </div>
                    }
                    title={recruiterProfile.name}
                    description={recruiterProfile.title}
                    className="text-center"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <Building className="h-4 w-4" />
                        {recruiterProfile.company}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <MapPin className="h-4 w-4" />
                        {recruiterProfile.location}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <Calendar className="h-4 w-4" />
                        {recruiterProfile.experience} experience
                      </div>
                      
                      {/* Bio */}
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center leading-relaxed">
                        {recruiterProfile.bio}
                      </p>

                      {/* Contact Info */}
                      <div className="space-y-2 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <Mail className="h-4 w-4" />
                          {recruiterProfile.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <Phone className="h-4 w-4" />
                          {recruiterProfile.phone}
                        </div>
                      </div>
                    </div>
                  </GlowingCard>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <GlowingCard
                    icon={<Globe className="h-5 w-5" />}
                    title="Professional Links"
                    description="Connect on job platforms"
                  >
                    <div className="space-y-3">
                      <a
                        href={recruiterProfile.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
                      >
                        <Linkedin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-blue-800 dark:text-blue-200">LinkedIn</span>
                        <ExternalLink className="h-3 w-3 text-blue-600 dark:text-blue-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                      
                      <a
                        href={recruiterProfile.socialLinks.indeed}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
                      >
                        <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Indeed</span>
                        <ExternalLink className="h-3 w-3 text-blue-600 dark:text-blue-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                      
                      <a
                        href={recruiterProfile.socialLinks.glassdoor}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
                      >
                        <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Glassdoor</span>
                        <ExternalLink className="h-3 w-3 text-blue-600 dark:text-blue-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                      
                      <a
                        href={recruiterProfile.socialLinks.angelList}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
                      >
                        <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-blue-800 dark:text-blue-200">AngelList</span>
                        <ExternalLink className="h-3 w-3 text-blue-600 dark:text-blue-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                      
                      <a
                        href={recruiterProfile.socialLinks.wellfound}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
                      >
                        <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Wellfound</span>
                        <ExternalLink className="h-3 w-3 text-blue-600 dark:text-blue-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                      
                      <a
                        href={recruiterProfile.socialLinks.personalWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
                      >
                        <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Personal Website</span>
                        <ExternalLink className="h-3 w-3 text-blue-600 dark:text-blue-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </div>
                  </GlowingCard>
                </motion.div>
              </div>

              {/* Right Column - Stats & Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Stats Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="grid grid-cols-2 md:grid-cols-5 gap-4"
                >
                  <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {recruiterProfile.stats.totalPlacements}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      Total Placements
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {recruiterProfile.stats.activeClients}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      Active Clients
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {recruiterProfile.stats.successRate}%
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      Success Rate
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {recruiterProfile.stats.averageTimeToHire}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      Days to Hire
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {recruiterProfile.stats.candidatePool}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      Candidate Pool
                    </div>
                  </div>
                </motion.div>

                {/* Specialties */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <GlowingCard
                    icon={<Target className="h-5 w-5" />}
                    title="Specialties"
                    description="Areas of expertise"
                  >
                    <div className="flex flex-wrap gap-2">
                      {recruiterProfile.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </GlowingCard>
                </motion.div>

                {/* Achievements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <GlowingCard
                    icon={<Award className="h-5 w-5" />}
                    title="Achievements"
                    description="Recognition and awards"
                  >
                    <div className="space-y-4">
                      {recruiterProfile.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <Award className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <h4 className="font-medium text-blue-900 dark:text-blue-100">
                              {achievement.title}
                            </h4>
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                              {achievement.description}
                            </p>
                            <span className="text-xs text-blue-600 dark:text-blue-400">
                              {achievement.year}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlowingCard>
                </motion.div>

                {/* Recent Placements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <GlowingCard
                    icon={<Users className="h-5 w-5" />}
                    title="Recent Placements"
                    description="Latest successful hires"
                  >
                    <div className="space-y-3">
                      {recruiterProfile.recentPlacements.map((placement, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-blue-900 dark:text-blue-100">
                              {placement.candidate}
                            </h4>
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                              {placement.role} at {placement.company}
                            </p>
                            <p className="text-xs text-blue-600 dark:text-blue-400">
                              Placed on {placement.placedDate}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-blue-900 dark:text-blue-100">
                              {placement.salary}
                            </div>
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mx-auto mt-1" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlowingCard>
                </motion.div>

                {/* Education & Certifications */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <GlowingCard
                    icon={<GraduationCap className="h-5 w-5" />}
                    title="Education & Certifications"
                    description="Academic background and credentials"
                  >
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-neutral-900 dark:text-white mb-2">Education</h4>
                        <div className="space-y-2">
                          {recruiterProfile.education.map((edu, index) => (
                            <div key={index} className="flex items-center gap-3 p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                              <GraduationCap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              <div className="flex-1">
                                <div className="font-medium text-neutral-900 dark:text-white text-sm">
                                  {edu.degree}
                                </div>
                                <div className="text-xs text-neutral-600 dark:text-neutral-400">
                                  {edu.school} • {edu.year}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-neutral-900 dark:text-white mb-2">Certifications</h4>
                        <div className="space-y-2">
                          {recruiterProfile.certifications.map((cert, index) => (
                            <div key={index} className="flex items-center gap-3 p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                              <span className="text-sm text-neutral-900 dark:text-white">
                                {cert}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </GlowingCard>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Edit Profile</h3>
              <button onClick={() => setShowEditModal(false)} className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-white">✕</button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Full Name</label>
                  <input type="text" defaultValue={recruiterProfile.name} className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Job Title</label>
                  <input type="text" defaultValue={recruiterProfile.title} className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Company</label>
                  <input type="text" defaultValue={recruiterProfile.company} className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Location</label>
                  <input type="text" defaultValue={recruiterProfile.location} className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Email</label>
                  <input type="email" defaultValue={recruiterProfile.email} className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Phone</label>
                  <input type="tel" defaultValue={recruiterProfile.phone} className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Bio</label>
                <textarea rows={4} defaultValue={recruiterProfile.bio} className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">LinkedIn URL</label>
                <input type="url" defaultValue={recruiterProfile.socialLinks.linkedin} className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Personal Website</label>
                <input type="url" defaultValue={recruiterProfile.socialLinks.personalWebsite} className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800">Cancel</button>
              <button onClick={handleSaveProfile} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
