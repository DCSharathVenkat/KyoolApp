import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { UserContext } from '../App';
import { userAPI } from '../services/api';

interface DashboardProps {
  navigation?: any;
  onStartWorkout?: (workout: any) => void;
}

export function Dashboard({ navigation, onStartWorkout }: DashboardProps) {
  const { user, userProfile } = useContext(UserContext);
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [dailyStats, setDailyStats] = useState({
    todaySteps: 0,
    stepGoal: 10000,
    waterIntake: 0,
    waterGoal: 8,
    caloriesBurned: 0,
    calorieGoal: 600,
    sleepHours: 0,
    sleepGoal: 8,
    workoutsThisWeek: 0,
    workoutGoal: 5
  });
  const [weightLogs, setWeightLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [userProfile]);

  const loadDashboardData = async () => {
    if (!userProfile?.uid) {
      console.log('⚠️ No user profile available, using demo data');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      console.log('📊 Loading dashboard data for:', userProfile.email);

      // Load user's weight logs
      const logs = await userAPI.getWeightLogs(userProfile.uid);
      setWeightLogs(logs.weightLogs || []);

      // For now, we'll use some smart defaults + any available user data
      // In a full app, you'd have APIs for daily activity, water intake, etc.
      const updatedStats = {
        todaySteps: userProfile.todaySteps || Math.floor(Math.random() * 5000) + 5000,
        stepGoal: userProfile.stepGoal || 10000,
        waterIntake: userProfile.waterIntake || Math.floor(Math.random() * 4) + 4,
        waterGoal: userProfile.waterGoal || 8,
        caloriesBurned: userProfile.caloriesBurned || Math.floor(Math.random() * 300) + 200,
        calorieGoal: userProfile.calorieGoal || 600,
        sleepHours: userProfile.sleepHours || 7 + Math.random() * 2,
        sleepGoal: userProfile.sleepGoal || 8,
        workoutsThisWeek: userProfile.workoutsThisWeek || Math.floor(Math.random() * 3) + 2,
        workoutGoal: userProfile.workoutGoal || 5
      };

      setDailyStats(updatedStats);
      console.log('✅ Dashboard data loaded successfully');

    } catch (error) {
      console.error('❌ Failed to load dashboard data:', error);
      // Fall back to demo data
    } finally {
      setIsLoading(false);
    }
  };

  // Get user name from profile or fallback
  const userName = userProfile?.displayName || 
                  userProfile?.email?.split('@')[0] || 
                  user?.displayName || 
                  'Champion';

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

  // Generate recent activities from weight logs and some mock data
  const recentActivities = React.useMemo(() => {
    const activities = [];
    
    // Add recent weight logs
    if (weightLogs.length > 0) {
      const recentLog = weightLogs[0];
      activities.push({
        id: `weight-${recentLog.id}`,
        activity: 'Weight Logged',
        time: new Date(recentLog.date).toLocaleDateString(),
        weight: `${recentLog.weight}kg`,
        icon: 'fitness'
      });
    }
    
    // Add some demo activities
    activities.push(
      { id: 1, activity: 'Morning Walk', time: '30 min', calories: 180, icon: 'walk' },
      { id: 2, activity: 'Drank Water', time: '1h ago', amount: '500ml', icon: 'water' },
      { id: 3, activity: 'Healthy Meal', time: '3h ago', calories: 450, icon: 'restaurant' }
    );
    
    return activities.slice(0, 3); // Keep only 3 recent activities
  }, [weightLogs]);

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={styles.welcomeText}>Loading your dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome back, {userName}!</Text>
          <Text style={styles.subtitle}>Here's your health summary for today</Text>
          {userProfile?.email && (
            <Text style={styles.emailText}>{userProfile.email}</Text>
          )}
        </View>

        {/* Quick Stats Cards */}
        <View style={styles.statsContainer}>
          <Card style={[styles.statCard, { backgroundColor: '#3B82F6' }]}>
            <CardContent style={styles.statContent}>
              <Ionicons name="walk" size={24} color="white" />
              <Text style={styles.statNumber}>{dailyStats.todaySteps.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Steps Today</Text>
              <View style={styles.progressBar}>
                <View 
                  style={[styles.progressFill, { 
                    width: `${getProgressPercentage(dailyStats.todaySteps, dailyStats.stepGoal)}%` 
                  }]} 
                />
              </View>
            </CardContent>
          </Card>

          <Card style={[styles.statCard, { backgroundColor: '#06B6D4' }]}>
            <CardContent style={styles.statContent}>
              <Ionicons name="water" size={24} color="white" />
              <Text style={styles.statNumber}>{dailyStats.waterIntake}/{dailyStats.waterGoal}</Text>
              <Text style={styles.statLabel}>Glasses of Water</Text>
              <View style={styles.progressBar}>
                <View 
                  style={[styles.progressFill, { 
                    width: `${getProgressPercentage(dailyStats.waterIntake, dailyStats.waterGoal)}%` 
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
              <Text style={styles.statNumber}>{dailyStats.caloriesBurned}</Text>
              <Text style={styles.statLabel}>Calories Burned</Text>
              <View style={styles.progressBar}>
                <View 
                  style={[styles.progressFill, { 
                    width: `${getProgressPercentage(dailyStats.caloriesBurned, dailyStats.calorieGoal)}%` 
                  }]} 
                />
              </View>
            </CardContent>
          </Card>

          <Card style={[styles.statCard, { backgroundColor: '#8B5CF6' }]}>
            <CardContent style={styles.statContent}>
              <Ionicons name="moon" size={24} color="white" />
              <Text style={styles.statNumber}>{dailyStats.sleepHours.toFixed(1)}h</Text>
              <Text style={styles.statLabel}>Sleep Last Night</Text>
              <View style={styles.progressBar}>
                <View 
                  style={[styles.progressFill, { 
                    width: `${getProgressPercentage(dailyStats.sleepHours, dailyStats.sleepGoal)}%` 
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
                <Text style={styles.progressValue}>{dailyStats.workoutsThisWeek}/{dailyStats.workoutGoal}</Text>
                <View style={styles.progressBar}>
                  <View 
                    style={[styles.progressFill, { 
                      width: `${getProgressPercentage(dailyStats.workoutsThisWeek, dailyStats.workoutGoal)}%`,
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
    color: '#64748B',
    textAlign: 'center',
  },
  emailText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 4,
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