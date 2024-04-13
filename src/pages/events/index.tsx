import React from "react";
import Header from "@/components/Header";
import Post from "@/components/uncommon/Post";
import EventCard from "@/components/uncommon/EventCard";
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
  useEffect(() => {
    setPage(1);
    fetchEvents(new URLSearchParams(window.location.search).get("search"));
  }, [window.location.search]);
  return (
    <MainWrapper>
      <div className="flex w-full h-[10vh] flex-row my-5 justify-between items-center">
        <div className="h-full flex items-center text-6xl font-semibold">
          Events
        </div>
        {user.isModerator && (
          <Plus
            onClick={() => setClickedOnNewEvent(true)}
            size={42}
            className="flex-center rounded-full hover:bg-white transition-ease-300 cursor-pointer"
            weight="regular"
          />
        )}
      </div>
      <div className="w-full flex flex-col gap-6 ">
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
                    <EventCard key={event.id} event={event} size={"[22rem]"} />
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
        )}
      </div>
    </MainWrapper>
  );
};

export default index;
