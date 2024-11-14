import React, { createContext, useContext, useState, useEffect } from "react";
import { GetQuizList } from "../api/services/quiz";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const quizList = await GetQuizList();
      setQuizzes(quizList);
    } catch (err) {
      setError(
        err.response ? err.response.data : "Error al obtener los quizzes"
      );
      console.error("Error fetching quizzes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <QuizContext.Provider value={{ quizzes, fetchQuizzes, loading, error }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizzes = () => useContext(QuizContext);
