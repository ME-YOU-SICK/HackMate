"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Users, 
  MapPin, 
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  MoreVertical,
  EyeOff,
  Share
} from "lucide-react";
import Link from "next/link";
import { GlowingCard } from "@/components/ui/glowing-card";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default function RecruiterPostingsPage() {
  const userRole = "recruiter";
  const userName = "Alex Thompson";
  const userAvatar = undefined;

  const jobPostings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120,000 - $160,000",
      status: "active",
      applicants: 24,
      postedDate: "2024-01-15",
      description: "We're looking for a Senior Frontend Developer to join our growing team. You'll work on cutting-edge web applications using React, TypeScript, and modern development practices.",
      requirements: [
        "5+ years of frontend development experience",
        "Strong proficiency in React and TypeScript",
        "Experience with modern build tools and CI/CD",
        "Excellent communication and collaboration skills"
      ],
      benefits: [
        "Competitive salary and equity",
        "Health, dental, and vision insurance",
        "Flexible work arrangements",
        "Professional development budget"
      ]
    },
    {
      id: 2,
      title: "Machine Learning Engineer",
      company: "DataFlow Inc",
      location: "Remote",
      type: "Full-time",
      salary: "$130,000 - $180,000",
      status: "active",
      applicants: 18,
      postedDate: "2024-01-14",
      description: "Join our ML team to build and deploy machine learning models that power our data-driven products. Work with cutting-edge AI technologies and large-scale data systems.",
      requirements: [
        "4+ years of ML engineering experience",
        "Strong background in Python, TensorFlow, PyTorch",
        "Experience with cloud platforms (AWS, GCP, Azure)",
        "PhD or MS in Computer Science, Statistics, or related field"
      ],
      benefits: [
        "Remote-first culture",
        "Top-tier compensation package",
        "Learning and conference budget",
        "Stock options"
      ]
    },
    {
      id: 3,
      title: "Product Manager",
      company: "InnovateLab",
      location: "New York, NY",
      type: "Full-time",
      salary: "$110,000 - $150,000",
      status: "active",
      applicants: 32,
      postedDate: "2024-01-16",
      description: "Lead product strategy and execution for our flagship products. Work closely with engineering, design, and business teams to deliver exceptional user experiences.",
      requirements: [
        "6+ years of product management experience",
        "Strong analytical and problem-solving skills",
        "Experience with agile development methodologies",
        "MBA or equivalent business experience preferred"
      ],
      benefits: [
        "Comprehensive health benefits",
        "401(k) with company matching",
        "Unlimited PTO",
        "Commuter benefits"
      ]
    },
    {
      id: 4,
      title: "UX Designer",
      company: "DesignStudio",
      location: "Austin, TX",
      type: "Contract",
      salary: "$80 - $120/hour",
      status: "closed",
      applicants: 15,
      postedDate: "2024-01-10",
      description: "Design intuitive and accessible user experiences for our client projects. Work with cross-functional teams to create beautiful, functional interfaces.",
      requirements: [
        "4+ years of UX design experience",
        "Proficiency in Figma, Sketch, or Adobe Creative Suite",
        "Strong portfolio demonstrating user-centered design",
        "Experience with user research and testing"
      ],
      benefits: [
        "Flexible contract terms",
        "Remote work options",
        "Creative freedom",
        "Competitive hourly rates"
      ]
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "CloudScale",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$125,000 - $170,000",
      status: "draft",
      applicants: 0,
      postedDate: "2024-01-18",
      description: "Build and maintain our cloud infrastructure and deployment pipelines. Ensure high availability and scalability of our systems.",
      requirements: [
        "5+ years of DevOps/SRE experience",
        "Expertise in AWS, Docker, Kubernetes",
        "Strong scripting skills (Python, Bash)",
        "Experience with monitoring and alerting systems"
      ],
      benefits: [
        "Stock options",
        "Health and wellness benefits",
        "Professional development",
        "Flexible schedule"
      ]
    }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPosting, setEditingPosting] = useState(null);
  const [postings, setPostings] = useState(jobPostings);

  const filteredPostings = postings.filter(posting => {
    const matchesSearch = posting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         posting.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         posting.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || posting.status === statusFilter;
    const matchesType = typeFilter === "all" || posting.type.toLowerCase().includes(typeFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleEdit = (posting) => {
    setEditingPosting(posting);
    setShowEditModal(true);
  };

  const handleDelete = (postingId) => {
    if (confirm("Are you sure you want to delete this job posting? This action cannot be undone.")) {
      setPostings(postings.filter(p => p.id !== postingId));
    }
  };

  const handleToggleVisibility = (postingId) => {
    setPostings(postings.map(p => 
      p.id === postingId 
        ? { ...p, status: p.status === "active" ? "closed" : "active" }
        : p
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20";
      case "closed": return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20";
      case "draft": return "text-neutral-600 dark:text-neutral-400 bg-[#FAF000]/10 dark:bg-[#FAF000]/20";
      default: return "text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4" />;
      case "closed": return <XCircle className="h-4 w-4" />;
      case "draft": return <Edit className="h-4 w-4" />;
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 rounded-lg">
                    <Briefcase className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
                      Job Postings
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Create and manage your job postings
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Create Job Posting
                </button>
              </div>
            </motion.div>

            {/* Search & Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Search Job Postings
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                      <input
                        type="text"
                        placeholder="Search by title, company, or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-[#FF9000] focus:border-[#FFA100] text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
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
                      className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-[#FF9000] focus:border-[#FFA100] text-neutral-900 dark:text-white"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="closed">Closed</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>

                  {/* Type Filter */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Job Type
                    </label>
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-[#FF9000] focus:border-[#FFA100] text-neutral-900 dark:text-white"
                    >
                      <option value="all">All Types</option>
                      <option value="full-time">Full-time</option>
                      <option value="contract">Contract</option>
                      <option value="part-time">Part-time</option>
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
                    <Briefcase className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {filteredPostings.length}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      Total Postings
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
                      {filteredPostings.filter(p => p.status === "active").length}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      Active
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 rounded-lg">
                    <Edit className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {filteredPostings.filter(p => p.status === "draft").length}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      Drafts
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 rounded-lg">
                    <Users className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {filteredPostings.reduce((sum, p) => sum + p.applicants, 0)}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      Total Applicants
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Job Postings Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPostings.map((posting, index) => (
                  <motion.div
                    key={posting.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <GlowingCard
                      icon={
                        <div className="w-12 h-12 bg-gradient-to-br from-[#FAF000] to-[#FF9000] rounded-lg flex items-center justify-center text-white font-bold text-lg">
                          {posting.company.charAt(0)}
                        </div>
                      }
                      title={posting.title}
                      description={posting.company}
                      className="h-full"
                    >
                      <div className="space-y-4">
                        {/* Status & Posted Date */}
                        <div className="flex items-center justify-between">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(posting.status)}`}>
                            {getStatusIcon(posting.status)}
                            {posting.status.charAt(0).toUpperCase() + posting.status.slice(1)}
                          </span>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            Posted {posting.postedDate}
                          </span>
                        </div>

                        {/* Location & Type */}
                        <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {posting.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {posting.type}
                          </div>
                        </div>

                        {/* Salary */}
                        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-medium">{posting.salary}</span>
                        </div>

                        {/* Applicants */}
                        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <Users className="h-4 w-4" />
                          <span>{posting.applicants} applicants</span>
                        </div>

                        {/* Description Preview */}
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                          <p className="line-clamp-3">
                            {posting.description}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          <Link 
                            href="/recruiter/dashboard/candidates"
                            className="flex-1 px-3 py-2 text-sm text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 border border-[#FF9000] dark:border-[#FAF000] rounded-lg text-center transition-colors"
                          >
                            <Users className="h-4 w-4 inline mr-1" />
                            View Applicants
                          </Link>
                          
                          <button 
                            onClick={() => handleEdit(posting)}
                            className="px-3 py-2 text-sm text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 border border-[#FF9000] dark:border-[#FAF000] rounded-lg transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          
                          <button 
                            onClick={() => handleToggleVisibility(posting.id)}
                            className="px-3 py-2 text-sm text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 border border-[#FF9000] dark:border-[#FAF000] rounded-lg transition-colors"
                            title={posting.status === "active" ? "Hide posting" : "Show posting"}
                          >
                            {posting.status === "active" ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                          
                          <button 
                            onClick={() => handleDelete(posting.id)}
                            className="px-3 py-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 border border-red-600 dark:border-red-400 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </GlowingCard>
                  </motion.div>
                ))}
              </div>

              {filteredPostings.length === 0 && (
                <div className="text-center py-12">
                  <Briefcase className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
                    No job postings found
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    Try adjusting your search criteria or create a new job posting.
                  </p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors"
                  >
                    Create Your First Job Posting
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Create Job Posting Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Create Job Posting</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-white">✕</button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Job Title</label>
                  <input type="text" className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white" placeholder="e.g. Senior Frontend Developer" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Company</label>
                  <input type="text" className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white" placeholder="e.g. TechCorp" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Location</label>
                  <input type="text" className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white" placeholder="e.g. San Francisco, CA" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Job Type</label>
                  <select className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white">
                    <option>Full-time</option>
                    <option>Contract</option>
                    <option>Part-time</option>
                    <option>Internship</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Salary Range</label>
                <input type="text" className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white" placeholder="e.g. $120,000 - $160,000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Job Description</label>
                <textarea rows={4} className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white" placeholder="Describe the role, responsibilities, and what makes it exciting..."></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Requirements</label>
                <textarea rows={3} className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white" placeholder="List the key requirements and qualifications..."></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800">Cancel</button>
              <button className="px-4 py-2 rounded-lg bg-[#FF9000] text-white hover:bg-[#FFA100]">Create Job Posting</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Job Posting Modal */}
      {showEditModal && editingPosting && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Edit Job Posting</h3>
              <button onClick={() => setShowEditModal(false)} className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-white">✕</button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Job Title</label>
                  <input 
                    type="text" 
                    defaultValue={editingPosting.title}
                    className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white" 
                    placeholder="e.g. Senior Frontend Developer" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Company</label>
                  <input 
                    type="text" 
                    defaultValue={editingPosting.company}
                    className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white" 
                    placeholder="e.g. TechCorp" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Location</label>
                  <input 
                    type="text" 
                    defaultValue={editingPosting.location}
                    className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white" 
                    placeholder="e.g. San Francisco, CA" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Job Type</label>
                  <select 
                    defaultValue={editingPosting.type}
                    className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white"
                  >
                    <option>Full-time</option>
                    <option>Contract</option>
                    <option>Part-time</option>
                    <option>Internship</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Salary Range</label>
                <input 
                  type="text" 
                  defaultValue={editingPosting.salary}
                  className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white" 
                  placeholder="e.g. $120,000 - $160,000" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Status</label>
                <select 
                  defaultValue={editingPosting.status}
                  className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white"
                >
                  <option value="active">Active</option>
                  <option value="closed">Closed</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Job Description</label>
                <textarea 
                  rows={4} 
                  defaultValue={editingPosting.description}
                  className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white" 
                  placeholder="Describe the role, responsibilities, and what makes it exciting..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Requirements</label>
                <textarea 
                  rows={3} 
                  defaultValue={editingPosting.requirements.join('\n')}
                  className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white" 
                  placeholder="List the key requirements and qualifications..."
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800">Cancel</button>
              <button 
                onClick={() => {
                  // In a real app, this would update the backend
                  setShowEditModal(false);
                  setEditingPosting(null);
                }}
                className="px-4 py-2 rounded-lg bg-[#FF9000] text-white hover:bg-[#FFA100]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}