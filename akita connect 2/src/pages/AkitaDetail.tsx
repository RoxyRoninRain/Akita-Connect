import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Akita } from '../types';

const AkitaDetail: React.FC = () => {
  const { akitaId } = useParams<{ akitaId: string }>();
  const { akitas } = useStore();
  const akita: Akita | undefined = akitas.find(a => a.id === akitaId);

  if (!akita) {
    return <div className="container mx-auto p-4">Akita not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <img src={akita.avatar} alt={akita.name} className="w-64 h-64 object-cover rounded-lg mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-center mb-2">{akita.name}</h1>
        <p className="text-center text-gray-600 mb-4">{akita.registeredName}</p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <p><strong>DOB:</strong> {akita.dob}</p>
          <p><strong>Sex:</strong> {akita.sex}</p>
          <p><strong>Color:</strong> {akita.color}</p>
          <p><strong>Registration:</strong> {akita.registrationNumber}</p>
        </div>
        <p className="mb-6">{akita.about}</p>
        {/* Health Records and Achievements sections */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Health Records</h2>
          {akita.healthRecords.map((record, idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded mb-2">
              <p><strong>{record.type}:</strong> {record.result} ({record.date})</p>
              {record.notes && <p className="text-sm text-gray-600">{record.notes}</p>}
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Achievements</h2>
          {akita.achievements.map((ach, idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded mb-2">
              <p><strong>{ach.title}</strong> - {ach.date} ({ach.event})</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AkitaDetail;
