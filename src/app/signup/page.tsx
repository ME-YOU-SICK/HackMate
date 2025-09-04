"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { auth, type UserRole } from "@/lib/auth"
import { BackgroundPaths } from "@/components/ui/background-paths"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "participant"
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    // Mock auth: save user and redirect to role dashboard
    auth.login({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      role: formData.role as UserRole,
    })
    // Trigger onboarding for participant accounts
    if (formData.role === "participant") {
      try {
        localStorage.setItem("onboarding_pending", "participant");
      } catch {}
    }
    router.push(`/${formData.role}/dashboard`)
  }

  return (
    <div className="min-h-screen flex w-full">
      {/* Left Side - Background Paths */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <BackgroundPaths title="Join HackMate" />
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-black p-8">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-white font-semibold text-2xl">HackMate</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Create your account</h1>
            <p className="text-white/70">Join the ultimate hackathon platform</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-white/90 mb-2 block">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-white/90 mb-2 block">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-white/90 mb-2 block">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400"
                placeholder="john@example.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-white/90 mb-2 block">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword" className="text-white/90 mb-2 block">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Role Selection */}
            <div>
              <Label className="text-white/90 mb-3 block">I want to join as:</Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "participant", label: "Participant", icon: "👥" },
                  { value: "organizer", label: "Organizer", icon: "🎯" },
                  { value: "recruiter", label: "Recruiter", icon: "🔍" },
                  { value: "sponsor", label: "Sponsor", icon: "💼" }
                ].map((role) => (
                  <label
                    key={role.value}
                    className={`relative flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-all ${
                      formData.role === role.value
                        ? "border-blue-400 bg-blue-400/10"
                        : "border-white/20 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      checked={formData.role === role.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span className="text-2xl">{role.icon}</span>
                    <span className="text-white font-medium">{role.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 text-lg font-semibold rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Create Account
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-white/70">
              Already have an account?{" "}
              <Link href="/signin" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                Sign in
              </Link>
            </p>
          </div>

          {/* Terms */}
          <div className="mt-6 text-center">
            <p className="text-white/50 text-sm">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-white/70 hover:text-white transition-colors">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-white/70 hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
