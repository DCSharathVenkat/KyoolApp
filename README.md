 # KyoolApp - Full-Stack Health & Lifestyle Tracking App

A comprehensive React Native mobile application with FastAPI backend for health and lifestyle tracking, featuring real user profiles, weight logging, recipe search, fitness tracking, and social health community features. **Now with real database integration!**

## 🏗️ Project Structure

```
KyoolApp/
├── frontend/              # React Native Expo app with real backend integration
│   ├── src/
│   │   ├── components/    # React Native UI components
│   │   ├── services/      # API integration layer (NEW!)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Utility functions
│   │   └── api/          # Legacy API files (being phased out)
│   ├── android/          # Android build configuration
│   ├── package.json
│   └── App.tsx
├── backend/              # FastAPI Python backend (NEW!)
│   ├── app/
│   │   ├── api/          # API endpoints
│   │   ├── core/         # Core configuration
│   │   ├── models/       # Pydantic data models
│   │   └── services/     # Business logic services
│   ├── Dockerfile        # Docker configuration
│   └── requirements.txt
├── BACKEND_INTEGRATION_SUMMARY.md  # Integration documentation
└── INTEGRATION_TEST_PLAN.md        # Testing guide
```

## 📱 Tech Stack

### **Frontend (React Native)**
- **Framework**: React Native with Expo SDK 54
- **Navigation**: React Navigation 6
- **UI Components**: Custom UI components with React Native Elements
- **Icons**: Expo Vector Icons (@expo/vector-icons)
- **Charts**: React Native Chart Kit
- **Gradients**: Expo Linear Gradient
- **Authentication**: Firebase Auth + Google Sign-In
- **Language**: TypeScript/JavaScript

### **Backend (FastAPI)**
- **Framework**: FastAPI (Python)
- **Database**: Google Firestore (NoSQL)
- **Authentication**: Firebase Admin SDK
- **Deployment**: Google Cloud Run
- **API Documentation**: Auto-generated OpenAPI/Swagger
- **Language**: Python 3.9+

### **Integration**
- **Real-time Sync**: User profiles sync with Firestore database
- **Authentication Flow**: Google OAuth → Firebase → Backend verification
- **Data Persistence**: All user data stored in cloud database
- **Health Calculations**: BMI, BMR, TDEE automatically calculated and stored

## 🚀 Prerequisites

