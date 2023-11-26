import { web3_public_client } from "@/config/web3_client";
import { get_read_blog_contract } from "@/contracts/contracts";
import React from "react";

const Home = async () => {
  const BlogContract = get_read_blog_contract(web3_public_client);
  const posts = await BlogContract.read.viewAllPosts();

  return (
    <div>
      Posts
      {posts && posts.map((e) => <p key={e.id}>{e.content}</p>)}
    </div>
  );
};

export default Home;
