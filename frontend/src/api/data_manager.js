// Data Management Service for Kyool App
// Handles user data synchronization across all components
import * as UserAPI from './user_api';
import * as RecipeAPI from './recipe_api';
import * as FitnessAPI from './fitness_api';
import * as HealthAPI from './health_api';

// User data management
let currentUser = null;
let userDataCache = {};

// Initialize user session
export async function initializeUserSession(userId) {
  try {
    currentUser = await UserAPI.getUserById(userId);
    if (currentUser) {
      // Preload user data
      await Promise.all([
        loadHealthData(userId),
        loadFitnessData(userId),
        loadRecipeData(userId)
      ]);
      return currentUser;
    }
  } catch (error) {
    console.error('Failed to initialize user session:', error);
  }
  return null;
}

// Get current user
export function getCurrentUser() {
  return currentUser;
}

// Update current user
export async function updateCurrentUser(updates) {
  if (!currentUser) return null;
  
  try {
    const updatedUser = await UserAPI.updateUser(currentUser.id, updates);
    currentUser = { ...currentUser, ...updatedUser };
    return currentUser;
  } catch (error) {
    console.error('Failed to update user:', error);
    return null;
  }
}

// Health data management
export async function loadHealthData(userId) {
  try {
    const healthData = await HealthAPI.getHealthData(userId);
    userDataCache.health = healthData;
    return healthData;
  } catch (error) {
    console.error('Failed to load health data:', error);
    return null;
  }
}

export function getHealthData() {
  return userDataCache.health;
}

export async function logWaterIntake(amount) {
  if (!currentUser) return null;
  
  try {
    const result = await HealthAPI.logWaterIntake(currentUser.id, amount);
    // Update cache
    if (userDataCache.health?.water) {
      userDataCache.health.water.intake += amount;
      userDataCache.health.water.logs.push({
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        amount
      });
    }
    return result;
  } catch (error) {
    console.error('Failed to log water intake:', error);
    return null;
  }
}

export async function getConnectedDevices() {
  if (!currentUser) return [];
  
  try {
    const devices = await HealthAPI.getConnectedDevices(currentUser.id);
    userDataCache.devices = devices;
    return devices;
  } catch (error) {
    console.error('Failed to get connected devices:', error);
    return [];
  }
}

export async function connectDevice(deviceId, deviceData) {
  if (!currentUser) return null;
  
  try {
    const result = await HealthAPI.connectDevice(currentUser.id, deviceId, deviceData);
    if (result.success && userDataCache.devices) {
      userDataCache.devices.push(result.device);
    }
    return result;
  } catch (error) {
    console.error('Failed to connect device:', error);
    return null;
  }
}

// Fitness data management
export async function loadFitnessData(userId) {
  try {
    const [workouts, stats] = await Promise.all([
      FitnessAPI.getWorkouts(),
      FitnessAPI.getUserStats(userId)
    ]);
    
    userDataCache.fitness = {
      workouts,
      stats,
      exercises: await FitnessAPI.getExercises()
    };
    return userDataCache.fitness;
  } catch (error) {
    console.error('Failed to load fitness data:', error);
    return null;
  }
}

export function getFitnessData() {
  return userDataCache.fitness;
}

export async function startWorkout(workoutId) {
  if (!currentUser) return null;
  
  try {
    const session = await FitnessAPI.startWorkoutSession(currentUser.id, workoutId);
    userDataCache.activeWorkout = session;
    return session;
  } catch (error) {
    console.error('Failed to start workout:', error);
    return null;
  }
}

export async function endWorkout(sessionId, workoutData) {
  if (!currentUser) return null;
  
  try {
    const result = await FitnessAPI.endWorkoutSession(sessionId, workoutData);
    userDataCache.activeWorkout = null;
    // Refresh stats
    userDataCache.fitness.stats = await FitnessAPI.getUserStats(currentUser.id);
    return result;
  } catch (error) {
    console.error('Failed to end workout:', error);
    return null;
  }
}

export function getActiveWorkout() {
  return userDataCache.activeWorkout;
}

