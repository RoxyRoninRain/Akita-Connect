import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Akita, HealthRecord, Achievement } from '../types';

const AddAkita: React.FC = () => {
  const { addAkita } = useStore();
  const [formData, setFormData] = useState<Partial<Akita>>({
    name: '',
    registeredName: '',
    registrationNumber: '',
    dob: '',
    sex: 'Male',
    color: '',
    avatar: '',
    healthRecords: [],
    achievements: [],
    titles: [],
    gallery: [],
    about: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAkita(formData as Akita);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Akita</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />
        {/* Add more inputs for other fields */}
        <button type="submit" className="w-full bg-brand-500 text-white p-2 rounded">Add Akita</button>
      </form>
    </div>
  );
};

export default AddAkita;