import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users, Target, Rocket, Lightbulb, Award, Handshake, BrainCircuit, UserCheck, Code, Settings, MessageSquare, Trophy, CheckCircle } from 'lucide-react';
import { Logo } from '@/components/logo';
import Image from 'next/image';
import { AnimatedLogo } from '@/components/animated-logo';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Logo />
          <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
            <nav className="hidden md:flex gap-4">
              <Button variant="ghost" asChild>
                <Link href="#features">Features</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="#pricing">Pricing</Link>
              </Button>
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
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 z-0 grid place-items-center">
              <div className="absolute h-[500px] w-[500px] -translate-x-[50%] -translate-y-[50%] rounded-full bg-purple-500/30 opacity-50 blur-[150px] animate-blob-1"></div>
              <div className="absolute h-[300px] w-[600px] translate-x-[20%] translate-y-[30%] rounded-full bg-purple-700/30 opacity-40 blur-[120px] animate-blob-2"></div>
              <div className="absolute h-[400px] w-[400px] -translate-x-[25%] translate-y-[50%] rounded-full bg-blue-500/30 opacity-50 blur-[150px] animate-blob-3"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal>
              <AnimatedLogo />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-6 max-w-3xl mx-auto text-lg text-foreground/80 drop-shadow-sm">
                Pre, during, and post-hackathon — we make connections that build the future. Find your team, build your project, and launch your career.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/signup">Join an Event</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#features">Learn More <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Participants Section */}
        <section id="participants" className="py-20 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight">For Participants</h2>
                    <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Build faster, learn more, and connect with a global community of innovators.</p>
                </div>
              </ScrollReveal>
              <div className="mt-12 grid gap-8 md:grid-cols-3">
                  <ScrollReveal delay={0.1}>
                    <FeatureCard
                        icon={<Users className="h-8 w-8 text-primary" />}
                        title="Meet Your Teammates Before the Hackathon"
                        description="Browse profiles, filter by skills, and form your dream team before the clock even starts. Eliminate the stress of day-of team hunting."
                    />
                  </ScrollReveal>
                   <ScrollReveal delay={0.2}>
                    <FeatureCard
                        icon={<Target className="h-8 w-8 text-primary" />}
                        title="Find the Right Skills for Your Project"
                        description="Our intelligent matching algorithm helps you discover participants with the exact technical and soft skills you need to bring your idea to life."
                    />
                   </ScrollReveal>
                   <ScrollReveal delay={0.3}>
                    <FeatureCard
                        icon={<Handshake className="h-8 w-8 text-primary" />}
                        title="Grow Your Professional Network"
                        description="Build lasting connections with fellow hackers, designers, and mentors that extend far beyond a single event. Your next co-founder could be here."
                    />
                   </ScrollReveal>
                </div>
            </div>
        </section>

        {/* Organizers Section */}
        <section id="organizers" className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
               <ScrollReveal>
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight">For Organizers</h2>
                    <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Streamline your event, foster collaboration, and create an unforgettable experience.</p>
                </div>
                </ScrollReveal>
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                     <ScrollReveal delay={0.1}>
                      <FeatureCard
                          icon={<Rocket className="h-8 w-8 text-primary" />}
                          title="Seamless Event Onboarding"
                          description="Invite hundreds of participants with a single, unique event code. Get everyone set up and ready to hack in minutes, not hours."
                      />
                     </ScrollReveal>
                     <ScrollReveal delay={0.2}>
                      <FeatureCard
                          icon={<Lightbulb className="h-8 w-8 text-primary" />}
                          title="AI-Assisted Team Formation"
                          description="Empower your participants to form balanced, effective teams with our powerful matchmaking tools, ensuring better project outcomes."
                      />
                     </ScrollReveal>
                     <ScrollReveal delay={0.3}>
                      <FeatureCard
                          icon={<Award className="h-8 w-8 text-primary" />}
                          title="Better Participant Engagement"
                          description="Keep your hackers engaged with integrated communication channels, event updates, and simplified submission processes."
                      />
                     </ScrollReveal>
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">Everything You Need to Succeed</h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">HackMate provides a comprehensive suite of tools designed for the modern hackathon experience.</p>
                </div>
              </ScrollReveal>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  <ScrollReveal delay={0.1}><FeatureListItem icon={<BrainCircuit size={24} />} title="AI-powered Team Matching" description="Our algorithm suggests the best collaborators based on skills, experience, and project interests."/></ScrollReveal>
                  <ScrollReveal delay={0.2}><FeatureListItem icon={<UserCheck size={24} />} title="Dynamic Profiles" description="Showcase your projects, skills, and hackathon history to stand out to recruiters and teammates."/></ScrollReveal>
                  <ScrollReveal delay={0.3}><FeatureListItem icon={<Code size={24} />} title="Event Code Join System" description="A simple, secure 6-character code is all participants need to join your event instantly."/></ScrollReveal>
                  <ScrollReveal delay={0.4}><FeatureListItem icon={<Settings size={24} />} title="Organizer Tools" description="Manage participants, send announcements, and track team progress from a centralized dashboard."/></ScrollReveal>
                  <ScrollReveal delay={0.5}><FeatureListItem icon={<MessageSquare size={24} />} title="Post-event Networking" description="Keep the connections going. Follow users, message your team, and see who you'll meet at the next event."/></ScrollReveal>
                  <ScrollReveal delay={0.6}><FeatureListItem icon={<Trophy size={24} />} title="Participant Achievements" description="Earn badges for participation, winning, and specific skills, building your credibility in the community."/></ScrollReveal>
                </div>
            </div>
        </section>

        {/* Why This Matters Section */}
        <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <ScrollReveal>
                      <div className="space-y-4">
                          <h2 className="text-3xl font-bold tracking-tight">Why This Matters</h2>
                          <p className="text-lg text-muted-foreground">
                              Hackathons are more than just coding competitions; they are crucibles of innovation and career launchpads. Yet, too often, brilliant ideas falter and connections are missed because of one simple hurdle: finding the right people.
                          </p>
                          <p className="text-muted-foreground">
                              We built HackMate to tear down that barrier. By facilitating meaningful connections, we empower students and professionals to build groundbreaking projects, expand their networks, and ultimately, get hired for doing what they love. We believe that when the right minds meet, the future is rewritten.
                          </p>
                      </div>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                      <div className="relative h-80 rounded-lg overflow-hidden">
                          <Image src="https://placehold.co/600x400.png" alt="Team collaborating" layout="fill" objectFit="cover" className="transition-transform duration-300 hover:scale-105" data-ai-hint="team collaboration" />
                      </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                  <div className="max-w-2xl mx-auto text-center">
                      <Card>
                          <CardHeader>
                              <CardTitle className="text-2xl md:text-3xl">We are here for change — just not the kind you get from a shopping mall.</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                              <p className="text-6xl md:text-8xl font-bold text-primary">Free</p>
                              <CardDescription className="text-lg">We believe in opportunity, not paywalls.</CardDescription>
                              <ul className="space-y-2 text-muted-foreground text-left max-w-sm mx-auto">
                                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Unlimited Events</li>
                                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Unlimited Participants</li>
                                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> AI Team Matching</li>
                              </ul>
                          </CardContent>
                      </Card>
                  </div>
                </ScrollReveal>
            </div>
        </section>

        {/* Final CTA */}
        <section className="py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <ScrollReveal>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to Build Something Amazing?</h2>
                    <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
                        Join the most forward-thinking hackathon community today. Your next team is waiting.
                    </p>
                  </ScrollReveal>
                  <ScrollReveal delay={0.1}>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                        <Button size="lg" asChild>
                            <Link href="/signup">Join Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="mailto:support@hackmate.app">Contact Us</Link>
                        </Button>
                    </div>
                  </ScrollReveal>
            </div>
        </section>

      </main>

      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} HackMate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string; }) {
  return (
    <Card className="text-center bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 p-6">
      <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </Card>
  );
}

function FeatureListItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string; }) {
    return (
        <div className="flex gap-4">
            <div className="flex-shrink-0">{icon}</div>
            <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
        </div>
    )
}
