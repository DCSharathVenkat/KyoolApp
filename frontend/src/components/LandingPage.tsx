// AUTO-GENERATED-TO-NATIVE: This file was created by tools/convert-web-to-native.js
// Manual fixes likely required: styles, icons, routing, third-party web-only APIs
import React from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useNavigate } // TODO: react-router-dom import removed - convert to React Navigation or platform-specific routing
import { 
  Heart, 
  Droplets, 
  ChefHat, 
  Dumbbell,
  Users,
  Crown,
  Star,
  Check,
  ArrowRight,
  Play,
  Target,
  TrendingUp,
  Shield,
  Smartphone,
  Globe,
  Zap,
  Brain,
  Activity,
  Award,
  Wifi,
  Sparkles,
  Eye,
  BarChart3
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LandingFeaturesShowcase } from './LandingFeaturesShowcase';
// Using placeholder for Health Hub screenshot

interface LandingPageProps {
  onLogin: () => void;
  onSignUp: () => void;
}

export function LandingPage({ onLogin, onSignUp }: LandingPageProps) {
  
const navigate = useNavigate();
const handleLoginClick = () => {
  navigate("/login");
};


  const features = [
    {
      icon: Heart,
      title: 'Track Your Health',
      description: 'See your weight, BMI, and how many calories you should eat. No confusing numbers - just simple info.',
      color: 'text-red-500'
    },
    {
      icon: Droplets,
      title: 'Remember to Drink Water',
      description: 'Get friendly reminders to drink water throughout the day. Your phone will nudge you when you forget.',
      color: 'text-blue-500'
    },
    {
      icon: ChefHat,
      title: 'Find Healthy Recipes',
      description: 'Type in what\'s in your fridge and get healthy meal ideas. No more "what should I cook tonight?"',
      color: 'text-green-500'
    },
    {
      icon: Dumbbell,
      title: 'Track Your Workouts',
      description: 'Log your walks, gym sessions, or yoga. See your progress over time and celebrate small wins.',
      color: 'text-purple-500'
    },
    {
      icon: Users,
      title: 'Connect with Friends',
      description: 'Add friends, share your progress, and cheer each other on. It\'s way easier when you\'re not alone.',
      color: 'text-orange-500'
    },
    {
      icon: Target,
      title: 'Set Simple Goals',
      description: 'Pick goals that actually make sense for your life. No crazy 30-day challenges - just real progress.',
      color: 'text-cyan-500'
    }
  ];

  const benefits = [
    {
      title: 'Health Hub - Your Complete Wellness Dashboard',
      description: 'Introducing Health Hub: Everything you need for a healthy lifestyle in one beautifully designed, AI-powered interface that adapts to your age and lifestyle. This is the evolution of health tracking.',
      image: 'https://images.unsplash.com/photo-1570894808314-677b57f25e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBhcHAlMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU3OTczNzYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Real-time health metrics', 'Personalized daily targets', 'Smart progress tracking', 'Integrated Safe Zone technology']
    },
    {
      title: 'Safe Zone Technology',
      description: 'Revolutionary AI that learns your patterns and warns you before high-calorie choices derail your progress. No more guesswork.',
      image: 'https://images.unsplash.com/photo-1644127307101-f34996697a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhjYWxvcmllJTIwdHJhY2tpbmclMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU3ODgwMDUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Proactive calorie warnings', 'Age-based recommendations', 'Personalized safe limits']
    },
    {
      title: 'Social Health Community',
      description: 'Connect with like-minded individuals, share your journey, and get inspired by others who understand your health goals.',
      image: 'https://images.unsplash.com/photo-1750041888982-67a58e6c9014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBhcHAlMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU3ODgwMDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Community challenges', 'Progress sharing', 'Motivational support']
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fitness Enthusiast',
      content: 'Health Hub transformed my health routine. The water tracking alone helped me lose 10 pounds!',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Busy Professional',
      content: 'Finally, an app that tracks everything I need. The recipe suggestions save me hours of meal planning.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'New Mom',
      content: 'The social features keep me motivated. Seeing others achieve their goals inspires me daily.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5
    }
  ];

  const featureShowcase = {
    title: "Health Hub: Where health journeys adapt together, succeed together",
    description: "Multiple health goals come together with intelligent insights to create lasting change. With Health Hub's Safe Zone technology, you can build personalized, adaptive wellness strategies for every aspect of your life — all with AI assistance, of course. Start achieving more, together.",
    tabs: [
      {
        id: 'safe-zone',
        label: 'Safe Zone Technology',
        title: 'Intelligent Calorie Monitoring',
        description: 'Set up personalized calorie boundaries for your health goals. Let AI work with the data you need and nothing else.',
        image: 'https://images.unsplash.com/photo-1644127307101-f34996697a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhjYWxvcmllJTIwdHJhY2tpbmclMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU3ODgwMDUxfDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: 'community',
        label: 'Social Wellness',
        title: 'Community-Driven Health',
        description: 'Connect with like-minded individuals and build accountability partnerships that drive real results.',
        image: 'https://images.unsplash.com/photo-1584846981296-618299947480?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBoZWFsdGglMjB0cmFja2luZyUyMGFwcHxlbnwxfHx8fDE3NTc4ODAwNDh8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: 'health-hub',
        label: 'Health Hub',
        title: 'Complete Health Monitoring',
        description: 'Experience the power of Health Hub - a comprehensive dashboard that brings all your health data together in one intelligent interface designed for real results.',
        image: 'https://images.unsplash.com/photo-1570894808314-677b57f25e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBhcHAlMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU3OTczNzYwfDA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ]
  };

  const advancedFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Smart recommendations based on your unique health patterns and goals.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Real-time Alerts',
      description: 'Instant notifications when you\'re approaching your safe zone limits.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Activity,
      title: 'Continuous Monitoring',
      description: 'Track your progress 24/7 with seamless device integration.',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Award,
      title: 'Achievement System',
      description: 'Gamified experience that celebrates your health milestones.',
      color: 'from-blue-500 to-indigo-500'
    }
  ];

  const stats = [
    { number: '47', label: 'Active Users (Help us get to 50K!)' },
    { number: '23', label: 'Recipes Shared (Your grandma\'s recipe could be #24!)' },
    { number: '156', label: 'Workouts Logged (We need more gym selfies!)' },
    { number: '4.9', label: 'App Store Rating (OK, this one is real!)' }
  ];
  

  return (
    <View>
      {/* Subtle background elements inspired by Zoho CRM */}
      <View />
      <View />
      <View />
      
      {/* Navigation */}
      <View>
        <View>
          <View>
            <View>
              <View>
                <Text>H</Text>
              </View>
              <Text>Health Hub</Text>
            </View>
            
            <View>
              <Text /* anchor converted - add onPress */ href="#how-it-works">How It Works</Text>
              <Text /* anchor converted - add onPress */ href="#success-stories">Success Stories</Text>
              <Text /* anchor converted - add onPress */ href="#what-people-say">What People Say</Text>
            </View>

            <View>
              <TouchableOpacity onPress={onLogin}>
                Get Started
              </TouchableOpacity>
              {/*<TouchableOpacity onPress={onSignUp}>
                Get Started
              </TouchableOpacity>*/}
            </View>
          </View>
        </View>
      </View>

      {/* Hero Section */}
      <View>
        <View>
          <View>
            {/* Content */}
            <View>
              <View>
                <Badge>
                  🧠 AI-Powered Safe Zone Technology
                </Badge>
                
                <h1>
                  Finally, A Health App
                  <Text>
                    That Actually Helps
                  </Text>
                </h1>
                
                <Text>
                  Stop you before you eat that donut. Reminds you to drink water. 
                  Connects you with friends who get it. It's like having a smart friend who cares about your health.
                </Text>
                
                <View>
                  <TouchableOpacity size="lg" onPress={onSignUp}>
                    Try It Free Now
                    <ArrowRight />
                  </TouchableOpacity>
                  <TouchableOpacity variant="outline" size="lg">
                    <Play />
                    Watch How It Works
                  </TouchableOpacity>
                </View>
                
                <View>
                  <View>
                    <View />
                    Works for your age (no one-size-fits-all BS)
                  </View>
                  <View>
                    <View />
                    Warns you before you mess up your diet
                  </View>
                  <View>
                    <View />
                    Free to try • No credit card needed
                  </View>
                </View>
              </View>
            </View>
            
            {/* App Screenshot - Centered */}
            <View>
              <View>
                {/* Main app screenshot with sophisticated frame */}
                <View>
                  <View />
                  <View>
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1570894808314-677b57f25e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBhcHAlMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU3OTczNzYwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Health Hub Dashboard - Complete Health Monitoring Interface"
                     
                    />
                  </View>
                </View>
                
                {/* Floating elements showcasing features */}
                <View>
                  <View>
                    <View>
                      <Droplets />
                    </View>
                    <View>
                      <View>Daily Water Goal</View>
                      <View>2.1L / 2.5L completed</View>
                    </View>
                  </View>
                </View>
                
                <View>
                  <View>
                    <View>
                      <Shield />
                    </View>
                    <View>
                      <View>Safe Zone Active</View>
                      <View>Calorie monitoring ON</View>
                    </View>
                  </View>
                </View>
                
                {/* Subtle background effects */}
                <View />
                <View />
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Stats Section */}
      <View>
        <View>
          <View>
            <h2>
              Let's Be Honest Here... 🤷‍♂️
            </h2>
            <Text>
              We're not gonna lie to you with fake big numbers. We're a small team building something awesome, 
              and we need YOUR help to grow! Here's where we actually stand:
            </Text>
          </View>
          
          <View>
            {stats.map((stat, index) => (
              <View key={index}>
                <View>{stat.number}</View>
                <View>{stat.label}</View>
              </View>
            ))}
          </View>
          
          <View>
            <h3>
              Help Us Make These Numbers Epic! 🚀
            </h3>
            <Text>
              Know someone who's tired of boring health apps? Your mom who keeps asking about your diet? 
              That friend who takes gym mirror selfies? <Text>Send them our way!</Text>
            </Text>
            <View>
              <TouchableOpacity 
                size="lg" 
               
                onPress={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Check out this honest health app!',
                      text: 'Finally, a health app that actually helps (and admits when they need help growing)!',
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    // You could add a toast notification here
                  }
                }}
              >
                Share with Friends 📱
              </TouchableOpacity>
              <TouchableOpacity 
                variant="outline" 
                size="lg"
                onPress={() => window.open('mailto:?subject=Check out this awesome health app!&body=Hey! Found this health app that\'s actually honest about being small and asks for help. Pretty refreshing! Check it out: ' + window.location.href, '_blank')}
              >
                Email Your Family 📧
              </TouchableOpacity>
            </View>
            <Text>
              Every share helps us compete with those big corporate health apps that track everything but help nothing! 💪
            </Text>
          </View>
        </View>
      </View>

      {/* Explore Features Section */}
      <View>
        <View>
          <View>
            <h2>
              Explore Features
            </h2>
            <Text>
              Discover the intelligent features designed specifically for your lifestyle. 
              See how Health Hub adapts to your needs and helps you succeed.
            </Text>
          </View>
          <LandingFeaturesShowcase 
            onSignUp={onSignUp}
          />
        </View>
      </View>

      {/* How It Works Section */}
      <View id="how-it-works">
        <View>
          <View>
            <h2>
              Here's How Health Hub Works
            </h2>
            <Text>
              It's super simple! Track your health, get smart warnings when you're about to eat too much, 
              and connect with friends who cheer you on.
            </Text>
          </View>
          
          <View>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index}>
                  <CardHeader>
                    <View>
                      <Icon`} />
                    </View>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text>{feature.description}</Text>
                  </CardContent>
                </Card>
              );
            })}
          </View>
        </View>
      </View>

      {/* Success Stories Section */}
      <View id="success-stories">
        <View>
          <View>
            <h2>
              Real People, Real Results
            </h2>
            <Text>
              Check out what happened when people just like you started using Health Hub. 
              No fancy diets, no crazy workouts - just smart help that actually works. 
              These folks lost weight, felt better, and finally found something that stuck.
            </Text>
          </View>
          
          <View>
            {benefits.map((benefit, index) => (
              <View key={index}`}>
                <View`}>
                  <View>
                    <View>
                      <h3>{benefit.title}</h3>
                      <Text>{benefit.description}</Text>
                    </View>
                    
                    {benefit.features && (
                      <View>
                        {benefit.features.map((feature, featureIndex) => (
                          <View key={featureIndex}>
                            <View />
                            <Text>{feature}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                    
                    <TouchableOpacity variant="outline">
                      Explore Feature
                      <ArrowRight />
                    </TouchableOpacity>
                  </View>
                </View>
                <View`}>
                  <View>
                    <View>
                      <ImageWithFallback
                        src={benefit.image}
                        alt={benefit.title}
                       
                      />
                    </View>
                    {/* Subtle glow effect */}
                    <View />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* What People Say Section */}
      <View id="what-people-say">
        <View>
          <View>
            <h2>
              What People Are Saying
            </h2>
            <Text>
              Real reviews from real people (we didn't pay them to say this!)
            </Text>
          </View>
          
          <View>
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent>
                  <View>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} />
                    ))}
                  </View>
                  <Text>"{testimonial.content}"</Text>
                  <View>
                    <ImageWithFallback
                      src={testimonial.avatar}
                      alt={testimonial.name}
                     
                    />
                    <View>
                      <View>{testimonial.name}</View>
                      <View>{testimonial.role}</View>
                    </View>
                  </View>
                </CardContent>
              </Card>
            ))}
          </View>
        </View>
      </View>

      {/* Feature Showcase Section */}
      <View id="showcase">
        <View />
        <View>
          <View>
            <h2>
              {featureShowcase.title}
            </h2>
            <Text>
              {featureShowcase.description}
            </Text>
            <TouchableOpacity>
              Learn more <ArrowRight />
            </TouchableOpacity>
          </View>

          {/* Feature Tabs */}
          <View>
            <View>
              <View>
                <View>
                  {featureShowcase.tabs.map((tab) => (
                    <TouchableOpacity
                      key={tab.id}
                     
                    >
                      {tab.label}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            {/* Active Tab Content */}
            <View>
              <View>
                <h3>
                  {featureShowcase.tabs[0].title}
                </h3>
                <Text>
                  {featureShowcase.tabs[0].description}
                </Text>
              </View>
              <View>
                <View>
                  <ImageWithFallback
                    src={featureShowcase.tabs[0].image}
                    alt={featureShowcase.tabs[0].title}
                   
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Advanced Features Grid */}
      <View>
        <View>
          <View>
            <h2>
              Advanced Features for Every Health Goal
            </h2>
            <Text>
              Discover the intelligent features that make KyoolApp your ultimate health companion
            </Text>
          </View>
          
          <View>
            {advancedFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index}>
                  <CardContent>
                    <View flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
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

      {/* CTA Section */}
      <View>
        <View>
          <h2>
            Ready to Actually Stick to Your Health Goals?
          </h2>
          <Text>
            Thousands of people are already using KyoolApp to get healthier without the stress. Your turn!
          </Text>
          <View>
            <TouchableOpacity size="lg" onPress={onSignUp}>
              Let's Do This - It's Free!
              <ArrowRight />
            </TouchableOpacity>
            <TouchableOpacity variant="outline" size="lg" onPress={onLogin}>
              I Already Have an Account
            </TouchableOpacity>
          </View>
          
          <View>
            <View>
              <Shield />
              Secure & Private
            </View>
            <View>
              <Smartphone />
              Mobile Optimized
            </View>
            <View>
              <Globe />
              Available Worldwide
            </View>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View>
        <View>
          <View>
            <View>
              <View>
                <View>
                  <Text>K</Text>
                </View>
                <Text>KyoolApp</Text>
              </View>
              <Text>
                The health app that actually helps you stick to your goals. 
                No confusing features, no overwhelming data - just simple help that works.
              </Text>
              <View>
                <TouchableOpacity size="sm" onPress={onSignUp}>
                  Start Free Trial
                </TouchableOpacity>
                <TouchableOpacity variant="outline" size="sm">
                  Download App
                </TouchableOpacity>
              </View>
            </View>
            
            <View>
              <h4>What You Get</h4>
              <ul>
                <li><Text /* anchor converted - add onPress */ href="#how-it-works"><Heart />Track Your Health</Text></li>
                <li><Text /* anchor converted - add onPress */ href="#how-it-works"><Droplets />Water Reminders</Text></li>
                <li><Text /* anchor converted - add onPress */ href="#how-it-works"><ChefHat />Recipe Ideas</Text></li>
                <li><Text /* anchor converted - add onPress */ href="#how-it-works"><Shield />Smart Warnings</Text></li>
                <li><Text /* anchor converted - add onPress */ href="#how-it-works"><Users />Friend Support</Text></li>
              </ul>
            </View>
            
            <View>
              <h4>How It's Smart</h4>
              <ul>
                <li><Text /* anchor converted - add onPress */ href="#how-it-works"><Brain />Learns Your Habits</Text></li>
                <li><Text /* anchor converted - add onPress */ href="#how-it-works"><Zap />Instant Alerts</Text></li>
                <li><Text /* anchor converted - add onPress */ href="#how-it-works"><Activity />24/7 Tracking</Text></li>
                <li><Text /* anchor converted - add onPress */ href="#how-it-works"><BarChart3 />Simple Progress</Text></li>
                <li><Text /* anchor converted - add onPress */ href="#how-it-works"><Wifi />Works with Your Phone</Text></li>
              </ul>
            </View>
            
            <View>
              <h4>Learn More</h4>
              <ul>
                <li><Text /* anchor converted - add onPress */ href="#success-stories"><Eye />See How It Works</Text></li>
                <li><Text /* anchor converted - add onPress */ href="#what-people-say"><Star />Real User Stories</Text></li>
                <li><Text /* anchor converted - add onPress */ href="#"><Sparkles />Health Tips</Text></li>
                <li><Text /* anchor converted - add onPress */ href="#"><Award />Why It Works</Text></li>
                <li><Text /* anchor converted - add onPress */ href="#"><Target />Getting Started</Text></li>
              </ul>
            </View>
          </View>
          
          <View>
            <View>
              <View>
                <Text>© 2024 KyoolApp. All rights reserved.</Text>
                <View>
                  <Shield />
                  <Text>HIPAA Compliant</Text>
                </View>
              </View>
              <View>
                <Text /* anchor converted - add onPress */ href="#">Privacy Policy</Text>
                <Text /* anchor converted - add onPress */ href="#">Terms of Service</Text>
                <Text /* anchor converted - add onPress */ href="#">Security</Text>
                <Text /* anchor converted - add onPress */ href="#">Contact</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}