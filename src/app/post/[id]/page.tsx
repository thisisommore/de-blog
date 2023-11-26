import { web3_public_client } from "@/config/web3_client";
import { get_read_blog_contract } from "@/contracts/contracts";
import React from "react";

const Line = () => <div className="h-0.5 w-1/2 bg-gray-300"></div>;
const Post = async ({ params: { id: postId } }: { params: { id: string } }) => {
  const BlogContract = get_read_blog_contract(web3_public_client);
  const post = await BlogContract.read.viewPost([BigInt(postId)]);
  const [_postId, postAuthor, postTitle, postContent, isDeleted] = post;
  // (post.id, post.author, post.title, post.content, post.isDeleted)
  return (
    <div className="p-4">
      <h2 className="text-3xl">Post</h2>

      <div className="my-4"></div>

      <div key={_postId}>
        <Line />
        <div className="py-6 ml-2">
          <h3 className="text-2xl">{postTitle}</h3>
          <p>{postContent}</p>
        </div>
      </div>

      <Line />
    </div>
  );
};

export default Post;
