import { useEffect, useState, MouseEvent } from "react";
import Feed from "../components/Feed";
import axios, { AxiosResponse } from "axios";
// import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FaHome, FaWpexplorer } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiLogOutCircle } from "react-icons/bi";
import { IoMdCreate } from "react-icons/io";
import Write from "../components/Write";
import { useNavigate } from "react-router-dom";

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

  images?: {
    url: string;
  }[];

  comments?: {
    comment: string;
    createdAt: string;
  }[];
  share?: string;
};

/* interface UserProps {
  fullName: string;
  username: string;
  email: string;
} */

const topics: string[] = ["Classroom", "Events", "Cricket", "Hip-Hop"];

const Home = () => {
  /*   const location = useLocation();
  const user = location.state as { user: UserProps };
  console.log(user); */
  const [isWriting, setIsWriting] = useState(false);
  const [draftContent, setDraftContent] = useState<string>("");
  const navigate = useNavigate();

  // const { fullName, username, email } = user.user;
  const [posts, setPosts] = useState<Post[] | undefined>();

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

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (draftContent?.length < 501) {
      setDraftContent(e.target.value);
    }
  };

  const publish = async () => {
    try {
      const jwt: string | null = localStorage.getItem("jwt");
      if (jwt === null) {
        console.log("user not logged in");
        return;
      }
      const res: AxiosResponse = await axios.post(
        `${import.meta.env.VITE_API_V1_URL as string}/post`,
        {
          content: draftContent,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (res) {
        if (res.status === 201) {
          setIsWriting(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // fetch all posts for the feed
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response: AxiosResponse<Post[]> = await axios.get(
          `${import.meta.env.VITE_API_V1_URL as string}/post`
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    void fetchPosts();
  }, []);

  return (
    <div className="flex w-[80%] h-[100vh]">
      <Sidebar
        options={options}
        topics={topics}
        handleOptionClick={handleOptionClick}
      />
      {isWriting && (
        <Write publish={publish} handleContentChange={handleContentChange} />
      )}
      {posts && <Feed posts={posts} />}
    </div>
  );
};

export default Home;
