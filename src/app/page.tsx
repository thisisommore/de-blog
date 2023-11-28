export const dynamic = "force-dynamic";
import { web3_public_client } from "@/config/web3_client";
import { get_read_blog_contract } from "@/contracts/contracts";
import React from "react";
import PostsPage from "./PostsPage";

const Home = async () => {
  const BlogContract = get_read_blog_contract(web3_public_client);
  let posts = await BlogContract.read.viewAllPosts();
  return <PostsPage posts={posts} />;
};

export default Home;
