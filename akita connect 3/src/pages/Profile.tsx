import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { User } from '../types';

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>(); 
  const { users } = useStore();
  const user = users.find((u: User) => u.id === userId);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-medium">Member since:</span>{' '}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Role:</span> {user.role}
            </p>
          </div>
        </div>

        {user.role === 'breeder' && (
          <div className="border-t pt-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Breeder Information</h2>
            <p className="text-gray-700">
              This user is a verified breeder on our platform.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
