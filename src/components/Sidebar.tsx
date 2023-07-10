import { MouseEvent } from "react";

type SidebarProps = {
  options: object;
  topics: string[];
  handleOptionClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Sidebar = ({ options, topics, handleOptionClick }: SidebarProps) => {
  return (
    <div className="ml-4 my-2 w-[180px] text-sublime_yite overflow-hidden">
      <div className="mb-6 ml-4 mt-4">Logo</div>
      <div className="menu mb-6 flex flex-col">
        {Object.entries(options).map(([key, value]) => {
          return (
            <button
              onClick={handleOptionClick}
              id={key.toLowerCase()}
              key={key.toLowerCase()}
              className="m-2 text-left flex items-center py-2 px-4 text-xl font-bold hover:bg-sublime_gray w-max rounded-full"
            >
              <div className="">{value}</div>
              <div className="mx-2">{key}</div>
            </button>
          );
        })}
      </div>
      <div className="topic flex flex-col p-2 text-xl truncate">
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
