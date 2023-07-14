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
import { downloadBlob } from "../utils/azureStorage";
import { InfinitySpin } from "react-loader-spinner";

const PostCard = ({
  id,
  content,
  full_name,
  username,
  reputation,
  media,
}: Post) => {
  const [currentReputation, setCurrentReputation] =
    useState<number>(reputation);
  const [voteType, setVoteType] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [jwt, setJwt] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [fullName, setFullName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

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

    const fetchImages = async (media: string): Promise<void> => {
      const fetchedImages: string[] = [];
      const filenames: string[] = media.split(",");
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

    if (full_name && username) {
      setFullName(full_name);
      setUserName(username);
    }
  }, [full_name, id, jwt, media, username]);

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
            <p>{content}</p>
            {images.map((image) => {
              return <img key={image} src={image} />;
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
          <p className="text-lg">{fullName}</p>
          <p className="text-sm ml-2">@{userName}</p>
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
  ) : (
    <InfinitySpin width="200" color="#4fa94d" />
  );
};

export default PostCard;
