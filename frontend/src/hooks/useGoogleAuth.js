// Google Authentication Hook using Expo Auth Session
import { useState } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebase';

// Google OAuth Configuration
// TODO: Replace these with your actual OAuth client IDs from Google Cloud Console
const GOOGLE_OAUTH_CONFIG = {
  expoClientId: process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID || '606917950237-your-expo-client-id.apps.googleusercontent.com',
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || '606917950237-your-web-client-id.apps.googleusercontent.com',
  // Add your iOS and Android client IDs here when available
  // iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || '606917950237-your-ios-client-id.apps.googleusercontent.com',
  // androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || '606917950237-your-android-client-id.apps.googleusercontent.com',
  scopes: ['openid', 'profile', 'email'],
};

// Check if OAuth is properly configured
const isGoogleOAuthConfigured = () => {
  return GOOGLE_OAUTH_CONFIG.webClientId && 
         !GOOGLE_OAUTH_CONFIG.webClientId.includes('your-') &&
         GOOGLE_OAUTH_CONFIG.expoClientId && 
         !GOOGLE_OAUTH_CONFIG.expoClientId.includes('your-');
};

export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest(GOOGLE_OAUTH_CONFIG);
  const [isLoading, setIsLoading] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      console.log('🚀 Starting Google Sign-In...');

      // Check if OAuth is configured
      if (!isGoogleOAuthConfigured()) {
        return {
          success: false,
          error: 'Google Sign-In setup incomplete.\n\nPlease:\n1. Get Web Client ID from Google Cloud Console\n2. Add it to your environment variables\n3. Restart the app\n\nFor now, please use email/password authentication.'
        };
      }
      
      if (!request) {
        return {
          success: false,
          error: 'Google Auth not ready. Please try again.'
        };
      }

      const result = await promptAsync();
      
      if (result.type === 'success') {
        const { authentication } = result;
        
        if (!authentication?.accessToken) {
          throw new Error('No access token received from Google');
        }

        // Get user info from Google
        const userInfoResponse = await fetch(
          `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${authentication.accessToken}`
        );
        const userInfo = await userInfoResponse.json();
        console.log('👤 Google user info:', userInfo.email);

        // Create Google credential for Firebase
        const credential = GoogleAuthProvider.credential(
          authentication.idToken,
          authentication.accessToken
        );

        // Sign in to Firebase
        const userCredential = await signInWithCredential(auth, credential);
        const firebaseUser = userCredential.user;

        // Get Firebase token
        const token = await firebaseUser.getIdToken();

        // Return user data
        const userData = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || userInfo.name,
          photoURL: firebaseUser.photoURL || userInfo.picture,
          provider: 'google',
          token: token
        };

        console.log('✅ Google Sign-In successful!');
        return { success: true, user: userData };

      } else if (result.type === 'cancel') {
        return { success: false, error: 'Google Sign-In was cancelled' };
      } else {
        throw new Error('Google Sign-In failed: ' + result.type);
      }

    } catch (error) {
      console.error('❌ Google Sign-In error:', error);
      
      if (error.message.includes('CONFIGURATION_ERROR')) {
        return { 
          success: false, 
          error: 'Google Sign-In setup incomplete. Please check OAuth credentials.' 
        };
      } else if (error.message.includes('network')) {
        return { 
          success: false, 
          error: 'Network error. Please check your internet connection.' 
        };
      } else {
        return { 
          success: false, 
          error: error.message || 'Google Sign-In failed. Please try again.' 
        };
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signInWithGoogle,
    isLoading,
    isReady: !!request && isGoogleOAuthConfigured()
  };
}

// Alternative non-hook approach for compatibility
export async function signInWithGoogleWeb() {
  try {
    console.log('🔗 Using web-based Google Sign-In...');
    
    // For now, return a helpful message about setup
    return {
      success: false,
      error: 'Google Sign-In requires OAuth setup. Please:\n\n1. Get Web Client ID from Google Cloud Console\n2. Update GOOGLE_OAUTH_CONFIG in useGoogleAuth.js\n3. Use the useGoogleAuth hook in your components\n\nFor now, please use email/password authentication.'
    };
    
  } catch (error) {
    console.error('Google Auth error:', error);
    return {
      success: false,
      error: 'Google Sign-In setup required'
    };
  }
}