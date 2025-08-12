
"use client";

import { cn } from '@/lib/utils';

export function AnimatedLogo() {
  return (
    <div
      className={cn(
        "relative flex h-28 md:h-40 items-center justify-center font-sora"
      )}
      aria-label="HackMate"
    >
      <div className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-400 to-white animated-gradient">
        HACKMATE
      </div>
    </div>
  );
}
