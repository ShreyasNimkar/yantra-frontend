import GroupChat from "@/components/messaging/GroupChat";
import MainWrapper from "@/wrappers/main";
import React from "react";

const Messaging = () => {
  return (
    <MainWrapper>
      <div
        className={`w-fit h-[calc(100vh-65px)] max-lg:h-fit mx-auto flex max-lg:flex-col ${"gap-2"} transition-ease-out-500 font-primary`}
      >
        <div className="w-[37.5vw] max-lg:w-screen h-full flex flex-col pt-4 pl-4 max-lg:pl-0 gap-4 ">
          <div className="w-full flex items-center justify-between max-lg:px-4 relative">
            <div className="text-3xl font-extrabold text-gradient">
              Messaging
            </div>
          </div>
          <div className="w-full h-full overflow-y-auto">Another Div</div>
        </div>
        <div
          className={`w-[37.5vw] max-lg:w-screen h-full max-lg:h-base sticky max-lg:fixed top-navbar p-2 max-lg:p-0 
          z-40 max-lg:z-30`}
        >
          <GroupChat />
        </div>
      </div>
    </MainWrapper>
  );
};

export default Messaging;
