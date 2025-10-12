// Real Firebase Configuration for KyoolApp with Google Authentication
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence, GoogleAuthProvider, signInWithCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration - Replace with your actual Firebase project credentials
export const firebaseConfig = {
  apiKey: "AIzaSyBqE8nX-lN9V8YwE9uYvN9sQhR7_Wg4nzA",
  authDomain: "lifestyle-health-kyool.firebaseapp.com",
  projectId: "lifestyle-health-kyool",
  storageBucket: "lifestyle-health-kyool.appspot.com",
  messagingSenderId: "606917950237",
  appId: "1:606917950237:web:a1b2c3d4e5f6g7h8i9j0k1"
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
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  firebaseSignOut,
  onAuthStateChanged
};

console.log('✅ Firebase initialized for KyoolApp with Google Auth support');

export default app;