import { web3_public_client } from "@/config/web3_client";
import { get_read_blog_contract } from "@/contracts/contracts";
import React from "react";

const Line = () => <div className="h-0.5 w-1/2 bg-gray-300"></div>;
const Home = async () => {
  const BlogContract = get_read_blog_contract(web3_public_client);
  const posts = await BlogContract.read.viewAllPosts();

  return (
    <div className="p-4">
      <h2 className="text-3xl">Posts</h2>

      <div className="my-4"></div>
      {posts &&
        posts.map((e) => {
          return (
            <div key={e.id}>
              <Line />
              <div className="py-6 ml-2">
                <h3 className="text-2xl">{e.title}</h3>
                <p>{e.content}</p>
              </div>
            </div>
          );
        })}
      <Line />
    </div>
  );
};

export default Home;
