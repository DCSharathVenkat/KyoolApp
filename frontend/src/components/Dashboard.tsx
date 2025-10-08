// AUTO-GENERATED-TO-NATIVE: This file was created by tools/convert-web-to-native.js
// Manual fixes likely required: styles, icons, routing, third-party web-only APIs
import React from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { ActivityFeed } from './ActivityFeed';
import { ViewAllFriends } from './ViewAllFriends';
import { AddFriends } from './AddFriends';

interface DashboardProps {
  user: any;
  onStartWorkout?: (workout: any) => void;
}

export function Dashboard({ user, onStartWorkout }: DashboardProps) {
  const [activeView, setActiveView] = useState<'dashboard' | 'friends' | 'addFriends'>('dashboard');

  const handleViewAllFriends = () => {
    setActiveView('friends');
  };

  const handleAddFriends = () => {
    setActiveView('addFriends');
  };

  const handleBackToDashboard = () => {
    setActiveView('dashboard');
  };

  if (activeView === 'friends') {
    return (
      <ViewAllFriends 
        onBack={handleBackToDashboard} 
        onAddFriends={handleAddFriends}
      />
    );
  }

  if (activeView === 'addFriends') {
    return (
      <AddFriends 
        onBack={() => setActiveView('friends')}
      />
    );
  }

  return <ActivityFeed user={user} onViewAllFriends={handleViewAllFriends} onStartWorkout={onStartWorkout} />;
}