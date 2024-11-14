import api from "../api";

export const getStories = async () => {
  try {
    const response = await api.get(`Stories/list`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener los relatos:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};