import React, { useEffect } from "react";
import { ReactSVG } from "react-svg";
// import Eye from '@phosphor-icons/react/dist/icons/Eye';
// import EyeClosed from '@phosphor-icons/react/dist/icons/EyeClosed';
import { useState } from "react";
import Toaster from "@/utils/toaster";
import Cookies from "js-cookie";
import { BACKEND_URL } from "@/config/routes";
import { useDispatch } from "react-redux";
import { setPasswordSetupStatus, setUser } from "@/slices/userSlice";
import Head from "next/head";
import { GetServerSidePropsContext } from "next/types";
import nookies from "nookies";
import configuredAxios from "@/config/axios";
import { resetConfig } from "@/slices/configSlice";
import { User } from "@/types";
import Image from "next/image";
// import socketService from "@/config/ws";
import { SERVER_ERROR } from "@/config/errors";
// import useUserStateFetcher from "@/hooks/user_fetcher";
// import { Buildings } from "@phosphor-icons/react";
import Link from "next/link";
import RegistrationButton from "@/components/buttons/registration_btn";

import { Boxes } from "@/components/common/Background";
import { cn } from "@/utils/cn";
import { Eye, EyeClosed } from "@phosphor-icons/react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mutex, setMutex] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  // const userStateFetcher = useUserStateFetcher();

  const handleSubmit = async (el: React.FormEvent<HTMLFormElement>) => {
    el.preventDefault();
    if (mutex) return;
    setMutex(true);
    const formData = {
      username,
      password,
    };
    const toaster = Toaster.startLoad("Logging In");

    await configuredAxios
      .post(`${BACKEND_URL}/login`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          Toaster.stopLoad(toaster, "Logged In!", 1);
          const user: User = res.data.user;
          user.email = res.data.email;
          user.phoneNo = res.data.phoneNo || "";

          Cookies.set("token", res.data.token, {
            expires: Number(process.env.NEXT_PUBLIC_COOKIE_EXPIRATION_TIME),
          });
          Cookies.set("id", user.id, {
            expires: Number(process.env.NEXT_PUBLIC_COOKIE_EXPIRATION_TIME),
          });
          dispatch(setUser(user));
          dispatch(resetConfig());
          dispatch(
            setPasswordSetupStatus(res.data.isPasswordSetupComplete || false)
          );
          // socketService.connect(user.id);
          // userStateFetcher();
          if (user.isVerified) {
            Cookies.set("verified", "true");
            window.location.replace("/");
          } else window.location.assign("/verification");
        }
        setMutex(false);
      })
      .catch((err) => {
        if (err.response?.data?.message)
          Toaster.stopLoad(toaster, err.response.data.message, 0);
        else {
          Toaster.stopLoad(toaster, SERVER_ERROR, 0);
        }
        setMutex(false);
      });
  };

  const handleGoogleLogin = () => {
    window.location.assign(`${BACKEND_URL}/auth/google`);
  };

  useEffect(() => {
    const msg = new URLSearchParams(window.location.search).get("msg");

    if (msg && msg == "nouser")
      Toaster.error("No account with this email id exists.");
  }, [window.location.search]);

  return (
    <>
      <Boxes />

      <Head>
        <title>Login | Website </title>
      </Head>

      <div className="h-full flex ">
        <div className="w-[100%] max-lg:w-full h-full min-h-screen font-primary py-8 px-8 flex  justify-around items-center ">
          <form
            onSubmit={handleSubmit}
            className="w-[35%] px-10 py-10 bg-white absolute border-2 border-black rounded-xl max-md:w-full flex flex-col items-center gap-6"
          >
            <div className="">
              <Image
                alt="logo"
                src={"/LogoBlack.svg"}
                width={1000}
                height={1000}
                className="h-[5vh]"
              />
            </div>
            <div className="flex flex-col gap-2 text-center">
              <div className="text-2xl font-semibold">Welcome Back !</div>
            </div>

            <div className="w-full flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="font-medium">Username</div>
                <input
                  name="username"
                  value={username}
                  onChange={(el) => setUsername(el.target.value)}
                  type="text"
                  className="w-full bg-white focus:outline-none border-2 p-2 rounded-xl text-gray-400"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-medium">Password</div>
                <div className="w-full relative">
                  <input
                    name="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(el) => setPassword(el.target.value)}
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-white p-2 rounded-xl focus:outline-none focus:bg-white border-2 text-gray-400 pr-10"
                  />
                  {showPassword ? (
                    <Eye
                      onClick={() => setShowPassword(false)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                      size={20}
                      weight="regular"
                    />
                  ) : (
                    <EyeClosed
                      onClick={() => setShowPassword(true)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                      size={20}
                      weight="regular"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="w-full p-1 flex flex-col gap-2 items-center">
              <RegistrationButton />
              <div
                onClick={() => window.location.assign("/signup")}
                className="text-gray-400 text-sm cursor-pointer"
              >
                Don&apos;t have an Account?{" "}
                <span className="font-medium underline underline-offset-2">
                  Sign Up
                </span>
              </div>
              <div
                onClick={() => window.location.assign("/forgot_password")}
                className="text-gray-400 font-medium hover:underline hover:underline-offset-2 text-sm cursor-pointer"
              >
                Forgot Password?
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = nookies.get(context).token;
  if (token && process.env.NODE_ENV != "development") {
    return {
      redirect: {
        permanent: true,
        destination: "/home",
      },
      props: { token },
    };
  }
  return {
    props: {},
  };
};

export default Login;
