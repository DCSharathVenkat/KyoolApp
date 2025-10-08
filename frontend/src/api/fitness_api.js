// Fitness and Workout API service for Kyool App
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://kyool-backend-606917950237.us-central1.run.app';

// Mock workout data since backend fitness API needs to be implemented
const MOCK_WORKOUTS = [
  {
    id: 1,
    name: 'Full Body Strength',
    category: 'Strength',
    duration: 45,
    calories: 320,
    difficulty: 'Intermediate',
    equipment: 'Dumbbells',
    description: 'Complete full-body strength workout targeting all major muscle groups',
    exercises: [
      {
        id: 1,
        name: 'Squats',
        sets: 3,
        reps: '12-15',
        restTime: '60s',
        targetMuscles: ['quadriceps', 'glutes', 'hamstrings'],
        instructions: [
          'Stand with feet shoulder-width apart',
          'Lower your body as if sitting back into a chair',
          'Keep your chest up and knees over toes',
          'Return to standing position'
        ]
      },
      {
        id: 2,
        name: 'Push-ups',
        sets: 3,
        reps: '8-12',
        restTime: '45s',
        targetMuscles: ['chest', 'shoulders', 'triceps'],
        instructions: [
          'Start in plank position',
          'Lower body until chest nearly touches floor',
          'Push back up to starting position',
          'Keep body in straight line'
        ]
      },
      {
        id: 3,
        name: 'Deadlifts',
        sets: 3,
        reps: '10-12',
        restTime: '90s',
        targetMuscles: ['hamstrings', 'glutes', 'lower back'],
        instructions: [
          'Stand with feet hip-width apart',
          'Hinge at hips and bend knees slightly',
          'Keep back straight and chest up',
          'Lift weight by extending hips and knees'
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Cardio HIIT',
    category: 'Cardio',
    duration: 20,
    calories: 280,
    difficulty: 'Advanced',
    equipment: 'None',
    description: 'High-intensity interval training for maximum calorie burn',
    exercises: [
      {
        id: 4,
        name: 'Jumping Jacks',
        sets: 4,
        reps: '30s',
        restTime: '15s',
        targetMuscles: ['full body'],
        instructions: [
          'Start with feet together, arms at sides',
          'Jump feet apart while raising arms overhead',
          'Jump back to starting position',
          'Maintain steady rhythm'
        ]
      },
      {
        id: 5,
        name: 'Burpees',
        sets: 4,
        reps: '20s',
        restTime: '20s',
        targetMuscles: ['full body'],
        instructions: [
          'Start in standing position',
          'Drop into squat, place hands on floor',
          'Jump feet back into plank',
          'Jump feet forward, then jump up with arms overhead'
        ]
      }
    ]
  }
];

const MOCK_WORKOUT_LOGS = [
  {
    id: 1,
    userId: 'demo-user-123',
    workoutId: 1,
    workoutName: 'Full Body Strength',
    date: '2025-10-07',
    duration: 42,
    caloriesBurned: 315,
    exercises: [
      { exerciseId: 1, name: 'Squats', sets: [{ reps: 15, weight: 50 }, { reps: 12, weight: 55 }, { reps: 10, weight: 60 }] },
      { exerciseId: 2, name: 'Push-ups', sets: [{ reps: 12 }, { reps: 10 }, { reps: 8 }] }
    ],
    notes: 'Great workout, felt strong on squats'
  },
  {
    id: 2,
    userId: 'demo-user-123',
    workoutId: 2,
    workoutName: 'Cardio HIIT',
    date: '2025-10-05',
    duration: 18,
    caloriesBurned: 265,
    exercises: [
      { exerciseId: 4, name: 'Jumping Jacks', sets: [{ duration: 30 }, { duration: 30 }, { duration: 25 }, { duration: 20 }] }
    ],
    notes: 'Intense session, pushed hard on final rounds'
  }
];

// Get all available workouts
export async function getWorkouts(category = null) {
  try {
    const url = category ? `${BASE_URL}/workouts?category=${category}` : `${BASE_URL}/workouts`;
    const response = await fetch(url);
    
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Backend not available, using mock workouts');
  }

  // Filter mock data by category if provided
  let workouts = [...MOCK_WORKOUTS];
  if (category && category !== 'all') {
    workouts = workouts.filter(w => w.category.toLowerCase() === category.toLowerCase());
  }
  
  return workouts;
}

// Get workout by ID
export async function getWorkoutById(workoutId) {
  try {
    const response = await fetch(`${BASE_URL}/workouts/${workoutId}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Backend not available, using mock workout');
  }

  return MOCK_WORKOUTS.find(w => w.id === parseInt(workoutId));
}

// Start a workout session
export async function startWorkoutSession(userId, workoutId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/workout-sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        workoutId, 
        startTime: new Date().toISOString() 
      })
    });
    
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Backend not available, creating mock session');
  }

  // Return mock session
  return {
    sessionId: `session_${Date.now()}`,
    workoutId,
    startTime: new Date().toISOString(),
    status: 'active'
  };
}

// Complete a workout session and log the results
export async function completeWorkoutSession(userId, sessionData) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/workout-logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sessionData)
    });
    
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Backend not available, logging workout locally');
  }

  // Add to mock logs
  const newLog = {
    id: Date.now(),
    userId,
    ...sessionData,
    date: new Date().toISOString().split('T')[0]
  };
  
  MOCK_WORKOUT_LOGS.unshift(newLog);
  return { success: true, logId: newLog.id };
}

// Get user's workout history
export async function getUserWorkoutLogs(userId, limit = 10) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/workout-logs?limit=${limit}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Backend not available, using mock workout logs');
  }

  return MOCK_WORKOUT_LOGS.filter(log => log.userId === userId).slice(0, limit);
}

// Get workout statistics for a user
export async function getUserWorkoutStats(userId, timeframe = '7d') {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/workout-stats?timeframe=${timeframe}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Backend not available, calculating mock stats');
  }

  // Calculate mock stats from workout logs
  const logs = MOCK_WORKOUT_LOGS.filter(log => log.userId === userId);
  const totalWorkouts = logs.length;
  const totalDuration = logs.reduce((sum, log) => sum + log.duration, 0);
  const totalCalories = logs.reduce((sum, log) => sum + log.caloriesBurned, 0);
  const avgDuration = totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0;

  return {
    totalWorkouts,
    totalDuration,
    totalCalories,
    avgDuration,
    weeklyGoal: 5,
    completedThisWeek: Math.min(totalWorkouts, 5),
    currentStreak: 7,
    favoriteWorkoutType: 'Strength'
  };
}

// Get exercise database for custom workouts
export async function getExercises(bodyPart = null, equipment = null) {
  try {
    let url = `${BASE_URL}/exercises`;
    const params = new URLSearchParams();
    if (bodyPart) params.append('bodyPart', bodyPart);
    if (equipment) params.append('equipment', equipment);
    if (params.toString()) url += `?${params.toString()}`;
    
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Backend not available, using mock exercises');
  }

  // Return mock exercises extracted from workouts
  const allExercises = MOCK_WORKOUTS.flatMap(w => w.exercises);
  let filtered = [...allExercises];

  if (bodyPart) {
    filtered = filtered.filter(ex => 
      ex.targetMuscles.some(muscle => muscle.toLowerCase().includes(bodyPart.toLowerCase()))
    );
  }

  return filtered;
}

// Create custom workout
export async function createCustomWorkout(userId, workoutData) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/custom-workouts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workoutData)
    });
    
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Backend not available, creating workout locally');
  }

  const newWorkout = {
    id: Date.now(),
    userId,
    ...workoutData,
    createdAt: new Date().toISOString(),
    isCustom: true
  };

  return { success: true, workout: newWorkout };
}

// Get user's custom workouts
export async function getUserCustomWorkouts(userId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/custom-workouts`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Backend not available, returning empty custom workouts');
  }

  return []; // No mock custom workouts for now
}