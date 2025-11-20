import React, { useState } from 'react';
import { Search, Send } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Message } from '../types';

export default function Messages() {
  const { messages } = useStore();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const chats: Record<string, Message[]> = messages.reduce((acc: Record<string, Message[]>, msg: Message) => {
    const chatId = msg.senderId;
    if (!acc[chatId]) {
      acc[chatId] = [];
    }
    acc[chatId].push(msg);
    return acc;
  }, {});

  const filteredChats = Object.entries(chats).filter(([_, msgs]: [string, Message[]]) =>
    msgs[0].senderName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Messages</h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="flex h-full">
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {filteredChats.map(([chatId, msgs]: [string, Message[]]) => {
                  const lastMessage = msgs[msgs.length - 1];
                  const unreadCount = msgs.filter((m: Message) => !m.read).length;

                  return (
                    <button
                      key={chatId}
                      onClick={() => setSelectedChat(chatId)}
                      className={`w-full p-4 flex items-start hover:bg-gray-50 transition-colors ${
                        selectedChat === chatId ? 'bg-amber-50' : ''
                      }`}
                    >
                      <img
                        src={lastMessage.senderAvatar}
                        alt={lastMessage.senderName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="ml-3 flex-1 text-left">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold text-gray-900">
                            {lastMessage.senderName}
                          </span>
                          <span className="text-xs text-gray-500">{lastMessage.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{lastMessage.content}</p>
                        {unreadCount > 0 && (
                          <span className="inline-block bg-amber-600 text-white text-xs px-2 py-1 rounded-full mt-1">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              {selectedChat ? (
                <>
                  <div className="p-4 border-b border-gray-200 flex items-center">
                    <img
                      src={chats[selectedChat][0].senderAvatar}
                      alt={chats[selectedChat][0].senderName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">
                        {chats[selectedChat][0].senderName}
                      </h3>
                      <p className="text-sm text-gray-500">Active now</p>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chats[selectedChat].map((msg: Message) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            msg.senderId === 'current-user'
                              ? 'bg-amber-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p>{msg.content}</p>
                          <span className="text-xs opacity-75 mt-1 block">
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                      <button
                        type="submit"
                        className="bg-amber-600 text-white p-2 rounded-lg hover:bg-amber-700 transition-colors"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Select a conversation to start messaging
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}