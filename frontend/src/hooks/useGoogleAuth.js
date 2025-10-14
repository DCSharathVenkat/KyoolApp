// Google Authentication Hook using Expo Auth Session
import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';

// Complete web browser session for Expo
WebBrowser.maybeCompleteAuthSession();

// Google OAuth Configuration with proper cross-platform support
const GOOGLE_OAUTH_CONFIG = {
  expoClientId: process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID,
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  scopes: ['openid', 'profile', 'email'],
  selectAccount: true,
};

// Check if OAuth is properly configured
const isGoogleOAuthConfigured = () => {
  const hasWebClientId = GOOGLE_OAUTH_CONFIG.webClientId && !GOOGLE_OAUTH_CONFIG.webClientId.includes('your-');
  const hasIosClientId = GOOGLE_OAUTH_CONFIG.iosClientId && !GOOGLE_OAUTH_CONFIG.iosClientId.includes('your-');
  const hasAndroidClientId = GOOGLE_OAUTH_CONFIG.androidClientId && !GOOGLE_OAUTH_CONFIG.androidClientId.includes('your-');
  
  // For web, we need web client ID
  if (Platform.OS === 'web') {
    return hasWebClientId;
  }
  
  // For mobile, we need at least web client ID, better to have platform-specific IDs
  return hasWebClientId && (hasIosClientId || hasAndroidClientId);
};

export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest(GOOGLE_OAUTH_CONFIG);
  const [isLoading, setIsLoading] = useState(false);

  // Handle the auth response automatically
  useEffect(() => {
    if (response?.type === 'success') {
      handleGoogleAuthSuccess(response.authentication);
    }
  }, [response]);

  const handleGoogleAuthSuccess = async (authentication) => {
    try {
      console.log('� Processing Google authentication...');
      
      // Create Google credential for Firebase
      const credential = GoogleAuthProvider.credential(
        authentication.idToken,
        authentication.accessToken
      );

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
        // Mobile platforms - use Expo Auth Session
        console.log('📱 Using mobile OAuth flow');
        
        if (!request) {
          return {
            success: false,
            error: 'Google Auth request not ready. Please try again.'
          };
        }

        const result = await promptAsync();
        
        if (result.type === 'success') {
          return await handleGoogleAuthSuccess(result.authentication);
        } else if (result.type === 'cancel') {
          return { success: false, error: 'Google Sign-In was cancelled' };
        } else {
          throw new Error(`Google Sign-In failed: ${result.type}`);
        }
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
      }
      
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signInWithGoogle,
    isLoading,
    isReady: (Platform.OS === 'web' || !!request) && isGoogleOAuthConfigured(),
    isConfigured: isGoogleOAuthConfigured()
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