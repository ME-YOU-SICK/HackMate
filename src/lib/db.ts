
'use server';

import { db } from '@/lib/firebase';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  title?: string;
  bio?: string;
  skills?: string[];
  interests?: string[];
  pastEvents?: { name: string; role: string }[];
  pastProjects?: { name: string; description: string; url?: string }[];
  connections?: string[]; // Array of user UIDs
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
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
