import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { resetConfig } from "@/slices/configSlice";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, userSelector } from "@/slices/userSlice";
interface Props {
  modalVisibility: (visible: boolean) => void;
  visible: boolean;
}
const NavModal = ({ modalVisibility, visible }: Props) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(resetUser());
    dispatch(resetConfig());
    // dispatch(resetCurrentOrg());
    Cookies.remove("id");
    Cookies.remove("token");

    window.location.replace("/login");
  };
  // modal logic
  const handleOnClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget.id === "modalcontainer") modalVisibility(false);
  };

  const router = useRouter();
  const handleMenuClick = (targetId: string) => {
    if (
      router.asPath.split("/")[1] === "events" &&
      targetId !== "events-section"
    )
      router.push("/");

    if (router.asPath.split("/")[1].startsWith("team"))
      router.push(`/#${targetId}`);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const yOffset = 0; // Adjust the yOffset value as per your requirement
      const y =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      modalVisibility(false);
    }
    modalVisibility(false);
  };

  if (!visible) return null;
  return (
    <>
      <div
        onClick={handleOnClose}
        id="modalcontainer"
        className="fixed inset-0 bg-black bg-opacity-[0.6] backdrop-blur-sm flex items-center justify-center z-50"
      >
        <div className="h-[70vh] w-[80vw] font-spaceGrotesk lg:w-[30%]  glassMorphism3 rounded-lg text-3xl lg:text-3xl flex justify-around items-center flex-col">
          <Link
            href={"/group"}
            className="w-[100%] text-white cursor-pointer font-dmSans font-bold tracking-[0.5em] h-[10%] flex justify-around items-center"
          >
            Group
          </Link>

          <Link
            href={"/resources"}
            className="w-[100%] text-white cursor-pointer font-dmSans font-bold tracking-[0.5em] h-[10%] flex justify-around items-center"
          >
            Resources
          </Link>
          <Link
            href={"/events"}
            className="w-[100%] text-white cursor-pointer font-dmSans font-bold tracking-[0.5em] h-[10%] flex justify-around items-center"
          >
            Events
          </Link>
          <Link
            href={"/home"}
            className="w-[100%] text-white cursor-pointer font-dmSans font-bold tracking-[0.5em] h-[10%] flex justify-around items-center"
          >
            Feed
          </Link>
          <Link
            href={"/journal"}
            className="w-[100%] text-white cursor-pointer font-dmSans font-bold tracking-[0.5em] h-[10%] flex justify-around items-center"
          >
            My Journal
          </Link>
          <Link
            href={"/profile"}
            className="w-[100%] text-white cursor-pointer font-dmSans font-bold tracking-[0.5em] h-[10%] flex justify-around items-center"
          >
            Profile
          </Link>

          <div
            onClick={handleLogout}
            className="w-[100%] text-white cursor-pointer font-dmSans font-bold tracking-[0.5em] h-[10%] flex justify-around items-center"
          >
            Log Out
          </div>
        </div>
      </div>
    </>
  );
};

export default NavModal;
