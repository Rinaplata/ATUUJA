import React from "react";
import AppNavigator from "./src/navigation/AppNavigator.js";
import { AuthProvider } from "./src/context/AuthContext.js";
import { ScrollView } from "react-native";
import { ProgressProvider } from "./src/context/ProgressContext";
import { StoryProvider } from "./src/context/StoryContext";
import { QuizProvider } from "./src/context/QuizContext";
import { RewardProvider } from './src/context/RewardContext';


export default function App() {
  return (
    <AuthProvider>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ProgressProvider>
          <StoryProvider>
          <QuizProvider>
          <RewardProvider>
            <AppNavigator />
            </RewardProvider>
            </QuizProvider>
          </StoryProvider>
        </ProgressProvider>
      </ScrollView>
    </AuthProvider>
  );
}
