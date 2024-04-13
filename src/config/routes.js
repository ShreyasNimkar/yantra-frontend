export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
export const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
export const GC_API = "https://storage.googleapis.com";
export const BUCKET = process.env.NEXT_PUBLIC_GCP_BUCKET;

export const LOGIN_URL = `/login`;
export const SIGNUP_URL = `/signup`;

export const USER_URL = `/user`;
export const POST_URL = `/post`;

export const FEED_URL = `/feed`;

export const COMMENT_URL = `/comment`;
export const POLL_URL = "/poll";
export const MESSAGING_URL = `/messaging`;
export const NOTIFICATION_URL = `/notification`;
export const ANNOUNCEMENT_URL = "/announcement";
export const CONNECTION_URL = `/connection`;
export const JOURNAL_URL = "/journal";
export const EVENT_URL = `/event`;
export const REVIEW_URL = "/review";
export const VERIFICATION_URL = "/verification";

export const USER_PROFILE_PIC_URL = `${GC_API}/${BUCKET}/users/profilePics`;
export const USER_COVER_PIC_URL = `${GC_API}/${BUCKET}/users/coverPics`;

export const EVENT_PIC_URL = `${GC_API}/${BUCKET}/events`;
export const POST_PIC_URL = `${GC_API}/${BUCKET}/posts`;
export const GROUP_CHAT_PIC_URL = `${GC_API}/${BUCKET}/chats`;

export const RESOURCE_URL = `${GC_API}/${BUCKET}/resources`;
