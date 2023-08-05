import { Dispatch, SetStateAction } from "react";
import { Loading } from "./animations";

interface WriteProps {
  publish: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ifPublishing: boolean;
  handleFileSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsWriting: Dispatch<SetStateAction<boolean>>;
  setRows: Dispatch<SetStateAction<number>>;
  setShowRegister: Dispatch<SetStateAction<boolean>>;
  jwt: string;
}

const Write = ({
  handleFileSelection,
  publish,
  ifPublishing,
  setIsWriting,
  setRows,
  setShowRegister,
  jwt,
}: WriteProps) => {
  const MAX_FILE_SIZE_MB = 50;

  const handleFileSelectionWithLimit = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    // Assuming only one file is allowed to be selected, change this if you allow multiple files.
    const file = files[0];

    const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to MB

    if (fileSizeMB <= MAX_FILE_SIZE_MB) {
      handleFileSelection(e);
    } else {
      e.target.value = "";
      alert(`File size exceeds the limit of ${MAX_FILE_SIZE_MB}MB.`);
    }
  };

  return (
    <form className="flex flex-col ml-4 w-full">
      <div className="flex items-center justify-between">
        <input
          className="p-2 w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 my-4 mr-4"
          id="attachment"
          type="file"
          multiple
          accept="image/*, video/*"
          onChange={handleFileSelectionWithLimit}
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
        onClick={(event) => {
          jwt ? publish(event) : setShowRegister(true);
        }}
        className="py-2 rounded text-xl text-sublime_yite bg-sublime_gray"
      >
        {ifPublishing ? <Loading /> : "Publish"}
      </button>
    </form>
  );
};

export default Write;
