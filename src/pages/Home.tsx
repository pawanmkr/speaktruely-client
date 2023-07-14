import { useEffect, useState, MouseEvent } from "react";
import Feed from "../components/Feed";
import axios, { AxiosResponse } from "axios";
import Sidebar from "../components/Sidebar";
import { FaHome, FaWpexplorer } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiLogOutCircle } from "react-icons/bi";
import { IoMdCreate } from "react-icons/io";
import Write from "../components/Write";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const options: object = {
  Home: <FaHome />,
  Write: <IoMdCreate />,
  Explore: <FaWpexplorer />,
  Profile: <CgProfile />,
  Settings: <MdOutlineSettings />,
  Logout: <BiLogOutCircle />,
};

export type Post = {
  id: number;
  content: string;
  reputation: number;
  full_name: string;
  username: string;
  created_at: string;
  media?: string;
  comments?: {
    comment: string;
    createdAt: string;
  }[];
  share?: string;
};

export interface Decoded {
  fullName: string;
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
        setPosts(response.data);
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
      case "write":
        if (isWriting) {
          setIsWriting(false);
        } else {
          setIsWriting(true);
        }
        break;
      case "logout":
        localStorage.removeItem("jwt");
        navigate("/");
        break;
      default:
        break;
    }
  };

  // handle content change for writing post
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (draftContent?.length < 501) {
      setDraftContent(e.target.value);
    }
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

    /*
     * Add logic to disable pusblish button until content or media
     * at least one of them is being sent
     */

    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append("files", file);
    }
    formData.append("content", draftContent);
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
        }
        if (res.data) {
          const decoded: Decoded = jwt_decode(jwt);
          const newPost: Post = {
            ...res.data,
            full_name: decoded.fullName,
            reputation: 0,
            username: res.data.username,
            media: res.data.media,
          };
          setPosts((prevPosts) => [newPost, ...prevPosts]);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setDraftContent("");
    setSelectedFiles([]);
  };

  return (
    <div
      className={`flex h-[100vh] justify-between ${
        isWriting ? "w-[1000%]" : "w-[100%]"
      }`}
    >
      {user && (
        <Sidebar
          options={options}
          topics={topics}
          user={user}
          handleOptionClick={handleOptionClick}
        />
      )}
      {isWriting && (
        <Write
          publish={publish}
          handleContentChange={handleContentChange}
          handleFileSelection={handleFileSelection}
        />
      )}
      {posts && <Feed posts={posts} />}
      <div className="trends w-[15%]"></div>
    </div>
  );
};

export default Home;
