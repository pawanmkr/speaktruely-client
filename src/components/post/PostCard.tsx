import { useEffect, useState } from "react";
import { fetchBlobs, getVoteState } from "../../utils/index";
import {
  Post,
  PostOptionProps,
  PostcardProps,
  DownloadedBlob,
} from "../../interface";
import { PostContent, PostOptions, Comments } from ".";
import { Loading } from "../animations";

export const PostCard = ({
  postDetails,
  handleCreateThread,
  setShowRegister,
  jwt,
  setPosts,
}: PostcardProps) => {
  const [post, setPost] = useState<Post>(postDetails);
  const [currentReputation, setCurrentReputation] = useState<number>(0);
  const [voteType, setVoteType] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [files, setFiles] = useState<DownloadedBlob[]>([]);
  const [lines, setLines] = useState<string[]>([]);
  const [showComments, setShowComments] = useState<boolean>(false);

  useEffect(() => {
    if (postDetails) {
      const loadPost = async (): Promise<void> => {
        const { id, content, reputation, media } = postDetails;
        setPost(postDetails);
        setCurrentReputation(reputation);
        if (media) {
          const files: DownloadedBlob[] | undefined = await fetchBlobs(media);
          files && setFiles(files);
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
    setPosts,
  };

  if (isLoading) {
    return <Loading />;
  }

  return postOptionProps ? (
    <div className="w-full text-sublime_yite px-8 border-y-[1px] border-y-xlite mb-8">
      <div className="border-x-[1px] border-x-xlite">
        <PostContent lines={lines} files={files} />
        <div className="reputation-bar h-2 bg-red-300"></div>
        <PostOptions
          {...postOptionProps}
          setShowRegister={setShowRegister}
          jwt={jwt}
          setPosts={setPosts}
        />
        {showComments && (
          <Comments
            postId={post.id}
            setShowRegister={setShowRegister}
            jwt={jwt}
          />
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
};
