"use client"

export function FeaturesSection() {
  const features = [
    {
      icon: "👥",
      title: "Smart Team Formation",
      description: "AI-powered algorithm matches participants based on skills, availability, and complementary strengths for optimal team composition."
    },
    {
      icon: "🎯",
      title: "Event Management",
      description: "Comprehensive tools for organizers to create, manage, and analyze hackathons with real-time participant engagement."
    },
    {
      icon: "🔍",
      title: "Talent Discovery",
      description: "Advanced search and filtering for recruiters to find top talent based on skills, projects, and hackathon performance."
    },
    {
      icon: "💼",
      title: "Sponsor Integration",
      description: "Seamless sponsor onboarding with engagement analytics, ROI tracking, and direct participant interaction tools."
    },
    {
      icon: "📊",
      title: "Analytics Dashboard",
      description: "Real-time insights into participation patterns, skill trends, and event success metrics for data-driven decisions."
    },
    {
      icon: "🚀",
      title: "GitHub Integration",
      description: "Automatic skill detection from repositories, portfolio building, and seamless project showcase capabilities."
    }
  ]

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-slate-900 to-black w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Everything You Need for
            <span className="block bg-gradient-to-r from-[#FAF000] via-[#FFDD00] to-[#FF9000] bg-clip-text text-transparent">
              Hackathon Success
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools and features needed to create, participate in, and benefit from hackathons.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:border-white/20 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-[#FAF000] to-[#FF9000] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">{feature.icon}</span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#FAF000] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF9000]/10 to-[#FAF000]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
