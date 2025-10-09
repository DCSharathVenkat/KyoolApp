import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { WaitlistDialog } from '../components/WaitlistDialog';
import { SimpleTextInputTest } from '../components/SimpleTextInputTest';
import { DebugTextInput } from '../components/DebugTextInput';

interface HomeScreenProps {
  navigation: any;
}

export function HomeScreen({ navigation }: HomeScreenProps) {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hero: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  heroContent: {
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 44,
  },
  heroSubtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 26,
  },
  heroDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 20,
  },
  spotsBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 30,
  },
  spotsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#fff',
  },
  dashboardButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#667eea',
  },
  dashboardButtonText: {
    color: '#667eea',
  },
  secondaryButtonText: {
    color: '#fff',
  },
  disclaimer: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
  },
  statsSection: {
    padding: 20,
  },
  sectionBadge: {
    alignSelf: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#333',
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
    marginBottom: 12,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
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
    alignItems: 'center',
  },
  statsSummaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  statsSummaryText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresSection: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  featureBenefit: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '600',
  },
  ctaSection: {
    padding: 30,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  ctaStats: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
  },
  ctaStatsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  benefitsList: {
    width: '100%',
    marginBottom: 30,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  benefitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  ctaButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  ctaButtonText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '600',
  },
});