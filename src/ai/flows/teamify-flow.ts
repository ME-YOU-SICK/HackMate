
'use server';
/**
 * @fileOverview An AI flow for building the perfect hackathon team.
 * 
 * - teamify - A function that takes team requirements and returns a curated team.
 * - TeamifyInput - The input type for the teamify function.
 * - TeamifyOutput - The return type for the teamify function.
 */

import { ai } from '@/ai/genkit';
import { getConnections } from '@/services/user-data';
import { z } from 'zod';

// Define the input schema for the Teamify feature
export const TeamifyInputSchema = z.object({
  teamSize: z.number().int().positive().describe('The desired number of team members.'),
  techStack: z.array(z.string()).describe('The list of technologies the project will use.'),
  skills: z.array(z.string()).describe('The list of skills required from team members.'),
  projectIdea: z.string().optional().describe('An optional description of the project idea.'),
});
export type TeamifyInput = z.infer<typeof TeamifyInputSchema>;

// Define the output schema for the Teamify feature
export const TeamifyOutputSchema = z.object({
  team: z.array(z.object({
    name: z.string().describe('The full name of the selected team member.'),
    assignedRole: z.string().describe('The specific role assigned to this person (e.g., Frontend Developer, UI/UX Designer).'),
    reasoning: z.string().describe('A brief, one-sentence explanation of why this person was chosen for the role, highlighting their most relevant qualifications.'),
  })).describe('The list of selected team members.'),
  invitationMessage: z.string().describe("A friendly and concise message to send to the selected members, inviting them to join the team and briefly mentioning the project idea if provided."),
});
export type TeamifyOutput = z.infer<typeof TeamifyOutputSchema>;

// Define the main prompt for the AI model
const teamifyPrompt = ai.definePrompt({
  name: 'teamifyPrompt',
  input: {
    schema: z.object({
      teamSize: z.number(),
      techStack: z.array(z.string()),
      skills: z.array(z.string()),
      projectIdea: z.string().optional(),
      candidates: z.array(z.any()),
    }),
  },
  output: {
    schema: TeamifyOutputSchema,
  },
  prompt: `You are an expert talent scout for hackathons. Your task is to assemble the best possible team from a list of available candidates based on specific project requirements.

Project Requirements:
- Desired Team Size: {{teamSize}}
- Required Tech Stack: {{#each techStack}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
- Required Skills: {{#each skills}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
{{#if projectIdea}}- Project Idea: {{projectIdea}}{{/if}}

Available Candidates:
\`\`\`json
{{{jsonStringify candidates}}}
\`\`\`

Your goal is to select exactly {{teamSize}} members. You must:
1.  **Analyze Candidates**: Carefully review each candidate's skills, past projects, and hackathon experience.
2.  **Assign Roles**: Assign a specific, relevant role to each selected member (e.g., "Lead Backend Developer", "UI/UX Designer", "GenAI Specialist").
3.  **Prioritize Excellence**: Select the absolute best candidate for each role. Give significant weight to:
    -   Relevant past projects.
    -   Previous hackathon participation.
    -   **Bonus points**: Give strong preference to candidates who were winners or finalists (e.g., "1st Place Winner", "Top 5 Finalist") in past hackathons.
4.  **Provide Justification**: For each chosen member, provide a concise, one-sentence reasoning for their selection.
5.  **Craft Invitation**: Write a single, friendly invitation message that can be sent to all selected members. If a project idea was provided, mention it briefly.

Return your final team and the invitation message in the specified JSON format. Do not select more candidates than the requested team size.`,
});

// Define the main flow for the Teamify feature
const teamifyFlow = ai.defineFlow(
  {
    name: 'teamifyFlow',
    inputSchema: TeamifyInputSchema,
    outputSchema: TeamifyOutputSchema,
  },
  async (input) => {
    // In a real app, you would fetch the current user's connections.
    const candidates = await getConnections();

    const result = await teamifyPrompt({
      ...input,
      candidates,
    });
    
    return result.output!;
  }
);


// Exported wrapper function to be called from the UI
export async function teamify(input: TeamifyInput): Promise<TeamifyOutput> {
  return teamifyFlow(input);
}
