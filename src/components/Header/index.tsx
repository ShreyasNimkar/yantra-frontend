import React, { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import ProfileDropdown from "./profile_dropdown";
import Image from "next/image";
import { useWindowHeight } from "@react-hook/window-size";
import { useRouter } from "next/router";
import NavModal from "./navModal";
import Link from "next/link";
import { CustomFlowbiteTheme, Dropdown } from "flowbite-react";
import DropdownMenuDemo from "./Dropdown";
const index = () => {
  const [clickedOnProfile, setClickedOnProfile] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`hidden fixed border-b-2 border-black bg-white top-0 lg:flex justify-between items-center w-full z-20 h-[4rem] px-16 text-black  transition-all duration-300 ease-in-out`}
      >
        <Link
          href={"/group"}
          className="w-[20%] cursor-pointer font-dmSans font-bold tracking-[0.5em] h-full flex justify-around items-center"
        >
          <Image
            alt="logo"
            src={"/LogoBlack.svg"}
            width={1000}
            height={1000}
            className="h-[3vh]"
          />
        </Link>
        <div className="w-[60%] h-full flex justify-center gap-10 items-center">
          <Link
            className="cursor-pointer hover-underline-animation font-semibold text-lg"
            href={"/home"}
          >
            Feed
          </Link>
          <Link
            className="cursor-pointer relative hover-underline-animation font-semibold text-lg"
            href={"/events"}
          >
            <div>Events</div>
          </Link>
          <Link
            className="cursor-pointer hover-underline-animation font-semibold text-lg"
            href={"/resources"}
          >
            Resources
          </Link>
        </div>
        <div className="w-[20%] h-full flex gap-10 items-center justify-end  font-semibold text-lg">
          {/* <div
                        className="cursor-pointer hover-underline-animation"
                        onClick={() => handleMenuClick('patrons-section')}
                    >
                        Patrons
                    </div> */}
          <Link
            className="cursor-pointer hover-underline-animation"
            href={"/journal"}
          >
            My Journal
          </Link>

          {/* <div
            className="cursor-pointer rounded-3xl p-5 bg-red-400"
            onClick={() => {
              setClickedOnProfile(true);
            }}
          ></div>
          <div className={`${clickedOnProfile ? "w-0 h-0" : "hidden w-0 h-0"}`}>
            <ProfileDropdown setShow={setClickedOnProfile} />
          </div> */}
          <DropdownMenuDemo />
        </div>
      </div>

      <div
        className={`fixed top-0 z-30 flex lg:hidden  justify-around items-center w-full h-[7.5vh] text-black `}
      >
        <div
          onClick={() => {
            router.push("/");
          }}
          className="w-[20%] h-full flex justify-around items-center"
        >
          <Image
            src="/SmallLogoBlack.svg"
            alt="logo"
            height={10000}
            width={10000}
            className="w-12 p-3 object-cover cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
        <div className="w-[60%] "></div>
        <div
          onClick={() => {
            setModalVisibility(true);
          }}
          className="w-[20%] h-full flex justify-around items-center"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28 13.3335H4"
              stroke="#000000"
              strokeWidth="2.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M28 8H4"
              stroke="#000000"
              strokeWidth="2.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M28 18.6665H4"
              stroke="#000000"
              strokeWidth="2.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M28 24H4"
              stroke="#000000"
              strokeWidth="2.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {modalVisibility !== false && (
        <NavModal
          modalVisibility={setModalVisibility}
          visible={true}
          // setModalDataFunc={() => {
          //     setModalData();
          // }}
        />
      )}
    </>
  );
};

export default index;
