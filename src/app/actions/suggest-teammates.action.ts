"use server";

import { suggestTeammates, type SuggestTeammatesInput, type SuggestTeammatesOutput } from '@/ai/flows/suggest-teammates';
import { z } from 'zod';

const SuggestTeammatesInputSchema = z.object({
  userSkills: z.array(z.string()).min(1, "Please enter at least one skill."),
  userExperience: z.string(),
  userTechStack: z.array(z.string()).min(1, "Please enter at least one technology."),
  desiredTeamSize: z.coerce.number().min(1).max(5),
  hackathonDescription: z.string().min(20, "Please provide a more detailed description."),
});


export async function getTeamSuggestions(formData: FormData): Promise<{ success: boolean; data?: SuggestTeammatesOutput; error?: string; issues?: string[] }> {
  
  const rawData = {
      userSkills: formData.get('userSkills')?.toString().split(',').map(s => s.trim()).filter(Boolean) || [],
      userExperience: formData.get('userExperience')?.toString() || 'Beginner',
      userTechStack: formData.get('userTechStack')?.toString().split(',').map(s => s.trim()).filter(Boolean) || [],
      desiredTeamSize: formData.get('desiredTeamSize'),
      hackathonDescription: formData.get('hackathonDescription')?.toString() || '',
  };

  const parsedInput = SuggestTeammatesInputSchema.safeParse(rawData);

  if (!parsedInput.success) {
    return { success: false, error: "Invalid input", issues: parsedInput.error.errors.map(e => `${e.path.join('.')}: ${e.message}`) };
  }
  
  try {
    const output = await suggestTeammates(parsedInput.data);
    return { success: true, data: output };
  } catch (error) {
    console.error(error);
    return { success: false, error: "An unexpected error occurred while generating suggestions. Please try again." };
  }
}
