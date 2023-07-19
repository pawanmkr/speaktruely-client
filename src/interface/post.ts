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
  voteType: number;
  jwt: string;
  currentReputation: number;
  showComments: boolean;
  setVoteType: React.Dispatch<React.SetStateAction<number>>;
  setCurrentReputation: React.Dispatch<React.SetStateAction<number>>;
  setShowComments: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreateThread: (threads: number, postId?: number) => void;
}

export interface PostContentProps {
  lines: string[];
  images: string[];
}

export interface Comment {
  id: number;
  comment: string;
  date: string;
  userid: number;
  username: string;
}
