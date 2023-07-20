import { ThreadOptionProps, Post as ThreadInterface } from "../../interface";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { fetchImages } from "../../utils/media";
import { getVoteState } from "../../utils";
import { Loading } from "../animations";
import { Comments, PostContent } from "../post";
import { ThreadOptions } from "./ThreadOptions";

export const Thread = ({
  thread,
  jwt,
  setShowRegister,
}: {
  thread: ThreadInterface;
  jwt: string;
  setShowRegister: Dispatch<SetStateAction<boolean>>;
}) => {
  const [currentReputation, setCurrentReputation] = useState<number>(0);
  const [voteType, setVoteType] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [images, setImages] = useState<string[]>([]);
  const [lines, setLines] = useState<string[]>([]);
  const [showComments, setShowComments] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (thread: ThreadInterface) => {
      setCurrentReputation(thread.reputation);
      if (thread.media) {
        const result: string[] | undefined = await fetchImages(thread.media);
        result && setImages(result);
      }
      if (jwt) {
        const state: number | undefined = await getVoteState(thread.id);
        state && setVoteType(state);
      }
      const linesArr: string[] = thread.content.split("\n");
      setLines(linesArr);
    };
    if (thread) {
      void fetchData(thread);
      setIsLoading(false);
    }
  }, [thread, jwt]);

  const threadOptionProps: ThreadOptionProps = {
    thread,
    voteType,
    currentReputation,
    showComments,
    setVoteType,
    setCurrentReputation,
    setShowComments,
    setShowRegister,
    jwt,
  };

  if (isLoading) {
    return <Loading />;
  }

  return isLoading === false ? (
    <div className="border-4 w-full bg-gray-200 mb-8 rounded">
      {images && lines && <PostContent lines={lines} images={images} />}
      <div className="reputation-bar h-2 bg-red-300"></div>
      <ThreadOptions {...threadOptionProps} setShowRegister={setShowRegister} />
      {showComments && (
        <Comments
          postId={thread.id}
          setShowRegister={setShowRegister}
          jwt={jwt}
        />
      )}
    </div>
  ) : (
    <Loading />
  );
};
