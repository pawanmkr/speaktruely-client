import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "../interface";
import { publishPost, fetchPosts, topics } from "../utils";
import { IoMdCreate } from "react-icons/io";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import { Threads } from "../components/thread";
import Write from "../components/Write";
import jwt_decode from "jwt-decode";
import { Authentication } from "../components/authentication/Authentication";
import { FollowSuggestions } from "../components/Friends";

export interface Decoded {
  userid: number;
  fullname: string;
  email: string;
  username: string;
  iat: number;
}

const Home = () => {
  const navigate = useNavigate();
  const [isWriting, setIsWriting] = useState(false);
  const [draftContent, setDraftContent] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [jwt, setJwt] = useState<string>("");
  const [user, setUser] = useState<Decoded>();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [thread, setThread] = useState<number>();
  const [rows, setRows] = useState<number>(1);
  const [showThread, setShowThread] = useState<boolean>(false);
  const [ifPublishing, setIfPublishing] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState<boolean>(false);

  useEffect(() => {
    // fetch all posts for the feed
    const fetchData = async (): Promise<void> => {
      const result: Post[] | undefined = await fetchPosts();
      result && setPosts(result);
    };
    const token: string | null = localStorage.getItem("jwt");
    if (token) {
      setJwt(token);
      setUser(jwt_decode(token));
    }
    void fetchData();
  }, [navigate]);

  const handleWriting = (threads: number, postId?: number) => {
    if (!threads) {
      setIsWriting(true);
      setRows(5);
      if (showThread) setShowThread(false);
    } else {
      setShowThread(true);
    }
    if (postId) {
      setThread(postId);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // handle content change for writing post
    if (draftContent?.length < 501) setDraftContent(e.target.value);
  };

  const handleFileSelection = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (!e.target.files) return;
    const fileList: FileList = e.target.files;
    const filesArray = Array.from(fileList);
    setSelectedFiles(filesArray);
  };

  const publish = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (jwt) {
      setIfPublishing(true);
      const result: Post | undefined = await publishPost(
        selectedFiles,
        draftContent,
        thread
      );
      if (result) {
        setIsWriting(false);
        setIfPublishing(false);
        setRows(1);
        if (result.thread === null) {
          setPosts((prevPosts) => [result, ...prevPosts]);
        }
      }
      setDraftContent("");
      setSelectedFiles([]);
    } else {
      console.log("You are not logged in!");
    }
  };

  const autoResizeTextRow = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const lines = target.value.split("\n");
    if (lines.length > 5) setRows(lines.length);
  };

  if (showRegister) {
    return <Authentication />;
  }

  return (
    <div className={`flex h-[100vh] justify-around w-full`}>
      <Sidebar topics={topics} user={user} />

      {posts && (
        <div className="w-[50%] border-x-[1px] border-xlite overflow-y-scroll scrollbar-hide">
          <Feed
            posts={posts}
            setPosts={setPosts}
            handleWriting={handleWriting}
            setShowRegister={setShowRegister}
            jwt={jwt}
          />
        </div>
      )}

      <div className="threads w-[35%] flex flex-col items-center">
        <div className="post-form flex flex-col mt-8 mr-8 w-[80%]">
          <div className="write relative left-4">
            <IoMdCreate className="absolute text-3xl text-sublime_yite right-4 top-4 opacity-50" />
            <textarea
              name="write"
              id="write"
              cols={40}
              rows={rows}
              onInput={autoResizeTextRow}
              onFocus={() => handleWriting(0)}
              placeholder="Any Thoughts?"
              maxLength={300}
              value={draftContent}
              onChange={handleContentChange}
              className="resize-none rounded p-4 text-xl bg-sublime_blue border-none outline-none text-sublime_yite w-full"
            />
          </div>
          {isWriting && (
            <Write
              publish={publish}
              ifPublishing={ifPublishing}
              handleFileSelection={handleFileSelection}
              setIsWriting={setIsWriting}
              setRows={setRows}
              setShowRegister={setShowRegister}
              jwt={jwt}
            />
          )}
        </div>
        {showThread && thread ? (
          <Threads
            postId={thread}
            jwt={jwt}
            setShowRegister={setShowRegister}
          />
        ) : (
          user && <FollowSuggestions userId={user?.userid} />
        )}
      </div>
    </div>
  );
};

export default Home;
