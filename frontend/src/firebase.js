// Temporary Mock Firebase Auth for Development
// This will allow the app to run without Firebase initialization issues

// Mock Firebase app
const mockApp = {
  name: 'mock-app',
  options: {}
};

// Mock Auth object that matches Firebase Auth interface
export const auth = {
  currentUser: null,
  
  // Mock authentication methods
  onAuthStateChanged: (callback) => {
    console.log('Mock: onAuthStateChanged called');
    // Call callback with null user initially
    setTimeout(() => callback(null), 100);
    // Return unsubscribe function
    return () => console.log('Mock: Auth state listener unsubscribed');
  },
  
  signInWithEmailAndPassword: async (email, password) => {
    console.log('Mock: Sign in with:', email);
    return {
      user: {
        uid: 'mock-user-id',
        email: email,
        displayName: 'Mock User',
        emailVerified: true
      }
    };
  },
  
  createUserWithEmailAndPassword: async (email, password) => {
    console.log('Mock: Create user with:', email);
    return {
      user: {
        uid: 'mock-user-id-' + Date.now(),
        email: email,
        displayName: 'New Mock User',
        emailVerified: false
      }
    };
  },
  
  signOut: async () => {
    console.log('Mock: User signed out');
    return Promise.resolve();
  },
  
  sendPasswordResetEmail: async (email) => {
    console.log('Mock: Password reset email sent to:', email);
    return Promise.resolve();
  }
};

// Mock other Firebase functions that might be imported
export const initializeApp = () => mockApp;
export const getAuth = () => auth;
export const initializeAuth = () => auth;
export const getReactNativePersistence = () => null;

// Mock Firebase Auth functions used in other components
export const GoogleAuthProvider = class {
  static credential() {
    return { mock: 'credential' };
  }
};

export const signInWithPopup = async (auth, provider) => {
  console.log('Mock: signInWithPopup called');
  return {
    user: {
      uid: 'mock-google-user-id',
      email: 'mock@google.com',
      displayName: 'Mock Google User',
      emailVerified: true
    }
  };
};

export const signOut = async (auth) => {
  console.log('Mock: signOut called');
  return Promise.resolve();
};

console.log('Mock Firebase Auth initialized for development');

export default mockApp;