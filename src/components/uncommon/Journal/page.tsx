import { SERVER_ERROR } from "@/config/errors";
import patchHandler from "@/handlers/patch_handler";
import postHandler from "@/handlers/post_handler";
import { Page as PageType } from "@/types";
import Toaster from "@/utils/toaster";
import React, { useState } from "react";
import moment from "moment";
import BuildButton from "@/components/buttons/build_btn";
import EmojiScale from "@/components/uncommon/EmojiScale";
interface Props {
  page?: PageType;
  show: boolean;
  setShowNewJournalOption: React.Dispatch<React.SetStateAction<boolean>>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setPages: React.Dispatch<React.SetStateAction<PageType[]>>;
}

const Page = ({
  setShowNewJournalOption,
  page,
  show,
  setShow,
  setPages,
}: Props) => {
  const [formattedDate, setFormattedDate] = useState(
    moment().format("ddd, DD MMMM, YYYY [at] hh:mm a")
  );
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
      const newPage: PageType = res.data.page;
      if (page)
        setPages((prev) =>
          prev.map((p) => {
            if (p.id == page.id) return newPage;
            else return p;
          })
        );
      else setPages((prev) => [newPage, ...prev]);
      setShowNewJournalOption(false);
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
      } bg-white h-full font-poppins w-[50%]  transition-all duration-500 ease-in-out absolute z-10 top-[4rem] shadow-lg border-l-[1px] border-black px-3 py-3`}
    >
      <div className="h-[7.5%] text-2xl underline underline-offset-[3px]">
        {formattedDate}
      </div>
      <textarea
        id="textarea_id"
        className="w-full bg-transparent text-center border-[1px] rounded-lg p-1 text-xl flex justify-center items-center focus:outline-none h-[10%]"
        value={title}
        onChange={(el) => setTitle(el.target.value)}
        placeholder="Give a suitable title..."
        style={{ resize: "none" }}
      ></textarea>

      <textarea
        style={{ resize: "none" }}
        id="textarea_id"
        className="w-full bg-transparent border-[1px] rounded-lg p-3 focus:outline-none h-[50%]"
        value={content}
        onChange={(el) => setContent(el.target.value)}
        maxLength={2000}
        placeholder="Start a conversation..."
      ></textarea>
      <div className="h-[10%] flex justify-around flex-col items-center">
        <div>Tell us how you feel right now ?</div>
        <EmojiScale />
      </div>
      <div className="w-full flex justify-center items-center">
        <div
          onClick={handleSubmit}
          className="relative inline-flex ml-5 mt-2 items-center justify-center p-4 px-16 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-black rounded-full shadow-md group cursor-pointer"
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-black group-hover:translate-x-0 ease">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">
            Submit
          </span>
          <span className="relative invisible">Submit</span>
        </div>
      </div>
    </div>
  );
};

export default Page;
