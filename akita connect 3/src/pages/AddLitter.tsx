import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Litter, Puppy } from '../types';

const AddLitter: React.FC = () => {
  const { addLitter } = useStore();
  const [formData, setFormData] = useState<Partial<Litter>>({
    sireName: '',
    damName: '',
    whelpDate: '',
    description: '',
    coverImage: '',
    status: 'Planned',
    puppies: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLitter(formData as Litter);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Litter</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Sire Name"
          value={formData.sireName || ''}
          onChange={(e) => setFormData({ ...formData, sireName: e.target.value })}
          className="w-full p-2 border rounded mb-4"
        />
        {/* Add more inputs */}
        <button type="submit" className="w-full bg-brand-500 text-white p-2 rounded">Add Litter</button>
      </form>
    </div>
  );
};

export default AddLitter;