import React from "react";
import { DownloadedBlob, PostContentProps } from "../../interface";
import { nanoid } from "nanoid";

export const PostContent = ({ lines, files }: PostContentProps) => {
  return (
    <div className="">
      <Files files={files} />
      <Text lines={lines} />
    </div>
  );
};

const Text = ({ lines }: { lines: string[] }) => {
  return (
    <div className="text-xl m-0 p-2">
      {lines.map((line) => {
        return (
          <React.Fragment key={nanoid()}>
            <span>{line}</span>
            <br />
          </React.Fragment>
        );
      })}
    </div>
  );
};

const Files = ({ files }: { files: DownloadedBlob[] }) => {
  return (
    <div className="">
      {files.map((file) => {
        return file.mimetype.includes("video") ? (
          <video
            controls
            key={file.url}
            src={file.url}
            className="max-w-full rounded-t"
          />
        ) : (
          <img
            key={file.url}
            src={file.url}
            alt="404"
            className="max-w-full rounded-t"
          />
        );
      })}
    </div>
  );
};
