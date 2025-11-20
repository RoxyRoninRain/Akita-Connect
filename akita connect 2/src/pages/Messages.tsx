import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Message } from '../types';

const Messages: React.FC = () => {
  const { messages, currentUser } = useStore();
  const [selectedChat, setSelectedChat] = useState<string>('');
  const userMessages = messages.filter(m => m.senderId === currentUser?.id || m.receiverId === currentUser?.id);

  // Group messages by conversation (simplified)
  const chats = userMessages.reduce((acc: { [key: string]: Message[] }, msg) => {
    const otherId = msg.senderId === currentUser?.id ? msg.receiverId : msg.senderId;
    if (!acc[otherId]) acc[otherId] = [];
    acc[otherId].push(msg);
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-4 flex">
      <div className="w-1/3 pr-4">
        <h2 className="text-2xl font-bold mb-4">Chats</h2>
        {Object.entries(chats).map(([chatId, chatMsgs]) => (
          <div
            key={chatId}
            onClick={() => setSelectedChat(chatId)}
            className={`p-3 rounded mb-2 cursor-pointer ${selectedChat === chatId ? 'bg-brand-100' : 'bg-gray-50'} hover:bg-gray-100`}
          >
            <p className="font-semibold">Chat with {chatId}</p>
            <p className="text-sm text-gray-600">{chatMsgs[chatMsgs.length - 1]?.content.substring(0, 50)}...</p>
          </div>
        ))}
      </div>
      <div className="w-2/3 pl-4 border-l">
        {selectedChat ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Conversation</h2>
            <div className="space-y-2 mb-4">
              {chats[selectedChat].map((msg) => (
                <div key={msg.id} className={`p-2 rounded ${msg.senderId === currentUser?.id ? 'bg-brand-500 text-white ml-auto' : 'bg-gray-200'}`}>
                  {msg.content}
                </div>
              ))}
            </div>
            {/* Input for new message */}
            <input type="text" placeholder="Type a message..." className="w-full p-2 border rounded" />
          </div>
        ) : (
          <p>Select a chat to start messaging.</p>
        )}
      </div>
    </div>
  );
};

export default Messages;
