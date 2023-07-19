import { PostProps } from "../interface";
import { PostCard } from "./post";
import { Loading } from "./animations";

const Feed = ({ posts, handleWriting }: PostProps) => {
  if (!posts) {
    return null;
  }

  return (
    <div className="flex flex-col items-center  overflow-auto scrollbar-hide mt-4 w-[50%] p-4">
      {<Loading /> &&
        posts.map((post) => {
          return (
            <PostCard
              key={post.id}
              postDetails={post}
              handleCreateThread={() => {
                handleWriting(post.threads, post.id);
              }}
            />
          );
        })}
    </div>
  );
};

export default Feed;
