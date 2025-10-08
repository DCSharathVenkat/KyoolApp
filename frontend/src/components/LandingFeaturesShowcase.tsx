// AUTO-GENERATED-TO-NATIVE: This file was created by tools/convert-web-to-native.js
// Manual fixes likely required: styles, icons, routing, third-party web-only APIs
import React from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Shield, 
  Users, 
  Heart, 
  ArrowRight,
  PlayCircle,
  CheckCircle2
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const fadeInUpKeyframes = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

interface LandingFeaturesShowcaseProps {
  onSignUp: () => void;
}

export function LandingFeaturesShowcase({ onSignUp }: LandingFeaturesShowcaseProps) {
  const [activeFeature, setActiveFeature] = useState('social-wellness');

  const featuresData = {
    'safe-zone': {
      title: 'Safe Zone Technology',
      subtitle: 'AI-Powered Calorie Intelligence',
      description: 'Revolutionary AI that learns your patterns and warns you before high-calorie choices derail your progress. Get personalized calorie boundaries based on your age and lifestyle.',
      benefits: [
        'Personalized calorie boundaries based on your age and lifestyle',
        'Real-time warnings before exceeding safe limits',
        'Age-aware recommendations that evolve with you',
        'Smart portion control guidance'
      ],
      image: 'https://images.unsplash.com/photo-1644127307101-f34996697a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhjYWxvcmllJTIwdHJhY2tpbmclMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU3ODgwMDUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      action: 'Try Safe Zone'
    },
    'health-tracking': {
      title: 'Smart Health Tracking',
      subtitle: 'Comprehensive Health Management',
      description: 'Track your vitals, BMI, and health metrics with personalized insights tailored to your life stage and wellness goals. Complete health monitoring in one place.',
      benefits: [
        'Age-specific health benchmarks and targets',
        'Comprehensive BMI and body composition tracking',
        'Daily health metrics monitoring',
        'Integration with medical devices and wearables'
      ],
      image: 'https://images.unsplash.com/photo-1584846981296-618299947480?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBoZWFsdGglMjB0cmFja2luZyUyMGFwcHxlbnwxfHx8fDE3NTc4ODAwNDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      action: 'Start Tracking'
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
      action: 'Join Community'
    }
  };

  const currentFeature = featuresData[activeFeature as keyof typeof featuresData];

  return (
    <>
      <style>{fadeInUpKeyframes}</style>
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
                  <h3`}>{feature.title}</h3>
                  <Text`}>{feature.subtitle}</Text>
                </View>
                {/* Click indicator */}
                <View`} />
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
            
            {/* Animated background elements */}
            <View />
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
                <View 
                  key={index} 
                 
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.5s ease-out forwards'
                  }}
                >
                  <CheckCircle2 />
                  <Text>{benefit}</Text>
                </View>
              ))}
            </View>
            
            <View>
              <TouchableOpacity 
                size="lg"
               
                onPress={onSignUp}
              >
                {currentFeature.action}
                <ArrowRight />
              </TouchableOpacity>
              <TouchableOpacity 
                variant="outline" 
                size="lg"
               
              >
                <PlayCircle />
                Watch Demo
              </TouchableOpacity>
            </View>
          </CardContent>
        </Card>
      </View>
      </View>
    </>
  );
}