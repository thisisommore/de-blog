export const revalidate = 0;
import { web3_public_client } from "@/config/web3_client";
import { get_read_blog_contract } from "@/contracts/contracts";
import React from "react";
import Posts from "./components/Posts";

const Home = async () => {
  const BlogContract = get_read_blog_contract(web3_public_client);
  let posts = await BlogContract.read.viewAllPosts();
  return <Posts posts={posts} />;
};

export default Home;
