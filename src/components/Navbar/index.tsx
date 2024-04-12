import React from "react";
import ProfileDropdown from "./profile_dropdown";
import { useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import Link from "next/link";
const index = () => {
  const [clickedOnProfile, setClickedOnProfile] = useState(false);
  const [clickedOnFeedback, setClickedOnFeedback] = useState(false);

  return (
    <>
      <div className="w-full h-[7.5vh] bg-slate-500 flex flex-row ">
        <div className="w-[20%]">asd</div>
        <div className="w-[60%] flex flex-row h-full justify-center gap-10 items-center">
          <Link className="cursor-pointer" href={"/home"}>
            Feed
          </Link>
          <Link className="cursor-pointer" href={"/events"}>
            Events
          </Link>
          <Link className="cursor-pointer" href={"/resources"}>
            Resources
          </Link>
        </div>
        <div className="w-[20%] flex justify-center gap-3 items-center">
          <div>
            <IoIosNotifications
              size={35}
              color="#ffffffff"
              className="cursor-pointer"
            />
          </div>
          <div
            className="cursor-pointer rounded-3xl p-5 bg-red-400"
            onClick={() => {
              setClickedOnProfile(true);
            }}
          ></div>
          <div className={`${clickedOnProfile ? "w-0 h-0" : "hidden w-0 h-0"}`}>
            <ProfileDropdown setShow={setClickedOnProfile} />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
