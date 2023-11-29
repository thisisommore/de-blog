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
      <div className="md:w-11/12 w-[98%] mt-4 py-6 ml-2">
        <div className="flex flex-wrap items-center">
          <h3 className="md:text-3xl text-xl mb-2 w-full">{p.title}</h3>
          <p className="text-gray-500 text-sm overflow-hidden text-ellipsis mb-1">
            Published by {p.author}
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
  );
};

export default Post;
