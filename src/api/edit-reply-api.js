import { toast } from "react-hot-toast";

export const editPost = async (requestBody, id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BE_URL}/post/post/${id}/`,
        {
          method: "PUT",
          headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: requestBody,
        }
      );
  
      if (!response.ok) {
        const responseError = await response.json();
        const message = `${responseError.errors.error_message}`;
        throw new Error(message);
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      toast.error(error.message)
    }
  };

  
  export const fetchPost = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BE_URL}/post/post/${id}/`,
        {
          method: "GET",
          headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
          }
        }
      );
  
      if (!response.ok) {
        const responseError = await response.json();
        const message = `${responseError.errors.error_message}`;
        throw new Error(message);
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      toast.error(error.message)
    }
  };

  