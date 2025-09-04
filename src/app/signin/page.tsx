"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BackgroundPaths } from "@/components/ui/background-paths"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { auth, type UserRole } from "@/lib/auth"

export default function SigninPage() {
  const router = useRouter()
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    auth.login({ email: formData.email, role: formData.role })
    router.push(`/${formData.role}/dashboard`)
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

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FFA100] to-[#FFA100] hover:from-[#FF9000] hover:to-[#FFDD00] text-white py-3 text-lg font-semibold rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Sign In
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
