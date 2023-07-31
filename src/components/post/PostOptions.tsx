import { FaRegComment, FaShare } from "react-icons/fa";
import { TbNeedleThread } from "react-icons/tb";
import { SlOptionsVertical } from "react-icons/sl";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  BiUpvote,
  BiDownvote,
  BiSolidUpvote,
  BiSolidDownvote,
} from "react-icons/bi";
import { deletePost, updatePostVoteStatus } from "../../utils";
import { Decoded, PostOptionProps, PostMoreOptionProps } from "../../interface";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export const PostOptions = ({
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
}: PostOptionProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const handleVote = async (type: number) => {
    jwt
      ? await updatePostVoteStatus(
          type,
          voteType,
          currentReputation,
          post.id,
          setVoteType,
          setCurrentReputation
        )
      : setShowRegister(true);
  };

  const handleOptions = () => {
    showOptions ? setShowOptions(false) : setShowOptions(true);
  };

  return (
    <div className="flex items-center justify-between p-2 text-xl realtive">
      <div className="flex items-center w-[60%]">
        <p className="text-lg">{post.full_name}</p>
        {/* <p className="text-sm ml-2 cursor-pointer">@{post.username}</p> */}
      </div>
      {showOptions ? (
        <Options
          id={post.id}
          userId={post.user_id}
          setPosts={setPosts}
          jwt={jwt}
        />
      ) : (
        <div className="flex w-[40%] justify-between mr-4">
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

          <div
            className="thread flex items-center cursor-pointer"
            onClick={() => {
              handleCreateThread(post.threads, post.id);
            }}
          >
            <TbNeedleThread />
            <p className="text-sm ml-2">{post.threads ? post.threads : ""}</p>
          </div>
        </div>
      )}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => handleOptions()}
      >
        <SlOptionsVertical />
      </div>
    </div>
  );
};

const Options = ({ id, userId, setPosts, jwt }: PostMoreOptionProps) => {
  const [user, setUser] = useState<Decoded>();
  useEffect(() => {
    if (jwt) {
      setUser(jwt_decode(jwt));
    }
  }, [jwt]);

  return user ? (
    <div className="flex w-[20%] justify-between cursor-pointer">
      {user.userid === userId && (
        <div
          onClick={async () => {
            const res = await deletePost(id);
            if (res === 200) {
              setPosts((prevPosts) =>
                prevPosts.filter((post) => post.id !== id)
              );
            }
          }}
        >
          <RiDeleteBinLine />
        </div>
      )}
      <div>
        <FaShare />
      </div>
    </div>
  ) : null;
};
