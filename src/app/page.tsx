
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Code,
  Users,
  Network,
  CalendarCheck,
  Cpu,
  UserCheck,
  Trophy,
  Rocket,
  Heart,
  Mail,
} from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const chartData = [
  { name: '2020', total: 120 },
  { name: '2021', total: 180 },
  { name: '2022', total: 250 },
  { name: '2023', total: 320 },
  { name: '2024', total: 450 },
];

export default function Home() {
  const [heartFilled, setHeartFilled] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background text-white">
      <Header variant="landing" />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-screen w-full overflow-hidden">
          <div className="absolute inset-0 z-0 h-full w-full bg-slate-950">
            {/* Top-Center Blob */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                className="animate-blob-spin h-[90vw] w-[90vw] bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-purple-500/20"
                style={{ borderRadius: '58% 42% 67% 33% / 40% 55% 45% 60%' }}
              />
            </div>
             {/* Bottom-Right Blob */}
            <div className="absolute bottom-0 right-0 translate-x-2/3 translate-y-2/3">
               <div
                className="h-[60vw] w-[60vw] animate-blob-spin bg-gradient-to-tl from-orange-500/20 via-pink-500/20 to-purple-500/20 [animation-delay:-5s]"
                style={{ borderRadius: '67% 33% 58% 42% / 55% 45% 60% 40%' }}
              />
            </div>
            <div className="glitter-texture" />
          </div>

          <div className="container relative z-10 mx-auto flex h-full min-h-screen flex-col items-center justify-center px-4">
            <div className="animate-[fade-in-up_1s_ease-out] text-center">
              <h1 className="font-sora text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
                Connect. Build. Conquer.
              </h1>
              <p className="mt-4 max-w-3xl text-lg text-slate-300 md:text-xl">
                Pre, during, and post-hackathon — we make connections that build the future.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className={cn('warm-gradient text-white')}>
                  <Link href="/dashboard">Join Event</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* For Participants Section */}
        <section id="participants" className="bg-background py-20 sm:py-32">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center">
              <h2 className="font-sora text-4xl font-bold">For Participants</h2>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="border-border bg-card/50">
                <CardHeader>
                  <Users className="h-8 w-8 text-orange-400" />
                  <CardTitle className="pt-2 font-sora text-xl">
                    Meet Your Teammates Before the Hackathon
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card className="border-border bg-card/50">
                <CardHeader>
                  <Code className="h-8 w-8 text-orange-400" />
                  <CardTitle className="pt-2 font-sora text-xl">
                    Find the Right Skills for Your Project
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card className="border-border bg-card/50">
                <CardHeader>
                  <Network className="h-8 w-8 text-orange-400" />
                  <CardTitle className="pt-2 font-sora text-xl">Grow Your Professional Network</CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* For Organizers Section */}
        <section id="organizers" className="bg-secondary/20 py-20 sm:py-32">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center">
              <h2 className="font-sora text-4xl font-bold">For Organizers</h2>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="border-border bg-card/50">
                <CardHeader>
                  <CalendarCheck className="h-8 w-8 text-green-400" />
                  <CardTitle className="pt-2 font-sora text-xl">Seamless Event Onboarding</CardTitle>
                </CardHeader>
              </Card>
              <Card className="border-border bg-card/50">
                <CardHeader>
                  <Cpu className="h-8 w-8 text-green-400" />
                  <CardTitle className="pt-2 font-sora text-xl">AI-Assisted Team Formation</CardTitle>
                </CardHeader>
              </Card>
              <Card className="border-border bg-card/50">
                <CardHeader>
                  <UserCheck className="h-8 w-8 text-green-400" />
                  <CardTitle className="pt-2 font-sora text-xl">Better Participant Engagement</CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="bg-background py-20 sm:py-32">
          <div className="container mx-auto max-w-4xl px-4">
            <Card className="warm-gradient p-8 text-center text-white">
              <CardTitle className="font-sora text-3xl">
                We are here for change — just not the kind you get from a shopping mall.
              </CardTitle>
              <p className="mt-4 font-sora text-7xl font-bold">Free</p>
              <CardContent>
                <p className="mt-2 text-lg">We believe in opportunity, not paywalls.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-secondary/20 py-20 sm:py-32">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-3">
              <div className="flex flex-col items-center">
                <Cpu className="h-10 w-10 text-orange-400" />
                <p className="mt-2 font-semibold">AI-powered Team Matching</p>
              </div>
              <div className="flex flex-col items-center">
                <Users className="h-10 w-10 text-orange-400" />
                <p className="mt-2 font-semibold">Dynamic Profiles</p>
              </div>
              <div className="flex flex-col items-center">
                <Code className="h-10 w-10 text-orange-400" />
                <p className="mt-2 font-semibold">Event Code Join System</p>
              </div>
              <div className="flex flex-col items-center">
                <Rocket className="h-10 w-10 text-orange-400" />
                <p className="mt-2 font-semibold">Organizer Tools</p>
              </div>
              <div className="flex flex-col items-center">
                <Network className="h-10 w-10 text-orange-400" />
                <p className="mt-2 font-semibold">Post-event Networking</p>
              </div>
              <div className="flex flex-col items-center">
                <Trophy className="h-10 w-10 text-orange-400" />
                <p className="mt-2 font-semibold">Participant Achievements</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why This Matters Section */}
        <section id="why" className="bg-background py-20 sm:py-32">
          <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 md:grid-cols-2 md:items-center">
            <div>
              <Heart
                className={cn('h-10 w-10 text-orange-400 cursor-pointer transition-all', {
                  'fill-orange-400': heartFilled,
                })}
                onClick={() => setHeartFilled(!heartFilled)}
              />
              <h2 className="mt-4 font-sora text-4xl font-bold">Why This Matters</h2>
              <p className="mt-4 text-lg text-slate-400">
                For many students and aspiring developers, a hackathon is more than just a competition. It's a
                launchpad. It's the first taste of real-world collaboration, a chance to build something tangible, and a
                critical opportunity to get noticed by future employers. We built HackMate to break down the barriers
                to entry, ensuring that every participant, regardless of their background, can find a team where they
                can shine, innovate, and take the next step in their career.
              </p>
            </div>
            <div className="h-[400px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} className="fill-orange-400" />
                  </BarChart>
                </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section id="cta" className="bg-secondary/20 py-20 sm:py-32">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-sora text-4xl font-bold">Ready to Build the Future?</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className={cn('warm-gradient text-white')}>
                <Link href="/signup">Join Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="mailto:contact@hackmate.app">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
