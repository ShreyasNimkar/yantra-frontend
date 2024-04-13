import React from "react";
import JoinButton from "@/components/buttons/join_btn";
const index = () => {
  return (
    <>
      <div className="bg-gray-600 h-[15rem] w-[100%] sm:w-[30%] p-3 rounded-lg">
        <div className="h-[100%] flex flex-col justify-start items-start gap-1">
          <div className="text-2xl py-1">eventname</div>
          <div className="line-clamp-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque
            excepturi, fugiat quo praesentium rerum accusamus? Possimus, unde!
            Adipisci fugiat repellendus dicta in natus aliquid? Dolor
            reprehenderit facilis voluptatibus sint temporibus.
          </div>
          <div>event date | event time</div>
        </div>
      </div>
    </>
  );
};

export default index;
