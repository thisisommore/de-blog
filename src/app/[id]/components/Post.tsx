"use client";
import DeleteButton from "@/components/DeleteButton";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  id: bigint;
  author: `0x${string}`;
  title: string;
  content: string;
};

const Line = () => <div className="h-0.5 w-full bg-gray-300"></div>;
const Post = (p: Props) => {
  const router = useRouter();
  return (
    <div className="p-4 flex justify-center w-full">
      <div className="my-4"></div>
      <div key={p.id} className="md:w-4/5 w-[98%]">
        <div className="py-6 ml-2">
          <div className="flex flex-wrap items-center">
            <h3 className="md:text-3xl text-xl mb-2">{p.title}</h3>
            <p className="ml-2 text-gray-600 md:block hidden">•</p>
            <p className="md:ml-2 text-gray-600 md:w-auto md:text-base text-sm w-4/5 overflow-hidden text-ellipsis">
              {p.author}
            </p>
            <DeleteButton
              onDelete={() => {
                router.push("/");
              }}
              postAuthor={p.author}
              postId={p.id}
            />
          </div>

          <Line />
          <div
            className="blog my-4 md:text-md text-sm"
            dangerouslySetInnerHTML={{ __html: p.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
