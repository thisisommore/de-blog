"use client";
import { useBlogContract } from "@/contracts/hooks";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Post = {
  title: string;
  content: string;
};

const Create = () => {
  const blogContract = useBlogContract();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>();

  if (!blogContract) return <p>Connect wallet</p>;
  const onSubmit: SubmitHandler<Post> = (data) => {
    blogContract.write.createPost([data.title, data.content]);
  };
  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Post title"
          className="text-black"
          {...register("title", { required: true })}
        />
        {errors.content && <span>This field is required</span>}

        <input
          placeholder="Post content"
          className="text-black"
          {...register("content", { required: true })}
        />
        {errors.content && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>
  );
};

export default Create;
