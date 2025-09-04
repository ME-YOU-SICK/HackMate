"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Code, 
  Users, 
  Calendar, 
  Target, 
  MessageCircle, 
  Shield, 
  Zap,
  ArrowRight,
  ExternalLink,
  Search,
  FileText,
  Video,
  Download
} from "lucide-react";

export default function DocumentationPage() {
  const quickStartSteps = [
    {
      step: 1,
      title: "Create Your Account",
      description: "Sign up as a participant, organizer, recruiter, or sponsor",
      icon: <Users className="h-6 w-6" />
    },
    {
      step: 2,
      title: "Complete Your Profile",
      description: "Add your skills, experience, and portfolio to get discovered",
      icon: <Target className="h-6 w-6" />
    },
    {
      step: 3,
      title: "Join or Create Events",
      description: "Participate in hackathons or organize your own events",
      icon: <Calendar className="h-6 w-6" />
    },
    {
      step: 4,
      title: "Connect & Collaborate",
      description: "Find team members, network, and build amazing projects",
      icon: <MessageCircle className="h-6 w-6" />
    }
  ];

  const documentationSections = [
    {
      title: "Getting Started",
      description: "Learn the basics of using HackMate",
      icon: <Zap className="h-5 w-5" />,
      articles: [
        "Account Setup & Verification",
        "Profile Optimization",
        "First Event Participation",
        "Team Formation Basics"
      ]
    },
    {
      title: "For Participants",
      description: "Everything you need to succeed as a participant",
      icon: <Users className="h-5 w-5" />,
      articles: [
        "Skills Tracker Guide",
        "Teamify & Collaboration",
        "Event Participation Tips",
        "Portfolio Building"
      ]
    },
    {
      title: "For Organizers",
      description: "Host successful hackathons and events",
      icon: <Calendar className="h-5 w-5" />,
      articles: [
        "Event Creation & Management",
        "Sponsor Coordination",
        "Participant Management",
        "Analytics & Reporting"
      ]
    },
    {
      title: "For Recruiters",
      description: "Find and connect with top talent",
      icon: <Target className="h-5 w-5" />,
      articles: [
        "Talent Discovery",
        "Candidate Evaluation",
        "Interview Scheduling",
        "Job Posting Best Practices"
      ]
    },
    {
      title: "For Sponsors",
      description: "Maximize your sponsorship impact",
      icon: <Shield className="h-5 w-5" />,
      articles: [
        "Sponsorship Packages",
        "Brand Visibility",
        "Talent Pipeline Access",
        "ROI Measurement"
      ]
    },
    {
      title: "API & Integration",
      description: "Technical documentation for developers",
      icon: <Code className="h-5 w-5" />,
      articles: [
        "API Authentication",
        "Event Management API",
        "User Data Integration",
        "Webhook Configuration"
      ]
    }
  ];

  const resources = [
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      icon: <Video className="h-5 w-5" />,
      link: "#"
    },
    {
      title: "Download Resources",
      description: "Templates, guides, and assets",
      icon: <Download className="h-5 w-5" />,
      link: "#"
    },
    {
      title: "Community Forum",
      description: "Get help from the community",
      icon: <MessageCircle className="h-5 w-5" />,
      link: "/community"
    },
    {
      title: "Contact Support",
      description: "Direct help from our team",
      icon: <FileText className="h-5 w-5" />,
      link: "/contact"
    }
  ];

  return (
    <div className="min-h-screen bg-black w-full">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF9000]/20 to-[#FFA100]/20 border border-[#FF9000]/30 rounded-full text-[#FAF000] text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              <span>Documentation</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              HackMate Documentation
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Everything you need to know to get the most out of HackMate. 
              From getting started to advanced features, we've got you covered.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF9000] focus:border-transparent"
              />
            </div>
          </motion.div>

          {/* Quick Start */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Quick Start Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickStartSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-200"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FFA100] to-[#FFA100] rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                    {step.icon}
                  </div>
                  <div className="w-8 h-8 bg-[#FF9000] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-sm font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-white/60 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Documentation Sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Documentation Sections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documentationSections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#FFA100] to-[#FFA100] rounded-lg flex items-center justify-center text-white">
                      {section.icon}
                    </div>
                    <h3 className="text-white font-semibold text-lg">{section.title}</h3>
                  </div>
                  <p className="text-white/60 text-sm mb-4">{section.description}</p>
                  <ul className="space-y-2">
                    {section.articles.map((article, articleIndex) => (
                      <li key={articleIndex} className="flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors cursor-pointer">
                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span>{article}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Additional Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Additional Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-200 group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FFA100] to-[#FFA100] rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                    {resource.icon}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{resource.title}</h3>
                  <p className="text-white/60 text-sm mb-4">{resource.description}</p>
                  <div className="flex items-center justify-center gap-2 text-[#FAF000] text-sm font-medium group-hover:text-[#FFDD00] transition-colors">
                    <span>Learn More</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center bg-gradient-to-r from-[#FF9000]/10 to-[#FFA100]/10 border border-[#FF9000]/20 rounded-3xl p-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Still Need Help?</h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-gradient-to-r from-[#FF9000] to-[#FFA100] hover:from-[#FFA100] hover:to-[#FFDD00] text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Contact Support
              </a>
              <a
                href="/community"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 border border-white/20 flex items-center justify-center gap-2"
              >
                <Users className="h-5 w-5" />
                Join Community
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
