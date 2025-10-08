// AUTO-GENERATED-TO-NATIVE: This file was created by tools/convert-web-to-native.js
// Manual fixes likely required: styles, icons, routing, third-party web-only APIs
import React from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { X, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MotivationalBannerProps {
  user: any;
}

export function MotivationalBanner({ user }: MotivationalBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Personalized motivational messages based on user data
  const motivationalMessages = [
    {
      message: `Hey ${user.name.split(' ')[0]}! 🌟 Ready to conquer your health goals today? Your journey at 48 is just getting started!`,
      theme: 'energy',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      message: `💪 Your body is capable of amazing things! Let's make today count with smart choices and steady progress.`,
      theme: 'strength',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      message: `🎯 Every small step matters! Your consistent effort is building the healthier, stronger you.`,
      theme: 'progress',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      message: `✨ Age is just a number - your commitment to health shows you're in your prime! Keep shining!`,
      theme: 'wisdom',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      message: `🌱 Growth happens outside your comfort zone. Today's workout could be your personal breakthrough!`,
      theme: 'growth',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      message: `🔥 Your dedication is inspiring! Remember, progress over perfection - you've got this!`,
      theme: 'dedication',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      message: `🌈 Health is wealth, and you're investing wisely! Today's choices create tomorrow's victories.`,
      theme: 'investment',
      gradient: 'from-teal-500 to-blue-500'
    }
  ];

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % motivationalMessages.length);
      setIsAnimating(false);
    }, 150);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const currentMessage = motivationalMessages[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
       
      >
        <Card>
          <View opacity-90`} />
          <CardContent>
            <View>
              <View>
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <Sparkles />
                </motion.div>
                
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                 
                >
                  <Text>
                    {currentMessage.message}
                  </Text>
                </motion.div>
              </View>
              
              <View>
                <TouchableOpacity
                  variant="ghost"
                  size="sm"
                  onPress={handleNext}
                  disabled={isAnimating}
                 
                  title="Next motivation"
                >
                  <motion.div
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight />
                  </motion.div>
                </TouchableOpacity>
                <TouchableOpacity
                  variant="ghost"
                  size="sm"
                  onPress={handleDismiss}
                 
                  title="Dismiss"
                >
                  <X />
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Progress dots */}
            <View>
              {motivationalMessages.map((_, index) => (
                <motion.div
                  key={index}
                 `}
                  whileHover={{ scale: 1.2 }}
                  onPress={() => !isAnimating && setCurrentIndex(index)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </View>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}