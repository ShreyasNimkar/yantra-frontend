import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import PostComponent from "@/components/uncommon/Post";
import { Announcement, Poll, Post } from "@/types";
import getHandler from "@/handlers/get_handler";
import Toaster from "@/utils/toaster";
import { SERVER_ERROR } from "@/config/errors";
import PostsLoader from "@/components/loaders/posts";
import NoFeed from "@/components/fillers/feed";
import InfiniteScroll from "react-infinite-scroll-component";
import PollCard from "@/components/feed/poll_card";
import AnnouncementCard from "@/components/feed/announcement_card";

const Home = () => {
  const [feed, setFeed] = useState<(Post | Announcement | Poll)[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [clickedOnNewPost, setClickedOnNewPost] = useState(false);
  const [loading, setLoading] = useState(true);

  const getFeed = () => {
    const URL = `/group/feed?page=${page}&limit=${5}`;
    getHandler(URL)
      .then((res) => {
        if (res.statusCode === 200) {
          const addedFeed = [...feed, ...(res.data.feed || [])];
          if (addedFeed.length === feed.length) setHasMore(false);
          setFeed(addedFeed);
          setPage((prev) => prev + 1);
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
    getFeed();
  }, []);

  return (
    <>
      <Header />
      <div className="pt-[4rem] flex flex-row w-full ">
        {loading ? (
          <PostsLoader />
        ) : feed.length === 0 ? (
          <NoFeed />
        ) : (
          <InfiniteScroll
            className="w-full flex flex-col gap-4 dark:gap-0"
            dataLength={feed.length}
            next={getFeed}
            hasMore={hasMore}
            loader={<PostsLoader />}
          >
            {feed.map((item) => {
              if ("images" in item) {
                return (
                  <PostComponent key={item.id} setFeed={setFeed} post={item} />
                );
              } else if ("totalVotes" in item) {
                return (
                  <PollCard
                    key={item.id}
                    poll={item}
                    setPolls={setFeed}
                    hoverShadow={false}
                  />
                );
              } else
                return <AnnouncementCard key={item.id} announcement={item} />;
            })}
          </InfiniteScroll>
        )}
      </div>
    </>
  );
};

export default Home;
