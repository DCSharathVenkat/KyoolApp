import React, { useState, useEffect, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface ActivityFeedProps {
  user: any;
  onViewAllFriends: () => void;
  onStartWorkout?: (workout: any) => void;
}

export const ActivityFeed = memo(function ActivityFeed({ user, onViewAllFriends, onStartWorkout }: ActivityFeedProps) {
  const [visibleActivities, setVisibleActivities] = useState(5);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Mock data
  const healthStats = [
    { label: 'Steps', value: '8,547', change: '+12%', icon: 'walk', color: '#4CAF50' },
    { label: 'Calories', value: '2,180', change: '+8%', icon: 'flame', color: '#FF5722' },
    { label: 'Water', value: '6/8', change: '75%', icon: 'water', color: '#2196F3' },
    { label: 'Friends', value: '23', change: '+3', icon: 'people', color: '#9C27B0' }
  ];

  const activities = [
    { id: 1, title: 'Workout Complete', desc: '30 min HIIT', time: '2h ago', icon: 'fitness' },
    { id: 2, title: 'Step Goal Reached', desc: '10,000 steps!', time: '4h ago', icon: 'walk' },
    { id: 3, title: 'Meal Logged', desc: 'Healthy breakfast', time: '6h ago', icon: 'restaurant' },
    { id: 4, title: 'Water Goal', desc: '8 glasses today', time: '8h ago', icon: 'water' },
    { id: 5, title: 'Sleep Tracked', desc: '7.5 hours', time: '10h ago', icon: 'moon' }
  ];

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleActivities(prev => Math.min(prev + 3, activities.length));
      setIsLoadingMore(false);
    }, 1000);
  };

  const handleQuickWorkout = (type: string) => {
    if (onStartWorkout) {
      onStartWorkout({ type, name: `Quick ${type}` });
    } else {
      Alert.alert('Workout', `Starting ${type} workout!`);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Today's Overview</Text>
        <TouchableOpacity onPress={onViewAllFriends}>
          <Ionicons name="people" size={24} color="#667eea" />
        </TouchableOpacity>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {healthStats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name={stat.icon as any} size={20} color={stat.color} />
              <Text style={styles.statChange}>{stat.change}</Text>
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Quick Workouts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Workouts</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.workoutsRow}>
          {['Cardio', 'Strength', 'Yoga', 'HIIT'].map((workout, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.workoutCard, { backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f39c12'][index] }]}
              onPress={() => handleQuickWorkout(workout)}
            >
              <View style={styles.workoutIcon}>
                <Ionicons 
                  name={['heart', 'barbell', 'leaf', 'flash'][index] as any} 
                  size={24} 
                  color="white" 
                />
              </View>
              <Text style={styles.workoutName}>{workout}</Text>
              <Text style={styles.workoutDuration}>15-30 min</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activitiesList}>
          {activities.slice(0, visibleActivities).map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons name={activity.icon as any} size={20} color="#667eea" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityDescription}>{activity.desc}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {visibleActivities < activities.length && (
          <TouchableOpacity 
            style={styles.loadMoreButton}
            onPress={handleLoadMore}
            disabled={isLoadingMore}
          >
            <Text style={styles.loadMoreText}>
              {isLoadingMore ? 'Loading...' : 'Load More'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Weekly Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weekly Summary</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Workouts Completed</Text>
            <Text style={styles.summaryValue}>12</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Average Steps</Text>
            <Text style={styles.summaryValue}>8,547</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Active Friends</Text>
            <Text style={styles.summaryValue}>23</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: (width - 48) / 2,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statChange: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  workoutsRow: {
    paddingLeft: 4,
  },
  workoutCard: {
    width: 120,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
  },
  workoutIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  workoutName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 4,
  },
  workoutDuration: {
    fontSize: 12,
    color: 'white',
    opacity: 0.8,
  },
  activitiesList: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  activityDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 11,
    color: '#999',
  },
  loadMoreButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  loadMoreText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});