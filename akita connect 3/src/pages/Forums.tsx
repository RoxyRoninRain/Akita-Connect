import React, { useState } from 'react';
import { MessageSquare, Plus, TrendingUp, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ForumCategory, ForumThread } from '../types';

export default function Forums() {
  const { forumCategories, forumThreads } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredThreads = selectedCategory === 'all'
    ? forumThreads
    : forumThreads.filter((thread: ForumThread) => thread.categoryId === selectedCategory);

  const getThreadCount = (categoryId: string) => {
    return forumThreads.filter((thread: ForumThread) => thread.categoryId === categoryId).length;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Forums</h1>
          <p className="text-gray-600">Join the conversation with fellow Boxer enthusiasts</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
          <Plus className="h-5 w-5 mr-2" />
          New Thread
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-amber-100 text-amber-900'
                    : 'hover:bg-gray-100'
                }`}
              >
                All Discussions
              </button>
              {forumCategories.map((category: ForumCategory) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-amber-100 text-amber-900'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{category.name}</span>
                    <span className="text-sm text-gray-500">{getThreadCount(category.id)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="space-y-4">
            {filteredThreads.map((thread: ForumThread) => (
              <div key={thread.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{thread.title}</h3>
                    <p className="text-gray-600 mb-4">{thread.excerpt}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <img
                          src={thread.author.avatar}
                          alt={thread.author.name}
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <span>{thread.author.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{thread.lastActivity}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{thread.replies} replies</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>{thread.views} views</span>
                      </div>
                    </div>
                  </div>
                  {thread.isPinned && (
                    <span className="ml-4 px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-full">
                      Pinned
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredThreads.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No threads in this category yet</p>
              <button className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                Start a Discussion
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}