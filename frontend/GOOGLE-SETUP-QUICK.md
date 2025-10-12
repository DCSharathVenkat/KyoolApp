# 🚀 Quick Google OAuth Setup - Get Account Selection Popup

Your Google auth code is ready! Just need OAuth credentials to see the account selection popup.

## Step 1: Google Cloud Console Setup (5 minutes)

### A. Create OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project: **lifestyle-health-kyool** (or create new)
3. Go to **APIs & Services** → **Credentials**
4. Click **+ CREATE CREDENTIALS** → **OAuth 2.0 Client ID**
5. Choose **Web application**

### B. Add Redirect URIs
Add these **Authorized redirect URIs**:
```
https://auth.expo.io/@DCSharathVenkat/KyoolApp
exp://127.0.0.1:19000
exp://localhost:19000
```
*(Replace @DCSharathVenkat with your actual Expo username if different)*

### C. Copy Client ID
- Click **Create**
- **Copy the Client ID** (looks like: `123456789-abcdef123.apps.googleusercontent.com`)

## Step 2: Update Your App (30 seconds)

1. Open `frontend/.env` file
2. Replace this line:
   ```
   EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_web_client_id_here.apps.googleusercontent.com
   ```
   With your actual Client ID:
   ```
   EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=123456789-abcdef123.apps.googleusercontent.com
   ```

## Step 3: Enable Google Auth in Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select **lifestyle-health-kyool** project
3. Go to **Authentication** → **Sign-in method**
4. Click **Google** → **Enable**
5. Add the same **Web Client ID** from step 1

## Step 4: Test It! 🎉

1. Restart your app: `expo start`
2. Tap "Continue with Google"
3. **You'll now see the Google account selection popup!**

## What You'll See:

✅ **Browser opens** with Google OAuth page  
✅ **Account selection** - Choose which Google account  
✅ **Permission screen** - Allow app access  
✅ **Automatic redirect** back to your app  
✅ **Success message** - "Logged in successfully!"  

## Troubleshooting:

- **"Invalid client ID"** → Check Client ID is correct in `.env`
- **"Redirect URI mismatch"** → Check all URIs are added in Google Cloud Console
- **Still seeing setup message** → Restart the app after updating `.env`

That's it! Your Google account selection popup will work perfectly! 🚀