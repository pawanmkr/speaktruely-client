import {
  ThreadOptionProps,
  Post as ThreadInterface,
  DownloadedBlob,
} from "../../interface";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { fetchBlobs } from "../../utils/media";
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
  const [currentReputation, setCurrentReputation] = useState(0);
  const [voteType, setVoteType] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [files, setFiles] = useState<DownloadedBlob[]>([]);
  const [lines, setLines] = useState<string[]>([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const fetchData = async (thread: ThreadInterface) => {
      setCurrentReputation(thread.reputation);
      if (thread.media) {
        const result: DownloadedBlob[] | undefined = await fetchBlobs(
          thread.media
        );
        result && setFiles(result);
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
      {files && lines && <PostContent lines={lines} files={files} />}
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
