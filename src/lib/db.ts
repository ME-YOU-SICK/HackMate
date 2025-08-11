
'use server';

import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  title?: string;
  bio?: string;
  skills?: string[];
  interests?: string[];
  pastEvents?: { name: string; role: string }[];
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
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
