// Kyool App API Integration with FastAPI Backend
// Backend deployed at: https://kyool-backend-606917950237.us-central1.run.app

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://kyool-backend-606917950237.us-central1.run.app';

// Search users by query (username, name, email)
export async function searchUsers(query) {
  if (!query) return [];
  const res = await fetch(`${BASE_URL}/users/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.results || [];
}

// Add friend/follow (placeholder, to be implemented in backend)
export async function addFriend(currentUserId, targetUserId) {
  // POST /users/{currentUserId}/add-friend { targetUserId }
  const res = await fetch(`${BASE_URL}/users/${currentUserId}/add-friend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ targetUserId }),
  });
  return res.ok;
}

export async function addWeightLog(userId, weight, date, bmi, bmr, tdee) {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}/weight-log`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weight, date, bmi, bmr, tdee}),
    });
    return res.json();
  } catch (error) {
    // Fallback for demo purposes when backend is not available
    console.log('Backend not available, using mock data');
    return { success: true, id: Date.now() };
  }
}



// Check if a username is available (unique)
export async function isUsernameAvailable(username, userId) {
  const res = await fetch(`${BASE_URL}/users/${userId}/check-username?username=${encodeURIComponent(username)}`);
  console.log('Response status:', res);
  if (!res.ok) throw new Error('Failed to check username');
  const data = await res.json();
  return data.available;
}


export async function getWeightLogs(userId) {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}/weight-logs`);
    return res.json();
  } catch (error) {
    // Fallback for demo purposes when backend is not available
    console.log('Backend not available, using mock weight logs');
    return [
      { weight: 75, date: '2025-10-01', bmi: 23.1, bmr: 1650, tdee: 2300 },
      { weight: 74.5, date: '2025-10-02', bmi: 22.9, bmr: 1645, tdee: 2295 },
      { weight: 74.2, date: '2025-10-03', bmi: 22.8, bmr: 1642, tdee: 2292 },
      { weight: 74.0, date: '2025-10-04', bmi: 22.7, bmr: 1640, tdee: 2290 }
    ];
  }
}
export async function createOrUpdateUser(userId, userData) {
  const res = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "POST", // or "PUT" for update
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
}

export async function getUser(userId) {
  const res = await fetch(`${BASE_URL}/users/${userId}`);
  return res.json();
}

export async function getUserByEmail(email) {
  const res = await fetch(`${BASE_URL}/users/by-email/${email}`);
  return res.json();
}