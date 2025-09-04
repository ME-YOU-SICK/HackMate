"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { 
  Handshake, 
  Building2, 
  Users, 
  Target, 
  TrendingUp, 
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Award,
  MessageCircle,
  Calendar
} from "lucide-react";

export default function PartnershipsPage() {
  const partnershipTypes = [
    {
      title: "Technology Partners",
      description: "Integrate your tools and services with HackMate",
      icon: <Building2 className="h-6 w-6" />,
      benefits: [
        "API Integration",
        "Co-marketing Opportunities",
        "Technical Support",
        "Early Access to Features"
      ],
      idealFor: "SaaS companies, developer tools, cloud providers"
    },
    {
      title: "Educational Partners",
      description: "Connect with students and educational institutions",
      icon: <Users className="h-6 w-6" />,
      benefits: [
        "Student Outreach",
        "Curriculum Integration",
        "Campus Events",
        "Research Collaboration"
      ],
      idealFor: "Universities, coding bootcamps, online learning platforms"
    },
    {
      title: "Corporate Partners",
      description: "Access top talent and sponsor innovative projects",
      icon: <Target className="h-6 w-6" />,
      benefits: [
        "Talent Pipeline",
        "Brand Visibility",
        "Innovation Access",
        "Recruitment Events"
      ],
      idealFor: "Fortune 500 companies, startups, tech corporations"
    },
    {
      title: "Media Partners",
      description: "Amplify your reach through our community",
      icon: <Globe className="h-6 w-6" />,
      benefits: [
        "Content Distribution",
        "Event Coverage",
        "Community Access",
        "Cross-promotion"
      ],
      idealFor: "Tech publications, blogs, podcasts, influencers"
    }
  ];

  const successStories = [
    {
      company: "TechCorp",
      type: "Corporate Partner",
      description: "Increased their talent pipeline by 300% through HackMate partnerships",
      result: "300% increase in qualified candidates",
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      company: "CodeAcademy",
      type: "Educational Partner",
      description: "Reached 50,000+ students through integrated hackathon events",
      result: "50,000+ student reach",
      icon: <Users className="h-5 w-5" />
    },
    {
      company: "DevTools Inc",
      type: "Technology Partner",
      description: "Achieved 95% developer adoption through HackMate integration",
      result: "95% adoption rate",
      icon: <Award className="h-5 w-5" />
    }
  ];

  const partnershipProcess = [
    {
      step: 1,
      title: "Initial Discussion",
      description: "We'll discuss your goals and how we can work together",
      icon: <MessageCircle className="h-5 w-5" />
    },
    {
      step: 2,
      title: "Partnership Proposal",
      description: "We'll create a customized partnership proposal for you",
      icon: <Handshake className="h-5 w-5" />
    },
    {
      step: 3,
      title: "Agreement & Launch",
      description: "Sign the agreement and launch your partnership",
      icon: <Calendar className="h-5 w-5" />
    },
    {
      step: 4,
      title: "Ongoing Support",
      description: "We provide continuous support and optimization",
      icon: <Star className="h-5 w-5" />
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
              <Handshake className="h-4 w-4" />
              <span>Partnerships</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Partner with HackMate
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Join forces with HackMate to reach the next generation of developers, 
              innovators, and tech talent. Together, we can build the future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-gradient-to-r from-[#FF9000] to-[#FFA100] hover:from-[#FFA100] hover:to-[#FFDD00] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <Handshake className="h-5 w-5" />
                Start Partnership
              </a>
              <a
                href="#benefits"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 border border-white/20 flex items-center justify-center gap-2"
              >
                <ArrowRight className="h-5 w-5" />
                Learn More
              </a>
            </div>
          </motion.div>

          {/* Partnership Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
            id="benefits"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Partnership Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {partnershipTypes.map((type, index) => (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-200"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FFA100] to-[#FFA100] rounded-xl flex items-center justify-center text-white">
                      {type.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-xl">{type.title}</h3>
                      <p className="text-white/60 text-sm">{type.idealFor}</p>
                    </div>
                  </div>
                  <p className="text-white/70 mb-6">{type.description}</p>
                  <div className="space-y-3">
                    <h4 className="text-white font-medium">Key Benefits:</h4>
                    {type.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-3 text-white/70">
                        <CheckCircle className="h-4 w-4 text-[#FAF000] flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Success Stories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {successStories.map((story, index) => (
                <motion.div
                  key={story.company}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FFA100] to-[#FFA100] rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                    {story.icon}
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF9000]/20 border border-[#FF9000]/30 rounded-full text-[#FAF000] text-xs font-medium mb-4">
                    <span>{story.type}</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{story.company}</h3>
                  <p className="text-white/60 text-sm mb-4">{story.description}</p>
                  <div className="text-[#FAF000] font-semibold text-lg">{story.result}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Partnership Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnershipProcess.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
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

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center bg-gradient-to-r from-[#FF9000]/10 to-[#FFA100]/10 border border-[#FF9000]/20 rounded-3xl p-12"
            id="contact"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Partner?</h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss how we can work together to achieve mutual success. 
              Our partnership team is ready to help you get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-gradient-to-r from-[#FF9000] to-[#FFA100] hover:from-[#FFA100] hover:to-[#FFDD00] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Contact Partnership Team
              </a>
              <a
                href="mailto:partnerships@hackmate.com"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 border border-white/20 flex items-center justify-center gap-2"
              >
                <ArrowRight className="h-5 w-5" />
                Email Us
              </a>
            </div>
            <div className="mt-8 text-white/60 text-sm">
              <p>Partnership inquiries: partnerships@hackmate.com</p>
              <p>Response time: Within 24 hours</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
