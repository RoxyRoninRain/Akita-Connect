import React from 'react';
import { useStore } from '../context/StoreContext';
import { User } from '../types';

const Directory: React.FC = () => {
  const { users } = useStore();
  const breeders = users.filter(u => u.role === 'breeder');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Breeder Directory</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {breeders.map((user: User) => (
          <div key={user.id} className="bg-white rounded-lg shadow-md p-6">
            <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h2 className="text-xl font-bold text-center mb-2">{user.name}</h2>
            {user.kennelName && <p className="text-center text-gray-600 mb-2">{user.kennelName}</p>}
            <p className="text-center text-gray-700 mb-4">{user.location}</p>
            <p className="text-center mb-4">{user.bio.substring(0, 100)}...</p>
            {user.breederInfo?.website && (
              <a href={user.breederInfo.website} className="block text-center text-brand-600 hover:underline">Visit Website</a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Directory;
