import React, { useEffect } from "react";
import Header from "@/components/Header";
import GroupChat from "@/components/messaging/GroupChat";
import { useState } from "react";
import { group as initialGroup } from "@/types/initials";
import getHandler from "@/handlers/get_handler";
import Toaster from "@/utils/toaster";
import { SERVER_ERROR } from "@/config/errors";
const index = () => {
  const [groupName, setgroupName] = useState("");
  const [groupDescription, setgroupDescription] = useState("");
  const [group, setGroup] = useState(initialGroup);
  const [loading, setLoading] = useState(true);
  const getGroup = () => {
    // const [coverPicView, setCoverPicView] = useState(
    //   `${USER_COVER_PIC_URL}/${user.coverPic}`
    // );
    const URL = `/group/my`;
    getHandler(URL)
      .then((res) => {
        if (res.statusCode === 200) {
          setGroup(res.data.user);
          console.log(group);

          // setCoverPicView(`${USER_COVER_PIC_URL}/${res.data.user.coverPic}`);
          setLoading(false);
        } else {
          if (res.data.message)
            Toaster.error(res.data.message, "error_toaster");
          else {
            Toaster.error(SERVER_ERROR, "error_toaster");
          }
        }
      })
      .catch((err) => {
        Toaster.error(SERVER_ERROR, "error_toaster");
      });
  };
  useEffect(() => {
    getGroup();
  }, []);

  return (
    <>
      <Header />
      <div className="pt-[4rem] h-[95vh] font-poppins justify-around items-center px-10 flex ">
        <div className="h-full w-[50%] px-3 ">
          <div className="h-[15%] flex justify-start items-center text-3xl">
            Support Group Name
          </div>
          <div className="h-[20%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et dolorum
            similique quod placeat qui amet labore optio fugit sunt vero soluta
            facere doloremque deleniti magnam voluptatibus, nostrum quibusdam
            cupiditate expedita!
          </div>
          <div className="h-[65%]">Member list</div>
        </div>
        <div className="h-full w-[50%]">
          <div className="h-[10%] flex justify-start items-center text-2xl">
            Next Recommended Group
          </div>
          <div className="h-[15%] px-3 flex justify-between items-center">
            <div>New Group Name</div>
            <div>34/50 members</div>
            <div
              // onClick={handleSubmit}
              className="relative inline-flex ml-5 mt-2 items-center justify-center p-4 px-10 py-1 mb-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group cursor-pointer"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                Join
              </span>
              <span className="relative invisible">Join</span>
            </div>
          </div>
          <div className="h-[75%]">
            <GroupChat />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
