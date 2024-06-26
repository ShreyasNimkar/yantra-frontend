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
import { useSelector } from "react-redux";
import { userSelector } from "@/slices/userSlice";
import { CiCirclePlus } from "react-icons/ci";
import NewAnnouncement from "@/components/uncommon/Announcements/new_announcement";
import { group as initialGroup } from "@/types/initials";
import NewPoll from "@/components/uncommon/Polls/new_poll";
import NewPost from "@/components/uncommon/Post/new_post";
import Masonry from "react-masonry-css";
import Loader from "@/components/common/loader";
import MainWrapper from "@/wrappers/main";

const Home = () => {
  const [feed, setFeed] = useState<(Post | Announcement | Poll)[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const [group, setGroup] = useState(initialGroup);

  const [clickedOnNewPost, setClickedOnNewPost] = useState(false);
  const [clickedOnNewPoll, setClickedOnNewPoll] = useState(false);
  const [clickedOnNewAnnouncement, setClickedOnNewAnnouncement] =
    useState(false);

  const [loading, setLoading] = useState(true);

  const getFeed = () => {
    const URL = `/group/feed?page=${page}&limit=${5}`;
    getHandler(URL)
      .then((res) => {
        if (res.statusCode === 200) {
          const addedFeed = [...feed, ...(res.data.feed || [])];
          if (addedFeed.length === feed.length) setHasMore(false);
          setFeed(addedFeed);

          setGroup(res.data.group);

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

  const user = useSelector(userSelector);

  return (
    <MainWrapper>
      <div className="font-poppins ">
        {clickedOnNewPost && (
          <NewPost setFeed={setFeed} setShow={setClickedOnNewPost} />
        )}
        {clickedOnNewPoll && (
          <NewPoll
            setPolls={setFeed}
            group={group}
            setShow={setClickedOnNewPoll}
          />
        )}
        {clickedOnNewAnnouncement && (
          <NewAnnouncement
            setAnnouncements={setFeed}
            group={group}
            setShow={setClickedOnNewAnnouncement}
          />
        )}
        <div className="flex w-full h-[10vh] my-5 justify-between items-center">
          <div className="h-full flex items-center text-6xl font-semibold">
            Feed
          </div>
          <div className="h-full flex justify-end items-center gap-10 pr-10">
            <div
              onClick={() => {
                setClickedOnNewPost(true);
              }}
              className="flex items-center justify-end text-center"
            >
              <p className="cursor-pointer text-lg">Post &nbsp;</p>
              <CiCirclePlus size={25} className="cursor-pointer" />
            </div>

            {user.isModerator && (
              <div
                onClick={() => {
                  setClickedOnNewPoll(true);
                }}
                className="flex items-center justify-end text-center"
              >
                <p className="cursor-pointer text-lg">Poll &nbsp;</p>
                <CiCirclePlus size={25} className="cursor-pointer" />
              </div>
            )}

            {user.isModerator && (
              <div
                onClick={() => {
                  setClickedOnNewAnnouncement(true);
                }}
                className="flex items-center justify-end text-center"
              >
                <p className="cursor-pointer text-lg">Announcement &nbsp;</p>
                <CiCirclePlus size={25} className="cursor-pointer" />
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : feed.length === 0 ? (
          <NoFeed />
        ) : (
          <InfiniteScroll
            className="w-full flex flex-col gap-4 dark:gap-0"
            dataLength={feed.length}
            next={getFeed}
            hasMore={hasMore}
            loader={<Loader />}
          >
            <Masonry
              breakpointCols={{ default: feed.length == 1 ? 1 : 2, 768: 1 }}
              className="masonry-grid font-poppins  "
              columnClassName="masonry-grid_column"
            >
              {feed.map((item, index) => {
                if ("images" in item) {
                  return (
                    <div className={`${index != 0 && index != 1 && "mt-4"}`}>
                      <PostComponent
                        key={item.id}
                        setFeed={setFeed}
                        post={item}
                      />
                    </div>
                  );
                } else if ("totalVotes" in item) {
                  return (
                    <div className={`${index != 0 && index != 1 && "mt-4"}`}>
                      <PollCard
                        key={item.id}
                        poll={item}
                        setPolls={setFeed}
                        hoverShadow={false}
                      />
                    </div>
                  );
                } else
                  return (
                    <div className={`${index != 0 && index != 1 && "mt-4"}`}>
                      <AnnouncementCard
                        key={item.id}
                        announcement={item}
                        setFeed={setFeed}
                      />
                    </div>
                  );
              })}
            </Masonry>
          </InfiniteScroll>
        )}
      </div>
    </MainWrapper>
  );
};

export default Home;
