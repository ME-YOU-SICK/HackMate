
'use server';

import { z } from 'zod';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import type { Event } from '@/lib/db';
import { revalidatePath } from 'next/cache';

const eventSchema = z.object({
    eventName: z.string().min(3, "Event name must be at least 3 characters."),
    eventDescription: z.string().min(10, "Description must be at least 10 characters."),
    dateRange: z.object({
        from: z.date(),
        to: z.date().optional(),
    }),
    location: z.string().min(2, "Location is required."),
    imageUrl: z.string().url().optional().or(z.literal('')),
});

function generateEventCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function createEventAction(formData: FormData) {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        return { success: false, error: "You must be logged in to create an event." };
    }
    
    const dateRangeRaw = JSON.parse(formData.get('dateRange') as string);
    const rawData = {
        eventName: formData.get('eventName'),
        eventDescription: formData.get('eventDescription'),
        dateRange: {
            from: new Date(dateRangeRaw.from),
            to: dateRangeRaw.to ? new Date(dateRangeRaw.to) : undefined,
        },
        location: formData.get('location'),
        imageUrl: formData.get('imageUrl'),
    };

    const parsed = eventSchema.safeParse(rawData);

    if (!parsed.success) {
        return { success: false, error: "Invalid input.", issues: parsed.error.flatten().fieldErrors };
    }

    const { eventName, eventDescription, dateRange, location, imageUrl } = parsed.data;

    const eventCode = generateEventCode();
    const eventRef = doc(db, 'events', eventCode);

    const newEvent: Event = {
        id: eventCode,
        name: eventName,
        description: eventDescription,
        dateRange: {
            from: dateRange.from.toISOString(),
            to: (dateRange.to || dateRange.from).toISOString(),
        },
        location,
        imageUrl: imageUrl || `https://placehold.co/1200x400.png?text=${encodeURIComponent(eventName)}`,
        organizerId: currentUser.uid,
        participants: [currentUser.uid],
        createdAt: new Date(),
    };

    try {
        await setDoc(eventRef, newEvent);
        revalidatePath('/dashboard/events');
        return { success: true, eventCode: eventCode };
    } catch (error: any) {
        return { success: false, error: "Failed to create event in the database." };
    }
}
