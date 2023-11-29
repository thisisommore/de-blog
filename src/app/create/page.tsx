"use client";
import { Edit2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useBlogContract } from "@/contracts/hooks";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Toggle } from "@/components/ui/toggle";
import { remark } from "remark";
import html from "remark-html";
import { Button } from "@/components/ui/button";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Spinner from "../components/Spinner";
import { useRouter } from "next/navigation";
type PostForm = {
  title: string;
  content: string;
  edit: boolean;
};

const Create = () => {
  const contentDefaultValue = "";
  const { createPost, loading, wallet } = useBlogContract();
  const { openConnectModal } = useConnectModal();
  const form = useForm<PostForm>({
    defaultValues: { edit: true, content: contentDefaultValue },
  });
  const router = useRouter();
  const edit = form.watch("edit");
  const content = form.watch("content");
  const [rendered_blog, set_rendered_blog] = useState("");
  useEffect(() => {
    (async () => {
      // Use remark to convert markdown into HTML string
      const processedContent = await remark().use(html).process(content);
      const contentHtml = processedContent.toString();
      set_rendered_blog(contentHtml);
    })();
  }, [content]);

  const onSubmit: SubmitHandler<PostForm> = async ({ title, content }) => {
    // The form submit button is only displayed if wallet is defined
    const postId = await createPost!(title, content);
    if (postId) router.push("/" + postId.toString());
    else router.push("/");
  };
  return (
    <div className="w-full flex">
      <div className="py-4 w-11/12 md:w-5/6 mx-auto">
        {/* Head: Title and short pitch */}
        <div className="p-4">
          <h3 className="text-lg font-medium">New post</h3>
          <p className="text-sm text-muted-foreground">
            Publish your blog permanently on web3
          </p>
        </div>
        <Separator />
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
          {/* Post Title */}
          <div>
            <Label>Title</Label>
            <Input
              className="mt-2"
              placeholder="My thoughts on Generative Pre-trained Transformers"
              {...form.register("title", { required: true })}
            />
            <p className="text-sm text-muted-foreground mt-2">
              This title will be shown at start of blog and in home page, make
              sure it gets attention of any reader
            </p>
          </div>
          {/* Post Content */}
          <div className="w-full">
            {/* Label and actions: edit mode and actions */}
            <div className="flex items-center flex-wrap">
              <div className="md:w-auto w-full">
                <Label>Content</Label>
                <p className="md:text-sm text-xs text-muted-foreground">
                  All the best with your writing, click publish when done
                </p>
              </div>

              <Toggle
                className="ml-auto mr-1"
                aria-label="Toggle edit"
                pressed={edit}
                onPressedChange={(e) => {
                  form.setValue("edit", e);
                }}
              >
                <Edit2 className="h-4 w-4" />
              </Toggle>
              {wallet ? (
                <Button type="submit">Publish {loading && <Spinner />}</Button>
              ) : (
                <Button size={"sm"} type="button" onClick={openConnectModal}>
                  Connect to publish
                </Button>
              )}
            </div>

            <div className="my-2"></div>
            <Separator />

            {/* Render Blog */}
            {!edit && (
              <div
                className="blog my-4"
                dangerouslySetInnerHTML={{ __html: rendered_blog }}
              />
            )}

            {/* Edit Blog markdown */}
            <div
              className={`min-h-[30vh] outline-none rounded-md before:text-gray-400 before:text-2xl my-2 ${
                !edit ? "hidden" : ""
              }`}
              data-text="Start by typing here"
              suppressContentEditableWarning={true}
              onInput={(e: any) => {
                form.setValue("content", e.target.innerText);
              }}
              contentEditable={true}
              inputMode="text"
            ></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
