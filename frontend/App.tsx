import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainApp from './src/App';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainApp />
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}