import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { CiCirclePlus } from "react-icons/ci";
import moment from "moment";
import CalendarItem from "@/components/uncommon/Journal/page_box";
import MainWrapper from "@/wrappers/main";
import getHandler from "@/handlers/get_handler";
import { Page } from "@/types";
import Toaster from "@/utils/toaster";
import { SERVER_ERROR } from "@/config/errors";
import PageComponent from "@/components/uncommon/Journal/page";
import PageBox from "@/components/uncommon/Journal/page_box";
import Loader from "@/components/common/loader";
import { page } from "@/types/initials";

const Index = () => {
  const [showNewJournalOption, setShowNewJournalOption] = useState(false);
  const [showPage, setShowPage] = useState(false);
  const [clickedPage, setClickedPage] = useState<Page | undefined>(undefined);

  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPages = () => {
    const URL = `/journal`;
    getHandler(URL)
      .then((res) => {
        if (res.statusCode === 200) {
          const pagesData: Page[] = res.data.pages || [];
          setPages(pagesData);

          if (
            (pagesData.length > 0 &&
              moment(pagesData[0].createdAt).isBefore(
                moment().startOf("day")
              )) ||
            pagesData.length == 0
          )
            setShowNewJournalOption(true);

          setLoading(false);
        } else {
          if (res.data.message)
            Toaster.error(res.data.message, "error_toaster");
          else {
            Toaster.error(SERVER_ERROR, "error_toaster");
          }
        }
      })
      .catch((err) => {
        Toaster.error(SERVER_ERROR, "error_toaster");
      });
  };

  useEffect(() => {
    fetchPages();
  }, []);

  return (
    <MainWrapper>
      <div>
        <div className="flex font-poppins w-full h-[10vh] flex-row my-5 justify-between items-center">
          <div className="h-full flex items-center text-5xl font-semibold">
            My Journal
          </div>
          {showNewJournalOption && (
            <div className="flex flex-col h-full justify-center items-center">
              <div
                onClick={() => {
                  setClickedPage(undefined);
                  setShowPage(true);
                }}
                className="flex justify-around cursor-pointer"
              >
                <p>To vent your heart out today, click here &nbsp;</p>
                <CiCirclePlus size={25} />
              </div>
            </div>
          )}
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <p className="text-2xl">April 2024</p>
          <div className="w-full h-full flex flex-col gap-3 px-10 justify-start items-start pt-3">
            {pages.map((page) => {
              return (
                <>
                  <PageBox
                    page={page}
                    setClickedPage={setClickedPage}
                    setShowPage={setShowPage}
                  />
                </>
              );
            })}
          </div>
          {showPage && (
            <PageComponent
              page={clickedPage}
              show={showPage}
              setShow={setShowPage}
              setPages={setPages}
            />
          )}

          {showPage && (
            <div
              onClick={() => {
                setShowPage(false);
              }}
              className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-backdrop backdrop-blur-sm opacity-40 transition-all ease-in duration-300"
            ></div>
          )}
        </>
      )}
    </MainWrapper>
  );
};

export default Index;
