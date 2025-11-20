
export interface BreederInfo {
  kennelEstablished?: string; // Year
  clubs?: string[]; // e.g. AKC, ACA
  website?: string;
  philosophy?: string;
}

export interface OwnerInfo {
  experienceLevel?: 'First Time' | 'Intermediate' | 'Expert';
  activities?: string[]; // e.g. Hiking, Agility, Therapy
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  banner?: string;
  kennelName?: string;
  location?: string; // City, State
  role: 'breeder' | 'owner' | 'enthusiast';
  bio: string;
  joinedDate: string;
  gallery: string[];
  isModerator?: boolean;
  // Role specific info
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
  title: string; // e.g., "Best in Show", "Grand Champion"
  date: string;
  event: string;
  image?: string;
}

export interface Akita {
  id: string;
  ownerId: string;
  name: string; // Call name
  registeredName: string;
  registrationNumber: string;
  dob: string;
  sex: 'Male' | 'Female';
  color: string;
  avatar: string;
  sireId?: string; // Father
  damId?: string; // Mother
  healthRecords: HealthRecord[];
  achievements: Achievement[];
  titles: string[]; // e.g., ["GCH", "ROM"]
  gallery: string[];
  about: string;
}

export interface PuppyGrowth {
    date: string;
    weight: string; // e.g. "5.2 lbs"
    note?: string;
}

export interface Puppy {
    id: string;
    litterId: string;
    name: string; // Call name or identifier (e.g. "Green Collar")
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
  sireName?: string; // For manual entry if not in DB
  damName?: string; // For manual entry if not in DB
  whelpDate: string; // Due date or birth date
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
  authorType: 'User' | 'Akita'; // Can post as user or as the dog
  relatedAkitaId?: string;
  content: string;
  images?: string[];
  likes: string[]; // User IDs
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
  content: string; // Initial post content
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
  userId: string; // Receiver
  type: 'LIKE' | 'COMMENT' | 'REPLY' | 'MESSAGE' | 'SYSTEM';
  content: string;
  relatedId?: string; // ID of the post, thread, or user
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
  attendees: string[]; // User IDs
  coverImage: string;
}
