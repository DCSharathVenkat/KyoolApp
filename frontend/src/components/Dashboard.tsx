import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { ActivityFeed } from './ActivityFeed';
import { FeatureCard } from './FeatureCard';

interface DashboardProps {
  user?: any;
  onStartWorkout?: (workout: any) => void;
}

export function Dashboard({ user, onStartWorkout }: DashboardProps) {
  const [activeView, setActiveView] = useState<'dashboard' | 'activity'>('dashboard');

  const features = [
    {
      icon: 'fitness-outline' as const,
      title: 'Fitness Tracker',
      description: 'Track your workouts and monitor progress',
      benefit: 'Stay motivated with detailed analytics',
      colorScheme: 'blue' as const,
      onPress: () => console.log('Fitness Tracker pressed')
    },
    {
      icon: 'restaurant-outline' as const,
      title: 'Recipe Search',
      description: 'Find healthy recipes tailored to you',
      benefit: 'Discover nutritious meal options',
      colorScheme: 'green' as const,
      onPress: () => console.log('Recipe Search pressed')
    },
    {
      icon: 'heart-outline' as const,
      title: 'Health Metrics',
      description: 'Monitor vital health indicators',
      benefit: 'Track your wellness journey',
      colorScheme: 'purple' as const,
      onPress: () => console.log('Health Metrics pressed')
    },
    {
      icon: 'people-outline' as const,
      title: 'Activity Feed',
      description: 'Connect with friends and community',
      benefit: 'Share your fitness journey',
      colorScheme: 'orange' as const,
      onPress: () => setActiveView('activity')
    }
  ];

  if (activeView === 'activity') {
    return (
      <ActivityFeed 
        user={user} 
        onViewAllFriends={() => console.log('View all friends')} 
        onStartWorkout={onStartWorkout} 
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.subtitle}>Choose a feature to get started</Text>
        </View>

        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              benefit={feature.benefit}
              colorScheme={feature.colorScheme}
              onPress={feature.onPress}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});