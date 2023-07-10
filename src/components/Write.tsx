interface WriteProps {
  publish: () => void;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Write = ({ publish, handleContentChange }: WriteProps) => {
  return (
    <div className="flex flex-col mt-4">
      <button
        onClick={publish}
        className="py-2 rounded text-xl text-sublime_yite bg-sublime_gray"
      >
        Publish
      </button>
      <textarea
        name="write"
        id="write"
        cols="40"
        rows="10"
        placeholder="Write..."
        maxLength={300}
        onChange={handleContentChange}
        className="resize-none rounded p-2 bg-sublime_blue border-none outline-none mt-4 text-sublime_yite"
      ></textarea>
    </div>
  );
};

export default Write;
