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
type PostForm = {
  title: string;
  content: string;
  edit: boolean;
};

const Create = () => {
  const contentDefaultValue = "";
  const blogContract = useBlogContract();
  const form = useForm<PostForm>({
    defaultValues: { edit: true, content: contentDefaultValue },
  });
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

  useEffect(() => {
    console.log(edit);
  }, [edit]);
  if (!blogContract) return <p>Connect wallet</p>;
  const onSubmit: SubmitHandler<PostForm> = (data) => {
    blogContract.write.createPost([data.title, data.content]);
  };
  return (
    <div className="w-100 flex">
      <div className="py-4 w-11/12 md:w-5/6 mx-auto">
        <div className="p-4">
          <h3 className="text-lg font-medium">New post</h3>
          <p className="text-sm text-muted-foreground">
            Publish your blog permanently on web3
          </p>
        </div>
        <Separator />
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
          <div>
            <Label>Title</Label>
            <div className="my-1"></div>
            <Input
              placeholder="How I secured my first job"
              {...form.register("title", { required: true })}
            />
            <div className="my-1"></div>
            <p className="text-sm text-muted-foreground">
              This title will be shown at start of blog and in home page, make
              sure it gets attention of any reader
            </p>
          </div>
          <div>
            <div className="flex items-center">
              <div>
                <Label>Content</Label>
                <p className="text-sm text-muted-foreground">
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
              <Button type="submit">Publish</Button>
            </div>

            <div className="my-2"></div>
            <Separator />
            {!edit && (
              <>
                <div
                  className="blog my-4"
                  dangerouslySetInnerHTML={{ __html: rendered_blog }}
                ></div>
              </>
            )}

            <div
              className={`min-h-[30vh] outline-none rounded-md before:text-gray-400 before:text-2xl mt-2 ${
                !edit ? "hidden" : ""
              }`}
              data-text="Start by typing here"
              {...form.register("content")}
              suppressContentEditableWarning={true}
              onInput={(e: any) => {
                form.setValue("content", e.target.innerText);
              }}
              contentEditable={true}
              inputMode="text"
            ></div>

            <div className="my-1"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
