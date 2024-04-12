import React from "react";
import Navbar from "@/components/Navbar";
import { CiCirclePlus } from "react-icons/ci";
const index = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="flex w-full h-[10vh] flex-row my-5 px-10 justify-around items-center">
          <div className="w-[50%] h-full flex items-center text-4xl font-semibold">
            My Journal
          </div>
          <div className=" w-[50%] h-full flex items-center justify-end text-center">
            <p className="cursor-pointer">
              To vent your heart out, click here &nbsp;
            </p>
            <CiCirclePlus size={25} className="cursor-pointer" />
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default index;
