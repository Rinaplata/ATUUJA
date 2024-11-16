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

export const CreateProgress = async (payload) => {
  try {
    const response = await api.post(`Auth/Progress/saveProgress`, payload);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error al crear un progress.");
    }
  } catch (error) {
    console.error("Error al crear el progress:", error.message);
    throw error;
  }
};

export const PutUserProgress = async (progressId, payload) => {
  try {
    const response = await api.put(`Progress/updateProgress/${progressId}`, payload);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error en la actualizacion del progress.");
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

export const useUpdateUser = async (Id, userData) => {
  try {
    const data = await api.put(`Auth/update/${Id}/`, userData);
    return data;
  } catch (error) {
    console.error(
      "Error al actualizar la información del usuario:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
