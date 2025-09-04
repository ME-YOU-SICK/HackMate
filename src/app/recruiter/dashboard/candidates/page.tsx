"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Star, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye,
  ChevronDown,
  Briefcase,
  GraduationCap,
  Award
} from "lucide-react";
import Link from "next/link";
import { GlowingCard } from "@/components/ui/glowing-card";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default function RecruiterCandidatesPage() {
  const userRole = "recruiter";
  const userName = "Alex Thompson";
  const userAvatar = undefined;

  const [selectedJob, setSelectedJob] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const jobPostings = [
    {
      id: "frontend-dev",
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      applicants: 24,
      status: "active"
    },
    {
      id: "ml-engineer",
      title: "Machine Learning Engineer",
      company: "DataFlow Inc",
      location: "Remote",
      applicants: 18,
      status: "active"
    },
    {
      id: "product-manager",
      title: "Product Manager",
      company: "InnovateLab",
      location: "New York, NY",
      applicants: 32,
      status: "active"
    },
    {
      id: "ux-designer",
      title: "UX Designer",
      company: "DesignStudio",
      location: "Austin, TX",
      applicants: 15,
      status: "closed"
    }
  ];

  const candidates = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior Frontend Developer",
      location: "San Francisco, CA",
      experience: "5 years",
      rating: 4.8,
      status: "pending",
      appliedDate: "2024-01-15",
      jobId: "frontend-dev",
      skills: [
        { name: "React", icon: "⚛️" },
        { name: "TypeScript", icon: "📘" },
        { name: "Node.js", icon: "🟢" },
        { name: "AWS", icon: "☁️" }
      ],
      education: "BS Computer Science, Stanford University",
      portfolio: "sarahchen.dev",
      coverLetter: "I'm excited about the opportunity to join TechCorp as a Senior Frontend Developer. With 5 years of experience in React and TypeScript, I've led multiple projects that improved user engagement by 40%...",
      availability: "Available in 2 weeks"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      title: "Machine Learning Engineer",
      location: "Seattle, WA",
      experience: "4 years",
      rating: 4.9,
      status: "accepted",
      appliedDate: "2024-01-14",
      jobId: "ml-engineer",
      skills: [
        { name: "Python", icon: "🐍" },
        { name: "TensorFlow", icon: "🧠" },
        { name: "PyTorch", icon: "🔥" },
        { name: "Docker", icon: "🐳" }
      ],
      education: "MS Data Science, MIT",
      portfolio: "marcusml.ai",
      coverLetter: "As a passionate ML engineer with expertise in deep learning and computer vision, I'm eager to contribute to DataFlow's innovative projects. I've developed models that reduced processing time by 60%...",
      availability: "Available immediately"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "Product Manager",
      location: "New York, NY",
      experience: "6 years",
      rating: 4.7,
      status: "pending",
      appliedDate: "2024-01-16",
      jobId: "product-manager",
      skills: [
        { name: "Product Strategy", icon: "🎯" },
        { name: "Analytics", icon: "📊" },
        { name: "User Research", icon: "🔍" },
        { name: "Agile", icon: "🏃" }
      ],
      education: "MBA, Wharton School",
      portfolio: "emilyproduct.com",
      coverLetter: "With 6 years of product management experience and a track record of launching successful features, I'm excited to drive innovation at InnovateLab. I've led cross-functional teams to deliver products that generated $2M+ in revenue...",
      availability: "Available in 1 month"
    },
    {
      id: 4,
      name: "David Kim",
      title: "Frontend Developer",
      location: "Los Angeles, CA",
      experience: "3 years",
      rating: 4.5,
      status: "declined",
      appliedDate: "2024-01-13",
      jobId: "frontend-dev",
      skills: [
        { name: "Vue.js", icon: "💚" },
        { name: "JavaScript", icon: "📜" },
        { name: "CSS", icon: "🎨" },
        { name: "GraphQL", icon: "🔗" }
      ],
      education: "BS Software Engineering, UCLA",
      portfolio: "davidkim.dev",
      coverLetter: "I'm a passionate frontend developer with 3 years of experience building responsive web applications. I'm particularly interested in TechCorp's focus on user experience and modern web technologies...",
      availability: "Available in 3 weeks"
    },
    {
      id: 5,
      name: "Lisa Wang",
      title: "UX Designer",
      location: "Austin, TX",
      experience: "4 years",
      rating: 4.6,
      status: "pending",
      appliedDate: "2024-01-17",
      jobId: "ux-designer",
      skills: [
        { name: "Figma", icon: "🎨" },
        { name: "User Research", icon: "🔍" },
        { name: "Prototyping", icon: "📱" },
        { name: "Accessibility", icon: "♿" }
      ],
      education: "BFA Design, Art Center College",
      portfolio: "lisawang.design",
      coverLetter: "As a UX designer with a passion for creating inclusive and accessible digital experiences, I'm excited about the opportunity to join DesignStudio. I've designed interfaces that improved user satisfaction by 35%...",
      availability: "Available in 2 weeks"
    },
    {
      id: 6,
      name: "Alex Thompson",
      title: "Data Scientist",
      location: "Boston, MA",
      experience: "5 years",
      rating: 4.8,
      status: "accepted",
      appliedDate: "2024-01-12",
      jobId: "ml-engineer",
      skills: [
        { name: "R", icon: "📈" },
        { name: "SQL", icon: "🗄️" },
        { name: "Scikit-learn", icon: "🤖" },
        { name: "Tableau", icon: "📊" }
      ],
      education: "PhD Statistics, Harvard University",
      portfolio: "alexdata.science",
      coverLetter: "With a PhD in Statistics and 5 years of industry experience, I'm excited to bring my expertise in statistical modeling and data visualization to DataFlow. I've developed predictive models that improved business outcomes by 25%...",
      availability: "Available immediately"
    }
  ];

  const filteredCandidates = candidates.filter(candidate => {
    const matchesJob = selectedJob === "all" || candidate.jobId === selectedJob;
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.skills.some(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || candidate.status === statusFilter;
    
    return matchesJob && matchesSearch && matchesStatus;
  });

  const handleAccept = (candidateId: number) => {
    // In a real app, this would update the backend
    console.log(`Accepted candidate ${candidateId}`);
    // Update local state for demo
    const updatedCandidates = candidates.map(candidate => 
      candidate.id === candidateId ? { ...candidate, status: "accepted" } : candidate
    );
    // You would typically update state here
  };

  const handleDecline = (candidateId: number) => {
    // In a real app, this would update the backend
    console.log(`Declined candidate ${candidateId}`);
    // Update local state for demo
    const updatedCandidates = candidates.map(candidate => 
      candidate.id === candidateId ? { ...candidate, status: "declined" } : candidate
    );
    // You would typically update state here
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20";
      case "declined": return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20";
      case "pending": return "text-[#FF9000] dark:text-[#FAF000] bg-[#FAF000]/10 dark:bg-[#FAF000]/20";
      default: return "text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted": return <CheckCircle className="h-4 w-4" />;
      case "declined": return <XCircle className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-[#FAF000]/30 to-[#FAF000]/5/20 dark:from-neutral-900 dark:via-[#FF9000]/20 dark:to-[#FF9000]/10">
      <div className="flex flex-col md:flex-row bg-white dark:bg-neutral-900 w-full h-screen border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <DashboardSidebar userRole={userRole} userName={userName} userAvatar={userAvatar} />
        
        <div className="w-px bg-neutral-200 dark:bg-neutral-700"></div>
        
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 rounded-lg">
                  <Users className="h-6 w-6 text-[#FF9000] dark:text-[#FAF000]" />
                </div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
                  Job Candidates
                </h1>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400">
                Review and manage candidates who have applied for your job postings
              </p>
            </motion.div>

            {/* Job Selection & Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Job Selection */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Job Posting
                    </label>
                    <select
                      value={selectedJob}
                      onChange={(e) => setSelectedJob(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white"
                    >
                      <option value="all">All Job Postings</option>
                      {jobPostings.map((job) => (
                        <option key={job.id} value={job.id}>
                          {job.title} - {job.company} ({job.applicants} applicants)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Search */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Search Candidates
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                      <input
                        type="text"
                        placeholder="Search by name, title, or skills..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Status
                    </label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="declined">Declined</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
            >
              <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 rounded-lg">
                    <Users className="h-5 w-5 text-[#FF9000] dark:text-[#FAF000]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {filteredCandidates.length}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      Total Candidates
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 rounded-lg">
                    <Clock className="h-5 w-5 text-[#FF9000] dark:text-[#FAF000]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {filteredCandidates.filter(c => c.status === "pending").length}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      Pending Review
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {filteredCandidates.filter(c => c.status === "accepted").length}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      Accepted
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {filteredCandidates.filter(c => c.status === "declined").length}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      Declined
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Candidates Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCandidates.map((candidate, index) => (
                  <motion.div
                    key={candidate.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <GlowingCard
                      icon={
                        <div className="w-12 h-12 bg-gradient-to-br from-[#FAF000] to-[#FF9000] rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      }
                      title={candidate.name}
                      description={candidate.title}
                      className="h-full"
                    >
                      <div className="space-y-4">
                        {/* Status & Applied Date */}
                        <div className="flex items-center justify-between">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(candidate.status)}`}>
                            {getStatusIcon(candidate.status)}
                            {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                          </span>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            Applied {candidate.appliedDate}
                          </span>
                        </div>

                        {/* Location & Experience */}
                        <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {candidate.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {candidate.experience}
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-[#FFA100] fill-current" />
                            <span className="text-sm font-medium text-neutral-900 dark:text-white">
                              {candidate.rating}
                            </span>
                          </div>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            ({candidate.experience} experience)
                          </span>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2">
                          {candidate.skills.slice(0, 3).map((skill, sIdx) => (
                            <span key={sIdx} className="px-3 py-1 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 text-[#FF9000] dark:text-[#FAF000] text-xs rounded-full font-medium flex items-center gap-1">
                              {skill.icon} {skill.name}
                            </span>
                          ))}
                          {candidate.skills.length > 3 && (
                            <span className="px-3 py-1 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 text-[#FF9000] dark:text-[#FAF000] text-xs rounded-full font-medium">
                              +{candidate.skills.length - 3} more
                            </span>
                          )}
                        </div>

                        {/* Education */}
                        <div className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <GraduationCap className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-2">{candidate.education}</span>
                        </div>

                        {/* Availability */}
                        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <Calendar className="h-4 w-4" />
                          <span>{candidate.availability}</span>
                        </div>

                        {/* Cover Letter Preview */}
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                          <p className="line-clamp-3 italic">
                            "{candidate.coverLetter.substring(0, 120)}..."
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          <Link 
                            href={`/recruiter/dashboard/connections/${candidate.id}`}
                            className="flex-1 px-3 py-2 text-sm text-[#FF9000] hover:text-[#FFA100] dark:text-[#FAF000] dark:hover:text-[#FFDD00] border border-[#FF9000] dark:border-[#FAF000] rounded-lg text-center transition-colors"
                          >
                            <Eye className="h-4 w-4 inline mr-1" />
                            View Profile
                          </Link>
                          
                          {candidate.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleAccept(candidate.id)}
                                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                              >
                                <CheckCircle className="h-4 w-4 inline mr-1" />
                                Accept
                              </button>
                              <button
                                onClick={() => handleDecline(candidate.id)}
                                className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                              >
                                <XCircle className="h-4 w-4 inline mr-1" />
                                Decline
                              </button>
                            </>
                          )}
                          
                          {candidate.status === "accepted" && (
                            <div className="flex-1 px-3 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-lg text-center text-sm font-medium">
                              <CheckCircle className="h-4 w-4 inline mr-1" />
                              Accepted
                            </div>
                          )}
                          
                          {candidate.status === "declined" && (
                            <div className="flex-1 px-3 py-2 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-lg text-center text-sm font-medium">
                              <XCircle className="h-4 w-4 inline mr-1" />
                              Declined
                            </div>
                          )}
                        </div>
                      </div>
                    </GlowingCard>
                  </motion.div>
                ))}
              </div>

              {filteredCandidates.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
                    No candidates found
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Try adjusting your search criteria or job posting selection.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
