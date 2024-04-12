import { RootState } from "@/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface FeedState {
  unreadNotifications: number;

  reviewModalOpen: boolean;
}

const initialState: FeedState = {
  unreadNotifications: 0,

  reviewModalOpen: false,
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setUnreadNotifications: (state, action: PayloadAction<number>) => {
      state.unreadNotifications = action.payload;
    },
    incrementUnreadNotifications: (state) => {
      state.unreadNotifications = state.unreadNotifications + 1;
    },

    setReviewModalOpen: (state, action: PayloadAction<boolean>) => {
      state.reviewModalOpen = action.payload;
    },
  },
});

export const {
  setUnreadNotifications,
  incrementUnreadNotifications,

  setReviewModalOpen,
} = feedSlice.actions;

export default feedSlice.reducer;

export const unreadNotificationsSelector = (state: RootState) =>
  state.feed.unreadNotifications;

export const reviewModalOpenSelector = (state: RootState) =>
  state.feed.reviewModalOpen;
