import { FaRegComment, FaShare } from "react-icons/fa";
import { updatePostVoteStatus } from "../../utils";
import { ThreadOptionProps } from "../../interface";
import {
  BiUpvote,
  BiDownvote,
  BiSolidUpvote,
  BiSolidDownvote,
} from "react-icons/bi";

export const ThreadOptions = ({
  thread,
  voteType,
  currentReputation,
  showComments,
  setVoteType,
  setCurrentReputation,
  setShowComments,
  setShowRegister,
  jwt,
}: ThreadOptionProps) => {
  const handleVote = async (type: number) => {
    jwt
      ? await updatePostVoteStatus(
          type,
          voteType,
          currentReputation,
          thread.id,
          setVoteType,
          setCurrentReputation
        )
      : setShowRegister(true);
  };

  return (
    <div className="flex items-center justify-between p-2 text-xl">
      <div className="flex items-center">
        <p className="text-lg">{thread.full_name}</p>
        <p className="text-sm ml-2 cursor-pointer">@{thread.username}</p>
      </div>

      <div className="flex w-[50%] justify-around">
        <div className="flex items-center justify-around">
          <div
            className={`up cursor-pointer ${
              voteType === 1 ? "text-blue-500" : ""
            }`}
            onClick={() => handleVote(1)}
          >
            {voteType === 1 ? <BiSolidUpvote /> : <BiUpvote />}
          </div>
          <div className="reputation-count">
            <p className="mx-2 text-sm">{currentReputation}</p>
          </div>
          <div
            className={`down cursor-pointer ${
              voteType === -1 ? "text-red-500" : ""
            }`}
            onClick={() => handleVote(-1)}
          >
            {voteType === -1 ? <BiSolidDownvote /> : <BiDownvote />}
          </div>
        </div>

        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            showComments ? setShowComments(false) : setShowComments(true);
          }}
        >
          <FaRegComment />
        </div>

        <div className="flex items-center">
          <FaShare />
        </div>
      </div>
    </div>
  );
};
