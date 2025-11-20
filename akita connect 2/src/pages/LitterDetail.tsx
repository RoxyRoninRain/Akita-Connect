import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Litter, Puppy } from '../types';

const LitterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { litters } = useStore();
  const litter = litters.find(l => l.id === id) as Litter;

  if (!litter) return <div>Litter not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{litter.description}</h1>
      <img src={litter.coverImage} alt="Litter" className="w-full h-48 object-cover mb-4" />
      <h2 className="text-xl font-semibold mb-2">Puppies</h2>
      <div className="grid grid-cols-2 gap-4">
        {litter.puppies.map((puppy: Puppy) => (
          <div key={puppy.id} className="border p-2 rounded">
            <h3>{puppy.name}</h3>
            <p>Status: {puppy.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LitterDetail;