import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, BrainCircuit, Code, Users } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <div className="absolute inset-0 -z-10 h-full w-full bg-transparent bg-[radial-gradient(#29ABE2_1px,transparent_1px)] [background-size:32px_32px]"></div>
          <div className="absolute top-1/2 left-1/2 -z-20 -translate-x-1/2 -translate-y-1/2">
            <div className="w-[40vw] h-[40vw] max-w-xl max-h-xl bg-primary/20 rounded-full blur-3xl" />
          </div>

          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-500">
            Assemble Your Dream Team
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-400">
            HackMate is the ultimate platform to discover skilled developers, designers, and innovators for your next hackathon. Leverage AI to build a winning team.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/signup">Find Teammates Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </section>

        <section id="features" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-headline font-bold text-center">Why HackMate?</h2>
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
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} HackMate. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string; }) {
  return (
    <Card className="bg-card/60 backdrop-blur-lg border-border/50 transition-all duration-300 hover:border-primary/50 hover:scale-105">
      <CardContent className="p-6 text-center">
        <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-headline font-semibold">{title}</h3>
        <p className="mt-2 text-gray-400">{description}</p>
      </CardContent>
    </Card>
  );
}
