"use client"

import Silk from "@/components/ui/silk"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Silk Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Silk
          speed={5}
          scale={1}
          color="#FF9000"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      
      {/* Enhanced Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 z-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF9000]/15 via-[#FFA100]/8 to-[#FAF000]/20 z-10 pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#FAF000] via-[#FFDD00] to-[#FF9000] rounded-3xl flex items-center justify-center shadow-2xl shadow-[#FF9000]/25">
              <span className="text-white font-bold text-4xl">H</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight relative">
            <span className="relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              The Future of
            </span>
            <span className="block bg-gradient-to-r from-[#FAF000] via-[#FFDD00] to-[#FF9000] bg-clip-text text-transparent relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              Hackathon Innovation
            </span>
            {/* Smooth faded shadow overlay - more contained */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/15 to-black/25 rounded-lg blur-[2px] -z-10 scale-105"></div>
          </h1>

          {/* Subheadline */}
          <div className="text-xl md:text-2xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed relative">
            <span className="relative z-10 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
              Connect, collaborate, and create amazing projects. Join the ultimate platform for hackathons, networking, and talent discovery.
            </span>
            {/* Subtle shadow overlay for better readability - more contained */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/8 to-black/15 rounded-lg blur-[1px] -z-10 scale-[1.02]"></div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/signup?role=participant">
              <button className="bg-[#FAF000] text-black hover:bg-[#FFDD00] px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                Join as Participant
              </button>
            </Link>
            <Link href="/signup?role=organizer">
              <button className="bg-gradient-to-r from-[#FF9000] to-[#FFA100] text-white hover:from-[#FFA100] hover:to-[#FFDD00] px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                Host an Event
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto relative">
            <div className="text-center relative">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">10K+</div>
              <div className="text-white/80 text-sm drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]">Active Participants</div>
            </div>
            <div className="text-center relative">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">500+</div>
              <div className="text-white/80 text-sm drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]">Hackathons Hosted</div>
            </div>
            <div className="text-center relative">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">50+</div>
              <div className="text-white/80 text-sm drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]">Partner Companies</div>
            </div>
            {/* Subtle background shadow for stats - more contained */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/3 to-black/10 rounded-lg blur-[1px] -z-10 scale-[1.02]"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-[#FAF000]/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
