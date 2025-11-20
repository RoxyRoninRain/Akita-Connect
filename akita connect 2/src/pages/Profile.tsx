import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { User } from '../types';

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { users, currentUser } = useStore();
  const user: User | undefined = users.find(u => u.id === (userId || currentUser?.id));

  if (!user) {
    return <div className="container mx-auto p-4">User not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-center mb-2">{user.name}</h1>
        {user.kennelName && <p className="text-center text-gray-600 mb-4">{user.kennelName}</p>}
        <p className="text-center text-gray-700 mb-4">{user.location}</p>
        <p className="text-center mb-6">{user.bio}</p>
        <div className="flex justify-center space-x-4">
          <span className="bg-brand-500 text-white px-4 py-2 rounded">Role: {user.role}</span>
          <span className="bg-gray-200 px-4 py-2 rounded">Joined: {user.joinedDate}</span>
        </div>
      </div>
      {/* Gallery and other sections */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Gallery</h2>
        <div className="grid grid-cols-3 gap-4">
          {user.gallery.map((img, idx) => (
            <img key={idx} src={img} alt="" className="w-full h-48 object-cover rounded" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
