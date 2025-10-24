// Health and Device Integration API service for Kyool App
import { apiRequest, USE_REAL_DATA, FALLBACK_TO_MOCK } from './api_config';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://kyool-backend-606917950237.us-central1.run.app';

// Mock health data since backend health API needs to be implemented
const MOCK_HEALTH_DATA = {
  'demo-user-123': {
    steps: {
      today: 8547,
      weekly: [6200, 7800, 8547, 9200, 7600, 8900, 9500],
      goal: 10000
    },
    heartRate: {
      current: 72,
      resting: 68,
      max: 185,
      zones: {
        fat_burn: { min: 111, max: 130 },
        cardio: { min: 130, max: 148 },
        peak: { min: 148, max: 185 }
      },
      history: [68, 70, 72, 69, 71, 73, 72] // Last 7 readings
    },
    sleep: {
      lastNight: {
        duration: 7.5,
        quality: 'Good',
        deepSleep: 1.8,
        remSleep: 1.2,
        lightSleep: 4.5,
        bedTime: '23:30',
        wakeTime: '07:00'
      },
      weeklyAverage: 7.2
    },
    calories: {
      burned: 2180,
      goal: 2300,
      active: 450,
      basal: 1730
    },
    water: {
      intake: 1800,
      goal: 2500,
      logs: [
        { time: '08:00', amount: 300 },
        { time: '10:30', amount: 250 },
        { time: '12:45', amount: 400 },
        { time: '15:20', amount: 350 },
        { time: '17:10', amount: 300 },
        { time: '19:00', amount: 200 }
      ]
    }
  }
};

const MOCK_DEVICES = [
  {
    id: 'apple-watch-001',
    name: 'Apple Watch Series 9',
    type: 'smartwatch',
    brand: 'Apple',
    connected: true,
    battery: 85,
    lastSync: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 minutes ago
    syncStatus: 'synced',
    capabilities: ['heart_rate', 'steps', 'workout_detection', 'sleep_tracking', 'calories'],
    dataTypes: ['steps', 'heart_rate', 'active_energy', 'workouts', 'sleep'],
    model: 'Series 9 45mm GPS',
    os: 'watchOS 10.0'
  },
  {
    id: 'iphone-001',
    name: 'iPhone 15 Pro',
    type: 'phone',
    brand: 'Apple',
    connected: true,
    battery: 73,
    lastSync: new Date(Date.now() - 1 * 60 * 1000).toISOString(), // 1 minute ago
    syncStatus: 'synced',
    capabilities: ['health_app', 'location', 'motion_sensors'],
    dataTypes: ['steps', 'flights_climbed', 'distance_walked'],
    model: 'iPhone 15 Pro',
    os: 'iOS 17.0'
  }
];

// Get user's connected devices
export async function getConnectedDevices(userId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/devices`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Backend not available, using mock devices');
  }

  return MOCK_DEVICES.filter(device => device.connected);
}

// Get all available devices for connection
export async function getAvailableDevices() {
  try {
    const response = await fetch(`${BASE_URL}/devices/available`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Backend not available, using mock available devices');
  }

  // Mock available devices for connection
  return [
    {
      id: 'fitbit-charge-6',
      name: 'Fitbit Charge 6',
      type: 'fitness',
      brand: 'Fitbit',
      connected: false,
      capabilities: ['heart_rate', 'sleep_score', 'stress_management', 'gps'],
      description: 'Advanced fitness tracker with built-in GPS'
    },
    {
      id: 'garmin-forerunner-955',
      name: 'Garmin Forerunner 955',
      type: 'smartwatch',
      brand: 'Garmin',
      connected: false,
      capabilities: ['advanced_running_metrics', 'vo2_max', 'training_status'],
      description: 'Premium GPS running smartwatch'
    },
    {
      id: 'samsung-health',
      name: 'Samsung Health',
      type: 'app',
      brand: 'Samsung',
      connected: false,
      capabilities: ['step_tracking', 'sleep_analysis', 'nutrition_tracking'],
      description: 'Comprehensive health and wellness app'
    }
  ];
}

// Connect a device
export async function connectDevice(userId, deviceId, deviceData) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/devices/${deviceId}/connect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deviceData)
    });
    
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Backend not available, simulating device connection');
  }

  // Simulate successful connection
  return {
    success: true,
    device: {
      ...deviceData,
      connected: true,
      lastSync: new Date().toISOString(),
      syncStatus: 'synced',
      battery: Math.floor(Math.random() * 40) + 60 // Random battery 60-100%
    }
  };
}

// Disconnect a device
export async function disconnectDevice(userId, deviceId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/devices/${deviceId}/disconnect`, {
      method: 'POST'
    });
    
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Backend not available, simulating device disconnection');
  }

  return { success: true };
}

