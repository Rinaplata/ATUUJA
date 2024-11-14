import api from "../api";

export const getStories = async () => {
  try {
    const response = await api.get(`Reward/list`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener los [remios]:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};