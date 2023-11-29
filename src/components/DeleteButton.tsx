"use client";
import { useBlogContract } from "@/contracts/hooks";
import { Trash } from "lucide-react";
import React from "react";
import { useWalletClient } from "wagmi";

type Props = {
  postAuthor: string;
  postId: bigint;
};
const DeleteButton = (p: Props) => {
  const { data: wallet } = useWalletClient();
  const blogContract = useBlogContract();
  return (
    <>
      {p.postAuthor.toLowerCase() == wallet?.account.address.toLowerCase() && (
        <Trash
          size={14}
          className="ml-auto hover:cursor-pointer"
          onClick={() => {
            blogContract!.write.deletePost([p.postId]);
          }}
        />
      )}
    </>
  );
};

export default DeleteButton;
