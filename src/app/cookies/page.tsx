"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { 
  Cookie, 
  Settings, 
  Shield, 
  Eye, 
  Database,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Globe,
  Lock,
  Mail
} from "lucide-react";

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      name: "Essential Cookies",
      description: "These cookies are necessary for the website to function and cannot be switched off in our systems.",
      icon: <Shield className="h-5 w-5" />,
      color: "text-green-400",
      bgColor: "bg-green-600/20",
      borderColor: "border-green-600/30",
      examples: [
        "User authentication and login sessions",
        "Security and fraud prevention",
        "Load balancing and performance optimization",
        "Basic website functionality"
      ],
      canDisable: false
    },
    {
      name: "Analytics Cookies",
      description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
      icon: <Database className="h-5 w-5" />,
      color: "text-[#FAF000]",
      bgColor: "bg-[#FF9000]/20",
      borderColor: "border-[#FF9000]/30",
      examples: [
        "Page views and user behavior tracking",
        "Performance monitoring and optimization",
        "Error tracking and debugging",
        "Usage statistics and insights"
      ],
      canDisable: true
    },
    {
      name: "Functional Cookies",
      description: "These cookies enable enhanced functionality and personalization, such as remembering your preferences.",
      icon: <Settings className="h-5 w-5" />,
      color: "text-[#FAF000]",
      bgColor: "bg-[#FFA100]/20",
      borderColor: "border-[#FFA100]/30",
      examples: [
        "Language and region preferences",
        "Theme and display settings",
        "User interface customizations",
        "Feature preferences and settings"
      ],
      canDisable: true
    },
    {
      name: "Marketing Cookies",
      description: "These cookies are used to deliver advertisements more relevant to you and your interests.",
      icon: <Eye className="h-5 w-5" />,
      color: "text-orange-400",
      bgColor: "bg-orange-600/20",
      borderColor: "border-orange-600/30",
      examples: [
        "Ad targeting and personalization",
        "Campaign performance tracking",
        "Social media integration",
        "Third-party advertising networks"
      ],
      canDisable: true
    }
  ];

  const cookieDetails = [
    {
      name: "_hackmate_session",
      type: "Essential",
      purpose: "Maintains user session and authentication state",
      duration: "Session",
      provider: "HackMate"
    },
    {
      name: "_hackmate_csrf",
      type: "Essential",
      purpose: "Protects against cross-site request forgery attacks",
      duration: "Session",
      provider: "HackMate"
    },
    {
      name: "_ga",
      type: "Analytics",
      purpose: "Distinguishes unique users for Google Analytics",
      duration: "2 years",
      provider: "Google"
    },
    {
      name: "_gid",
      type: "Analytics",
      purpose: "Distinguishes unique users for Google Analytics",
      duration: "24 hours",
      provider: "Google"
    },
    {
      name: "hackmate_preferences",
      type: "Functional",
      purpose: "Stores user interface preferences and settings",
      duration: "1 year",
      provider: "HackMate"
    },
    {
      name: "hackmate_theme",
      type: "Functional",
      purpose: "Remembers user's theme preference (light/dark)",
      duration: "1 year",
      provider: "HackMate"
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
              <Cookie className="h-4 w-4" />
              <span>Cookie Policy</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Cookie Policy
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Learn about how we use cookies and similar technologies to enhance your 
              experience on HackMate and how you can control them.
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
              <h2 className="text-2xl font-bold text-white mb-4">What Are Cookies?</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Cookies are small text files that are stored on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences, 
                analyzing how you use our site, and improving our services.
              </p>
              <p className="text-white/70 leading-relaxed">
                This Cookie Policy explains what cookies we use, why we use them, and how you can 
                control your cookie preferences. By continuing to use our website, you consent to 
                our use of cookies as described in this policy.
              </p>
            </div>
          </motion.div>

          {/* Cookie Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Types of Cookies We Use</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cookieTypes.map((type, index) => (
                <motion.div
                  key={type.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className={`${type.bgColor} ${type.borderColor} border rounded-2xl p-6`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 ${type.bgColor} ${type.borderColor} border rounded-lg flex items-center justify-center`}>
                      <div className={type.color}>
                        {type.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${type.color}`}>{type.name}</h3>
                      <div className="flex items-center gap-2">
                        {type.canDisable ? (
                          <div className="flex items-center gap-1 text-green-400 text-sm">
                            <CheckCircle className="h-3 w-3" />
                            <span>Can be disabled</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-orange-400 text-sm">
                            <AlertCircle className="h-3 w-3" />
                            <span>Required</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-white/70 text-sm mb-4">{type.description}</p>
                  
                  <div>
                    <h4 className="text-white font-medium text-sm mb-2">Examples:</h4>
                    <ul className="space-y-1">
                      {type.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex} className="flex items-start gap-2 text-white/60 text-sm">
                          <div className="w-1 h-1 bg-white/40 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Cookie Details Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Cookie Details</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-4 text-left text-white font-semibold">Cookie Name</th>
                      <th className="px-6 py-4 text-left text-white font-semibold">Type</th>
                      <th className="px-6 py-4 text-left text-white font-semibold">Purpose</th>
                      <th className="px-6 py-4 text-left text-white font-semibold">Duration</th>
                      <th className="px-6 py-4 text-left text-white font-semibold">Provider</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cookieDetails.map((cookie, index) => (
                      <tr key={index} className="border-t border-white/10">
                        <td className="px-6 py-4 text-white font-mono text-sm">{cookie.name}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            cookie.type === 'Essential' ? 'bg-green-600/20 text-green-400 border border-green-600/30' :
                            cookie.type === 'Analytics' ? 'bg-[#FF9000]/20 text-[#FAF000] border border-[#FF9000]/30' :
                            'bg-[#FFA100]/20 text-[#FAF000] border border-[#FFA100]/30'
                          }`}>
                            {cookie.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white/70 text-sm">{cookie.purpose}</td>
                        <td className="px-6 py-4 text-white/70 text-sm">{cookie.duration}</td>
                        <td className="px-6 py-4 text-white/70 text-sm">{cookie.provider}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Cookie Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Managing Your Cookie Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="h-6 w-6 text-[#FAF000]" />
                  <h3 className="text-white font-semibold text-lg">Browser Settings</h3>
                </div>
                <p className="text-white/70 text-sm mb-4">
                  You can control cookies through your browser settings. Most browsers allow you to:
                </p>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                    <span>Block all cookies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                    <span>Block third-party cookies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                    <span>Delete existing cookies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                    <span>Set cookie preferences per site</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="h-6 w-6 text-[#FAF000]" />
                  <h3 className="text-white font-semibold text-lg">Our Cookie Settings</h3>
                </div>
                <p className="text-white/70 text-sm mb-4">
                  You can manage your cookie preferences directly on our website:
                </p>
                <button className="w-full bg-gradient-to-r from-[#FF9000] to-[#FFA100] hover:from-[#FFA100] hover:to-[#FFDD00] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2">
                  <Settings className="h-5 w-5" />
                  Manage Cookie Preferences
                </button>
                <p className="text-white/50 text-xs mt-3 text-center">
                  Note: Disabling certain cookies may affect website functionality
                </p>
              </div>
            </div>
          </motion.div>

          {/* Third-Party Cookies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Info className="h-6 w-6 text-[#FAF000]" />
                <h2 className="text-2xl font-bold text-white">Third-Party Cookies</h2>
              </div>
              <p className="text-white/70 leading-relaxed mb-4">
                We may use third-party services that set their own cookies. These services help us 
                provide better functionality and analyze our website performance. Some of the third-party 
                services we use include:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Google Analytics</h3>
                  <p className="text-white/60 text-sm">Website analytics and performance monitoring</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Social Media Platforms</h3>
                  <p className="text-white/60 text-sm">Social sharing and integration features</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center bg-gradient-to-r from-[#FF9000]/10 to-[#FFA100]/10 border border-[#FF9000]/20 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Questions About Cookies?</h2>
            <p className="text-white/70 mb-6">
              If you have any questions about our use of cookies or this Cookie Policy, 
              please don't hesitate to contact us.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Mail className="h-5 w-5 text-[#FAF000]" />
              <span className="text-white font-medium">privacy@hackmate.com</span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
