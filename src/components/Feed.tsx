import { Post } from "../pages/Home";
import PostCard from "./PostCard";

interface PostProps {
  posts: Post[];
}

const Feed = ({ posts }: PostProps) => {
  console.log(posts);
  if (!posts) {
    return null;
  }

  return (
    <>
      {posts.map((post) => {
        return <PostCard key={post.id} {...post} />;
      })}
    </>
  );
};

export default Feed;
