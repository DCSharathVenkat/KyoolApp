// Google Authentication Hook using Native Google Sign-In
import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../firebase';

// Google OAuth Configuration for native sign-in
const GOOGLE_OAUTH_CONFIG = {
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  scopes: ['openid', 'profile', 'email'],
  offlineAccess: true,
};

// Configure Google Sign-In
const configureGoogleSignIn = async () => {
  try {
    await GoogleSignin.configure({
      webClientId: GOOGLE_OAUTH_CONFIG.webClientId,
      iosClientId: GOOGLE_OAUTH_CONFIG.iosClientId,
      offlineAccess: GOOGLE_OAUTH_CONFIG.offlineAccess,
      hostedDomain: '',
      forceCodeForRefreshToken: true,
    });
    console.log('✅ Google Sign-In configured');
    return true;
  } catch (error) {
    console.error('❌ Google Sign-In configuration error:', error);
    return false;
  }
};

// Check if OAuth is properly configured
const isGoogleOAuthConfigured = () => {
  const hasWebClientId = GOOGLE_OAUTH_CONFIG.webClientId && !GOOGLE_OAUTH_CONFIG.webClientId.includes('your-');
  
  // For web, we need web client ID
  if (Platform.OS === 'web') {
    return hasWebClientId;
  }
  
  // For mobile, we need web client ID for Firebase Auth
  return hasWebClientId;
};

export function useGoogleAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  // Initialize Google Sign-In configuration
  useEffect(() => {
    const initializeGoogleSignIn = async () => {
      if (Platform.OS !== 'web') {
        const configured = await configureGoogleSignIn();
        setIsConfigured(configured);
      } else {
        setIsConfigured(isGoogleOAuthConfigured());
      }
    };

    initializeGoogleSignIn();
  }, []);

  const handleGoogleAuthSuccess = async (userInfo) => {
    try {
      console.log('🔄 Processing Google authentication...');
      console.log('🔍 UserInfo structure:', JSON.stringify(userInfo, null, 2));
      
      // Extract the ID token from the correct location
      const idToken = userInfo.idToken || userInfo.data?.idToken;
      
      if (!idToken) {
        console.error('❌ No ID token found in userInfo:', userInfo);
        throw new Error('ID token not found in Google Sign-In response');
      }
      
      console.log('🎫 Using ID token for Firebase credential');
      
      // Create Google credential for Firebase
      const credential = GoogleAuthProvider.credential(idToken);

      // Sign in to Firebase
      const userCredential = await signInWithCredential(auth, credential);
      const firebaseUser = userCredential.user;

      console.log('✅ Google Sign-In successful:', firebaseUser.email);
      
      return {
        success: true,
        user: {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          provider: 'google',
          token: await firebaseUser.getIdToken()
        }
      };
    } catch (error) {
      console.error('❌ Firebase credential error:', error);
      return {
        success: false,
        error: error.message || 'Authentication failed'
      };
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      console.log('🚀 Starting Google Sign-In on', Platform.OS);

      // Check if OAuth is configured
      if (!isGoogleOAuthConfigured()) {
        return {
          success: false,
          error: 'Google Sign-In configuration missing. Please check your .env file for OAuth Client IDs.'
        };
      }

      if (Platform.OS === 'web') {
        // Web platform - use Firebase popup
        console.log('🌐 Using web popup authentication');
        
        const provider = new GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        
        const result = await signInWithPopup(auth, provider);
        console.log('✅ Web Google Sign-In successful:', result.user.email);
        
        return {
          success: true,
          user: {
            id: result.user.uid,
            email: result.user.email,
            name: result.user.displayName,
            photoURL: result.user.photoURL,
            provider: 'google',
            token: await result.user.getIdToken()
          }
        };
      } else {
        // Mobile platforms - use native Google Sign-In
        console.log('📱 Using native Google Sign-In');
        
        // Check if Google Play Services are available
        await GoogleSignin.hasPlayServices();
        
        // Sign in with Google
        const userInfo = await GoogleSignin.signIn();
        console.log('📋 Full Google user info structure:', JSON.stringify(userInfo, null, 2));
        
        // Check different possible structures
        const user = userInfo?.user || userInfo?.data?.user || userInfo;
        const idToken = userInfo?.idToken || userInfo?.data?.idToken;
        
        console.log('👤 User object:', user);
        console.log('🔑 ID Token present:', !!idToken);
        
        // Validate that we have both user info and ID token
        if (!user) {
          console.error('❌ No user info found in response');
          throw new Error('No user information in Google Sign-In response');
        }
        
        if (!idToken) {
          console.error('❌ No ID token found in response');
          throw new Error('No ID token in Google Sign-In response');
        }
        
        console.log('📧 Google user email:', user.email);
        console.log('� Google user name:', user.name);
        
        // Handle authentication success
        return await handleGoogleAuthSuccess(userInfo);
      }

    } catch (error) {
      console.error('❌ Google Sign-In error:', error);
      
      let errorMessage = 'Google Sign-In failed. Please try again.';
      
      if (error.message?.includes('popup') && Platform.OS === 'web') {
        errorMessage = 'Popup blocked. Please allow popups and try again.';
      } else if (error.message?.includes('network')) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in popup was closed. Please try again.';
      } else if (error.code === 'SIGN_IN_CANCELLED') {
        errorMessage = 'Google Sign-In was cancelled by user.';
      } else if (error.code === 'IN_PROGRESS') {
        errorMessage = 'Google Sign-In is already in progress.';
      } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
        errorMessage = 'Google Play Services not available. Please update Google Play Services.';
      } else if (error.code === 'DEVELOPER_ERROR') {
        errorMessage = 'Configuration error: The SHA-1 fingerprint in Firebase Console doesn\'t match your debug keystore. Please update Firebase configuration.';
      } else if (error.message?.includes('Cannot read property') && error.message?.includes('undefined')) {
        errorMessage = 'Google Sign-In response format error. Please check the console for debugging information.';
      } else if (error.message?.includes('ID token')) {
        errorMessage = 'Google Sign-In didn\'t return required authentication token.';
      } else if (error.message?.includes('user information')) {
        errorMessage = 'Google Sign-In didn\'t return user information.';
      }
      
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      console.log('🔄 Starting sign out process...');
      
      if (Platform.OS === 'web') {
        // Web platform - sign out from Firebase
        await firebaseSignOut(auth);
        console.log('✅ Web sign out successful');
      } else {
        // Mobile platforms - sign out from both Google and Firebase
        
        // First, sign out from Google
        await GoogleSignin.signOut();
        console.log('✅ Google Sign-In signed out');
        
        // Then, sign out from Firebase
        await firebaseSignOut(auth);
        console.log('✅ Firebase signed out');
      }
      
      return { success: true };
    } catch (error) {
      console.error('❌ Sign out error:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to sign out. Please try again.' 
      };
    }
  };

  return {
    signInWithGoogle,
    signOut,
    isLoading,
    isReady: isConfigured && isGoogleOAuthConfigured(),
    isConfigured: isConfigured && isGoogleOAuthConfigured()
  };
}

