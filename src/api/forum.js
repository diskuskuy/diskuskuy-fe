export const fetchThreadDataById = async (threadId) => {
    try {
      const response = await fetch(
        'http://localhost:8000/forum/Thread/' + threadId,
        {
          method: 'GET'
        }
      );

      if (!response.ok) {
        const responseError = await response.json()
        const message = `${responseError.errors.error_message}`
        throw new Error(message)
      };
      const responseData = await response.json()
      return responseData;
    } catch (error) {
      // toast.error(error.message)
      console.log(error.message)
    }
  }