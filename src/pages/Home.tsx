import React, { useEffect, useState } from "react";
import Feed from "../components/Feed";
import axios, { AxiosResponse } from "axios";
import { useLocation } from "react-router-dom";

export type Post = {
  id: number;
  textContent: string;
  images?: {
    url: string;
  }[];
  date: string;
  postedBy: {
    username: string;
    dp: string;
  };
  reputation: number;
  comments: {
    comment: string;
    createdAt: string;
  }[];
  share?: string;
};

interface UserProps {
  fullName: string;
  username: string;
  email: string;
}

const Home = () => {
  const location = useLocation();
  const user = location.state as { user: UserProps };
  //const { fullName, username, email } = user.user;
  const [posts, setPosts] = useState<Post[] | undefined>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response: AxiosResponse<Post[]> = await axios.get(
          `${import.meta.env.VITE_API_V1_URL as string}/post`
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    void fetchPosts();
  }, []);

  useEffect(() => {
    if (posts) {
      console.log(posts);
    }
  }, [posts]);

  return <>{posts && <Feed posts={posts} />}</>;
};

export default Home;
