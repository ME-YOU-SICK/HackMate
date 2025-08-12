import { Mountain, Twitter, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900/80 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center space-x-2">
            <Mountain className="h-6 w-6 text-orange-500" />
            <span className="text-lg font-bold">HackMate</span>
          </div>
          <nav className="flex gap-4 text-sm text-slate-400">
            <Link href="/#participants" className="hover:text-white">
              For Participants
            </Link>
            <Link href="/#organizers" className="hover:text-white">
              For Organizers
            </Link>
            <Link href="/#testimonials" className="hover:text-white">
              Testimonials
            </Link>
            <Link href="#" className="hover:text-white">
              Terms of Service
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-slate-400 hover:text-white" />
            </Link>
            <Link href="#" aria-label="GitHub">
              <Github className="h-5 w-5 text-slate-400 hover:text-white" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-slate-400 hover:text-white" />
            </Link>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} HackMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
