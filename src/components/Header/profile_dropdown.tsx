import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, userSelector } from "@/slices/userSlice";
import Image from "next/image";
import { USER_PROFILE_PIC_URL } from "@/config/routes";
// import { ArrowRight } from '@phosphor-icons/react';
import { resetConfig } from "@/slices/configSlice";
// import { resetCurrentOrg } from '@/slices/orgSlice';

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileDropdown = ({ setShow }: Props) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(resetUser());
    dispatch(resetConfig());
    // dispatch(resetCurrentOrg());
    Cookies.remove("id");
    Cookies.remove("token");

    window.location.replace("/login");
  };

  const user = useSelector(userSelector);
  return (
    <>
      <div className="w-64 max-md:border-b-[1px] max-md:border-primary_black bg-gray-50 max-md:bg-white bg-opacity-60 font-primary max-md:w-full max-h-[480px] max-md:max-h-none overflow-y-auto fixed top-[72px] max-md:top-0 right-4 max-md:right-0 rounded-xl max-md:rounded-none backdrop-blur-lg backdrop p-2 z-[150] animate-fade_third">
        <div className="w-full group flex-center gap-3   cursor-pointer transition-ease-200 hover:bg-gray-100 dark:hover:bg-[#52525246]">
          {/* <Image
            crossOrigin="anonymous"
            width={50}
            height={50}
            alt={"User Pic"}
            // src={`${USER_PROFILE_PIC_URL}/${user.profilePic}`}
            src={""}
            className={"rounded-full w-12 h-12 cursor-default"}
          /> */}
          <Link href={"/profile"} className="flex flex-col">
            Profile
          </Link>
        </div>

        <div
          onClick={handleLogout}
          className="w-full flex-center   cursor-pointer transition-ease-200 hover:bg-gray-100 dark:hover:bg-[#52525246]"
        >
          Log Out
        </div>
      </div>
      <div
        onClick={() => setShow(false)}
        className="backdrop-brightness-75 w-screen h-screen fixed top-0 left-0 z-[100] animate-fade_third"
      ></div>
    </>
  );
};

export default ProfileDropdown;
