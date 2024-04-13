import React from "react";
import Header from "@/components/Header";
import Post from "@/components/uncommon/Post";
import EventCard from "@/components/uncommon/EventCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { userIDSelector } from "@/slices/userSlice";
import Toaster from "@/utils/toaster";
import getHandler from "@/handlers/get_handler";
import { SERVER_ERROR } from "@/config/errors";
import NoSearch from "@/components/empty_fillers/search";
import Loader from "@/components/common/loader";
import { Event } from "@/types";
// import { navbarOpenSelector } from "@/slices/feedSlice";

const index = () => {
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
    <>
      <Header />
      {/* <div className="flex w-full min-h-max  pt-[4rem]">
        <div className="w-full h-full">
          <div className="w-full flex-wrap flex sm:w-[100%] h-max py-5 px-10   flex-row  justify-around items-baseline gap-3 gap-y-5">
            <EventCard /> <EventCard /> <EventCard /> <EventCard />
          </div>
        </div>
      </div> */}
      <div className="w-full flex flex-col gap-6 pt-10">
        {loading ? (
          <Loader />
        ) : (
          <>
            {events.length > 0 ? (
              <InfiniteScroll
                className={`w-full ${"px-2 gap-4"} pb-12 flex flex-wrap justify-center transition-ease-out-500`}
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
                  return <EventCard key={event.id} event={event} size={96} />;
                })}
              </InfiniteScroll>
            ) : (
              <NoSearch />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default index;
