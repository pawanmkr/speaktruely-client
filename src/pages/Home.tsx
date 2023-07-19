import { useEffect, useState, MouseEvent } from "react";
import Feed from "../components/Feed";
import axios, { AxiosResponse } from "axios";
import Sidebar from "../components/Sidebar";
import { FaHome, FaWpexplorer } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BiLogOutCircle } from "react-icons/bi";
import { IoMdCreate } from "react-icons/io";
import Write from "../components/Write";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Threads from "../components/Threads";
import { Post } from "../interface/post";

const options: object = {
  Home: <FaHome />,
  Explore: <FaWpexplorer />,
  Profile: <CgProfile />,
  Logout: <BiLogOutCircle />,
};

export interface Decoded {
  userid: number;
  fullname: string;
  email: string;
  username: string;
  iat: number;
}

const topics: string[] = ["Classroom", "Events", "Cricket", "Hip-Hop"];

const Home = () => {
  const [isWriting, setIsWriting] = useState(false);
  const [draftContent, setDraftContent] = useState<string>("");
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [jwt, setJwt] = useState<string>("");
  const [user, setUser] = useState<Decoded>();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [thread, setThread] = useState<number>();
  const [rows, setRows] = useState<number>(1);
  const [showThread, setShowThread] = useState<boolean>(false);
  const [ifPublishing, setIfPublishing] = useState<boolean>(false);

  // fetch all posts for the feed
  useEffect(() => {
    const fetchPosts = async (jwt: string) => {
      try {
        const response: AxiosResponse<Post[]> = await axios.get(
          `${import.meta.env.VITE_API_V1_URL as string}/post`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        if (response.data.length > 0) {
          const filteredPost: Post[] = [];
          response.data.forEach((post: Post) => {
            if (post.thread === null) filteredPost.push(post);
          });
          setPosts(filteredPost);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    const token: string | null = localStorage.getItem("jwt");
    if (token === null) navigate("/");
    else if (token) setJwt(token);

    if (jwt) {
      setUser(jwt_decode(jwt));
      void fetchPosts(jwt);
    }
  }, [jwt, navigate]);

  /*
   * Menu option handling...
   */
  const handleOptionClick = (e: MouseEvent<HTMLButtonElement>): void => {
    switch (e.currentTarget.id) {
      case "logout":
        localStorage.removeItem("jwt");
        navigate("/");
        break;
      default:
        break;
    }
  };

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

  // handle content change for writing post
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    setIfPublishing(true);
    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append("files", file);
    }
    formData.append("content", draftContent);
    if (thread) {
      formData.append("thread", thread.toString());
    }
    try {
      const res: AxiosResponse<Post> = await axios.post(
        `${import.meta.env.VITE_API_V1_URL as string}/post`,
        formData,
        {
          headers: {
            "Content-Type": "multipar/form-data",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (res) {
        if (res.status === 201) {
          setIsWriting(false);
          setIfPublishing(false);
          setRows(1);
        }
        if (res.data) {
          if (res.data.thread === null) {
            const decoded: Decoded = jwt_decode(jwt);
            const newPost: Post = {
              ...res.data,
              full_name: decoded.fullname,
              reputation: 0,
              username: res.data.username,
              media: res.data.media,
            };
            setPosts((prevPosts) => [newPost, ...prevPosts]);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    setDraftContent("");
    setSelectedFiles([]);
  };

  const autoResizeTextRow = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const lines = target.value.split("\n");
    if (lines.length > 5) setRows(lines.length);
  };

  return (
    <div className={`flex h-[100vh] justify-around`}>
      {user && (
        <Sidebar
          options={options}
          topics={topics}
          user={user}
          handleOptionClick={handleOptionClick}
        />
      )}
      {posts && <Feed posts={posts} handleWriting={handleWriting} />}

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
              placeholder="Write..."
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
            />
          )}
        </div>
        {showThread && thread && <Threads postId={thread} />}
      </div>
    </div>
  );
};

export default Home;
