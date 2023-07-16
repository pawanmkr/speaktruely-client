import { Post } from "../pages/Home";
import PostCard from "./PostCard";
import { InfinitySpin } from "react-loader-spinner";

interface PostProps {
  posts: Post[];
  handleWriting(threads: number[], postId: number): void;
}

const Feed = ({ posts, handleWriting }: PostProps) => {
  if (!posts) {
    return null;
  }

  return (
    <div className="flex flex-col overflow-auto scrollbar-hide mt-4 w-[35%] p-4">
      {(
        <div>
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      ) &&
        posts.map((post) => {
          return (
            <PostCard
              key={post.id}
              postDetails={post}
              handleCreateThread={handleWriting}
            />
          );
        })}
    </div>
  );
};

export default Feed;
