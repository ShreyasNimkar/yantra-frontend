import { SERVER_ERROR } from "@/config/errors";
import patchHandler from "@/handlers/patch_handler";
import postHandler from "@/handlers/post_handler";
import { Page } from "@/types";
import Toaster from "@/utils/toaster";
import React, { useState } from "react";

interface Props {
  page?: Page;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setPages: React.Dispatch<React.SetStateAction<Page[]>>;
}

const Page = ({ page, show, setShow, setPages }: Props) => {
  const [title, setTitle] = useState(page ? page.title : "");
  const [content, setContent] = useState(page ? page.content : "");

  const handleSubmit = async () => {
    if (title.trim() == "") {
      Toaster.error("Title cannot be empty!");
      return;
    }
    if (content.trim() == "" || content.replace(/\n/g, "").length == 0) {
      Toaster.error("Caption cannot be empty!");
      return;
    }

    const toaster = Toaster.startLoad("Updating your Journal..");

    const formData = {
      title,
      content: content.replace(/\n{3,}/g, "\n\n"),
    };

    const URL = `/journal${page ? `/${page.id}` : ""}`;

    const res = page
      ? await patchHandler(URL, formData)
      : await postHandler(URL, formData);

    if (page ? res.statusCode === 200 : res.statusCode == 201) {
      const newPage: Page = res.data.page;
      if (page)
        setPages((prev) =>
          prev.map((p) => {
            if (p.id == page.id) return newPage;
            else return p;
          })
        );
      else setPages((prev) => [newPage, ...prev]);
      Toaster.stopLoad(toaster, "Journal Updated!", 1);
      setShow(false);
    } else {
      if (res.data.message) {
        Toaster.stopLoad(toaster, res.data.message, 0);
      } else {
        Toaster.stopLoad(toaster, SERVER_ERROR, 0);
      }
    }
  };

  return (
    <div
      className={`${
        show ? "right-0 " : "-right-[75%] "
      } bg-white h-full w-[50%] transition-all duration-500 ease-in-out absolute z-10 top-[4rem] shadow-lg border-l-[1px] border-black`}
    >
      <textarea
        id="textarea_id"
        className="w-full bg-transparent focus:outline-none min-h-[154px]"
        value={title}
        onChange={(el) => setTitle(el.target.value)}
        maxLength={50}
        placeholder="your title here"
      ></textarea>

      <textarea
        id="textarea_id"
        className="w-full bg-transparent focus:outline-none min-h-[154px]"
        value={content}
        onChange={(el) => setContent(el.target.value)}
        maxLength={2000}
        placeholder="Start a conversation..."
      ></textarea>
      <div onClick={handleSubmit}>Submit</div>
    </div>
  );
};

export default Page;
