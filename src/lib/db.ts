
'use server';

import { db } from '@/lib/firebase';
import { doc, setDoc, collection, addDoc, Timestamp } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  photoURL?: string | null;
  role: 'participant' | 'organizer';
  title?: string;
  bio?: string;
  city?: string;
  graduationYear?: number;
  age?: number;
  skills?: string[];
  tech?: string[];
  pastEvents?: { name: string; role: string }[];
  pastProjects?: { name: string; description: string; url?: string }[];
  connections?: string[]; // Array of user UIDs
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  // Settings fields
  visibility?: 'public' | 'event-only' | 'private';
  showPastProjects?: boolean;
  showSocialLinks?: boolean;
}

export interface Event {
    id: string; // Unique 6-character code
    name: string;
    description: string;
    dateRange: { from: string; to: string };
    location: string;
    imageUrl?: string;
    organizerId: string;
    participants: string[]; // Array of user UIDs
    allowedTech?: string[];
    maxTeamMembers?: number;
    createdAt: Timestamp;
}


export interface Notification {
  recipientId: string;
  senderId: string;
  senderName: string;
  type: 'TEAM_INVITE';
  message: string;
  role: string;
  projectIdea?: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
  createdAt: Date;
}

export async function updateUserProfile(userId: string, data: Partial<UserProfile>) {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, data, { merge: true });
    return { success: true };
  } catch (error: any) {
    console.error("Error updating user profile:", error);
    return { success: false, error: error.message };
  }
}

export async function createNotification(notification: Omit<Notification, 'createdAt' | 'status'>) {
  try {
    const newNotification: Notification = {
      ...notification,
      status: 'PENDING',
      createdAt: new Date(),
    };
    await addDoc(collection(db, 'notifications'), newNotification);
    return { success: true };
  } catch (error: any) {
    console.error("Error creating notification:", error);
    return { success: false, error: error.message };
  }
}
