"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { 
  FileText, 
  Scale, 
  Users, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Mail,
  Calendar,
  Globe,
  Lock
} from "lucide-react";

export default function TermsOfServicePage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: <CheckCircle className="h-5 w-5" />,
      content: [
        {
          subtitle: "Agreement to Terms",
          text: "By accessing and using HackMate, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
        },
        {
          subtitle: "Modifications",
          text: "We reserve the right to modify these terms at any time. We will notify users of any changes by posting the new terms on this page. Your continued use of the service after such modifications constitutes acceptance of the updated terms."
        }
      ]
    },
    {
      title: "User Accounts and Responsibilities",
      icon: <Users className="h-5 w-5" />,
      content: [
        {
          subtitle: "Account Creation",
          text: "You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account."
        },
        {
          subtitle: "User Conduct",
          text: "You agree to use the service in compliance with all applicable laws and regulations. You will not engage in any activity that could harm, disable, or impair the service or interfere with other users' enjoyment of the service."
        },
        {
          subtitle: "Prohibited Activities",
          text: "You may not use the service for illegal purposes, to transmit harmful code, to spam other users, or to violate any intellectual property rights. Harassment, abuse, or inappropriate behavior will not be tolerated."
        }
      ]
    },
    {
      title: "Intellectual Property",
      icon: <Shield className="h-5 w-5" />,
      content: [
        {
          subtitle: "Platform Content",
          text: "The HackMate platform, including its design, functionality, and content, is protected by intellectual property laws. You may not copy, modify, or distribute our platform without permission."
        },
        {
          subtitle: "User Content",
          text: "You retain ownership of content you create and share on the platform. By posting content, you grant us a license to use, display, and distribute your content as necessary to provide our services."
        },
        {
          subtitle: "Project Ownership",
          text: "Projects created during hackathons remain the property of their creators. We do not claim ownership of user-generated projects, but we may showcase them for promotional purposes with proper attribution."
        }
      ]
    },
    {
      title: "Privacy and Data Protection",
      icon: <Lock className="h-5 w-5" />,
      content: [
        {
          subtitle: "Data Collection",
          text: "We collect and process personal data in accordance with our Privacy Policy. By using our service, you consent to the collection and use of your information as described in our Privacy Policy."
        },
        {
          subtitle: "Data Security",
          text: "We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security."
        }
      ]
    },
    {
      title: "Service Availability and Limitations",
      icon: <Globe className="h-5 w-5" />,
      content: [
        {
          subtitle: "Service Availability",
          text: "We strive to provide reliable service, but we do not guarantee uninterrupted access. The service may be temporarily unavailable due to maintenance, updates, or technical issues."
        },
        {
          subtitle: "Limitation of Liability",
          text: "To the maximum extent permitted by law, HackMate shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of the service."
        },
        {
          subtitle: "Service Modifications",
          text: "We reserve the right to modify, suspend, or discontinue any part of the service at any time without notice. We are not liable for any loss or damage resulting from such changes."
        }
      ]
    },
    {
      title: "Termination",
      icon: <XCircle className="h-5 w-5" />,
      content: [
        {
          subtitle: "Account Termination",
          text: "You may terminate your account at any time by contacting us. We may also suspend or terminate your account if you violate these terms or engage in prohibited activities."
        },
        {
          subtitle: "Effect of Termination",
          text: "Upon termination, your right to use the service will cease immediately. We may retain certain information as required by law or for legitimate business purposes."
        }
      ]
    }
  ];

  const prohibitedActivities = [
    "Posting false, misleading, or fraudulent information",
    "Harassing, threatening, or abusing other users",
    "Violating intellectual property rights",
    "Transmitting malware or harmful code",
    "Spamming or sending unsolicited communications",
    "Creating fake accounts or impersonating others",
    "Engaging in illegal activities",
    "Attempting to gain unauthorized access to systems"
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
              <Scale className="h-4 w-4" />
              <span>Terms of Service</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              These terms govern your use of HackMate. Please read them carefully 
              before using our platform.
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
              <h2 className="text-2xl font-bold text-white mb-4">Welcome to HackMate</h2>
              <p className="text-white/70 leading-relaxed">
                These Terms of Service ("Terms") constitute a legally binding agreement between you and HackMate 
                regarding your use of our hackathon platform and related services. By accessing or using our 
                services, you agree to be bound by these Terms.
              </p>
              <p className="text-white/70 leading-relaxed mt-4">
                If you do not agree to these Terms, please do not use our services. We recommend that you 
                review these Terms periodically as they may be updated from time to time.
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

          {/* Prohibited Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-16"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">Prohibited Activities</h2>
              </div>
              <p className="text-white/70 mb-6">
                The following activities are strictly prohibited on our platform:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {prohibitedActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 text-white/70">
                    <XCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span className="text-sm">{activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16"
          >
            <div className="bg-gradient-to-r from-[#FF9000]/10 to-[#FFA100]/10 border border-[#FF9000]/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
              <p className="text-white/70 mb-6">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#FAF000]" />
                  <div>
                    <div className="text-white font-medium">Legal Inquiries</div>
                    <div className="text-white/70">legal@hackmate.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-[#FAF000]" />
                  <div>
                    <div className="text-white font-medium">Business Hours</div>
                    <div className="text-white/70">Monday - Friday, 9 AM - 6 PM EST</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Governing Law */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-12"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
              <p className="text-white/70 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the State of 
                California, without regard to its conflict of law provisions. Any disputes arising from these 
                Terms or your use of our services shall be subject to the exclusive jurisdiction of the courts 
                in San Francisco, California.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
