import api from "../api";

export const login = async (credentials) => {
  try {
    const response = await api.post("Auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error(
      "Error en el login",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const Register = async (credentials) => {
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
