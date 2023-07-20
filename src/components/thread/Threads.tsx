import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Thread } from ".";
import { Post as ThreadInterface } from "../../interface";
import { fetchThreads } from "../../utils/thread";

export const Threads = ({
  postId,
  jwt,
  setShowRegister,
}: {
  postId: number;
  jwt: string;
  setShowRegister: Dispatch<SetStateAction<boolean>>;
}) => {
  const [threads, setThreads] = useState<ThreadInterface[]>();

  useEffect(() => {
    const fetchData = async (postId: number) => {
      const result = await fetchThreads(postId);
      result && setThreads(result);
    };

    if (postId) {
      void fetchData(postId);
    }
  }, [postId]);

  return (
    <div className="mt-6 overflow-auto scrollbar-hide flex flex-col items-center w-[80%]">
      {threads &&
        threads.map((thread) => (
          <Thread
            key={thread.id}
            thread={thread}
            jwt={jwt}
            setShowRegister={setShowRegister}
          />
        ))}
    </div>
  );
};
