import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, DollarSign, Heart, MessageCircle, Share2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Litter } from '../types';

export default function LitterDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { litters, user } = useStore();
  const [isFavorite, setIsFavorite] = useState(false);

  const litter = litters.find((l: Litter) => l.id === id);

  if (!litter) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Litter not found</h2>
          <button
            onClick={() => navigate('/browse')}
            className="text-amber-600 hover:text-amber-700"
          >
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  const handleContact = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/messages?breeder=${litter.breeder.id}`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${litter.breed} Litter`,
          text: `Check out this ${litter.breed} litter!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={litter.images[0]}
                alt={litter.breed}
                className="w-full h-96 object-cover"
              />
              {litter.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 p-4">
                  {litter.images.slice(1, 5).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${litter.breed} ${index + 2}`}
                      className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-75"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="md:w-1/2 p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{litter.breed}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{litter.location}</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-full ${
                    isFavorite ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Heart className={`h-6 w-6 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Available Puppies</div>
                  <div className="text-2xl font-bold text-gray-900">{litter.availablePuppies}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Price Range</div>
                  <div className="text-2xl font-bold text-gray-900">${litter.priceRange}</div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Born: {litter.birthDate}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Available: {litter.availableDate}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{litter.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Health Information</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {litter.healthTests.map((test, index) => (
                    <li key={index}>{test}</li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Breeder Information</h3>
                <Link
                  to={`/breeders/${litter.breeder.id}`}
                  className="flex items-center hover:bg-gray-50 p-4 rounded-lg transition-colors"
                >
                  <img
                    src={litter.breeder.avatar}
                    alt={litter.breeder.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900">{litter.breeder.name}</div>
                    <div className="text-sm text-gray-600">{litter.breeder.location}</div>
                    {litter.breeder.verified && (
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-1">
                        Verified Breeder
                      </span>
                    )}
                  </div>
                </Link>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleContact}
                  className="flex-1 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contact Breeder
                </button>
                <button
                  onClick={handleShare}
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}