
'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

const joinEventSchema = z.object({
  eventCode: z.string().length(6, "Event code must be 6 characters long."),
  userId: z.string(),
});

export async function joinEventAction(formData: FormData) {
  const rawData = {
    eventCode: formData.get('eventCode')?.toString().toUpperCase(),
    userId: formData.get('userId'),
  };

  const parsed = joinEventSchema.safeParse(rawData);

  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors.eventCode?.[0] };
  }

  const { eventCode, userId } = parsed.data;

  try {
    const eventRef = doc(db, 'events', eventCode);
    const eventSnap = await getDoc(eventRef);

    if (!eventSnap.exists()) {
      return { success: false, error: "Event not found." };
    }

    const userRef = doc(db, 'users', userId);

    await updateDoc(eventRef, {
      participants: arrayUnion(userId)
    });
    
    await updateDoc(userRef, {
      events: arrayUnion(eventCode)
    });

    revalidatePath('/dashboard/events');
    revalidatePath(`/dashboard/events/${eventCode}`);
    
    return { success: true };
  } catch (error) {
    console.error("Join event error:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
