import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TextInput, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmail } from '../api/user_api';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

interface LoginPageProps {
  navigation?: any;
}

export function LoginPageImproved({ navigation }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Use the Google Auth hook
  const { signInWithGoogle, isLoading: googleLoading, isReady: googleReady, isConfigured } = useGoogleAuth();

  const handleEmailLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const result = await signInWithEmail(email, password);
      
      if (result.success) {
        Alert.alert(
          'Success', 
          'Logged in successfully!',
          [{ text: 'OK' }],
          { cancelable: false }
        );
        
        // Navigate to Dashboard immediately
        setTimeout(() => {
          navigation?.navigate('Dashboard');
        }, 500);
        
      } else {
        Alert.alert('Error', result.error || 'Failed to log in');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Failed to log in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      console.log('🎯 LoginPage: Starting Google Sign-In...');
      const result = await signInWithGoogle();
      
      if (result.success) {
        console.log('✅ LoginPage: Google Sign-In successful!');
        console.log('🔄 LoginPage: Navigating to Dashboard...');
        
        // Show success message briefly and navigate immediately
        Alert.alert(
          'Success', 
          `Welcome ${result.user.name || result.user.email}!`,
          [{ text: 'OK' }],
          { cancelable: false }
        );
        
        // Navigate to Dashboard immediately
        setTimeout(() => {
          navigation?.navigate('Dashboard');
        }, 500); // Small delay to let the alert show briefly
        
      } else {
        console.warn('⚠️ LoginPage: Google Sign-In failed:', result.error);
        Alert.alert('Google Sign-In Failed', result.error || 'Please try again or use email/password login.');
      }
    } catch (error) {
      console.error('❌ LoginPage: Google Sign-In error:', error);
      Alert.alert('Error', 'Failed to sign in with Google. Please try again.');
    }
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your KyoolApp account</Text>
          
          {/* Google Sign-In Status Indicator */}
          <View style={styles.statusContainer}>
            <View style={styles.statusRow}>
              <View style={[styles.statusDot, isConfigured ? styles.statusGreen : styles.statusRed]} />
              <Text style={styles.statusText}>
                Google OAuth: {isConfigured ? 'Configured' : 'Not Configured'}
              </Text>
            </View>
            <View style={styles.statusRow}>
              <View style={[styles.statusDot, googleReady ? styles.statusGreen : styles.statusYellow]} />
              <Text style={styles.statusText}>
                Platform: {Platform.OS} ({googleReady ? 'Ready' : 'Initializing'})
              </Text>
            </View>
          </View>
          
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <TouchableOpacity
              style={[styles.button, styles.primaryButton, loading && styles.disabledButton]}
              onPress={handleEmailLogin}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                styles.googleButton,
                (!googleReady || googleLoading || !isConfigured) && styles.disabledButton
              ]}
              onPress={handleGoogleSignIn}
              disabled={!googleReady || googleLoading || !isConfigured}
            >
              <Ionicons name="logo-google" size={20} color="#fff" />
              <Text style={styles.buttonText}>
                {googleLoading 
                  ? 'Signing in with Google...' 
                  : !isConfigured
                  ? 'Google OAuth Not Configured'
                  : !googleReady
                  ? 'Google Sign-In Initializing...'
                  : 'Continue with Google'
                }
              </Text>
            </TouchableOpacity>

            {!isConfigured && (
              <View style={styles.configWarning}>
                <Text style={styles.warningText}>
                  ⚠️ Google Sign-In requires OAuth configuration. Please check your .env file.
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => navigation?.navigate('SignUp')}
            >
              <Text style={styles.linkText}>
                Don't have an account? <Text style={styles.linkTextBold}>Sign up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: 30,
  },
  statusContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  statusGreen: {
    backgroundColor: '#10B981',
  },
  statusRed: {
    backgroundColor: '#EF4444',
  },
  statusYellow: {
    backgroundColor: '#F59E0B',
  },
  statusText: {
    fontSize: 12,
    color: '#6B7280',
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
  },
  primaryButton: {
    backgroundColor: '#667eea',
  },
  googleButton: {
    backgroundColor: '#DC2626',
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#D1D5DB',
  },
  dividerText: {
    marginHorizontal: 15,
    color: '#6B7280',
    fontSize: 14,
  },
  configWarning: {
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  warningText: {
    color: '#92400E',
    fontSize: 12,
    textAlign: 'center',
  },
  linkButton: {
    marginTop: 20,
  },
  linkText: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 14,
  },
  linkTextBold: {
    color: '#667eea',
    fontWeight: '600',
  },
});