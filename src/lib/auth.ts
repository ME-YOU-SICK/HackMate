
'use server';

import { auth, db } from '@/lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  deleteUser,
} from "firebase/auth";
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

export async function signUpWithEmailAndPassword(email: string, password: string, fullName: string, role: 'participant' | 'organizer') {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: fullName });
    
    const userRef = doc(db, 'users', userCredential.user.uid);
    await setDoc(userRef, {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        fullName: fullName,
        role: role,
        visibility: 'public',
        showPastProjects: true,
        showSocialLinks: true,
    }, { merge: true });

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

export async function processProviderSignIn(uid: string, email: string | null, displayName: string | null, photoURL: string | null, role?: 'participant' | 'organizer') {
  try {
    const userRef = doc(db, 'users', uid);
    const docSnap = await getDoc(userRef);

    let isNewUser = false;
    if (!docSnap.exists()) {
      isNewUser = true;
      await setDoc(userRef, {
        uid: uid,
        email: email,
        fullName: displayName,
        photoURL: photoURL,
        role: role,
        visibility: 'public',
        showPastProjects: true,
        showSocialLinks: true,
      }, { merge: true });
    }

    return { success: true, userId: uid, isNewUser };
  } catch (error: any) {
    return { success: false, error: "An error occurred while processing your profile." };
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

export async function deleteUserAccountAction(userId: string) {
    try {
        const userRef = doc(db, 'users', userId);
        await deleteDoc(userRef);
        // Deleting from Firebase Auth should be handled on the client-side
        // after reauthentication for security reasons. We just delete the DB record here.
        return { success: true };
    } catch (error: any) {
        return { success: false, error: "Failed to delete user data from database." };
    }
}
