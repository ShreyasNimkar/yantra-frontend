import React from "react";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import { CiCirclePlus } from "react-icons/ci";
import moment from "moment";
import CalendarItem from "@/components/common/CalendarItem";
const index = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center">
        <div className="flex w-full h-screen  my-5 px-10 justify-around items-center">
          <div className="w-[50%] h-screen font-semibold">
            <p className="text-4xl h-[10vh]">My Journal</p>
            <p className="text-2xl">April 2024</p>
            <div className="w-full h-full flex flex-col gap-3 justify-start items-start pt-3">
              <CalendarItem />
              <CalendarItem />
              <CalendarItem />
              <CalendarItem />
            </div>
          </div>
          <div className=" w-[50%] flex flex-row h-screen justify-end  items-start text-center">
            <div className="flex h-[10vh] justify-around ">
              <p className="cursor-pointer">
                To vent your heart out, click here &nbsp;
              </p>
              <CiCirclePlus size={25} className="cursor-pointer" />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default index;
