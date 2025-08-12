
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
const allSymbols = Object.values(symbolMap).flat();

const fonts = ['font-sora', 'font-space-mono', 'font-sans', 'font-vt323'];

export function AnimatedLogo() {
  const [letters, setLetters] = useState(originalText.split(''));
  const [fontIndex, setFontIndex] = useState(0);

  useEffect(() => {
    const fontInterval = setInterval(() => {
      setFontIndex(prevIndex => (prevIndex + 1) % fonts.length);
    }, 2500); // Cycle font every 2.5 seconds

    const letterInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * originalText.length);
        const originalChar = originalText[randomIndex];

        if (symbolMap[originalChar]) {
             setLetters(currentLetters => {
                const newLetters = [...currentLetters];
                // Check if it's already a symbol, if so revert to original
                if (allSymbols.includes(newLetters[randomIndex])) {
                    newLetters[randomIndex] = originalChar;
                } else {
                    const symbols = symbolMap[originalChar];
                    newLetters[randomIndex] = symbols[Math.floor(Math.random() * symbols.length)];
                }
                return newLetters;
            });
        }
        
         // Add a short delay then revert the character back
         setTimeout(() => {
             setLetters(currentLetters => {
                const newLetters = [...currentLetters];
                if (newLetters[randomIndex] !== originalText[randomIndex]) {
                    newLetters[randomIndex] = originalText[randomIndex];
                }
                return newLetters;
            });
        }, 1000);


    }, 1500); // Attempt a change every 1.5 seconds

    return () => {
      clearInterval(fontInterval);
      clearInterval(letterInterval);
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
      <div className="flex text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 animated-gradient">
        {letters.map((letter, index) => (
          <span
            key={index}
            className="relative inline-block transition-all duration-500 ease-in-out"
            style={{ minWidth: '0.6em', textAlign: 'center' }}
          >
              {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
