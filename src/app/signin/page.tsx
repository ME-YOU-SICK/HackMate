"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BackgroundPaths } from "@/components/ui/background-paths"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type UserRole } from "@/lib/auth"
import { useAuth } from "@/contexts/AuthContext"

export default function SigninPage() {
  const router = useRouter()
  const { signin } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "participant" as UserRole,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Use database authentication
      const result = await signin({
        email: formData.email,
        password: formData.password,
        role: formData.role,
      })

      if (result.success) {
        router.push(`/${formData.role}/dashboard`)
      } else {
        setError(result.error || "Sign in failed. Please check your credentials.")
      }
    } catch (error) {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex w-full">
      <div className="hidden lg:flex lg:w-1/2 relative">
        <BackgroundPaths title="Welcome back" />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-black p-8">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FAF000] to-[#FFDD00] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-white font-semibold text-2xl">HackMate</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Sign in to your account</h1>
            <p className="text-white/70">Frontend-only mock authentication</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-white/90 mb-2 block">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#FAF000]"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-white/90 mb-2 block">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#FAF000]"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <Label className="text-white/90 mb-3 block">Continue as:</Label>
              <div className="grid grid-cols-2 gap-3">
                {(["participant","organizer","recruiter","sponsor"] as UserRole[]).map((role) => (
                  <label
                    key={role}
                    className={`relative flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-all ${
                      formData.role === role ? "border-[#FAF000] bg-[#FAF000]/10" : "border-white/20 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={formData.role === role}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span className="text-white font-medium capitalize">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#FFA100] to-[#FFA100] hover:from-[#FF9000] hover:to-[#FFDD00] text-white py-3 text-lg font-semibold rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-white/70">
              Don't have an account? {""}
              <Link href="/signup" className="text-[#FAF000] hover:text-[#FFDD00] transition-colors font-medium">
                Create one
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
