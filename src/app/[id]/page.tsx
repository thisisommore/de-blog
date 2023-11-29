export const dynamic = "force-dynamic";
import { web3_public_client } from "@/config/web3_client";
import { get_read_blog_contract } from "@/contracts/contracts";
import React from "react";
import { remark } from "remark";
import { ContractFunctionExecutionError } from "viem";
import html from "remark-html";
import Post from "./components/Post";
import { ResolvingMetadata, Metadata } from "next";
import ErrorUI from "@/components/ui/ErrorUI";

const ErrNoPost = "Post does not exist";
const ErrDeletedPost = "Post is deleted";
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
      if (error.shortMessage.includes(ErrDeletedPost)) {
        return {
          title: "Post no longer available",
        };
      }
    }

    throw error;
  }

  const [_postId, postAuthor, postTitle, postContent, isDeleted] = post;

  return {
    title: postTitle,
    description: postContent.split("\n")[0],
  };
}

const PostPage = async ({ params: { id: postId } }: Props) => {
  const BlogContract = get_read_blog_contract(web3_public_client);

  let post: Awaited<ReturnType<typeof BlogContract.read.viewPost>>;
  try {
    post = await BlogContract.read.viewPost([BigInt(postId)]);
  } catch (error: unknown) {
    if (error instanceof ContractFunctionExecutionError) {
      if (error.shortMessage.includes(ErrNoPost)) {
        return (
          <ErrorUI
            btnLabel="Go to home page"
            text="Post not found"
            btnAction="/"
          />
        );
      }
      if (error.shortMessage.includes(ErrDeletedPost)) {
        return (
          <ErrorUI
            btnLabel="Go to home page"
            text="Post no longer available"
            btnAction="/"
          />
        );
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
