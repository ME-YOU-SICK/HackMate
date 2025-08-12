"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const fonts = ['font-sora', 'font-space-mono', 'font-vt323', 'font-sans'];

const symbolMap: { [key: string]: string[] } = {
  'H': ['H'],
  'A': ['A', 'Λ', '4'],
  'C': ['C', '(', '['],
  'K': ['K', 'Ҝ', 'Ʞ'],
  'M': ['M', '₥', 'ʍ'],
  'T': ['T', '⊤', '†'],
  'E': ['E', 'Σ', '3'],
};

const originalText = "HACKMATE";

const getRandomChar = (char: string) => {
  const replacements = symbolMap[char.toUpperCase()];
  if (!replacements) return char;
  return replacements[Math.floor(Math.random() * replacements.length)];
};

export function AnimatedLogo() {
  const [fontIndex, setFontIndex] = useState(0);
  const [displayText, setDisplayText] = useState(originalText);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fontInterval = setInterval(() => {
      setIsAnimating(true);
      
      // Scramble text
      let scrambleCount = 0;
      const scrambleInterval = setInterval(() => {
        setDisplayText(
          originalText
            .split('')
            .map(char => (Math.random() > 0.3 ? getRandomChar(char) : char))
            .join('')
        );
        scrambleCount++;
        if (scrambleCount > 5) {
          clearInterval(scrambleInterval);
          // Restore text and change font
          setDisplayText(originalText);
          setFontIndex(prevIndex => (prevIndex + 1) % fonts.length);
          setIsAnimating(false);
        }
      }, 80);

    }, 3000);

    return () => {
      clearInterval(fontInterval);
    };
  }, []);

  return (
    <h1
      className={cn(
        "text-6xl md:text-8xl font-bold tracking-widest mb-8 transition-all duration-500 ease-in-out text-center",
        fonts[fontIndex],
        isAnimating ? "opacity-80" : "opacity-100"
      )}
      aria-label="HackMate"
    >
      {displayText.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-200 ease-in-out"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {char}
        </span>
      ))}
    </h1>
  );
}