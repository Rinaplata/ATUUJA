import React, { createContext, useContext, useState } from "react";
import * as UserService from "../api/services/users";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async (id) => {
    try {
      const userData = await UserService.getUserById(id);
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <UsersContext.Provider value={{ user, fetchUser }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
