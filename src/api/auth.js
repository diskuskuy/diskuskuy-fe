export const login = async (requestBody) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
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
      localStorage.setItem('token', responseData.token)
      localStorage.setItem('userId', responseData.user_id)
      localStorage.setItem('role', responseData.role);
      return responseData;
    } catch (error) {
      // toast.error(error.message)
      console.log(error.message);
    }
  };

  export const fetchProfileData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BE_URL}/auth/profile`,
        {
          method: "GET",
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
      // toast.error(error.message)
      console.log(error.message);
    }
  };
