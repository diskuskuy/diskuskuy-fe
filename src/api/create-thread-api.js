import axios from "axios";

export const createThread = async (requestBody) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/forum/Thread/`,
      requestBody
    );

    const responseData = response;
    return responseData;
  } catch (error) {
    // toast.error(error.message)
    console.log(error.message);
  }
};
