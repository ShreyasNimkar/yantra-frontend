import React from "react";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";

import LineGraph from "@/components/charts/lineGraph";
import { PolarGraph } from "@/components/charts/polarGraph";
const index = () => {
  const dataSet = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    values: [65, 59, 80, 81, 56, 55, 40],
  };
  return (
    <>
      <Header />
      <div className="pt-[4rem] px-10">
        <div className="h-[35vh] bg-violet-500 flex">
          <div className="h-full flex justify-around items-center w-[30%]">
            <div className="w-[10rem] h-[10rem] bg-zinc-600 rounded-full"></div>
          </div>
          <div className="h-full w-[70%] flex flex-col justify-start items-start pt-3">
            <div className="text-3xl h-[20%]">Name</div>
            <div className="text-base ">@username</div>
            <div className="text-base ">Bio</div>
            <div></div>
          </div>
        </div>
        <div className="h-[55vh] bg-violet-400 flex">
          <div className="h-full w-[50%] p-10">
            <LineGraph />
          </div>
          <div className="h-full w-[50%] flex justify-center items-center ">
            <PolarGraph />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
