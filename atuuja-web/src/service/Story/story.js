import { fetchData, postData} from "../../api";


const getStorieslist = async () => {
    try {
      const data = await fetchData("Stories/list");
      return data;
    } catch (error) {
      console.error(
        "Error obtener la lista de relatos",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

const postCreateStories = async (bodyData) => {
  try {
    const data = await postData("Stories/create", bodyData);
    return data;
  } catch (error) {
    console.error(
      "Error al crear relatos",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export { getStorieslist, postCreateStories };
