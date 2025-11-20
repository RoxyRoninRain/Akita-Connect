import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, logout } = useStore();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-brand-600 text-white shadow">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">AkitaConnect</Link>
            <div className="space-x-4">
              <Link to="/" className={location.pathname === '/' ? 'underline' : ''}>Home</Link>
              <Link to="/profile" className={location.pathname === '/profile' ? 'underline' : ''}>Profile</Link>
              <Link to="/forums" className={location.pathname === '/forums' ? 'underline' : ''}>Forums</Link>
              <Link to="/messages" className={location.pathname === '/messages' ? 'underline' : ''}>Messages</Link>
              <Link to="/directory" className={location.pathname === '/directory' ? 'underline' : ''}>Directory</Link>
              <Link to="/puppy-market" className={location.pathname === '/puppy-market' ? 'underline' : ''}>Puppy Market</Link>
              <Link to="/events" className={location.pathname === '/events' ? 'underline' : ''}>Events</Link>
              {currentUser ? (
                <>
                  <Link to="/notifications" className={location.pathname === '/notifications' ? 'underline' : ''}>Notifications</Link>
                  <button onClick={logout} className="bg-white text-brand-600 px-4 py-2 rounded">Logout</button>
                </>
              ) : (
                <Link to="/login" className={location.pathname === '/login' ? 'underline' : ''}>Login</Link>
              )}
            </div>
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="container mx-auto px-4 text-center">
          &copy; 2025 AkitaConnect. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;