
'use server';

import { auth, db } from '@/lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';

export async function signUpWithEmailAndPassword(email: string, password: string, fullName: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: fullName });
    
    const userRef = doc(db, 'users', userCredential.user.uid);
    await setDoc(userRef, {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        fullName: fullName,
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

async function signInWithProvider(provider: GoogleAuthProvider | GithubAuthProvider) {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user is new
    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);

    let isNewUser = false;
    if (!docSnap.exists()) {
      isNewUser = true;
      // Create profile for new user
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        fullName: user.displayName,
        photoURL: user.photoURL,
      }, { merge: true });
    }

    return { success: true, userId: user.uid, isNewUser };
  } catch (error: any) {
    // Handle specific errors like account-exists-with-different-credential
    if (error.code === 'auth/account-exists-with-different-credential') {
      return { success: false, error: "An account already exists with the same email address but different sign-in credentials. Please sign in using the original method." };
    }
    return { success: false, error: error.message };
  }
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  return await signInWithProvider(provider);
}

export async function signInWithGithub() {
  const provider = new GithubAuthProvider();
  return await signInWithProvider(provider);
}


export async function signOutAction() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
