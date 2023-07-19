import React from "react";
import { PostContentProps } from "../../interface";
import { nanoid } from "nanoid";

const PostContent = ({ lines, images }: PostContentProps) => {
  return (
    <div className="">
      <Image images={images} />
      <Text lines={lines} />
    </div>
  );
};

export default PostContent;

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

const Image = ({ images }: { images: string[] }) => {
  return (
    <div className="">
      {images.map((image) => {
        return <img key={image} src={image} className="max-w-full rounded-t" />;
      })}
    </div>
  );
};
