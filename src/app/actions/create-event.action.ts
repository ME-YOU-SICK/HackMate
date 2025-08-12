
'use server';

import { z } from 'zod';
import { createEvent } from '@/lib/db';
import { auth } from '@/lib/firebase';
import { revalidatePath } from 'next/cache';

const createEventSchema = z.object({
  eventName: z.string().min(3, "Event name must be at least 3 characters."),
  eventDescription: z.string().min(10, "Description must be at least 10 characters."),
  techStack: z.array(z.string()).min(1, "Please select at least one technology."),
  requiredSkills: z.array(z.string()).min(1, "Please select at least one skill."),
  maxTeamSize: z.coerce.number().min(1).max(10),
  dateRange: z.object({
    from: z.string(),
    to: z.string(),
  }).refine(val => val?.from, "Please select a date range."),
  organizerId: z.string(),
});

function generateEventCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}


export async function createEventAction(formData: FormData) {
    const rawData = {
        eventName: formData.get('eventName'),
        eventDescription: formData.get('eventDescription'),
        techStack: JSON.parse(formData.get('techStack') as string || '[]'),
        requiredSkills: JSON.parse(formData.get('requiredSkills') as string || '[]'),
        maxTeamSize: formData.get('maxTeamSize'),
        dateRange: JSON.parse(formData.get('dateRange') as string || '{}'),
        organizerId: formData.get('organizerId'),
    };
    
    const parsed = createEventSchema.safeParse(rawData);
    
    if (!parsed.success) {
        return { success: false, error: "Invalid data.", issues: parsed.error.flatten().fieldErrors };
    }

    const eventCode = generateEventCode();

    const result = await createEvent({
        id: eventCode,
        name: parsed.data.eventName,
        description: parsed.data.eventDescription,
        dateRange: { 
            from: parsed.data.dateRange.from,
            to: parsed.data.dateRange.to
        },
        techStack: parsed.data.techStack,
        requiredSkills: parsed.data.requiredSkills,
        maxTeamSize: parsed.data.maxTeamSize,
        organizerId: parsed.data.organizerId,
        imageUrl: `https://placehold.co/1200x400.png?text=${encodeURIComponent(parsed.data.eventName)}`,
    });

    if (result.success) {
        revalidatePath('/dashboard/events');
    }

    return result;
}
