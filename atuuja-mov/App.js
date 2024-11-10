import React from 'react';
import AppNavigator from './src/navigation/AppNavigator.js';
import { AuthProvider } from './src/context/AuthContext.js';
import { ScrollView } from 'react-native';

export default function App() {
  return (
    <AuthProvider>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <AppNavigator />
      </ScrollView>
    </AuthProvider>

  );
}