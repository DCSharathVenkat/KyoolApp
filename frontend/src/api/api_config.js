// API Configuration for Real-Time Data
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://kyool-backend-606917950237.us-central1.run.app';
const USE_REAL_DATA = process.env.EXPO_PUBLIC_USE_REAL_DATA === 'true';
const FALLBACK_TO_MOCK = process.env.EXPO_PUBLIC_FALLBACK_TO_MOCK !== 'false';

// API request wrapper with real-time data preference
export async function apiRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  
  try {
    console.log(`🌐 API Request: ${options.method || 'GET'} ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Real-time data received from: ${endpoint}`);
      return { success: true, data, source: 'backend' };
    } else {
      console.warn(`⚠️ Backend error ${response.status}: ${endpoint}`);
      throw new Error(`HTTP ${response.status}`);
    }
  } catch (error) {
    console.error(`❌ API Request failed: ${endpoint}`, error.message);
    
    if (USE_REAL_DATA && !FALLBACK_TO_MOCK) {
      // Strict real-data mode - throw error
      throw new Error(`Real-time data unavailable: ${error.message}`);
    }
    
    // Return indication that fallback is needed
    return { success: false, error: error.message, source: 'error' };
  }
}

// Health check endpoint
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Get API configuration
export function getApiConfig() {
  return {
    baseUrl: BASE_URL,
    useRealData: USE_REAL_DATA,
    fallbackToMock: FALLBACK_TO_MOCK,
    isProduction: BASE_URL.includes('kyool-backend-606917950237'),
  };
}

export { BASE_URL, USE_REAL_DATA, FALLBACK_TO_MOCK };