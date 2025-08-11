
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "hackmate-rzy9k",
  appId: "1:990443845581:web:5d954bba147ca034a87684",
  storageBucket: "hackmate-rzy9k.firebasestorage.app",
  apiKey: "AIzaSyDrgL7lZiO6ApYErUyFlO6C4ruuPJ-s27w",
  authDomain: "hackmate-rzy9k.firebaseapp.com",
  messagingSenderId: "990443845581",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
