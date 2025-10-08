// AUTO-GENERATED-TO-NATIVE: This file was created by tools/convert-web-to-native.js
// Manual fixes likely required: styles, icons, routing, third-party web-only APIs
import React from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Users, 
  Heart, 
  AlertTriangle, 
  Leaf,
  Wheat,
  Milk,
  Egg,
  Fish,
  Nut,
  Save,
  UserPlus,
  Baby,
  User,
  Crown,
  Shield
} from 'lucide-react';
import { motion } from 'motion/react';

interface FoodProfilesProps {
  user: any;
}

export function FoodProfiles({ user }: FoodProfilesProps) {
  const [selectedProfile, setSelectedProfile] = useState('personal');
  const [isCreating, setIsCreating] = useState(false);
  const [editingProfile, setEditingProfile] = useState<any>(null);

  // Mock family profiles data
  const [profiles, setProfiles] = useState([
    {
      id: 'personal',
      name: user.name,
      relationship: 'You',
      age: user.age,
      avatar: user.avatar,
      allergies: ['Shellfish', 'Tree Nuts'],
      dietaryRestrictions: ['Lactose Intolerant'],
      preferences: ['Mediterranean', 'Low Sodium', 'High Protein'],
      medicalConditions: ['Prediabetes'],
      goals: ['Weight Loss', 'Better Energy'],
      dislikes: ['Mushrooms', 'Cilantro'],
      favorites: ['Salmon', 'Quinoa', 'Avocado'],
      calorieTarget: user.dailyCalorieTarget,
      isActive: true
    },
    {
      id: 'spouse',
      name: 'Jane Doe',
      relationship: 'Spouse',
      age: 45,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
      allergies: ['Gluten'],
      dietaryRestrictions: ['Vegetarian'],
      preferences: ['Plant-Based', 'Organic', 'Low Sugar'],
      medicalConditions: [],
      goals: ['Maintain Weight', 'Heart Health'],
      dislikes: ['Spicy Food', 'Brussels Sprouts'],
      favorites: ['Tofu', 'Spinach', 'Berries'],
      calorieTarget: 1600,
      isActive: true
    },
    {
      id: 'child1',
      name: 'Emma Doe',
      relationship: 'Daughter',
      age: 12,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
      allergies: ['Peanuts'],
      dietaryRestrictions: [],
      preferences: ['Kid-Friendly', 'Mild Flavors'],
      medicalConditions: [],
      goals: ['Healthy Growth', 'More Vegetables'],
      dislikes: ['Vegetables', 'Fish'],
      favorites: ['Chicken', 'Pasta', 'Apples'],
      calorieTarget: 1800,
      isActive: true
    }
  ]);

  const [newProfile, setNewProfile] = useState({
    name: '',
    relationship: '',
    age: '',
    allergies: [],
    dietaryRestrictions: [],
    preferences: [],
    medicalConditions: [],
    goals: [],
    dislikes: [],
    favorites: [],
    calorieTarget: 1800
  });

  const allergenOptions = [
    { id: 'milk', label: 'Milk/Dairy', icon: Milk },
    { id: 'eggs', label: 'Eggs', icon: Egg },
    { id: 'fish', label: 'Fish', icon: Fish },
    { id: 'shellfish', label: 'Shellfish', icon: Fish },
    { id: 'tree-nuts', label: 'Tree Nuts', icon: Nut },
    { id: 'peanuts', label: 'Peanuts', icon: Nut },
    { id: 'wheat', label: 'Wheat/Gluten', icon: Wheat },
    { id: 'soy', label: 'Soy', icon: Leaf }
  ];

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Mediterranean', 
    'Low Carb', 'Low Fat', 'Gluten-Free', 'Dairy-Free', 'Pescatarian'
  ];

  const goalOptions = [
    'Weight Loss', 'Weight Gain', 'Maintain Weight', 'Build Muscle',
    'Heart Health', 'Diabetes Management', 'Better Energy', 
    'Healthy Growth', 'Sports Performance'
  ];

  const relationshipOptions = [
    'Spouse/Partner', 'Child', 'Parent', 'Sibling', 'Other Family Member'
  ];

  const currentProfile = profiles.find(p => p.id === selectedProfile);

  const handleSaveProfile = () => {
    if (editingProfile) {
      setProfiles(profiles.map(p => 
        p.id === editingProfile.id ? { ...editingProfile, ...newProfile } : p
      ));
      setEditingProfile(null);
    } else {
      const id = `profile_${Date.now()}`;
      setProfiles([...profiles, { 
        ...newProfile, 
        id, 
        isActive: true,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face'
      }]);
    }
    setNewProfile({
      name: '',
      relationship: '',
      age: '',
      allergies: [],
      dietaryRestrictions: [],
      preferences: [],
      medicalConditions: [],
      goals: [],
      dislikes: [],
      favorites: [],
      calorieTarget: 1800
    });
    setIsCreating(false);
  };

  const handleDeleteProfile = (profileId: string) => {
    if (profileId !== 'personal') {
      setProfiles(profiles.filter(p => p.id !== profileId));
      if (selectedProfile === profileId) {
        setSelectedProfile('personal');
      }
    }
  };

  const MultiSelectInput = ({ 
    options, 
    selected, 
    onChange, 
    placeholder, 
    type = 'text' 
  }: { 
    options: string[], 
    selected: string[], 
    onChange: (items: string[]) => void,
    placeholder: string,
    type?: 'text' | 'allergen'
  }) => {
    const [input, setInput] = useState('');

    const addItem = (item: string) => {
      if (item && !selected.includes(item)) {
        onChange([...selected, item]);
      }
      setInput('');
    };

    const removeItem = (item: string) => {
      onChange(selected.filter(i => i !== item));
    };

    return (
      <View>
        <View>
          <TextInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addItem(input);
              }
            }}
          />
          <TouchableOpacity 
            type="button" 
            onPress={() => addItem(input)}
            disabled={!input.trim()}
          >
            Add
          </TouchableOpacity>
        </View>
        
        {options.length > 0 && (
          <View>
            {options.filter(option => 
              option.toLowerCase().includes(input.toLowerCase()) && 
              !selected.includes(option)
            ).slice(0, 5).map(option => (
              <Badge 
                key={option}
                variant="outline" 
               
                onPress={() => addItem(option)}
              >
                {option}
              </Badge>
            ))}
          </View>
        )}
        
        <View>
          {selected.map(item => (
            <Badge key={item} variant="secondary">
              {type === 'allergen' && <AlertTriangle />}
              {item}
              <TouchableOpacity 
                onPress={() => removeItem(item)}
               
              >
                ×
              </TouchableOpacity>
            </Badge>
          ))}
        </View>
      </View>
    );
  };

  const ProfileCard = ({ profile }: { profile: any }) => (
    <Card`}>
      <CardContent>
        <View>
          <Avatar>
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback>{profile.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <View>
            <h3>{profile.name}</h3>
            <Text>{profile.relationship}</Text>
            <Text>Age: {profile.age}</Text>
          </View>
          {profile.id === 'personal' && (
            <Badge variant="secondary">
              <Crown />
              You
            </Badge>
          )}
        </View>

        <View>
          {profile.allergies.length > 0 && (
            <View>
              <AlertTriangle />
              <Text>{profile.allergies.length} allergies</Text>
            </View>
          )}
          {profile.dietaryRestrictions.length > 0 && (
            <View>
              <Shield />
              <Text>{profile.dietaryRestrictions.length} dietary restrictions</Text>
            </View>
          )}
          <View>
            <Heart />
            <Text>{profile.goals.length} health goals</Text>
          </View>
        </View>

        <View>
          <TouchableOpacity
            size="sm"
            variant="outline"
            onPress={() => setSelectedProfile(profile.id)}
          >
            {selectedProfile === profile.id ? 'Selected' : 'View'}
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              size="sm"
              variant="ghost"
              onPress={() => {
                setEditingProfile(profile);
                setNewProfile({ ...profile });
                setIsCreating(true);
              }}
            >
              <Edit3 />
            </TouchableOpacity>
            {profile.id !== 'personal' && (
              <TouchableOpacity
                size="sm"
                variant="ghost"
                onPress={() => handleDeleteProfile(profile.id)}
              >
                <Trash2 />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </CardContent>
    </Card>
  );

  return (
    <View>
      {/* Header */}
      <View>
        <View>
          <h2>Family Food Profiles</h2>
          <Text>
            Create personalized nutrition profiles for your family members
          </Text>
        </View>
        
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <TouchableOpacity onPress={() => {
              setEditingProfile(null);
              setNewProfile({
                name: '',
                relationship: '',
                age: '',
                allergies: [],
                dietaryRestrictions: [],
                preferences: [],
                medicalConditions: [],
                goals: [],
                dislikes: [],
                favorites: [],
                calorieTarget: 1800
              });
            }}>
              <UserPlus />
              Add Family Member
            </TouchableOpacity>
          </DialogTrigger>
          
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingProfile ? 'Edit Profile' : 'Create New Family Profile'}
              </DialogTitle>
              <DialogDescription>
                {editingProfile 
                  ? 'Update the nutrition and dietary information for this family member.'
                  : 'Add a new family member with their specific nutrition needs, allergies, and preferences.'
                }
              </DialogDescription>
            </DialogHeader>
            
            <View>
              {/* Basic Info */}
              <View>
                <View>
                  <Text>Name</Text>
                  <TextInput
                    value={newProfile.name}
                    onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                    placeholder="Enter name"
                  />
                </View>
                <View>
                  <Text>Relationship</Text>
                  <select
                    value={newProfile.relationship}
                    onChange={(e) => setNewProfile({ ...newProfile, relationship: e.target.value })}
                   
                  >
                    <option value="">Select relationship</option>
                    {relationshipOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </View>
              </View>

              <View>
                <View>
                  <Text>Age</Text>
                  <TextInput
                    type="number"
                    value={newProfile.age}
                    onChange={(e) => setNewProfile({ ...newProfile, age: e.target.value })}
                    placeholder="Age"
                  />
                </View>
                <View>
                  <Text>Daily Calorie Target</Text>
                  <TextInput
                    type="number"
                    value={newProfile.calorieTarget}
                    onChange={(e) => setNewProfile({ ...newProfile, calorieTarget: parseInt(e.target.value) })}
                    placeholder="1800"
                  />
                </View>
              </View>

              {/* Allergies */}
              <View>
                <Text>Food Allergies</Text>
                <MultiSelectInput
                  options={allergenOptions.map(a => a.label)}
                  selected={newProfile.allergies}
                  onChange={(allergies) => setNewProfile({ ...newProfile, allergies })}
                  placeholder="Add allergy (e.g., Peanuts, Shellfish)"
                  type="allergen"
                />
              </View>

              {/* Dietary Restrictions */}
              <View>
                <Text>Dietary Restrictions & Preferences</Text>
                <MultiSelectInput
                  options={dietaryOptions}
                  selected={newProfile.dietaryRestrictions}
                  onChange={(dietaryRestrictions) => setNewProfile({ ...newProfile, dietaryRestrictions })}
                  placeholder="Add dietary preference (e.g., Vegetarian, Keto)"
                />
              </View>

              {/* Health Goals */}
              <View>
                <Text>Health Goals</Text>
                <MultiSelectInput
                  options={goalOptions}
                  selected={newProfile.goals}
                  onChange={(goals) => setNewProfile({ ...newProfile, goals })}
                  placeholder="Add health goal (e.g., Weight Loss, Heart Health)"
                />
              </View>

              {/* Favorites */}
              <View>
                <Text>Favorite Foods</Text>
                <MultiSelectInput
                  options={[]}
                  selected={newProfile.favorites}
                  onChange={(favorites) => setNewProfile({ ...newProfile, favorites })}
                  placeholder="Add favorite food (e.g., Salmon, Quinoa)"
                />
              </View>

              {/* Dislikes */}
              <View>
                <Text>Foods to Avoid</Text>
                <MultiSelectInput
                  options={[]}
                  selected={newProfile.dislikes}
                  onChange={(dislikes) => setNewProfile({ ...newProfile, dislikes })}
                  placeholder="Add disliked food (e.g., Mushrooms, Spicy Food)"
                />
              </View>

              <View>
                <TouchableOpacity variant="outline" onPress={() => setIsCreating(false)}>
                  Cancel
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSaveProfile}>
                  <Save />
                  {editingProfile ? 'Update Profile' : 'Create Profile'}
                </TouchableOpacity>
              </View>
            </View>
          </DialogContent>
        </Dialog>
      </View>

      <View>
        {/* Profile Selection */}
        <View>
          <h3>Family Members ({profiles.length})</h3>
          {profiles.map(profile => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </View>

        {/* Selected Profile Details */}
        <View>
          {currentProfile && (
            <Card>
              <CardHeader>
                <View>
                  <Avatar>
                    <AvatarImage src={currentProfile.avatar} alt={currentProfile.name} />
                    <AvatarFallback>
                      {currentProfile.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <View>
                    <CardTitle>
                      {currentProfile.name}
                      {currentProfile.id === 'personal' && (
                        <Badge variant="secondary">
                          <Crown />
                          You
                        </Badge>
                      )}
                    </CardTitle>
                    <Text>
                      {currentProfile.relationship} • Age {currentProfile.age} • {currentProfile.calorieTarget} cal/day target
                    </Text>
                  </View>
                </View>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="restrictions">Restrictions</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    <TabsTrigger value="goals">Goals</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <View>
                      <View>
                        <h4>
                          <Heart />
                          Favorite Foods
                        </h4>
                        <View>
                          {currentProfile.favorites.map((food: string) => (
                            <Badge key={food} variant="secondary">
                              {food}
                            </Badge>
                          ))}
                        </View>
                      </View>
                      
                      <View>
                        <h4>Foods to Avoid</h4>
                        <View>
                          {currentProfile.dislikes.map((food: string) => (
                            <Badge key={food} variant="outline">
                              {food}
                            </Badge>
                          ))}
                        </View>
                      </View>
                    </View>
                  </TabsContent>

                  <TabsContent value="restrictions">
                    <View>
                      <View>
                        <h4>
                          <AlertTriangle />
                          Allergies
                        </h4>
                        <View>
                          {currentProfile.allergies.length === 0 ? (
                            <Text>No known allergies</Text>
                          ) : (
                            <View>
                              {currentProfile.allergies.map((allergy: string) => (
                                <Badge key={allergy} variant="destructive">
                                  <AlertTriangle />
                                  {allergy}
                                </Badge>
                              ))}
                            </View>
                          )}
                        </View>
                      </View>
                      
                      <View>
                        <h4>
                          <Shield />
                          Dietary Restrictions
                        </h4>
                        <View>
                          {currentProfile.dietaryRestrictions.map((restriction: string) => (
                            <Badge key={restriction}>
                              {restriction}
                            </Badge>
                          ))}
                        </View>
                      </View>
                    </View>
                  </TabsContent>

                  <TabsContent value="preferences">
                    <View>
                      <h4>Food Preferences</h4>
                      <View>
                        {currentProfile.preferences.map((preference: string) => (
                          <Badge key={preference} variant="secondary">
                            {preference}
                          </Badge>
                        ))}
                      </View>
                    </View>
                  </TabsContent>

                  <TabsContent value="goals">
                    <View>
                      <h4>Health Goals</h4>
                      <View>
                        {currentProfile.goals.map((goal: string) => (
                          <View key={goal}>
                            <Heart />
                            <Text>{goal}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </View>
      </View>

      {/* Profile Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Users />
            Why Create Family Food Profiles?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <View>
            <View>
              <View>
                <Shield />
              </View>
              <h4>Safety First</h4>
              <Text>
                Track allergies and restrictions to keep everyone safe
              </Text>
            </View>
            <View>
              <View>
                <Heart />
              </View>
              <h4>Personalized Plans</h4>
              <Text>
                Get recipe recommendations tailored to each family member
              </Text>
            </View>
            <View>
              <View>
                <Users />
              </View>
              <h4>Family Harmony</h4>
              <Text>
                Find meals that work for everyone's needs and preferences
              </Text>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}