import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCD6GM-vdububoEVZmOH5pq16WWXCeT3io",
  authDomain: "emotional-journal-5cb99.firebaseapp.com",
  databaseURL: "https://emotional-journal-5cb99-default-rtdb.firebaseio.com/",
  projectId: "emotional-journal-5cb99",
  storageBucket: "emotional-journal-5cb99.firebasestorage.app",
  messagingSenderId: "731796501834",
  appId: "1:731796501834:web:47145572251a001472fdb3",
  measurementId: "G-RXH5D4S59R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const database = getDatabase(app);
export const analytics = getAnalytics(app);

export default app;