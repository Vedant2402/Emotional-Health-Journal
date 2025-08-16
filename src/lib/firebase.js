import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB62f1fOCXlPkSUz2ozkC8zvaroVDkKz7A",
  authDomain: "mindbloom-8f45a.firebaseapp.com",
  databaseURL: "https://mindbloom-8f45a-default-rtdb.firebaseio.com",
  projectId: "mindbloom-8f45a",
  storageBucket: "mindbloom-8f45a.firebasestorage.app",
  messagingSenderId: "536234777565",
  appId: "1:536234777565:web:5dd53c76a293a8c03d3434",
  measurementId: "G-TQ6MW45C99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;