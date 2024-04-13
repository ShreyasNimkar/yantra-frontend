import React from "react";
import Header from "@/components/Header";
const index = () => {
  return (
    <>
      <Header />
      <div className="pt-[4rem] h-[95vh]  justify-around items-center px-10 flex ">
        <div className="h-full w-[50%]">
          <div className="h-[15%]">Support Group Name</div>
          <div className="h-[20%]">desc</div>
          <div className="h-[65%]">Member list</div>
        </div>
        <div className="h-full w-[50%]">Group Chats</div>
      </div>
    </>
  );
};

export default index;
