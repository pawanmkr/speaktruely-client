import { useEffect, useState, Dispatch, SetStateAction } from "react";
import axios, { AxiosResponse } from "axios";
import Thread from "./Thread";

interface ThreadProps {
  postId: number;
}

const Threads = ({ postId }: ThreadProps) => {
  const [threadIds, setThreadIds] = useState<number[]>();
  const jwt: string | null = localStorage.getItem("jwt");

  useEffect(() => {
    const fetchIdsOfThreads = async (postId: number, jwt: string) => {
      try {
        const res: AxiosResponse<number[]> = await axios.get(
          `${import.meta.env.VITE_API_V1_URL as string}/post/threads/${postId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        if (res.data.length > 0) {
          setThreadIds(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (postId && jwt) {
      void fetchIdsOfThreads(postId, jwt);
    }
  }, [postId, jwt]);

  return (
    <div className="mt-4 overflow-auto scrollbar-hide">
      {threadIds !== undefined &&
        threadIds.map((threadId) => (
          <Thread key={threadId} threadId={threadId} />
        ))}
    </div>
  );
};

export default Threads;
