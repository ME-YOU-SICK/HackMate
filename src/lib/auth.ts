
'use server';

import { auth } from '@/lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";

export async function signUpWithEmailAndPassword(email: string, password: string, fullName: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: fullName });
    return { success: true, userId: userCredential.user.uid };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function signInWithEmailAndPasswordAction(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, userId: userCredential.user.uid };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function signOutAction() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
