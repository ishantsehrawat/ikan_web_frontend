// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUOcWKpvVEnDuxEEAJ2N90FzuhIpwOR4s",
  authDomain: "ikan-de46d.firebaseapp.com",
  projectId: "ikan-de46d",
  storageBucket: "ikan-de46d.appspot.com",
  messagingSenderId: "691049986459",
  appId: "1:691049986459:web:b5778d9572133839f8c93e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);

