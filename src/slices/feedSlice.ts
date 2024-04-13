import { RootState } from "@/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface FeedState {
  unreadNotifications: number;
  onboarding: boolean;
  homeTab: number;
  reviewModalOpen: boolean;
}

const initialState: FeedState = {
  unreadNotifications: 0,
  homeTab: 0,
  onboarding: false,
  reviewModalOpen: false,
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setUnreadNotifications: (state, action: PayloadAction<number>) => {
      state.unreadNotifications = action.payload;
    },
    setHomeTab: (state, action: PayloadAction<number>) => {
      state.homeTab = action.payload;
    },
    setOnboarding: (state, action: PayloadAction<boolean>) => {
      state.onboarding = action.payload;
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
  setHomeTab,
  setOnboarding,
  setReviewModalOpen,
} = feedSlice.actions;

export default feedSlice.reducer;

export const unreadNotificationsSelector = (state: RootState) =>
  state.feed.unreadNotifications;
export const homeTabSelector = (state: RootState) => state.feed.homeTab;
export const reviewModalOpenSelector = (state: RootState) =>
  state.feed.reviewModalOpen;
export const onboardingSelector = (state: RootState) => state.feed.onboarding;
