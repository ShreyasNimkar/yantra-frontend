export interface Announcement {
  id: string;
  groupID: string;
  group: Group | null;
  title: string;
  content: string;
  isEdited: boolean;
  createdAt: string; // Assuming timestamp is represented as string
  noLikes: number;
  noComments: number;
}

export interface Comment {
  id: string;
  postID?: string;
  eventID?: string;
  announcementID?: string;
  userID: string;
  user: User;
  content: string;
  noLikes: number;
  edited: boolean;
  createdAt: string; // Assuming timestamp is represented as string
  updatedAt: string; // Assuming timestamp is represented as string
}

export interface Connection {
  senderID: string;
  sender: User;
  receiverID: string;
  receiver: User;
}

export interface Event {
  id: string;
  groupID: string;
  group: Group;
  dyteID: string;
  title: string;
  tagline?: string;
  coverPic: string;
  blurHash: string;
  description: string;
  links: string[];
  moderator: Moderator;
  tags: string[];
  noLikes: number;
  noComments: number;
  startTime: string; // Assuming timestamp is represented as string
  endTime: string; // Assuming timestamp is represented as string
  location: string;
  category: string;
  createdAt: string; // Assuming timestamp is represented as string
  comments: Comment[];
}

export interface Group {
  id: string;
  title: string;
  description: string;
  moderatorID: string;
  moderator: Moderator;
  numberOfMembers: number;
}
export interface Journal {
  id: string;
  userID: string;
  pages: Page[];
}

export interface Page {
  id: string;
  journalID: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Like {
  id: string;
  likedByID: string;
  eventID?: string;
  announcementID?: string;
  postID?: string;
  commentID?: string;
  reviewID?: string;
  likedAt: Date;
}
export interface Notification {
  id: string;
  notificationType: number;
  userID: string;
  user: User;
  senderID: string;
  sender: User;
  eventID?: string;
  event: Event;
  announcementID?: string;
  announcement: Announcement;
  isRead: boolean;
  createdAt: string;
}

export interface Option {
  id: string;
  pollID: string;
  content: string;
  noVotes: number;
  votedBy: User[];
  createdAt: string;
}

export interface Poll {
  id: string;
  groupID: string;
  group: Group;
  title: string;
  content: string;
  options: Option[];
  isMultiAnswer: boolean;
  isEdited: boolean;
  totalVotes: number;
  createdAt: Date;
}

export interface Post {
  id: string;
  userID: string;
  user: User;
  groupID: string;
  content: string;
  postedAt: string;
  images: string[];
  hashes: string[];
  noLikes: number;
  noComments: number;
  tags: string[];
  edited: boolean;
  comments: Comment[];
}

export interface Report {
  id: string;
  reportType: number;
  reporterID: string;
  reporter: User;
  userID?: string;
  user: User;
  eventID?: string;
  event: Event;
  announcementID?: string;
  announcement: Announcement;
  groupID?: string;
  group: Group;
  postID?: string;
  post: Post;
  content: string;
  createdAt: string;
}

export interface ResourceFile {
  id: string;
  userID: string;
  user: User;
  resourceBucketID: string;
  title: string;
  description: string;
  type: string;
  isFileUploaded: boolean;
  path: string;
  createdAt: string;
}

export interface ResourceBucket {
  id: string;
  groupID: string;
  title: string;
  description: string;
  onlyAdminViewAccess: boolean;
  onlyAdminEditAccess: boolean;
  createdAt: string;
  noFiles: number;
  resourceFiles: ResourceFile[];
}

export interface Review {
  id: string;
  userID: string;
  user: User;
  eventID?: string;
  event: Event;
  content: string;
  isPending: boolean;
  createdAt: string;
}

export interface Moderator {
  id: string;
  userID: string;
  isDoctor: boolean;
  isStudent: boolean;
  university: string;
  user: User;
}

export interface User {
  email: string;
  phoneNo: string;
  id: string;
  name: string;
  username: string;
  profilePic: string;
  coverPic: string;
  bio: string;
  tags: string[];
  isModerator: boolean;
  isVerified: boolean;
  isOnboardingComplete: boolean;
}
export interface Moderator {
  id: string;
  userId: string;
  isDoctor: boolean;
  isStudent: boolean;
  university: string;
}
export interface OAuth {
  id: string;
  userId: string;
  provider: string; // Assuming Provider is a string type
}

export interface UserVerification {
  id: string;
  userId: string;
  code: string;
  expirationTime: string; // Assuming string format for date
}
