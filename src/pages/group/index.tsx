import React, { useEffect } from "react";
import Header from "@/components/Header";
import GroupChat from "@/components/messaging/GroupChat";
import { useState } from "react";
import { group as initialGroup } from "@/types/initials";
import getHandler from "@/handlers/get_handler";
import Toaster from "@/utils/toaster";
import { SERVER_ERROR } from "@/config/errors";
import UserHoverCard from "@/components/common/user_hover_card";
import FollowBtn from "@/components/common/follow_btn";
import Image from "next/image";
import { User } from "@/types";
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
          setGroup(res.data.group);
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

  interface UserProps {
    user: User;

    title?: string;
  }
  const AboutUser = ({
    user,

    title,
  }: UserProps) => (
    <div className="relative">
      <div className="w-full  flex gap-2 items-center justify-between">
        <div className="w-fit flex justify-start items-center gap-2 group">
          <UserHoverCard user={user} title={title} />
          {/* <Image
            width={50}
            height={50}
            src={`${USER_PROFILE_PIC_URL}/${user.profilePic}`}
            alt=""
            className={`${
              host ? "w-8 h-8" : "w-6 h-6"
            } rounded-full cursor-pointer`}
          /> */}
          <div className={`w-fit text-base cursor-pointer`}>{user.name}</div>
        </div>
        <FollowBtn toFollowID={user.id} smaller={true} />
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="pt-[4rem] h-[95vh] font-poppins justify-around items-center px-10 flex ">
        <div className="h-full w-[50%] px-3 ">
          <div className="h-[15%] flex justify-start items-center text-3xl">
            {group.title}
          </div>
          <div className="h-[20%]">{group.description}</div>
          <div className="h-[65%] ">
            <p className="text-2xl border-b-2 border-black mb-2">Member List</p>
            {group.memberships.map((membership, index) => (
              <div key={index} className="py-1">
                <AboutUser user={membership.user} />
              </div>
            ))}
          </div>
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
              className="relative inline-flex ml-5 mt-2 items-center justify-center p-4 px-10 py-1 mb-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-black rounded-full shadow-md group cursor-pointer"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-black group-hover:translate-x-0 ease">
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
              <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">
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
