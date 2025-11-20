import React from 'react';
import { useStore } from '../context/StoreContext';
import { Event } from '../types';
import { Link } from 'react-router-dom';

const Events: React.FC = () => {
  const { events } = useStore();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event: Event) => (
          <div key={event.id} className="border p-4 rounded">
            <h3 className="font-semibold">{event.title}</h3>
            <p>{event.date} - {event.location}</p>
            <p>{event.description}</p>
            <img src={event.coverImage} alt={event.title} className="w-full h-32 object-cover mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;