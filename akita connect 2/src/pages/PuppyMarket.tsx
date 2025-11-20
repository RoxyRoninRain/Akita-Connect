import React from 'react';
import { useStore } from '../context/StoreContext';
import { Litter, Puppy } from '../types';
import { Link } from 'react-router-dom';

const PuppyMarket: React.FC = () => {
  const { litters } = useStore();
  const availableLitters = litters.filter(l => l.status === 'Available');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Puppy Market</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {availableLitters.map((litter: Litter) => (
          <div key={litter.id} className="border p-4 rounded">
            <img src={litter.coverImage} alt="Litter" className="w-full h-32 object-cover mb-2" />
            <h3 className="font-semibold">{litter.description}</h3>
            <Link to={`/litter/${litter.id}`} className="text-brand-500">View Puppies</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PuppyMarket;