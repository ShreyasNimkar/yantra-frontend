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

  const AboutEvent = () => (
    <div className="w-3/5 max-md:w-full flex flex-col gap-6">
      <div className="w-full flex justify-between items-center">
        <div className="w-full flex flex-col gap-2">
          <div className="flex gap-3 items-center">
            <div className="w-12 h-12 bg-gray-100 flex flex-col rounded-xl text-center p-1">
              <div className="w-full h-2/5 flex-center text-xxs uppercase">
                {moment(startTime).format("MMM")}
              </div>
              <div className="w-full h-3/5 bg-gray-200 flex-center rounded-t-sm rounded-b-lg">
                {moment(startTime).format("DD")}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="font-medium">
                {moment(startTime).format("dddd")}
              </div>
              <div className="text-sm">Title: {page.title}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        onClick={() => {
          setClickedPage(page);
          setShowPage(true);
        }}
        className="flex  font-poppins gap-x-5 w-full items-center cursor-pointer"
      >
        {/* Page:
        {page.title} */}
        <AboutEvent />
      </div>
    </>
  );
};

export default PageBox;