// Simple function for direct use (without hook)
export async function signInWithGoogleDirect() {
  try {
    console.log('🔗 Direct Google Sign-In...');
    
    if (Platform.OS === 'web') {
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      
      const result = await signInWithPopup(auth, provider);
      
      return {
        success: true,
        user: {
          id: result.user.uid,
          email: result.user.email,
          name: result.user.displayName,
          photoURL: result.user.photoURL,
          provider: 'google',
          token: await result.user.getIdToken()
        }
      };
    } else {
      return {
        success: false,
        error: 'Please use the useGoogleAuth hook for mobile platforms'
      };
    }
  } catch (error) {
    console.error('Direct Google Auth error:', error);
    return {
      success: false,
      error: error.message || 'Google Sign-In failed'
    };
  }
}

// Direct sign-out function (without hook)
export async function signOutDirect() {
  try {
    console.log('🔄 Direct sign out process...');
    
    if (Platform.OS === 'web') {
      // Web platform - sign out from Firebase
      await firebaseSignOut(auth);
      console.log('✅ Direct web sign out successful');
    } else {
      // Mobile platforms - sign out from both Google and Firebase
      
      // First, sign out from Google
      await GoogleSignin.signOut();
      console.log('✅ Direct Google Sign-In signed out');
      
      // Then, sign out from Firebase
      await firebaseSignOut(auth);
      console.log('✅ Direct Firebase signed out');
    }
    
    return { success: true };
  } catch (error) {
    console.error('❌ Direct sign out error:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to sign out. Please try again.' 
    };
  }
}