### **Required Software**
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** - [Download here](https://git-scm.com/)
- **Expo CLI** (global installation):
  ```bash
  npm install -g @expo/cli
  ```

### **For Android Development**
Choose ONE of these options:

#### Option A: Physical Android Device (Recommended - Easiest)
- **Android device** (Android 6.0+)
- **Expo Go app** - [Download from Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

#### Option B: Android Studio Emulator
- **Android Studio** - [Download here](https://developer.android.com/studio)
- **Android SDK** (API level 30+)
- **Android Emulator** configured with Google Play Services

### **For iOS Development (macOS only)**
- **Xcode** (latest version)
- **iOS Simulator** OR **Physical iOS device** with Expo Go app

### **Optional (for Backend Development)**
- **Python 3.9+** - [Download here](https://python.org)
- **Docker** - [Download here](https://docker.com) (for containerization)

## 🛠️ Complete Setup Guide

### **Step 1: Clone the Repository**

```bash
git clone https://github.com/DCSharathVenkat/KyoolApp.git
cd KyoolApp
```

### **Step 2: Frontend Setup**

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Clear any cache (if needed)
npx expo install --fix
```

### **Step 3: Configure Google Authentication**

The app uses Google Sign-In, which requires setup:

1. **Check existing configuration**: 
   - `frontend/android/app/google-services.json` should already be configured
   - SHA-1 fingerprints are pre-configured for this project

2. **If you need to reconfigure** (optional):
   - Follow the guide in `frontend/GOOGLE-SETUP-QUICK.md`
   - Get SHA-1 fingerprint: `cd android && ./gradlew signingReport`

### **Step 4: Environment Setup**

Create environment file (optional - defaults work):

```bash
# In frontend directory
cp .env.example .env
```

Default configuration connects to deployed backend at:
`https://kyool-backend-606917950237.us-central1.run.app`

## 🏃‍♂️ Running the App

### **Method 1: Android Device (Recommended)**

```bash
# From the frontend directory
cd frontend

# Start the development server
npm start
```

**On your Android device:**
1. Install **Expo Go** from Play Store
2. Scan the QR code displayed in terminal/browser
3. The app will load with full backend integration!

### **Method 2: Android Studio Emulator**

```bash
# Ensure Android Studio is running with an emulator
# From frontend directory
npm run android
```

**Requirements:**
- Android Studio installed and configured
- Android emulator running (API 30+)
- Google Play Services enabled on emulator

### **Method 3: Physical Device with USB Debugging**

```bash
# Enable Developer Options on your Android device
# Enable USB Debugging
# Connect via USB

# From frontend directory
npm run android
```

### **Development Server Options**

```bash
# Start locally (fastest - same network required)
npm run start-local

# Start with tunnel (slower but works across networks)  
npm run start-tunnel

# Start for web testing (limited functionality)
npm run web

# Clear cache and restart (if issues)
npx expo start --clear
```

### **🎯 Testing the Backend Integration**

Once the app loads:
1. **Sign in with Google** - This will create your profile in the database
2. **Update your profile** - Go to Profile tab, edit height/weight, tap Save
3. **Check persistence** - Sign out and back in to see your data persists
4. **View real data** - Dashboard shows your actual name and saved information

**Console logs will show:**
```
✅ User profile loaded: your-email@gmail.com
💾 Saving profile: your-email@gmail.com  
✅ Profile saved successfully
```

## 📱 App Features

### **🔥 Real Backend Integration Features:**
- **Google Authentication**: Secure sign-in with Google accounts
- **Real User Profiles**: Data stored in Firestore database, persists across sessions
- **Weight Tracking**: Automatic BMI, BMR, and TDEE calculations stored in database
- **Profile Management**: Real-time sync between app and backend
- **Health Metrics**: Actual user data instead of demo data
- **Cross-platform**: Works on Android devices and emulators

### **📊 App Screens:**
- **Landing Page**: Onboarding with feature showcase
- **Dashboard**: Personalized hub with real user name and health stats
- **Profile**: Complete profile management with backend sync
- **Health Metrics**: BMI calculator with weight logging
- **Water Tracker**: Daily hydration monitoring
- **Recipe Search**: Healthy meal discovery (comprehensive mock data)
- **Fitness Tracker**: Workout routines and progress (comprehensive mock data)
- **Activity Feed**: Social health updates (mock data)
- **Device Connections**: Health device integration (mock data)

### **🔄 Data Flow:**
```
Google Sign-In → Firebase Auth → Backend API → Firestore Database
      ↓              ↓              ↓              ↓
Real User Data → App Context → UI Components → Personalized Experience
```

## 🐛 Troubleshooting

### **Android-Specific Issues:**

**1. Google Sign-In not working:**
```bash
# Check SHA-1 fingerprint is correctly configured
cd android && ./gradlew signingReport

# Ensure google-services.json is in android/app/
ls android/app/google-services.json
```

**2. "DEVELOPER_ERROR" during sign-in:**
- SHA-1 fingerprint mismatch in Firebase Console
- Wrong package name in Firebase project
- Check `android/app/build.gradle` applicationId matches Firebase

**3. Metro bundler issues:**
```bash
# Clear cache and restart
npx expo start --clear

# Reset Metro cache
npx react-native start --reset-cache
```

**4. Android build issues:**
```bash
# Clean Android build
cd android && ./gradlew clean && cd ..

# Delete node_modules and reinstall
rm -rf node_modules && npm install
```

**5. Backend connection issues:**
```bash
# Check if backend is accessible
curl https://kyool-backend-606917950237.us-central1.run.app/health

# Check console logs for API errors
# Enable network debugging in Chrome DevTools
```

### **General Issues:**

**Network problems:**
```bash
# Use tunnel mode
npx expo start --tunnel

# Or try local mode  
npx expo start --lan
```

**Package version conflicts:**
```bash
# Fix Expo package versions
npx expo install --fix

# Clear npm cache
npm cache clean --force
```

### **Development Tips:**

- **Enable USB Debugging**: Settings → Developer Options → USB Debugging
- **Hot Reload**: Code changes automatically reload
- **Remote Debugging**: Shake device → "Debug" → Chrome DevTools
- **Network Debugging**: Check console for backend API calls
- **Backend Status**: Look for `✅ User profile loaded` in logs

## 🔧 Available Scripts

### **Frontend Scripts**
```bash
# Development
npm start              # Start with tunnel (recommended)
npm run start-local    # Start locally (same network only)
npm run start-tunnel   # Start with tunnel (slower but reliable)

# Platform-specific
npm run android        # Run on Android device/emulator
npm run ios           # Run on iOS device/simulator (macOS only)  
npm run web           # Run in web browser (limited features)

# Maintenance
npx expo start --clear # Clear cache and start
npx expo install --fix # Fix package versions
```

### **Backend Scripts (Optional)**
```bash
# If running backend locally
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 🎯 Quick Start (5 Minutes)

### **For Android Device:**
1. **Install prerequisites**: Node.js, Expo CLI, Expo Go app
2. **Clone**: `git clone https://github.com/DCSharathVenkat/KyoolApp.git`
3. **Setup**: `cd KyoolApp/frontend && npm install`
4. **Start**: `npm start`
5. **Connect**: Scan QR code with Expo Go app
6. **Test**: Sign in with Google → Update profile → See real data persistence!

### **For Android Studio Emulator:**
1. **Install**: Android Studio + configure emulator with Google Play
2. **Clone & Setup**: Same as above steps 1-3
3. **Run**: `npm run android`
4. **Test**: Same as step 6 above

### **Expected Experience:**
- ✅ **Real Google Authentication** 
- ✅ **Personalized Dashboard** with your name
- ✅ **Profile Updates** sync to database
- ✅ **Data Persistence** across sign-out/sign-in
- ✅ **Health Calculations** (BMI, BMR, TDEE) stored automatically

## 📚 Documentation

- **`BACKEND_INTEGRATION_SUMMARY.md`** - Complete technical documentation
- **`INTEGRATION_TEST_PLAN.md`** - Testing guide and verification steps
- **`frontend/GOOGLE-SETUP-QUICK.md`** - Google authentication setup
- **Backend API**: Auto-generated docs at `/docs` endpoint

## 🏗️ Architecture Overview

### **Frontend Architecture**
- **React Native + Expo**: Cross-platform mobile development
- **UserContext**: Global state management for authentication
- **Services Layer**: Centralized API communication (`src/services/api.js`)
- **Component Structure**: Modular UI components with real data integration

### **Backend Architecture**  
- **FastAPI**: High-performance Python web framework
- **Firestore**: NoSQL database for user profiles and health data
- **Firebase Auth**: Secure authentication with Google OAuth
- **Cloud Run**: Serverless deployment on Google Cloud

### **Integration Pattern**
```
Mobile App → Firebase Auth → Backend Verification → Firestore Database
    ↓            ↓               ↓                      ↓
UI Updates ← UserContext ← API Response ← Database Query
```

## 🤝 Contributing

### **Development Workflow**
1. **Fork** the repository
2. **Create branch**: `git checkout -b feature/amazing-feature`  
3. **Install deps**: `cd frontend && npm install`
4. **Make changes** to frontend/backend
5. **Test**: Verify Google auth + profile sync works
6. **Commit**: `git commit -m 'Add amazing feature'`
7. **Push**: `git push origin feature/amazing-feature`
8. **Pull Request**: Create PR with description

### **Code Style**
- **Frontend**: TypeScript/JavaScript with Expo conventions
- **Backend**: Python with FastAPI + Pydantic models
- **Components**: Functional components with hooks
- **API**: RESTful endpoints with proper error handling

## 🆘 Support & Resources

### **If you encounter issues:**
1. **Check troubleshooting** section above
2. **Review integration docs**: `BACKEND_INTEGRATION_SUMMARY.md`
3. **Test with guide**: `INTEGRATION_TEST_PLAN.md`  
4. **Check console logs** for backend connection status
5. **Create issue** in this repository with logs/screenshots

### **Helpful Resources:**
- **[Expo Documentation](https://docs.expo.dev/)** - React Native with Expo
- **[React Navigation](https://reactnavigation.org/)** - Navigation library
- **[FastAPI Docs](https://fastapi.tiangolo.com/)** - Backend framework
- **[Firebase Docs](https://firebase.google.com/docs)** - Authentication & database

### **Backend API Documentation:**
- **Live API**: `https://kyool-backend-606917950237.us-central1.run.app/docs`
- **Health Check**: `https://kyool-backend-606917950237.us-central1.run.app/health`

---

## 🎉 **You're All Set!**

Your KyoolApp is now a **full-stack health tracking application** with:
✅ Real database integration  
✅ Google authentication  
✅ Cross-platform mobile support  
✅ Cloud-deployed backend  
✅ Comprehensive documentation  

**Happy coding & healthy living! 🚀💪**