import { RootState } from "@/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ConfigState {
  updatingFollowing: boolean;
  updatingLikes: boolean;
  updatingOptions: boolean;

  lastFetchedFollowing: string;
  lastFetchedLikes: string;

  lastFetchedChats: string;

  lastFetchedUnreadNotifications: string;
  lastFetchedUnreadInvitations: string;
  lastFetchedUnreadChats: string;

  lastFetchedVotedOptions: string;
}

const getInitialDate = (): string => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - 31); //+1 minutes
  return date.toUTCString();
};
const getInitialNotificationDate = (): string => {
  const date = new Date();
  date.setSeconds(date.getSeconds() - 31);
  return date.toUTCString();
};

const getInitialInvitationDate = (): string => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - 3);
  return date.toUTCString();
};

const initialState: ConfigState = {
  updatingFollowing: false,
  updatingLikes: false,
  updatingOptions: false,

  lastFetchedFollowing: getInitialDate(),
  lastFetchedLikes: getInitialDate(),

  lastFetchedChats: getInitialDate(),

  lastFetchedUnreadNotifications: getInitialNotificationDate(),
  lastFetchedUnreadInvitations: getInitialInvitationDate(),
  lastFetchedUnreadChats: getInitialInvitationDate(),

  lastFetchedVotedOptions: getInitialDate(),
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    resetConfig: (state) => {
      state.updatingFollowing = false;
      state.updatingLikes = false;
      state.updatingOptions = false;

      state.lastFetchedFollowing = getInitialDate();
      state.lastFetchedLikes = getInitialDate();

      state.lastFetchedChats = getInitialDate();

      state.lastFetchedUnreadNotifications = getInitialNotificationDate();
      state.lastFetchedUnreadInvitations = getInitialInvitationDate();
      state.lastFetchedUnreadChats = getInitialInvitationDate();

      state.lastFetchedVotedOptions = getInitialDate();
    },
    setUpdatingFollowing: (state, action: PayloadAction<boolean>) => {
      state.updatingFollowing = action.payload;
    },
    setUpdatingLikes: (state, action: PayloadAction<boolean>) => {
      state.updatingLikes = action.payload;
    },
    setUpdatingOptions: (state, action: PayloadAction<boolean>) => {
      state.updatingOptions = action.payload;
    },

    setConfig: (state) => {
      state.lastFetchedFollowing = new Date().toUTCString();
      state.lastFetchedLikes = new Date().toUTCString();

      state.lastFetchedChats = new Date().toUTCString();

      state.lastFetchedUnreadNotifications = new Date().toUTCString();
      state.lastFetchedUnreadInvitations = new Date().toUTCString();

      state.lastFetchedVotedOptions = new Date().toUTCString();
    },
    setFetchedFollowing: (state, action: PayloadAction<string>) => {
      state.lastFetchedFollowing = action.payload;
    },
    setFetchedLikes: (state, action: PayloadAction<string>) => {
      state.lastFetchedLikes = action.payload;
    },

    setFetchedChats: (state, action: PayloadAction<string>) => {
      state.lastFetchedChats = action.payload;
    },

    setLastFetchedUnreadNotifications: (
      state,
      action: PayloadAction<string>
    ) => {
      state.lastFetchedUnreadNotifications = action.payload;
    },
    setLastFetchedUnreadInvitations: (state, action: PayloadAction<string>) => {
      state.lastFetchedUnreadInvitations = action.payload;
    },
    setLastFetchedUnreadChats: (state, action: PayloadAction<string>) => {
      state.lastFetchedUnreadChats = action.payload;
    },

    setLastFetchedVotedOptions: (state, action: PayloadAction<string>) => {
      state.lastFetchedVotedOptions = action.payload;
    },
  },
});

export const {
  resetConfig,
  setUpdatingFollowing,
  setUpdatingLikes,
  setUpdatingOptions,

  setConfig,
  setFetchedChats,
  setFetchedFollowing,
  setFetchedLikes,

  setLastFetchedUnreadNotifications,
  setLastFetchedUnreadInvitations,
  setLastFetchedUnreadChats,

  setLastFetchedVotedOptions,
} = configSlice.actions;

export default configSlice.reducer;

export const configSelector = (state: RootState) => state.config;
