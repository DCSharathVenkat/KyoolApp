import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  Image,
  TextInput,
  Dimensions,
  Modal
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { WaitlistDialog } from './components/WaitlistDialog';
import { SimpleTextInputTest } from './components/SimpleTextInputTest';
import { MinimalTextTest } from './components/MinimalTextTest';
import { DebugTextInput } from './components/DebugTextInput';

// Import existing components
import { HealthMetrics } from './components/HealthMetrics';
import { WaterTracker } from './components/WaterTracker';
import { RecipeSearch } from './components/RecipeSearch';
import { FitnessTracker } from './components/FitnessTracker';
import { DeviceConnections } from './components/DeviceConnections';
import { Profile } from './components/Profile';

// Firebase imports
import { auth } from "./firebase";
import { getUserByEmail } from "./api/user_api";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000';
const Stack = createNativeStackNavigator();
const { width, height } = Dimensions.get('window');



// Home/Landing Screen
function HomeScreen({ navigation }: any) {
  const [waitlistVisible, setWaitlistVisible] = useState(false);
  const [testVisible, setTestVisible] = useState(false);
  const [debugVisible, setDebugVisible] = useState(false);

  const features = [
    {
      icon: 'person',
      title: "Executive-Focused",
      description: "Designed specifically for busy leaders and decision-makers",
      benefit: "Tailored to C-suite demands and executive lifestyles",
    },
    {
      icon: 'time',
      title: "Time-Efficient",
      description: "Solutions that work around your schedule, not against it",
      benefit: "5-minute routines that deliver noticeable results",
    },
    {
      icon: 'trending-up',
      title: "Performance-Driven",
      description: "Boost your energy, focus, and leadership impact",
      benefit: "Measurable improvements in decision-making and productivity",
    },
    {
      icon: 'people',
      title: "Specialized Support",
      description: "Practical insights shaped by real executive challenges",
      benefit: "Access to early executive community insights & resources",
    },
  ];

  const stats = [
    { icon: "⚖️", number: "78%", label: "of executives struggle with work-life balance" },
    { icon: "⚡", number: "65%", label: "face chronic stress and burnout daily" },
    { icon: "🍽️", number: "52%", label: "regularly skip meals due to meetings" },
    { icon: "⏳", number: "43%", label: "average less than 6 hours of sleep" },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.hero}
      >
        <View style={styles.heroContent}>
          <View style={styles.badge}>
            <Ionicons name="sparkles" size={16} color="#fff" />
            <Text style={styles.badgeText}>Coming Soon • Limited Early Access</Text>
          </View>
          
          <Text style={styles.heroTitle}>
            Your Health.{'\n'}Your Success.{'\n'}Simplified.
          </Text>

          <Text style={styles.heroSubtitle}>
            The first lifestyle app designed exclusively for executives who refuse to compromise their health for success.
          </Text>

          <Text style={styles.heroDescription}>
            Transform your wellbeing without sacrificing your career.
          </Text>

          <View style={styles.spotsBadge}>
            <Text style={styles.spotsText}>
              ⚡ Spots are limited • Join 237 executives on the waitlist
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.primaryButton]}
              onPress={() => setWaitlistVisible(true)}
            >
              <Text style={styles.buttonText}>Get Early Access</Text>
              <Ionicons name="chevron-forward" size={20} color="#fff" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.dashboardButton]}
              onPress={() => navigation.navigate('Dashboard')}
            >
              <Ionicons name="grid" size={20} color="#667eea" />
              <Text style={[styles.buttonText, styles.dashboardButtonText]}>View Dashboard</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>Get Started</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.disclaimer}>
            No spam, ever. Unsubscribe anytime.
          </Text>
        </View>
      </LinearGradient>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <View style={styles.sectionBadge}>
          <Text style={styles.sectionBadgeText}>Critical Health Data</Text>
        </View>
        <Text style={styles.sectionTitle}>The Executive Health Crisis is Real</Text>
        <Text style={styles.sectionDescription}>
          Corporate success shouldn't come at the cost of your health. The data reveals a troubling reality about executive wellness that demands immediate attention.
        </Text>

        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={styles.statNumber}>{stat.number}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.statsSummary}>
          <Text style={styles.statsSummaryTitle}>It doesn't have to be this way.</Text>
          <Text style={styles.statsSummaryText}>
            KyoolApp is designed to break this cycle and restore balance to executive life.
          </Text>
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <View style={styles.sectionBadge}>
          <Ionicons name="person" size={16} color="#667eea" />
          <Text style={[styles.sectionBadgeText, { color: '#667eea' }]}>Our Approach</Text>
        </View>
        <Text style={styles.sectionTitle}>Built for Your Reality</Text>
        <Text style={styles.sectionDescription}>
          KyoolApp understands the unique challenges of executive life. We create health solutions that adapt to your schedule — not the other way around.
        </Text>

        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Ionicons name={feature.icon as any} size={24} color="#667eea" />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
              <Text style={styles.featureBenefit}>{feature.benefit}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* CTA Section */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.ctaSection}
      >
        <Text style={styles.ctaTitle}>Your Health. Your Edge.</Text>
        <View style={styles.ctaStats}>
          <Text style={styles.ctaStatsText}>237 executives already on the waitlist</Text>
        </View>

        <View style={styles.benefitsList}>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
            <Text style={styles.benefitText}>Priority Coaching Access</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
            <Text style={styles.benefitText}>1-Month Free Trial</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
            <Text style={styles.benefitText}>Lifetime Discount</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.ctaButton}
          onPress={() => setWaitlistVisible(true)}
        >
          <Text style={styles.ctaButtonText}>Join the Waitlist</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.ctaButton, { backgroundColor: '#ff6b6b', marginTop: 10 }]}
          onPress={() => setTestVisible(true)}
        >
          <Text style={styles.ctaButtonText}>Test TextInput Modal</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.ctaButton, { backgroundColor: '#10B981', marginTop: 10 }]}
          onPress={() => navigation.navigate('TextTest')}
        >
          <Text style={styles.ctaButtonText}>Test TextInput Screen</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.ctaButton, { backgroundColor: '#8B5CF6', marginTop: 10 }]}
          onPress={() => setDebugVisible(true)}
        >
          <Text style={styles.ctaButtonText}>Debug TextInput</Text>
        </TouchableOpacity>
      </LinearGradient>

      <WaitlistDialog 
        open={waitlistVisible} 
        onOpenChange={setWaitlistVisible} 
      />
      
      <SimpleTextInputTest 
        visible={testVisible} 
        onClose={() => setTestVisible(false)} 
      />
      
      <DebugTextInput 
        visible={debugVisible} 
        onClose={() => setDebugVisible(false)} 
      />
    </ScrollView>
  );
}

