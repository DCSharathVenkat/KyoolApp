// Kyool App API Integration with FastAPI Backend
// Backend deployed at: https://kyool-backend-606917950237.us-central1.run.app

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebase';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://kyool-backend-606917950237.us-central1.run.app';

// Search users by query (username, name, email)
export async function searchUsers(query) {
  if (!query) return [];
  const res = await fetch(`${BASE_URL}/users/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.results || [];
}

// Add friend/follow (placeholder, to be implemented in backend)
export async function addFriend(currentUserId, targetUserId) {
  // POST /users/{currentUserId}/add-friend { targetUserId }
  const res = await fetch(`${BASE_URL}/users/${currentUserId}/add-friend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ targetUserId }),
  });
  return res.ok;
}

export async function addWeightLog(userId, weight, date, bmi, bmr, tdee) {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}/weight-log`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weight, date, bmi, bmr, tdee}),
    });
    return res.json();
  } catch (error) {
    // Fallback for demo purposes when backend is not available
    console.log('Backend not available, using mock data');
    return { success: true, id: Date.now() };
  }
}



// Check if a username is available (unique)
export async function isUsernameAvailable(username, userId) {
  const res = await fetch(`${BASE_URL}/users/${userId}/check-username?username=${encodeURIComponent(username)}`);
  console.log('Response status:', res);
  if (!res.ok) throw new Error('Failed to check username');
  const data = await res.json();
  return data.available;
}


export async function getWeightLogs(userId) {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}/weight-logs`);
    return res.json();
  } catch (error) {
    // Fallback for demo purposes when backend is not available
    console.log('Backend not available, using mock weight logs');
    return [
      { weight: 75, date: '2025-10-01', bmi: 23.1, bmr: 1650, tdee: 2300 },
      { weight: 74.5, date: '2025-10-02', bmi: 22.9, bmr: 1645, tdee: 2295 },
      { weight: 74.2, date: '2025-10-03', bmi: 22.8, bmr: 1642, tdee: 2292 },
      { weight: 74.0, date: '2025-10-04', bmi: 22.7, bmr: 1640, tdee: 2290 }
    ];
  }
}
export async function createOrUpdateUser(userId, userData) {
  const res = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "POST", // or "PUT" for update
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
}

export async function getUser(userId) {
  const res = await fetch(`${BASE_URL}/users/${userId}`);
  return res.json();
}

export async function getUserByEmail(email) {
  const res = await fetch(`${BASE_URL}/users/by-email/${email}`);
  return res.json();
}

// Create a new user account
export async function createUser(userData) {
  try {
    const res = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || 'Failed to create user');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Create user error:', error);
    throw error;
  }
}

// Sign up with email and password using Firebase Auth
export async function signUpWithEmail(email, password, name) {
  try {
    // Create Firebase user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create user profile in your backend
    const userData = {
      id: user.uid,
      email: email,
      name: name,
      createdAt: new Date().toISOString(),
      height: null,
      weight: null,
      age: null,
      gender: null,
      activityLevel: 'moderate'
    };
    
    const backendUser = await createUser(userData);
    return { firebaseUser: user, backendUser };
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
}

// Sign in with email and password using Firebase Auth
export async function signInWithEmail(email, password) {
  try {
    // Sign in with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get the user token
    const token = await user.getIdToken();
    
    console.log('User signed in successfully:', user.uid);
    
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        token: token
      }
    };
  } catch (error) {
    console.error('Sign in error:', error);
    let errorMessage = 'Failed to sign in';
    
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect password';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address';
    } else if (error.code === 'auth/user-disabled') {
      errorMessage = 'This account has been disabled';
    }
    
    return { success: false, error: errorMessage };
  }
}

// Sign in with Google
export async function signInWithGoogle() {
  try {
    // Note: For React Native, you'll need to use a Google Sign-In library
    // like @react-native-google-signin/google-signin
    // This is a placeholder for the Google Sign-In functionality
    
    // For now, we'll return a placeholder response
    // In a real implementation, you would:
    // 1. Use Google Sign-In library to get authentication token
    // 2. Create Firebase credential with the token
    // 3. Sign in with Firebase using the credential
    // 4. Create/update user in your backend
    
    console.log('Google Sign-In not yet implemented - requires Google Sign-In library setup');
    return { 
      success: false, 
      error: 'Google Sign-In requires additional setup. Please use email/password for now.' 
    };
  } catch (error) {
    console.error('Google Sign-In error:', error);
    return { success: false, error: 'Failed to sign in with Google' };
  }
}