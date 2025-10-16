import React, { useState, useEffect, createContext, useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from "./firebase";
import { onAuthStateChanged, User } from 'firebase/auth';
import { userAPI } from './services/api';

// Import screen components
import { Dashboard } from './components/Dashboard';
import { LandingPage } from './components/LandingPage';
import { LoginPageImproved } from './components/LoginPageImproved';
import SignUpPage from './components/SignUpPage';

// Import feature components
import { HealthMetrics } from './components/HealthMetrics';
import { WaterTracker } from './components/WaterTracker';
import { RecipeSearch } from './components/RecipeSearch';
import { FitnessTracker } from './components/FitnessTracker';
import { DeviceConnections } from './components/DeviceConnections';
import { Profile } from './components/Profile';
import { ActivityFeed } from './components/ActivityFeed';
import { FindDietician } from './components/FindDietician';
import { RealTimeCoaching } from './components/RealTimeCoaching';

const Stack = createNativeStackNavigator();

// Global user context
export const UserContext = createContext<{
  user: User | null;
  userProfile: any | null;
  updateUserProfile: (profile: any) => void;
  isLoading: boolean;
}>({
  user: null,
  userProfile: null,
  updateUserProfile: () => {},
  isLoading: true,
});

// Custom hook to use user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserContext.Provider');
  }
  return context;
};

// Screen wrapper components
function HomeScreen({ navigation }: any) {
  return <LandingPage onLogin={() => navigation.navigate('Login')} onSignUp={() => navigation.navigate('SignUp')} />;
}

function LoginScreen({ navigation }: any) {
  return <LoginPageImproved navigation={navigation} />;
}

function SignUpScreen({ navigation }: any) {
  return <SignUpPage navigation={navigation} />;
}

// Enhanced component wrappers that use context
function DashboardScreen(props: any) {
  const { userProfile } = useUser();
  const user = userProfile || {
    id: 'loading',
    name: 'Loading...',
    email: 'loading...'
  };
  return <Dashboard {...props} user={user} />;
}

function HealthScreen(props: any) {
  const { userProfile, updateUserProfile } = useUser();
  const [user, setUser] = useState(userProfile || {
    id: 'demo-user-123',
    height: 180,
    weight: 75,
    age: 30,
    gender: 'male',
    activityLevel: 'moderately_active'
  });

  useEffect(() => {
    if (userProfile) {
      setUser(userProfile);
    }
  }, [userProfile]);

  const handleUserUpdate = (newUser: any) => {
    setUser(newUser);
    updateUserProfile(newUser);
  };

  return <HealthMetrics {...props} user={user} setUser={handleUserUpdate} />;
}

function RecipesScreen(props: any) {
  const { userProfile } = useUser();
  const user = userProfile || {
    id: 'demo-user-123',
    name: 'Demo User',
    email: 'demo@example.com',
    height: 180,
    weight: 75,
    age: 35,
    gender: 'male',
    activityLevel: 'moderately_active'
  };
  return <RecipeSearch {...props} user={user} safeZone={true} />;
}

function FitnessScreen(props: any) {
  const { userProfile } = useUser();
  const user = userProfile || {
    id: 'demo-user-123',
    name: 'Demo User',
    email: 'demo@example.com',
    height: 180,
    weight: 75,
    age: 35,
    gender: 'male',
    activityLevel: 'moderately_active'
  };
  return <FitnessTracker {...props} user={user} />;
}

function DevicesScreen(props: any) {
  const { userProfile } = useUser();
  const user = userProfile || {
    id: 'demo-user-123',
    name: 'Demo User',
    email: 'demo@example.com'
  };
  return <DeviceConnections {...props} user={user} />;
}

function ProfileScreen(props: any) {
  const { userProfile, updateUserProfile } = useUser();
  const [user, setUser] = useState(userProfile || {
    id: 'demo-user-123',
    name: 'Demo User',
    email: 'demo@example.com',
    age: 30,
    height: 180,
    weight: 75,
    gender: 'male',
    activityLevel: 'moderately_active',
    goal: 'Weight Management'
  });

  useEffect(() => {
    if (userProfile) {
      setUser(userProfile);
    }
  }, [userProfile]);

  const handleUserUpdate = (newUser: any) => {
    setUser(newUser);
    updateUserProfile(newUser);
  };

  return <Profile {...props} user={user} setUser={handleUserUpdate} />;
}

