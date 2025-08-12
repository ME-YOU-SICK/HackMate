import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, GitBranch, PartyPopper, Search, Users } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <Header variant="landing" />
      <main className="flex-grow">
        <section className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden">
          <div className="absolute inset-0 -z-10 h-full w-full bg-slate-950">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute left-0 top-0 -z-10 h-2/3 w-full bg-[radial-gradient(circle_400px_at_50%_300px,#29abe233,#6a5acd33,transparent)]"></div>

            <div className="absolute top-1/2 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2">
              <div className="absolute -inset-20 animate-[blob-spin_15s_linear_infinite] rounded-full bg-purple-500/30 opacity-20 blur-3xl"></div>
              <div className="absolute -inset-20 animate-[blob-spin_12s_linear_infinite_reverse] rounded-full bg-blue-500/30 opacity-20 blur-3xl [animation-delay:-4s]"></div>
              <div className="absolute -inset-20 animate-[blob-spin_18s_linear_infinite] rounded-full bg-orange-500/30 opacity-20 blur-3xl [animation-delay:-8s]"></div>
            </div>
          </div>

          <div className="container mx-auto flex h-full flex-col items-center justify-center px-4">
            <div className="text-center">
              <h1 className="font-sora text-6xl font-bold tracking-tight text-white md:text-8xl">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-orange-500 bg-clip-text text-transparent">
                  HackMate
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-300 md:text-xl">
                The ultimate platform to discover hackathons, connect with innovators, and build winning teams.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-orange-500 text-white hover:bg-orange-600">
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/login">Log In</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* For Participants Section */}
        <section id="participants" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="font-sora text-4xl font-bold">For Participants</h2>
              <p className="mt-2 text-lg text-slate-400">Find your dream team and bring your ideas to life.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="border-slate-800 bg-slate-900/50">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                    <Users className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-sora text-2xl">Find Your Perfect Match</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">
                    Connect with like-minded developers, designers, and innovators based on skills and interests.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-slate-800 bg-slate-900/50">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                    <Code className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-sora text-2xl">Showcase Your Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">
                    Build a developer profile that highlights your projects, tech stack, and hackathon experience.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-slate-800 bg-slate-900/50">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
                    <PartyPopper className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-sora text-2xl">Win Big</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">
                    Join winning teams, create amazing projects, and take home the top prizes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* For Organizers Section */}
        <section id="organizers" className="bg-slate-900/80 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="font-sora text-4xl font-bold">For Organizers</h2>
              <p className="mt-2 text-lg text-slate-400">Host successful hackathons and discover top talent.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="border-slate-800 bg-slate-900">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                    <Search className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-sora text-2xl">Discover Talent</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">
                    Find the brightest minds and most promising innovators for your company or community.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-slate-800 bg-slate-900">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 text-red-400">
                    <GitBranch className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-sora text-2xl">Streamline Team Formation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">
                    Facilitate team building and ensure all your participants can contribute effectively.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-slate-800 bg-slate-900">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-400">
                    <PartyPopper className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-sora text-2xl">Boost Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">
                    Create a vibrant and collaborative environment that keeps participants excited and involved.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="font-sora text-4xl font-bold">Loved by Hackers Everywhere</h2>
              <p className="mt-2 text-lg text-slate-400">
                Don't just take our word for it. Here's what our users are saying.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-slate-800 bg-slate-900/50">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <Link href="/profile/sarah-d">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>SD</AvatarFallback>
                      </Avatar>
                    </Link>
                    <div>
                      <Link href="/profile/sarah-d" className="hover:underline">
                        <p className="font-bold">Sarah D.</p>
                      </Link>
                      <p className="text-sm text-slate-400">Frontend Developer</p>
                    </div>
                  </div>
                  <p className="mt-4 text-slate-300">
                    "HackMate is a game-changer. I found my team for the AI Hackathon in minutes and we ended up
                    winning first place!"
                  </p>
                </CardContent>
              </Card>
              <Card className="border-slate-800 bg-slate-900/50">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <Link href="/profile/mike-r">
                      <Avatar>
                        <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
                        <AvatarFallback>MR</AvatarFallback>
                      </Avatar>
                    </Link>
                    <div>
                      <Link href="/profile/mike-r" className="hover:underline">
                        <p className="font-bold">Mike R.</p>
                      </Link>
                      <p className="text-sm text-slate-400">Backend Engineer</p>
                    </div>
                  </div>
                  <p className="mt-4 text-slate-300">
                    "As a hackathon organizer, this platform is invaluable. It helps our participants connect and form
                    balanced teams."
                  </p>
                </CardContent>
              </Card>
              <Card className="border-slate-800 bg-slate-900/50">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <Link href="/profile/jessica-l">
                      <Avatar>
                        <AvatarImage src="https://github.com/nextjs.png" alt="@nextjs" />
                        <AvatarFallback>JL</AvatarFallback>
                      </Avatar>
                    </Link>
                    <div>
                      <Link href="/profile/jessica-l" className="hover:underline">
                        <p className="font-bold">Jessica L.</p>
                      </Link>
                      <p className="text-sm text-slate-400">UI/UX Designer</p>
                    </div>
                  </div>
                  <p className="mt-4 text-slate-300">
                    "I love being able to see people's past projects. It makes finding a team with the right creative
                    and technical fit so much easier."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
