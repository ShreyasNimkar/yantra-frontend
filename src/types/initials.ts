import {
  Announcement,
  Comment,
  Connection,
  Event,
  Group,
  GroupChat,
  GroupMembership,
  Journal,
  Like,
  Moderator,
  Notification,
  OAuth,
  Option,
  Page,
  Poll,
  Post,
  Report,
  ResourceBucket,
  ResourceFile,
  Review,
  User,
  UserVerification,
} from "./index";

export const user: User = {
  id: "",
  name: "",
  email: "",
  phoneNo: "",
  username: "",
  profilePic: "",
  coverPic: "",
  bio: "",
  tags: [],
  isModerator: false,
  isVerified: false,
  isOnboardingComplete: false,
};

export const moderator: Moderator = {
  id: "",
  userID: "",
  userId: "",
  isDoctor: false,
  isStudent: false,
  university: "",
  user: user,
};
export const announcement: Announcement = {
  id: "",
  groupID: "",
  group: null,
  title: "",
  content: "",
  isEdited: false,
  createdAt: "",
  noLikes: 0,
  noComments: 0,
};

export const comment: Comment = {
  id: "",
  postID: "",
  eventID: "",
  announcementID: "",
  userID: "",
  user: user,
  content: "",
  noLikes: 0,
  edited: false,
  createdAt: "",
  updatedAt: "",
};

export const connection: Connection = {
  senderID: "",
  sender: user,
  receiverID: "",
  receiver: user,
};

export const initialGroupMembership: GroupMembership = {
  id: "",
  userID: "",
  user: {} as User, // Assuming User type is defined
  groupID: "",
  group: {} as Group,
  createdAt: new Date(),
};
export const group: Group = {
  id: "",
  title: "",
  description: "",
  moderatorID: "",
  moderator: moderator,
  noMembers: 0,
  memberships: [initialGroupMembership],
  location: "",
};

export const event: Event = {
  id: "",
  groupID: "",
  group: group,
  dyteID: "",
  title: "",
  tagline: "",
  coverPic: "",
  blurHash: "",
  description: "",
  links: [],
  tags: [],
  moderator: moderator,
  noLikes: 0,
  noComments: 0,
  startTime: "",
  endTime: "",
  location: "",
  category: "",
  createdAt: "",
  comments: [],
};

export const journal: Journal = {
  id: "",
  userID: "",
  pages: [],
};

export const page: Page = {
  id: "",
  journalID: "",
  content: "",
  title: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const like: Like = {
  id: "",
  likedByID: "",
  eventID: "",
  announcementID: "",
  postID: "",
  commentID: "",
  reviewID: "",
  likedAt: new Date(),
};

export const notification: Notification = {
  id: "",
  notificationType: 0,
  userID: "",
  user: user,
  senderID: "",
  sender: user,
  eventID: "",
  event: event,
  announcementID: "",
  announcement: announcement,
  isRead: false,
  createdAt: "",
};

export const option: Option = {
  id: "",
  pollID: "",
  content: "",
  noVotes: 0,
  votedBy: [],
  createdAt: "",
};

export const poll: Poll = {
  id: "",
  groupID: "",
  group: group,
  title: "",
  content: "",
  options: [],
  isMultiAnswer: false,
  isEdited: false,
  totalVotes: 0,
  createdAt: new Date(),
};

export const post: Post = {
  id: "",
  userID: "",
  user: user,
  groupID: "",
  content: "",
  postedAt: "",
  images: [],
  hashes: [],
  noLikes: 0,
  noComments: 0,
  tags: [],
  edited: false,
  comments: [],
};

export const report: Report = {
  id: "",
  reportType: 0,
  reporterID: "",
  reporter: user,
  userID: "",
  user: user,
  eventID: "",
  event: event,
  announcementID: "",
  announcement: announcement,
  groupID: "",
  group: group,
  postID: "",
  post: post,
  content: "",
  createdAt: "",
};

export const resourceFile: ResourceFile = {
  id: "",
  userID: "",
  user: user,
  resourceBucketID: "",
  title: "",
  description: "",
  type: "",
  isFileUploaded: false,
  path: "",
  createdAt: "",
};

export const resourceBucket: ResourceBucket = {
  id: "",
  groupID: "",
  title: "",
  description: "",
  onlyAdminViewAccess: false,
  onlyAdminEditAccess: false,
  createdAt: "",
  noFiles: 0,
  resourceFiles: [],
};

export const review: Review = {
  id: "",
  userID: "",
  user: user,
  eventID: "",
  event: event,
  content: "",
  isPending: false,
  createdAt: "",
};

export const oAuth: OAuth = {
  id: "",
  userId: "",
  provider: "",
};

export const userVerification: UserVerification = {
  id: "",
  userId: "",
  code: "",
  expirationTime: "",
};

export const initialGroupChat: GroupChat = {
  id: "",
  title: "",
  description: "",
  coverPic: "",
  adminOnly: false,
  userID: "",
  user: user,
  createdAt: new Date(),
  messages: [],
  latestMessageID: "",
  group: group,
  groupID: "",
  latestMessage: null,
};
