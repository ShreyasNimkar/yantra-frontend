import React from "react";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import ResourceFile from "@/components/common/ResourceFile";
import { CiCirclePlus } from "react-icons/ci";
const index = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center">
        <div className="flex w-full h-[10vh] flex-row my-5 px-10 justify-around items-center">
          <div className="w-[50%] h-full flex items-center text-4xl font-semibold">
            Resources
          </div>
          <div className=" w-[50%] h-full flex items-center justify-end text-center">
            <p className="cursor-pointer">
              To upload a file, click here &nbsp;
            </p>
            <CiCirclePlus size={25} className="cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="w-full h-full px-10 pt-5 flex flex-row justify-around items-center flex-wrap gap-5">
        <ResourceFile />
        <ResourceFile />
        <ResourceFile />
        <ResourceFile />
        <ResourceFile />
        <ResourceFile />
        <ResourceFile />
        <ResourceFile />
      </div>
    </>
  );
};

export default index;
