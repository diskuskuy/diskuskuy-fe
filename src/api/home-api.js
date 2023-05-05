export const fetchWeeksData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_URL}/forum/Week/`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
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

export const fetchWeekDataById = async (weekId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_URL}/forum/Week/${weekId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
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

export const createWeek = async (nameRequest) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_URL}/forum/Week/`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameRequest,
        }),
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