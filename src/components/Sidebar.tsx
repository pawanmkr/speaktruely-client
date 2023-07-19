import { MouseEvent } from "react";
import { Decoded } from "../pages/Home";

type SidebarProps = {
  options: object;
  topics: string[];
  user: Decoded;
  handleOptionClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Sidebar = ({
  options,
  topics,
  user,
  handleOptionClick,
}: SidebarProps) => {
  return (
    <div className="ml-4 my-2 w-[15%] text-sublime_yite overflow-hidden flex flex-col items-center">
      <div className="ml-4 my-4 mb-8">
        <p className="text-2xl">{user.fullname}</p>
        <p>@{user.username}</p>
      </div>
      <div className="menu mb-6 flex flex-col text-2xl">
        {Object.entries(options).map(([key, value]) => {
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
