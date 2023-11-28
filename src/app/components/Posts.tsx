"use client";
import Link from "next/link";
import React from "react";
import { useWalletClient } from "wagmi";
import { Trash } from "lucide-react";
import { useBlogContract } from "@/contracts/hooks";
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
  const { data: wallet } = useWalletClient();
  const blogContract = useBlogContract();

  return (
    /* Container */
    <div className="w-full flex justify-center">
      <div className="p-4 md:w-4/5">
        <h2 className="text-4xl my-4">Latest posts</h2>
        {posts &&
          posts.map((e) => {
            return (
              <>
                <Line />
                <div className="py-6 ml-2">
                  {/* Head: title, author and delete button */}
                  <div className="flex items-center">
                    <Link
                      href={e.id.toString()}
                      key={e.id}
                      className="flex items-center"
                    >
                      <h3 className="text-2xl font-semibold">{e.title}</h3>
                      <p className="ml-2 text-gray-400 text-sm"> {e.author}</p>
                    </Link>

                    {e.author.toLowerCase() ==
                      wallet?.account.address.toLowerCase() && (
                      <Trash
                        size={14}
                        className="ml-auto hover:cursor-pointer"
                        onClick={() => {
                          blogContract!.write.deletePost([e.id]);
                        }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <Link href={e.id.toString()} key={e.id}>
                    <p className="text-gray-600 text-sm">
                      {e.content.replaceAll("`", "")}
                    </p>
                  </Link>
                </div>
              </>
            );
          })}
        <Line />
      </div>
    </div>
  );
};

export default Posts;
