import axios from "axios";

const jwt: string | null = localStorage.getItem("jwt");

/*
 *  1: UPVOTE
 *  0: NEUTRAL
 * -1: DOWNVOTE
 */

export const getVoteState = async (
  postId: number
): Promise<number | undefined> => {
  if (!jwt) throw new Error("Jwt not found");
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_V1_URL as string}/post/vote/state`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        params: {
          post_id: postId,
        },
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return res.data.type as number;
  } catch (error) {
    console.log(error);
  }
};

export const updatePostVoteStatus = async (
  type: number,
  voteType: number,
  currentReputation: number,
  postId: number,
  setVoteType: React.Dispatch<React.SetStateAction<number>>,
  setCurrentReputation: React.Dispatch<React.SetStateAction<number>>
) => {
  if (!jwt) throw new Error("Jwt not found");
  try {
    if (voteType === 0) {
      // incase user hasn't voted already
      setVoteType(type);
      if (type === 1) {
        setCurrentReputation(Number(currentReputation) + 1);
      } else if (type === -1) {
        setCurrentReputation(Number(currentReputation) - 1);
      }
    } else if (voteType === 1) {
      if (type === 1) {
        // when user wants to take back his upvote
        setVoteType(0);
        const value: number = Number(currentReputation) - 1;
        setCurrentReputation(value);
      } else if (type === -1) {
        // when user wants to take back his upvote and do the downvote
        setVoteType(type);
        setCurrentReputation(Number(currentReputation) - 2);
      }
    } else if (voteType === -1) {
      if (type === 1) {
        setVoteType(type);
        setCurrentReputation(Number(currentReputation) + 2);
      } else if (type === -1) {
        setVoteType(0);
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
