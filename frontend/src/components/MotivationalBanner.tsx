import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardContent } from './ui/card';

const { width } = Dimensions.get('window');

interface MotivationalBannerProps {
  user: any;
}

export function MotivationalBanner({ user }: MotivationalBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const fadeAnim = new Animated.Value(1);

  // Personalized motivational messages based on user data
  const motivationalMessages = [
    {
      title: "You're Crushing It! 💪",
      message: `${user?.name || 'Champion'}, you've completed 80% of your weekly goals. Keep the momentum going!`,
      color: '#4CAF50',
      icon: 'trophy' as const
    },
    {
      title: "Health Streak! 🔥",
      message: "5 days straight of hitting your targets. Your consistency is inspiring!",
      color: '#FF5722',
      icon: 'flame' as const
    },
    {
      title: "Wellness Warrior! ⭐",
      message: "Your balanced approach to health is paying off. You're setting a great example!",
      color: '#2196F3',
      icon: 'star' as const
    },
    {
      title: "Progress Champion! 🚀",
      message: "Every step counts, and you're making incredible progress towards your goals!",
      color: '#9C27B0',
      icon: 'rocket' as const
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % motivationalMessages.length
      );
    }, 5000); // Change message every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const handleDismiss = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsVisible(false);
    });
  };

  const currentMessage = motivationalMessages[currentIndex];

  if (!isVisible) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Card style={[styles.card, { borderLeftColor: currentMessage.color }]}>
        <CardContent style={styles.content}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Ionicons 
                name={currentMessage.icon} 
                size={24} 
                color={currentMessage.color} 
              />
            </View>
            <TouchableOpacity 
              onPress={handleDismiss}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.messageContainer}>
            <Text style={[styles.title, { color: currentMessage.color }]}>
              {currentMessage.title}
            </Text>
            <Text style={styles.message}>
              {currentMessage.message}
            </Text>
          </View>

          {/* Progress Indicators */}
          <View style={styles.indicatorContainer}>
            {motivationalMessages.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setCurrentIndex(index)}
                style={[
                  styles.indicator,
                  {
                    backgroundColor: index === currentIndex 
                      ? currentMessage.color 
                      : '#e0e0e0'
                  }
                ]}
              />
            ))}
          </View>

          {/* Action Button */}
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: currentMessage.color }]}
            onPress={() => {
              // Handle action - could navigate to goals, stats, etc.
              console.log('Motivational action pressed');
            }}
          >
            <Text style={styles.actionButtonText}>View Progress</Text>
            <Ionicons name="chevron-forward" size={16} color="white" />
          </TouchableOpacity>
        </CardContent>
      </Card>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  card: {
    borderLeftWidth: 4,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    padding: 4,
  },
  messageContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});