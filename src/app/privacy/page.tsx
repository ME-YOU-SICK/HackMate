"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { 
  Shield, 
  Eye, 
  Lock, 
  Database, 
  Mail, 
  Users,
  Globe,
  Settings,
  AlertCircle,
  CheckCircle,
  FileText
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "Information We Collect",
      icon: <Database className="h-5 w-5" />,
      content: [
        {
          subtitle: "Personal Information",
          text: "We collect information you provide directly to us, such as when you create an account, participate in events, or contact us for support. This may include your name, email address, profile information, and any other information you choose to provide."
        },
        {
          subtitle: "Usage Information",
          text: "We automatically collect certain information about your use of our services, including your IP address, browser type, device information, pages visited, and time spent on our platform."
        },
        {
          subtitle: "Cookies and Tracking",
          text: "We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can control cookie settings through your browser preferences."
        }
      ]
    },
    {
      title: "How We Use Your Information",
      icon: <Settings className="h-5 w-5" />,
      content: [
        {
          subtitle: "Service Provision",
          text: "We use your information to provide, maintain, and improve our services, including facilitating hackathons, team matching, and community features."
        },
        {
          subtitle: "Communication",
          text: "We may use your contact information to send you important updates about our services, event notifications, and relevant opportunities."
        },
        {
          subtitle: "Analytics and Improvement",
          text: "We analyze usage data to understand how our platform is used and to improve user experience, features, and performance."
        }
      ]
    },
    {
      title: "Information Sharing",
      icon: <Users className="h-5 w-5" />,
      content: [
        {
          subtitle: "Public Profile Information",
          text: "Your public profile information, including your name, skills, and project portfolio, may be visible to other users of the platform to facilitate networking and collaboration."
        },
        {
          subtitle: "Service Providers",
          text: "We may share information with third-party service providers who assist us in operating our platform, such as hosting, analytics, and customer support services."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose information when required by law, to protect our rights, or to ensure the safety of our users and the platform."
        }
      ]
    },
    {
      title: "Data Security",
      icon: <Lock className="h-5 w-5" />,
      content: [
        {
          subtitle: "Security Measures",
          text: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
        },
        {
          subtitle: "Data Encryption",
          text: "Sensitive information is encrypted in transit and at rest using industry-standard encryption protocols."
        },
        {
          subtitle: "Access Controls",
          text: "We limit access to personal information to authorized personnel who need it to perform their job functions."
        }
      ]
    },
    {
      title: "Your Rights and Choices",
      icon: <CheckCircle className="h-5 w-5" />,
      content: [
        {
          subtitle: "Access and Update",
          text: "You can access and update your personal information through your account settings at any time."
        },
        {
          subtitle: "Data Portability",
          text: "You can request a copy of your personal data in a structured, machine-readable format."
        },
        {
          subtitle: "Deletion",
          text: "You can request deletion of your account and associated personal data, subject to certain legal and operational requirements."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black w-full">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF9000]/20 to-[#FFA100]/20 border border-[#FF9000]/30 rounded-full text-[#FAF000] text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              <span>Privacy Policy</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Your privacy is important to us. This policy explains how we collect, use, 
              and protect your information when you use HackMate.
            </p>
            <div className="text-white/60 text-sm">
              Last updated: January 15, 2024
            </div>
          </motion.div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
              <p className="text-white/70 leading-relaxed">
                HackMate ("we," "our," or "us") is committed to protecting your privacy and ensuring the security 
                of your personal information. This Privacy Policy describes how we collect, use, disclose, and 
                safeguard your information when you use our hackathon platform and related services.
              </p>
              <p className="text-white/70 leading-relaxed mt-4">
                By using our services, you agree to the collection and use of information in accordance with 
                this policy. If you do not agree with our policies and practices, please do not use our services.
              </p>
            </div>
          </motion.div>

          {/* Main Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#FFA100] to-[#FFA100] rounded-lg flex items-center justify-center text-white">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                </div>
                
                <div className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h3 className="text-white font-semibold text-lg mb-3">{item.subtitle}</h3>
                      <p className="text-white/70 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-16"
          >
            <div className="bg-gradient-to-r from-[#FF9000]/10 to-[#FFA100]/10 border border-[#FF9000]/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-white/70 mb-6">
                If you have any questions about this Privacy Policy or our privacy practices, 
                please contact us:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#FAF000]" />
                  <div>
                    <div className="text-white font-medium">Email</div>
                    <div className="text-white/70">privacy@hackmate.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-[#FAF000]" />
                  <div>
                    <div className="text-white font-medium">Data Protection Officer</div>
                    <div className="text-white/70">dpo@hackmate.com</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Updates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-[#FAF000] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">Policy Updates</h3>
                  <p className="text-white/70">
                    We may update this Privacy Policy from time to time. We will notify you of any changes 
                    by posting the new Privacy Policy on this page and updating the "Last updated" date. 
                    We encourage you to review this Privacy Policy periodically for any changes.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
