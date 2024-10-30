import React, { createContext, useState, useContext, useMemo } from "react";
import * as AuthService from "../api/services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const nextUser = await AuthService.login({ email, password });

      if (nextUser.token) {
        setUser(nextUser);
        return true;
      } else {
        setError("Token no recibido");
        setTimeout(() => setError(""), 3000);
        return false;
      }
    } catch (nextError) {
      setError(nextError.message);
      setTimeout(() => setError(""), 3000);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    AsyncStorage.removeItem("Token");
    setUser(null);
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await AuthService.register(userData);
        if (response) {
        setUser({
          id: userData.id,
          username: userData.username,
          email: userData.email,
          edad: userData.edad,
          cuidad: userData.cuidad,
          tipoDocumento: userData.tipoDocumento,
          numeroDocumento: userData.numeroDocumento,
        });
        return true;
      } else {
        setError("El registro no fue exitoso. Inténtalo nuevamente.");
        setTimeout(() => setError(""), 3000);
        return false;
      }
    } catch (nextError) {
      setError(nextError.message);
      setTimeout(() => setError(""), 3000);
      return false;
    } finally {
      setLoading(false);
    }
  };
  

  const auth = useMemo(
    () => ({ user, login, error, loading, register, logout }),
    [user, loading, error, login, register, logout]
  );

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
