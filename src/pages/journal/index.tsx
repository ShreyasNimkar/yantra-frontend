import React, { useState } from "react";
import Header from "@/components/Header";
import { CiCirclePlus } from "react-icons/ci";
import moment from "moment";
import CalendarItem from "@/components/uncommon/CalendarItem";

const Index = () => {
  const [showJournal, setShowJournal] = useState(false);
  const [journalText, setJournalText] = useState("");

  return (
    <>
      <Header />
      <div className="pt-[4rem] flex justify-center items-center w-full">
        <div className="flex w-full h-full my-5 px-10 justify-around items-center">
          <div className="w-[50%] h-full font-semibold">
            <p className="text-4xl h-[10vh]">My Journal</p>
          </div>
          <div className="w-[50%] flex flex-col h-full justify-end items-start">
            <div
              onClick={() => {
                setShowJournal(true);
              }}
              className="flex h-[10vh] justify-around cursor-pointer"
            >
              <p>To vent your heart out, click here &nbsp;</p>
              <CiCirclePlus size={25} />
            </div>
          </div>
        </div>
      </div>
      <p className="text-2xl py-3 px-10">April 2024</p>
      <div className="w-full h-full flex flex-col gap-3 px-10 justify-start items-start pt-3">
        <CalendarItem />
        <CalendarItem />
        <CalendarItem />
        <CalendarItem />
      </div>
      {showJournal && (
        <div
          onClick={() => {
            setShowJournal(false);
          }}
          className="fixed top-0 left-0 w-full h-full flex animate-fade_1 justify-center items-center bg-blue-700 bg-opacity-40 transition-all ease-in duration-500"
        ></div>
      )}{" "}
      <div
        className={`${
          showJournal ? "right-0 " : "-right-[75%] "
        } bg-white h-full w-[60%] transition-all duration-500 ease-in-out absolute z-10 top-0 `}
      >
        asd
      </div>
    </>
  );
};

export default Index;
