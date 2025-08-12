import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Mountain } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
      )}
    >
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Mountain className="h-6 w-6" />
          <span className="font-bold sm:inline-block">HackMate</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/#participants"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Find Events
          </Link>
          <Link
            href="/#organizers"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            How it Works
          </Link>
          <Link
            href="/#testimonials"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Testimonials
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button asChild variant="ghost">
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
