import { Post } from "../pages/Home";
import { useEffect, useState } from "react";
import { FaRegComment, FaShare } from "react-icons/fa";
import {
  BiUpvote,
  BiDownvote,
  BiSolidUpvote,
  BiSolidDownvote,
} from "react-icons/bi";
import axios from "axios";

const PostCard = ({ id, content, full_name, username, reputation }: Post) => {
  const [currentReputation, setCurrentReputation] =
    useState<number>(reputation);
  const [voteType, setVoteType] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleVote = async (type: string) => {
    try {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        console.log("User not logged in");
        return;
      }

      // Check Vote Input type and proceed accordingly
      if (voteType === type) {
        setVoteType("NEUTRAL");
        if (type === "UPVOTE") {
          setCurrentReputation(Number(currentReputation) - 1);
        } else if (type === "DOWNVOTE") {
          setCurrentReputation(Number(currentReputation) + 1);
        }
      } else if (voteType === "NEUTRAL") {
        setVoteType(type);
        if (type === "UPVOTE") {
          setCurrentReputation(Number(currentReputation) + 1);
        } else if (type === "DOWNVOTE") {
          setCurrentReputation(Number(currentReputation) - 1);
        }
      } else {
        setVoteType(type);
        if (type === "UPVOTE") {
          setCurrentReputation(Number(currentReputation) + 2);
        } else if (type === "DOWNVOTE") {
          setCurrentReputation(Number(currentReputation) - 2);
        }
      }

      await axios.post(
        `${import.meta.env.VITE_API_V1_URL as string}/post/vote`,
        { postId: id, type },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getVoteState = async (id: number, jwt: string) => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_V1_URL as string}/post/vote/state`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
            params: {
              postId: id,
            },
          }
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        setVoteType(res.data.type as string);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      const jwt: string | null = localStorage.getItem("jwt");
      if (!jwt) {
        console.log("User not logged in");
        setIsLoading(false);
        return;
      }
      void getVoteState(id, jwt);
    }
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    voteType && (
      <div className="border-2 w-[500px] bg-gray-200 m-4 rounded">
        <div className="p-2 bg-sublime_blue rounded-t text-sublime_yite">
          <p>{content}</p>
        </div>

        <div className="reputation-bar h-2 bg-red-300"></div>

        <div className="flex items-center justify-between p-2 text-xl">
          <div className="flex items-center">
            <p className="text-lg">{full_name}</p>
            <p className="text-sm ml-2">@{username}</p>
          </div>

          <div className="flex">
            <div className="flex items-center">
              <div
                className={`up cursor-pointer ${
                  voteType === "UPVOTE" ? "text-blue-500" : ""
                }`}
                onClick={() => handleVote("UPVOTE")}
              >
                {voteType === "UPVOTE" ? <BiSolidUpvote /> : <BiUpvote />}
              </div>
              <div className="reputation-count">
                <p className="mx-2 text-sm">{currentReputation}</p>
              </div>
              <div
                className={`down cursor-pointer ${
                  voteType === "DOWNVOTE" ? "text-red-500" : ""
                }`}
                onClick={() => handleVote("DOWNVOTE")}
              >
                {voteType === "DOWNVOTE" ? <BiSolidDownvote /> : <BiDownvote />}
              </div>
            </div>

            <div className="flex items-center mx-6">
              <FaRegComment />
            </div>

            <div className="flex items-center">
              <FaShare />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PostCard;
