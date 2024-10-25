import React, { createContext, useState, useContext, useMemo } from "react";
import * as AuthService from "../api/services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Estado de carga


/*   const login = async (email, password) => {
    try {
      setLoading(true)
      const nextUser = await AuthService.login({ email, password })
      setUser(nextUser);
    } catch (nextError) {
      setError(nextError.message)
    } finally {
      setLoading(false)
    }
  }; */

  const login = async (email, password) => {
    try {
      setLoading(true);
      const nextUser = await AuthService.login({ email, password });
      console.log("Respuesta del servidor:", nextUser); // Depuración

      
      if (nextUser.token) {  // Asegúrate de que 'token' existe en los datos recibidos
        setUser(nextUser);
        return true;  // Devuelve true si la autenticación fue exitosa
      } else {
        setError("Token no recibido");
        return false; // Devuelve false si no hay token
      }
    } catch (nextError) {
      setError(nextError.message);
      return false;  // Devuelve false en caso de error
    } finally {
      setLoading(false);
    }
  };
  

  const logout = () => {
    setUser(null);
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const registeredUser = await AuthService.register(userData);
      setUser(registeredUser);
    } catch (nextError) {
      setError(nextError.message)
    } finally {
      setLoading(false);
    }
  };

  const auth = useMemo(() => ({ user, login, error, loading, register, logout }), [user, loading, error, login, register, logout])

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
