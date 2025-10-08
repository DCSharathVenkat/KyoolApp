// AUTO-GENERATED-TO-NATIVE: This file was created by tools/convert-web-to-native.js
// Manual fixes likely required: styles, icons, routing, third-party web-only APIs
import React from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Users, 
  Search, 
  UserPlus, 
  Filter,
  Circle,
  Calendar,
  TrendingUp,
  Trophy,
  Target,
  ArrowLeft
} from 'lucide-react';
import { motion } from 'motion/react';

interface ViewAllFriendsProps {
  onBack: () => void;
  onAddFriends: () => void;
}

export function ViewAllFriends({ onBack, onAddFriends }: ViewAllFriendsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'online' | 'recent'>('all');

  // Mock friends data with useful health information
  const allFriends = [
    {
      id: 1,
      name: 'Sarah Johnson',
      username: '@sarah_j',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
      isOnline: true,
      lastActive: 'Online now',
      joinedDate: 'March 2024',
      stats: {
        currentStreak: 12,
        totalWorkouts: 45,
        calorieGoal: 1600,
        avgSteps: 8500
      },
      achievements: ['7-Day Streak', 'Water Goal Master', 'Step Counter'],
      recentActivity: 'Completed morning yoga session'
    },
    {
      id: 2,
      name: 'Mike Chen',
      username: '@mike_c',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      isOnline: true,
      lastActive: '2 min ago',
      joinedDate: 'January 2024',
      stats: {
        currentStreak: 8,
        totalWorkouts: 89,
        calorieGoal: 2100,
        avgSteps: 12000
      },
      achievements: ['Fitness Pro', 'Early Bird', 'Consistency King'],
      recentActivity: 'Shared a healthy breakfast recipe'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      username: '@emma_r',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
      isOnline: true,
      lastActive: '5 min ago',
      joinedDate: 'February 2024',
      stats: {
        currentStreak: 25,
        totalWorkouts: 67,
        calorieGoal: 1500,
        avgSteps: 9200
      },
      achievements: ['Marathon Walker', 'Nutrition Expert', 'Goal Crusher'],
      recentActivity: 'Hit 25-day healthy eating streak!'
    },
    {
      id: 4,
      name: 'Alex Kim',
      username: '@alex_k',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      isOnline: false,
      lastActive: '1 hour ago',
      joinedDate: 'April 2024',
      stats: {
        currentStreak: 3,
        totalWorkouts: 23,
        calorieGoal: 1900,
        avgSteps: 7800
      },
      achievements: ['New Member', 'First Week'],
      recentActivity: 'Logged first workout session'
    },
    {
      id: 5,
      name: 'Lisa Martin',
      username: '@lisa_m',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&h=80&fit=crop&crop=face',
      isOnline: true,
      lastActive: 'Online now',
      joinedDate: 'December 2023',
      stats: {
        currentStreak: 42,
        totalWorkouts: 156,
        calorieGoal: 1400,
        avgSteps: 11500
      },
      achievements: ['Veteran Member', 'Inspiration', 'Mentor'],
      recentActivity: 'Reached 150+ workouts milestone'
    },
    {
      id: 6,
      name: 'David Lopez',
      username: '@david_l',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
      isOnline: false,
      lastActive: '3 hours ago',
      joinedDate: 'May 2024',
      stats: {
        currentStreak: 15,
        totalWorkouts: 34,
        calorieGoal: 2000,
        avgSteps: 6500
      },
      achievements: ['Rising Star', 'Weekend Warrior'],
      recentActivity: 'Completed 5K morning run'
    }
  ];

  const filteredFriends = allFriends.filter(friend => {
    const matchesSearch = friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         friend.username.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    switch (filterTab) {
      case 'online':
        return friend.isOnline;
      case 'recent':
        return friend.lastActive.includes('min ago') || friend.lastActive.includes('Online now');
      default:
        return true;
    }
  });

  const onlineCount = allFriends.filter(f => f.isOnline).length;

  return (
    <View>
      {/* Header */}
      <View>
        <TouchableOpacity variant="ghost" size="icon" onPress={onBack}>
          <ArrowLeft />
        </TouchableOpacity>
        <View>
          <h1>All Friends</h1>
          <Text>
            {allFriends.length} friends • {onlineCount} online now
          </Text>
        </View>
        <TouchableOpacity onPress={onAddFriends}>
          <UserPlus />
          Add Friends
        </TouchableOpacity>
      </View>

      {/* Search and Filters */}
      <Card>
        <CardContent>
          <View>
            <View>
              <Search />
              <TextInput
                placeholder="Search friends by name or username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
               
              />
            </View>
            <View>
              <TouchableOpacity
                variant={filterTab === 'all' ? 'default' : 'outline'}
                size="sm"
                onPress={() => setFilterTab('all')}
              >
                All ({allFriends.length})
              </TouchableOpacity>
              <TouchableOpacity
                variant={filterTab === 'online' ? 'default' : 'outline'}
                size="sm"
                onPress={() => setFilterTab('online')}
              >
                Online ({onlineCount})
              </TouchableOpacity>
              <TouchableOpacity
                variant={filterTab === 'recent' ? 'default' : 'outline'}
                size="sm"
                onPress={() => setFilterTab('recent')}
              >
                Recent
              </TouchableOpacity>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Friends Grid */}
      <View>
        {filteredFriends.map((friend, index) => (
          <motion.div
            key={friend.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent>
                {/* Friend Header */}
                <View>
                  <View>
                    <Avatar>
                      <AvatarImage src={friend.avatar} alt={friend.name} />
                      <AvatarFallback>{friend.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {friend.isOnline && (
                      <Circle />
                    )}
                  </View>
                  <View>
                    <h3>{friend.name}</h3>
                    <Text>{friend.username}</Text>
                    <View>
                      <View`} />
                      <Text>{friend.lastActive}</Text>
                    </View>
                  </View>
                </View>

                {/* Friend Stats */}
                <View>
                  <View>
                    <View>
                      <View>
                        <Trophy />
                        <Text>Streak</Text>
                      </View>
                      <Text>{friend.stats.currentStreak} days</Text>
                    </View>
                    <View>
                      <View>
                        <Target />
                        <Text>Goal</Text>
                      </View>
                      <Text>{friend.stats.calorieGoal} cal</Text>
                    </View>
                  </View>
                  
                  <View>
                    <View>
                      <TrendingUp />
                      <Text>Recent Activity</Text>
                    </View>
                    <Text>{friend.recentActivity}</Text>
                  </View>
                </View>

                {/* Achievements */}
                <View>
                  <Text>Achievements</Text>
                  <View>
                    {friend.achievements.slice(0, 2).map((achievement, i) => (
                      <Badge key={i} variant="secondary">
                        {achievement}
                      </Badge>
                    ))}
                    {friend.achievements.length > 2 && (
                      <Badge variant="outline">
                        +{friend.achievements.length - 2}
                      </Badge>
                    )}
                  </View>
                </View>

                {/* Member Since */}
                <View>
                  <Calendar />
                  <Text>Member since {friend.joinedDate}</Text>
                </View>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </View>

      {/* Empty State */}
      {filteredFriends.length === 0 && (
        <Card>
          <CardContent>
            <Users />
            <h3>No friends found</h3>
            <Text>
              {searchTerm ? 'Try adjusting your search or filters' : 'No friends match the current filter'}
            </Text>
            {searchTerm && (
              <TouchableOpacity variant="outline" onPress={() => setSearchTerm('')}>
                Clear search
              </TouchableOpacity>
            )}
          </CardContent>
        </Card>
      )}
    </View>
  );
}