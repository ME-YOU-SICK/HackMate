
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
  const [displayText, setDisplayText] = useState(originalText);
  const [fontIndex, setFontIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        // Cycle through fonts
        setFontIndex(prevIndex => (prevIndex + 1) % fonts.length);
        
        // Scramble letters with a staggered effect
        originalText.split('').forEach((char, index) => {
            setTimeout(() => {
                setDisplayText(prev => {
                    const newText = prev.split('');
                    newText[index] = getRandomChar(char);
                    return newText.join('');
                });
                // After a short delay, revert back to original character
                setTimeout(() => {
                    setDisplayText(prev => {
                         const newText = prev.split('');
                         newText[index] = originalText[index];
                         return newText.join('');
                    });
                }, 200);
            }, index * 100); 
        });

    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "text-6xl md:text-8xl font-bold mb-8 transition-all duration-500 ease-in-out text-center flex items-center justify-center h-28 md:h-40",
        fonts[fontIndex]
      )}
      aria-label="HackMate"
    >
      {displayText.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-300 ease-in-out text-center"
          style={{ width: '0.8em' }} // Prevent layout shift by giving a fixed width based on em
        >
          {char}
        </span>
      ))}
    </div>
  );
}
