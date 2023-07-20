import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Comment as CommentInterface } from "../../interface";
import { fetchComments, postComment } from "../../utils";

const Comment = ({ comment }: { comment: CommentInterface }) => {
  return (
    <div className="my-4">
      <div className="">
        <p>{comment.comment}</p>
      </div>
      <div className="flex justify-between text-sublime_gray text-sm">
        <p className="cursor-pointer">@{comment.username}</p>
        <p>{comment.date}</p>
      </div>
    </div>
  );
};

const CommentForm = ({
  postId,
  setComments,
  setShowRegister,
  jwt,
}: {
  postId: number;
  setComments: Dispatch<SetStateAction<CommentInterface[]>>;
  setShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
  jwt: string;
}) => {
  const [comment, setComment] = useState<string>("");

  const handleCommentSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const res: CommentInterface | undefined = await postComment(
      comment,
      postId
    );
    if (res) {
      setComments((prevComments) => [res, ...prevComments]);
    }
  };
  return (
    <div className="flex overflow-hidden my-2 rounded bg-white">
      <div className="border-none w-[85%]">
        <input
          type="text"
          name="comment"
          id="comment-input"
          className="w-full p-3"
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className="w-[15%] flex items-center justify-center bg-white text-xl">
        <button
          onClick={() => {
            jwt ? handleCommentSubmit : setShowRegister(true);
          }}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export const Comments = ({
  postId,
  setShowRegister,
  jwt,
}: {
  postId: number;
  setShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
  jwt: string;
}) => {
  const [comments, setComments] = useState<CommentInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result: CommentInterface[] | undefined = await fetchComments(
        postId
      );
      result && setComments(result);
    };
    void fetchData();
  }, [postId]);

  return (
    <div className="px-2 border-light_gray border-t-[1px]">
      {comments &&
        comments.map((comment) => {
          return <Comment comment={comment} key={comment.id} />;
        })}
      <CommentForm
        postId={postId}
        setComments={setComments}
        setShowRegister={setShowRegister}
        jwt={jwt}
      />
    </div>
  );
};
