# 🔐 Google OAuth Setup Guide for KyoolApp

## Step 1: Firebase Console Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **lifestyle-health-kyool**
3. Go to **Authentication** → **Sign-in method**
4. Enable **Google** sign-in provider
5. Note down your **Web client ID** (will look like: `606917950237-xxxxxxxxx.apps.googleusercontent.com`)

## Step 2: Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project: **lifestyle-health-kyool**
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client IDs**
5. Configure OAuth consent screen if not done
6. Create OAuth client IDs for:
   - **Web application** (for Expo Auth Session)
   - **iOS app** (optional, for native builds)
   - **Android app** (optional, for native builds)

## Step 3: Expo Configuration

For Expo Auth Session, you need:
- **Web Client ID** from Google Cloud Console
- **Expo Client ID** (automatically generated)

## Step 4: Update Firebase Config

Replace the placeholder in `src/firebase.js`:
```javascript
export const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefghijklmnop"
};
```

## Step 5: OAuth Client IDs Needed

```javascript
// In user_api.js, you'll need:
const GOOGLE_OAUTH_CONFIG = {
  expoClientId: 'YOUR_EXPO_CLIENT_ID',
  webClientId: 'YOUR_WEB_CLIENT_ID',
  // These are auto-generated based on your bundle ID
};
```

## 🚨 Important Notes

- **Web Client ID**: From Google Cloud Console OAuth 2.0 credentials
- **Expo Client ID**: Generated automatically based on your app's slug
- For production: Set up proper OAuth consent screen
- For development: Use localhost/127.0.0.1 redirect URIs

Once you have these credentials, we can implement the Google Sign-In functionality!