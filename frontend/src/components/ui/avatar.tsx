// React Native Avatar Component
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

interface AvatarProps {
  className?: string;
  style?: any;
  children?: React.ReactNode;
}

interface AvatarImageProps {
  src?: string;
  alt?: string;
  className?: string;
  style?: any;
}

interface AvatarFallbackProps {
  className?: string;
  style?: any;
  children?: React.ReactNode;
}

function Avatar({ className, style, children, ...props }: AvatarProps) {
  return (
    <View style={[styles.avatar, style]} {...props}>
      {children}
    </View>
  );
}

function AvatarImage({ src, alt, className, style, ...props }: AvatarImageProps) {
  if (!src) return null;
  
  return (
    <Image
      source={{ uri: src }}
      style={[styles.avatarImage, style]}
      resizeMode="cover"
      {...props}
    />
  );
}

function AvatarFallback({ className, style, children, ...props }: AvatarFallbackProps) {
  return (
    <View style={[styles.avatarFallback, style]} {...props}>
      {typeof children === 'string' ? (
        <Text style={styles.avatarFallbackText}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
  },
  avatarFallbackText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
});

export { Avatar, AvatarImage, AvatarFallback };