// Sync device data
export async function syncDevice(userId, deviceId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/devices/${deviceId}/sync`, {
      method: 'POST'
    });
    
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Backend not available, simulating device sync');
  }

  // Simulate sync process
  return {
    success: true,
    syncTime: new Date().toISOString(),
    dataPoints: Math.floor(Math.random() * 50) + 10
  };
}

// Get comprehensive health data for a user
export async function getHealthData(userId, dataTypes = [], timeframe = '7d') {
  const params = new URLSearchParams();
  if (dataTypes.length > 0) params.append('types', dataTypes.join(','));
  params.append('timeframe', timeframe);
  
  const endpoint = `/users/${userId}/health-data?${params.toString()}`;
  const result = await apiRequest(endpoint);
  
  if (result.success) {
    return result.data;
  }
  
  if (!FALLBACK_TO_MOCK) {
    throw new Error('Real-time health data unavailable');
  }
  
  console.log('📱 Using mock health data as fallback');
  return MOCK_HEALTH_DATA[userId] || MOCK_HEALTH_DATA['demo-user-123'];
}

// Log water intake
export async function logWaterIntake(userId, amount, timestamp = null) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/water-logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        timestamp: timestamp || new Date().toISOString()
      })
    });
    
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Backend not available, logging water intake locally');
  }

  // Add to mock data
  if (MOCK_HEALTH_DATA[userId]?.water) {
    MOCK_HEALTH_DATA[userId].water.intake += amount;
    MOCK_HEALTH_DATA[userId].water.logs.push({
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      amount
    });
  }

  return { success: true, totalIntake: MOCK_HEALTH_DATA[userId]?.water?.intake || amount };
}

// Get water intake logs
export async function getWaterLogs(userId, date = null) {
  try {
    const url = date 
      ? `${BASE_URL}/users/${userId}/water-logs?date=${date}`
      : `${BASE_URL}/users/${userId}/water-logs`;
    
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Backend not available, using mock water logs');
  }

  return MOCK_HEALTH_DATA[userId]?.water || MOCK_HEALTH_DATA['demo-user-123'].water;
}

// Log sleep data
export async function logSleepData(userId, sleepData) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/sleep-logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sleepData)
    });
    
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Backend not available, logging sleep data locally');
  }

  return { success: true, logId: Date.now() };
}

// Get health metrics summary
export async function getHealthMetricsSummary(userId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/health-summary`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Backend not available, calculating mock health summary');
  }

  const healthData = MOCK_HEALTH_DATA[userId] || MOCK_HEALTH_DATA['demo-user-123'];
  
  return {
    stepsCompletion: Math.round((healthData.steps.today / healthData.steps.goal) * 100),
    caloriesCompletion: Math.round((healthData.calories.burned / healthData.calories.goal) * 100),
    waterCompletion: Math.round((healthData.water.intake / healthData.water.goal) * 100),
    sleepQuality: healthData.sleep.lastNight.quality,
    activeScore: Math.floor(Math.random() * 20) + 80, // Mock active score 80-100
    recommendations: [
      'Take a 5-minute walk to reach your step goal',
      'Drink more water - you\'re 700ml behind your goal',
      'Great job on maintaining consistent sleep schedule!'
    ]
  };
}

// Export health data
export async function exportHealthData(userId, format = 'json', dateRange = '30d') {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/export-health-data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ format, dateRange })
    });
    
    if (response.ok) {
      return await response.blob();
    }
  } catch (error) {
    console.log('Backend not available, generating mock export data');
  }

  // Return mock export confirmation
  return {
    success: true,
    message: 'Health data export has been prepared and will be emailed to you shortly.',
    exportId: `export_${Date.now()}`
  };
}