import { useEffect, useState } from "react";
import { fetchImages, getVoteState } from "../../utils/index";
import { Post, PostOptionProps, PostcardProps } from "../../interface";
import { PostContent, PostOptions, Comments } from ".";
import { Loading } from "../animations";

export const PostCard = ({
  postDetails,
  handleCreateThread,
  setShowRegister,
  jwt,
}: PostcardProps) => {
  const [post, setPost] = useState<Post>(postDetails);
  const [currentReputation, setCurrentReputation] = useState<number>(0);
  const [voteType, setVoteType] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
        if (jwt) {
          const type: number | undefined = await getVoteState(id);
          if (type === 1) {
            setVoteType(1);
          } else if (type === -1) {
            setVoteType(-1);
          }
        }
        const linesArr: string[] = content.split("\n");
        setLines(linesArr);
        setIsLoading(false);
      };
      void loadPost();
    }
  }, [jwt, postDetails]);

  const postOptionProps: PostOptionProps = {
    post,
    voteType,
    currentReputation,
    showComments,
    setVoteType,
    setCurrentReputation,
    setShowComments,
    handleCreateThread,
    setShowRegister,
    jwt,
  };

  if (isLoading) {
    return <Loading />;
  }

  return postOptionProps ? (
    <div className="border-4 w-[70%] bg-gray-200 mb-8 rounded">
      {images && lines && <PostContent lines={lines} images={images} />}
      <div className="reputation-bar h-2 bg-red-300"></div>
      <PostOptions
        {...postOptionProps}
        setShowRegister={setShowRegister}
        jwt={jwt}
      />
      {showComments && (
        <Comments
          postId={post.id}
          setShowRegister={setShowRegister}
          jwt={jwt}
        />
      )}
    </div>
  ) : (
    <Loading />
  );
};
