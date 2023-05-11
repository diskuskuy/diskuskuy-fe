import { CircularProgress } from "@mui/material";
import { getCookie, setCookies } from "cookies-next";
import { toast } from "react-hot-toast";

export const login = async (requestBody) => {
  try {
    toast("Mengirim request...", {
      icon: <CircularProgress fontSize="small" />,
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_URL}/auth/login/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const responseData = await response.json();
    // localStorage.setItem("token", responseData.token);
    // localStorage.setItem("userId", responseData.user_id);
    // localStorage.setItem("role", responseData.role);
    // localStorage.setItem("photoUrl", responseData.photo_url);
    setCookies("auth", JSON.stringify(responseData));
    toast.dismiss();
    toast.success("Login berhasil");
    window.location.href = `/`;
    return responseData;
  } catch (error) {
    toast.dismiss();
    toast.error(error.message);
  }
};

export const fetchProfileData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_URL}/auth/profile/`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${JSON.parse(getCookie("auth"))?.token}`,
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
    toast.error(error.message);
  }
};
