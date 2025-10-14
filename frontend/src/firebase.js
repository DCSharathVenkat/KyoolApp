// Real Firebase Configuration for KyoolApp with Google Authentication
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence, GoogleAuthProvider, signInWithCredential, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration from environment variables
export const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID
};

// Initialize Firebase App (only if not already initialized)
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  console.log('✅ Firebase app initialized successfully');
} else {
  app = getApps()[0];
  console.log('✅ Using existing Firebase app');
}

// Initialize Firebase Auth with React Native persistence
let auth;
try {
  // Use initializeAuth with AsyncStorage persistence for React Native
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  console.log('✅ Firebase Auth initialized with React Native persistence');
} catch (error) {
  if (error.code === 'auth/already-initialized') {
    // Auth is already initialized, use getAuth
    console.log('✅ Auth already initialized, using existing instance');
    auth = getAuth(app);
  } else {
    // Fallback to basic auth without persistence if there's an issue
    console.warn('⚠️ Auth persistence failed, falling back to basic auth:', error.message);
    try {
      auth = getAuth(app);
    } catch (fallbackError) {
      console.error('❌ Critical Firebase Auth error:', fallbackError);
      throw fallbackError;
    }
  }
}

export { auth };

// Export Firebase Auth functions for easy import
export { 
  GoogleAuthProvider,
  signInWithCredential,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  firebaseSignOut,
  onAuthStateChanged
};

console.log('✅ Firebase initialized for KyoolApp with Google Auth support');

export default app;