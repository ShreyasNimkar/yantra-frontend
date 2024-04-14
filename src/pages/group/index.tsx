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
import { Group, User } from "@/types";
import { USER_PROFILE_PIC_URL } from "@/config/routes";

const Group = () => {
  const [group, setGroup] = useState(initialGroup);
  const [loading, setLoading] = useState(true);

  const [groups, setGroups] = useState<Group[]>([]);

  const getGroup = () => {
    // const [coverPicView, setCoverPicView] = useState(
    //   `${USER_COVER_PIC_URL}/${user.coverPic}`
    // );
    const URL = `/group/my`;
    getHandler(URL)
      .then((res) => {
        if (res.statusCode === 200) {
          setGroup(res.data.group);

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
    getRecommendedGroups();
  }, []);

  const getRecommendedGroups = () => {
    const URL = `group/recommended`;
    getHandler(URL)
      .then((res) => {
        if (res.statusCode === 200) {
          setGroups(res.data.groups);
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

  interface UserProps {
    user: User;
    title?: string;
  }

  const AboutUser = ({ user, title }: UserProps) => (
    <div className="relative">
      <div className="w-full  flex gap-2 items-center justify-between">
        <div className="w-fit flex justify-start items-center gap-2 group">
          <UserHoverCard user={user} title={title} />
          <Image
            width={50}
            height={50}
            src={`${USER_PROFILE_PIC_URL}/${user.profilePic}`}
            alt=""
            className={`w-8 h-8 rounded-full cursor-pointer`}
          />
          <div className={`w-fit text-base cursor-pointer`}>{user.name}</div>
        </div>
        <FollowBtn toFollowID={user.id} smaller={true} />
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="pt-[4rem] h-[95vh] font-poppins justify-around items-center px-10 flex gap-4">
        <div className="h-full w-[50%] px-3 ">
          <div className="pt-8 pb-4 flex justify-start items-center text-3xl font-semibold">
            {group.title}
          </div>
          <div className="">{group.description}</div>
          <div className="pt-8">
            <p className="text-2xl border-b-2 border-black mb-2">Member List</p>
            <div className="w-full flex flex-col gap-2">
              {group.memberships.map((membership, index) => (
                <div key={index} className="py-1">
                  <AboutUser user={membership.user} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-full w-[50%]">
          <div className="pt-8 font-semibold flex justify-start items-center text-2xl">
            Next Recommendations
          </div>
          {groups.map((el) => (
            <GroupCard group={el} />
          ))}
          {/* <div className="h-[75%]">
            <GroupChat />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Group;

interface Props {
  group: Group;
}

const GroupCard = ({ group }: Props) => {
  return (
    <div className="h-[15%] flex justify-between items-center border-b-[1px]">
      <div>
        <div className="text-2xl font-medium">{group.title}</div>
        <div>{group.description}</div>
      </div>

      <div className="text-sm">{group.noMembers}/50 members</div>
    </div>
  );
};
