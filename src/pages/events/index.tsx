import React from "react";
import Header from "@/components/Header";
import Post from "@/components/uncommon/Post";
import EventCard from "@/components/uncommon/EventCard";
import EditEvent from "@/sections/Events/edit_event";
import ConfirmDelete from "@/components/common/confirm_delete";

import deleteHandler from "@/handlers/delete_handler";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { userIDSelector, userSelector } from "@/slices/userSlice";
import Toaster from "@/utils/toaster";
import getHandler from "@/handlers/get_handler";
import { SERVER_ERROR } from "@/config/errors";
import NoSearch from "@/components/empty_fillers/search";
import Loader from "@/components/common/loader";
import { Event } from "@/types";
import NewEvent from "@/sections/Events/new_event";
import { Plus } from "@phosphor-icons/react";
import MainWrapper from "@/wrappers/main";
// import { navbarOpenSelector } from "@/slices/feedSlice";
import { event as initialEvent } from "@/types/initials";
import Image from "next/image";
import { CiCirclePlus } from "react-icons/ci";
const index = () => {
  const user = useSelector(userSelector);

  //

  const [clickedOnNewEvent, setClickedOnNewEvent] = useState(false);
  //
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const userID = useSelector(userIDSelector) || "";
  const [clickedOnEditEvent, setClickedOnEditEvent] = useState(false);
  const [clickedEditEvent, setClickedEditEvent] = useState(initialEvent);
  const [clickedOnDeleteEvent, setClickedOnDeleteEvent] = useState(false);
  const [clickedDeleteEvent, setClickedDeleteEvent] = useState(initialEvent);
  // const open = useSelector(navbarOpenSelector);

  const fetchEvents = async (search: string | null) => {
    const URL = `/event?page=${page}&limit=${10}`;
    const res = await getHandler(URL);
    if (res.statusCode == 200) {
      if (search && search != "") {
        setEvents(res.data.events || []);
        setHasMore(false);
      } else {
        if (!search && page == 1) setEvents(res.data.events || []);
        else {
          const addedEvents = [...events, ...(res.data.events || [])];
          if (addedEvents.length === events.length) setHasMore(false);
          setEvents(addedEvents);
        }
        setPage((prev) => prev + 1);
      }
      setLoading(false);
    } else {
      if (res.data.message) Toaster.error(res.data.message, "error_toaster");
      else Toaster.error(SERVER_ERROR, "error_toaster");
    }
  };
  const handleDeleteEvent = async () => {
    const toaster = Toaster.startLoad("Deleting the event...");

    const URL = `/event/${clickedDeleteEvent.id}`;

    const res = await deleteHandler(URL);

    if (res.statusCode === 204) {
      setEvents((prev) => prev.filter((e) => e.id != clickedDeleteEvent.id));
      setClickedOnDeleteEvent(false);
      Toaster.stopLoad(toaster, "Event Deleted", 1);
    } else {
      if (res.data.message) Toaster.stopLoad(toaster, res.data.message, 0);
      else Toaster.stopLoad(toaster, SERVER_ERROR, 0);
    }
  };
  useEffect(() => {
    setPage(1);
    fetchEvents(new URLSearchParams(window.location.search).get("search"));
  }, [window.location.search]);
  return (
    <MainWrapper>
      <div className="fixed bottom-0 left-0">
        <Image
          src={"/threePeople.svg"}
          width={1000}
          height={1000}
          alt="person"
          className=" h-[15rem] w-auto"
        />
      </div>
      <div className="flex  font-poppins w-full h-[10vh] flex-row my-5 justify-between items-center">
        <div className="h-full flex items-center text-6xl font-semibold">
          Events
        </div>
        {user.isModerator && (
          <div
            onClick={() => {
              setClickedOnNewEvent(true);
            }}
            className=" w-[50%] h-full flex items-center justify-end text-center"
          >
            <p className="cursor-pointer">
              To create an event, click here &nbsp;
            </p>
            <CiCirclePlus size={25} className="cursor-pointer" />
          </div>
        )}
      </div>
      <div className="w-full flex flex-col gap-6  ">
        {loading ? (
          <Loader />
        ) : (
          <>
            {events.length > 0 ? (
              <InfiniteScroll
                className={`w-full ${"px-2 gap-4"} pb-12 pt-6 flex flex-wrap items-center justify-center transition-ease-out-500`}
                dataLength={events.length}
                next={() =>
                  fetchEvents(
                    new URLSearchParams(window.location.search).get("search")
                  )
                }
                hasMore={hasMore}
                loader={<Loader />}
              >
                {events.map((event) => {
                  return (
                    <>
                      <EventCard
                        setClickedOnEditEvent={setClickedOnEditEvent}
                        setClickedEditEvent={setClickedEditEvent}
                        setClickedOnDeleteEvent={setClickedOnDeleteEvent}
                        setClickedDeleteEvent={setClickedDeleteEvent}
                        key={event.id}
                        event={event}
                        size={"[22rem]"}
                      />
                    </>
                  );
                })}
              </InfiniteScroll>
            ) : (
              <NoSearch />
            )}
          </>
        )}
      </div>
      <div>
        {clickedOnNewEvent && (
          <NewEvent setEvents={setEvents} setShow={setClickedOnNewEvent} />
        )}{" "}
        {clickedOnEditEvent && (
          <EditEvent
            event={clickedEditEvent}
            setEvents={setEvents}
            setShow={setClickedOnEditEvent}
          />
        )}
        {clickedOnDeleteEvent && (
          <ConfirmDelete
            handleDelete={handleDeleteEvent}
            setShow={setClickedOnDeleteEvent}
          />
        )}
      </div>
    </MainWrapper>
  );
};

export default index;
