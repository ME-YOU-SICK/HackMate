
'use server';

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI({
      // apiKey: process.env.GEMINI_API_KEY // Key is automatically read from environment
    }),
  ],
  logSinks: [], // Disable default logging for this simplified example
  enableTracingAndMetrics: false,
});
