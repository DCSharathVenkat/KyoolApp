// React Native Progress Component
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface ProgressProps {
  className?: string;
  value?: number;
  max?: number;
  style?: ViewStyle;
  indicatorStyle?: ViewStyle;
}

function Progress({ 
  className, 
  value = 0, 
  max = 100, 
  style, 
  indicatorStyle,
  ...props 
}: ProgressProps) {
  const progressPercentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <View style={[styles.progress, style]} {...props}>
      <View 
        style={[
          styles.progressIndicator, 
          { width: `${progressPercentage}%` },
          indicatorStyle
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progress: {
    height: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressIndicator: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
});

export { Progress };
