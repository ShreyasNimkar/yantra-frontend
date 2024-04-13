import {
  BOOKMARK_URL,
  CONNECTION_URL,
  INVITATION_URL,
  MESSAGING_URL,
  NOTIFICATION_URL,
  USER_URL,
  WORKSPACE_URL,
} from "@/config/routes";
import getHandler from "@/handlers/get_handler";
import { SERVER_ERROR } from "@/config/errors";
import {
  configSelector,
  setFetchedChats,
  setFetchedFollowing,
  setFetchedLikes,
  setLastFetchedUnreadChats,
  setLastFetchedUnreadInvitations,
  setLastFetchedUnreadNotifications,
  setLastFetchedVotedOptions,
} from "@/slices/configSlice";
import { setUnreadNotifications } from "@/slices/feedSlice";
import {
  ChatSlice,
  setChats,
  setDisLikes,
  setFollowing,
  setLikes,
  setPersonalChatSlices,
  setVotedOptions,
} from "@/slices/userSlice";
import {} from "@/types";
import Toaster from "@/utils/toaster";
import Cookies from "js-cookie";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

const useUserStateFetcher = () => {
  const dispatch = useDispatch();

  const config = useSelector(configSelector);

  const userID = Cookies.get("id");

  const fetchFollowing = () => {
    if (moment().utc().diff(config.lastFetchedFollowing, "minute") < 30) return;
    const URL = `${CONNECTION_URL}/following/me`;
    getHandler(URL)
      .then((res) => {
        if (res.statusCode == 200) {
          const followingIDsArr: string[] = res.data.userIDs || [];
          dispatch(setFollowing(followingIDsArr));
          dispatch(setFetchedFollowing(new Date().toUTCString()));
        }
      })
      .catch((err) => {
        Toaster.error(SERVER_ERROR, "error_toaster");
      });
  };

  const fetchLikes = () => {
    if (moment().utc().diff(config.lastFetchedLikes, "minute") < 30) return;
    const LIKES_URL = `${USER_URL}/me/likes`;
    getHandler(LIKES_URL)
      .then((res) => {
        if (res.statusCode == 200) {
          const likesData: string[] = res.data.likes || [];
          dispatch(setLikes(likesData));
          dispatch(setFetchedLikes(new Date().toUTCString()));
        }
      })
      .catch((err) => {
        Toaster.error(SERVER_ERROR, "error_toaster");
      });

    const DISLIKES_URL = `${USER_URL}/me/dislikes`;
    getHandler(DISLIKES_URL)
      .then((res) => {
        if (res.statusCode == 200) {
          const likesData: string[] = res.data.dislikes || [];
          dispatch(setDisLikes(likesData));
          dispatch(setFetchedLikes(new Date().toUTCString()));
        }
      })
      .catch((err) => {
        Toaster.error(SERVER_ERROR, "error_toaster");
      });
  };

  // const fetchChats = () => {
  //   if (moment().utc().diff(config.lastFetchedChats, "minute") < 30) return;
  //   const URL = `${MESSAGING_URL}/me`;
  //   getHandler(URL)
  //     .then((res) => {
  //       if (res.statusCode === 200) {
  //         const personalChatSlices: ChatSlice[] = [];
  //         const chats: string[] = [];
  //         res.data.chats?.forEach((chat: Chat) => {
  //           chats.push(chat.id);
  //           personalChatSlices.push({
  //             chatID: chat.id,
  //             userID:
  //               chat.acceptedByID == userID
  //                 ? chat.createdByID
  //                 : chat.acceptedByID,
  //           });
  //         });
  //         res.data.groupChats?.forEach((chat: GroupChat) => {
  //           chats.push(chat.id);
  //         });
  //         dispatch(setPersonalChatSlices(personalChatSlices));
  //         dispatch(setChats(chats));
  //         dispatch(setFetchedChats(new Date().toUTCString()));
  //       } else Toaster.error(res.data.message, "error_toaster");
  //     })
  //     .catch((err) => {
  //       Toaster.error(SERVER_ERROR, "error_toaster");
  //     });
  // };

  const fetchUnreadNotifications = () => {
    if (
      moment().utc().diff(config.lastFetchedUnreadNotifications, "seconds") < 30
    )
      return;
    const URL = `${NOTIFICATION_URL}/unread/count`;
    getHandler(URL)
      .then((res) => {
        if (res.statusCode === 200) {
          const count: number = res.data.count;
          dispatch(setUnreadNotifications(count));
          dispatch(setLastFetchedUnreadNotifications(new Date().toUTCString()));
        } else Toaster.error(res.data.message, "error_toaster");
      })
      .catch((err) => {
        Toaster.error(SERVER_ERROR, "error_toaster");
      });
  };

  // const fetchUnreadInvitations = () => {
  //   if (moment().utc().diff(config.lastFetchedUnreadInvitations, "minute") < 2)
  //     return;
  //   const URL = `${INVITATION_URL}/unread/count`;
  //   getHandler(URL)
  //     .then((res) => {
  //       if (res.statusCode === 200) {
  //         const count: number = res.data.count;
  //         dispatch(setUnreadInvitations(count));
  //         dispatch(setLastFetchedUnreadInvitations(new Date().toUTCString()));
  //       } else Toaster.error(res.data.message, "error_toaster");
  //     })
  //     .catch((err) => {
  //       Toaster.error(SERVER_ERROR, "error_toaster");
  //     });
  // };

  // const fetchUnreadChats = () => {
  //   if (moment().utc().diff(config.lastFetchedUnreadChats, "minute") < 2)
  //     return;
  //   const URL = `${MESSAGING_URL}/personal/unread`;
  //   getHandler(URL)
  //     .then((res) => {
  //       if (res.statusCode === 200) {
  //         const chatIDs: string[] = res.data.chatIDs;
  //         dispatch(setUnreadChats(chatIDs));
  //         dispatch(setLastFetchedUnreadChats(new Date().toUTCString()));
  //       } else Toaster.error(res.data.message, "error_toaster");
  //     })
  //     .catch((err) => {
  //       Toaster.error(SERVER_ERROR, "error_toaster");
  //     });
  // };

  const fetchVotedOptions = () => {
    if (moment().utc().diff(config.lastFetchedVotedOptions, "minute") < 5)
      return;
    const URL = `${USER_URL}/me/polls/options`;
    getHandler(URL)
      .then((res) => {
        if (res.statusCode === 200) {
          const votedOptions: string[] = res.data.options;
          dispatch(setVotedOptions(votedOptions));
          dispatch(setLastFetchedVotedOptions(new Date().toUTCString()));
        } else Toaster.error(res.data.message, "error_toaster");
      })
      .catch((err) => {
        Toaster.error(SERVER_ERROR, "error_toaster");
      });
  };

  const fetchUserState = () => {
    fetchFollowing();
    fetchLikes();

    fetchUnreadNotifications();
    // fetchUnreadInvitations();

    fetchVotedOptions();
  };

  return fetchUserState;
};

export default useUserStateFetcher;
