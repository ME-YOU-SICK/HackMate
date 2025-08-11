'use server';

/**
 * @fileOverview A teammate suggestion AI agent.
 *
 * - suggestTeammates - A function that handles the teammate suggestion process.
 * - SuggestTeammatesInput - The input type for the suggestTeammates function.
 * - SuggestTeammatesOutput - The return type for the suggestTeammates function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTeammatesInputSchema = z.object({
  userSkills: z
    .array(z.string())
    .describe('A list of skills possessed by the user.'),
  userExperience: z.string().describe('The experience level of the user.'),
  userTechStack: z
    .array(z.string())
    .describe('A list of technologies the user is familiar with.'),
  desiredTeamSize: z
    .number()
    .min(1)
    .max(5)
    .describe('The desired number of teammates.'),
  hackathonDescription: z
    .string()
    .describe('A description of the hackathon project.'),
});
export type SuggestTeammatesInput = z.infer<typeof SuggestTeammatesInputSchema>;

const SuggestTeammatesOutputSchema = z.object({
  suggestedTeammates: z
    .array(z.string())
    .describe(
      'A list of potential teammates with complementary skills and experience.'
    ),
  reasoning: z
    .string()
    .describe('The reasoning behind the teammate suggestions.'),
});
export type SuggestTeammatesOutput = z.infer<typeof SuggestTeammatesOutputSchema>;

export async function suggestTeammates(
  input: SuggestTeammatesInput
): Promise<SuggestTeammatesOutput> {
  return suggestTeammatesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTeammatesPrompt',
  input: {schema: SuggestTeammatesInputSchema},
  output: {schema: SuggestTeammatesOutputSchema},
  prompt: `You are an AI assistant that suggests teammates for a user participating in a hackathon.

  The user has the following skills: {{#each userSkills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  The user has the following experience level: {{{userExperience}}}
  The user is familiar with the following technologies: {{#each userTechStack}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  The user desires a team size of: {{{desiredTeamSize}}}
  The hackathon project is described as: {{{hackathonDescription}}}

  Suggest potential teammates with complementary skills and experience to form a well-rounded team.
  Explain the reasoning behind your suggestions.
  Respond in the following format:
  {
    "suggestedTeammates": ["teammate1", "teammate2"],
    "reasoning": "explanation"
  }`,
});

const suggestTeammatesFlow = ai.defineFlow(
  {
    name: 'suggestTeammatesFlow',
    inputSchema: SuggestTeammatesInputSchema,
    outputSchema: SuggestTeammatesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
