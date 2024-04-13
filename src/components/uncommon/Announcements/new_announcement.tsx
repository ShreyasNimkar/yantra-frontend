import { SERVER_ERROR } from "@/config/errors";
import { USER_PROFILE_PIC_URL } from "@/config/routes";
import postHandler from "@/handlers/post_handler";
import Toaster from "@/utils/toaster";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Announcement, Group, Poll, Post, User } from "@/types";
import { useWindowWidth } from "@react-hook/window-size";

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  group: Group;
  setAnnouncements?: React.Dispatch<
    React.SetStateAction<(Post | Announcement | Poll)[]>
  >;
}

const NewAnnouncement = ({ setShow, group, setAnnouncements }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    document.documentElement.style.overflowY = "hidden";
    document.documentElement.style.height = "100vh";

    return () => {
      document.documentElement.style.overflowY = "auto";
      document.documentElement.style.height = "auto";
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "b" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      wrapSelectedText("**", "**");
    }
  };

  const wrapSelectedText = (prefix: string, suffix: string) => {
    const textarea = document.getElementById(
      "textarea_id"
    ) as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText =
      content.substring(0, start) +
      prefix +
      selectedText +
      suffix +
      content.substring(end);
    setContent(newText);
    textarea.focus();
    textarea.setSelectionRange(start + prefix.length, end + prefix.length);
  };

  const handleSubmit = async () => {
    if (title.trim() == "") {
      Toaster.error("Title cannot be empty!");
      return;
    }
    if (content.trim() == "" || content.replace(/\n/g, "").length == 0) {
      Toaster.error("Caption cannot be empty!");
      return;
    }

    const toaster = Toaster.startLoad("Adding your Post..");

    const formData = {
      title,
      content: content.replace(/\n{3,}/g, "\n\n"),
    };

    const URL = `/announcement`;

    const res = await postHandler(URL, formData);

    if (res.statusCode === 201) {
      setContent("");
      setShow(false);
      const announcement: Announcement = res.data.announcement;
      if (setAnnouncements) setAnnouncements((prev) => [announcement, ...prev]);
      Toaster.stopLoad(toaster, "Announcement Added!", 1);
      setShow(false);
    } else {
      if (res.data.message) {
        Toaster.stopLoad(toaster, res.data.message, 0);
      } else {
        Toaster.stopLoad(toaster, SERVER_ERROR, 0);
      }
    }
  };

  const width = useWindowWidth();

  return (
    <>
      <div className="fixed top-24 max-md:top-[calc(50%-75px)] w-[953px] max-lg:w-5/6 h-[560px] max-md:h-2/3 shadow-2xl dark:shadow-none backdrop-blur-xl bg-[#ffffff] dark:bg-[#ffe1fc22] flex flex-col gap-8 justify-between max-md:items-end p-8 max-md:p-6 dark:text-white font-primary overflow-y-auto border-[1px] border-primary_btn  dark:border-dark_primary_btn rounded-lg right-1/2 translate-x-1/2 max-md:-translate-y-1/2 animate-fade_third z-30">
        <div className="flex gap-4 max-md:w-full">
          <Image
            crossOrigin="anonymous"
            className="w-16 h-16 rounded-full"
            width={50}
            height={50}
            alt="user"
            src={`${USER_PROFILE_PIC_URL}/${group.moderator.user.profilePic}`}
          />
          <div className="grow flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <div className="text-2xl font-semibold">
                  {group.moderator.user.name}
                </div>
                <div className="text-sm">@{group.moderator.user.username}</div>
              </div>
              <div
                onClick={handleSubmit}
                className="max-md:hidden w-[120px] h-[48px] bg-primary_comp dark:bg-dark_primary_comp hover:bg-primary_comp_hover dark:hover:bg-dark_primary_comp_hover active:bg-primary_comp_active dark:active:bg-dark_primary_comp_active transition-ease-300 shrink-0 flex-center text-lg font-semibold rounded-lg cursor-pointer"
              >
                Post
              </div>
            </div>

            <div className="w-full flex flex-col gap-4 relative">
              <input
                type="text"
                value={title}
                maxLength={50}
                onChange={(el) => setTitle(el.target.value)}
                className="w-full text-lg font-medium border-[2px] border-dashed p-2 rounded-lg focus:outline-none"
                placeholder="Announcement Title"
              />
              <textarea
                id="textarea_id"
                className="w-full border-[2px] border-dashed p-2 rounded-lg dark:text-white dark:bg-dark_primary_comp focus:outline-none min-h-[16rem] max-h-64 max-md:w-full"
                value={content}
                onChange={(el) => setContent(el.target.value)}
                maxLength={1000}
                placeholder="What's the announcement?"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => setShow(false)}
        className="bg-backdrop w-screen h-screen fixed top-0 left-0 animate-fade_third z-20"
      ></div>
    </>
  );
};

export default NewAnnouncement;
