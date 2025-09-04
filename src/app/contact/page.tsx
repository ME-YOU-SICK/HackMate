"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Clock, 
  Send,
  CheckCircle,
  Users,
  Building2,
  HelpCircle,
  Star
} from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general"
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      title: "Email Support",
      description: "Get help via email",
      icon: <Mail className="h-6 w-6" />,
      details: "support@hackmate.com",
      availability: "24/7",
      responseTime: "Within 2 hours"
    },
    {
      title: "Phone Support",
      description: "Speak with our team",
      icon: <Phone className="h-6 w-6" />,
      details: "+1 (555) 123-HACK",
      availability: "Mon-Fri, 9AM-6PM EST",
      responseTime: "Immediate"
    },
    {
      title: "Live Chat",
      description: "Instant messaging support",
      icon: <MessageCircle className="h-6 w-6" />,
      details: "Available on all pages",
      availability: "24/7",
      responseTime: "Immediate"
    },
    {
      title: "Office Address",
      description: "Visit our headquarters",
      icon: <MapPin className="h-6 w-6" />,
      details: "123 Tech Street, San Francisco, CA 94105",
      availability: "Mon-Fri, 9AM-5PM PST",
      responseTime: "By appointment"
    }
  ];

  const contactCategories = [
    { value: "general", label: "General Inquiry" },
    { value: "technical", label: "Technical Support" },
    { value: "billing", label: "Billing & Payments" },
    { value: "partnership", label: "Partnerships" },
    { value: "media", label: "Media & Press" },
    { value: "feedback", label: "Feedback & Suggestions" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        category: "general"
      });
    }, 3000);
  };

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
              <MessageCircle className="h-4 w-4" />
              <span>Contact Us</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Have a question, need support, or want to share feedback? 
              We're here to help and would love to hear from you.
            </p>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-200"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FFA100] to-[#FFA100] rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                    {info.icon}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{info.title}</h3>
                  <p className="text-white/60 text-sm mb-4">{info.description}</p>
                  <div className="text-[#FAF000] font-medium mb-2">{info.details}</div>
                  <div className="space-y-1 text-xs text-white/50">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{info.availability}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-3 w-3" />
                      <span>{info.responseTime}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Send us a Message</h2>
                <p className="text-white/70">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-[#FF9000]/10 to-[#FFA100]/10 border border-[#FF9000]/20 rounded-2xl p-12 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FFA100] to-[#FFA100] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h3>
                  <p className="text-white/70 text-lg">
                    Thank you for contacting us. We'll get back to you within 2 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-white font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF9000] focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF9000] focus:border-transparent"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="category" className="block text-white font-medium mb-2">
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FF9000] focus:border-transparent"
                      >
                        {contactCategories.map((category) => (
                          <option key={category.value} value={category.value} className="bg-neutral-800">
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-white font-medium mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF9000] focus:border-transparent"
                        placeholder="What's this about?"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-white font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF9000] focus:border-transparent resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-[#FF9000] to-[#FFA100] hover:from-[#FFA100] hover:to-[#FFDD00] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2 mx-auto"
                    >
                      <Send className="h-5 w-5" />
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

          {/* Additional Support Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center bg-gradient-to-r from-[#FF9000]/10 to-[#FFA100]/10 border border-[#FF9000]/20 rounded-3xl p-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Other Ways to Connect</h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Join our community, follow us on social media, or explore our resources for more ways to stay connected.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/community"
                className="bg-gradient-to-r from-[#FF9000] to-[#FFA100] hover:from-[#FFA100] hover:to-[#FFDD00] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <Users className="h-5 w-5" />
                Join Community
              </a>
              <a
                href="/help"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 border border-white/20 flex items-center justify-center gap-2"
              >
                <HelpCircle className="h-5 w-5" />
                Help Center
              </a>
              <a
                href="/partnerships"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 border border-white/20 flex items-center justify-center gap-2"
              >
                <Building2 className="h-5 w-5" />
                Partnerships
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
