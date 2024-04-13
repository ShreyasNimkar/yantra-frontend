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
    <>
      <Header />
      <div className="pt-[4rem] flex flex-col w-full ">
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
        <div className="flex w-full h-[10vh] flex-row my-5 px-10 justify-around items-center">
          <div className="w-[50%] h-full flex items-center text-4xl font-semibold">
            Feed
          </div>
          {user.isModerator && (
            <div
              onClick={() => {
                setClickedOnNewPost(true);
              }}
              className=" w-[50%] h-full flex items-center justify-end text-center"
            >
              <p className="cursor-pointer">
                To upload a post, click here &nbsp;
              </p>
              <CiCirclePlus size={25} className="cursor-pointer" />
            </div>
          )}

          <div
            onClick={() => {
              setClickedOnNewPoll(true);
            }}
            className=" w-[50%] h-full flex items-center justify-end text-center"
          >
            <p className="cursor-pointer">
              To upload a poll, click here &nbsp;
            </p>
            <CiCirclePlus size={25} className="cursor-pointer" />
          </div>

          {user.isModerator && (
            <div
              onClick={() => {
                setClickedOnNewAnnouncement(true);
              }}
              className=" w-[50%] h-full flex items-center justify-end text-center"
            >
              <p className="cursor-pointer">
                To upload an announcement, click here &nbsp;
              </p>
              <CiCirclePlus size={25} className="cursor-pointer" />
            </div>
          )}
        </div>

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
                return (
                  <AnnouncementCard
                    key={item.id}
                    announcement={item}
                    setFeed={setFeed}
                  />
                );
            })}
          </InfiniteScroll>
        )}
      </div>
    </>
  );
};

export default Home;
