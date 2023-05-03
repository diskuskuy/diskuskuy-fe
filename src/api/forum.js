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

export const fetchInitialPostDataById = async () => {
  try {
    const path = location.pathname;
    const pathArray = path.split('/');
    const initialPostId = pathArray[pathArray.length - 1];
    const response = await fetch(
      'http://localhost:8000/post/initialpost/' + initialPostId,
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

export const fetchReplyPostDataById = async (replyPostId) => {
  try {
    const response = await fetch(
      'http://localhost:8000/post/replypost/' + replyPostId,
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
