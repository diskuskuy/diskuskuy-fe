import axios from "axios";
import firebase from "@/utils/firebase";
import { toast } from "react-hot-toast";

export const createThread = async (requestBody) => {
  const headers = {
    Authorization: `Token ${localStorage.getItem("token")}`,
  };
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BE_URL}/forum/Thread/`,
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

export const createReferenceFile = async (file, threadId) => {
  const upload = firebase.storage().ref("/").child(file.name).put(file);

  upload.then((res) => {
    upload.snapshot.ref.getDownloadURL().then((url) => {
      const requestBody = {
        title: res?._delegate.metadata.name,
        url: url,
        thread: threadId,
      };
      axios
        .post(
          `${process.env.NEXT_PUBLIC_BE_URL}/forum/ReferenceFile/`,
          requestBody,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          setTimeout(() => {
            window.location.href = `/forum/${threadId}`;
            // router.push(`/forum/${threadId}`);
          }, 10000);
        })
        .catch((error) => {
          toast.error(error.message)
        });
    });
  });
};