// Recipe data management
export async function loadRecipeData(userId) {
  try {
    const [recipes, favorites] = await Promise.all([
      RecipeAPI.searchRecipes(''),
      RecipeAPI.getFavoriteRecipes(userId)
    ]);
    
    userDataCache.recipes = {
      all: recipes,
      favorites,
      categories: await RecipeAPI.getRecipeCategories()
    };
    return userDataCache.recipes;
  } catch (error) {
    console.error('Failed to load recipe data:', error);
    return null;
  }
}

export function getRecipeData() {
  return userDataCache.recipes;
}

export async function searchRecipes(query, filters = {}) {
  try {
    const recipes = await RecipeAPI.searchRecipes(query, filters);
    // Update cache if it's a general search
    if (!query && Object.keys(filters).length === 0) {
      if (userDataCache.recipes) {
        userDataCache.recipes.all = recipes;
      }
    }
    return recipes;
  } catch (error) {
    console.error('Failed to search recipes:', error);
    return [];
  }
}

export async function toggleRecipeFavorite(recipeId) {
  if (!currentUser) return null;
  
  try {
    const result = await RecipeAPI.toggleFavorite(currentUser.id, recipeId);
    // Update cache
    if (userDataCache.recipes?.favorites) {
      if (result.favorited) {
        const recipe = userDataCache.recipes.all?.find(r => r.id === recipeId);
        if (recipe) {
          userDataCache.recipes.favorites.push(recipe);
        }
      } else {
        userDataCache.recipes.favorites = userDataCache.recipes.favorites.filter(r => r.id !== recipeId);
      }
    }
    return result;
  } catch (error) {
    console.error('Failed to toggle recipe favorite:', error);
    return null;
  }
}

// Data synchronization
export async function syncAllData() {
  if (!currentUser) return false;
  
  try {
    await Promise.all([
      loadHealthData(currentUser.id),
      loadFitnessData(currentUser.id),
      loadRecipeData(currentUser.id)
    ]);
    
    // Sync connected devices
    await getConnectedDevices();
    
    return true;
  } catch (error) {
    console.error('Failed to sync all data:', error);
    return false;
  }
}

// Get comprehensive user dashboard data
export function getDashboardData() {
  return {
    user: currentUser,
    health: userDataCache.health,
    fitness: userDataCache.fitness,
    recipes: userDataCache.recipes,
    devices: userDataCache.devices,
    activeWorkout: userDataCache.activeWorkout
  };
}

// Clear user session
export function clearUserSession() {
  currentUser = null;
  userDataCache = {};
}

// Get data loading status
export function getDataLoadingStatus() {
  return {
    health: !!userDataCache.health,
    fitness: !!userDataCache.fitness,
    recipes: !!userDataCache.recipes,
    devices: !!userDataCache.devices
  };
}

// Export utility functions for components
export const DataUtils = {
  formatDate: (date) => new Date(date).toLocaleDateString(),
  formatTime: (date) => new Date(date).toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit' 
  }),
  calculateBMI: (weight, height) => {
    const heightInM = height / 100;
    return (weight / (heightInM * heightInM)).toFixed(1);
  },
  calculateCaloriesBurned: (duration, intensity, weight) => {
    // Simple calculation: MET * weight * hours
    const met = intensity === 'high' ? 8 : intensity === 'medium' ? 5 : 3;
    return Math.round(met * weight * (duration / 60));
  },
  getHealthScore: (user, healthData) => {
    if (!healthData) return 0;
    
    let score = 0;
    let factors = 0;
    
    // Steps completion (25% of score)
    if (healthData.steps) {
      score += (healthData.steps.today / healthData.steps.goal) * 25;
      factors += 25;
    }
    
    // Water intake (25% of score)
    if (healthData.water) {
      score += (healthData.water.intake / healthData.water.goal) * 25;
      factors += 25;
    }
    
    // Sleep quality (25% of score)
    if (healthData.sleep?.lastNight?.quality) {
      const qualityScore = healthData.sleep.lastNight.quality === 'Excellent' ? 25 :
                          healthData.sleep.lastNight.quality === 'Good' ? 20 :
                          healthData.sleep.lastNight.quality === 'Fair' ? 15 : 10;
      score += qualityScore;
      factors += 25;
    }
    
    // Calories burned (25% of score)
    if (healthData.calories) {
      score += (healthData.calories.burned / healthData.calories.goal) * 25;
      factors += 25;
    }
    
    return factors > 0 ? Math.min(Math.round(score / factors * 100), 100) : 0;
  }
};