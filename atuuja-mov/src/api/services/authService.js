import api from "../api";

export const login = async (credentials) => {
  try {
    const response = await fetch("http://localhost:5220/api/Auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json()
    return data;
  } catch (error) {
    // console.error(
    //   "Error en el login",
    //   error.response ? error.response.data : error.message
    // );
    throw error;
  }
};

export const register = async (credentials) => {
  try {
    const response = await api.post("Auth/register", credentials);
    return response.data;
  } catch (error) {
    console.error(
      "Error en el registro",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
