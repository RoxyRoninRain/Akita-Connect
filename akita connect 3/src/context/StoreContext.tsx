import React, { createContext, useContext, useState } from 'react';
import { User, Akita, Post, Thread, Message, ThreadReply, Comment, Litter, Puppy, Notification, Event, ForumCategory } from '../types';

/* Note: MOCK DATA (MOCK_USERS, MOCK_AKITAS, etc.) is assumed to be here but abbreviated for brevity */
const MOCK_USERS: User[] = [{ id: 'u1', name: 'Sarah Jenkins', role: 'breeder', avatar: '', bio: '', joinedDate: '', gallery: [] }];
const MOCK_AKITAS: Akita[] = [];
const MOCK_POSTS: Post[] = [];
const MOCK_CATEGORIES: ForumCategory[] = [];
const MOCK_THREADS: Thread[] = [];
const MOCK_LITTERS: Litter[] = [];
const MOCK_EVENTS: Event[] = [];

interface StoreContextType {
  /* ... interface properties ... */
  currentUser: User | null;
  /* ... all other state properties and functions ... */
}

const StoreContext = createContext<any>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  /* ... other state hooks ... */

  /* ... function implementations (login, addPost, etc.) ... */

  return (
    <StoreContext.Provider value={{ /* ... values ... */ }}>
      {children}
    </StoreContext.Provider>
  );
};
export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};