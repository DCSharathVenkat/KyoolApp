# KyoolApp - Lifestyle Health App

A comprehensive React Native mobile application built with Expo for health and lifestyle tracking, featuring activity feeds, workout tracking, recipe search, water intake monitoring, and social health community features.

## 🏗️ Project Structure

```
KyoolApp/
├── frontend/          # React Native Expo app
│   ├── src/
│   │   ├── components/    # React Native components
│   │   ├── api/          # API integration
│   │   └── assets/       # Images and static files
│   ├── package.json
│   └── App.tsx
├── backend/           # FastAPI Python backend
│   ├── app/
│   │   ├── main.py       # FastAPI main app
│   │   ├── api/          # API routes
│   │   ├── models/       # Data models
│   │   └── services/     # Business logic
│   ├── requirements.txt
│   └── Dockerfile
└── README.md
```

## 📱 Tech Stack

**Frontend (React Native)**
- **Framework**: React Native with Expo SDK 54
- **Navigation**: React Navigation 6
- **UI Components**: React Native Elements, React Native Paper
- **Icons**: Expo Vector Icons (@expo/vector-icons)
- **Charts**: React Native Chart Kit
- **Gradients**: Expo Linear Gradient
- **Authentication**: Firebase Auth
- **Language**: TypeScript

**Backend (Python)**
- **Framework**: FastAPI
- **Database**: Firebase Firestore
- **Authentication**: Firebase Admin SDK
- **API Documentation**: Auto-generated with Swagger/OpenAPI

## 🚀 Prerequisites

Before running this app, make sure you have the following installed:

### For Frontend (React Native):
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Expo CLI** (global installation):
  ```bash
  npm install -g @expo/cli
  ```

### For Mobile Development:
- **Expo Go app** on your mobile device ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- OR **Android Studio** for Android emulator
- OR **Xcode** for iOS simulator (macOS only)

### For Backend (Python):
- **Python 3.8+** - [Download here](https://python.org/downloads/)
- **pip** package manager (comes with Python)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/DCSharathVenkat/KyoolApp.git
cd KyoolApp
```

### 2. Frontend Setup (React Native)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Clear any cache (if needed)
npx expo install --fix
```

### 3. Backend Setup (FastAPI)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (recommended)
python -m venv .venv

# Activate virtual environment
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 4. Firebase Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and Firestore Database
3. Download the Firebase configuration files:
   - For frontend: `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)
   - For backend: Service account key JSON file
4. Place the configuration files in the appropriate directories

## 🏃‍♂️ Running the Application

### Start the Backend Server

```bash
# From the backend directory
cd backend

# Activate virtual environment (if not already active)
.venv\Scripts\activate  # Windows
# source .venv/bin/activate  # macOS/Linux

# Start the FastAPI server
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at:
- **API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Alternative docs**: http://localhost:8000/redoc

### Start the Frontend App

Open a new terminal window:

```bash
# From the frontend directory
cd frontend

# Start the Expo development server
npm start
```

This will start the Expo development server and show you options to run the app:

#### Option 1: Run on Physical Device (Recommended)
1. Install **Expo Go** app on your phone
2. Scan the QR code displayed in terminal/browser
3. The app will load on your device

#### Option 2: Run on Emulator/Simulator
```bash
# For Android (requires Android Studio)
npm run android

# For iOS (requires Xcode - macOS only)
npm run ios

# For web browser
npm run web
```

### Alternative Frontend Commands

```bash
# Start with tunnel (for network issues)
npm run start-tunnel

# Start locally (faster, but device must be on same network)
npm run start-local

# Start specific platform with tunnel
npm run android    # Android with tunnel
npm run ios        # iOS with tunnel
```

## 📱 App Features

### Main Features:
- **Activity Feed**: Social health community with real-time activity updates
- **Health Metrics**: Track vital signs and health data
- **Water Tracker**: Monitor daily hydration goals
- **Recipe Search**: Discover healthy meal options
- **Fitness Tracker**: Log workouts and track fitness progress
- **Device Connections**: Sync with health devices and wearables
- **User Profile**: Manage account settings and preferences

### Core Components:
- **Dashboard**: Main hub with activity feed and quick stats
- **Quick Workouts**: Pre-designed workout routines (Walk, HIIT, Strength, Yoga)
- **Social Features**: Friend connections and community challenges
- **Real-time Updates**: Live activity tracking and notifications

## 🐛 Troubleshooting

### Common Issues:

**1. Metro bundler issues:**
```bash
# Clear cache and restart
npx expo start --clear
```

**2. Node modules issues:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

**3. Expo Go connection issues:**
```bash
# Use tunnel mode for network issues
npx expo start --tunnel
```

**4. Backend connection issues:**
- Ensure backend is running on port 8000
- Check firewall settings
- Verify API URL in frontend configuration

**5. Firebase authentication issues:**
- Verify Firebase configuration files are in place
- Check Firebase project settings
- Ensure proper API keys are configured

### Development Tips:

- **Hot Reload**: Code changes will automatically reload the app
- **Debug Mode**: Shake your device or press `d` in terminal to open debug menu
- **Logs**: View logs in terminal or Expo DevTools
- **Network**: Both backend and frontend must be accessible from your device

## 🔧 Environment Variables

Create appropriate environment files:

**Frontend (.env):**
```
EXPO_PUBLIC_API_URL=http://localhost:8000
EXPO_PUBLIC_FIREBASE_CONFIG=your_firebase_config
```

**Backend (.env):**
```
FIREBASE_SERVICE_ACCOUNT_KEY=path_to_service_account.json
DATABASE_URL=your_database_url
```

## 📝 API Documentation

Once the backend is running, you can explore the API at:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the [Expo documentation](https://docs.expo.dev/)
3. Check [React Navigation docs](https://reactnavigation.org/)
4. Create an issue in this repository

---

**Happy coding! 🚀**