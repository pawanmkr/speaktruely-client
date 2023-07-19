import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { fetchImages, getVoteState } from "../utils/index";
import { Post, PostOptionProps, PostcardProps } from "../interface";
import PostOptions from "./post/PostOptions";
import PostContent from "./post/PostContent";
import Comments from "./post/Comments";
import Loading from "./Loading";

const PostCard = ({ postDetails, handleCreateThread }: PostcardProps) => {
  const [post, setPost] = useState<Post>(postDetails);
  const [currentReputation, setCurrentReputation] = useState<number>(0);
  const [voteType, setVoteType] = useState<number>(0);
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
            const type: number | undefined = await getVoteState(id, jwt);
            if (type === 1) {
              setVoteType(1);
            } else if (type === -1) {
              setVoteType(-1);
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
    return <Loading />;
  }

  return postOptionProps ? (
    <div className="border-4 w-[70%] bg-gray-200 mb-8 rounded">
      {images && lines && <PostContent lines={lines} images={images} />}

      <div className="reputation-bar h-2 bg-red-300"></div>

      <PostOptions {...postOptionProps} />
      {showComments && <Comments postId={post.id} jwt={jwt} />}
    </div>
  ) : (
    <InfinitySpin width="500" color="#4fa94d" />
  );
};

export default PostCard;
