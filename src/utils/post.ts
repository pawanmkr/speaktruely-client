import axios, { AxiosResponse } from "axios";
import { Comment } from "../interface";

export const fetchComments = async (
  postId: number,
  jwt: string
): Promise<Comment[] | undefined> => {
  try {
    const res: AxiosResponse<Comment[]> = await axios.get(
      `${import.meta.env.VITE_API_V1_URL as string}/post/comments`,
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

export const postComment = async (
  comment: string,
  postId: number,
  jwt: string
): Promise<Comment | undefined> => {
  try {
    const res: AxiosResponse<Comment> = await axios.post(
      `${import.meta.env.VITE_API_V1_URL as string}/post/comment`,
      {
        comment: comment,
        post_id: postId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
