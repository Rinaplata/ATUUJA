import React, { createContext, useContext, useState } from "react";
import { GetAuthList } from "../api/services/users";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const userList = await GetAuthList();
      setUsers(userList);
    } catch (error) {
      setError(
        error.response
          ? error.response.data
          : "Error al obtener la lista de usuarios"
      );
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UsersContext.Provider value={{ users, fetchUsers, loading, error }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
