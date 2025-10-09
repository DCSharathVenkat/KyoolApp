import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';

interface StatCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  number: string;
  label: string;
  backgroundColor?: string;
  delay?: number;
  triggerAnimation?: boolean;
}

export function StatCard({ 
  icon, 
  number, 
  label, 
  backgroundColor = '#F3F4F6', 
  delay = 0, 
  triggerAnimation = false 
}: StatCardProps) {
  const [animatedNumber, setAnimatedNumber] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const opacity = new Animated.Value(0);
  const translateY = new Animated.Value(20);
  
  const numericValue = parseInt(number.replace(/[^\d]/g, '')) || 0;
  const hasPercentage = number.includes('%');
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const progress = hasPercentage ? animatedNumber / 100 : Math.min(animatedNumber / 100, 1);
  const strokeDashoffset = circumference - (progress * circumference);

  useEffect(() => {
    if (triggerAnimation && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
        
        // Animate visibility
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start();

        // Animate number
        let start = 0;
        const duration = 1500;
        const startTime = Date.now();
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const currentValue = Math.floor(numericValue * easeOutQuart);
          
          setAnimatedNumber(currentValue);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setAnimatedNumber(numericValue);
          }
        };
        
        animate();
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [triggerAnimation, numericValue, delay, hasAnimated]);

  return (
    <Animated.View 
      style={[
        styles.card, 
        { backgroundColor, opacity, transform: [{ translateY }] }
      ]}
    >
      {/* Icon */}
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={24} color="#6366F1" />
      </View>
      
      {/* Circular Progress */}
      <View style={styles.progressContainer}>
        <Svg height="80" width="80" viewBox="0 0 80 80">
          {/* Background circle */}
          <Circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#E5E7EB"
            strokeWidth="4"
            fill="transparent"
          />
          {/* Progress circle */}
          <Circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#6366F1"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 40 40)`}
          />
        </Svg>
        
        {/* Number in center */}
        <View style={styles.numberContainer}>
          <Text style={styles.number}>
            {animatedNumber}{hasPercentage ? '%' : ''}
          </Text>
        </View>
      </View>
      
      {/* Label */}
      <Text style={styles.label}>{label}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    margin: 8,
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginBottom: 12,
  },
  progressContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  numberContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
});