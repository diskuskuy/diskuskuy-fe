export const fetchThreadDataById = async () => {
    try {
        const path = location.pathname;
        const pathArray = path.split('/');
        const threadId = pathArray[pathArray.length - 1];
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