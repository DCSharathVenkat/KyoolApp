// AUTO-GENERATED-TO-NATIVE: This file was created by tools/convert-web-to-native.js
// Manual fixes likely required: styles, icons, routing, third-party web-only APIs
import React from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface Mood {
  emoji: string;
  label: string;
  motivation: string;
  color: string;
}

interface EmojiMoodSelectorProps {
  onSelect: (mood: Mood) => void;
  onSkip: () => void;
}

export function EmojiMoodSelector({ onSelect, onSkip }: EmojiMoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const moods: Mood[] = [
    {
      emoji: '💪',
      label: 'Strong',
      motivation: 'You\'re crushing it! Keep that power flowing!',
      color: 'bg-green-100 border-green-300'
    },
    {
      emoji: '🔥',
      label: 'On Fire',
      motivation: 'Unstoppable! You\'re in the zone today!',
      color: 'bg-orange-100 border-orange-300'
    },
    {
      emoji: '😤',
      label: 'Determined',
      motivation: 'That focus is incredible! Nothing can stop you!',
      color: 'bg-red-100 border-red-300'
    },
    {
      emoji: '😊',
      label: 'Good',
      motivation: 'Steady progress! Every rep counts!',
      color: 'bg-blue-100 border-blue-300'
    },
    {
      emoji: '😅',
      label: 'Challenging',
      motivation: 'Growth happens outside comfort zones! You got this!',
      color: 'bg-yellow-100 border-yellow-300'
    },
    {
      emoji: '😮‍💨',
      label: 'Tough',
      motivation: 'Every champion faces tough moments. You\'re building resilience!',
      color: 'bg-purple-100 border-purple-300'
    }
  ];

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setTimeout(() => {
      onSelect(mood);
    }, 1500); // Show motivation for 1.5 seconds
  };

  if (selectedMood) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
       
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, repeat: 1 }}
         
        >
          {selectedMood.emoji}
        </motion.div>
        <View>
          <h3>
            Awesome!
          </h3>
          <Text>
            {selectedMood.motivation}
          </Text>
        </View>
      </motion.div>
    );
  }

  return (
    <View>
      <View>
        <h3>How are you feeling?</h3>
        <Text>
          Share your energy level after this set
        </Text>
      </View>
      
      <View>
        {moods.map((mood, index) => (
          <motion.div
            key={mood.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
             `}
              onPress={() => handleMoodSelect(mood)}
            >
              <CardContent>
                <View>{mood.emoji}</View>
                <View>{mood.label}</View>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </View>
      
      <TouchableOpacity 
        variant="ghost" 
        onPress={onSkip}
       
      >
        Skip
      </TouchableOpacity>
    </View>
  );
}