"use client";
import Link from "next/link";
import React, { useState } from "react";
import DeleteButton from "@/components/DeleteButton";
const Line = () => <div className="h-0.5 w-full bg-gray-100"></div>;

type Props = {
  posts: readonly {
    id: bigint;
    author: `0x${string}`;
    title: string;
    content: string;
    isDeleted: boolean;
  }[];
};

const Posts = ({ posts }: Props) => {
  const [deletedPosts, setDeletedPosts] = useState(new Set<bigint>([]));
  return (
    /* Container */
    <div className="w-full flex justify-center">
      <div className="p-4 md:w-4/5">
        <h2 className="md:text-4xl text-2xl my-4">Latest posts</h2>
        {posts &&
          posts
            .filter((e) => !deletedPosts.has(e.id))
            .map((e) => {
              return (
                <div key={e.id}>
                  <Line />
                  <div className="md:py-6 py-3 ml-2">
                    {/* Head: title, author and delete button */}
                    <div className="flex items-center">
                      <Link
                        href={e.id.toString()}
                        key={e.id}
                        className="flex items-center"
                      >
                        <h3 className="text-md md:text-2xl font-semibold">
                          {e.title}
                        </h3>
                        <p className="ml-2 text-gray-400 md:text-sm text-xs w-28 md:w-auto text-ellipsis overflow-hidden">
                          {e.author}
                        </p>
                      </Link>

                      <DeleteButton
                        onDelete={() => {
                          setDeletedPosts(new Set(deletedPosts).add(e.id));
                        }}
                        postAuthor={e.author}
                        postId={e.id}
                      />
                    </div>

                    {/* Content */}
                    <Link href={e.id.toString()} key={e.id}>
                      <p className="text-gray-600 text-sm">
                        {e.content.replaceAll("`", "")}
                      </p>
                    </Link>
                  </div>
                </div>
              );
            })}
        <Line />
      </div>
    </div>
  );
};

export default Posts;
