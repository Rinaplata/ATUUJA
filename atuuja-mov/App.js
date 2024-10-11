import React from 'react';
import AppNavigator from './src/navigation/AppNavigator.js';
import { AuthProvider } from './src/context/AuthContext.js';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}