// AUTO-GENERATED-TO-NATIVE: This file was created by tools/convert-web-to-native.js
// Manual fixes likely required: styles, icons, routing, third-party web-only APIs
import React from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Play, 
  Pause, 
  Square, 
  Timer,
  Footprints,
  ArrowLeft
} from 'lucide-react';
import { motion } from 'motion/react';

interface QuickWalkTimerProps {
  onBack: () => void;
}

export function QuickWalkTimer({ onBack }: QuickWalkTimerProps) {
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime] = useState(20 * 60);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(startTime);
    setIsCompleted(false);
  };

  const progress = ((startTime - timeLeft) / startTime) * 100;

  return (
    <View>
      {/* Header */}
      <View>
        <TouchableOpacity
          variant="ghost"
          size="icon"
          onPress={onBack}
         
        >
          <ArrowLeft />
        </TouchableOpacity>
        <View>
          <h1>Quick Walk</h1>
          <Text>20-minute refreshing walk</Text>
        </View>
      </View>

      {/* Timer Card */}
      <View>
        <Card`}>
          <CardHeader>
            <View>
              <Footprints />
            </View>
            <CardTitle>
              {isCompleted ? 'Walk Completed!' : 'Quick Walk Timer'}
            </CardTitle>
            {!isCompleted && (
              <View>
                <Badge variant="secondary">
                  Light Exercise
                </Badge>
                <Badge variant="secondary">
                  20 minutes
                </Badge>
              </View>
            )}
          </CardHeader>

          <CardContent>
            {/* Timer Display */}
            <motion.div
             
              animate={{ scale: isRunning ? [1, 1.02, 1] : 1 }}
              transition={{ duration: 1, repeat: isRunning ? Infinity : 0 }}
            >
              <View`}>
                {formatTime(timeLeft)}
              </View>
              
              {/* Progress Bar */}
              <View>
                <Progress 
                  value={progress} 
                 `}
                />
                <Text>
                  {isCompleted ? 'Congratulations!' : 
                   `${Math.round(progress)}% complete`}
                </Text>
              </View>
            </motion.div>

            {/* Control Buttons */}
            <View>
              {!isCompleted ? (
                <>
                  {!isRunning ? (
                    <TouchableOpacity
                      onPress={handleStart}
                      size="lg"
                     
                    >
                      <Play />
                      {timeLeft === startTime ? 'Start Walk' : 'Resume'}
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={handlePause}
                      size="lg"
                      variant="outline"
                     
                    >
                      <Pause />
                      Pause
                    </TouchableOpacity>
                  )}
                  
                  {timeLeft !== startTime && (
                    <TouchableOpacity
                      onPress={handleStop}
                      size="lg"
                      variant="outline"
                     
                    >
                      <Square />
                      Reset
                    </TouchableOpacity>
                  )}
                </>
              ) : (
                <View>
                  <View>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                     
                    >
                      <Timer />
                    </motion.div>
                    <View>
                      <Text>Great job!</Text>
                      <Text>
                        You completed your 20-minute walk
                      </Text>
                    </View>
                  </View>
                  
                  <View>
                    <TouchableOpacity
                      onPress={handleStop}
                      variant="outline"
                     
                    >
                      Start Again
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={onBack}
                     
                    >
                      Done
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>

            {/* Walking Tips */}
            {!isCompleted && (
              <View>
                <h4>Walking Tips:</h4>
                <ul>
                  <li>• Maintain a comfortable, steady pace</li>
                  <li>• Keep your head up and shoulders relaxed</li>
                  <li>• Swing your arms naturally</li>
                  <li>• Stay hydrated</li>
                </ul>
              </View>
            )}
          </CardContent>
        </Card>
      </View>
    </View>
  );
}