import { PostProps } from "../interface";
import { PostCard } from "./post";

const Feed = ({
  posts,
  handleWriting,
  setShowRegister,
  jwt,
  setPosts,
}: PostProps) => {
  if (!posts) {
    return null;
  }

  return (
    <div className="flex flex-col items-center overflow-auto scrollbar-hide mt-4 p-4 w-[50%]">
      {posts.map((post) => {
        return (
          <PostCard
            key={post.id}
            postDetails={post}
            handleCreateThread={() => {
              handleWriting(post.threads, post.id);
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
