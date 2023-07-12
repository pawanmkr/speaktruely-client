import { Post } from "../pages/Home";
import PostCard from "./PostCard";

interface PostProps {
  posts: Post[];
}

const Feed = ({ posts }: PostProps) => {
  if (!posts) {
    return null;
  }

  return (
    <div className="flex flex-col overflow-auto scrollbar-hide mt-4">
      {posts.map((post) => {
        return <PostCard key={post.id} {...post} />;
      })}
    </div>
  );
};

export default Feed;
