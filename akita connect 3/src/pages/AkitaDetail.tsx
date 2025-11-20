import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Share2, MapPin, Calendar, Award } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Akita } from '../types';

export default function AkitaDetail() {
  const { id } = useParams<{ id: string }>(); 
  const { akitas, user, toggleFavorite } = useStore();
  const [akita, setAkita] = useState<Akita | null>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'health' | 'pedigree'>('about');

  useEffect(() => {
    const foundAkita = akitas.find((a: Akita) => a.id === id);
    if (foundAkita) {
      setAkita(foundAkita);
    }
  }, [id, akitas]);

  if (!akita) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Akita not found</h2>
          <Link to="/directory" className="text-orange-600 hover:text-orange-700">
            Return to Directory
          </Link>
        </div>
      </div>
    );
  }

  const isFavorite = user?.favorites?.includes(akita.id) || false;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="relative">
        <img
          src={akita.image}
          alt={akita.name}
          className="w-full h-96 object-cover"
        />
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <Link
            to="/directory"
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() => toggleFavorite(akita.id)}
              className={`p-2 rounded-full shadow-lg ${
                isFavorite ? 'bg-orange-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{akita.name}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {akita.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {akita.age}
                </span>
              </div>
            </div>
            {akita.champion && (
              <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-full">
                <Award className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-semibold text-yellow-700">Champion</span>
              </div>
            )}
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('about')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === 'about'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab('health')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === 'health'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Health
            </button>
            <button
              onClick={() => setActiveTab('pedigree')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === 'pedigree'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pedigree
            </button>
          </div>

          {activeTab === 'about' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{akita.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Breed</h4>
                  <p className="text-gray-600">{akita.breed}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Gender</h4>
                  <p className="text-gray-600">{akita.gender}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Color</h4>
                  <p className="text-gray-600">{akita.color}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Weight</h4>
                  <p className="text-gray-600">{akita.weight}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'health' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Health Certifications</h3>
                <div className="space-y-2">
                  {akita.healthTests?.map((test: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">{test}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pedigree' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Pedigree Information</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-1">Sire</h4>
                    <p className="text-gray-600">{akita.pedigree?.sire || 'Not available'}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-1">Dam</h4>
                    <p className="text-gray-600">{akita.pedigree?.dam || 'Not available'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <Link
              to={`/messages?userId=${akita.ownerId}`}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 font-medium"
            >
              <MessageCircle className="w-5 h-5" />
              Contact Owner
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}