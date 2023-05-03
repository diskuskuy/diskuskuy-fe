import axios from "axios";

export const createThread = async (requestBody) => {
  const headers = {
    "Authorization": `Token ${localStorage.getItem("token")}`,
  }
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BE_URL}/forum/Thread/`,
      requestBody, {
        headers : headers
      }
    );

    const responseData = response;
    return responseData;
  } catch (error) {
    // toast.error(error.message)
    console.log(error.message);
  }
};
