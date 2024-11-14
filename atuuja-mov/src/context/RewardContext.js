import React, { createContext, useState, useEffect, useContext } from "react";
import { getStories } from "../api/services/reward";

const RewardContext = createContext();

export const RewardProvider = ({ children }) => {
  const [rewards, setRewards] = useState([]);
  const [loadingRewards, setLoadingRewards] = useState(false);
  const [errorRewards, setErrorRewards] = useState(null);

  useEffect(() => {
    const fetchRewards = async () => {
      setLoadingRewards(true);
      setErrorRewards(null);
      try {
        const fetchedRewards = await getStories();
        setRewards(fetchedRewards);
      } catch (error) {
        setErrorRewards(
          error.response ? error.response.data : "Error fetching rewards."
        );
      } finally {
        setLoadingRewards(false);
      }
    };

    fetchRewards();
  }, []);

  return (
    <RewardContext.Provider value={{ rewards, loadingRewards, errorRewards }}>
      {children}
    </RewardContext.Provider>
  );
};

export const useRewards = () => useContext(RewardContext);

