import { FeedProps } from "../interface";
import { PostCard } from "./post";

const Feed = ({
  posts,
  handleWriting,
  setShowRegister,
  jwt,
  setPosts,
}: FeedProps) => {
  if (!posts) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      {posts.map((post) => {
        return (
          <PostCard
            key={post.id}
            postDetails={post}
            handleCreateThread={() => {
              handleWriting && handleWriting(post.threads, post.id);
            }}
            setShowRegister={setShowRegister}
            jwt={jwt}
            setPosts={setPosts}
          />
        );
      })}
    </div>
  );
};

export default Feed;
