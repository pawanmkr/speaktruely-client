import axios, { AxiosResponse } from "axios";
import { Post as ThreadInterface } from "../interface";

const jwt: string | null = localStorage.getItem("jwt");
if (!jwt) throw new Error("Jwt not found");

export const fetchThreads = async (postId: number) => {
  try {
    const res: AxiosResponse<ThreadInterface[]> = await axios.get(
      `${import.meta.env.VITE_API_V1_URL as string}/post/threads`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
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
