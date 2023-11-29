import { web3_public_client } from "@/config/web3_client";
import { get_read_blog_contract } from "@/contracts/contracts";
import React, { useEffect, useState } from "react";
import { remark } from "remark";
import { ContractFunctionExecutionError } from "viem";
import html from "remark-html";
import Post from "./components/Post";
import { ResolvingMetadata, Metadata } from "next";

const ErrNoPost = "Post does not exist";

type Props = { params: { id: string } };
export async function generateMetadata(
  { params: { id: postId } }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const BlogContract = get_read_blog_contract(web3_public_client);

  let post: Awaited<ReturnType<typeof BlogContract.read.viewPost>>;
  try {
    post = await BlogContract.read.viewPost([BigInt(postId)]);
  } catch (error: unknown) {
    if (error instanceof ContractFunctionExecutionError) {
      if (error.shortMessage.includes(ErrNoPost)) {
        return {
          title: "Post not found",
        };
      }
    }

    throw error;
  }

  const [_postId, postAuthor, postTitle, postContent, isDeleted] = post;

  return {
    title: postTitle,
    description: postContent.slice(0, 10) + "...",
  };
}

const PostPage = async ({ params: { id: postId } }: Props) => {
  const BlogContract = get_read_blog_contract(web3_public_client);

  let post: Awaited<ReturnType<typeof BlogContract.read.viewPost>>;
  try {
    console.log("postId", postId);
    post = await BlogContract.read.viewPost([BigInt(postId)]);
  } catch (error: unknown) {
    if (error instanceof ContractFunctionExecutionError) {
      console.log("postId", error);
      console.log(error.shortMessage);

      if (error.shortMessage.includes(ErrNoPost)) {
        return <p> Post not found</p>;
      }
    }

    throw error;
  }

  const [_postId, postAuthor, postTitle, postContent, isDeleted] = post;
  const processedContent = await remark().use(html).process(postContent);
  const contentHtml = processedContent.toString();
  // (post.id, post.author, post.title, post.content, post.isDeleted)
  return (
    <Post
      author={postAuthor}
      content={contentHtml}
      id={_postId}
      title={postTitle}
    />
  );
};

export default PostPage;
