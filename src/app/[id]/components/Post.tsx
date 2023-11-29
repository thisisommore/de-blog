import DeleteButton from "@/components/DeleteButton";
import React from "react";

type Props = {
  id: bigint;
  author: `0x${string}`;
  title: string;
  content: string;
};

const Line = () => <div className="h-0.5 w-full bg-gray-300"></div>;
const Post = (p: Props) => {
  return (
    <div className="p-4 flex justify-center w-full">
      <div className="my-4"></div>
      <div key={p.id} className="w-4/5">
        <div className="py-6 ml-2">
          <div className="flex items-center">
            <h3 className="text-3xl mb-2">{p.title}</h3>
            <p className="ml-2 text-gray-600">•</p>
            <p className="ml-2 text-gray-600"> {p.author}</p>
            <DeleteButton postAuthor={p.author} postId={p.id} />
          </div>

          <Line />
          <div
            className="blog my-4"
            dangerouslySetInnerHTML={{ __html: p.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;