'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const ShopHero: React.FC = () => {
  return (
    <div className="mb-12">
      {/* Hero Section */}
      <div className="relative w-full h-60 md:h-72 bg-gradient-to-r from-amber-50 to-gray-50 rounded-lg overflow-hidden mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              THE GOOD STUFF
            </h1>
            <p className="text-gray-600 text-sm md:text-base mb-6">
              Quality furniture and home decor for your space
            </p>
            <Link
              href="#products"
              className="inline-block px-8 py-3 bg-amber-700 text-white font-semibold rounded-lg hover:bg-amber-800 transition-colors"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Categories Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { name: 'Furniture', color: 'bg-amber-100' },
          { name: 'Lighting', color: 'bg-blue-100' },
          { name: 'Decoration', color: 'bg-green-100' },
        ].map((cat) => (
          <Link
            key={cat.name}
            href={`#${cat.name.toLowerCase()}`}
            className={`${cat.color} rounded-lg p-6 text-center hover:shadow-md transition-shadow cursor-pointer`}
          >
            <h3 className="font-bold text-lg text-gray-900 mb-2">{cat.name}</h3>
            <p className="text-sm text-gray-700">Discover our collection</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
