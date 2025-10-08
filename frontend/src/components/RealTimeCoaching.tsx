// AUTO-GENERATED-TO-NATIVE: This file was created by tools/convert-web-to-native.js
// Manual fixes likely required: styles, icons, routing, third-party web-only APIs
import React from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Activity, 
  Heart, 
  AlertTriangle, 
  CheckCircle, 
  TrendingDown, 
  TrendingUp,
  Pause,
  Play,
  RotateCcw,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
        icon: AlertTriangle,
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
        icon: TrendingDown,
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
        icon: RotateCcw,
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
        icon: TrendingUp,
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
        icon: CheckCircle,
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
          <Play />
          <h3>Real-time Coaching Inactive</h3>
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
            <h3>Live Workout Monitoring</h3>
            <Badge variant="outline">
              <View />
              Active
            </Badge>
          </View>
          
          <View>
            <View>
              <View>
                <Activity />
                <motion.span 
                 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {metrics.heartRate}
                </motion.span>
              </View>
              <Text>BPM</Text>
            </View>

            <View>
              <View>
                <TrendingUp`} />
                <Text>{metrics.intensity}</Text>
              </View>
              <Text>Intensity</Text>
            </View>

            <View>
              <View>
                <CheckCircle`} />
                <Text>{metrics.form.replace('_', ' ')}</Text>
              </View>
              <Text>Form</Text>
            </View>

            <View>
              <View>
                <Heart />
                <Text>{metrics.rpe}/10</Text>
              </View>
              <Text>RPE</Text>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Real-time Coaching Message */}
      <AnimatePresence>
        {coachingMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Card`}>
              <CardContent`}>
                <View>
                  <coachingMessage.icon mt-0.5`} />
                  <View>
                    <View>
                      <h4>{coachingMessage.title}</h4>
                      <Badge variant={
                        coachingMessage.priority === 'high' ? 'destructive' :
                        coachingMessage.priority === 'medium' ? 'secondary' : 
                        'outline'
                      }>
                        AI Coach
                      </Badge>
                    </View>
                    <Text>
                      {coachingMessage.message}
                    </Text>
                    <TouchableOpacity 
                      size="sm" 
                      variant="outline"
                      onPress={() => handleCoachingAction(coachingMessage.actionType)}
                     
                    >
                      {coachingMessage.action}
                    </TouchableOpacity>
                  </View>
                </View>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coaching History */}
      {messageHistory.length > 0 && (
        <Card>
          <CardContent>
            <View>
              <MessageCircle />
              <h4>Recent Coaching</h4>
            </View>
            <View>
              {messageHistory.map((msg, index) => (
                <View key={index}>
                  <msg.icon`} />
                  <Text>{msg.title}: {msg.message}</Text>
                </View>
              ))}
            </View>
          </CardContent>
        </Card>
      )}
    </View>
  );
}