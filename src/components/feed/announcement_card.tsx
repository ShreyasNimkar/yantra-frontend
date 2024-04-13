import React, { useState } from "react";
import Image from "next/image";
import { Announcement, Group, Poll, Post } from "@/types";
import { USER_PROFILE_PIC_URL } from "@/config/routes";
import moment from "moment";
import { userIDSelector, userSelector } from "@/slices/userSlice";
import { useSelector } from "react-redux";
import deleteHandler from "@/handlers/delete_handler";
import Toaster from "@/utils/toaster";
import patchHandler from "@/handlers/patch_handler";
import { SERVER_ERROR } from "@/config/errors";
import ConfirmDelete from "../common/confirm_delete";
import renderContentWithLinks from "@/utils/render_content_with_links";
// import Report from '../common/report';
// import LowerAnnouncement from '../lowers/lower_announcement';
import Link from "next/link";

interface Props {
  announcement: Announcement;
  setFeed: React.Dispatch<React.SetStateAction<(Post | Announcement | Poll)[]>>;
}

const AnnouncementCard = ({ announcement, setFeed }: Props) => {
  const [clickedOnOptions, setClickedOnOptions] = useState(false);
  const [clickedOnEdit, setClickedOnEdit] = useState(false);
  const [clickedOnDelete, setClickedOnDelete] = useState(false);
  const [clickedOnReport, setClickedOnReport] = useState(false);

  const [noUserClick, setNoUserClick] = useState(false);

  const [title, setTitle] = useState(announcement.title);
  const [caption, setCaption] = useState(announcement.content);

  const userID = useSelector(userIDSelector) || "";

  const handleDelete = async () => {
    const toaster = Toaster.startLoad("Deleting your Announcement...");

    const URL = `/announcement/${announcement.id}`;

    const res = await deleteHandler(URL);

    if (res.statusCode === 204) {
      setFeed((prev) => prev.filter((a) => a.id != announcement.id));
      setClickedOnDelete(false);
      Toaster.stopLoad(toaster, "Announcement Deleted", 1);
    } else {
      if (res.data.message) Toaster.stopLoad(toaster, res.data.message, 0);
      else Toaster.stopLoad(toaster, SERVER_ERROR, 0);
    }
  };

  const handleEdit = async () => {
    if (
      caption == announcement.content ||
      caption.trim().length == 0 ||
      caption.replace(/\n/g, "").length == 0
    ) {
      setClickedOnEdit(false);
      return;
    }
    const toaster = Toaster.startLoad("Editing Announcement...");

    const URL = `/announcement/${announcement.id}`;

    const formData = new FormData();
    formData.append("content", caption.replace(/\n{3,}/g, "\n\n"));

    const res = await patchHandler(URL, formData);
    if (res.statusCode === 200) {
      setFeed((prev) =>
        prev.map((a) => {
          if (a.id == announcement.id)
            return {
              ...a,
              title,
              content: caption.replace(/\n{3,}/g, "\n\n"),
              edited: true,
            };
          else return a;
        })
      );
      setClickedOnEdit(false);
      Toaster.stopLoad(toaster, "Announcement Edited", 1);
    } else {
      if (res.data.message) Toaster.stopLoad(toaster, res.data.message, 0);
      else Toaster.stopLoad(toaster, SERVER_ERROR, 0);
    }
  };

  const user = useSelector(userSelector);

  return (
    <div
      onClick={() => setClickedOnOptions(false)}
      className="w-full max-w-3xl mx-auto relative overflow-clip bg-white font-primary flex gap-1 rounded-lg border-gray-300 border-[1px] dark:border-b-[1px] p-4"
    >
      {clickedOnDelete && (
        <ConfirmDelete
          setShow={setClickedOnDelete}
          handleDelete={handleDelete}
        />
      )}
      {/* {clickedOnReport && <Report postID={announcement.id} setShow={setClickedOnReport} />} */}
      {clickedOnOptions ? (
        <>
          {clickedOnEdit ? (
            <></>
          ) : (
            <div className="w-1/4 h-fit flex flex-col bg-gray-100 bg-opacity-75 dark:bg-transparent absolute top-12 right-2 rounded-xl glassMorphism text-sm p-2 z-10 animate-fade_third">
              {user.isModerator && (
                <div
                  onClick={() => setClickedOnEdit(true)}
                  className="w-full px-4 py-2 max-md:p-1 max-md:text-center hover:bg-[#ffffff] dark:hover:bg-[#ffffff19] transition-ease-100 rounded-lg cursor-pointer"
                >
                  Edit
                </div>
              )}
              {user.isModerator && (
                <div
                  onClick={(el) => {
                    el.stopPropagation();
                    setClickedOnDelete(true);
                  }}
                  className="w-full px-4 py-2 max-md:p-1 max-md:text-center hover:bg-[#ffffff] dark:hover:bg-[#ffffff19] hover:text-primary_danger transition-ease-100 rounded-lg cursor-pointer"
                >
                  Delete
                </div>
              )}
              {!user.isModerator && (
                <div
                  onClick={(el) => {
                    el.stopPropagation();
                    if (userID == "") setNoUserClick(true);
                    else setClickedOnReport(true);
                  }}
                  className="w-full px-4 py-2 max-md:p-1 max-md:text-center hover:bg-[#ffffff] dark:hover:bg-[#ffffff19] hover:text-primary_danger transition-ease-100 rounded-lg cursor-pointer"
                >
                  Report
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <></>
      )}
      <Link
        href={
          userID == announcement.group?.moderator?.userID
            ? "/profile"
            : `/explore/users/${announcement.group?.moderator.user.username}`
        }
        target="_blank"
        className="h-fit flex items-center gap-2"
      >
        <Image
          crossOrigin="anonymous"
          width={100}
          height={100}
          alt={"User Pic"}
          src={`${USER_PROFILE_PIC_URL}/${announcement.group?.moderator?.user.profilePic}`}
          className="rounded-full w-8 h-8"
        />
      </Link>

      <div className="grow max-w-[94%] max-md:max-w-[85%] flex flex-col gap-2">
        <div className="w-full h-fit flex justify-between">
          <Link
            href={
              userID == announcement.group?.moderator?.userID
                ? "/organisation/profile"
                : `/explore/users/${announcement.group?.moderator?.user.username}`
            }
            target="_blank"
            className="flex items-center gap-2 font-medium"
          >
            {announcement.group?.moderator?.user.name}
            <div className="text-xs font-normal text-gray-500">
              @{announcement.group?.moderator?.user.username}
            </div>{" "}
          </Link>
          <div className="flex-center gap-2 text-xs text-gray-400">
            {announcement.isEdited ? <div>(edited)</div> : <></>}
            <div>{moment(announcement.createdAt).fromNow()}</div>

            {!clickedOnEdit && (
              <div
                onClick={(el) => {
                  el.stopPropagation();
                  setClickedOnOptions((prev) => !prev);
                }}
                className="text-xxs cursor-pointer"
              >
                •••
              </div>
            )}
          </div>
        </div>

        {clickedOnEdit ? (
          <div className="relative flex flex-col gap-2">
            <input
              type="text"
              value={title}
              maxLength={50}
              onChange={(el) => setTitle(el.target.value)}
              className="w-full text-lg font-medium border-[2px] border-dashed p-2 rounded-lg focus:outline-none"
              placeholder="Announcement Title (Optional)"
            />
            <textarea
              id="textarea_id"
              maxLength={1000}
              value={caption}
              autoFocus={true}
              onChange={(el) => setCaption(el.target.value)}
              className="w-full text-sm border-[2px] border-dashed p-2 rounded-lg dark:text-white dark:bg-dark_primary_comp focus:outline-none min-h-[16rem] max-h-64 max-md:w-full"
            />

            <div className="dark:text-white flex items-center gap-4 max-md:gap-1 absolute -bottom-10 right-0">
              <div
                onClick={() => setClickedOnEdit(false)}
                className="border-[1px] border-primary_black flex-center rounded-full w-20 max-md:w-12 max-md:text-xxs p-1 cursor-pointer"
              >
                cancel
              </div>
              {caption == announcement.content ? (
                <div className="bg-primary_black bg-opacity-50 text-white flex-center rounded-full w-16 max-md:w-12 max-md:text-xxs p-1 cursor-default">
                  save
                </div>
              ) : (
                <div
                  onClick={handleEdit}
                  className="bg-primary_black text-white flex-center rounded-full w-16 max-md:w-12 max-md:text-xxs p-1 cursor-pointer"
                >
                  save
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-2">
            <div className="text-lg font-medium">{announcement.title}</div>
            <div className="text-sm whitespace-pre-wrap">
              {renderContentWithLinks(announcement.content, [])}
            </div>
          </div>
        )}
        {/* <LowerAnnouncement announcement={announcement} /> */}
      </div>
    </div>
  );
};

export default AnnouncementCard;
