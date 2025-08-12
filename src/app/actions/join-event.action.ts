
'use server';

import { z } from 'zod';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import type { Event } from '@/lib/db';
import { revalidatePath } from 'next/cache';

const joinEventSchema = z.object({
  eventCode: z.string().length(6, "Event code must be 6 characters long.").regex(/^[A-Z0-9]+$/, "Invalid event code format."),
  userId: z.string(),
});

export async function joinEventAction(formData: FormData) {
  const rawData = {
    eventCode: formData.get('eventCode')?.toString().toUpperCase(),
    userId: formData.get('userId'),
  };

  const parsed = joinEventSchema.safeParse(rawData);

  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors.eventCode?.[0] || "Invalid input." };
  }

  const { eventCode, userId } = parsed.data;
  const eventRef = doc(db, 'events', eventCode);

  try {
    const eventDoc = await getDoc(eventRef);
    if (!eventDoc.exists()) {
      return { success: false, error: "Event not found. Please check the code." };
    }

    const eventData = eventDoc.data() as Event;

    if (eventData.participants.includes(userId)) {
      return { success: false, error: "You are already a participant in this event." };
    }

    await updateDoc(eventRef, {
      participants: arrayUnion(userId),
    });

    revalidatePath('/dashboard/events');
    return { success: true };
  } catch (error: any) {
    console.error("Join event action error:", error);
    return { success: false, error: "An unexpected error occurred while joining the event." };
  }
}
