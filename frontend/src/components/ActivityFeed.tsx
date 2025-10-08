import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface ActivityFeedProps {
  user: any;
  onViewAllFriends: () => void;
  onStartWorkout?: (workout: any) => void;
}

export const ActivityFeed = memo(function ActivityFeed({ user, onViewAllFriends, onStartWorkout }: ActivityFeedProps) {
  const [isWorkoutListOpen, setIsWorkoutListOpen] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState<any>(null);
  const [visibleActivities, setVisibleActivities] = useState(5);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showQuickWalkTimer, setShowQuickWalkTimer] = useState(false);

  // Workout routines data (from FitnessTracker)
  const workoutRoutines = [
    {
      id: 1,
      name: 'Push Day',
      difficulty: 'Intermediate',
      duration: '45 min',
      targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
      exercises: [
        { name: 'Bench Press', sets: 3, reps: '8-12', weight: '80kg' },
        { name: 'Push Ups', sets: 3, reps: '15-20', weight: 'bodyweight' },
        { name: 'Dumbbell Flyes', sets: 3, reps: '12-15', weight: '15kg' },
        { name: 'Inclined Bench Press', sets: 3, reps: '8-10', weight: '70kg' }
      ]
    },
    {
      id: 2,
      name: 'Pull Day',
      difficulty: 'Intermediate',
      duration: '40 min',
      targetMuscles: ['Back', 'Biceps'],
      exercises: [
        { name: 'Pull-ups', sets: 3, reps: '8-12', weight: 'bodyweight' },
        { name: 'Barbell Rows', sets: 3, reps: '10-12', weight: '60kg' },
        { name: 'Lat Pulldowns', sets: 3, reps: '12-15', weight: '50kg' }
      ]
    },
    {
      id: 3,
      name: 'Leg Day',
      difficulty: 'Advanced',
      duration: '50 min',
      targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
      exercises: [
        { name: 'Squats', sets: 4, reps: '8-10', weight: '100kg' },
        { name: 'Deadlifts', sets: 3, reps: '6-8', weight: '120kg' },
        { name: 'Lunges', sets: 3, reps: '12-15', weight: '20kg' }
      ]
    }
  ];

  const handleStartWorkout = (routine: any) => {
    if (onStartWorkout) {
      onStartWorkout(routine);
    } else {
      console.log('Starting workout:', routine.name);
      alert(`Starting ${routine.name} workout!`);
    }
  };

  const handleOpenWorkoutList = () => {
    setIsWorkoutListOpen(true);
  };

  const handleSetCurrentWorkout = (workout: any) => {
    setCurrentWorkout(workout);
  };

  const handleQuickWalkClick = () => {
    setShowQuickWalkTimer(true);
  };

  const handleBackFromTimer = () => {
    setShowQuickWalkTimer(false);
  };

  const activities = [
    {
      id: 1,
      type: 'achievement',
      icon: Trophy,
      iconColor: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      title: 'Daily Water Goal Complete!',
      description: 'You reached your 8 glasses water goal',
      time: '2 minutes ago',
      user: { name: 'You', avatar: user.avatar },
      likes: 0,
      comments: 0
    },
    {
      id: 2,
      type: 'social',
      icon: Users,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      title: 'Sarah J. shared a healthy recipe',
      description: 'Mediterranean Quinoa Bowl - only 340 calories!',
      time: '15 minutes ago',
      user: { name: 'Sarah J.', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face' },
      likes: 12,
      comments: 3
    },
    {
      id: 3,
      type: 'fitness',
      icon: Activity,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      title: 'You completed a 45-min walk',
      description: '6,847 steps • 287 calories burned',
      time: '1 hour ago',
      user: { name: 'You', avatar: user.avatar },
      likes: 0,
      comments: 0
    },
    {
      id: 4,
      type: 'safe-zone',
      icon: Target,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      title: 'Safe Zone Alert Helped You!',
      description: 'Avoided 650 calories by choosing grilled chicken over fried',
      time: '2 hours ago',
      user: { name: 'You', avatar: user.avatar },
      likes: 0,
      comments: 0
    },
    {
      id: 5,
      type: 'nutrition',
      icon: ChefHat,
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      title: 'Mike C. is on a 7-day healthy streak!',
      description: 'Stayed within calorie goals for a full week',
      time: '3 hours ago',
      user: { name: 'Mike C.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
      likes: 24,
      comments: 8
    }
  ];

  const quickStats = [
    { label: 'Today\'s Steps', value: '8,547', change: '+12%', icon: Activity, color: 'text-blue-500' },
    { label: 'Water Intake', value: '7/8', change: '87%', icon: Droplets, color: 'text-cyan-500' },
    { label: 'Calories Left', value: '480', change: 'Good', icon: Target, color: 'text-green-500' },
    { label: 'Active Friends', value: '23', change: '+3', icon: Users, color: 'text-purple-500' }
  ];

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setVisibleActivities(prev => Math.min(prev + 5, activities.length));
    setIsLoadingMore(false);
  };

  const displayedActivities = activities.slice(0, visibleActivities);
  const hasMoreActivities = visibleActivities < activities.length;

  // Quick workout types data
  const quickWorkouts = [
    {
      id: 'quick-walk',
      name: 'Quick Walk',
      duration: '15 min',
      icon: Footprints,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
      hoverColor: 'hover:bg-green-200',
      borderColor: 'border-green-300',
      description: 'Light cardio walk'
    },
    {
      id: 'hiit-training',
      name: 'HIIT Training',
      duration: '20 min',
      icon: Zap,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-100',
      hoverColor: 'hover:bg-orange-200',
      borderColor: 'border-orange-300',
      description: 'High intensity workout'
    },
    {
      id: 'strength-training',
      name: 'Strength Training',
      duration: '45 min',
      icon: Dumbbell,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      hoverColor: 'hover:bg-blue-200',
      borderColor: 'border-blue-300',
      description: 'Muscle building'
    },
    {
      id: 'yoga-flow',
      name: 'Yoga Flow',
      duration: '30 min',
      icon: Heart,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100',
      hoverColor: 'hover:bg-purple-200',
      borderColor: 'border-purple-300',
      description: 'Mindful movement'
    }
  ];

  const handleQuickWorkoutClick = (workout: any) => {
    if (workout.id === 'quick-walk') {
      handleQuickWalkClick();
    } else {
      console.log(`Starting ${workout.name}`);
      alert(`${workout.name} - Coming soon!`);
    }
  };

  // Show Quick Walk Timer if active
  if (showQuickWalkTimer) {
    return <QuickWalkTimer onBack={handleBackFromTimer} />;
  }

  return (
    <View>
      <WorkoutListDialog
        open={isWorkoutListOpen}
        onOpenChange={setIsWorkoutListOpen}
        currentWorkout={currentWorkout}
        onStartWorkout={onStartWorkout || (() => {})}
        onSetCurrentWorkout={handleSetCurrentWorkout}
      />
      {/* Header with Quick Stats */}
      <View>
        <View>
          <h1>Your Activity</h1>
          <Text>Your Fitness, Fully Personalized</Text>
        </View>

        {/* Quick Stats Cards - No animations for better performance */}
        <View>
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            const isActiveFriends = stat.label === 'Active Friends';
            
            return (
              <View key={index}>
                <Card 
                 `}
                  onPress={isActiveFriends ? onViewAllFriends : undefined}
                >
                  <CardContent>
                    <View>
                      <Icon`} />
                      <Text>{stat.change}</Text>
                    </View>
                    <View>
                      <View>{stat.value}</View>
                      <View>{stat.label}</View>
                    </View>
                  </CardContent>
                </Card>
              </View>
            );
          })}
        </View>
      </View>

      {/* Quick Workouts Section */}
      <View>
        <View>
          <View>
            <h2>
              <Dumbbell />
              Quick Workouts
            </h2>
            <Text>Ready-to-go workout routines</Text>
          </View>
        </View>

        <View>
          {/* Left side - Push Day workout */}
          <View>
            {(() => {
              const displayWorkout = currentWorkout || workoutRoutines[0];
              return (
                <Card>
                  <CardContent>
                    {/* Header with title and action buttons */}
                    <View>
                      <h3>{displayWorkout.name}</h3>
                      <TouchableOpacity
                        variant="ghost"
                        size="sm"
                       
                        onPress={() => {/* More options would go here */}}
                      >
                        <MoreVertical />
                      </TouchableOpacity>
                    </View>

                    {/* Badges */}
                    <View>
                      <Badge 
                        variant="secondary" 
                       
                      >
                        {displayWorkout.difficulty}
                      </Badge>
                      <Badge 
                        variant="secondary" 
                       
                      >
                        {displayWorkout.duration}
                      </Badge>
                    </View>

                    {/* Target Muscles */}
                    <View>
                      <Text>Target Muscles:</Text>
                      <Text>
                        {displayWorkout.targetMuscles.join(', ')}
                      </Text>
                    </View>

                    {/* Exercises */}
                    <View>
                      <Text>Exercises ({displayWorkout.exercises.length}):</Text>
                      <Text>
                        {displayWorkout.exercises.slice(0, 3).map((ex: { name: any; }) => ex.name).join(', ')}
                        {displayWorkout.exercises.length > 3 && '...'}
                      </Text>
                    </View>

                    {/* Action Buttons */}
                    <View>
                      <TouchableOpacity
                        onPress={() => handleStartWorkout(displayWorkout)}
                       
                      >
                        <Play />
                        Start Workout
                      </TouchableOpacity>
                      <TouchableOpacity
                        variant="outline"
                        onPress={handleOpenWorkoutList}
                       
                      >
                        Workout List
                      </TouchableOpacity>
                    </View>
                  </CardContent>
                </Card>
              );
            })()}
          </View>

          {/* Right side - Responsive Grid of Quick Workouts */}
          <View>
            <View>
              {quickWorkouts.map((workout) => {
                const Icon = workout.icon;
                return (
                  <View key={workout.id}>
                    <Card 
                      ${workout.bgColor} ${workout.hoverColor} hover:shadow-md group`}
                      onPress={() => handleQuickWorkoutClick(workout)}
                    >
                      <CardContent>
                        <View>
                          {/* Icon */}
                          <View>
                            <Icon`} />
                          </View>
                          
                          {/* Content */}
                          <View>
                            <h3>{workout.name}</h3>
                            <Text>{workout.duration}</Text>
                          </View>
                        </View>
                      </CardContent>
                    </Card>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </View>

      {/* Social Health Community Section */}
      <View>
        <Card>
          <CardContent>
            <View>
              <View>
                <h2>Social Health Community</h2>
                <Text>
                  Connect with like-minded individuals, share your journey, and get inspired by others who understand your health goals.
                </Text>
              </View>
              
              <View>
                <View>
                  <View />
                  <Text>Community challenges</Text>
                </View>
                <View>
                  <View />
                  <Text>Progress sharing</Text>
                </View>
                <View>
                  <View />
                  <Text>Motivational support</Text>
                </View>
              </View>
              
              <View>
                <TouchableOpacity 
                  onPress={onViewAllFriends}
                 
                >
                  View all friends →
                </TouchableOpacity>
              </View>
            </View>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <View>
              <View>
                <View>
                  <Users />
                </View>
                <View>
                  <h3>Join the Community</h3>
                  <Text>Connect with health enthusiasts</Text>
                </View>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>

      {/* Activity Feed - Simplified without heavy animations */}
      <Card>
        <CardHeader>
          <CardTitle>
            <TrendingUp />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <View>
            {displayedActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <View
                  key={activity.id}
                  ${activity.bgColor} hover:shadow-sm transition-shadow`}
                >
                  {/* Activity Icon */}
                  <View>
                    <View>
                      <Icon`} />
                    </View>
                  </View>

                  {/* Activity Content */}
                  <View>
                    <View>
                      <View>
                        <h4>{activity.title}</h4>
                        <Text>{activity.description}</Text>
                        
                        {/* User and Time */}
                        <View>
                          <Avatar>
                            <AvatarImage src={activity.user.avatar} />
                            <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
                          </Avatar>
                          <Text>{activity.user.name}</Text>
                          <Text>•</Text>
                          <View>
                            <Clock />
                            <Text>{activity.time}</Text>
                          </View>
                        </View>
                      </View>

                      {/* Activity Type Badge */}
                      <Badge variant="secondary">
                        {activity.type}
                      </Badge>
                    </View>

                    {/* Social Actions (for social activities) */}
                    {(activity.likes > 0 || activity.comments > 0) && (
                      <View>
                        <TouchableOpacity>
                          <ThumbsUp />
                          <Text>{activity.likes}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <MessageCircle />
                          <Text>{activity.comments}</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </View>

          {/* Load More */}
          {hasMoreActivities && (
            <View>
              <TouchableOpacity
                variant="ghost"
                onPress={handleLoadMore}
                disabled={isLoadingMore}
               
              >
                {isLoadingMore ? (
                  <>
                    <View />
                    Loading...
                  </>
                ) : (
                  'Load more activities...'
                )}
              </TouchableOpacity>
            </View>
          )}
          
          {!hasMoreActivities && displayedActivities.length > 5 && (
            <View>
              <Text>
                You've reached the end of your activity feed
              </Text>
            </View>
          )}
        </CardContent>
      </Card>
    </View>
  );
});