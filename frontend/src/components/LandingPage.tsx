// React Native Landing Page Component
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Ionicons } from '@expo/vector-icons';
import { WaitlistCounter } from './WaitlistCounter';
import { WaitlistDialog } from './WaitlistDialog';

const { width } = Dimensions.get('window');

interface LandingPageProps {
  onLogin: () => void;
  onSignUp: () => void;
}

export function LandingPage({ onLogin, onSignUp }: LandingPageProps) {
  const [showWaitlist, setShowWaitlist] = useState(false);
  
  const features = [
    {
      icon: 'heart' as const,
      title: 'Track Your Health',
      description: 'Monitor your weight, BMI, and daily calorie intake with simple, easy-to-understand metrics.',
      color: '#FF3B30'
    },
    {
      icon: 'water' as const,
      title: 'Stay Hydrated',
      description: 'Get friendly reminders to drink water throughout the day and track your hydration goals.',
      color: '#007AFF'
    },
    {
      icon: 'restaurant' as const,
      title: 'Healthy Recipes',
      description: 'Discover nutritious meal ideas based on your dietary preferences and available ingredients.',
      color: '#34C759'
    },
    {
      icon: 'fitness' as const,
      title: 'Workout Tracking',
      description: 'Log your exercises, track progress, and celebrate your fitness achievements.',
      color: '#AF52DE'
    },
    {
      icon: 'people' as const,
      title: 'Social Support',
      description: 'Connect with friends, share your progress, and motivate each other on your health journey.',
      color: '#FF9500'
    },
    {
      icon: 'bulb' as const,
      title: 'AI Coach',
      description: 'Get personalized health insights and recommendations powered by artificial intelligence.',
      color: '#FFCC00'
    }
  ];

  const benefits = [
    {
      title: 'Simple & Easy',
      description: 'No complicated charts or confusing data. Just clear, actionable health insights.',
      icon: 'checkmark-circle' as const
    },
    {
      title: 'Personalized',
      description: 'Every recommendation is tailored to your unique health goals and lifestyle.',
      icon: 'person' as const
    },
    {
      title: 'Science-Based',
      description: 'All our features are backed by the latest health and nutrition research.',
      icon: 'library' as const
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>
            Your Personal Health Companion
          </Text>
          <Text style={styles.heroSubtitle}>
            Track your wellness journey with simple tools that actually help you stay healthy and motivated.
          </Text>
          
          <View style={styles.heroButtons}>
            <Button 
              style={styles.primaryButton}
              onPress={onSignUp}
            >
              Get Started Free
            </Button>
            <Button 
              variant="outline"
              style={styles.secondaryButton}
              onPress={onLogin}
            >
              Sign In
            </Button>
          </View>

          <WaitlistCounter />

          <View style={styles.heroStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>10K+</Text>
              <Text style={styles.statLabel}>Active Users</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>50M+</Text>
              <Text style={styles.statLabel}>Workouts Tracked</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4.8★</Text>
              <Text style={styles.statLabel}>App Rating</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Everything You Need</Text>
        <Text style={styles.sectionSubtitle}>
          Comprehensive health tracking made simple
        </Text>
        
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <Card key={index} style={styles.featureCard}>
              <CardHeader>
                <View style={[styles.featureIcon, { backgroundColor: feature.color + '20' }]}>
                  <Ionicons name={feature.icon} size={24} color={feature.color} />
                </View>
                <CardTitle style={styles.featureTitle}>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </CardContent>
            </Card>
          ))}
        </View>
      </View>

      {/* Waitlist Teaser Section */}
      <View style={styles.waitlistSection}>
        <View style={styles.waitlistCard}>
          <View style={styles.waitlistBadge}>
            <Ionicons name="star" size={16} color="#FF9500" />
            <Text style={styles.waitlistBadgeText}>Early Access</Text>
          </View>
          
          <Text style={styles.waitlistTitle}>Be Among the First to Experience Premium Health Tracking</Text>
          <Text style={styles.waitlistDescription}>
            Join our exclusive waitlist to get early access to advanced features, personalized AI coaching, and priority support.
          </Text>
          
          <View style={styles.waitlistBenefits}>
            <View style={styles.waitlistBenefit}>
              <Ionicons name="checkmark-circle" size={20} color="#34C759" />
              <Text style={styles.waitlistBenefitText}>Premium features free for 3 months</Text>
            </View>
            <View style={styles.waitlistBenefit}>
              <Ionicons name="checkmark-circle" size={20} color="#34C759" />
              <Text style={styles.waitlistBenefitText}>Personal AI health coach</Text>
            </View>
            <View style={styles.waitlistBenefit}>
              <Ionicons name="checkmark-circle" size={20} color="#34C759" />
              <Text style={styles.waitlistBenefitText}>Priority customer support</Text>
            </View>
          </View>
          
          <Button 
            style={styles.waitlistCTA}
            onPress={() => setShowWaitlist(true)}
          >
            Join Waitlist - It's Free!
          </Button>
          
          <WaitlistCounter />
        </View>
      </View>

      {/* Benefits Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Choose KyoolApp?</Text>
        
        <View style={styles.benefitsContainer}>
          {benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <View style={styles.benefitIcon}>
                <Ionicons name={benefit.icon} size={20} color="#007AFF" />
              </View>
              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>{benefit.title}</Text>
                <Text style={styles.benefitDescription}>{benefit.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Ready to Start Your Health Journey?</Text>
        <Text style={styles.ctaSubtitle}>
          Join thousands of users who have transformed their lives with KyoolApp
        </Text>
        
        <View style={styles.ctaButtons}>
          <Button 
            style={styles.ctaPrimaryButton}
            onPress={onSignUp}
          >
            Get Started Now
          </Button>
          
          <Button 
            variant="outline"
            style={styles.ctaWaitlistButton}
            onPress={() => setShowWaitlist(true)}
          >
            Join Early Access Waitlist
          </Button>
          
          <TouchableOpacity style={styles.ctaSecondaryButton} onPress={onLogin}>
            <Text style={styles.ctaSecondaryText}>Already have an account? Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 KyoolApp. All rights reserved.</Text>
      </View>
      
      {/* Waitlist Dialog */}
      <WaitlistDialog 
        open={showWaitlist}
        onOpenChange={setShowWaitlist}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  hero: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    maxWidth: 600,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1C1C1E',
    marginBottom: 16,
    lineHeight: 40,
  },
  heroSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    marginBottom: 32,
    lineHeight: 26,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 48,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryButton: {
    minWidth: 140,
  },
  secondaryButton: {
    minWidth: 140,
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 400,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 32,
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    marginBottom: 16,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  benefitsContainer: {
    gap: 24,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  benefitIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  ctaSection: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  ctaSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 32,
    maxWidth: 400,
  },
  ctaButtons: {
    alignItems: 'center',
    gap: 16,
  },
  ctaPrimaryButton: {
    minWidth: 200,
  },
  ctaWaitlistButton: {
    minWidth: 200,
    marginTop: 12,
  },
  ctaSecondaryButton: {
    padding: 8,
  },
  ctaSecondaryText: {
    color: '#007AFF',
    fontSize: 14,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
  },
  // Waitlist styles
  waitlistSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#F8F9FA',
  },
  waitlistCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  waitlistBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3CD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 16,
  },
  waitlistBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF9500',
    marginLeft: 4,
  },
  waitlistTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  waitlistDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
    lineHeight: 24,
  },
  waitlistBenefits: {
    alignSelf: 'stretch',
    marginBottom: 24,
  },
  waitlistBenefit: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  waitlistBenefitText: {
    fontSize: 16,
    color: '#1C1C1E',
    marginLeft: 12,
    flex: 1,
  },
  waitlistCTA: {
    minWidth: 250,
    marginBottom: 16,
  },
});