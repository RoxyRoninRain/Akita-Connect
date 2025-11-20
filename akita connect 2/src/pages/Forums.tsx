import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ForumCategory, Thread } from '../types';

const Forums: React.FC = () => {
  const { categories, threads } = useStore();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Forums</h1>
      <div className="grid gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <div className="space-y-2">
              {threads
                .filter(t => t.categoryId === category.id)
                .map((thread) => (
                  <Link
                    key={thread.id}
                    to={`/thread/${thread.id}`}
                    className="block p-3 bg-gray-50 rounded hover:bg-gray-100"
                  >
                    <h3 className="font-semibold">{thread.title}</h3>
                    <p className="text-sm text-gray-600">{thread.content.substring(0, 100)}...</p>
                    <p className="text-xs text-gray-400">Last active: {new Date(thread.lastActive).toLocaleDateString()}</p>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forums;
