import React from 'react';
import { useStore } from '../context/StoreContext';
import { Notification } from '../types';

const Notifications: React.FC = () => {
  const { notifications, markAsRead } = useStore();
  const unread = notifications.filter(n => !n.isRead);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <ul>
        {unread.map((notif: Notification) => (
          <li key={notif.id} className="border p-2 mb-2 rounded flex justify-between">
            <span>{notif.content}</span>
            <button onClick={() => markAsRead(notif.id)} className="text-brand-500">Mark Read</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;