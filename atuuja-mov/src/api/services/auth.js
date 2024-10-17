import api from "../api";

export const login = async (credentials) => {
  try {
    const response = await api.post("Auth/login", credentials);
    console.log("Respuesta del backend:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error en el login",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
