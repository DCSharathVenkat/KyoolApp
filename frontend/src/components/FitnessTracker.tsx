import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  SafeAreaView,
  Modal,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as FitnessAPI from '../api/fitness_api';

const { width } = Dimensions.get('window');

interface FitnessTrackerProps {
  user?: any;
}

interface Workout {
  id: number;
  name: string;
  category: string;
  duration: string;
  calories: number;
  exercises: Exercise[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  equipment: string;
  icon: string;
  color: string;
}

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: string;
  restTime: string;
  instructions: string[];
}

interface WorkoutLog {
  id: number;
  date: string;
  workoutName: string;
  duration: number;
  caloriesBurned: number;
  exercises: ExerciseLog[];
}

interface ExerciseLog {
  exerciseId: number;
  name: string;
  sets: SetLog[];
}

interface SetLog {
  setNumber: number;
  reps: number;
  weight?: number;
  duration?: number;
}

export function FitnessTracker({ user }: FitnessTrackerProps) {
  const [completedWorkouts, setCompletedWorkouts] = useState(3);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [isWorkoutModalVisible, setIsWorkoutModalVisible] = useState(false);
  const [currentSet, setCurrentSet] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [workoutStartTime, setWorkoutStartTime] = useState<Date | null>(null);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);

  const weeklyGoal = 5;

  const workoutTypes: Workout[] = [
    {
      id: 1,
      name: 'Full Body Strength',
      category: 'Strength',
      duration: '45 min',
      calories: 320,
      difficulty: 'Intermediate',
      equipment: 'Dumbbells',
      icon: 'barbell-outline',
      color: '#4ECDC4',
      exercises: [
        {
          id: 1,
          name: 'Squats',
          sets: 3,
          reps: '12-15',
          restTime: '60s',
          instructions: [
            'Stand with feet shoulder-width apart',
            'Lower your body as if sitting back into a chair',
            'Keep your chest up and knees over toes',
            'Return to standing position'
          ]
        },
        {
          id: 2,
          name: 'Push-ups',
          sets: 3,
          reps: '8-12',
          restTime: '45s',
          instructions: [
            'Start in plank position',
            'Lower body until chest nearly touches floor',
            'Push back up to starting position',
            'Keep body in straight line'
          ]
        },
        {
          id: 3,
          name: 'Deadlifts',
          sets: 3,
          reps: '10-12',
          restTime: '90s',
          instructions: [
            'Stand with feet hip-width apart',
            'Hinge at hips and bend knees slightly',
            'Keep back straight and chest up',
            'Lift weight by extending hips and knees'
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Cardio HIIT',
      category: 'Cardio',
      duration: '20 min',
      calories: 280,
      difficulty: 'Advanced',
      equipment: 'None',
      icon: 'flash-outline',
      color: '#FF6B6B',
      exercises: [
        {
          id: 4,
          name: 'Jumping Jacks',
          sets: 4,
          reps: '30s',
          restTime: '15s',
          instructions: [
            'Start with feet together, arms at sides',
            'Jump feet apart while raising arms overhead',
            'Jump back to starting position',
            'Maintain steady rhythm'
          ]
        },
        {
          id: 5,
          name: 'Burpees',
          sets: 4,
          reps: '20s',
          restTime: '20s',
          instructions: [
            'Start in standing position',
            'Drop into squat, place hands on floor',
            'Jump feet back into plank',
            'Jump feet forward, then jump up with arms overhead'
          ]
        },
        {
          id: 6,
          name: 'Mountain Climbers',
          sets: 4,
          reps: '30s',
          restTime: '15s',
          instructions: [
            'Start in plank position',
            'Alternate bringing knees toward chest',
            'Keep core engaged',
            'Maintain steady pace'
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'Yoga Flow',
      category: 'Flexibility',
      duration: '25 min',
      calories: 150,
      difficulty: 'Beginner',
      equipment: 'Yoga Mat',
      icon: 'leaf-outline',
      color: '#96C93D',
      exercises: [
        {
          id: 7,
          name: 'Sun Salutation',
          sets: 3,
          reps: '5 rounds',
          restTime: '30s',
          instructions: [
            'Start in mountain pose',
            'Inhale, raise arms overhead',
            'Exhale, fold forward',
            'Step back to downward dog, flow through sequence'
          ]
        },
        {
          id: 8,
          name: 'Warrior Poses',
          sets: 2,
          reps: 'Hold 30s each side',
          restTime: '15s',
          instructions: [
            'Step one foot forward into lunge',
            'Raise arms overhead for Warrior I',
            'Open arms parallel to floor for Warrior II',
            'Hold poses with steady breathing'
          ]
        }
      ]
    },
    {
      id: 4,
      name: 'Core Blast',
      category: 'Core',
      duration: '15 min',
      calories: 120,
      difficulty: 'Intermediate',
      equipment: 'None',
      icon: 'fitness-outline',
      color: '#FFC107',
      exercises: [
        {
          id: 9,
          name: 'Plank',
          sets: 3,
          reps: 'Hold 30-60s',
          restTime: '30s',
          instructions: [
            'Start in push-up position',
            'Keep body in straight line',
            'Engage core muscles',
            'Hold position while breathing normally'
          ]
        },
        {
          id: 10,
          name: 'Russian Twists',
          sets: 3,
          reps: '20 each side',
          restTime: '45s',
          instructions: [
            'Sit with knees bent, feet off floor',
            'Lean back slightly, keep back straight',
            'Rotate torso left and right',
            'Touch floor beside hips with hands'
          ]
        }
      ]
    }
  ];

  const recentWorkouts = [
    { id: 1, date: 'Today', type: 'Full Body Strength', duration: 45, calories: 320 },
    { id: 2, date: 'Yesterday', type: 'Cardio HIIT', duration: 20, calories: 280 },
    { id: 3, date: '2 days ago', type: 'Yoga Flow', duration: 25, calories: 150 },
    { id: 4, date: '3 days ago', type: 'Core Blast', duration: 15, calories: 120 },
  ];

  const startWorkout = (workout: Workout) => {
    setSelectedWorkout(workout);
    setCurrentExercise(0);
    setCurrentSet(0);
    setWorkoutStartTime(new Date());
    setIsWorkoutActive(true);
    setIsWorkoutModalVisible(true);
  };

  const completeWorkout = () => {
    if (selectedWorkout && workoutStartTime) {
      const duration = Math.round((new Date().getTime() - workoutStartTime.getTime()) / 60000);
      const newLog: WorkoutLog = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        workoutName: selectedWorkout.name,
        duration,
        caloriesBurned: selectedWorkout.calories,
        exercises: []
      };
      
      setWorkoutLogs(prev => [newLog, ...prev]);
      setCompletedWorkouts(prev => Math.min(prev + 1, weeklyGoal));
      setIsWorkoutActive(false);
      setIsWorkoutModalVisible(false);
      setSelectedWorkout(null);
      
      Alert.alert(
        'Workout Complete!',
        `Great job! You completed ${selectedWorkout.name} in ${duration} minutes and burned approximately ${selectedWorkout.calories} calories.`
      );
    }
  };

  const renderOverview = () => (
    <View style={styles.tabContent}>
      {/* Weekly Progress */}
      <View style={styles.progressCard}>
        <Text style={styles.cardTitle}>Weekly Goal Progress</Text>
        <View style={styles.progressStats}>
          <Text style={styles.progressNumber}>{completedWorkouts}/{weeklyGoal}</Text>
          <Text style={styles.progressLabel}>workouts completed</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <LinearGradient
              colors={['#4ECDC4', '#44A08D']}
              style={[
                styles.progressFill,
                { width: `${Math.min((completedWorkouts / weeklyGoal) * 100, 100)}%` }
              ]}
            />
          </View>
        </View>
        <Text style={styles.progressPercentage}>
          {Math.round((completedWorkouts / weeklyGoal) * 100)}% Complete
        </Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Ionicons name="flash" size={24} color="#FF6B6B" />
          <Text style={styles.statValue}>1,250</Text>
          <Text style={styles.statLabel}>Calories Burned</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="time" size={24} color="#4ECDC4" />
          <Text style={styles.statValue}>135</Text>
          <Text style={styles.statLabel}>Minutes Active</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="trophy" size={24} color="#FFC107" />
          <Text style={styles.statValue}>8</Text>
          <Text style={styles.statLabel}>Streak Days</Text>
        </View>
      </View>

      {/* Recent Workouts */}
      <View style={styles.recentWorkouts}>
        <Text style={styles.sectionTitle}>Recent Workouts</Text>
        {recentWorkouts.map((workout) => (
          <View key={workout.id} style={styles.workoutHistoryItem}>
            <View style={styles.workoutHistoryInfo}>
              <Text style={styles.workoutHistoryName}>{workout.type}</Text>
              <Text style={styles.workoutHistoryDate}>{workout.date}</Text>
            </View>
            <View style={styles.workoutHistoryStats}>
              <Text style={styles.workoutHistoryStat}>
                <Ionicons name="time" size={14} color="#666" /> {workout.duration}m
              </Text>
              <Text style={styles.workoutHistoryStat}>
                <Ionicons name="flame" size={14} color="#666" /> {workout.calories} cal
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderWorkouts = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Choose Your Workout</Text>
      <View style={styles.workoutGrid}>
        {workoutTypes.map((workout) => (
          <TouchableOpacity
            key={workout.id}
            style={[styles.workoutCard, { borderLeftColor: workout.color }]}
            onPress={() => startWorkout(workout)}
          >
            <View style={styles.workoutCardHeader}>
              <Ionicons name={workout.icon as any} size={32} color={workout.color} />
              <View style={styles.workoutCardInfo}>
                <Text style={styles.workoutCardName}>{workout.name}</Text>
                <Text style={styles.workoutCardCategory}>{workout.category}</Text>
              </View>
            </View>
            
            <View style={styles.workoutCardStats}>
              <View style={styles.workoutStat}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.workoutStatText}>{workout.duration}</Text>
              </View>
              <View style={styles.workoutStat}>
                <Ionicons name="flame-outline" size={16} color="#666" />
                <Text style={styles.workoutStatText}>{workout.calories} cal</Text>
              </View>
              <View style={styles.workoutStat}>
                <Ionicons name="barbell-outline" size={16} color="#666" />
                <Text style={styles.workoutStatText}>{workout.difficulty}</Text>
              </View>
            </View>

            <Text style={styles.workoutEquipment}>Equipment: {workout.equipment}</Text>
            <Text style={styles.exerciseCount}>{workout.exercises.length} exercises</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderWorkoutModal = () => {
    if (!selectedWorkout) return null;

    const currentExerciseData = selectedWorkout.exercises[currentExercise];
    const isLastExercise = currentExercise === selectedWorkout.exercises.length - 1;
    const isLastSet = currentSet === currentExerciseData?.sets - 1;

    return (
      <Modal
        visible={isWorkoutModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              onPress={() => {
                Alert.alert(
                  'End Workout?',
                  'Are you sure you want to end this workout?',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { 
                      text: 'End Workout', 
                      style: 'destructive',
                      onPress: () => {
                        setIsWorkoutModalVisible(false);
                        setIsWorkoutActive(false);
                        setSelectedWorkout(null);
                      }
                    }
                  ]
                );
              }}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{selectedWorkout.name}</Text>
            <TouchableOpacity onPress={completeWorkout}>
              <Text style={styles.completeButton}>Complete</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Progress */}
            <View style={styles.workoutProgress}>
              <Text style={styles.progressTitle}>
                Exercise {currentExercise + 1} of {selectedWorkout.exercises.length}
              </Text>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                  <LinearGradient
                    colors={[selectedWorkout.color, selectedWorkout.color + '80']}
                    style={[
                      styles.progressFill,
                      { width: `${((currentExercise + 1) / selectedWorkout.exercises.length) * 100}%` }
                    ]}
                  />
                </View>
              </View>
            </View>

            {/* Current Exercise */}
            {currentExerciseData && (
              <View style={styles.currentExercise}>
                <Text style={styles.exerciseName}>{currentExerciseData.name}</Text>
                <Text style={styles.exerciseDetails}>
                  Set {currentSet + 1} of {currentExerciseData.sets} • {currentExerciseData.reps} reps
                </Text>
                <Text style={styles.restTime}>Rest: {currentExerciseData.restTime}</Text>

                {/* Instructions */}
                <View style={styles.instructions}>
                  <Text style={styles.instructionsTitle}>Instructions:</Text>
                  {currentExerciseData.instructions.map((instruction, index) => (
                    <Text key={index} style={styles.instructionItem}>
                      {index + 1}. {instruction}
                    </Text>
                  ))}
                </View>

                {/* Set Controls */}
                <View style={styles.setControls}>
                  <TouchableOpacity
                    style={[styles.setButton, styles.completeSetButton]}
                    onPress={() => {
                      if (isLastSet && isLastExercise) {
                        completeWorkout();
                      } else if (isLastSet) {
                        setCurrentExercise(prev => prev + 1);
                        setCurrentSet(0);
                      } else {
                        setCurrentSet(prev => prev + 1);
                      }
                    }}
                  >
                    <Text style={styles.setButtonText}>
                      {isLastSet && isLastExercise ? 'Finish Workout' : 
                       isLastSet ? 'Next Exercise' : 'Complete Set'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
        <Text style={styles.headerTitle}>Fitness Tracker</Text>
        <Text style={styles.headerSubtitle}>Stay active and reach your goals</Text>
      </LinearGradient>

      {/* Tab Navigation */}
      <View style={styles.tabNavigation}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'overview' && styles.activeTabButton]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'overview' && styles.activeTabButtonText]}>
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'workouts' && styles.activeTabButton]}
          onPress={() => setActiveTab('workouts')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'workouts' && styles.activeTabButtonText]}>
            Workouts
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'overview' ? renderOverview() : renderWorkouts()}
      </ScrollView>

      {renderWorkoutModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  tabNavigation: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: '#667eea',
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  activeTabButtonText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  tabContent: {
    paddingBottom: 20,
  },
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  progressStats: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4ECDC4',
  },
  progressLabel: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  progressBarContainer: {
    width: '100%',
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: 14,
    color: '#4ECDC4',
    fontWeight: '600',
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  recentWorkouts: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workoutHistoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  workoutHistoryInfo: {
    flex: 1,
  },
  workoutHistoryName: {
    fontSize: 16,
    fontWeight: '600',
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
  workoutHistoryStat: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  workoutGrid: {
    gap: 15,
  },
  workoutCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  workoutCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  workoutCardInfo: {
    marginLeft: 15,
    flex: 1,
  },
  workoutCardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  workoutCardCategory: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  workoutCardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  workoutStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutStatText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  workoutEquipment: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  exerciseCount: {
    fontSize: 14,
    color: '#4ECDC4',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  completeButton: {
    fontSize: 16,
    color: '#4ECDC4',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  workoutProgress: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  currentExercise: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  exerciseDetails: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  restTime: {
    fontSize: 14,
    color: '#4ECDC4',
    textAlign: 'center',
    marginBottom: 20,
  },
  instructions: {
    marginBottom: 30,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  instructionItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    lineHeight: 20,
  },
  setControls: {
    alignItems: 'center',
  },
  setButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    minWidth: 200,
  },
  completeSetButton: {
    backgroundColor: '#4ECDC4',
  },
  setButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});