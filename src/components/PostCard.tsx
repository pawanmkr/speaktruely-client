import { Post } from "../pages/Home";
import { FaRegComment, FaShare } from "react-icons/fa";
import { BiUpvote, BiDownvote } from "react-icons/bi";

const PostCard = ({ content, full_name, username, reputation }: Post) => {
  const handleShare = () => {
    console.log("handleShare");
  };

  return (
    <div className="border-2 w-[500px] bg-gray-200 m-4 rounded">
      <div className="p-2 bg-sublime_blue rounded-t text-sublime_yite">
        <p>{content}</p>
      </div>

      <div className="reputation-bar h-2 bg-red-300"></div>

      <div className="flex items-center justify-between p-2 text-xl">
        <div className="flex items-center">
          <p className="text-lg">{full_name}</p>
          <p className="text-sm ml-2">@{username}</p>
        </div>

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
