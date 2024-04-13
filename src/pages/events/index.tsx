import React from "react";
import Header from "@/components/Header";
import Post from "@/components/uncommon/Post";
import EventCard from "@/components/uncommon/EventCard";
const index = () => {
  return (
    <>
      <Header />
      <div className="flex w-full min-h-max  pt-[4rem]">
        <div className="w-full h-full">
          <div className="w-full flex-wrap flex sm:w-[100%] h-max py-5 px-10   flex-row  justify-around items-baseline gap-3 gap-y-5">
            <EventCard /> <EventCard /> <EventCard /> <EventCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
