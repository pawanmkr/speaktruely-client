interface WriteProps {
  publish: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleFileSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Write = ({
  publish,
  handleContentChange,
  handleFileSelection,
}: WriteProps) => {
  return (
    <form className="flex flex-col mt-8 w-[30%]">
      <button
        onClick={publish}
        className="py-2 rounded text-xl text-sublime_yite bg-sublime_gray"
      >
        Publish
      </button>
      <input
        type="file"
        name="attachment"
        id="attachment"
        multiple
        accept="image/*, video/*"
        className="my-4 text-sublime_yite"
        onChange={handleFileSelection}
      />
      <textarea
        name="write"
        id="write"
        cols={40}
        rows={10}
        placeholder="Write..."
        maxLength={300}
        onChange={handleContentChange}
        className="resize-none rounded p-2 bg-sublime_blue border-none outline-none text-sublime_yite"
      ></textarea>
    </form>
  );
};

export default Write;
