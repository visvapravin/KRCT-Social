import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  browserLocalPersistence, 
  setPersistence,
  initializeAuth,
  indexedDBLocalPersistence
} from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAA2xchWz1yU6J9Fj6LIuuvgNB2v20f_uk",
  authDomain: "krct-social-68d4a.firebaseapp.com",
  databaseURL: "https://krct-social-68d4a-default-rtdb.firebaseio.com",
  projectId: "krct-social-68d4a",
  storageBucket: "krct-social-68d4a.firebasestorage.app",
  messagingSenderId: "82366445498",
  appId: "1:82366445498:web:f7a0bd0a9db0e05c3f8f83",
  measurementId: "G-K5K70VX1QD"
};

// Initialize Firebase with automatic retry and better error handling
const initializeFirebase = async () => {
  try {
    // Initialize Firebase app
    const app = initializeApp(firebaseConfig);

    // Initialize Auth with IndexedDB persistence
    const auth = initializeAuth(app, {
      persistence: [indexedDBLocalPersistence, browserLocalPersistence]
    });

    // Initialize Firestore
    const db = getFirestore(app);

    // Enable offline persistence for Firestore
    try {
      await enableIndexedDbPersistence(db);
    } catch (err: any) {
      if (err.code === 'failed-precondition') {
        console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
      } else if (err.code === 'unimplemented') {
        console.warn('The current browser does not support persistence.');
      }
    }

    // Initialize Analytics if supported
    const analytics = await isSupported().then(yes => yes ? getAnalytics(app) : null);

    return { app, auth, db, analytics };
  } catch (error) {
    console.error('Firebase initialization error:', error);
    throw error;
  }
};

// Initialize with retry logic and exponential backoff
const initializeWithRetry = async (maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await initializeFirebase();
    } catch (error) {
      console.error(`Firebase initialization attempt ${attempt} failed:`, error);
      
      if (attempt === maxRetries) {
        throw new Error('Failed to initialize Firebase after multiple attempts');
      }
      
      // Exponential backoff
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error('Failed to initialize Firebase');
};

let firebaseInstance: Awaited<ReturnType<typeof initializeWithRetry>>;

// Get Firebase instances with initialization check
export const getFirebaseInstances = async () => {
  if (!firebaseInstance) {
    firebaseInstance = await initializeWithRetry();
  }
  return firebaseInstance;
};

// Export initialized Firebase instances
export const { app, auth, db, analytics } = await getFirebaseInstances();