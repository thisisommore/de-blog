"use client";
import Spinner from "@/app/components/Spinner";
import { useBlogContract } from "@/contracts/hooks";
import { Trash } from "lucide-react";
import React from "react";
import { useNetwork } from "wagmi";

type Props = {
  postAuthor: string;
  postId: bigint;
  onDelete: () => void;
};
const DeleteButton = (p: Props) => {
  const { chain } = useNetwork();
  const { loading, wallet, deletePost } = useBlogContract();
  return (
    <>
      {chain &&
        p.postAuthor.toLowerCase() == wallet?.account.address.toLowerCase() && (
          <>
            {loading ? (
              <div className="ml-auto">
                <Spinner />
              </div>
            ) : (
              <Trash
                size={14}
                className="ml-auto hover:cursor-pointer"
                onClick={async () => {
                  if (await deletePost!(p.postId)) p.onDelete();
                }}
              />
            )}
          </>
        )}
    </>
  );
};

export default DeleteButton;
