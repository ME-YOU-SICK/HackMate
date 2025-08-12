
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const fonts = ['font-sora', 'font-space-mono', 'font-sans', 'font-vt323'];
const originalText = "HACKMATE";

export function AnimatedLogo() {
  const [fontIndex, setFontIndex] = useState(0);

  useEffect(() => {
    const fontInterval = setInterval(() => {
      setFontIndex(prevIndex => (prevIndex + 1) % fonts.length);
    }, 2500); // Cycle font every 2.5 seconds

    return () => {
      clearInterval(fontInterval);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative flex h-28 md:h-40 items-center justify-center transition-all duration-1000 ease-in-out",
        fonts[fontIndex]
      )}
      aria-label="HackMate"
    >
      <h1 className="text-6xl md:text-8xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 animated-gradient">
        {originalText}
      </h1>
    </div>
  );
}
