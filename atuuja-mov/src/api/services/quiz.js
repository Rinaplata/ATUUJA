import api from "../api";

export const GetQuizList = async () => {
  try {
    const response = await api.get(`Quiz/list`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener los quiz",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};