import api from "../api";
import { jwtDecode } from "jwt-decode";

export const login = async (credentials) => {
  try {
    const response = await api.post("Auth/login", credentials);
    const { token } = response.data;

    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sid;
      return { token, userId };
    } else {
      throw new Error("Token no encontrado en la respuesta");
    }
  } catch (error) {
    console.error(
      "Error en el login",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const register = async (credentials) => {
  try {
    const response = await api.post("Auth/register", credentials);
    return response.status === 200;
  } catch (error) {
    console.error(
      "Error en el registro",
      error.response ? error.response.data : error.message
    );
    throw error;
  }

};


