import React, { createContext, useContext, useState } from "react";
import { getUserProgress } from "../api/services/users";

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserProgress = async (userId) => {
    try {
      setLoading(true);
      console.log("Fetching user progress for:", userId);
      const data = await getUserProgress(userId);
      console.log("Fetched progress data:", data); 
      setProgress(data);
    } catch (err) {
      console.error("Error al obtener el progreso del usuario:", err.message);
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
        loading,
        error,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);

