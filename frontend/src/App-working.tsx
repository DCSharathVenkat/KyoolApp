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

// Firebase imports
import { auth } from "./firebase";
import { getUserByEmail } from "./api/user_api";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000';
const Stack = createNativeStackNavigator();
const { width, height } = Dimensions.get('window');

// Waitlist Modal Component
function WaitlistModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (!email || !name) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    Alert.alert('Success!', `Thank you ${name}! You've been added to our waitlist.`);
    setEmail('');
    setName('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Join the Waitlist</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.modalSubtitle}>
            Get early access to KyoolApp and be among the first executives to transform your health routine.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Join Waitlist</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// Home/Landing Screen
function HomeScreen({ navigation }: any) {
  const [waitlistVisible, setWaitlistVisible] = useState(false);

  const features = [
    {
      icon: 'target',
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
          <Ionicons name="target" size={16} color="#667eea" />
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
      </LinearGradient>

      <WaitlistModal 
        visible={waitlistVisible} 
        onClose={() => setWaitlistVisible(false)} 
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

// Feature Screens
function HealthScreen() {
  return (
    <View style={styles.featureScreen}>
      <Ionicons name="heart" size={64} color="#ff6b6b" />
      <Text style={styles.featureScreenTitle}>Health Metrics</Text>
      <Text style={styles.featureScreenDescription}>Track your vital signs and health data</Text>
    </View>
  );
}

function WaterScreen() {
  return (
    <View style={styles.featureScreen}>
      <Ionicons name="water" size={64} color="#4ecdc4" />
      <Text style={styles.featureScreenTitle}>Water Tracker</Text>
      <Text style={styles.featureScreenDescription}>Monitor your daily hydration goals</Text>
    </View>
  );
}

function RecipesScreen() {
  return (
    <View style={styles.featureScreen}>
      <Ionicons name="restaurant" size={64} color="#45b7d1" />
      <Text style={styles.featureScreenTitle}>Recipe Search</Text>
      <Text style={styles.featureScreenDescription}>Discover healthy executive-friendly meals</Text>
    </View>
  );
}

function FitnessScreen() {
  return (
    <View style={styles.featureScreen}>
      <Ionicons name="fitness" size={64} color="#96ceb4" />
      <Text style={styles.featureScreenTitle}>Fitness Tracker</Text>
      <Text style={styles.featureScreenDescription}>Track workouts and fitness progress</Text>
    </View>
  );
}

function DevicesScreen() {
  return (
    <View style={styles.featureScreen}>
      <Ionicons name="phone-portrait" size={64} color="#ffeaa7" />
      <Text style={styles.featureScreenTitle}>Device Connections</Text>
      <Text style={styles.featureScreenDescription}>Sync with your health devices</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.featureScreen}>
      <Ionicons name="person" size={64} color="#dda0dd" />
      <Text style={styles.featureScreenTitle}>Profile</Text>
      <Text style={styles.featureScreenDescription}>Manage your account settings</Text>
    </View>
  );
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
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#667eea',
  },
  secondaryButtonText: {
    color: '#fff',
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
});