import React from 'react';
import { useStore } from '../context/StoreContext';
import { Post } from '../types';

const Home: React.FC = () => {
  const { posts, litters, events } = useStore();

  const recentPosts = posts.slice(0, 5);
  const recentLitters = litters.slice(0, 3);
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date()).slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Welcome to AkitaConnect</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Feed Section */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
          <div className="space-y-4">
            {recentPosts.map((post: Post) => (
              <div key={post.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold">{post.content.substring(0, 100)}...</h3>
                <p className="text-sm text-gray-500">{new Date(post.timestamp).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Sidebar */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Upcoming Litters</h2>
            {recentLitters.map(litter => (
              <div key={litter.id} className="bg-white p-4 rounded-lg shadow mb-4">
                <h3 className="font-bold">{litter.description.substring(0, 50)}...</h3>
                <p>{litter.whelpDate}</p>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
            {upcomingEvents.map(event => (
              <div key={event.id} className="bg-white p-4 rounded-lg shadow mb-4">
                <h3 className="font-bold">{event.title}</h3>
                <p>{event.date} - {event.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;