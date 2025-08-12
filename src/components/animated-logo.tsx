
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const originalText = "HACKMATE";
const symbolMap: { [key: string]: string[] } = {
  'A': ['Λ', '4'],
  'E': ['Σ', '3'],
  'K': ['Ʞ'],
  'M': ['ʍ'],
  'T': ['†'],
};

// All possible symbols, to check if a character is a symbol
const allSymbols = Object.values(symbolMap).flat();

export function AnimatedLogo() {
  const [letters, setLetters] = useState(originalText.split(''));

  useEffect(() => {
    const interval = setInterval(() => {
      // Pick a random letter to change
      const randomIndex = Math.floor(Math.random() * originalText.length);
      const originalChar = originalText[randomIndex];
      const currentLetters = [...letters];

      // If the character has symbol replacements defined
      if (symbolMap[originalChar]) {
        // If it's already a symbol, revert it. Otherwise, pick a new symbol.
        if (allSymbols.includes(currentLetters[randomIndex])) {
          currentLetters[randomIndex] = originalChar;
        } else {
          const symbols = symbolMap[originalChar];
          currentLetters[randomIndex] = symbols[Math.floor(Math.random() * symbols.length)];
        }
        setLetters(currentLetters);

        // After a short delay, revert the character back to the original
        setTimeout(() => {
          setLetters(prev => {
            const newLetters = [...prev];
            if (newLetters[randomIndex] !== originalChar) {
              newLetters[randomIndex] = originalChar;
            }
            return newLetters;
          });
        }, 1000); 
      }
    }, 2000); // Attempt a change every 2 seconds

    return () => clearInterval(interval);
  }, [letters]);

  return (
    <div
      className={cn(
        "relative flex h-28 md:h-40 items-center justify-center font-sora"
      )}
      aria-label="HackMate"
    >
      <div className="flex text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 animated-gradient">
        {letters.map((letter, index) => (
          <span
            key={index}
            className="relative inline-block transition-all duration-500 ease-in-out"
            style={{ minWidth: '0.8em', textAlign: 'center' }} 
          >
              {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
