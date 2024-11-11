import React from 'react';
import AppNavigator from './src/navigation/AppNavigator.js';
import { AuthProvider } from './src/context/AuthContext.js';
import { ScrollView } from 'react-native';
import { ProgressProvider } from './src/context/ProgressContext';

export default function App() {
  return (
    <AuthProvider>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ProgressProvider>
        <AppNavigator />
        </ProgressProvider>
      </ScrollView>
    </AuthProvider>

  );
}