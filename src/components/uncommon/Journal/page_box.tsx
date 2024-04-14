import React from "react";
import moment from "moment";
import { Page } from "@/types";
import Link from "next/link";
import { MapPin } from "@phosphor-icons/react";

interface Props {
  page: Page;
  setClickedPage: React.Dispatch<React.SetStateAction<Page | undefined>>;
  setShowPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const PageBox = ({ page, setClickedPage, setShowPage }: Props) => {
  const startTime = moment();

  return (
    <>
      <div
        onClick={() => {
          setClickedPage(page);
          setShowPage(true);
        }}
        className="w-1/5 flex flex-col gap-2 border-[1px] p-4 items-center bg-white rounded-xl hover:shadow-xl transition-ease-300 cursor-pointer"
      >
        <div className="text-sm text-gray-300">
          {moment(page.createdAt).fromNow()}
        </div>
        <div className="text-lg font-semibold">{page.title}</div>
        <div className="text-gray-600 line-clamp-6">{page.content}</div>
      </div>
    </>
  );
};

export default PageBox;
