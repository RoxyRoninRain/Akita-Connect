import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, MessageSquare, Award, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Event, Litter } from '../types';

export default function Home() {
  const { events, litters } = useStore();
  const upcomingEvents = events.filter((event: Event) => new Date(event.date) > new Date()).slice(0, 3);
  const recentLitters = litters.filter((litter: Litter) => litter.status === 'available').slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-600 to-amber-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to BoxerHub</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Your premier community for Boxer enthusiasts, breeders, and owners
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/directory"
                className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Find Breeders
              </Link>
              <Link
                to="/forums"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-600 transition-colors"
              >
                Join Forums
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Member Directory</h3>
            <p className="text-gray-600">Connect with breeders and owners nationwide</p>
          </div>
          <div className="text-center">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Events</h3>
            <p className="text-gray-600">Stay updated on shows and meetups</p>
          </div>
          <div className="text-center">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Forums</h3>
            <p className="text-gray-600">Share knowledge and experiences</p>
          </div>
          <div className="text-center">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Pedigrees</h3>
            <p className="text-gray-600">Track lineage and achievements</p>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
            <Link to="/events" className="text-amber-600 hover:text-amber-700 flex items-center">
              View All <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event: Event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.location}</p>
                  <button className="text-amber-600 hover:text-amber-700 font-semibold">
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Available Litters */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Available Litters</h2>
            <Link to="/litters" className="text-amber-600 hover:text-amber-700 flex items-center">
              View All <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentLitters.map((litter: Litter) => (
              <div key={litter.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img src={litter.image} alt={`${litter.sire} x ${litter.dam}`} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {litter.sire} x {litter.dam}
                  </h3>
                  <p className="text-gray-600 mb-2">Born: {litter.birthDate}</p>
                  <p className="text-gray-600 mb-4">{litter.availablePuppies} puppies available</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-600">${litter.price}</span>
                    <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}