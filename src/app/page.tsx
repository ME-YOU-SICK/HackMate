import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-950">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute left-0 top-0 -z-10 h-2/3 w-full bg-[radial-gradient(circle_400px_at_50%_300px,#29abe233,#6a5acd33,transparent)]"></div>

        {/* Animated Blobs */}
        <div className="absolute top-1/2 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2">
          <div className="absolute -inset-20 rounded-full bg-purple-500/30 opacity-20 blur-3xl animate-[blob-spin_15s_linear_infinite]"></div>
          <div className="absolute -inset-20 rounded-full bg-blue-500/30 opacity-20 blur-3xl animate-[blob-spin_12s_linear_infinite_reverse] [animation-delay:-4s]"></div>
          <div className="absolute -inset-20 rounded-full bg-orange-500/30 opacity-20 blur-3xl animate-[blob-spin_18s_linear_infinite] [animation-delay:-8s]"></div>
        </div>
      </div>

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4">
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
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/login">Log In</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
