// React Native Button Component
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant = 'default', 
  size = 'default', 
  style, 
  textStyle, 
  children, 
  disabled, 
  onPress, 
  ...props 
}) => {
  const buttonStyle = [
    styles.button,
    styles[`variant_${variant}`],
    styles[`size_${size}`],
    disabled && styles.disabled,
    style,
  ];

  const buttonTextStyle = [
    styles.buttonText,
    styles[`text_${variant}`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text style={buttonTextStyle}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

Button.displayName = "Button";

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 36,
  },
  buttonText: {
    fontSize: 14,
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
  variant_secondary: {
    backgroundColor: '#F2F2F7',
  },
  text_secondary: {
    color: '#1C1C1E',
  },
  variant_ghost: {
    backgroundColor: 'transparent',
  },
  text_ghost: {
    color: '#007AFF',
  },
  variant_link: {
    backgroundColor: 'transparent',
  },
  text_link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  // Sizes
  size_sm: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    minHeight: 32,
  },
  size_lg: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    minHeight: 44,
  },
  size_icon: {
    width: 36,
    height: 36,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  // States
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.5,
  },
});

export { Button };
