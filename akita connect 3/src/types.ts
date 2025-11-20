export interface BreederInfo {
  kennelEstablished?: string;
  clubs?: string[];
  website?: string;
  philosophy?: string;
}
export interface OwnerInfo {
  experienceLevel?: 'First Time' | 'Intermediate' | 'Expert';
  activities?: string[];
}
export interface User {
  id: string;
  name: string;
  avatar: string;
  banner?: string;
  kennelName?: string;
  location?: string;
  role: 'breeder' | 'owner' | 'enthusiast';
  bio: string;
  joinedDate: string;
  gallery: string[];
  isModerator?: boolean;
  breederInfo?: BreederInfo;
  ownerInfo?: OwnerInfo;
}
export interface HealthRecord {
  type: 'OFA_HIPS' | 'OFA_ELBOWS' | 'OFA_EYES' | 'THYROID' | 'VGL' | 'AMELOGENESIS_IMPERFECTA' | 'OTHER';
  result: string;
  date: string;
  certificateNumber?: string;
  notes?: string;
  attachmentUrl?: string;
}
export interface Achievement {
  id: string;
  title: string;
  date: string;
  event: string;
  image?: string;
}
export interface Akita {
  id: string;
  ownerId: string;
  name: string;
  registeredName: string;
  registrationNumber: string;
  dob: string;
  sex: 'Male' | 'Female';
  color: string;
  avatar: string;
  sireId?: string;
  damId?: string;
  healthRecords: HealthRecord[];
  achievements: Achievement[];
  titles: string[];
  gallery: string[];
  about: string;
}
export interface PuppyGrowth {
    date: string;
    weight: string;
    note?: string;
}
export interface Puppy {
    id: string;
    litterId: string;
    name: string;
    sex: 'Male' | 'Female';
    color: string;
    price?: string;
    status: 'Available' | 'Reserved' | 'Sold' | 'Keeper';
    growthHistory: PuppyGrowth[];
    avatar?: string;
    microchip?: string;
}
export interface Litter {
  id: string;
  breederId: string;
  sireId?: string;
  damId?: string;
  sireName?: string;
  damName?: string;
  whelpDate: string;
  puppyCount?: number;
  status: 'Planned' | 'Expecting' | 'Available' | 'Sold';
  description: string;
  coverImage: string;
  isApproved?: boolean;
  listedInMarket?: boolean;
  puppies: Puppy[];
}
export interface Comment {
  id: string;
  authorId: string;
  content: string;
  timestamp: number;
}
export interface Post {
  id: string;
  authorId: string;
  authorType: 'User' | 'Akita';
  relatedAkitaId?: string;
  content: string;
  images?: string[];
  likes: string[];
  comments: Comment[];
  timestamp: number;
}
export interface ThreadReply {
  id: string;
  threadId: string;
  authorId: string;
  content: string;
  timestamp: number;
}
export interface ForumCategory {
  id: string;
  title: string;
  description: string;
}
export interface Thread {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  authorId: string;
  replies: ThreadReply[];
  lastActive: number;
}
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: number;
  read: boolean;
}
export interface Notification {
  id: string;
  userId: string;
  type: 'LIKE' | 'COMMENT' | 'REPLY' | 'MESSAGE' | 'SYSTEM';
  content: string;
  relatedId?: string;
  isRead: boolean;
  timestamp: number;
}
export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  type: 'Specialty' | 'All-Breed' | 'Meetup' | 'Webinar';
  description: string;
  attendees: string[];
  coverImage: string;
}