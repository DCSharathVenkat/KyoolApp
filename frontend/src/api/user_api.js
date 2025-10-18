// Kyool App API Integration with FastAPI Backend
// Backend deployed at: https://kyool-backend-606917950237.us-central1.run.app

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebase';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://kyool-backend-606917950237.us-central1.run.app';

console.log('🌐 API Base URL:', BASE_URL);

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

// User activity and online status functions
export async function updateUserActivity(userId) {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}/activity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    return res.ok;
  } catch (error) {
    console.error('Update activity error:', error);
    return false;
  }
}

export async function getUserOnlineStatus(userId) {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}`);
    if (!res.ok) return false;
    const userData = await res.json();
    return userData.online || false;
  } catch (error) {
    console.error('Get online status error:', error);
    return false;
  }
}

export async function getUserByUserId(userId) {
  try {
    console.log('🔍 Getting user by ID:', userId);
    const res = await fetch(`${BASE_URL}/users/${userId}`);
    if (!res.ok) throw new Error(`Failed to get user: ${res.status}`);
    const data = await res.json();
    console.log('✅ User data retrieved:', data);
    return data;
  } catch (error) {
    console.error('Get user by ID error:', error);
    throw error;
  }
}

// Friend request system functions
export async function sendFriendRequest(userId, receiverId) {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}/send-friend-request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ receiver_id: receiverId }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Failed to send friend request');
    }
    return res.json();
  } catch (error) {
    console.error('Send friend request error:', error);
    throw error;
  }
}

export async function acceptFriendRequest(userId, senderId) {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}/accept-friend-request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender_id: senderId }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Failed to accept friend request');
    }
    return res.json();
  } catch (error) {
    console.error('Accept friend request error:', error);
    throw error;
  }
}

export async function rejectFriendRequest(userId, senderId) {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}/reject-friend-request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender_id: senderId }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Failed to reject friend request');
    }
    return res.json();
  } catch (error) {
    console.error('Reject friend request error:', error);
    throw error;
  }
}

export async function getIncomingFriendRequests(userId) {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}/friend-requests/incoming`);
    if (!res.ok) throw new Error('Failed to get incoming friend requests');
    const data = await res.json();
    return data.requests || [];
  } catch (error) {
    console.error('Get incoming friend requests error:', error);
    return [];
  }
}

export async function getOutgoingFriendRequests(userId) {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}/friend-requests/outgoing`);
    if (!res.ok) throw new Error('Failed to get outgoing friend requests');
    const data = await res.json();
    return data.requests || [];
  } catch (error) {
    console.error('Get outgoing friend requests error:', error);
    return [];
  }
}

export async function getUserFriends(userId) {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}/friends`);
    if (!res.ok) throw new Error('Failed to get friends');
    const data = await res.json();
    return data.friends || [];
  } catch (error) {
    console.error('Get friends error:', error);
    return [];
  }
}

export async function getFriendshipStatus(userId, otherUserId) {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}/friendship-status/${otherUserId}`);
    if (!res.ok) throw new Error('Failed to get friendship status');
    return res.json();
  } catch (error) {
    console.error('Get friendship status error:', error);
    return { are_friends: false };
  }
}

// Water intake functions
export async function logWaterIntake(userId, glasses) {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}/water/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ glasses }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Failed to log water intake');
    }
    return res.json();
  } catch (error) {
    console.error('Log water intake error:', error);
    // Return mock success for demo
    return { success: true, glasses };
  }
}

export async function setWaterIntake(userId, glasses) {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}/water/set`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ glasses }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Failed to set water intake');
    }
    return res.json();
  } catch (error) {
    console.error('Set water intake error:', error);
    return { success: true, glasses };
  }
}

