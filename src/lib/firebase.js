import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta?.env?.VITE_FIREBASE_API_KEY ?? process.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta?.env?.VITE_FIREBASE_AUTH_DOMAIN ?? process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta?.env?.VITE_FIREBASE_PROJECT_ID ?? process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta?.env?.VITE_FIREBASE_STORAGE_BUCKET ?? process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta?.env?.VITE_FIREBASE_MESSAGING_SENDER_ID ?? process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta?.env?.VITE_FIREBASE_APP_ID ?? process.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta?.env?.VITE_FIREBASE_MEASUREMENT_ID ?? process.env.VITE_FIREBASE_MEASUREMENT_ID,
  // optional
  databaseURL: import.meta?.env?.VITE_FIREBASE_DATABASE_URL ?? process.env.VITE_FIREBASE_DATABASE_URL
};

// If there's no API key, avoid initializing Firebase (useful for SSR/tests)
const hasConfig = Boolean(firebaseConfig.apiKey);

let app = null;
let auth = null;
let database = null;
let analytics = null;

if (hasConfig) {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);

  const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
  try {
    if (isBrowser) {
      auth = getAuth(app);
      database = getDatabase(app);

      const hasMeasurementId = Boolean(firebaseConfig.measurementId);
      if (hasMeasurementId) {
        try {
          analytics = getAnalytics(app);
        } catch (e) {
          console.warn('Firebase analytics not initialized:', e?.message || e);
        }
      }
    }
  } catch (e) {
    console.warn('Firebase service initialization skipped:', e?.message || e);
  }
}

export { auth, database, analytics };

export default app;