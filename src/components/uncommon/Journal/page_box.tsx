import React from "react";
import moment from "moment";
import { Page } from "@/types";

interface Props {
  page: Page;
  setClickedPage: React.Dispatch<React.SetStateAction<Page | undefined>>;
  setShowPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const PageBox = ({ page, setClickedPage, setShowPage }: Props) => {
  return (
    <>
      <div
        onClick={() => {
          setClickedPage(page);
          setShowPage(true);
        }}
        className="flex font-poppins font-poppins gap-x-5 w-full items-center cursor-pointer"
      >
        Page:
        {page.title}
      </div>
    </>
  );
};

export default PageBox;
