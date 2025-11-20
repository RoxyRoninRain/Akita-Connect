import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Thread, ThreadReply } from '../types';

const ThreadDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { threads, addReply } = useStore();
  const thread = threads.find(t => t.id === id) as Thread;

  if (!thread) return <div>Thread not found</div>;

  const handleReply = (content: string) => {
    addReply(id!, content);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{thread.title}</h1>
      <p className="mb-4">{thread.content}</p>
      <div className="mb-4">
        {thread.replies.map((reply: ThreadReply) => (
          <div key={reply.id} className="border p-2 mb-2 rounded">
            {reply.content}
          </div>
        ))}
      </div>
      {/* Add reply form */}
      <form onSubmit={(e) => { e.preventDefault(); handleReply(''); }}>
        <input type="text" placeholder="Add reply" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-brand-500 text-white p-2 rounded mt-2">Reply</button>
      </form>
    </div>
  );
};

export default ThreadDetail;