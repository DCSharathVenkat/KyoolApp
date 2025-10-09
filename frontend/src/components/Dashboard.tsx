import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface DashboardProps {
  user?: any;
  navigation?: any;
  onStartWorkout?: (workout: any) => void;
}

export function Dashboard({ user, navigation, onStartWorkout }: DashboardProps) {
  const [selectedMetric, setSelectedMetric] = useState('overview');

  // Mock user data - replace with real data
  const userData = {
    name: user?.name || 'Champion',
    todaySteps: 7834,
    stepGoal: 10000,
    waterIntake: 6,
    waterGoal: 8,
    caloriesBurned: 420,
    calorieGoal: 600,
    sleepHours: 7.5,
    sleepGoal: 8,
    workoutsThisWeek: 4,
    workoutGoal: 5
  };

  const quickActions = [
    {
      icon: 'heart' as const,
      title: 'Health Metrics',
      color: '#EF4444',
      onPress: () => navigation?.navigate('Health')
    },
    {
      icon: 'water' as const,
      title: 'Water Tracker',
      color: '#06B6D4',
      onPress: () => navigation?.navigate('Water')
    },
    {
      icon: 'restaurant' as const,
      title: 'Recipes',
      color: '#10B981',
      onPress: () => navigation?.navigate('Recipes')
    },
    {
      icon: 'fitness' as const,
      title: 'Fitness',
      color: '#3B82F6',
      onPress: () => navigation?.navigate('Fitness')
    },
    {
      icon: 'phone-portrait' as const,
      title: 'Connected Devices',
      color: '#F59E0B',
      onPress: () => navigation?.navigate('Devices')
    },
    {
      icon: 'person' as const,
      title: 'Profile',
      color: '#8B5CF6',
      onPress: () => navigation?.navigate('Profile')
    }
  ];

  const recentActivities = [
    { id: 1, activity: 'Morning Run', time: '30 min', calories: 280, icon: 'fitness' },
    { id: 2, activity: 'Drank Water', time: '2h ago', amount: '500ml', icon: 'water' },
    { id: 3, activity: 'Healthy Lunch', time: '4h ago', calories: 450, icon: 'restaurant' },
  ];

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome back, {userData.name}!</Text>
          <Text style={styles.subtitle}>Here's your health summary for today</Text>
        </View>

        {/* Quick Stats Cards */}
        <View style={styles.statsContainer}>
          <Card style={[styles.statCard, { backgroundColor: '#3B82F6' }]}>
            <CardContent style={styles.statContent}>
              <Ionicons name="walk" size={24} color="white" />
              <Text style={styles.statNumber}>{userData.todaySteps.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Steps Today</Text>
              <View style={styles.progressBar}>
                <View 
                  style={[styles.progressFill, { 
                    width: `${getProgressPercentage(userData.todaySteps, userData.stepGoal)}%` 
                  }]} 
                />
              </View>
            </CardContent>
          </Card>

          <Card style={[styles.statCard, { backgroundColor: '#06B6D4' }]}>
            <CardContent style={styles.statContent}>
              <Ionicons name="water" size={24} color="white" />
              <Text style={styles.statNumber}>{userData.waterIntake}/{userData.waterGoal}</Text>
              <Text style={styles.statLabel}>Water Glasses</Text>
              <View style={styles.progressBar}>
                <View 
                  style={[styles.progressFill, { 
                    width: `${getProgressPercentage(userData.waterIntake, userData.waterGoal)}%` 
                  }]} 
                />
              </View>
            </CardContent>
          </Card>
        </View>

        <View style={styles.statsContainer}>
          <Card style={[styles.statCard, { backgroundColor: '#10B981' }]}>
            <CardContent style={styles.statContent}>
              <Ionicons name="flame" size={24} color="white" />
              <Text style={styles.statNumber}>{userData.caloriesBurned}</Text>
              <Text style={styles.statLabel}>Calories Burned</Text>
              <View style={styles.progressBar}>
                <View 
                  style={[styles.progressFill, { 
                    width: `${getProgressPercentage(userData.caloriesBurned, userData.calorieGoal)}%` 
                  }]} 
                />
              </View>
            </CardContent>
          </Card>

          <Card style={[styles.statCard, { backgroundColor: '#8B5CF6' }]}>
            <CardContent style={styles.statContent}>
              <Ionicons name="moon" size={24} color="white" />
              <Text style={styles.statNumber}>{userData.sleepHours}h</Text>
              <Text style={styles.statLabel}>Sleep Last Night</Text>
              <View style={styles.progressBar}>
                <View 
                  style={[styles.progressFill, { 
                    width: `${getProgressPercentage(userData.sleepHours, userData.sleepGoal)}%` 
                  }]} 
                />
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Quick Actions */}
        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={[styles.quickActionButton, { backgroundColor: action.color }]}
                  onPress={action.onPress}
                >
                  <Ionicons name={action.icon} size={24} color="white" />
                  <Text style={styles.quickActionText}>{action.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivities.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Ionicons name={activity.icon as any} size={20} color="#6B7280" />
                </View>
                <View style={styles.activityDetails}>
                  <Text style={styles.activityName}>{activity.activity}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
                <Text style={styles.activityValue}>
                  {activity.calories ? `${activity.calories} cal` : activity.amount}
                </Text>
              </View>
            ))}
            
            <Button 
              style={styles.viewAllButton}
              onPress={() => navigation?.navigate('Activity')}
            >
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Weekly Progress */}
        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>This Week's Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.weeklyProgress}>
              <View style={styles.progressItem}>
                <Text style={styles.progressLabel}>Workouts</Text>
                <Text style={styles.progressValue}>{userData.workoutsThisWeek}/{userData.workoutGoal}</Text>
                <View style={styles.progressBar}>
                  <View 
                    style={[styles.progressFill, { 
                      width: `${getProgressPercentage(userData.workoutsThisWeek, userData.workoutGoal)}%`,
                      backgroundColor: '#3B82F6'
                    }]} 
                  />
                </View>
              </View>
            </View>
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
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
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statContent: {
    alignItems: 'center',
    padding: 16,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
    marginTop: 4,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 2,
  },
  card: {
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    width: '31%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    minHeight: 80,
  },
  quickActionText: {
    color: 'white',
    fontWeight: '600',
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityDetails: {
    flex: 1,
  },
  activityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  activityTime: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  activityValue: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
  },
  viewAllButton: {
    marginTop: 16,
    backgroundColor: '#6B7280',
    borderRadius: 8,
  },
  weeklyProgress: {
    gap: 16,
  },
  progressItem: {
    gap: 8,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  progressValue: {
    fontSize: 14,
    color: '#6B7280',
  },
});