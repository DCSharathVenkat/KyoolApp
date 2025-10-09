import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface FeatureCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  benefit: string;
  colorScheme: 'blue' | 'green' | 'purple' | 'orange';
  onPress?: () => void;
}

export function FeatureCard({ icon, title, description, benefit, colorScheme, onPress }: FeatureCardProps) {
  const getColorScheme = (scheme: string) => {
    switch (scheme) {
      case 'blue':
        return {
          gradient: ['#EBF8FF', '#DBEAFE'] as const,
          iconBg: '#3B82F6',
          iconColor: '#FFFFFF',
          titleColor: '#1E40AF',
          descColor: '#6B7280',
          benefitBg: '#EBF8FF',
          benefitText: '#1E40AF',
          borderColor: '#BFDBFE'
        };
      case 'green':
        return {
          gradient: ['#F0FDF4', '#DCFCE7'] as const,
          iconBg: '#10B981',
          iconColor: '#FFFFFF',
          titleColor: '#166534',
          descColor: '#6B7280',
          benefitBg: '#F0FDF4',
          benefitText: '#166534',
          borderColor: '#BBF7D0'
        };
      case 'purple':
        return {
          gradient: ['#FAF5FF', '#F3E8FF'] as const,
          iconBg: '#8B5CF6',
          iconColor: '#FFFFFF',
          titleColor: '#6B21A8',
          descColor: '#6B7280',
          benefitBg: '#FAF5FF',
          benefitText: '#6B21A8',
          borderColor: '#D8B4FE'
        };
      case 'orange':
        return {
          gradient: ['#FFF7ED', '#FFEDD5'] as const,
          iconBg: '#F97316',
          iconColor: '#FFFFFF',
          titleColor: '#C2410C',
          descColor: '#6B7280',
          benefitBg: '#FFF7ED',
          benefitText: '#C2410C',
          borderColor: '#FED7AA'
        };
      default:
        return {
          gradient: ['#F9FAFB', '#F3F4F6'] as const,
          iconBg: '#6366F1',
          iconColor: '#FFFFFF',
          titleColor: '#374151',
          descColor: '#6B7280',
          benefitBg: '#F9FAFB',
          benefitText: '#6366F1',
          borderColor: '#E5E7EB'
        };
    }
  };

  const colors = getColorScheme(colorScheme);

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.container}>
      <LinearGradient colors={colors.gradient} style={styles.card}>
        <View style={[styles.iconContainer, { backgroundColor: colors.iconBg }]}>
          <Ionicons name={icon} size={28} color={colors.iconColor} />
        </View>
        
        <Text style={[styles.title, { color: colors.titleColor }]}>{title}</Text>
        <Text style={[styles.description, { color: colors.descColor }]}>{description}</Text>
        
        <View style={[styles.benefitContainer, { 
          backgroundColor: colors.benefitBg,
          borderColor: colors.borderColor 
        }]}>
          <Text style={[styles.benefitText, { color: colors.benefitText }]}>✓ {benefit}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  benefitContainer: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    marginTop: 'auto',
  },
  benefitText: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});