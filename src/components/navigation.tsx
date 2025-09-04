"use client"

import { useState } from "react"
import Link from "next/link"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#FAF000] to-[#FF9000] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-white font-semibold text-xl">HackMate</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/#features" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              Features
            </Link>
            <Link href="/community?tab=events" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              Events
            </Link>
            <Link href="/pricing" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              Pricing
            </Link>
            <Link href="/partnerships" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              Partnerships
            </Link>
            <Link href="/contact" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/signin">
              <button className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                Sign In
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-[#FAF000] text-black hover:bg-[#FFDD00] transition-all duration-200 px-4 py-2 rounded-lg text-sm font-medium">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-white/80 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-4">
            <div className="flex flex-col space-y-4">
              <Link href="/#features" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                Features
              </Link>
              <Link href="/community?tab=events" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                Events
              </Link>
              <Link href="/pricing" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                Pricing
              </Link>
              <Link href="/partnerships" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                Partnerships
              </Link>
              <Link href="/contact" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                Contact
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-white/10">
                <Link href="/signin">
                  <button className="text-white/80 hover:text-white transition-colors text-sm font-medium w-full text-left">
                    Sign In
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="bg-[#FAF000] text-black hover:bg-[#FFDD00] transition-all duration-200 px-4 py-2 rounded-lg text-sm font-medium w-full">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
