import { fetchData, postData, updateData, deleteData } from "../../api";

const getListQuiz = async () => {
  try {
    const data = await fetchData("Quiz/list");
    return data;
  } catch (error) {
    console.error(
      "Error obtener los cursos",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const postCreateQuiz = async (bodyData) => {
  try {
    const data = await postData("Quiz/create", bodyData);
    return data;
  } catch (error) {
    console.error(
      "Error al crear quiz",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const updateQuiz = async (quizId, bodyData) => {
  try {
    const data = await updateData(`Quiz/update/${quizId}/`, bodyData);
    return data;
  } catch (error) {
    console.error(
      "Error al actualizar el quiz:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const deleteQuiz = async (quizId) => {
  try {
    const data = await deleteData(`Quiz/delete/${quizId}/`);
    return data;
  } catch (error) {
    console.error(
      "Error al eliminar el quiz",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export { getListQuiz, postCreateQuiz, updateQuiz, deleteQuiz };
