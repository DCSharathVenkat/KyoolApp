// AUTO-GENERATED-TO-NATIVE: This file was created by tools/convert-web-to-native.js
// Manual fixes likely required: styles, icons, routing, third-party web-only APIs
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Ionicons } from '@expo/vector-icons';

interface RealTimeCoachingProps {
  isWorkoutActive: boolean;
  currentExercise?: string;
  onWorkoutPause?: () => void;
  onWorkoutResume?: () => void;
  onExerciseChange?: (newExercise: string) => void;
}

interface WorkoutMetrics {
  heartRate: number;
  intensity: 'low' | 'moderate' | 'high' | 'peak';
  fatigue: number; // 1-10
  form: 'excellent' | 'good' | 'needs_improvement';
  rpe: number; // Rate of Perceived Exertion 1-10
}

export function RealTimeCoaching({ 
  isWorkoutActive, 
  currentExercise = "Push-ups",
  onWorkoutPause,
  onWorkoutResume,
  onExerciseChange
}: RealTimeCoachingProps) {
  const [metrics, setMetrics] = useState<WorkoutMetrics>({
    heartRate: 72,
    intensity: 'moderate',
    fatigue: 3,
    form: 'good',
    rpe: 5
  });

  const [coachingMessage, setCoachingMessage] = useState<any>(null);
  const [messageHistory, setMessageHistory] = useState<any[]>([]);

  // Simulate real-time metrics during workout
  useEffect(() => {
    if (!isWorkoutActive) return;

    const interval = setInterval(() => {
      setMetrics(prev => {
        const newHeartRate = Math.max(65, Math.min(180, 
          prev.heartRate + (Math.random() - 0.5) * 8
        ));
        
        const newFatigue = Math.max(1, Math.min(10,
          prev.fatigue + (Math.random() - 0.3) * 0.5
        ));

        const newRpe = Math.max(1, Math.min(10,
          prev.rpe + (Math.random() - 0.4) * 0.8
        ));

        let newIntensity: WorkoutMetrics['intensity'] = 'moderate';
        if (newHeartRate < 100) newIntensity = 'low';
        else if (newHeartRate < 140) newIntensity = 'moderate';
        else if (newHeartRate < 160) newIntensity = 'high';
        else newIntensity = 'peak';

        const newForm: WorkoutMetrics['form'] = 
          newFatigue > 7 ? 'needs_improvement' :
          newFatigue > 5 ? 'good' : 'excellent';

        return {
          heartRate: Math.round(newHeartRate),
          intensity: newIntensity,
          fatigue: Math.round(newFatigue * 10) / 10,
          form: newForm,
          rpe: Math.round(newRpe * 10) / 10
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isWorkoutActive]);

  // AI Coaching Logic
  useEffect(() => {
    if (!isWorkoutActive) return;

    const coaching = generateRealTimeCoaching(metrics);
    if (coaching) {
      setCoachingMessage(coaching);
      setMessageHistory(prev => [coaching, ...prev.slice(0, 4)]); // Keep last 5 messages
    }
  }, [metrics, isWorkoutActive]);

  const generateRealTimeCoaching = (metrics: WorkoutMetrics) => {
    const { heartRate, intensity, fatigue, form, rpe } = metrics;

    // High heart rate warning
    if (heartRate > 170) {
      return {
        type: 'warning',
        priority: 'high',
        title: 'Heart Rate Alert',
        message: 'Your heart rate is very high. Consider slowing down or taking a brief rest.',
        action: 'Reduce Intensity',
        icon: 'warning',
        color: 'text-red-500',
        bgColor: 'bg-red-50',
        actionType: 'reduce_intensity'
      };
    }

    // Fatigue detection
    if (fatigue > 8) {
      return {
        type: 'adjustment',
        priority: 'high',
        title: 'Fatigue Detected',
        message: 'You\'re showing signs of fatigue. Let\'s switch to a recovery exercise.',
        action: 'Switch Exercise',
        icon: 'trending-down',
        color: 'text-orange-500',
        bgColor: 'bg-orange-50',
        actionType: 'switch_exercise'
      };
    }

    // Form correction
    if (form === 'needs_improvement') {
      return {
        type: 'form',
        priority: 'medium',
        title: 'Form Check',
        message: 'Your form may be compromising due to fatigue. Focus on quality over quantity.',
        action: 'Form Tips',
        icon: 'refresh',
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
        actionType: 'form_correction'
      };
    }

    // Low intensity encouragement
    if (heartRate < 90 && intensity === 'low') {
      return {
        type: 'encouragement',
        priority: 'low',
        title: 'Push a Little Harder',
        message: 'You have more in the tank! Try increasing your pace or resistance.',
        action: 'Increase Intensity',
        icon: 'trending-up',
        color: 'text-green-500',
        bgColor: 'bg-green-50',
        actionType: 'increase_intensity'
      };
    }

    // Perfect zone encouragement
    if (intensity === 'moderate' && form === 'excellent') {
      return {
        type: 'positive',
        priority: 'low',
        title: 'Perfect Zone!',
        message: 'You\'re in the sweet spot! Great form and intensity.',
        action: 'Keep Going',
        icon: 'checkmark-circle',
        color: 'text-green-500',
        bgColor: 'bg-green-50',
        actionType: 'maintain'
      };
    }

    return null;
  };

  const handleCoachingAction = (actionType: string) => {
    switch (actionType) {
      case 'reduce_intensity':
        onWorkoutPause?.();
        break;
      case 'switch_exercise':
        onExerciseChange?.('Light Stretching');
        break;
      case 'increase_intensity':
        // Could increase workout difficulty
        break;
      default:
        break;
    }
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'low': return 'text-blue-500';
      case 'moderate': return 'text-green-500';
      case 'high': return 'text-yellow-500';
      case 'peak': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getFormColor = (form: string) => {
    switch (form) {
      case 'excellent': return 'text-green-500';
      case 'good': return 'text-yellow-500';
      case 'needs_improvement': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  if (!isWorkoutActive) {
    return (
      <Card>
        <CardContent>
          <Ionicons name="play" size={24} color="#667eea" />
          <Text style={styles.inactiveTitle}>Real-time Coaching Inactive</Text>
          <Text>
            Start a workout to activate AI coaching and real-time adjustments
          </Text>
        </CardContent>
      </Card>
    );
  }

  return (
    <View>
      {/* Real-time Metrics Dashboard */}
      <Card>
        <CardContent>
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>Live Workout Monitoring</Text>
            <Badge variant="outline">
              <View />
              Active
            </Badge>
          </View>
          
          <View>
            <View>
              <View>
                <Ionicons name="pulse" size={20} color="#667eea" />
                <Text style={styles.metricValue}>
                  {metrics.heartRate}
                </Text>
              </View>
              <Text>BPM</Text>
            </View>

            <View>
              <View>
                <Ionicons name="trending-up" size={20} color="#667eea" />
                <Text style={styles.metricValue}>{metrics.intensity}</Text>
              </View>
              <Text>Intensity</Text>
            </View>

            <View>
              <View>
                <Ionicons name="checkmark-circle" size={20} color="#667eea" />
                <Text style={styles.metricValue}>{metrics.form.replace('_', ' ')}</Text>
              </View>
              <Text>Form</Text>
            </View>

            <View>
              <View>
                <Ionicons name="heart" size={20} color="#667eea" />
                <Text style={styles.metricValue}>{metrics.rpe}/10</Text>
              </View>
              <Text>RPE</Text>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Real-time Coaching Message */}
      {coachingMessage && (
        <Card>
          <CardContent>
            <View style={styles.coachingMessageContainer}>
              <View style={styles.coachingHeader}>
                <Text style={styles.coachingTitle}>{coachingMessage.title}</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>AI Coach</Text>
                </View>
              </View>
              <Text style={styles.coachingMessage}>
                {coachingMessage.message}
              </Text>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleCoachingAction(coachingMessage.actionType)}
              >
                <Text style={styles.actionButtonText}>{coachingMessage.action}</Text>
              </TouchableOpacity>
            </View>
          </CardContent>
        </Card>
      )}

      {/* Coaching History */}
      {messageHistory.length > 0 && (
        <Card>
          <CardContent>
            <View style={styles.historyHeader}>
              <Ionicons name="chatbubble" size={20} color="#667eea" />
              <Text style={styles.historyTitle}>Recent Coaching</Text>
            </View>
            <View style={styles.historyList}>
              {messageHistory.map((msg, index) => (
                <View key={index} style={styles.historyItem}>
                  <Text style={styles.historyText}>{msg.title}: {msg.message}</Text>
                </View>
              ))}
            </View>
          </CardContent>
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  coachingMessageContainer: {
    padding: 16,
  },
  coachingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  coachingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  badge: {
    backgroundColor: '#667eea',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  coachingMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  actionButton: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  actionButtonText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  historyList: {
    gap: 8,
  },
  historyItem: {
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  historyText: {
    fontSize: 14,
    color: '#666',
  },
  inactiveTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
});