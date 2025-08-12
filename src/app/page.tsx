import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BrainCircuit, Code, Users } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
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
        <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
          <div className="absolute inset-0 z-0 animated-gradient bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-blue-900/50 dark:to-purple-900/50"></div>
          <div 
            className="absolute -top-40 -left-40 w-96 h-96 bg-purple-200/50 dark:bg-purple-900/50 rounded-full blur-3xl opacity-50 animate-pulse" 
            aria-hidden="true"
          />
           <div 
            className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-200/50 dark:bg-blue-900/50 rounded-full blur-3xl opacity-50 animate-pulse" 
            aria-hidden="true"
          />

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
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
          </div>
        </section>

        <section id="features" className="py-20 bg-background/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">Why HackMate?</h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Everything you need to succeed at your next hackathon, from finding the right people to seamless collaboration.</p>
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
    <div className="bg-card p-8 rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}
