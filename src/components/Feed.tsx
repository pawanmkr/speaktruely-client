import { Post } from "../pages/Home";
import PostCard from "./PostCard";
import { InfinitySpin } from "react-loader-spinner";

interface PostProps {
  posts: Post[];
}

const Feed = ({ posts }: PostProps) => {
  if (!posts) {
    return null;
  }

  return (
    <div className="flex flex-col overflow-auto scrollbar-hide mt-4 w-[30%] p-4">
      {(
        <div>
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      ) &&
        posts.map((post) => {
          return <PostCard key={post.id} {...post} />;
        })}
    </div>
  );
};

export default Feed;
