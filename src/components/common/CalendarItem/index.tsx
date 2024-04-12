import React from "react";
import moment from "moment";
const index = () => {
  const eventData = {
    endTime: "2024-04-13T18:00:00", // Sample end time for the event
    // Add other event details as needed
  };
  return (
    <>
      <div className="flex font-poppins w-full items-center">
        <div className="w-[10%] h-full bg-transparent border-2 border-purple-400 flex flex-col rounded-xl text-center ">
          <div className="w-full h-2/5 flex-center text-xxs uppercase">
            {moment(eventData.endTime).format("MMM")}
          </div>
          <div className="w-full h-3/5 bg-transparent flex-center rounded-t-sm rounded-b-lg">
            {moment(eventData.endTime).format("DD")}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="font-medium">
            {moment(eventData.endTime).format("dddd")}
          </div>
          <div className="text-sm">
            {moment(eventData.endTime).format("ha, DD MMMM")}
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
