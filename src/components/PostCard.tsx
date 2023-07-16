import { Post } from "../pages/Home";
import { useEffect, useState } from "react";
import { FaRegComment, FaShare } from "react-icons/fa";
import { TbNeedleThread } from "react-icons/tb";
import {
  BiUpvote,
  BiDownvote,
  BiSolidUpvote,
  BiSolidDownvote,
} from "react-icons/bi";
import axios from "axios";
import { downloadBlob } from "../utils/azureStorage";
import { InfinitySpin } from "react-loader-spinner";
import { nanoid } from "nanoid";
import React from "react";

interface PostcardProps {
  postDetails: Post;
  handleCreateThread(threads: number[], postId: number): void;
}

const PostCard = ({ postDetails, handleCreateThread }: PostcardProps) => {
  const [post, setPost] = useState<Post>(postDetails);
  const [currentReputation, setCurrentReputation] = useState<number>(0);
  const [voteType, setVoteType] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [jwt, setJwt] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [lines, setLines] = useState<string[]>([]);

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

    if (postDetails) {
      const { id, content, reputation, media } = postDetails;
      setPost(postDetails);
      setCurrentReputation(reputation);

      const fetchImages = async (media: string[]): Promise<void> => {
        const fetchedImages: string[] = [];
        const filenames: string[] = media;
        for (const filename of filenames) {
          const url: string | undefined = await downloadBlob(filename);
          if (url) {
            fetchedImages.push(url);
          }
        }
        setImages(fetchedImages);
      };
      if (media) {
        void fetchImages(media);
      }

      const token: string | null = localStorage.getItem("jwt");
      if (token) {
        setJwt(token);
        if (id && jwt) {
          setIsLoading(false);
          void getVoteState(id, jwt);
        }
      }

      const linesArr: string[] = content.split("\n");
      setLines(linesArr);
    }
  }, [jwt, postDetails]);

  const handleVote = async (type: string) => {
    try {
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
        { postId: post.id, type },
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

  if (isLoading) {
    return (
      <div>
        <InfinitySpin width="200" color="#4fa94d" />
      </div>
    );
  }

  return voteType ? (
    <div className="border-2 w-[100%] bg-gray-200 mb-8 rounded">
      <div className="content-body p-2 bg-sublime_blue rounded-t text-sublime_yite">
        {images && (
          <div>
            <p className="text-xl">
              {lines.map((line) => {
                return (
                  <React.Fragment key={nanoid()}>
                    <span>{line}</span>
                    <br />
                  </React.Fragment>
                );
              })}
            </p>
            {images.map((image) => {
              return (
                <img
                  key={image}
                  src={image}
                  className=" mt-2 max-w-full rounded-t"
                />
              );
            })}
          </div>
        )}
        {/*         {images ? (
          <div>
            <p>{content}</p>
            {images.map((image) => {
              return <img key={image} src={image} />;
            })}
          </div>
        ) : (
          <p>{content}</p>
        )} */}
      </div>

      <div className="reputation-bar h-2 bg-red-300"></div>

      <div className="flex items-center justify-between p-2 text-xl">
        <div className="flex items-center">
          <p className="text-lg">{post.full_name}</p>
          <p className="text-sm ml-2 cursor-pointer">@{post.username}</p>
        </div>

        <div className="flex w-[50%] justify-around">
          <div className="flex items-center justify-around">
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

          <div className="flex items-center">
            <FaRegComment />
          </div>

          <div
            className="thread flex items-center cursor-pointer"
            onClick={() => handleCreateThread(post.threads, post.id)}
          >
            <TbNeedleThread />
            <p className="text-sm ml-2">
              {post.threads ? post.threads.length : ""}
            </p>
          </div>

          <div className="flex items-center">
            <FaShare />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <InfinitySpin width="200" color="#4fa94d" />
  );
};

export default PostCard;
