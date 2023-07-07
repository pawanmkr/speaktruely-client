import { Post } from "../pages/Home";
import { FaRegComment, FaShare } from "react-icons/fa";
import { BiUpvote, BiDownvote } from "react-icons/bi";
// import { useState, ChangeEvent } from "react";

const PostCard = ({
  id,
  textContent,
  images,
  date,
  postedBy,
  reputation,
  comments,
  share,
}: Post) => {
  const handleShare = () => {
    console.log("shared");
  };

  return (
    <div className="border-2 w-[400px] bg-gray-200 m-4">
      <div className="p-2 bg-indigo-200">
        <p>{textContent}</p>
      </div>

      <div className="reputation-bar h-2 bg-red-300"></div>

      <div className="flex items-center justify-between p-2 text-xl">
        <div className="text-sm">{`@${postedBy.username}`}</div>

        <div className="flex">
          <div className="flex items-center">
            <BiUpvote />
            <p className="mx-2 text-sm">{reputation}</p>
            <BiDownvote />
          </div>

          <div className="flex items-center mx-6">
            <FaRegComment />
          </div>

          <div className="flex items-center">
            <FaShare onClick={handleShare} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
