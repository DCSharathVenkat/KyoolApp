import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  Dimensions,
  Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as HealthAPI from '../api/health_api';

const { width } = Dimensions.get('window');

export function WaterTracker() {
  const [dailyGoal] = useState(8);
  const [todayIntake, setTodayIntake] = useState(5);
  const [glassSize] = useState(250);
  const [animatedValue] = useState(new Animated.Value(0));

  const weeklyData = [
    { day: 'Mon', intake: 7, goal: 8 },
    { day: 'Tue', intake: 8, goal: 8 },
    { day: 'Wed', intake: 6, goal: 8 },
    { day: 'Thu', intake: 9, goal: 8 },
    { day: 'Fri', intake: 7, goal: 8 },
    { day: 'Sat', intake: 5, goal: 8 },
    { day: 'Sun', intake: 5, goal: 8 },
  ];

  const reminders = [
    { time: '08:00', message: 'Start your day with a glass of water', completed: true },
    { time: '12:00', message: 'Lunch time hydration check', completed: true },
    { time: '15:00', message: 'Afternoon water break', completed: false },
    { time: '18:00', message: 'Evening hydration reminder', completed: false },
    { time: '21:00', message: 'Last glass before bed', completed: false },
  ];

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: (todayIntake / dailyGoal) * 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [todayIntake]);

  const addWater = () => {
    if (todayIntake < 15) {
      setTodayIntake(todayIntake + 1);
      Alert.alert('Great!', `You've had ${todayIntake + 1} glasses today! 💧`);
    } else {
      Alert.alert('Wow!', 'You\'ve had plenty of water today! 🎉');
    }
  };

  const removeWater = () => {
    if (todayIntake > 0) {
      setTodayIntake(todayIntake - 1);
    }
  };

  const getProgressColor = (): [string, string] => {
    const percentage = (todayIntake / dailyGoal) * 100;
    if (percentage >= 100) return ['#10B981', '#059669'];
    if (percentage >= 75) return ['#3B82F6', '#2563EB'];
    if (percentage >= 50) return ['#F59E0B', '#D97706'];
    return ['#EF4444', '#DC2626'];
  };

  const getMotivationMessage = () => {
    const percentage = (todayIntake / dailyGoal) * 100;
    if (percentage >= 100) return "🎉 Great job! You've reached your daily goal!";
    if (percentage >= 75) return "💪 Almost there! Keep it up!";
    if (percentage >= 50) return "👍 You're doing well, stay hydrated!";
    return "💧 Let's start hydrating! Your body will thank you.";
  };

  const StatCard = ({ title, value, subtitle, icon, color = '#3B82F6' }: any) => (
    <View style={[styles.statCard, { borderColor: color }]}>
      <LinearGradient
        colors={[color + '20', color + '10']}
        style={styles.statCardGradient}
      >
        <Ionicons name={icon} size={20} color={color} />
        <Text style={styles.statCardTitle}>{title}</Text>
        <Text style={[styles.statCardValue, { color }]}>{value}</Text>
        {subtitle && <Text style={styles.statCardSubtitle}>{subtitle}</Text>}
      </LinearGradient>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#06b6d4', '#0891b2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Water Tracker</Text>
        <Text style={styles.headerSubtitle}>Stay hydrated and track your daily water intake</Text>
      </LinearGradient>

      <View style={styles.section}>
        <View style={styles.progressCard}>
          <LinearGradient
            colors={getProgressColor()}
            style={styles.progressCardGradient}
          >
            <View style={styles.progressHeader}>
              <Ionicons name="water" size={24} color="white" />
              <Text style={styles.progressTitle}>Today's Progress</Text>
            </View>
            
            <View style={styles.progressMain}>
              <View style={styles.progressNumbers}>
                <Text style={styles.intakeNumber}>{todayIntake}</Text>
                <Text style={styles.intakeText}>of {dailyGoal} glasses</Text>
                <Text style={styles.volumeText}>
                  {todayIntake * glassSize}ml of {dailyGoal * glassSize}ml
                </Text>
              </View>

              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                  <Animated.View 
                    style={[
                      styles.progressBarFill,
                      {
                        width: animatedValue.interpolate({
                          inputRange: [0, 100],
                          outputRange: ['0%', '100%'],
                          extrapolate: 'clamp',
                        }),
                      },
                    ]}
                  />
                </View>
                <Text style={styles.progressPercentage}>
                  {((todayIntake / dailyGoal) * 100).toFixed(0)}%
                </Text>
              </View>

              <View style={styles.waterControls}>
                <TouchableOpacity 
                  style={[styles.waterButton, todayIntake === 0 && styles.waterButtonDisabled]}
                  onPress={removeWater}
                  disabled={todayIntake === 0}
                >
                  <Ionicons name="remove" size={24} color={todayIntake === 0 ? '#9CA3AF' : '#EF4444'} />
                  <Text style={[styles.waterButtonText, todayIntake === 0 && styles.waterButtonTextDisabled]}>
                    -{glassSize}ml
                  </Text>
                </TouchableOpacity>
                
                <View style={styles.glassIndicator}>
                  <View style={styles.glassIcon}>
                    <Ionicons name="wine" size={32} color="#06b6d4" />
                  </View>
                  <Text style={styles.glassText}>{glassSize}ml glass</Text>
                </View>
                
                <TouchableOpacity 
                  style={[styles.waterButton, todayIntake >= 15 && styles.waterButtonDisabled]}
                  onPress={addWater}
                  disabled={todayIntake >= 15}
                >
                  <Ionicons name="add" size={24} color={todayIntake >= 15 ? '#9CA3AF' : '#10B981'} />
                  <Text style={[styles.waterButtonText, todayIntake >= 15 && styles.waterButtonTextDisabled]}>
                    +{glassSize}ml
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.motivationContainer}>
                <Text style={styles.motivationText}>
                  {getMotivationMessage()}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Stats</Text>
        <View style={styles.statsGrid}>
          <StatCard
            title="Daily Goal"
            value={`${dailyGoal}`}
            subtitle="glasses"
            icon="flag"
            color="#8B5CF6"
          />
          
          <StatCard
            title="Remaining"
            value={`${Math.max(0, dailyGoal - todayIntake)}`}
            subtitle="glasses"
            icon="hourglass"
            color="#F59E0B"
          />
          
          <StatCard
            title="Weekly Avg"
            value={`${(weeklyData.reduce((sum, day) => sum + day.intake, 0) / weeklyData.length).toFixed(1)}`}
            subtitle="glasses"
            icon="analytics"
            color="#10B981"
          />
          
          <StatCard
            title="Streak"
            value="3"
            subtitle="days"
            icon="flame"
            color="#EF4444"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weekly Overview</Text>
        <View style={styles.weeklyCard}>
          <View style={styles.weeklyChart}>
            {weeklyData.map((day, index) => (
              <View key={index} style={styles.dayColumn}>
                <Text style={styles.dayLabel}>{day.day}</Text>
                <View style={styles.barContainer}>
                  <View 
                    style={[
                      styles.bar,
                      { 
                        height: Math.max(20, (day.intake / day.goal) * 80),
                        backgroundColor: day.intake >= day.goal ? '#10B981' : '#06b6d4'
                      }
                    ]}
                  />
                  <Text style={styles.barValue}>{day.intake}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hydration Reminders</Text>
        <View style={styles.remindersCard}>
          {reminders.map((reminder, index) => (
            <View key={index} style={styles.reminderItem}>
              <View style={[
                styles.reminderIndicator,
                { backgroundColor: reminder.completed ? '#10B981' : '#E5E7EB' }
              ]} />
              <View style={styles.reminderContent}>
                <Text style={styles.reminderTime}>{reminder.time}</Text>
                <Text style={styles.reminderMessage}>{reminder.message}</Text>
              </View>
              <TouchableOpacity style={styles.reminderCheck}>
                <Ionicons 
                  name={reminder.completed ? "checkmark-circle" : "ellipse-outline"} 
                  size={20} 
                  color={reminder.completed ? '#10B981' : '#9CA3AF'} 
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hydration Tips</Text>
        <View style={styles.tipsCard}>
          <View style={styles.tipItem}>
            <View style={styles.tipIcon}>
              <Ionicons name="sunny" size={24} color="#F59E0B" />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Start your day with water</Text>
              <Text style={styles.tipDescription}>
                Drink a glass of water as soon as you wake up to kickstart your metabolism.
              </Text>
            </View>
          </View>
          
          <View style={styles.tipItem}>
            <View style={styles.tipIcon}>
              <Ionicons name="notifications" size={24} color="#8B5CF6" />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Set regular reminders</Text>
              <Text style={styles.tipDescription}>
                Use app notifications to remind yourself to drink water throughout the day.
              </Text>
            </View>
          </View>
          
          <View style={styles.tipItem}>
            <View style={styles.tipIcon}>
              <Ionicons name="restaurant" size={24} color="#EF4444" />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Eat water-rich foods</Text>
              <Text style={styles.tipDescription}>
                Include fruits and vegetables like watermelon, cucumber, and oranges in your diet.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 8,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  progressCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  progressCardGradient: {
    padding: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 12,
  },
  progressMain: {
    alignItems: 'center',
  },
  progressNumbers: {
    alignItems: 'center',
    marginBottom: 24,
  },
  intakeNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  intakeText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  volumeText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  progressBarContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  progressBarBackground: {
    width: '100%',
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 6,
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginTop: 8,
  },
  waterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  waterButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    minWidth: 80,
  },
  waterButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  waterButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  waterButtonTextDisabled: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  glassIndicator: {
    alignItems: 'center',
  },
  glassIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 8,
  },
  glassText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  motivationContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 16,
    width: '100%',
  },
  motivationText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: (width - 64) / 2,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  statCardGradient: {
    padding: 16,
    alignItems: 'center',
  },
  statCardTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
    marginBottom: 4,
  },
  statCardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statCardSubtitle: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  weeklyCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  weeklyChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
  },
  dayColumn: {
    alignItems: 'center',
  },
  dayLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  barContainer: {
    alignItems: 'center',
  },
  bar: {
    width: 20,
    borderRadius: 10,
    marginBottom: 4,
  },
  barValue: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1F2937',
  },
  remindersCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  reminderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  reminderIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 16,
  },
  reminderContent: {
    flex: 1,
  },
  reminderTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  reminderMessage: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  reminderCheck: {
    marginLeft: 12,
  },
  tipsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tipIcon: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
    marginRight: 16,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
});