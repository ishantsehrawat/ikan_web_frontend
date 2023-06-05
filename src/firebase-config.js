// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCskvv7rKBHyWIXgz0J8-Jv4k6Tv0w3FIE",
  authDomain: "ikan-47608.firebaseapp.com",
  projectId: "ikan-47608",
  storageBucket: "ikan-47608.appspot.com",
  messagingSenderId: "996677061517",
  appId: "1:996677061517:web:e375c92f61fde576108bc4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
