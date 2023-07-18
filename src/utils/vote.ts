import axios from "axios";
import { VoteType } from "../components/PostCard";

export const getVoteState = async (
  id: number,
  jwt: string
): Promise<string | undefined> => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_V1_URL as string}/post/vote/state`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        params: {
          post_id: id,
        },
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return res.data.type as string;
  } catch (error) {
    console.log(error);
  }
};

export const updatePostVoteStatus = async (
  type: VoteType,
  voteType: VoteType,
  currentReputation: number,
  postId: number,
  jwt: string,
  setVoteType: React.Dispatch<React.SetStateAction<VoteType>>,
  setCurrentReputation: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    if (voteType === VoteType.neutral) {
      // incase user hasn't voted already
      setVoteType(type);
      if (type === VoteType.upvote) {
        setCurrentReputation(Number(currentReputation) + 1);
      } else if (type === VoteType.downvote) {
        setCurrentReputation(Number(currentReputation) - 1);
      }
    } else if (voteType === VoteType.upvote) {
      if (type === VoteType.upvote) {
        // when user wants to take back his upvote
        setVoteType(VoteType.neutral);
        const value: number = Number(currentReputation) - 1;
        setCurrentReputation(value);
      } else if (type === VoteType.downvote) {
        // when user wants to take back his upvote and do the downvote
        setVoteType(type);
        setCurrentReputation(Number(currentReputation) - 2);
      }
    } else if (voteType === VoteType.downvote) {
      if (type === VoteType.upvote) {
        setVoteType(type);
        setCurrentReputation(Number(currentReputation) + 2);
      } else if (type === VoteType.downvote) {
        setVoteType(VoteType.neutral);
        setCurrentReputation(Number(currentReputation) + 1);
      }
    }
    await axios.post(
      `${import.meta.env.VITE_API_V1_URL as string}/post/vote`,
      { postId: postId, type },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
