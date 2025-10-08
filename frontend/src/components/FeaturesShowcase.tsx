// AUTO-GENERATED-TO-NATIVE: This file was created by tools/convert-web-to-native.js
// Manual fixes likely required: styles, icons, routing, third-party web-only APIs
import React from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Brain, 
  Shield, 
  Users, 
  Droplets, 
  Heart, 
  ChefHat, 
  Zap, 
  Activity, 
  Award, 
  BarChart3,
  Sparkles,
  Target,
  ArrowRight,
  PlayCircle,
  CheckCircle2
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FeaturesShowcaseProps {
  user: any;
  onFeatureSelect: (feature: string) => void;
}

export function FeaturesShowcase({ user, onFeatureSelect }: FeaturesShowcaseProps) {
  const [activeFeature, setActiveFeature] = useState('social-wellness');

  const featuresData = {
    'safe-zone': {
      title: 'Safe Zone Technology',
      subtitle: 'AI-Powered Calorie Intelligence',
      description: `Perfect for your health profile: As a ${user.age}-year-old, our AI calculates your optimal daily intake of ${user.dailyCalorieTarget} calories and warns you before high-calorie choices derail your progress.`,
      benefits: [
        'Personalized calorie boundaries based on your age and lifestyle',
        'Real-time warnings before exceeding safe limits',
        'Age-aware recommendations that evolve with you',
        'Smart portion control guidance'
      ],
      image: 'https://images.unsplash.com/photo-1644127307101-f34996697a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhjYWxvcmllJTIwdHJhY2tpbmclMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU3ODgwMDUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      action: 'Try Safe Zone',
      route: 'recipes'
    },
    'health-tracking': {
      title: 'Smart Health Tracking',
      subtitle: 'Comprehensive Health Management',
      description: 'Track your vitals, BMI, and health metrics with personalized insights tailored to your life stage and wellness goals.',
      benefits: [
        'Age-specific health benchmarks and targets',
        'Comprehensive BMI and body composition tracking',
        'Daily health metrics monitoring',
        'Integration with medical devices and wearables'
      ],
      image: 'https://images.unsplash.com/photo-1584846981296-618299947480?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBoZWFsdGglMjB0cmFja2luZyUyMGFwcHxlbnwxfHx8fDE3NTc4ODAwNDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      action: 'View Health',
      route: 'health'
    },
    'social-wellness': {
      title: 'Social Wellness Community',
      subtitle: 'Accountability That Works',
      description: 'Connect with others on similar health journeys, share progress, and build lasting accountability partnerships that drive real results.',
      benefits: [
        'Age-group specific communities and challenges',
        'Anonymous progress sharing and motivation',
        'Expert-led wellness discussions and tips',
        'Achievement celebrations and peer support'
      ],
      image: 'https://images.unsplash.com/photo-1750041888982-67a58e6c9014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBhcHAlMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU3ODgwMDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      action: 'Join Community',
      route: 'social'
    }
  };

  const quickFeatures = [
    {
      icon: Droplets,
      title: 'Smart Water Tracking',
      description: 'AI-powered hydration reminders',
      color: 'from-blue-500 to-cyan-500',
      route: 'water'
    },
    {
      icon: ChefHat,
      title: 'Recipe Discovery',
      description: 'Healthy recipes by ingredients',
      color: 'from-green-500 to-emerald-500',
      route: 'recipes'
    },
    {
      icon: Activity,
      title: 'Fitness Integration',
      description: 'Comprehensive workout tracking',
      color: 'from-purple-500 to-pink-500',
      route: 'fitness'
    },
    {
      icon: Target,
      title: 'Goal Management',
      description: 'Personalized health objectives',
      color: 'from-orange-500 to-red-500',
      route: 'profile'
    }
  ];

  const currentFeature = featuresData[activeFeature as keyof typeof featuresData];

  return (
    <View>
      {/* Welcome Header */}
      <View>
        <View>
          <View>
            <Sparkles />
          </View>
          <View>
            <h1>
              Welcome to your health journey, {user.name}!
            </h1>
            <Text>
              Discover the intelligent features designed specifically for your lifestyle
            </Text>
          </View>
        </View>
        
        <View>
          <View>
            <View>Your Age</View>
            <View>{user.age} years</View>
          </View>
          <View>
            <View>Daily Calorie Target</View>
            <View>{user.dailyCalorieTarget} cal</View>
          </View>
          <View>
            <View>Safe Zone Status</View>
            <View>
              <View></View>
              <Text>Active</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Main Feature Showcase */}
      <View>
        {/* Feature Navigation */}
        <View>
          <h2>Explore Features</h2>
          {Object.entries(featuresData).map(([key, feature]) => (
            <Card 
              key={key}
             `}
              onPress={() => setActiveFeature(key)}
            >
              <CardContent>
                <View>
                  <View`}>
                    {key === 'safe-zone' && <Shield`} />}
                    {key === 'health-tracking' && <Heart`} />}
                    {key === 'social-wellness' && <Users`} />}
                  </View>
                  <View>
                    <h3>{feature.title}</h3>
                    <Text>{feature.subtitle}</Text>
                  </View>
                </View>
              </CardContent>
            </Card>
          ))}
        </View>

        {/* Feature Details */}
        <View>
          <Card>
            <View>
              <ImageWithFallback
                src={currentFeature.image}
                alt={currentFeature.title}
               
              />
              <View />
              <View>
                <Badge>
                  {currentFeature.subtitle}
                </Badge>
                <h3>{currentFeature.title}</h3>
              </View>
            </View>
            
            <CardContent>
              <Text>
                {currentFeature.description}
              </Text>
              
              <View>
                {currentFeature.benefits.map((benefit, index) => (
                  <View key={index}>
                    <CheckCircle2 />
                    <Text>{benefit}</Text>
                  </View>
                ))}
              </View>
              
              <View>
                <TouchableOpacity 
                 
                  onPress={() => onFeatureSelect(currentFeature.route)}
                >
                  {currentFeature.action}
                  <ArrowRight />
                </TouchableOpacity>
                <TouchableOpacity variant="outline">
                  <PlayCircle />
                  Watch Demo
                </TouchableOpacity>
              </View>
            </CardContent>
          </Card>
        </View>
      </View>

      {/* Quick Access Features */}
      <View>
        <h2>Quick Access</h2>
        <View>
          {quickFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
               
                onPress={() => onFeatureSelect(feature.route)}
              >
                <CardContent>
                  <View flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon />
                  </View>
                  <h3>{feature.title}</h3>
                  <Text>{feature.description}</Text>
                </CardContent>
              </Card>
            );
          })}
        </View>
      </View>
    </View>
  );
}