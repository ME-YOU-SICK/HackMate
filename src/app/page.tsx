import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Code, Handshake, Lightbulb, Rocket, Users, Target, Shield, Award } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Logo />
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="hidden md:flex gap-4">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </nav>
             <Button asChild className="md:hidden">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden">
           <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-background opacity-50 z-[-1]"></div>
                 <div 
                    className="absolute w-[35vw] h-[35vw] rounded-full bg-gradient-to-tr from-rose-400 to-orange-300 opacity-60 dark:opacity-30 blur-3xl"
                    style={{ top: '50%', left: '5%', animation: 'blob-move-1 20s ease-in-out infinite alternate' }}>
                </div>
                <div 
                    className="absolute w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-purple-500 to-cyan-400 opacity-60 dark:opacity-30 blur-3xl"
                    style={{ top: '10%', left: '30%', animation: 'blob-move-2 24s ease-in-out infinite alternate' }}>
                </div>
                 <div 
                    className="absolute w-[35vw] h-[35vw] rounded-full bg-gradient-to-tr from-pink-500 to-yellow-400 opacity-50 dark:opacity-20 blur-3xl"
                    style={{ top: '40%', left: '60%', animation: 'blob-move-3 18s ease-in-out infinite alternate' }}>
                </div>
            </div>
           <div className="absolute inset-0 z-[1] bg-[url(/glitter.png)] bg-repeat opacity-[0.08] dark:opacity-[0.07]"></div>

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
              Where Great Teams Assemble.
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
              Pre, during, and post-hackathon — we make connections that build the future. Find your team, join events, and launch your next big idea with HackMate.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">Join an Event <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* For Participants Section */}
        <section className="py-20 bg-background/80">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight">For Participants</h2>
                    <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Build faster, learn more, and connect with a global community.</p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    <FeatureCard
                        icon={<Users className="h-8 w-8 text-primary" />}
                        title="Meet Your Teammates"
                        description="Connect with potential teammates before the hackathon even starts. Browse profiles and find the perfect match for your idea."
                    />
                    <FeatureCard
                        icon={<Target className="h-8 w-8 text-primary" />}
                        title="Find the Right Skills"
                        description="Our intelligent matching algorithm helps you discover participants with the exact technical and soft skills you need."
                    />
                    <FeatureCard
                        icon={<Handshake className="h-8 w-8 text-primary" />}
                        title="Grow Your Network"
                        description="Build lasting connections with fellow hackers, designers, and mentors that extend far beyond a single event."
                    />
                </div>
            </div>
        </section>

        {/* For Organizers Section */}
        <section className="py-20 bg-background/80">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight">For Organizers</h2>
                    <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Streamline your event and foster a more collaborative environment.</p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                     <FeatureCard
                        icon={<Rocket className="h-8 w-8 text-primary" />}
                        title="Seamless Event Onboarding"
                        description="Invite participants with a unique code and get everyone set up in minutes, not hours."
                    />
                    <FeatureCard
                        icon={<Lightbulb className="h-8 w-8 text-primary" />}
                        title="AI-Assisted Team Formation"
                        description="Empower your participants to form balanced, effective teams with our powerful matchmaking tools."
                    />
                    <FeatureCard
                        icon={<Award className="h-8 w-8 text-primary" />}
                        title="Better Participant Engagement"
                        description="Keep your hackers engaged with integrated communication and progress tracking features."
                    />
                </div>
            </div>
        </section>

         {/* Features Section */}
        <section id="features" className="py-20 bg-background/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Everything You Need to Succeed</h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">HackMate provides the tools for innovation and collaboration.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <MiniFeature title="Intelligent Team Matching" icon={<Lightbulb className="h-6 w-6 text-primary" />} />
                <MiniFeature title="Dynamic User Profiles" icon={<Users className="h-6 w-6 text-primary" />} />
                <MiniFeature title="Event Code Join System" icon={<Code className="h-6 w-6 text-primary" />} />
                <MiniFeature title="Powerful Organizer Tools" icon={<Shield className="h-6 w-6 text-primary" />} />
                <MiniFeature title="Post-event Networking" icon={<Handshake className="h-6 w-6 text-primary" />} />
                <MiniFeature title="Participant Achievements" icon={<Award className="h-6 w-6 text-primary" />} />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <Card className="text-center bg-gradient-to-br from-background to-muted/50 dark:from-card dark:to-muted/20 border-2 border-primary/20 shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl md:text-3xl font-bold">We are here for change — just not the kind you get from a shopping mall.</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-6xl md:text-8xl font-extrabold text-primary">Free</p>
                            <p className="text-muted-foreground text-lg">We believe in opportunity, not paywalls.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>


        {/* Why This Matters Section */}
        <section className="py-20 bg-background/80">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">Why This Matters</h2>
                        <p className="text-lg text-muted-foreground">
                            Hackathons are more than just coding competitions. They are launchpads for careers, breeding grounds for innovation, and catalysts for lifelong friendships. By breaking down the barrier of finding the right team, we empower more students and professionals to participate, innovate, and ultimately, get hired for their dream jobs.
                        </p>
                         <p className="text-lg text-muted-foreground">
                            We're building a world where a great idea is all you need to get started.
                        </p>
                    </div>
                    <div>
                        <img src="https://placehold.co/600x400.png" alt="Team collaborating" className="rounded-lg shadow-md" data-ai-hint="team collaboration" />
                    </div>
                </div>
            </div>
        </section>


        {/* Final CTA */}
        <section className="py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                 <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to Build Something Amazing?</h2>
                 <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
                    Join the most forward-thinking hackathon community today.
                 </p>
                 <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                     <Button size="lg" asChild>
                        <Link href="/signup">Join Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href="#">Contact Us</Link>
                    </Button>
                 </div>
            </div>
        </section>

      </main>

      <footer className="bg-background/80 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} HackMate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string; }) {
  return (
    <Card className="p-8 text-center bg-card/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </Card>
  );
}

function MiniFeature({ icon, title }: { icon: React.ReactNode; title: string; }) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-lg bg-card/50">
            {icon}
            <h4 className="text-md font-semibold">{title}</h4>
        </div>
    )
}

    
