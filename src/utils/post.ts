import axios, { AxiosResponse } from "axios";
import { Comment, Post } from "../interface";

const jwt: string | null = localStorage.getItem("jwt");

export const fetchPosts = async (): Promise<Post[] | undefined> => {
  try {
    const response: AxiosResponse<Post[]> = await axios.get(
      `${import.meta.env.VITE_API_V1_URL as string}/post`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data.length > 0) {
      const filteredPost: Post[] = [];
      response.data.forEach((post: Post) => {
        if (post.thread === null) filteredPost.push(post);
      });
      return filteredPost;
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const fetchProfilePosts = async (
  userId: number
): Promise<Post[] | undefined> => {
  try {
    const response: AxiosResponse<Post[] | undefined> = await axios.get(
      `${import.meta.env.VITE_API_V1_URL as string}/profile/post`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          user_id: userId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching posts for user", error);
  }
};

export const publishPost = async (
  selectedFiles: File[],
  draftContent: string,
  thread?: number
) => {
  if (!jwt) throw new Error("Jwt not found");
  const formData = new FormData();
  for (const file of selectedFiles) {
    formData.append("files", file);
  }
  formData.append("content", draftContent);
  if (thread) {
    formData.append("thread", thread.toString());
  }
  try {
    const res: AxiosResponse<Post> = await axios.post(
      `${import.meta.env.VITE_API_V1_URL as string}/post`,
      formData,
      {
        onUploadProgress(progressEvent) {
          if (progressEvent.total && progressEvent.progress) {
            const percentage: number = Math.round(
              (progressEvent.progress / progressEvent.total) * 100
            );
            console.log(progressEvent.progress);
            console.log(percentage);
          }
        },
        headers: {
          "Content-Type": "multipar/form-data",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (
  postId: number
): Promise<number | undefined> => {
  if (!jwt) throw new Error("Jwt not found");
  try {
    const res: AxiosResponse = await axios.delete(
      `${import.meta.env.VITE_API_V1_URL as string}/post`,
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
    return res.status;
  } catch (error) {
    console.log(error);
  }
};

export const fetchComments = async (
  postId: number
): Promise<Comment[] | undefined> => {
  try {
    const res: AxiosResponse<Comment[]> = await axios.get(
      `${import.meta.env.VITE_API_V1_URL as string}/post/comments`,
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

export const postComment = async (
  comment: string,
  postId: number
): Promise<Comment | undefined> => {
  if (!jwt) throw new Error("Jwt not found");
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
