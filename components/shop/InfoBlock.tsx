'use client';

import React from 'react';
import { Truck, Clock, RotateCcw, Headphones } from 'lucide-react';

export const InfoBlock: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8 px-0">
      {/* Free Shipping */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-3 bg-amber-50 rounded-lg">
          <Truck size={28} className="text-amber-700" />
        </div>
        <div>
          <h3 className="font-bold text-sm uppercase text-gray-900 mb-1">
            Free Shipping
          </h3>
          <p className="text-xs text-gray-600">On all orders of $150</p>
        </div>
      </div>

      {/* Summer Collection */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-3 bg-blue-50 rounded-lg">
          <Headphones size={28} className="text-blue-700" />
        </div>
        <div>
          <h3 className="font-bold text-sm uppercase text-gray-900 mb-1">
            Summer Sale
          </h3>
          <p className="text-xs text-gray-600">Save up to 70% off</p>
        </div>
      </div>

      {/* 24/7 Support */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-3 bg-green-50 rounded-lg">
          <Clock size={28} className="text-green-700" />
        </div>
        <div>
          <h3 className="font-bold text-sm uppercase text-gray-900 mb-1">
            24/7 Support
          </h3>
          <p className="text-xs text-gray-600">Get help when you need it</p>
        </div>
      </div>

      {/* Money Back */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-3 bg-red-50 rounded-lg">
          <RotateCcw size={28} className="text-red-700" />
        </div>
        <div>
          <h3 className="font-bold text-sm uppercase text-gray-900 mb-1">
            100% Money Back
          </h3>
          <p className="text-xs text-gray-600">30 day money back guarantee</p>
        </div>
      </div>
    </div>
  );
};
