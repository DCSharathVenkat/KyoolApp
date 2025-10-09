// AUTO-GENERATED-TO-NATIVE: This file was created by tools/convert-web-to-native.js
// Manual fixes likely required: styles, icons, routing, third-party web-only APIs
import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Ionicons } from '@expo/vector-icons';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FindDieticianProps {
  user: any;
}

export function FindDietician({ user }: FindDieticianProps) {
  const [location, setLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  // Mock dietician data
  const dieticians = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Registered Dietitian Nutritionist',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      reviewCount: 127,
      experience: '8 years',
      specialty: 'Weight Management',
      location: 'Downtown Medical Center',
      distance: '1.2 miles',
      consultationFee: 85,
      languages: ['English', 'Spanish'],
      availability: 'Available today',
      isOnline: true,
      certifications: ['RDN', 'CDE', 'CSSD'],
      bio: 'Specializes in weight management and diabetes care with a focus on sustainable lifestyle changes.',
      nextSlot: 'Today 3:00 PM'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      title: 'Clinical Nutritionist',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      rating: 4.8,
      reviewCount: 89,
      experience: '12 years',
      specialty: 'Sports Nutrition',
      location: 'Elite Sports Clinic',
      distance: '2.5 miles',
      consultationFee: 95,
      languages: ['English', 'Mandarin'],
      availability: 'Available tomorrow',
      isOnline: true,
      certifications: ['MS', 'CSCS', 'CISSN'],
      bio: 'Expert in sports nutrition and performance optimization for athletes and fitness enthusiasts.',
      nextSlot: 'Tomorrow 10:00 AM'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      title: 'Pediatric Nutritionist',
      image: 'https://images.unsplash.com/photo-1594824804732-ca8dbc4d6845?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      reviewCount: 156,
      experience: '6 years',
      specialty: 'Family Nutrition',
      location: 'Children\'s Health Center',
      distance: '3.1 miles',
      consultationFee: 75,
      languages: ['English', 'Spanish', 'Portuguese'],
      availability: 'Available this week',
      isOnline: true,
      certifications: ['RDN', 'CBDM'],
      bio: 'Focuses on family nutrition, childhood obesity prevention, and healthy eating habits for kids.',
      nextSlot: 'Friday 2:00 PM'
    },
    {
      id: 4,
      name: 'Dr. David Kim',
      title: 'Therapeutic Dietitian',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      rating: 4.7,
      reviewCount: 203,
      experience: '15 years',
      specialty: 'Medical Nutrition',
      location: 'Regional Medical Center',
      distance: '4.2 miles',
      consultationFee: 110,
      languages: ['English', 'Korean'],
      availability: 'Available next week',
      isOnline: false,
      certifications: ['RDN', 'CNSC', 'CDN'],
      bio: 'Specializes in medical nutrition therapy for chronic diseases and post-surgery recovery.',
      nextSlot: 'Next Tuesday 11:00 AM'
    }
  ];

  // Mock online recommendations
  const onlineRecommendations = [
    {
      id: 1,
      name: 'NutriPlan Pro',
      type: 'AI-Powered Platform',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=150&fit=crop',
      rating: 4.6,
      users: '50K+',
      price: '$19/month',
      features: ['Personalized meal plans', 'Calorie tracking', '24/7 support'],
      description: 'AI-driven nutrition planning with personalized recommendations.',
      specialty: 'General Nutrition'
    },
    {
      id: 2,
      name: 'MyFitnessPal Premium',
      type: 'Nutrition Tracking App',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=150&h=150&fit=crop',
      rating: 4.4,
      users: '200M+',
      price: '$9.99/month',
      features: ['Macro tracking', 'Recipe importer', 'Goal setting'],
      description: 'Comprehensive nutrition tracking with extensive food database.',
      specialty: 'Weight Management'
    },
    {
      id: 3,
      name: 'Precision Nutrition',
      type: 'Coaching Program',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop',
      rating: 4.8,
      users: '100K+',
      price: '$99/month',
      features: ['1-on-1 coaching', 'Habit tracking', 'Expert guidance'],
      description: 'Science-based nutrition coaching with certified professionals.',
      specialty: 'Behavior Change'
    }
  ];

  const specialties = [
    { id: 'all', label: 'All Specialties' },
    { id: 'weight', label: 'Weight Management' },
    { id: 'sports', label: 'Sports Nutrition' },
    { id: 'family', label: 'Family Nutrition' },
    { id: 'medical', label: 'Medical Nutrition' },
    { id: 'diabetes', label: 'Diabetes Care' },
    { id: 'heart', label: 'Heart Health' }
  ];

  const priceRanges = [
    { id: 'all', label: 'All Prices' },
    { id: 'budget', label: 'Under $75' },
    { id: 'standard', label: '$75 - $100' },
    { id: 'premium', label: 'Over $100' }
  ];

  const filteredDieticians = dieticians.filter(dietician => {
    const matchesSearch = dietician.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dietician.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || 
                            dietician.specialty.toLowerCase().includes(selectedSpecialty);
    const matchesPrice = priceRange === 'all' ||
                        (priceRange === 'budget' && dietician.consultationFee < 75) ||
                        (priceRange === 'standard' && dietician.consultationFee >= 75 && dietician.consultationFee <= 100) ||
                        (priceRange === 'premium' && dietician.consultationFee > 100);
    return matchesSearch && matchesSpecialty && matchesPrice;
  });

  const DieticianCard = ({ dietician }: { dietician: any }) => (
    <Card>
      <CardContent>
        <View>
          <Avatar>
            <AvatarImage src={dietician.image} alt={dietician.name} />
            <AvatarFallback>{dietician.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
          </Avatar>
          
          <View>
            <View>
              <View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>{dietician.name}</Text>
                <Text>{dietician.title}</Text>
              </View>
              <View>
                <TouchableOpacity>
                  <Ionicons name="heart-outline" size={16} color="#666" />
                </TouchableOpacity>
                {dietician.isOnline && (
                  <Badge variant="secondary">
                    Online Available
                  </Badge>
                )}
              </View>
            </View>
            
            <View>
              <View>
                <Ionicons name="star" size={16} color="#FFA500" />
                <Text>{dietician.rating}</Text>
                <Text>({dietician.reviewCount} reviews)</Text>
              </View>
              <View>
                <Ionicons name="trophy" size={16} color="#666" />
                <Text>{dietician.experience}</Text>
              </View>
            </View>
            
            <View>
              <View>
                <Ionicons name="location-outline" size={16} color="#666" />
                <Text>{dietician.location}</Text>
                <Text>• {dietician.distance}</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View>
          <View>
            <Badge variant="outline">{dietician.specialty}</Badge>
            {dietician.certifications.map((cert, index) => (
              <Badge key={index} variant="secondary">
                {cert}
              </Badge>
            ))}
          </View>
          
          <Text>{dietician.bio}</Text>
          
          <View>
            <View>
              <View>
                <Ionicons name="cash-outline" size={16} color="#666" />
                <Text>${dietician.consultationFee}</Text>
                <Text>per session</Text>
              </View>
              <View>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text>{dietician.nextSlot}</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View>
          <TouchableOpacity>
            <Ionicons name="calendar-outline" size={16} color="#fff" />
            Book Appointment
          </TouchableOpacity>
          {dietician.isOnline && (
            <TouchableOpacity>
              <Ionicons name="videocam-outline" size={16} color="#666" />
              Video Call
            </TouchableOpacity>
          )}
          <TouchableOpacity>
            <Ionicons name="chatbubble-outline" size={16} color="#666" />
          </TouchableOpacity>
        </View>
      </CardContent>
    </Card>
  );

  const OnlineRecommendationCard = ({ recommendation }: { recommendation: any }) => (
    <Card>
      <CardContent>
        <View>
          <View>
            <Ionicons name="globe-outline" size={16} color="#666" />
          </View>
          
          <View>
            <View>
              <View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>{recommendation.name}</Text>
                <Text>{recommendation.type}</Text>
              </View>
              <Badge variant="outline">{recommendation.specialty}</Badge>
            </View>
            
            <View>
              <View>
                <Ionicons name="star" size={16} color="#FFA500" />
                <Text>{recommendation.rating}</Text>
              </View>
              <View>
                <Ionicons name="people-outline" size={16} color="#666" />
                <Text>{recommendation.users} users</Text>
              </View>
            </View>
          </View>
        </View>
        
        <Text>{recommendation.description}</Text>
        
        <View>
          <Text>Features:</Text>
          <View>
            {recommendation.features.map((feature: string, index: number) => (
              <Badge key={index} variant="secondary">
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                {feature}
              </Badge>
            ))}
          </View>
        </View>
        
        <View>
          <View>
            <Ionicons name="cash-outline" size={16} color="#666" />
            <Text>{recommendation.price}</Text>
          </View>
          <TouchableOpacity>
            Get Started
          </TouchableOpacity>
        </View>
      </CardContent>
    </Card>
  );

  return (
    <View>
      <View>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#333', textAlign: 'center' }}>Find Nutrition Experts</Text>
        <Text>
          Connect with certified dieticians and nutritionists for personalized guidance
        </Text>
      </View>

      <Tabs defaultValue="local">
        <TabsList>
          <TabsTrigger value="local">Local Dieticians</TabsTrigger>
          <TabsTrigger value="online">Online Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="local">
          {/* Search and Filters */}
          <Card>
            <CardContent>
              <View>
                <View>
                  <Ionicons name="search" size={16} color="#666" />
                  <TextInput
                    placeholder="Search by name or specialty..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                   
                  />
                </View>
                
                <View>
                  <Ionicons name="location-outline" size={16} color="#666" />
                  <TextInput
                    placeholder="Enter your location..."
                    value={location}
                    onChangeText={setLocation}
                   
                  />
                </View>
                
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                 
                >
                  {specialties.map((specialty) => (
                    <option key={specialty.id} value={specialty.id}>
                      {specialty.label}
                    </option>
                  ))}
                </select>
                
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                 
                >
                  {priceRanges.map((range) => (
                    <option key={range.id} value={range.id}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </View>
            </CardContent>
          </Card>

          {/* Results */}
          <View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                {filteredDieticians.length} Dieticians Found
              </Text>
              <View>
                <Ionicons name="filter-outline" size={16} color="#666" />
                <Text>Sort by: Distance</Text>
              </View>
            </View>
            
            <View>
              {filteredDieticians.map((dietician) => (
                <DieticianCard key={dietician.id} dietician={dietician} />
              ))}
            </View>
          </View>
        </TabsContent>

        <TabsContent value="online">
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>Recommended Online Platforms</Text>
            <View>
              {onlineRecommendations.map((recommendation) => (
                <OnlineRecommendationCard key={recommendation.id} recommendation={recommendation} />
              ))}
            </View>
          </View>
          
          {/* Why Choose Online */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Ionicons name="videocam-outline" size={20} color="#666" />
                Why Choose Online Nutrition Counseling?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <View>
                <View>
                  <View>
                    <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                    <Text>Convenient scheduling from home</Text>
                  </View>
                  <View>
                    <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                    <Text>Access to specialists worldwide</Text>
                  </View>
                  <View>
                    <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                    <Text>Often more affordable options</Text>
                  </View>
                </View>
                <View>
                  <View>
                    <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                    <Text>Digital meal planning tools</Text>
                  </View>
                  <View>
                    <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                    <Text>24/7 support and tracking</Text>
                  </View>
                  <View>
                    <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                    <Text>Flexible communication options</Text>
                  </View>
                </View>
              </View>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </View>
  );
}