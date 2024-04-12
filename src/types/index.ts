export interface User {
  id: string;
  tags: string[];
  links: string[];
  email: string;
  name: string;
  resume: string;
  active: boolean;
  profilePic: string;
  coverPic: string;
  username: string;
  phoneNo: string;
  bio: string;
  title: string;
  tagline: string;
  profile: Profile;
  followers: User[];
  following: User[];
  memberships: Membership[];
  posts: Post[];
  projects: Project[];
  noFollowers: number;
  noFollowing: number;
  noImpressions: number;
  noProjects: number;
  noCollaborativeProjects: number;
  isFollowing?: boolean;
  isOnboardingComplete: boolean;
  passwordChangedAt: Date;
  lastViewed: Project[];
  isVerified: boolean;
  isOrganization: boolean;
}

export interface Profile {
  id: string;
  userID: string;
  achievements: Achievement[];
  school: string;
  degree: string;
  yearOfGraduation: number;
  description: string;
  areasOfCollaboration: string[];
  hobbies: string[];
  location: string;
  phoneNo: string;
  email: string;
}
