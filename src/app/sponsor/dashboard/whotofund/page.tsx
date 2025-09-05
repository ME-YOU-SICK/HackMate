"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Users, 
  Building2, 
  Lightbulb, 
  Heart, 
  Target, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Globe,
  Award,
  Search,
  Filter,
  ArrowRight,
  Star,
  Building,
  GraduationCap,
  Users2,
  Briefcase,
  HandHeart
} from "lucide-react";
import Link from "next/link";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

const WhoToFundGuide = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [selectedOrganizerType, setSelectedOrganizerType] = useState<string | null>(null);

  const organizerTypes = [
    {
      id: "university",
      title: "University Hackathons",
      icon: <GraduationCap className="h-6 w-6" />,
      overview: "Run by student clubs, university innovation centers, or academic institutions. Typically large, vibrant, and grassroots.",
      strengths: [
        "Access to young, diverse, and motivated talent",
        "High energy and community-driven",
        "Lower cost of sponsorship compared to corporate or industry events"
      ],
      bestFor: [
        "Recruit top early-career tech talent",
        "Build brand recognition among the next generation of developers",
        "Introduce APIs, SDKs, or tools to students for long-term adoption"
      ],
      watchouts: [
        "Less polished organization than corporate-led events",
        "Short-term measurable ROI (hiring/partnerships) may be lower"
      ],
      color: "bg-[#FFA100]"
    },
    {
      id: "community",
      title: "Independent / Community-Led Hackathons",
      icon: <Users2 className="h-6 w-6" />,
      overview: "Run by independent organizers or tech communities (local meetups, grassroots groups, or nonprofits).",
      strengths: [
        "Niche and passionate communities (e.g., AI, Web3, climate tech)",
        "Authentic engagement with developers who want to build",
        "Flexibility in collaboration and branding opportunities"
      ],
      bestFor: [
        "Reach hobbyist and professional developers directly",
        "Test product adoption in highly technical communities",
        "Build goodwill and credibility with grassroots tech ecosystems"
      ],
      watchouts: [
        "Highly variable in size, professionalism, and impact",
        "Requires careful vetting of organizer credibility"
      ],
      color: "bg-[#FF9000]"
    },
    {
      id: "corporate",
      title: "Corporate-Led Hackathons",
      icon: <Building2 className="h-6 w-6" />,
      overview: "Organized by tech companies or consulting firms, often around a proprietary platform or business challenge.",
      strengths: [
        "Highly structured and professionally executed",
        "Direct alignment with business or product adoption goals",
        "Post-event integration opportunities (incubation, partnerships)"
      ],
      bestFor: [
        "Push adoption of their APIs, platforms, or services",
        "Solve specific industry challenges with crowdsourced innovation",
        "Build partnerships with other corporations and industry leaders"
      ],
      watchouts: [
        "Attendee pool may be narrower (less grassroots, more industry-focused)",
        "Higher sponsorship costs"
      ],
      color: "bg-[#FFA100]"
    },
    {
      id: "accelerator",
      title: "Accelerator & Incubator Hackathons",
      icon: <Lightbulb className="h-6 w-6" />,
      overview: "Hosted by startup accelerators, incubators, or VCs to surface investable ideas and teams.",
      strengths: [
        "High concentration of startup-minded participants",
        "Projects may evolve into real companies",
        "Opportunity for co-investment, partnerships, or acquisitions"
      ],
      bestFor: [
        "Identify and invest in high-potential startups early",
        "Build strategic alliances with accelerators/VCs",
        "Foster innovation in emerging markets or technologies"
      ],
      watchouts: [
        "Smaller scale compared to university/community hackathons",
        "Sponsorship often requires deeper financial or mentorship commitments"
      ],
      color: "bg-[#FF9000]"
    },
    {
      id: "government",
      title: "Government & NGO Hackathons",
      icon: <HandHeart className="h-6 w-6" />,
      overview: "Organized around civic tech, public services, or social good initiatives.",
      strengths: [
        "Mission-driven, high social impact visibility",
        "Attracts multidisciplinary participants (not just coders)",
        "Strong media and PR opportunities"
      ],
      bestFor: [
        "Position themselves as leaders in CSR (Corporate Social Responsibility)",
        "Build relationships with government, NGOs, or social sectors",
        "Support societal challenges (climate, healthcare, education)"
      ],
      watchouts: [
        "Less focus on commercial ROI or product adoption",
        "Outcomes often policy or research-oriented, not market-ready"
      ],
      color: "bg-[#FF9000]"
    }
  ];

  const evaluationCriteria = [
    {
      title: "Alignment with Goals",
      description: "Does the hackathon's focus (talent, product adoption, PR, social impact) match your objectives?",
      icon: <Target className="h-5 w-5" />
    },
    {
      title: "Organizer Credibility",
      description: "Does the organizer have a track record of delivering successful events?",
      icon: <Award className="h-5 w-5" />
    },
    {
      title: "Audience Fit",
      description: "Are participants the demographic you want to reach (students, professionals, entrepreneurs)?",
      icon: <Users className="h-5 w-5" />
    },
    {
      title: "Event Scale & Reach",
      description: "Local, regional, national, or global?",
      icon: <Globe className="h-5 w-5" />
    },
    {
      title: "Post-Event Continuity",
      description: "Will projects live beyond the hackathon (incubation, adoption, partnerships)?",
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      title: "ROI Measurement",
      description: "How will you measure success: hires, leads, usage, PR impressions, partnerships?",
      icon: <CheckCircle className="h-5 w-5" />
    }
  ];

  const sponsorFitMatrix = [
    {
      sponsorType: "Tech Companies (APIs, SDKs, SaaS)",
      suitableOrganizers: "University, Community, Corporate",
      roiPotential: "High",
      roiColor: "text-green-600 dark:text-green-400",
      description: "product adoption + branding"
    },
    {
      sponsorType: "Recruiters / Employers",
      suitableOrganizers: "University, Community",
      roiPotential: "High",
      roiColor: "text-green-600 dark:text-green-400",
      description: "talent acquisition"
    },
    {
      sponsorType: "Consultancies / Corporates",
      suitableOrganizers: "Corporate, Accelerator, Government",
      roiPotential: "Medium–High",
      roiColor: "text-neutral-600 dark:text-neutral-400",
      description: "innovation + partnerships"
    },
    {
      sponsorType: "VCs / Investors",
      suitableOrganizers: "Accelerator, Community, University",
      roiPotential: "High",
      roiColor: "text-green-600 dark:text-green-400",
      description: "deal flow, startup pipeline"
    },
    {
      sponsorType: "Brands (Non-Tech)",
      suitableOrganizers: "University, Government/NGO",
      roiPotential: "Medium",
      roiColor: "text-yellow-600 dark:text-yellow-400",
      description: "brand visibility + CSR"
    },
    {
      sponsorType: "Foundations / Philanthropy",
      suitableOrganizers: "Government/NGO, Community",
      roiPotential: "High",
      roiColor: "text-green-600 dark:text-green-400",
      description: "social impact, reputation"
    }
  ];

  const sections = [
    { id: "introduction", title: "Introduction", icon: <BookOpen className="h-4 w-4" /> },
    { id: "organizer-types", title: "Organizer Types", icon: <Building className="h-4 w-4" /> },
    { id: "evaluation", title: "Evaluation Criteria", icon: <Search className="h-4 w-4" /> },
    { id: "fit-matrix", title: "Sponsor-Organizer Fit", icon: <Target className="h-4 w-4" /> },
    { id: "conclusion", title: "Conclusion", icon: <CheckCircle className="h-4 w-4" /> }
  ];

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full h-screen border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      <DashboardSidebar userRole="sponsor" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-[#FF9000]" />
                WhoToFund Guide
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                A Sponsor's Blueprint for Choosing the Right Hackathon Organizers
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/sponsor/dashboard"
                className="px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar Navigation */}
          <div className="w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-700 p-4 overflow-y-auto">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? "bg-[#FAF000]/10 dark:bg-[#FAF000]/20 text-[#FFA100] dark:text-[#FFDD00]"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  {section.icon}
                  <span className="text-sm font-medium">{section.title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              {activeSection === "introduction" && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                      Introduction
                    </h2>
                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        Sponsoring a hackathon can yield powerful returns—brand visibility, talent acquisition, 
                        product adoption, or market insights. However, not all hackathons deliver the same value. 
                        The key to maximizing ROI lies in aligning your goals with the right type of organizer.
                      </p>
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mt-4">
                        This guide breaks down the major categories of hackathon organizers, what they offer, 
                        and which sponsors stand to benefit most.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#FAF000]/5 dark:bg-[#FAF000]/10 border border-[#FAF000] dark:border-[#FF9000] rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 rounded-lg">
                        <Lightbulb className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#FF9000] dark:text-[#FFDD00] mb-2">
                          Key Insight
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                          Think of hackathons not as one-off events, but as ecosystem-building opportunities. 
                          Choose wisely, and the ROI will extend far beyond the weekend.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "organizer-types" && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
                      Types of Hackathon Organizers
                    </h2>
                    
                    <div className="grid gap-4 mb-6">
                      {organizerTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setSelectedOrganizerType(
                            selectedOrganizerType === type.id ? null : type.id
                          )}
                          className={`p-4 rounded-lg border transition-all text-left ${
                            selectedOrganizerType === type.id
                              ? "border-[#FFA100] bg-[#FAF000]/5 dark:bg-[#FAF000]/10"
                              : "border-neutral-200 dark:border-neutral-700 hover:border-[#FFDD00] dark:hover:border-[#FF9000]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${type.color} text-white`}>
                              {type.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-neutral-900 dark:text-white">
                                {type.title}
                              </h3>
                              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                                {type.overview}
                              </p>
                            </div>
                            <ArrowRight className={`h-4 w-4 transition-transform ${
                              selectedOrganizerType === type.id ? "rotate-90" : ""
                            }`} />
                          </div>
                        </button>
                      ))}
                    </div>

                    {selectedOrganizerType && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-neutral-200 dark:border-neutral-700 pt-6"
                      >
                        {(() => {
                          const type = organizerTypes.find(t => t.id === selectedOrganizerType);
                          if (!type) return null;
                          
                          return (
                            <div className="space-y-6">
                              <div>
                                <h4 className="font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  Strengths
                                </h4>
                                <ul className="space-y-2">
                                  {type.strengths.map((strength, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                      {strength}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                                  <Target className="h-4 w-4 text-[#FFA100]" />
                                  Best For Sponsors Who Want To
                                </h4>
                                <ul className="space-y-2">
                                  {type.bestFor.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                      <div className="w-1.5 h-1.5 bg-[#FFA100] rounded-full mt-2 flex-shrink-0" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                  Watchouts
                                </h4>
                                <ul className="space-y-2">
                                  {type.watchouts.map((watchout, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                                      {watchout}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          );
                        })()}
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {activeSection === "evaluation" && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
                      Key Evaluation Criteria for Sponsors
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                      When assessing organizers, sponsors should ask these critical questions:
                    </p>
                    
                    <div className="grid gap-4">
                      {evaluationCriteria.map((criteria, index) => (
                        <div key={index} className="p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 rounded-lg">
                              <div className="text-neutral-600 dark:text-neutral-400">
                                {criteria.icon}
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                                {criteria.title}
                              </h3>
                              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                {criteria.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "fit-matrix" && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
                      Sponsor–Organizer Fit Matrix
                    </h2>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-neutral-200 dark:border-neutral-700">
                            <th className="text-left py-3 px-4 font-semibold text-neutral-900 dark:text-white">
                              Sponsor Type
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-neutral-900 dark:text-white">
                              Most Suitable Organizers
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-neutral-900 dark:text-white">
                              ROI Potential
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-neutral-900 dark:text-white">
                              Focus Area
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {sponsorFitMatrix.map((row, index) => (
                            <tr key={index} className="border-b border-neutral-100 dark:border-neutral-700">
                              <td className="py-3 px-4 text-sm font-medium text-neutral-900 dark:text-white">
                                {row.sponsorType}
                              </td>
                              <td className="py-3 px-4 text-sm text-neutral-600 dark:text-neutral-400">
                                {row.suitableOrganizers}
                              </td>
                              <td className="py-3 px-4">
                                <span className={`text-sm font-medium ${row.roiColor}`}>
                                  {row.roiPotential}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-sm text-neutral-600 dark:text-neutral-400">
                                {row.description}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "conclusion" && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                      Conclusion
                    </h2>
                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        Not all hackathons are created equal—and not all sponsors need the same outcomes. 
                        The most successful partnerships come when sponsors fund organizers whose mission 
                        aligns with their strategic goals.
                      </p>
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mt-4">
                        Think of hackathons not as one-off events, but as ecosystem-building opportunities. 
                        Choose wisely, and the ROI will extend far beyond the weekend.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#FAF000]/5 dark:bg-[#FAF000]/10 border border-[#FAF000] dark:border-[#FF9000] rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#FAF000]/10 dark:bg-[#FAF000]/20 rounded-lg">
                        <Star className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#FF9000] dark:text-[#FFDD00] mb-2">
                          Ready to Find Your Perfect Match?
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                          Use this guide to identify the right hackathon organizers for your sponsorship goals.
                        </p>
                        <Link
                          href="/sponsor/dashboard/invitations"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF9000] text-white rounded-lg hover:bg-[#FFA100] transition-colors text-sm"
                        >
                          Discover Organizers
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoToFundGuide;
