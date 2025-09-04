"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  BookOpen, 
  Video, 
  FileText,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Mail,
  Phone,
  Clock,
  Users,
  Zap,
  Shield
} from "lucide-react";

export default function HelpCenterPage() {
  const faqCategories = [
    {
      title: "Getting Started",
      icon: <Zap className="h-5 w-5" />,
      questions: [
        {
          question: "How do I create an account?",
          answer: "Click the 'Sign Up' button in the top right corner, choose your role (Participant, Organizer, Recruiter, or Sponsor), and follow the registration process."
        },
        {
          question: "What's the difference between user roles?",
          answer: "Participants join hackathons and build projects. Organizers create and manage events. Recruiters find talent. Sponsors support events and gain brand visibility."
        },
        {
          question: "Is HackMate free to use?",
          answer: "Yes! HackMate is completely free for all users. We also offer optional verification for $2/month to support the platform and get premium features."
        }
      ]
    },
    {
      title: "Account & Profile",
      icon: <Users className="h-5 w-5" />,
      questions: [
        {
          question: "How do I update my profile?",
          answer: "Go to your dashboard and click on 'Profile'. You can update your information, skills, portfolio, and social links."
        },
        {
          question: "How do I verify my account?",
          answer: "Visit the Pricing page and click 'Get Verified Now'. This gives you a verified badge and premium features for $2/month."
        },
        {
          question: "Can I change my user role?",
          answer: "Yes, you can have multiple roles. Contact support to add additional roles to your account."
        }
      ]
    },
    {
      title: "Events & Hackathons",
      icon: <BookOpen className="h-5 w-5" />,
      questions: [
        {
          question: "How do I join a hackathon?",
          answer: "Browse events in the Events section, click on an event you're interested in, and click 'Join Event'."
        },
        {
          question: "How do I create my own event?",
          answer: "Sign up as an Organizer, go to your dashboard, and click 'Create Event'. Fill out the event details and publish."
        },
        {
          question: "Can I participate in multiple events?",
          answer: "Yes! You can join as many events as you want, as long as they don't overlap in time."
        }
      ]
    },
    {
      title: "Team & Collaboration",
      icon: <MessageCircle className="h-5 w-5" />,
      questions: [
        {
          question: "How does Teamify work?",
          answer: "Teamify helps you find team members based on skills, experience, and availability. Use the 'Create Team' feature to get matched with compatible participants."
        },
        {
          question: "Can I message other users?",
          answer: "Yes! Use the Messages section in your dashboard to communicate with other participants, organizers, recruiters, and sponsors."
        },
        {
          question: "How do I leave a team?",
          answer: "Go to your team page and click 'Leave Team'. Make sure to notify your teammates first."
        }
      ]
    }
  ];

  const helpResources = [
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides for all features",
      icon: <Video className="h-6 w-6" />,
      link: "#",
      items: ["Getting Started", "Profile Setup", "Event Creation", "Team Formation"]
    },
    {
      title: "Documentation",
      description: "Comprehensive guides and API docs",
      icon: <FileText className="h-6 w-6" />,
      link: "/docs",
      items: ["User Guides", "API Reference", "Best Practices", "Troubleshooting"]
    },
    {
      title: "Community Forum",
      description: "Get help from other users",
      icon: <Users className="h-6 w-6" />,
      link: "/community",
      items: ["Ask Questions", "Share Tips", "Report Issues", "Feature Requests"]
    },
    {
      title: "Contact Support",
      description: "Direct help from our team",
      icon: <MessageCircle className="h-6 w-6" />,
      link: "/contact",
      items: ["Live Chat", "Email Support", "Phone Support", "Priority Help"]
    }
  ];

  const contactMethods = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: <MessageCircle className="h-6 w-6" />,
      availability: "24/7",
      responseTime: "Immediate",
      link: "#"
    },
    {
      title: "Email Support",
      description: "Send us a detailed message",
      icon: <Mail className="h-6 w-6" />,
      availability: "24/7",
      responseTime: "Within 2 hours",
      link: "/contact"
    },
    {
      title: "Phone Support",
      description: "Speak directly with our team",
      icon: <Phone className="h-6 w-6" />,
      availability: "Mon-Fri, 9AM-6PM EST",
      responseTime: "Immediate",
      link: "tel:+1-555-HACKMATE"
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
              <HelpCircle className="h-4 w-4" />
              <span>Help Center</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              How can we help you?
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Find answers to common questions, learn how to use HackMate effectively, 
              and get support when you need it.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
              <input
                type="text"
                placeholder="Search for help articles, guides, and FAQs..."
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF9000] focus:border-transparent"
              />
            </div>
          </motion.div>

          {/* Quick Help Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Quick Help Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {helpResources.map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-200 group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FFA100] to-[#FFA100] rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                    {resource.icon}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2 text-center">{resource.title}</h3>
                  <p className="text-white/60 text-sm mb-4 text-center">{resource.description}</p>
                  <ul className="space-y-2">
                    {resource.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 text-white/70 text-sm">
                        <CheckCircle className="h-3 w-3 text-[#FAF000] flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-center gap-2 text-[#FAF000] text-sm font-medium mt-4 group-hover:text-[#FFDD00] transition-colors">
                    <span>Explore</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {faqCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + categoryIndex * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#FFA100] to-[#FFA100] rounded-lg flex items-center justify-center text-white">
                      {category.icon}
                    </div>
                    <h3 className="text-white font-semibold text-xl">{category.title}</h3>
                  </div>
                  <div className="space-y-4">
                    {category.questions.map((faq, faqIndex) => (
                      <div key={faqIndex} className="border-b border-white/10 pb-4 last:border-b-0">
                        <h4 className="text-white font-medium mb-2">{faq.question}</h4>
                        <p className="text-white/60 text-sm">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Contact Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-200 group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FFA100] to-[#FFA100] rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                    {method.icon}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{method.title}</h3>
                  <p className="text-white/60 text-sm mb-4">{method.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-2 text-white/70">
                      <Clock className="h-4 w-4" />
                      <span>{method.availability}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-white/70">
                      <Zap className="h-4 w-4" />
                      <span>{method.responseTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-[#FAF000] text-sm font-medium mt-4 group-hover:text-[#FFDD00] transition-colors">
                    <span>Get Help</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Emergency Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center bg-gradient-to-r from-[#FF9000]/10 to-[#FFA100]/10 border border-[#FF9000]/20 rounded-3xl p-12"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#FFA100] to-[#FFA100] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Need Immediate Help?</h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              For urgent issues or technical problems, our priority support team is here to help you get back on track quickly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-gradient-to-r from-[#FF9000] to-[#FFA100] hover:from-[#FFA100] hover:to-[#FFDD00] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Priority Support
              </a>
              <a
                href="mailto:support@hackmate.com"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 border border-white/20 flex items-center justify-center gap-2"
              >
                <Mail className="h-5 w-5" />
                Email Support
              </a>
            </div>
            <div className="mt-8 text-white/60 text-sm">
              <p>Emergency support: support@hackmate.com</p>
              <p>Response time: Within 30 minutes</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
