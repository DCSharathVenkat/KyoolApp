// AUTO-GENERATED-TO-NATIVE: This file was created by tools/convert-web-to-native.js
// Manual fixes likely required: styles, icons, routing, third-party web-only APIs
import React from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from './ui/dropdown-menu';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  MoreVertical,
  Calendar as CalendarIcon,
  Target,
  Clock,
  Flame,
  Footprints,
  Droplets,
  Play
} from 'lucide-react';
import { motion } from 'motion/react';
// Using native date formatting instead of date-fns

interface WorkoutListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentWorkout: any;
  onStartWorkout: (workout: any) => void;
  onSetCurrentWorkout: (workout: any) => void;
}

export function WorkoutListDialog({ 
  open, 
  onOpenChange, 
  currentWorkout, 
  onStartWorkout,
  onSetCurrentWorkout
}: WorkoutListDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // All available workout routines
  const allWorkouts = [
    {
      id: 1,
      name: 'Push Day',
      difficulty: 'Intermediate',
      duration: '45 min',
      targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
      goal: 'Chest',
      exercises: [
        { id: 1, name: 'Bench Press', sets: 3, reps: '8-12', weight: '80kg' },
        { id: 2, name: 'Push-ups', sets: 3, reps: '15-20', weight: 'bodyweight' },
        { id: 3, name: 'Dumbbell Flyes', sets: 3, reps: '12-15', weight: '15kg' },
        { id: 4, name: 'Inclined Bench Press', sets: 3, reps: '8-10', weight: '70kg' }
      ]
    },
    {
      id: 2,
      name: 'Pull Day',
      difficulty: 'Intermediate', 
      duration: '40 min',
      targetMuscles: ['Back', 'Biceps'],
      goal: 'Back',
      exercises: [
        { id: 1, name: 'Pull-ups', sets: 3, reps: '8-12', weight: 'bodyweight' },
        { id: 2, name: 'Barbell Rows', sets: 3, reps: '10-12', weight: '60kg' },
        { id: 3, name: 'Lat Pulldowns', sets: 3, reps: '12-15', weight: '50kg' }
      ]
    },
    {
      id: 3,
      name: 'Leg Day',
      difficulty: 'Advanced',
      duration: '50 min', 
      targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
      goal: 'Legs',
      exercises: [
        { id: 1, name: 'Squats', sets: 4, reps: '8-10', weight: '100kg' },
        { id: 2, name: 'Deadlifts', sets: 3, reps: '6-8', weight: '120kg' },
        { id: 3, name: 'Lunges', sets: 3, reps: '12-15', weight: '20kg' }
      ]
    }
  ];

  // Streak data
  const streaks = [
    { type: 'Workout', days: 5, icon: Flame, color: 'text-orange-500' },
    { type: 'Walking', days: 12, icon: Footprints, color: 'text-green-500' },
    { type: 'Water', days: 8, icon: Droplets, color: 'text-blue-500' }
  ];

  const handleRemoveWorkout = (workoutId: number) => {
    console.log('Remove workout:', workoutId);
    // In a real app, this would remove the workout
  };

  const handleRemindLater = (workoutId: number) => {
    console.log('Remind later:', workoutId);
    // In a real app, this would set a reminder
  };

  const formatDateNavigation = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    }
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDate(newDate);
  };

  const displayedWorkout = currentWorkout || allWorkouts[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Workout List</DialogTitle>
          <DialogDescription>
            Manage your workout routines and track your fitness progress
          </DialogDescription>
        </DialogHeader>

        <View>
          {/* Streaks Section */}
          <Card>
            <CardContent>
              <h3>Your Streaks</h3>
              <View>
                {streaks.map((streak, index) => {
                  const Icon = streak.icon;
                  return (
                    <motion.div
                      key={streak.type}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                     
                    >
                      <View>
                        <View>
                          <Icon`} />
                        </View>
                        <View>
                          <View>{streak.days}</View>
                          <View>{streak.type}</View>
                          <View>days</View>
                        </View>
                      </View>
                    </motion.div>
                  );
                })}
              </View>
            </CardContent>
          </Card>

          {/* Date Navigation */}
          <Card>
            <CardContent>
              <View>
                <h3>Navigate by Date</h3>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <TouchableOpacity variant="outline" size="sm">
                      <CalendarIcon />
                      Select Date
                    </TouchableOpacity>
                  </PopoverTrigger>
                  <PopoverContent align="end">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        if (date) {
                          setSelectedDate(date);
                          setIsCalendarOpen(false);
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </View>
              
              <View>
                <TouchableOpacity
                  variant="ghost"
                  size="sm"
                  onPress={() => navigateDate('prev')}
                >
                  <ChevronLeft />
                </TouchableOpacity>
                
                <View>
                  <View>
                    {formatDateNavigation(selectedDate)}
                  </View>
                  <View>
                    Goal - {displayedWorkout.goal}
                  </View>
                </View>
                
                <TouchableOpacity
                  variant="ghost"
                  size="sm"
                  onPress={() => navigateDate('next')}
                >
                  <ChevronRight />
                </TouchableOpacity>
              </View>
            </CardContent>
          </Card>

          {/* Current Workout Section */}
          <Card>
            <CardHeader>
              <View>
                <CardTitle>Today's Workout</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <TouchableOpacity variant="ghost" size="sm">
                      Change Workout
                    </TouchableOpacity>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {allWorkouts.map((workout) => (
                      <DropdownMenuItem
                        key={workout.id}
                        onPress={() => onSetCurrentWorkout(workout)}
                      >
                        {workout.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </View>
            </CardHeader>
            <CardContent>
              <View>
                <View>
                  <h3>{displayedWorkout.name}</h3>
                  <View>
                    <Badge variant="secondary">{displayedWorkout.difficulty}</Badge>
                    <Badge variant="secondary">{displayedWorkout.duration}</Badge>
                  </View>
                </View>

                <View>
                  Target Muscles: {displayedWorkout.targetMuscles.join(', ')}
                </View>
              </View>
            </CardContent>
          </Card>

          {/* Exercise List */}
          <Card>
            <CardHeader>
              <View>
                <CardTitle>Exercises ({displayedWorkout.exercises.length})</CardTitle>
                <TouchableOpacity size="sm" variant="outline">
                  <Plus />
                  Add Exercise
                </TouchableOpacity>
              </View>
            </CardHeader>
            <CardContent>
              <View>
                {displayedWorkout.exercises.map((exercise: any, index: number) => (
                  <motion.div
                    key={exercise.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                   
                  >
                    <View>
                      <View>
                        {index + 1}.
                      </View>
                      <View>
                        <View>{exercise.name}</View>
                        <View>
                          {exercise.sets} sets
                        </View>
                      </View>
                    </View>
                    
                    <View>
                      <View>
                        {exercise.sets} sets
                      </View>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <TouchableOpacity variant="ghost" size="sm">
                            <MoreVertical />
                          </TouchableOpacity>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onPress={() => handleRemoveWorkout(exercise.id)}>
                            Remove
                          </DropdownMenuItem>
                          <DropdownMenuItem onPress={() => handleRemindLater(exercise.id)}>
                            Remind me later
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <ChevronRight />
                    </View>
                  </motion.div>
                ))}
              </View>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <View>
            <TouchableOpacity
              onPress={() => {
                onStartWorkout(displayedWorkout);
                onOpenChange(false);
              }}
             
            >
              <Play />
              Start Workout
            </TouchableOpacity>
            <TouchableOpacity
              variant="outline"
              onPress={() => onOpenChange(false)}
             
            >
              Close
            </TouchableOpacity>
          </View>
        </View>
      </DialogContent>
    </Dialog>
  );
}