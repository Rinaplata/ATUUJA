import api from "../api";

export const getUsers = async (userId) => {
  try {
    const response = await api.get(`Auth/get/${userId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error en obtener los usuarios:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const getUserProgress = async (userId) => {
  try {
    const response = await api.get(`Auth/getUserProgress/${userId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error en la solicitud del progreso del usuario.");
    }
  } catch (error) {
    console.error("Error en el registro:", error.message);
    throw error;
  }
};

export const GetAuthList = async () => {
  try {
    const response = await api.get(`Auth/list`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener la lista de usuario",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
