import axios, { AxiosResponse } from "axios";
import { Post as ThreadInterface } from "../interface";

export const fetchThreads = async (postId: number) => {
  try {
    const res: AxiosResponse<ThreadInterface[]> = await axios.get(
      `${import.meta.env.VITE_API_V1_URL as string}/post/threads`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          post_id: postId,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
