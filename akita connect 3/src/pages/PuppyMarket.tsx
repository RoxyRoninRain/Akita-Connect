import React from 'react';
import { useStore } from '../context/StoreContext';
import { Link } from 'react-router-dom';
import { Litter } from '../types';

const PuppyMarket: React.FC = () => {
  const { litters } = useStore();
  const availableLitters = litters.filter((l: Litter) => l.availablePuppies > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Puppy Market</h1>

      {availableLitters.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="text-yellow-800">
            No puppies available at the moment. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableLitters.map((litter) => (
            <div
              key={litter.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={litter.images[0]}
                alt={`${litter.damName} x ${litter.sireName} litter`}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {litter.damName} x {litter.sireName}
                </h2>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium">Born:</span>{' '}
                    {new Date(litter.birthDate).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Available:</span>{' '}
                    {litter.availablePuppies} puppies
                  </p>
                  <p>
                    <span className="font-medium">Price:</span> ${litter.price}
                  </p>
                </div>
                <Link
                  to={`/litters/${litter.id}`}
                  className="mt-4 block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PuppyMarket;
