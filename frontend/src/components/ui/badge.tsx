// React Native Badge Component
import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface BadgeProps {
  className?: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
}

function Badge({ 
  className, 
  variant = 'default', 
  style, 
  textStyle, 
  children,
  ...props 
}: BadgeProps) {
  const badgeStyle = [
    styles.badge,
    styles[`variant_${variant}`],
    style,
  ];

  const badgeTextStyle = [
    styles.badgeText,
    styles[`text_${variant}`],
    textStyle,
  ];

  return (
    <View style={badgeStyle} {...props}>
      {typeof children === 'string' ? (
        <Text style={badgeTextStyle}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  // Variants
  variant_default: {
    backgroundColor: '#007AFF',
  },
  text_default: {
    color: 'white',
  },
  variant_secondary: {
    backgroundColor: '#F2F2F7',
  },
  text_secondary: {
    color: '#1C1C1E',
  },
  variant_destructive: {
    backgroundColor: '#FF3B30',
  },
  text_destructive: {
    color: 'white',
  },
  variant_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#C7C7CC',
  },
  text_outline: {
    color: '#007AFF',
  },
});

export { Badge };
