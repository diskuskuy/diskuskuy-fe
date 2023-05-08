import axios from "axios";
import { toast } from "react-hot-toast";

export const editThread = async (threadId, requestBody) => {
  const headers = {
    Authorization: `Token ${localStorage.getItem("token")}`,
  };
  console.log(requestBody)
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BE_URL}/forum/Thread/${threadId}/`,
      requestBody,
      {
        headers: headers,
      }
    );

    const responseData = response;
    return responseData;
  } catch (error) {
    toast.error(error.message)
  }
};