// Login Screen
function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleSignIn = () => {
    Alert.alert('Google Sign In', 'Google authentication will be implemented here');
  };

  const handleEmailSignIn = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    // Navigate to Dashboard for demo
    navigation.navigate('Dashboard');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.authContent}>
      <View style={styles.authHeader}>
        <Text style={styles.authTitle}>Welcome Back</Text>
        <Text style={styles.authSubtitle}>Sign in to continue your health journey</Text>
      </View>

      <View style={styles.authForm}>
        <TextInput
          style={styles.authInput}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.authInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.authButton} onPress={handleEmailSignIn}>
          <Text style={styles.authButtonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
          <FontAwesome5 name="google" size={20} color="#fff" />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.linkText}>
            Don't have an account? <Text style={styles.linkTextBold}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Sign Up Screen
function SignUpScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    Alert.alert('Success', 'Account created successfully!', [
      { text: 'OK', onPress: () => navigation.navigate('Dashboard') }
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.authContent}>
      <View style={styles.authHeader}>
        <Text style={styles.authTitle}>Create Account</Text>
        <Text style={styles.authSubtitle}>Join the executive health revolution</Text>
      </View>

      <View style={styles.authForm}>
        <TextInput
          style={styles.authInput}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.authInput}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.authInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.authButton} onPress={handleSignUp}>
          <Text style={styles.authButtonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>
            Already have an account? <Text style={styles.linkTextBold}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Dashboard Screen
function DashboardScreen({ navigation }: any) {
  const dashboardItems = [
    { title: 'Health Metrics', subtitle: 'Track vital signs', icon: 'heart', screen: 'Health', color: '#ff6b6b' },
    { title: 'Water Tracker', subtitle: 'Stay hydrated', icon: 'water', screen: 'Water', color: '#4ecdc4' },
    { title: 'Recipe Search', subtitle: 'Healthy meals', icon: 'restaurant', screen: 'Recipes', color: '#45b7d1' },
    { title: 'Fitness Tracker', subtitle: 'Track workouts', icon: 'fitness', screen: 'Fitness', color: '#96ceb4' },
    { title: 'Device Sync', subtitle: 'Connect devices', icon: 'phone-portrait', screen: 'Devices', color: '#ffeaa7' },
    { title: 'Profile', subtitle: 'Account settings', icon: 'person', screen: 'Profile', color: '#dda0dd' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.dashboardHeader}
      >
        <Text style={styles.dashboardWelcome}>Welcome back!</Text>
        <Text style={styles.dashboardSubtext}>Ready to optimize your health today?</Text>
      </LinearGradient>

      <View style={styles.dashboardContent}>
        <Text style={styles.dashboardSectionTitle}>Your Health Dashboard</Text>
        
        <View style={styles.dashboardGrid}>
          {dashboardItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={[styles.dashboardCard, { borderLeftColor: item.color }]}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={[styles.dashboardCardIcon, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon as any} size={24} color="#fff" />
              </View>
              <View style={styles.dashboardCardContent}>
                <Text style={styles.dashboardCardTitle}>{item.title}</Text>
                <Text style={styles.dashboardCardSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

// Feature Screens - React Native implementations inspired by existing components
function HealthScreen() {
  const [user, setUser] = useState({
    id: 'demo-user-123', // Demo user ID for testing
    height: 180, 
    weight: 75, 
    age: 35, 
    gender: 'male',
    activityLevel: 'moderately_active' // Add activity level for TDEE calculation
  });

  return <HealthMetrics user={user} setUser={setUser} />;
}

function WaterScreen() {
  return <WaterTracker />;
}

function RecipesScreen() {
  const [user] = useState({
    id: 'demo-user-123',
    name: 'Demo User',
    email: 'demo@example.com',
    height: 180, 
    weight: 75, 
    age: 35, 
    gender: 'male',
    activityLevel: 'moderately_active'
  });

  return <RecipeSearch user={user} safeZone={true} />;
}

function FitnessScreen() {
  const [user] = useState({
    id: 'demo-user-123',
    name: 'Demo User',
    email: 'demo@example.com',
    height: 180, 
    weight: 75, 
    age: 35, 
    gender: 'male',
    activityLevel: 'moderately_active'
  });

  return <FitnessTracker user={user} />;
}

function DevicesScreen() {
  const [user] = useState({
    id: 'demo-user-123',
    name: 'Demo User',
    email: 'demo@example.com',
    height: 180, 
    weight: 75, 
    age: 35, 
    gender: 'male',
    activityLevel: 'moderately_active'
  });

  return <DeviceConnections user={user} />;
}

function ProfileScreen() {
  const [user, setUser] = useState({
    id: 'demo-user-123',
    name: 'John Executive',
    email: 'john@company.com',
    age: 42,
    height: 180,
    weight: 77,
    gender: 'male',
    activityLevel: 'moderately_active',
    goal: 'Weight Management'
  });

  return <Profile user={user} setUser={setUser} />;
}

// Main App Component
export default function App() {
  return (
    <Stack.Navigator 
      initialRouteName="Home"
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
        component={WaterScreen} 
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
        name="TextTest" 
        component={MinimalTextTest} 
        options={{ title: 'Text Input Test' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  // Hero Section
  hero: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
    minHeight: height * 0.7,
  },
  heroContent: {
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 6,
    fontWeight: '500',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 42,
  },
  heroSubtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 26,
  },
  heroDescription: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 20,
  },
  spotsBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 30,
  },
  spotsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  dashboardButton: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.3)',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#667eea',
  },
  secondaryButtonText: {
    color: '#fff',
  },
  dashboardButtonText: {
    color: '#667eea',
  },
  disclaimer: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 15,
  },

  // Stats Section
  statsSection: {
    padding: 20,
  },
  sectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 15,
  },
  sectionBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    marginLeft: 6,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#1a1a1a',
  },
  sectionDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
    marginBottom: 30,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
    lineHeight: 16,
  },
  statsSummary: {
    backgroundColor: '#667eea',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  statsSummaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  statsSummaryText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 22,
  },

  // Features Section
  featuresSection: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  featuresGrid: {
    gap: 15,
  },
  featureCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  featureBenefit: {
    fontSize: 12,
    color: '#667eea',
    lineHeight: 16,
  },

  // CTA Section
  ctaSection: {
    padding: 40,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  ctaStats: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 30,
  },
  ctaStatsText: {
    color: '#fff',
    fontSize: 14,
  },
  benefitsList: {
    gap: 12,
    marginBottom: 30,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  benefitText: {
    color: '#fff',
    fontSize: 16,
  },
  ctaButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  ctaButtonText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '600',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  closeButton: {
    padding: 5,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#667eea',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Auth Styles
  authContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  authHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  authTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  authSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  authForm: {
    gap: 15,
  },
  authInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  authButton: {
    backgroundColor: '#667eea',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 15,
    color: '#666',
    fontSize: 14,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#db4437',
    paddingVertical: 15,
    borderRadius: 12,
    gap: 10,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginTop: 20,
  },
  linkTextBold: {
    color: '#667eea',
    fontWeight: '600',
  },

  // Dashboard Styles
  dashboardHeader: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  dashboardWelcome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  dashboardSubtext: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  dashboardContent: {
    padding: 20,
  },
  dashboardSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 20,
  },
  dashboardGrid: {
    gap: 15,
  },
  dashboardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dashboardCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  dashboardCardContent: {
    flex: 1,
  },
  dashboardCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  dashboardCardSubtitle: {
    fontSize: 14,
    color: '#666',
  },

  // Feature Screen Styles
  featureScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#f8f9fa',
  },
  featureScreenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 20,
    marginBottom: 10,
  },
  featureScreenDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },

  // Enhanced Feature Screen Styles
  featureHeader: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
    marginBottom: -20,
  },
  featureHeaderTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    marginBottom: 5,
  },
  featureHeaderSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  featureContent: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 20,
    marginTop: 20,
  },

  // Health Metrics Styles
  metricsGrid: {
    marginBottom: 25,
  },
  metricCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  metricTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  actionSection: {
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },

  // Water Tracker Styles
  waterProgress: {
    alignItems: 'center',
    marginBottom: 30,
  },
  waterGoalText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 10,
  },
  progressBackground: {
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ecdc4',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
  },
  progressPercentage: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  waterVisualization: {
    alignItems: 'center',
    marginBottom: 30,
  },
  waterGlassContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  waterGlass: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  waterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  waterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  waterButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  tipsSection: {
    marginTop: 20,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
  },

  // Recipe Search Styles
  searchSection: {
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  categoriesScroll: {
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  recipesList: {
    marginBottom: 20,
  },
  recipeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeEmoji: {
    fontSize: 40,
    marginRight: 15,
  },
  recipeInfo: {
    flex: 1,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  recipeCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  recipeStats: {
    flexDirection: 'row',
    gap: 15,
  },
  recipeStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipeStatText: {
    fontSize: 12,
    color: '#6c757d',
    marginLeft: 4,
  },

  // Fitness Tracker Styles
  goalProgress: {
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  goalStats: {
    alignItems: 'center',
    marginBottom: 15,
  },
  goalNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#96ceb4',
  },
  goalLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  workoutTypes: {
    marginBottom: 25,
  },
  workoutGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  workoutCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  workoutDuration: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  startButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  recentWorkouts: {
    marginTop: 10,
  },
  workoutHistory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  workoutHistoryInfo: {
    flex: 1,
  },
  workoutHistoryType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  workoutHistoryDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  workoutHistoryStats: {
    alignItems: 'flex-end',
  },
  workoutHistoryDuration: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  workoutHistoryCalories: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },

  // Device Connection Styles
  connectedSection: {
    marginBottom: 30,
  },
  deviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deviceInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceDetails: {
    marginLeft: 15,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  deviceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  connectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#28a745',
    marginRight: 6,
  },
  batteryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  batteryText: {
    fontSize: 12,
    color: '#6c757d',
    marginLeft: 4,
  },
  deviceButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  deviceButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  availableSection: {
    marginBottom: 30,
  },
  integrationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  integrationCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  integrationName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 15,
    textAlign: 'center',
  },
  connectButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dataSection: {
    marginBottom: 20,
  },
  syncStatusCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
  },
  syncItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  syncLabel: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
  },
  syncTime: {
    fontSize: 12,
    color: '#666',
  },

  // Profile Screen Styles
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#dda0dd',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
  },
  infoSection: {
    marginBottom: 30,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoItem: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#dda0dd',
    borderRadius: 12,
    paddingVertical: 15,
  },
  editProfileText: {
    color: '#dda0dd',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  settingsSection: {
    marginBottom: 30,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#dc3545',
    borderRadius: 12,
    paddingVertical: 15,
  },
  signOutText: {
    color: '#dc3545',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});