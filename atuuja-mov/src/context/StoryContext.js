import React, { createContext, useContext, useState, useEffect } from "react";
import { getStories } from "../api/services/stories";

const StoryContext = createContext();

export const StoryProvider = ({ children }) => {
  const [stories, setStories] = useState([]);
  const [loadingStory, setLoadingStory] = useState(false);
  const [errorStory, setErrorStory] = useState(null);


  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoadingStory(true);
        const fetchedStories = await getStories();
        setStories(fetchedStories);
      } catch (error) {
        setErrorStory(error.message || "Error al cargar relatos.");
      } finally {
        setLoadingStory(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <StoryContext.Provider value={{ stories, loadingStory, errorStory }}>
      {children}
    </StoryContext.Provider>
  );
};

export const useStories = () => useContext(StoryContext);