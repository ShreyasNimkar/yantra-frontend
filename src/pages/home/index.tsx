import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "@/slices/userSlice";
import { useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import Post from "@/components/common/Post";
const Home = () => {
  const user = useSelector(userSelector);

  //   useEffect(() => {
  //     if (user.isLoggedIn) {
  //     } else if (!user.isLoggedIn) {
  //       //   sessionStorage.setItem("onboarding-redirect", "home-callback");
  //       window.location.replace("/login");
  //     }
  //   }, []);
  return (
    <>
      <Navbar />
      <div className="flex flex-row w-full ">
        <div className="w-[20%] h-screen"></div>
        <div className="w-[60%] h-full p-5 flex flex-col  justify-start items-baseline gap-1">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
        <div className="w-[20%] h-screen"></div>
      </div>
    </>
  );
};

export default Home;
