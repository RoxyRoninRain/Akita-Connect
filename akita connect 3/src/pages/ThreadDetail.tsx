import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Thread, Post } from '../types';

const ThreadDetail: React.FC = () => {
  const { threadId } = useParams<{ threadId: string }>(); 
  const { threads, posts, addPost, currentUser } = useStore();
  const thread = threads.find((t: Thread) => t.id === threadId);
  const threadPosts = posts.filter((p) => p.threadId === threadId);
  const [replyContent, setReplyContent] = useState('');

  if (!thread) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Thread not found</p>
        </div>
      </div>
    );
  }

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || !currentUser) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      threadId: thread.id,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      content: replyContent,
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    addPost(newPost);
    setReplyContent('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{thread.title}</h1>
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={thread.authorAvatar}
            alt={thread.authorName}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium text-gray-900">{thread.authorName}</p>
            <p className="text-sm text-gray-500">
              {new Date(thread.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <p className="text-gray-700 whitespace-pre-wrap">{thread.content}</p>
        <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
          <span>{thread.replies} replies</span>
          <span>{thread.views} views</span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {threadPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={post.authorAvatar}
                alt={post.authorName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">{post.authorName}</p>
                <p className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
            <div className="mt-4">
              <button className="text-sm text-blue-600 hover:text-blue-700">
                👍 {post.likes}
              </button>
            </div>
          </div>
        ))}
      </div>

      {currentUser && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Post a Reply</h2>
          <form onSubmit={handleSubmitReply}>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write your reply..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
              required
            />
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Post Reply
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ThreadDetail;
