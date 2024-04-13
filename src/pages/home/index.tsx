import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "@/slices/userSlice";
import { useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import Header from "@/components/Header";
import Post from "@/components/uncommon/Post";
import { homeTabSelector, onboardingSelector } from "@/slices/feedSlice";
const index = () => {
  //   useEffect(() => {
  //     if (user.isLoggedIn) {
  //     } else if (!user.isLoggedIn) {
  //       //   sessionStorage.setItem("onboarding-redirect", "home-callback");
  //       window.location.replace("/login");
  //     }
  //   }, []);
  const active = useSelector(homeTabSelector);
  const onboarding = useSelector(onboardingSelector);
  const user = useSelector(userSelector);

  // useEffect(() => {
  //   if (user.isOrganization) window.location.replace("/organisation/home");
  //   else if (user.isLoggedIn && !user.isVerified) {
  //     window.location.replace("/verification");
  //   } else if (user.isLoggedIn && !user.isOnboardingComplete) {
  //     sessionStorage.setItem("onboarding-redirect", "home-callback");
  //     window.location.replace("/onboarding");
  //   }
  // }, []);
  return (
    <>
      <Header />
      <div className="pt-[4rem] flex flex-row w-full ">
        <div className="max-sm:hidden sm:w-[20%] h-screen">sss</div>
        <div className="w-full sm:w-[60%] h-full py-5 px-10 gap-y-3 flex flex-col  justify-start items-baseline gap-1">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
        <div className="max-sm:hidden sm:w-[20%] h-screen">sss</div>
      </div>
    </>
  );
};

export default index;