export async function getTodayWaterIntake(userId) {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}/water/today`);
    if (!res.ok) throw new Error('Failed to get today\'s water intake');
    const data = await res.json();
    return data.glasses || 0;
  } catch (error) {
    console.error('Get water intake error:', error);
    return 0;
  }
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
    console.log('📊 Fetching weight logs for:', userId);
    const res = await fetch(`${BASE_URL}/users/${userId}/weight-logs`);
    
    if (!res.ok) {
      console.error('❌ Get weight logs failed:', res.status, res.statusText);
      throw new Error(`Failed to get weight logs: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('✅ Weight logs received:', data);
    return data;
  } catch (error) {
    console.error('❌ Get weight logs error:', error);
    // Fallback for demo purposes when backend is not available
    console.log('Using mock weight logs as fallback');
    return [
      { weight: 75, date: '2025-10-01', bmi: 23.1, bmr: 1650, tdee: 2300 },
      { weight: 74.5, date: '2025-10-02', bmi: 22.9, bmr: 1645, tdee: 2295 },
      { weight: 74.2, date: '2025-10-03', bmi: 22.8, bmr: 1642, tdee: 2292 },
      { weight: 74.0, date: '2025-10-04', bmi: 22.7, bmr: 1640, tdee: 2290 }
    ];
  }
}
export async function createOrUpdateUser(userId, userData) {
  try {
    console.log('🔄 Creating/updating user:', userId, userData);
    const res = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "POST", // or "PUT" for update
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Failed to create/update user');
    }
    
    const result = await res.json();
    console.log('✅ User created/updated successfully:', result);
    return result;
  } catch (error) {
    console.error('Create/update user error:', error);
    throw error;
  }
}

export async function getUser(userId) {
  try {
    console.log('🔍 Fetching user:', userId, 'from:', `${BASE_URL}/users/${userId}`);
    const res = await fetch(`${BASE_URL}/users/${userId}`);
    
    if (!res.ok) {
      console.error('❌ Get user failed:', res.status, res.statusText);
      throw new Error(`Failed to get user: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('✅ User data received:', data);
    return data;
  } catch (error) {
    console.error('❌ Get user error:', error);
    throw error;
  }
}

export async function getUserByEmail(email) {
  const res = await fetch(`${BASE_URL}/users/by-email/${email}`);
  return res.json();
}

// Create a new user account
export async function createUser(userData) {
  try {
    // Use the correct endpoint with user ID
    const userId = userData.id || userData.uid;
    const res = await fetch(`${BASE_URL}/users/${userId}`, {
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

// Sign in with Google - unified function for all platforms
export async function signInWithGoogle() {
  try {
    console.log('🚀 Starting Google Sign-In API call...');
    
    // Import the direct Google Auth function
    const { signInWithGoogleDirect } = await import('../hooks/useGoogleAuth');
    const result = await signInWithGoogleDirect();
    
    if (result.success && result.user) {
      console.log('🔄 Syncing Google user with backend...');
      
      // Sync user with backend
      try {
        const userData = {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          photoURL: result.user.photoURL,
          provider: 'google',
          createdAt: new Date().toISOString()
        };

        const response = await fetch(`${BASE_URL}/users/${userData.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${result.user.token}`
          },
          body: JSON.stringify(userData)
        });
        
        if (response.ok) {
          const backendUser = await response.json();
          console.log('✅ Google Sign-In successful with backend sync');
          
          return {
            success: true,
            user: {
              uid: result.user.id,
              email: result.user.email,
              name: result.user.name,
              photoURL: result.user.photoURL,
              token: result.user.token,
              backendData: backendUser
            }
          };
        } else {
          console.warn('⚠️ Backend sync failed, but Firebase auth succeeded');
        }
      } catch (backendError) {
        console.warn('⚠️ Backend error:', backendError.message);
      }
      
      // Return success even if backend fails (Firebase auth succeeded)
      return {
        success: true,
        user: {
          uid: result.user.id,
          email: result.user.email,
          name: result.user.name,
          photoURL: result.user.photoURL,
          token: result.user.token
        }
      };
    }
    
    // Return the error from the Google auth
    return result;
    
  } catch (error) {
    console.error('❌ Google Sign-In API error:', error);
    return { 
      success: false, 
      error: 'Google Sign-In failed. Please try again or use email/password authentication.' 
    };
  }
}