function ActivityScreen(props: any) {
  const { userProfile } = useUser();
  const user = userProfile || {
    id: 'demo-user-123',
    name: 'Demo User',
    email: 'demo@example.com'
  };
  return <ActivityFeed {...props} user={user} onViewAllFriends={() => {}} onStartWorkout={() => {}} />;
}

function DieticianScreen(props: any) {
  const { userProfile } = useUser();
  const user = userProfile || {
    id: 'demo-user-123',
    name: 'Demo User',
    email: 'demo@example.com'
  };
  return <FindDietician {...props} user={user} />;
}

function CoachingScreen(props: any) {
  return (
    <RealTimeCoaching 
      {...props}
      isWorkoutActive={true}
      currentExercise="Push-ups"
      onWorkoutPause={() => {}}
      onWorkoutResume={() => {}}
      onExerciseChange={(exercise) => console.log('Exercise changed to:', exercise)}
    />
  );
}

// Main App Component
export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          console.log("👤 Authenticated user:", user.email);
          
          // Try to get user profile from backend
          const profile = await userAPI.getProfile();
          setUserProfile(profile);
          console.log("✅ User profile loaded:", profile.email);
          
        } catch (error) {
          console.log("⚠️ Creating new user profile for:", user.email);
          
          // Create new user profile in backend
          try {
            const newProfile = {
              email: user.email,
              displayName: user.displayName || '',
              photoURL: user.photoURL || '',
              uid: user.uid,
              isActive: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              preferences: {
                notifications: true,
                darkMode: false,
                units: 'metric'
              }
            };
            
            const createdProfile = await userAPI.createOrUpdateProfile(user.uid, newProfile);
            setUserProfile(createdProfile);
            console.log("✅ New user profile created:", createdProfile.email);
            
          } catch (createError) {
            console.error("❌ Failed to create user profile:", createError);
            // Use minimal profile from Firebase
            setUserProfile({
              email: user.email,
              displayName: user.displayName || '',
              photoURL: user.photoURL || '',
              uid: user.uid
            });
          }
        }
      } else {
        setUserProfile(null);
        console.log("🚪 User signed out");
      }
      
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const updateUserProfile = async (newProfile: any) => {
    setUserProfile(newProfile);
    
    // Sync with backend
    if (currentUser && newProfile.uid) {
      try {
        await userAPI.updateProfile(currentUser.uid, newProfile);
        console.log("✅ User profile synced to backend");
      } catch (error) {
        console.error("❌ Failed to sync user profile:", error);
      }
    }
  };

  if (isLoading) {
    return null; // Show loading screen if needed
  }

  return (
    <UserContext.Provider value={{ user: currentUser, userProfile, updateUserProfile, isLoading }}>
      <Stack.Navigator 
        initialRouteName={currentUser ? "Dashboard" : "Home"}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#667eea',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {currentUser ? (
          // Authenticated screens
          <>
            <Stack.Screen 
              name="Dashboard" 
              component={DashboardScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Health" 
              component={HealthScreen}
              options={{ title: 'Health Metrics' }}
            />
            <Stack.Screen 
              name="Water" 
              component={WaterTracker} 
              options={{ title: 'Water Tracker' }}
            />
            <Stack.Screen 
              name="Recipes" 
              component={RecipesScreen}
              options={{ title: 'Recipe Search' }}
            />
            <Stack.Screen 
              name="Fitness" 
              component={FitnessScreen}
              options={{ title: 'Fitness Tracker' }}
            />
            <Stack.Screen 
              name="Devices" 
              component={DevicesScreen}
              options={{ title: 'Device Connections' }}
            />
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen}
              options={{ title: 'Profile' }}
            />
            <Stack.Screen 
              name="Activity" 
              component={ActivityScreen}
              options={{ title: 'Activity Feed' }}
            />
            <Stack.Screen 
              name="Dietician" 
              component={DieticianScreen}
              options={{ title: 'Find Dietician' }}
            />
            <Stack.Screen 
              name="Coaching" 
              component={CoachingScreen}
              options={{ title: 'Real-Time Coaching' }}
            />
          </>
        ) : (
          // Authentication screens
          <>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ title: 'Sign In' }}
            />
            <Stack.Screen 
              name="SignUp" 
              component={SignUpScreen} 
              options={{ title: 'Create Account' }}
            />
          </>
        )}
      </Stack.Navigator>
    </UserContext.Provider>
  );
}