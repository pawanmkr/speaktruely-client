import { Dispatch, SetStateAction } from "react";

interface WriteProps {
  publish: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleFileSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsWriting: Dispatch<SetStateAction<boolean>>;
  setRows: Dispatch<SetStateAction<number>>;
}

const Write = ({
  handleFileSelection,
  publish,
  setIsWriting,
  setRows,
}: WriteProps) => {
  return (
    <form>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <input
            type="file"
            name="attachment"
            id="attachment"
            multiple
            accept="image/*, video/*"
            className="my-4 text-sublime_yite"
            onChange={handleFileSelection}
          />
          <p
            className="cursor-pointer text-sublime_yite font-bold text-2xl mr-2"
            onClick={() => {
              setRows(1);
              setIsWriting(false);
            }}
          >
            X
          </p>
        </div>
        <button
          onClick={publish}
          className="py-2 rounded text-xl text-sublime_yite bg-sublime_gray"
        >
          Publish
        </button>
      </div>
    </form>
  );
};

export default Write;
