import { VoteType } from "../components/PostCard";

export type Post = {
  id: number;
  thread?: number;
  content: string;
  reputation: number;
  userid: number;
  full_name: string;
  username: string;
  threads: number;
  created_at: string;
  media?: string[];
  comments?: {
    comment: string;
    createdAt: string;
  }[];
  share?: string;
};

export interface PostProps {
  posts: Post[];
  handleWriting: (threads: number, postId?: number) => void;
}

export interface PostcardProps {
  postDetails: Post;
  handleCreateThread: (threads: number, postId?: number) => void;
}

export interface PostOptionProps {
  post: Post;
  voteType: VoteType;
  jwt: string;
  currentReputation: number;
  setVoteType: React.Dispatch<React.SetStateAction<VoteType>>;
  setCurrentReputation: React.Dispatch<React.SetStateAction<number>>;
  handleCreateThread: (threads: number, postId?: number) => void;
}
