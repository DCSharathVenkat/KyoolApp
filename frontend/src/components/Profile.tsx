import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  SafeAreaView,
  TextInput,
  Modal,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { calculateBMI, calculateBMR, calculateTDEE } from '../utils/health';

const { width } = Dimensions.get('window');

interface ProfileProps {
  user: any;
  setUser?: (user: any) => void;
}

export function Profile({ user, setUser }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    height: user?.height?.toString() || '',
    weight: user?.weight?.toString() || '',
    age: user?.age?.toString() || '',
    activityLevel: user?.activityLevel || 'moderately_active',
    gender: user?.gender || 'male',
    goal: user?.goal || 'Weight Management',
  });

  // Calculate health metrics
  const height = user?.height || 180;
  const weight = user?.weight || 75;
  const age = user?.age || 35;
  const gender = user?.gender || 'male';
  const activityLevel = user?.activityLevel || 'moderately_active';

  const bmi = calculateBMI(weight, height);
  const bmr = calculateBMR(weight, height, age, gender);
  const tdee = bmr ? calculateTDEE(bmr, activityLevel) : null;

  // User stats (mock data)
  const userStats = {
    joinDate: '2024-01-15',
    totalWorkouts: 45,
    totalRecipes: 23,
    waterGoalsAchieved: 28,
    currentStreak: 7,
    followers: 156,
    following: 89
  };

  const achievements = [
    { id: 1, title: '7-Day Streak', icon: 'flame', color: '#FF6B6B', achieved: true },
    { id: 2, title: 'First Workout', icon: 'fitness', color: '#4ECDC4', achieved: true },
    { id: 3, title: 'Recipe Master', icon: 'restaurant', color: '#45B7D1', achieved: true },
    { id: 4, title: 'Hydration Hero', icon: 'water', color: '#96CEB4', achieved: true },
    { id: 5, title: '30-Day Challenge', icon: 'trophy', color: '#FECA57', achieved: false },
    { id: 6, title: 'Marathon Runner', icon: 'walk', color: '#FF9FF3', achieved: false },
  ];

  const settings = [
    { title: 'Notifications', icon: 'notifications', value: 'On', action: 'toggle' },
    { title: 'Privacy Settings', icon: 'shield-checkmark', value: 'Enabled', action: 'navigate' },
    { title: 'Data Export', icon: 'download', value: '', action: 'export' },
    { title: 'Help & Support', icon: 'help-circle', value: '', action: 'support' },
    { title: 'App Version', icon: 'information-circle', value: '1.0.0', action: 'info' },
  ];

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name: editForm.name,
      email: editForm.email,
      height: parseInt(editForm.height) || height,
      weight: parseInt(editForm.weight) || weight,
      age: parseInt(editForm.age) || age,
      activityLevel: editForm.activityLevel,
      gender: editForm.gender,
      goal: editForm.goal,
    };

    if (setUser) {
      setUser(updatedUser);
    }
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleSettingAction = (setting: any) => {
    switch (setting.action) {
      case 'toggle':
        Alert.alert('Notifications', 'Notification settings would open here.');
        break;
      case 'navigate':
        Alert.alert('Privacy', 'Privacy settings would open here.');
        break;
      case 'export':
        Alert.alert('Export Data', 'Data export feature would start here.');
        break;
      case 'support':
        Alert.alert('Help & Support', 'Support center would open here.');
        break;
      case 'info':
        Alert.alert('App Version', 'KyoolApp v1.0.0\nBuild 2024.09.15');
        break;
      default:
        break;
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: '#74B9FF' };
    if (bmi < 25) return { category: 'Normal', color: '#00B894' };
    if (bmi < 30) return { category: 'Overweight', color: '#FDCB6E' };
    return { category: 'Obese', color: '#E17055' };
  };

  const bmiInfo = getBMICategory(bmi);

  const renderOverview = () => (
    <View style={styles.tabContent}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </LinearGradient>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user?.name || 'User'}</Text>
          <Text style={styles.profileEmail}>{user?.email || 'user@example.com'}</Text>
          <Text style={styles.profileGoal}>{editForm.goal}</Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(true)}
        >
          <Ionicons name="pencil" size={20} color="#667eea" />
        </TouchableOpacity>
      </View>

      {/* Health Metrics */}
      <View style={styles.metricsCard}>
        <Text style={styles.cardTitle}>Health Metrics</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{height} cm</Text>
            <Text style={styles.metricLabel}>Height</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{weight} kg</Text>
            <Text style={styles.metricLabel}>Weight</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{age}</Text>
            <Text style={styles.metricLabel}>Age</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: bmiInfo.color }]}>
              {bmi.toFixed(1)}
            </Text>
            <Text style={styles.metricLabel}>BMI</Text>
          </View>
        </View>
        <View style={styles.bmiStatus}>
          <View style={[styles.bmiIndicator, { backgroundColor: bmiInfo.color }]} />
          <Text style={styles.bmiCategory}>{bmiInfo.category}</Text>
        </View>
        {tdee && (
          <View style={styles.calorieInfo}>
            <Text style={styles.calorieText}>
              Daily Calories: <Text style={styles.calorieValue}>{Math.round(tdee)}</Text>
            </Text>
          </View>
        )}
      </View>

      {/* Activity Stats */}
      <View style={styles.statsCard}>
        <Text style={styles.cardTitle}>Activity Stats</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Ionicons name="fitness" size={24} color="#4ECDC4" />
            <Text style={styles.statValue}>{userStats.totalWorkouts}</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="restaurant" size={24} color="#45B7D1" />
            <Text style={styles.statValue}>{userStats.totalRecipes}</Text>
            <Text style={styles.statLabel}>Recipes</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="water" size={24} color="#96CEB4" />
            <Text style={styles.statValue}>{userStats.waterGoalsAchieved}</Text>
            <Text style={styles.statLabel}>Water Goals</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="flame" size={24} color="#FF6B6B" />
            <Text style={styles.statValue}>{userStats.currentStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderAchievements = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Your Achievements</Text>
      <View style={styles.achievementsGrid}>
        {achievements.map((achievement) => (
          <View
            key={achievement.id}
            style={[
              styles.achievementCard,
              !achievement.achieved && styles.achievementCardLocked
            ]}
          >
            <View style={[
              styles.achievementIcon,
              { backgroundColor: achievement.achieved ? achievement.color : '#E0E0E0' }
            ]}>
              <Ionicons
                name={achievement.icon as any}
                size={24}
                color={achievement.achieved ? '#fff' : '#999'}
              />
            </View>
            <Text style={[
              styles.achievementTitle,
              !achievement.achieved && styles.achievementTitleLocked
            ]}>
              {achievement.title}
            </Text>
            {!achievement.achieved && (
              <View style={styles.lockedOverlay}>
                <Ionicons name="lock-closed" size={16} color="#999" />
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );

  const renderSettings = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Settings</Text>
      <View style={styles.settingsList}>
        {settings.map((setting, index) => (
          <TouchableOpacity
            key={index}
            style={styles.settingItem}
            onPress={() => handleSettingAction(setting)}
          >
            <View style={styles.settingInfo}>
              <Ionicons name={setting.icon as any} size={24} color="#667eea" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>{setting.title}</Text>
                {setting.value && (
                  <Text style={styles.settingValue}>{setting.value}</Text>
                )}
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEditModal = () => (
    <Modal
      visible={isEditing}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setIsEditing(false)}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Edit Profile</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.editForm}>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Name</Text>
            <TextInput
              style={styles.formInput}
              value={editForm.name}
              onChangeText={(text) => setEditForm({ ...editForm, name: text })}
              placeholder="Enter your name"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Email</Text>
            <TextInput
              style={styles.formInput}
              value={editForm.email}
              onChangeText={(text) => setEditForm({ ...editForm, email: text })}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.formRow}>
            <View style={styles.formGroupHalf}>
              <Text style={styles.formLabel}>Height (cm)</Text>
              <TextInput
                style={styles.formInput}
                value={editForm.height}
                onChangeText={(text) => setEditForm({ ...editForm, height: text })}
                placeholder="180"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.formGroupHalf}>
              <Text style={styles.formLabel}>Weight (kg)</Text>
              <TextInput
                style={styles.formInput}
                value={editForm.weight}
                onChangeText={(text) => setEditForm({ ...editForm, weight: text })}
                placeholder="75"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.formRow}>
            <View style={styles.formGroupHalf}>
              <Text style={styles.formLabel}>Age</Text>
              <TextInput
                style={styles.formInput}
                value={editForm.age}
                onChangeText={(text) => setEditForm({ ...editForm, age: text })}
                placeholder="35"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.formGroupHalf}>
              <Text style={styles.formLabel}>Gender</Text>
              <View style={styles.genderContainer}>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    editForm.gender === 'male' && styles.genderButtonActive
                  ]}
                  onPress={() => setEditForm({ ...editForm, gender: 'male' })}
                >
                  <Text style={[
                    styles.genderButtonText,
                    editForm.gender === 'male' && styles.genderButtonTextActive
                  ]}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    editForm.gender === 'female' && styles.genderButtonActive
                  ]}
                  onPress={() => setEditForm({ ...editForm, gender: 'female' })}
                >
                  <Text style={[
                    styles.genderButtonText,
                    editForm.gender === 'female' && styles.genderButtonTextActive
                  ]}>Female</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Goal</Text>
            <TextInput
              style={styles.formInput}
              value={editForm.goal}
              onChangeText={(text) => setEditForm({ ...editForm, goal: text })}
              placeholder="Weight Management"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#dda0dd', '#98d8c8']} style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <Text style={styles.headerSubtitle}>Manage your account and preferences</Text>
      </LinearGradient>

      {/* Tab Navigation */}
      <View style={styles.tabNavigation}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'overview' && styles.activeTabButton]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'overview' && styles.activeTabButtonText]}>
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'achievements' && styles.activeTabButton]}
          onPress={() => setActiveTab('achievements')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'achievements' && styles.activeTabButtonText]}>
            Achievements
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'settings' && styles.activeTabButton]}
          onPress={() => setActiveTab('settings')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'settings' && styles.activeTabButtonText]}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'achievements' && renderAchievements()}
        {activeTab === 'settings' && renderSettings()}
      </ScrollView>

      {renderEditModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  tabNavigation: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: '#dda0dd',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabButtonText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  tabContent: {
    paddingBottom: 20,
  },
  profileHeader: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  profileGoal: {
    fontSize: 12,
    color: '#667eea',
    marginTop: 4,
    fontWeight: '600',
  },
  editButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  metricsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  bmiStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  bmiIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  bmiCategory: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  calorieInfo: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  calorieText: {
    fontSize: 14,
    color: '#666',
  },
  calorieValue: {
    fontWeight: 'bold',
    color: '#667eea',
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    width: (width - 60) / 2,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  achievementCardLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  achievementTitleLocked: {
    color: '#999',
  },
  lockedOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  settingsList: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 15,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  settingValue: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cancelButton: {
    fontSize: 16,
    color: '#666',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  saveButton: {
    fontSize: 16,
    color: '#667eea',
    fontWeight: '600',
  },
  editForm: {
    flex: 1,
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  formGroupHalf: {
    flex: 1,
    marginHorizontal: 5,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  genderButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  genderButtonText: {
    fontSize: 16,
    color: '#666',
  },
  genderButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
});