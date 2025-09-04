"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { GlowingCard } from "@/components/ui/glowing-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  Users, 
  BookOpen,
  Video,
  FileText,
  CheckCircle,
  Star,
  Target,
  TrendingUp,
  Award,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Play,
  Download,
  ExternalLink,
  Lightbulb,
  Brain,
  Zap,
  Shield,
  Code,
  Database,
  Smartphone,
  Cloud,
  Gamepad2,
  Palette,
  Globe,
  Heart,
  Music,
  Car,
  ShoppingBag,
  Building,
  User,
  Briefcase,
  GraduationCap,
  ThumbsUp,
  AlertCircle,
  Info
} from "lucide-react";

export default function RecruiterInterviewsPage() {
  const userRole = "recruiter";
  const userName = "Alex Thompson";
  const userAvatar = undefined;

  const [activeTab, setActiveTab] = useState("resources");
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const interviewResources = [
    {
      id: 1,
      title: "Technical Interview Guide",
      description: "Comprehensive guide for conducting technical interviews",
      type: "guide",
      category: "Technical",
      icon: <Code className="h-5 w-5" />,
      duration: "15 min read",
      difficulty: "Beginner",
      rating: 4.8,
      downloads: 1250,
      content: {
        sections: [
          "Interview Structure & Timing",
          "Technical Question Types",
          "Live Coding Best Practices",
          "System Design Fundamentals",
          "Evaluation Criteria",
          "Common Mistakes to Avoid"
        ],
        keyPoints: [
          "Start with easy questions to build confidence",
          "Focus on problem-solving approach over perfect solutions",
          "Use real-world scenarios relevant to the role",
          "Allow candidates to ask clarifying questions",
          "Provide hints when candidates are stuck"
        ]
      }
    },
    {
      id: 2,
      title: "Behavioral Questions Bank",
      description: "200+ proven behavioral interview questions",
      type: "questions",
      category: "Behavioral",
      icon: <Brain className="h-5 w-5" />,
      duration: "10 min read",
      difficulty: "Beginner",
      rating: 4.9,
      downloads: 2100,
      content: {
        sections: [
          "Leadership & Teamwork",
          "Problem-Solving & Decision Making",
          "Communication & Conflict Resolution",
          "Adaptability & Learning",
          "Initiative & Drive",
          "Cultural Fit & Values"
        ],
        sampleQuestions: [
          "Tell me about a time you had to work with a difficult team member",
          "Describe a situation where you had to learn something new quickly",
          "Give me an example of when you took initiative on a project",
          "Tell me about a time you failed and what you learned from it",
          "Describe a situation where you had to give difficult feedback"
        ]
      }
    },
    {
      id: 3,
      title: "Coding Challenge Templates",
      description: "Ready-to-use coding challenges for different roles",
      type: "template",
      category: "Technical",
      icon: <FileText className="h-5 w-5" />,
      duration: "5 min setup",
      difficulty: "Intermediate",
      rating: 4.7,
      downloads: 1800,
      content: {
        challenges: [
          {
            title: "Array Manipulation",
            difficulty: "Easy",
            timeLimit: "20 minutes",
            description: "Find the maximum sum of contiguous subarray"
          },
          {
            title: "Binary Tree Traversal",
            difficulty: "Medium",
            timeLimit: "30 minutes",
            description: "Implement in-order traversal without recursion"
          },
          {
            title: "System Design: URL Shortener",
            difficulty: "Hard",
            timeLimit: "45 minutes",
            description: "Design a scalable URL shortening service"
          }
        ]
      }
    },
    {
      id: 4,
      title: "Interview Scorecard",
      description: "Structured evaluation framework for candidates",
      type: "tool",
      category: "Evaluation",
      icon: <CheckCircle className="h-5 w-5" />,
      duration: "2 min per interview",
      difficulty: "Beginner",
      rating: 4.6,
      downloads: 950,
      content: {
        criteria: [
          "Technical Skills (1-5)",
          "Problem-Solving Ability (1-5)",
          "Communication Skills (1-5)",
          "Cultural Fit (1-5)",
          "Experience Relevance (1-5)"
        ],
        overallRating: "1-5 scale with detailed feedback sections"
      }
    },
    {
      id: 5,
      title: "Remote Interview Best Practices",
      description: "Tips for conducting effective remote interviews",
      type: "guide",
      category: "Remote",
      icon: <Video className="h-5 w-5" />,
      duration: "12 min read",
      difficulty: "Beginner",
      rating: 4.8,
      downloads: 1600,
      content: {
        sections: [
          "Technology Setup & Testing",
          "Environment & Lighting",
          "Engagement Strategies",
          "Screen Sharing Best Practices",
          "Time Management",
          "Follow-up Communication"
        ],
        tips: [
          "Test all technology 15 minutes before the interview",
          "Use good lighting and a professional background",
          "Maintain eye contact by looking at the camera",
          "Have backup plans for technical issues",
          "Send calendar invites with video links"
        ]
      }
    },
    {
      id: 6,
      title: "Salary Negotiation Guide",
      description: "Framework for discussing compensation",
      type: "guide",
      category: "Compensation",
      icon: <TrendingUp className="h-5 w-5" />,
      duration: "8 min read",
      difficulty: "Intermediate",
      rating: 4.5,
      downloads: 1100,
      content: {
        sections: [
          "Market Research & Benchmarking",
          "Total Compensation Package",
          "Negotiation Strategies",
          "Timing & Approach",
          "Handling Counteroffers",
          "Documentation & Follow-up"
        ],
        strategies: [
          "Research market rates for the role and location",
          "Consider total compensation, not just salary",
          "Be prepared to justify your value proposition",
          "Practice your negotiation points beforehand",
          "Know your walk-away point"
        ]
      }
    }
  ];

  const interviewTemplates = [
    {
      id: 1,
      title: "Software Engineer Interview",
      description: "Complete interview template for software engineering roles",
      duration: "60-90 minutes",
      questions: 25,
      categories: ["Technical", "Behavioral", "System Design"],
      icon: <Code className="h-5 w-5" />,
      color: "bg-[#FFA100]",
      content: {
        structure: [
          "Introduction & Company Overview (5 min)",
          "Technical Coding Challenge (30-40 min)",
          "System Design Discussion (20-30 min)",
          "Behavioral Questions (15-20 min)",
          "Candidate Questions (10 min)"
        ],
        technicalQuestions: [
          "Implement a function to reverse a linked list",
          "Find the longest common subsequence between two strings",
          "Design a rate limiter for API requests",
          "Explain the difference between SQL and NoSQL databases"
        ],
        systemDesign: [
          "Design a URL shortener service",
          "How would you scale a chat application?",
          "Design a distributed cache system"
        ],
        behavioralQuestions: [
          "Tell me about a challenging technical problem you solved",
          "Describe a time you had to learn a new technology quickly",
          "How do you handle code reviews and feedback?"
        ]
      }
    },
    {
      id: 2,
      title: "Data Scientist Interview",
      description: "Specialized template for data science positions",
      duration: "75-105 minutes",
      questions: 20,
      categories: ["Statistics", "ML", "Behavioral"],
      icon: <Database className="h-5 w-5" />,
      color: "bg-green-500",
      content: {
        structure: [
          "Introduction & Background (10 min)",
          "Statistics & Probability (20-25 min)",
          "Machine Learning Concepts (25-30 min)",
          "Case Study & Problem Solving (20-25 min)",
          "Behavioral Questions (10-15 min)"
        ],
        statisticsQuestions: [
          "Explain the difference between correlation and causation",
          "What is the Central Limit Theorem?",
          "How would you handle missing data in a dataset?",
          "Explain p-values and statistical significance"
        ],
        mlQuestions: [
          "Compare supervised vs unsupervised learning",
          "Explain overfitting and how to prevent it",
          "Describe the bias-variance tradeoff",
          "When would you use random forest vs neural networks?"
        ],
        caseStudies: [
          "Design an A/B test for a new feature",
          "How would you detect fraud in financial transactions?",
          "Build a recommendation system for an e-commerce site"
        ]
      }
    },
    {
      id: 3,
      title: "Product Manager Interview",
      description: "Comprehensive PM interview framework",
      duration: "90-120 minutes",
      questions: 30,
      categories: ["Product", "Strategy", "Behavioral"],
      icon: <Target className="h-5 w-5" />,
      color: "bg-[#BABD00]",
      content: {
        structure: [
          "Introduction & Product Philosophy (10 min)",
          "Product Strategy & Vision (25-30 min)",
          "Product Design & User Experience (25-30 min)",
          "Analytics & Metrics (15-20 min)",
          "Behavioral & Leadership (15-20 min)"
        ],
        strategyQuestions: [
          "How would you prioritize features for a new product?",
          "Describe your approach to competitive analysis",
          "How do you define and measure product success?",
          "Explain your product development process"
        ],
        designQuestions: [
          "Design a mobile app for food delivery",
          "How would you improve user engagement?",
          "Describe your approach to user research",
          "How do you balance user needs with business goals?"
        ],
        metricsQuestions: [
          "What metrics would you track for a social media app?",
          "How would you measure product-market fit?",
          "Explain cohort analysis and its importance"
        ]
      }
    },
    {
      id: 4,
      title: "UX Designer Interview",
      description: "Design-focused interview template",
      duration: "60-90 minutes",
      questions: 22,
      categories: ["Design", "Research", "Behavioral"],
      icon: <Palette className="h-5 w-5" />,
      color: "bg-pink-500",
      content: {
        structure: [
          "Portfolio Review (15-20 min)",
          "Design Process & Methodology (15-20 min)",
          "Design Challenge (25-30 min)",
          "User Research & Testing (10-15 min)",
          "Behavioral Questions (10-15 min)"
        ],
        processQuestions: [
          "Walk me through your design process",
          "How do you approach user research?",
          "Describe your collaboration with developers",
          "How do you handle design feedback and iterations?"
        ],
        designChallenges: [
          "Design a mobile app for elderly users",
          "Improve the checkout process for an e-commerce site",
          "Design a dashboard for data visualization",
          "Create a user onboarding flow"
        ],
        researchQuestions: [
          "How do you conduct user interviews?",
          "Explain different usability testing methods",
          "How do you analyze user feedback?",
          "Describe your approach to accessibility"
        ]
      }
    }
  ];

  const quickActions = [
    {
      title: "Schedule Interview",
      description: "Set up a new interview session",
      icon: <Calendar className="h-5 w-5" />,
      action: () => setShowScheduleModal(true),
      color: "bg-[#FFA100]"
    },
    {
      title: "View Candidates",
      description: "Browse candidate profiles",
      icon: <Users className="h-5 w-5" />,
      href: "/recruiter/dashboard/connections",
      color: "bg-green-500"
    },
    {
      title: "Interview Analytics",
      description: "Review interview performance",
      icon: <TrendingUp className="h-5 w-5" />,
      action: () => setShowAnalyticsModal(true),
      color: "bg-[#BABD00]"
    },
    {
      title: "Feedback Templates",
      description: "Standardized feedback forms",
      icon: <FileText className="h-5 w-5" />,
      action: () => setShowFeedbackModal(true),
      color: "bg-orange-500"
    }
  ];

  const bestPractices = [
    {
      title: "Prepare Structured Questions",
      description: "Create a consistent set of questions for each role to ensure fair evaluation.",
      icon: <CheckCircle className="h-5 w-5" />,
      category: "Preparation",
      details: {
        tips: [
          "Develop role-specific question banks",
          "Include both technical and behavioral questions",
          "Prepare follow-up questions for deeper insights",
          "Test questions with team members first"
        ],
        benefits: [
          "Ensures consistent evaluation criteria",
          "Reduces bias in the interview process",
          "Makes comparison between candidates easier",
          "Improves interview efficiency"
        ]
      }
    },
    {
      title: "Use the STAR Method",
      description: "Ask candidates to describe Situation, Task, Action, and Result for behavioral questions.",
      icon: <Star className="h-5 w-5" />,
      category: "Behavioral",
      details: {
        framework: [
          "Situation: Set the context and background",
          "Task: Describe what needed to be accomplished",
          "Action: Explain the specific steps taken",
          "Result: Share the outcome and lessons learned"
        ],
        exampleQuestions: [
          "Tell me about a time you had to work with a difficult team member",
          "Describe a situation where you had to meet a tight deadline",
          "Give me an example of when you had to learn something new quickly"
        ]
      }
    },
    {
      title: "Focus on Problem-Solving",
      description: "Assess how candidates approach problems rather than just their technical knowledge.",
      icon: <Lightbulb className="h-5 w-5" />,
      category: "Technical",
      details: {
        approach: [
          "Start with easy problems to build confidence",
          "Observe their thought process and communication",
          "Allow candidates to ask clarifying questions",
          "Provide hints when they're stuck",
          "Focus on approach over perfect solutions"
        ],
        evaluationCriteria: [
          "Problem decomposition skills",
          "Communication of thought process",
          "Ability to handle feedback and hints",
          "Adaptability when approach doesn't work"
        ]
      }
    },
    {
      title: "Create a Welcoming Environment",
      description: "Make candidates feel comfortable to perform their best during interviews.",
      icon: <Heart className="h-5 w-5" />,
      category: "Environment",
      details: {
        techniques: [
          "Start with casual conversation to break the ice",
          "Explain the interview structure upfront",
          "Encourage questions throughout the process",
          "Maintain a positive and encouraging tone",
          "Provide water and comfortable seating"
        ],
        remoteTips: [
          "Test technology beforehand",
          "Use good lighting and professional background",
          "Minimize distractions and interruptions",
          "Have backup plans for technical issues"
        ]
      }
    },
    {
      title: "Take Detailed Notes",
      description: "Document key points and observations for accurate evaluation later.",
      icon: <FileText className="h-5 w-5" />,
      category: "Documentation",
      details: {
        whatToDocument: [
          "Specific examples and responses",
          "Technical skills demonstrated",
          "Communication style and clarity",
          "Problem-solving approach",
          "Areas of strength and improvement"
        ],
        bestPractices: [
          "Use structured note-taking templates",
          "Record quotes and specific examples",
          "Note both positive and negative observations",
          "Document follow-up questions asked",
          "Review notes immediately after the interview"
        ]
      }
    },
    {
      title: "Provide Timely Feedback",
      description: "Share constructive feedback with candidates within 24-48 hours.",
      icon: <MessageCircle className="h-5 w-5" />,
      category: "Follow-up",
      details: {
        feedbackStructure: [
          "Start with positive observations",
          "Provide specific examples of strengths",
          "Offer constructive suggestions for improvement",
          "Be honest but respectful about concerns",
          "End with encouragement and next steps"
        ],
        timing: [
          "Send feedback within 24-48 hours",
          "Follow up on promised timelines",
          "Provide updates on hiring process",
          "Maintain professional communication"
        ]
      }
    }
  ];

  const upcomingInterviews = [
    {
      id: 1,
      candidate: "Sarah Chen",
      role: "Senior Frontend Developer",
      time: "Today, 2:00 PM",
      type: "Technical",
      status: "confirmed"
    },
    {
      id: 2,
      candidate: "Marcus Johnson",
      role: "AI/ML Engineer",
      time: "Tomorrow, 10:00 AM",
      type: "Behavioral",
      status: "confirmed"
    },
    {
      id: 3,
      candidate: "Emily Rodriguez",
      role: "Full Stack Developer",
      time: "Friday, 3:30 PM",
      type: "Final",
      status: "pending"
    }
  ];

  const tabs = [
    { id: "resources", label: "Resources", icon: <BookOpen className="h-4 w-4" /> },
    { id: "templates", label: "Templates", icon: <FileText className="h-4 w-4" /> },
    { id: "practices", label: "Best Practices", icon: <Lightbulb className="h-4 w-4" /> },
    { id: "schedule", label: "Schedule", icon: <Calendar className="h-4 w-4" /> }
  ];

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
          <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-6 flex-1 w-full h-full overflow-y-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-between items-center"
            >
              <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                  Interview Hub
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Everything you need for successful interviews and recruiting
                </p>
              </div>
              <div className="flex gap-3">
                <Link href="/recruiter/dashboard/connections" className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-neutral-900 dark:text-white">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">View Candidates</span>
                </Link>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors">
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Schedule Interview</span>
                </button>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => {
                  const ActionComponent = action.href ? Link : 'div';
                  const actionProps = action.href ? { href: action.href } : { onClick: action.action };
                  
                  return (
                    <ActionComponent key={index} {...actionProps}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                        className="p-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-[#FFDD00] dark:hover:border-[#FF9000] transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 ${action.color} rounded-lg text-white`}>
                            {action.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-neutral-900 dark:text-white group-hover:text-[#FF9000] dark:group-hover:text-[#FAF000] transition-colors">
                              {action.title}
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              {action.description}
                            </p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-neutral-400 group-hover:text-[#FFA100] transition-colors" />
                        </div>
                      </motion.div>
                    </ActionComponent>
                  );
                })}
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex space-x-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-neutral-700 text-[#FF9000] dark:text-[#FAF000] shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </motion.div>

            {/* Tab Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex-1"
            >
              {activeTab === "resources" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                    Interview Resources
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {interviewResources.map((resource, index) => (
                      <GlowingCard
                        key={resource.id}
                        icon={resource.icon}
                        title={resource.title}
                        description={resource.description}
                        className="h-full"
                      >
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-1 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 text-[#FF9000] dark:text-[#FAF000] text-xs rounded-full">
                              {resource.category}
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-neutral-600 dark:text-neutral-400">
                                {resource.rating}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
                            <span>{resource.duration}</span>
                            <span>{resource.downloads.toLocaleString()} downloads</span>
                          </div>
                          <div className="flex gap-2">
                            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors text-sm">
                              <Download className="h-4 w-4" />
                              Download
                            </button>
                            <button className="px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                              <ExternalLink className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </GlowingCard>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "templates" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                    Interview Templates
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {interviewTemplates.map((template, index) => (
                      <GlowingCard
                        key={template.id}
                        icon={template.icon}
                        title={template.title}
                        description={template.description}
                        className="h-full"
                      >
                        <div className="mt-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                              {template.duration}
                            </span>
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                              {template.questions} questions
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {template.categories.map((category, catIndex) => (
                              <span 
                                key={catIndex}
                                className="px-2 py-1 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 text-[#FF9000] dark:text-[#FAF000] text-xs rounded-full"
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors text-sm">
                              <Play className="h-4 w-4" />
                              Use Template
                            </button>
                            <button className="px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </GlowingCard>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "practices" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                    Best Practices
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {bestPractices.map((practice, index) => (
                      <GlowingCard
                        key={index}
                        icon={practice.icon}
                        title={practice.title}
                        description={practice.description}
                        className="h-full"
                      >
                        <div className="mt-4">
                          <span className="px-2 py-1 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 text-[#FF9000] dark:text-[#FAF000] text-xs rounded-full">
                            {practice.category}
                          </span>
                        </div>
                      </GlowingCard>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "schedule" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                    Upcoming Interviews
                  </h2>
                  <div className="space-y-4">
                    {upcomingInterviews.map((interview, index) => (
                      <GlowingCard
                        key={interview.id}
                        title={`${interview.candidate} - ${interview.role}`}
                        description={interview.time}
                        className="h-full"
                      >
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="px-2 py-1 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 text-[#FF9000] dark:text-[#FAF000] text-xs rounded-full">
                              {interview.type}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              interview.status === 'confirmed' 
                                ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                                : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200'
                            }`}>
                              {interview.status}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-sm">
                              <MessageCircle className="h-4 w-4" />
                            </button>
                            <button className="px-3 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors text-sm">
                              <Video className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </GlowingCard>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Schedule Interview Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="w-full max-w-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Schedule Interview</h3>
              <button onClick={() => setShowScheduleModal(false)} className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-white">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-1">Candidate</label>
                <select className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white">
                  <option>Select a candidate...</option>
                  <option>Sarah Chen - Frontend Developer</option>
                  <option>Marcus Johnson - AI/ML Engineer</option>
                  <option>Emily Rodriguez - Full Stack Developer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-1">Interview Type</label>
                <select className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white">
                  <option>Technical Interview</option>
                  <option>Behavioral Interview</option>
                  <option>Final Interview</option>
                  <option>Phone Screening</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-1">Date & Time</label>
                <input type="datetime-local" className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-1">Duration</label>
                <select className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white">
                  <option>30 minutes</option>
                  <option>45 minutes</option>
                  <option>60 minutes</option>
                  <option>90 minutes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-1">Interview Template</label>
                <select className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-[#FF9000] text-neutral-900 dark:text-white">
                  <option>Software Engineer Interview</option>
                  <option>Data Scientist Interview</option>
                  <option>Product Manager Interview</option>
                  <option>UX Designer Interview</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowScheduleModal(false)} className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800">Cancel</button>
              <button className="px-4 py-2 rounded-lg bg-[#FF9000] text-white hover:bg-[#FFA100]">Schedule Interview</button>
            </div>
          </div>
        </div>
      )}

      {/* Interview Analytics Modal */}
      {showAnalyticsModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Interview Analytics</h3>
              <button onClick={() => setShowAnalyticsModal(false)} className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-white">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-[#FAF000]/5 dark:bg-[#FAF000]/20 rounded-lg">
                <div className="text-2xl font-bold text-[#FF9000] dark:text-[#FAF000]">24</div>
                <div className="text-sm text-[#FF9000] dark:text-[#FAF000]">Interviews This Month</div>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">68%</div>
                <div className="text-sm text-green-600 dark:text-green-400">Success Rate</div>
              </div>
              <div className="p-4 bg-[#BABD00]/10 dark:bg-[#BABD00]/20 rounded-lg">
                <div className="text-2xl font-bold text-[#BABD00] dark:text-[#BABD00]">4.2</div>
                <div className="text-sm text-[#BABD00] dark:text-[#BABD00]">Avg. Rating</div>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">12</div>
                <div className="text-sm text-orange-600 dark:text-orange-400">Hires This Quarter</div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-neutral-900 dark:text-white">Recent Interview Feedback</h4>
              <div className="space-y-2">
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">Sarah Chen</span>
                    <span className="text-sm text-[#FF9000] dark:text-[#FAF000]">Hired</span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">Excellent technical skills and great cultural fit</p>
                </div>
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">Marcus Johnson</span>
                    <span className="text-sm text-green-600 dark:text-green-400">In Progress</span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">Strong ML background, pending final interview</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowAnalyticsModal(false)} className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800">Close</button>
              <button className="px-4 py-2 rounded-lg bg-[#FF9000] text-white hover:bg-[#FFA100]">View Detailed Report</button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Templates Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="w-full max-w-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Feedback Templates</h3>
              <button onClick={() => setShowFeedbackModal(false)} className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-white">✕</button>
            </div>
            <div className="space-y-4">
              <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                <h4 className="font-medium text-neutral-900 dark:text-white mb-2">Technical Interview Feedback</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">Structured template for technical interview evaluation</p>
                <button className="px-3 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] text-sm">Use Template</button>
              </div>
              <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                <h4 className="font-medium text-neutral-900 dark:text-white mb-2">Behavioral Interview Feedback</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">Framework for evaluating behavioral responses</p>
                <button className="px-3 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] text-sm">Use Template</button>
              </div>
              <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                <h4 className="font-medium text-neutral-900 dark:text-white mb-2">Overall Candidate Assessment</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">Comprehensive evaluation template</p>
                <button className="px-3 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] text-sm">Use Template</button>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowFeedbackModal(false)} className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800">Close</button>
              <button className="px-4 py-2 rounded-lg bg-[#FF9000] text-white hover:bg-[#FFA100]">Create Custom Template</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
