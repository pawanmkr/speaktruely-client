import { SidebarProps } from "../interface";
import { FaHome, FaWpexplorer } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BiLogOutCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";
import { handleSidebarOptions } from "../utils";

const options: object = {
  Home: <FaHome />,
  Explore: <FaWpexplorer />,
  Profile: <CgProfile />,
  Logout: <BiLogOutCircle />,
};

const Sidebar = ({ topics, user }: SidebarProps) => {
  const navigate = useNavigate();
  const handleOptionClick = (e: MouseEvent<HTMLButtonElement>): void => {
    const elementId: string = e.currentTarget.id;
    user && handleSidebarOptions(elementId, navigate, user);
  };
  return (
    <div className="w-[20%] text-sublime_yite overflow-hidden flex flex-col items-center mt-6">
      <div className="menu mb-6 flex flex-col text-2xl">
        {Object.entries(options).map(([key, value]) => {
          if ((!user && key === "Logout") || (!user && key === "Profile"))
            return null;
          else {
            return (
              <button
                onClick={handleOptionClick}
                id={key.toLowerCase()}
                key={key.toLowerCase()}
                className="mb-2 text-left flex items-center py-2 px-4 font-bold hover:bg-sublime_gray w-max rounded-full"
              >
                <div className="">{value}</div>
                <div className="mx-2">{key}</div>
              </button>
            );
          }
        })}
      </div>
      <div className="topic flex flex-col p-2 text-2xl truncate">
        <p className="ml-2 mb-4">Topics</p>
        {topics.map((topic) => {
          return (
            <button
              key={topic.toLocaleLowerCase()}
              className="text-left flex items-center py-2 px-4 font-bold hover:bg-sublime_gray w-max rounded-full"
            >
              {topic}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
