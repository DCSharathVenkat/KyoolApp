# 🔐 Google OAuth Setup Guide

## Step 1: Firebase Console Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **lifestyle-health-kyool** 
3. Go to **Authentication** → **Sign-in method**
4. Enable **Google** sign-in provider
5. Add your support email
6. Note down your **Web client ID**

## Step 2: Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project: **lifestyle-health-kyool**
3. Go to **APIs & Services** → **Credentials**
4. Find your OAuth 2.0 Client IDs
5. You need the **Web client ID** for Expo Auth Session

## Step 3: Get Your Client IDs

For Expo Auth Session, you need:
- **Web Client ID**: From Google Cloud Console OAuth credentials
- **Expo Client ID**: Auto-generated based on your Expo slug

## Step 4: Update Environment Variables

Create a `.env` file in your frontend folder:
```
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-web-client-id-here
EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID=your-expo-client-id-here
```

## Step 5: Current Status

✅ Firebase configured for Google Auth
✅ Expo Auth Session packages installed
🔄 Need to add real OAuth client IDs
🔄 Need to implement Google Sign-In hook
🔄 Need to test Google authentication

## Next Steps

1. Get your Web Client ID from Google Cloud Console
2. Add it to the Google Auth configuration
3. Test Google Sign-In in your app