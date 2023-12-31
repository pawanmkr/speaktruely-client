import { Dispatch, SetStateAction } from "react";

export type Post = {
  id: number;
  thread?: number;
  content: string;
  reputation: number;
  user_id: number;
  full_name: string;
  username: string;
  threads: number;
  created_at: string;
  media?: [
    {
      name: string;
      mimetype: string;
    }
  ];
  comments?: {
    comment: string;
    createdAt: string;
  }[];
  share?: string;
};

export interface FeedProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  handleWriting?: (threads: number, postId?: number) => void;
  jwt: string;
  setShowRegister: Dispatch<SetStateAction<boolean>>;
}

export interface PostcardProps {
  postDetails: Post;
  handleCreateThread: (threads: number, postId?: number) => void;
  jwt: string;
  setShowRegister: Dispatch<SetStateAction<boolean>>;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

export interface ThreadOptionProps {
  thread: Post;
  voteType: number;
  currentReputation: number;
  showComments: boolean;
  setVoteType: React.Dispatch<React.SetStateAction<number>>;
  setCurrentReputation: React.Dispatch<React.SetStateAction<number>>;
  setShowComments: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRegister: Dispatch<SetStateAction<boolean>>;
  jwt: string;
}

export interface PostOptionProps {
  post: Post;
  voteType: number;
  currentReputation: number;
  showComments: boolean;
  setVoteType: React.Dispatch<React.SetStateAction<number>>;
  setCurrentReputation: React.Dispatch<React.SetStateAction<number>>;
  setShowComments: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreateThread: (threads: number, postId?: number) => void;
  setShowRegister: Dispatch<SetStateAction<boolean>>;
  jwt: string;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

export interface PostMoreOptionProps {
  id: number;
  userId: number;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  jwt: string;
}

export interface PostContentProps {
  lines: string[];
  files: DownloadedBlob[];
}

export interface Comment {
  id: number;
  comment: string;
  date: string;
  userid: number;
  username: string;
}

export interface DownloadedBlob {
  url: string;
  mimetype: string;
}
