import React, { createContext, useState, useContext } from "react";
import {loginService, Register } from "../api/services/authService";

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

  const registerUser = async (userData) => {
    try {
      const registeredUser = await Register(userData);
      setUser(registeredUser);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error en el registro");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, error, registerUser,logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

