"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import React from "react";
import { submitPost } from "./action";
import UserAvatar from "@/components/UserAvatar";
import LoadingButton from "@/components/LoadingButton";
import { useSession } from "@/components/SessionProvider";
import "./styles.css";
import { useSubmitPostMutation } from "./mutations";

const PostEditor = () => {
  const { user } = useSession();

  const mutation = useSubmitPostMutation();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ bold: false, italic: false }),
      Placeholder.configure({
        placeholder: "What's crack-a-lackin ?",
      }),
    ],
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  function onSubmit() {
    mutation.mutate(input, {
      onSuccess: () => {
        editor?.commands.clearContent();
      },
    });
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
        <EditorContent
          editor={editor}
          className="max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-background px-5 py-3 outline-none"
        />
      </div>
      <div className="flex justify-end">
        <LoadingButton
        loading={mutation.isPending}
          disabled={!input.trim()}
          onClick={onSubmit}
          className="min-w-20"
        >
          Post
        </LoadingButton>
      </div>
    </div>
  );
};

export default PostEditor;
