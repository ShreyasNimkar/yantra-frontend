import Links from "@/components/utils/edit_links";
import Tags from "@/components/utils/edit_tags";
import CoverPic from "@/components/utils/new_cover";
import { SERVER_ERROR } from "@/config/errors";
import { USER_PROFILE_PIC_URL } from "@/config/routes";
import postHandler from "@/handlers/post_handler";
// import { currentOrgSelector } from "@/slices/orgSlice";
import { User, Event } from "@/types";
import categories from "@/utils/categories";
import Toaster from "@/utils/toaster";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import getHandler from "@/handlers/get_handler";
import { Id } from "react-toastify";
import Image from "next/image";
// import { EXPLORE_URL } from "@/config/routes";
import PrimaryButton from "@/components/buttons/primary_btn";
import BuildButton from "@/components/buttons/build_btn";

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

const NewEvent = ({ setShow, setEvents }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagline, setTagline] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [image, setImage] = useState<File>();

  const [mutex, setMutex] = useState(false);

  const eventDetailsValidator = () => {
    if (title.trim() == "") {
      Toaster.error("Enter Title");
      return false;
    }
    if (tagline.trim() == "") {
      Toaster.error("Enter Tagline");
      return false;
    }
    if (description.trim() == "") {
      Toaster.error("Enter Description");
      return false;
    }
    if (category.trim() == "" || category == "Select Category") {
      Toaster.error("Select Category");
      return false;
    }
    if (tags.length < 3) {
      Toaster.error("Add at least 3 tags");
      return false;
    }
    if (!image) {
      Toaster.error("Add a Cover Picture");
      return false;
    }

    const start = moment(startTime);
    const end = moment(endTime);

    if (start.isBefore(moment())) {
      Toaster.error("Enter A Valid Start Time");
      return false;
    }
    if (end.isBefore(start)) {
      Toaster.error("Enter A Valid End Time");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    var check = eventDetailsValidator();
    if (!check) return;
    if (mutex) return;
    setMutex(true);

    const toaster = Toaster.startLoad("Adding the event...");

    const formData = new FormData();

    formData.append("title", title);
    formData.append("tagline", tagline);
    formData.append("description", description);
    tags.forEach((tag) => formData.append("tags", tag));
    links.forEach((link) => formData.append("links", link));
    formData.append("category", category);
    formData.append("location", location == "" ? "Online" : location);
    formData.append(
      "startTime",
      moment(startTime).format("YYYY-MM-DDTHH:mm:ss[Z]")
    );
    formData.append(
      "endTime",
      moment(endTime).format("YYYY-MM-DDTHH:mm:ss[Z]")
    );
    if (image) formData.append("coverPic", image);

    const URL = `/event`;

    const res = await postHandler(URL, formData, "multipart/form-data");

    if (res.statusCode === 201) {
      const event: Event = res.data.event;

      setEvents((prev) => [event, ...prev]);
      Toaster.stopLoad(toaster, "Event Added", 1);
      setShow(false);
    } else if (res.statusCode == 413) {
      Toaster.stopLoad(toaster, "Image too large", 0);
    } else {
      if (res.data.message) {
        Toaster.stopLoad(toaster, res.data.message, 0);
      } else {
        Toaster.stopLoad(toaster, SERVER_ERROR, 0);
      }
    }
    setMutex(false);
  };

  useEffect(() => {
    document.documentElement.style.overflowY = "hidden";
    document.documentElement.style.height = "100vh";

    return () => {
      document.documentElement.style.overflowY = "auto";
      document.documentElement.style.height = "auto";
    };
  }, []);

  return (
    <>
      <div className="fixed pt-4 top-10 max-lg:top-0 w-1/2 max-lg:w-screen h-[90%] max-lg:h-screen backdrop-blur-2xl bg-white dark:bg-[#ffe1fc22] flex flex-col justify-between rounded-lg px-12 py-8 gap-8 max-lg:gap-4 dark:text-white font-primary overflow-y-auto border-[1px] border-primary_btn  dark:border-dark_primary_btn right-1/2 translate-x-1/2 shadow-2xl animate-fade_third z-50">
        <div className="w-full flex flex-col gap-8 max-lg:gap-4 ">
          <div className="w-full">
            <CoverPic setSelectedFile={setImage} type="Event" />
          </div>
          <div className="w-full flex flex-col justify-between gap-2">
            <div className="w-full text-primary_black flex flex-col gap-6 pb-8 max-lg:pb-4">
              <input
                value={title}
                onChange={(el) => setTitle(el.target.value)}
                maxLength={25}
                type="text"
                placeholder="Untitled Event"
                className="w-full text-5xl max-lg:text-center max-lg:text-3xl font-bold bg-transparent focus:outline-none"
              />

              <select
                onChange={(el) => setCategory(el.target.value)}
                className="w-1/2 max-lg:w-full h-12 border-[1px] border-primary_btn  dark:border-dark_primary_btn dark:text-white bg-primary_comp dark:bg-[#10013b30] focus:outline-nonetext-sm rounded-lg block p-2"
              >
                {categories.map((c, i) => {
                  return (
                    <option
                      className="bg-primary_comp_hover dark:bg-[#10013b30]"
                      key={i}
                      value={c}
                    >
                      {c}
                    </option>
                  );
                })}
              </select>

              <div>
                <div className="text-xs ml-1 font-medium uppercase text-gray-500">
                  Event Tagline ({tagline.trim().length}/50)
                </div>
                <input
                  value={tagline}
                  onChange={(el) => setTagline(el.target.value)}
                  maxLength={50}
                  type="text"
                  className="w-full font-medium bg-transparent focus:outline-none border-[1px] border-gray-400 rounded-lg p-2"
                  placeholder="Write your Tagline here..."
                />
              </div>

              <div>
                <div className="text-xs ml-1 font-medium uppercase text-gray-500">
                  Event Location ({location.trim().length}/25)
                </div>
                <input
                  value={location}
                  onChange={(el) => setLocation(el.target.value)}
                  maxLength={25}
                  type="text"
                  className="w-full bg-transparent focus:outline-none border-[1px] border-gray-400 rounded-lg p-2"
                  placeholder="Online"
                />
              </div>

              <div className="w-full flex justify-between gap-4">
                <div className="w-1/2">
                  <div className="text-xs ml-1 font-medium uppercase text-gray-500">
                    Start Time
                  </div>
                  <input
                    value={startTime}
                    onChange={(el) => setStartTime(el.target.value)}
                    type="datetime-local"
                    className="w-full bg-transparent focus:outline-none border-[1px] border-gray-400 rounded-lg p-2"
                  />
                </div>
                <div className="w-1/2">
                  <div className="text-xs ml-1 font-medium uppercase text-gray-500">
                    End Time
                  </div>
                  <input
                    value={endTime}
                    onChange={(el) => setEndTime(el.target.value)}
                    type="datetime-local"
                    className="w-full bg-transparent focus:outline-none border-[1px] border-gray-400 rounded-lg p-2"
                  />
                </div>
              </div>

              <div>
                <div className="text-xs ml-1 font-medium uppercase text-gray-500">
                  Event Description ({description.trim().length}/2500)
                </div>
                <textarea
                  value={description}
                  onChange={(el) => setDescription(el.target.value)}
                  maxLength={2500}
                  className="w-full min-h-[80px] max-h-80 bg-transparent focus:outline-none border-[1px] border-gray-400 rounded-lg p-2"
                  placeholder="Explain your event"
                />
              </div>

              <div>
                <div className="text-xs ml-1 font-medium uppercase text-gray-500">
                  Event Tags ({tags.length || 0}/10)
                </div>
                <Tags tags={tags} setTags={setTags} maxTags={10} />
              </div>

              <div>
                <div className="text-xs ml-1 font-medium uppercase text-gray-500">
                  Event Links ({links.length || 0}/3)
                </div>
                <Links links={links} setLinks={setLinks} maxLinks={3} />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex items-end justify-between">
          <div></div>
          <BuildButton
            label="Create Event"
            loadingLabel="Building your event!"
            loading={mutex}
            onClick={handleSubmit}
          />
        </div>
      </div>
      <div
        onClick={() => setShow(false)}
        className="bg-backdrop w-screen h-screen max-lg:w-[105vw] max-lg:h-[105vh] fixed top-0 left-0 animate-fade_third z-20"
      ></div>
    </>
  );
};

export default NewEvent;
