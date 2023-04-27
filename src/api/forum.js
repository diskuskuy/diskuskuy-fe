import axios from 'axios'

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

export const fetchReplyDataById = async (threadId) => {
  try {
    const response = await fetch(
      'http://localhost:8000/post/initialpost/' + threadId,
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

export const fetchSummary = async () => {
  try {
    const response = await fetch(
      'http://localhost:8000/forum/Summary',
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

export const addReplyDataById = async (_response) => {
  try {
    const response = await axios.post(
      'http://localhost:8000/forum/Summary/', _response
    );

    if (!response.ok) {
      const responseError = await response.json()
      const message = `${response.response.errors.error_message}`
      throw new Error(message)
    };
    return response;
  } catch (error) {
    // toast.error(error.message)
    console.log(error.message)
  }
}

export const fetchNestedReply = async () => {
  try {
    const response = await fetch(
      'http://localhost:8000/post/nestedreplypost/',
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
