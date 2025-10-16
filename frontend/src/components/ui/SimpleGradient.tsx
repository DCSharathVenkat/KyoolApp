import React from 'react';
import { View, ViewStyle } from 'react-native';

interface SimpleGradientProps {
  colors: string[];
  style?: ViewStyle;
  children?: React.ReactNode;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

export function SimpleGradient({ 
  colors, 
  style, 
  children, 
  start = { x: 0, y: 0 }, 
  end = { x: 0, y: 1 } 
}: SimpleGradientProps) {
  // For web, we can use CSS gradients
  // For native without expo-linear-gradient, we'll use a simple solid color
  
  const isWeb = typeof window !== 'undefined';
  
  if (isWeb) {
    // Create CSS gradient for web
    const direction = start.x === 0 && start.y === 0 && end.x === 0 && end.y === 1 
      ? 'to bottom' 
      : `${Math.atan2(end.y - start.y, end.x - start.x) * 180 / Math.PI}deg`;
    
    const gradient = `linear-gradient(${direction}, ${colors.join(', ')})`;
    
    return (
      <View
        style={[
          style,
          {
            // @ts-ignore - CSS property for web
            background: gradient,
          },
        ]}
      >
        {children}
      </View>
    );
  }
  
  // Fallback for native: use the first color as solid background
  return (
    <View
      style={[
        style,
        {
          backgroundColor: colors[0] || '#667eea',
        },
      ]}
    >
      {children}
    </View>
  );
}