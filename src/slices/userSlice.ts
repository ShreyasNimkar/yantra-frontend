import { RootState } from "@/store";
import { User } from "@/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface ChatSlice {
  userID: string;
  chatID: string;
}
interface UserState {
  id: string;
  name: string;
  username: string;
  isOrganization: boolean;
  bio: string;
  tagline: string;
  email: string;
  phoneNo: string;

  following: string[];
  likes: string[];
  dislikes: string[];

  chats: string[];
  personalChatSlices: ChatSlice[];
  profilePic: string;
  coverPic: string;
  isLoggedIn: boolean;
  isVerified: boolean;
  isOnboardingComplete: boolean;
  isPasswordSetupComplete: boolean;

  votedOptions: string[];
}

const initialState: UserState = {
  id: "",
  name: "",
  username: "",
  isOrganization: false,
  bio: "",
  tagline: "",
  email: "",
  phoneNo: "",

  isLoggedIn: false,
  profilePic: "",
  coverPic: "",
  following: [],
  likes: [],
  dislikes: [],

  chats: [],
  personalChatSlices: [],

  isVerified: false,
  isOnboardingComplete: false,
  isPasswordSetupComplete: true,

  votedOptions: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.isOrganization = action.payload.isOrganization;
      state.bio = action.payload.bio;
      state.tagline = action.payload.tagline;
      state.email = action.payload.email;

      state.profilePic = action.payload.profilePic;
      state.coverPic = action.payload.coverPic;
      state.isLoggedIn = true;
      state.phoneNo = action.payload.phoneNo;
      state.isVerified = action.payload.isVerified;
      state.isOnboardingComplete = action.payload.isOnboardingComplete;
      state.isPasswordSetupComplete = true;

      state.chats = [];
      state.personalChatSlices = [];

      state.following = [];
      state.likes = [];
      state.dislikes = [];

      state.votedOptions = [];
    },
    resetUser: (state) => {
      state.id = "";
      state.name = "";
      state.username = "";
      state.isOrganization = false;
      state.bio = "";
      state.tagline = "";
      state.email = "";

      state.profilePic = "default.jpg";
      state.coverPic = "default.jpg";
      state.isLoggedIn = false;
      state.phoneNo = "";
      state.isVerified = false;
      state.chats = [];
      state.personalChatSlices = [];

      state.following = [];
      state.likes = [];
      state.dislikes = [];

      state.isOnboardingComplete = false;
      state.isPasswordSetupComplete = true;
      state.votedOptions = [];
    },
    setReduxName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setProfilePic: (state, action: PayloadAction<string>) => {
      state.profilePic = action.payload;
    },
    setCoverPic: (state, action: PayloadAction<string>) => {
      state.coverPic = action.payload;
    },
    setReduxTagline: (state, action: PayloadAction<string>) => {
      state.tagline = action.payload;
    },
    setReduxBio: (state, action: PayloadAction<string>) => {
      state.bio = action.payload;
    },
    setFollowing: (state, action: PayloadAction<string[]>) => {
      state.following = action.payload;
    },
    setLikes: (state, action: PayloadAction<string[]>) => {
      state.likes = action.payload;
    },
    setDisLikes: (state, action: PayloadAction<string[]>) => {
      state.dislikes = action.payload;
    },

    setChats: (state, action: PayloadAction<string[]>) => {
      state.chats = action.payload;
    },
    addToChats: (state, action: PayloadAction<string>) => {
      state.chats = [...state.chats, action.payload];
    },
    setPersonalChatSlices: (state, action: PayloadAction<ChatSlice[]>) => {
      state.personalChatSlices = action.payload;
    },

    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNo = action.payload;
    },

    setVerificationStatus: (state, action: PayloadAction<boolean>) => {
      state.isVerified = action.payload;
    },
    setOnboardingStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnboardingComplete = action.payload;
    },
    setPasswordSetupStatus: (state, action: PayloadAction<boolean>) => {
      state.isPasswordSetupComplete = action.payload;
    },

    setVotedOptions: (state, action: PayloadAction<string[]>) => {
      state.votedOptions = action.payload;
    },
  },
});

export const {
  setUser,
  resetUser,
  setReduxName,
  setProfilePic,
  setCoverPic,
  setReduxTagline,
  setReduxBio,
  setFollowing,
  setLikes,
  setDisLikes,

  setChats,
  addToChats,
  setPersonalChatSlices,

  setEmail,
  setPhoneNumber,

  setVerificationStatus,
  setOnboardingStatus,
  setPasswordSetupStatus,

  setVotedOptions,
} = userSlice.actions;

export default userSlice.reducer;

export const userSelector = (state: RootState) => state.user;

export const userIDSelector = (state: RootState) => state.user.id;

export const profilePicSelector = (state: RootState) => state.user.profilePic;
