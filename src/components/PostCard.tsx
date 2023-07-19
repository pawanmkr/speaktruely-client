import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { fetchImages, getVoteState } from "../utils/index";
import { Post, PostOptionProps, PostcardProps } from "../interface";
import PostOptions from "./post/PostOptions";
import PostContent from "./post/PostContent";
import Comments from "./post/Comments";

export enum VoteType {
  upvote,
  "UPVOTE",
  downvote,
  "DOWNVOTE",
  neutral,
  "NEUTRAL",
}

const PostCard = ({ postDetails, handleCreateThread }: PostcardProps) => {
  const [post, setPost] = useState<Post>(postDetails);
  const [currentReputation, setCurrentReputation] = useState<number>(0);
  const [voteType, setVoteType] = useState<VoteType>(VoteType.neutral);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [jwt, setJwt] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [lines, setLines] = useState<string[]>([]);
  const [showComments, setShowComments] = useState<boolean>(false);

  useEffect(() => {
    if (postDetails) {
      const loadPost = async (): Promise<void> => {
        const { id, content, reputation, media } = postDetails;
        setPost(postDetails);
        setCurrentReputation(reputation);
        if (media) {
          const images: string[] | undefined = await fetchImages(media);
          images && setImages(images);
        }
        const token: string | null = localStorage.getItem("jwt");
        if (token) {
          setJwt(token);
          if (id && jwt) {
            const type: string | undefined = await getVoteState(id, jwt);
            if (type === "UPVOTE") {
              setVoteType(VoteType.upvote);
            } else if (type === "DOWNVOTE") {
              setVoteType(VoteType.downvote);
            }
            setIsLoading(false);
          }
        }
        const linesArr: string[] = content.split("\n");
        setLines(linesArr);
      };
      void loadPost();
    }
  }, [jwt, postDetails]);

  const postOptionProps: PostOptionProps = {
    post,
    voteType,
    jwt,
    currentReputation,
    showComments,
    setVoteType,
    setCurrentReputation,
    setShowComments,
    handleCreateThread,
  };

  if (isLoading) {
    return (
      <div>
        <InfinitySpin width="200" color="#4fa94d" />
      </div>
    );
  }

  return postOptionProps ? (
    <div className="border-4 w-[70%] bg-gray-200 mb-8 rounded">
      <PostContent lines={lines} images={images} />

      <div className="reputation-bar h-2 bg-red-300"></div>

      <PostOptions {...postOptionProps} />
      {showComments && <Comments postId={post.id} jwt={jwt} />}
    </div>
  ) : (
    <InfinitySpin width="500" color="#4fa94d" />
  );
};

export default PostCard;
