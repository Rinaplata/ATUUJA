import React, { createContext, useContext, useState } from "react";
import { getUsers, getUserProgress, UpdateUser } from "../api/services/users";

const UpdateUserContext = createContext();

export const UpdateUserProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUserById = async (userId) => {
    try {
      setLoading(true);
      const user = await getUsers(userId);
      return user;
    } catch (err) {
      setError(err.message || "Error fetching user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId, userData) => {
    try {
      setLoading(true);
      await UpdateUser(userId, userData);
      return true;
    } catch (err) {
      setError(err.message || "Error updating user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <UpdateUserContext.Provider value={{ getUserById, updateUser, loading, error }}>
      {children}
    </UpdateUserContext.Provider>
  );
};

export const useUpdateUser = () => useContext(UpdateUserContext);
