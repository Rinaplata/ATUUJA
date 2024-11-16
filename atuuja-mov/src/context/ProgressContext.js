import React, { createContext, useContext, useState } from "react";
import { getUserProgress, CreateProgress, PutUserProgress } from "../api/services/users";

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


 const createUserProgress = async(payload) => {
  try {
    setLoading(true);
    const data = await CreateProgress(payload);
    setProgress(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

const updateUserProgress = async(progressId, payload) => {
  try {
    setLoading(true);
    const data = await PutUserProgress(progressId, payload);
    setProgress(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  const fetchUserProgress = async (userId) => {
    try {
      setLoading(true);
      const data = await getUserProgress(userId);
      setProgress(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        fetchUserProgress,
        createUserProgress,
        updateUserProgress,
        loading,
        error,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);

