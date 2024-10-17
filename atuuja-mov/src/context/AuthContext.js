import React, { createContext, useState, useContext } from "react";
import {loginService } from "../api/services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      const userData = await loginService({ email, password });
      setUser(userData);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error en el inicio de sesión");
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

