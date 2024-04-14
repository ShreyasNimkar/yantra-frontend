import React, { useEffect } from "react";
import Header from "@/components/Header";
import LineGraph from "@/components/charts/lineGraph";
import getHandler from "@/handlers/get_handler";
import { user as initialUser } from "@/types/initials";
import { useState } from "react";
import Toaster from "@/utils/toaster";
import { SERVER_ERROR } from "@/config/errors";
import Image from "next/image";
import { USER_PROFILE_PIC_URL } from "@/config/routes";

const index = () => {
  const [user, setUser] = useState(initialUser);
  const [tagline, setTagline] = useState("");
  const [coverPic, setCoverPic] = useState<File>();
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState(user.tags || []);
  const getUser = () => {
    // const [coverPicView, setCoverPicView] = useState(
    //   `${USER_COVER_PIC_URL}/${user.coverPic}`
    // );
    const URL = `/user/me`;
    getHandler(URL)
      .then((res) => {
        if (res.statusCode === 200) {
          setUser(res.data.user);
          console.log(user);
          setTagline(res.data.user.tagline);
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
    getUser();
  }, []);
  const dataSet = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    values: [65, 59, 80, 81, 56, 55, 40],
  };
  return (
    <>
      <Header />
      <div className="pt-[4rem] font-poppins px-10">
        <div className="flex py-12 gap-4">
          <div className="h-full flex justify-around items-center">
            <Image
              width={200}
              height={200}
              src={`${USER_PROFILE_PIC_URL}/${user.profilePic}`}
              alt=""
              className="w-32 h-32 rounded-full"
            />
          </div>
          <div className="h-full flex flex-col gap-4 justify-start items-start pt-3">
            <div>
              <div className="text-3xl h-[15%]">{user.name}</div>
              <div className="text-base">@{user.username}</div>
            </div>

            <div className="text-base">{user.bio}</div>
            <div className="text-base">{user.tags}</div>
          </div>
        </div>
        <div className="h-[55vh]  flex">
          <div className="h-full w-[50%] p-10">
            <LineGraph />
          </div>
          {/* <div className="h-full w-[50%] flex justify-center items-center ">
            <PolarGraph />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default index;
