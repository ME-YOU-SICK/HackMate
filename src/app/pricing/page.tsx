"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Heart, 
  Gift, 
  Users, 
  Zap, 
  Shield, 
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black w-full">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF9000]/20 border border-[#FF9000]/30 rounded-full text-[#FAF000] text-sm font-medium mb-6">
              <Heart className="h-4 w-4" />
              <span>100% Free Forever</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              HackMate is
              <span className="block bg-gradient-to-r from-[#FAF000] via-[#FFDD00] to-[#FF9000] bg-clip-text text-transparent">
                Completely Free
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              We believe in democratizing hackathon innovation. Our platform is free for everyone, 
              powered by the community and generous donations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Free Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need, Always Free
            </h2>
            <p className="text-lg text-white/70">
              No hidden costs, no premium tiers, no limitations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Participants */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF9000] to-[#FFA100] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">For Participants</h3>
                <p className="text-white/70">Join hackathons, build teams, showcase skills</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="h-5 w-5 text-[#FAF000]" />
                  <span>Unlimited hackathon participation</span>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="h-5 w-5 text-[#FAF000]" />
                  <span>Team formation & collaboration tools</span>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="h-5 w-5 text-[#FAF000]" />
                  <span>Skills tracking & learning paths</span>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="h-5 w-5 text-[#FAF000]" />
                  <span>GitHub integration & portfolio</span>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="h-5 w-5 text-[#FAF000]" />
                  <span>Networking & messaging</span>
                </li>
              </ul>
              <Link href="/signup?role=participant">
                <button className="w-full bg-[#FF9000] hover:bg-[#FFA100] text-white font-semibold py-3 px-6 rounded-xl transition-colors">
                  Join as Participant
                </button>
              </Link>
            </motion.div>

            {/* Organizers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FFA100] to-[#FFDD00] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">For Organizers</h3>
                <p className="text-white/70">Host events, manage teams, track progress</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="h-5 w-5 text-[#FAF000]" />
                  <span>Unlimited event hosting</span>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="h-5 w-5 text-[#FAF000]" />
                  <span>Team management & analytics</span>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="h-5 w-5 text-[#FAF000]" />
                  <span>Sponsor & partnership tools</span>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="h-5 w-5 text-[#FAF000]" />
                  <span>Real-time event monitoring</span>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="h-5 w-5 text-[#FAF000]" />
                  <span>Custom branding & themes</span>
                </li>
              </ul>
              <Link href="/signup?role=organizer">
                <button className="w-full bg-[#FFA100] hover:bg-[#FFDD00] text-white font-semibold py-3 px-6 rounded-xl transition-colors">
                  Host an Event
                </button>
              </Link>
            </motion.div>

            {/* Recruiters & Sponsors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">For Recruiters & Sponsors</h3>
                <p className="text-white/70">Discover talent, sponsor events, build partnerships</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="h-5 w-5 text-[#FAF000]" />
                  <span>Access to top talent pool</span>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="h-5 w-5 text-[#FAF000]" />
                  <span>Event sponsorship opportunities</span>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="h-5 w-5 text-[#FAF000]" />
                  <span>Advanced candidate filtering</span>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="h-5 w-5 text-[#FAF000]" />
                  <span>Analytics & insights dashboard</span>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="h-5 w-5 text-[#FAF000]" />
                  <span>Direct messaging & outreach</span>
                </li>
              </ul>
              <div className="space-y-4">
                <Link href="/signup?role=recruiter">
                  <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors">
                    Join as Recruiter
                  </button>
                </Link>
                <Link href="/signup?role=sponsor">
                  <button className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-colors border border-white/20">
                    Become a Sponsor
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Verification Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF9000]/20 to-[#FFA100]/20 border border-[#FF9000]/30 rounded-full text-[#FAF000] text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              <span>Premium Verification</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Get Verified & Build Trust
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Stand out with a verified badge that shows you're a trusted member of the community. 
              Help keep HackMate running while building credibility.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-6"
            >
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FFA100] to-[#FF9000] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">Enhanced Credibility</h3>
                    <p className="text-white/70">Get a verified badge that makes your profile stand out and builds instant trust with other users.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FFA100] to-[#FFDD00] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">Priority Support</h3>
                    <p className="text-white/70">Get faster response times and priority access to new features and beta programs.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">Better Networking</h3>
                    <p className="text-white/70">Verified users get priority in team matching and access to exclusive networking events.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Pricing Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#FF9000]/20 to-[#FFA100]/20 border border-[#FF9000]/30 rounded-3xl p-8 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF9000]/5 to-[#FFA100]/5"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF9000]/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#FFA100]/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Verified Account</h3>
                    <p className="text-white/70">Monthly verification subscription</p>
                  </div>

                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-bold text-white">$2</span>
                      <span className="text-white/60 text-lg">/month</span>
                    </div>
                    <p className="text-white/60 text-sm mt-2">Support the platform & get verified</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-white/80">
                      <CheckCircle className="h-5 w-5 text-[#FAF000]" />
                      <span>Verified badge on your profile</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                      <CheckCircle className="h-5 w-5 text-[#FAF000]" />
                      <span>Priority in team matching</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                      <CheckCircle className="h-5 w-5 text-[#FAF000]" />
                      <span>Faster customer support</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                      <CheckCircle className="h-5 w-5 text-[#FAF000]" />
                      <span>Early access to new features</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                      <CheckCircle className="h-5 w-5 text-[#FAF000]" />
                      <span>Exclusive networking opportunities</span>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-[#FF9000] to-[#FFA100] hover:from-[#FFA100] hover:to-[#FFDD00] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2">
                    <Shield className="h-5 w-5" />
                    Get Verified Now
                    <ArrowRight className="h-5 w-5" />
                  </button>

                  <p className="text-center text-white/50 text-xs mt-4">
                    Helps keep HackMate free for everyone
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#FF9000]/10 via-[#FFA100]/10 to-[#FFDD00]/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF9000]/20 to-[#FFA100]/20 border border-[#FF9000]/30 rounded-full text-[#FAF000] text-sm font-medium mb-6">
              <Gift className="h-4 w-4" />
              <span>Support Our Mission</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Help Us Keep HackMate Free
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              HackMate is completely free and always will be. We're powered by donations from 
              the community who believes in democratizing hackathon innovation. Every contribution 
              helps us maintain and improve the platform.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <Shield className="h-8 w-8 text-[#FAF000] mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">No Ads, No Tracking</h3>
                <p className="text-white/70 text-sm">Your privacy is protected. No data selling or intrusive advertising.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <Sparkles className="h-8 w-8 text-[#FFA100] mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Community Driven</h3>
                <p className="text-white/70 text-sm">Built by developers, for developers. Features are community-requested.</p>
              </div>
            </div>

            <div className="flex justify-center">
              <button className="bg-gradient-to-r from-[#FF9000] to-[#FFA100] hover:from-[#FFA100] hover:to-[#FFDD00] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2">
                <Heart className="h-5 w-5" />
                Donate Now
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
