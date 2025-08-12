import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BrainCircuit, Code, Users } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <div 
            className="absolute -top-20 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 bg-primary/20 blur-3xl rounded-full" 
            aria-hidden="true"
          />
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
            Assemble Your Dream Team.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            HackMate is the ultimate platform to discover skilled developers, designers, and innovators for your next hackathon. Leverage AI to build a winning team.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">Find Teammates Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </section>

        <section id="features" className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">Why HackMate?</h2>
              <p className="mt-4 text-muted-foreground">Everything you need to succeed at your next hackathon.</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <FeatureCard
                icon={<Users className="h-8 w-8 text-primary" />}
                title="Participant Discovery"
                description="Browse profiles, filter by skills and experience, and connect with the best talent for your project."
              />
              <FeatureCard
                icon={<BrainCircuit className="h-8 w-8 text-primary" />}
                title="AI-Powered Matchmaking"
                description="Our intelligent algorithm suggests the most compatible teammates based on your project needs and personal profile."
              />
              <FeatureCard
                icon={<Code className="h-8 w-8 text-primary" />}
                title="Seamless Collaboration"
                description="Join hackathons with unique event codes, manage your team, and communicate with built-in messaging."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} HackMate. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string; }) {
  return (
    <div className="bg-background p-8 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}
