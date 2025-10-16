// Centralized API Service with Authentication
import { auth } from '../firebase';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://kyool-backend-606917950237.us-central1.run.app';

// Helper function to get auth headers
async function getAuthHeaders() {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No authenticated user');
    }
    
    const token = await user.getIdToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  } catch (error) {
    console.error('Auth headers error:', error);
    return {
      'Content-Type': 'application/json'
    };
  }
}

// Generic API request function
async function apiRequest(endpoint, options = {}) {
  try {
    const headers = options.authenticated ? await getAuthHeaders() : {
      'Content-Type': 'application/json'
    };
    
    const config = {
      ...options,
      headers: {
        ...headers,
        ...options.headers
      }
    };

    console.log(`🌐 API Request: ${config.method || 'GET'} ${BASE_URL}${endpoint}`);
    
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`✅ API Response successful for ${endpoint}`);
    return data;
  } catch (error) {
    console.error(`❌ API Request failed for ${endpoint}:`, error);
    throw error;
  }
}

// User API
export const userAPI = {
  // Get current authenticated user profile
  async getProfile() {
    return apiRequest('/auth/me', { authenticated: true });
  },

  // Get user by ID
  async getUser(userId) {
    return apiRequest(`/users/${userId}`, { authenticated: true });
  },

  // Get user by email
  async getUserByEmail(email) {
    return apiRequest(`/users/by-email/${encodeURIComponent(email)}`, { authenticated: true });
  },

  // Create or update user profile
  async createOrUpdateProfile(userId, userData) {
    return apiRequest(`/users/${userId}`, {
      method: 'POST',
      body: JSON.stringify(userData),
      authenticated: true
    });
  },

  // Update user profile
  async updateProfile(userId, userData) {
    return apiRequest(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
      authenticated: true
    });
  },

  // Search users
  async searchUsers(query) {
    if (!query) return { results: [] };
    return apiRequest(`/users/search?q=${encodeURIComponent(query)}`, { authenticated: true });
  },

  // Add friend
  async addFriend(userId, targetUserId) {
    return apiRequest(`/users/${userId}/add-friend`, {
      method: 'POST',
      body: JSON.stringify({ targetUserId }),
      authenticated: true
    });
  },

  // Weight logs
  async addWeightLog(userId, weight, date, bmi, bmr, tdee) {
    return apiRequest(`/users/${userId}/weight-log`, {
      method: 'POST',
      body: JSON.stringify({ weight, date, bmi, bmr, tdee }),
      authenticated: true
    });
  },

  async getWeightLogs(userId) {
    return apiRequest(`/users/${userId}/weight-logs`, { authenticated: true });
  },

  // Check username availability
  async checkUsername(userId, username) {
    return apiRequest(`/users/${userId}/check-username?username=${encodeURIComponent(username)}`, { 
      authenticated: true 
    });
  }
};

// Auth API
export const authAPI = {
  // Verify current token
  async verifyToken(token) {
    return apiRequest('/auth/verify-token', {
      method: 'POST',
      body: JSON.stringify({ token })
    });
  },

  // Get current user info
  async getCurrentUser() {
    return apiRequest('/auth/me', { authenticated: true });
  }
};

// Recipes API (placeholder for future implementation)
export const recipesAPI = {
  // Add recipe endpoints here when backend is ready
  async getRecommendations(userId, preferences = {}) {
    // For now, return mock data
    console.log('🍽️ Using mock recipe data (backend not connected)');
    return {
      recipes: [
        {
          id: 1,
          title: "Healthy Quinoa Bowl",
          category: "Lunch",
          emoji: "🥗",
          time: 20,
          calories: 450,
          description: "Nutritious quinoa with fresh vegetables"
        },
        {
          id: 2,
          title: "Protein Smoothie",
          category: "Breakfast", 
          emoji: "🥤",
          time: 5,
          calories: 320,
          description: "High-protein breakfast smoothie"
        }
      ]
    };
  }
};

// Fitness API (placeholder)
export const fitnessAPI = {
  // Add fitness endpoints when backend is ready
  async getWorkoutRecommendations(userId) {
    console.log('💪 Using mock workout data (backend not connected)');
    return {
      workouts: [
        {
          id: 1,
          name: "Morning Cardio",
          duration: 30,
          calories: 250,
          type: "cardio"
        },
        {
          id: 2,
          name: "Strength Training",
          duration: 45,
          calories: 350,
          type: "strength"
        }
      ]
    };
  }
};

export default {
  userAPI,
  authAPI,
  recipesAPI,
  fitnessAPI
};