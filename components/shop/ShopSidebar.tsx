'use client';

import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface ShopSidebarProps {
  categories: Array<{ id: string; name: string }>;
  selectedCategories: string[];
  priceRange: { min: number; max: number };
  onCategoryChange: (categoryId: string) => void;
  onPriceChange: (range: { min: number; max: number }) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const ShopSidebar: React.FC<ShopSidebarProps> = ({
  categories,
  selectedCategories,
  priceRange,
  onCategoryChange,
  onPriceChange,
  isOpen = true,
  onClose,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    brands: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sidebarClasses = `
    ${isOpen ? 'block' : 'hidden md:block'}
    w-full md:w-64 md:pr-8
  `;

  return (
    <aside className={sidebarClasses}>
      {/* Close button (mobile only) */}
      <div className="flex justify-between items-center md:hidden mb-4">
        <h3 className="text-lg font-bold uppercase">Filters</h3>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Categories Section */}
      <div className="mb-8">
        <button
          onClick={() => toggleSection('categories')}
          className="w-full flex justify-between items-center mb-4 hover:text-amber-700 transition-colors"
        >
          <h5 className="text-sm font-bold uppercase tracking-wide text-gray-900">
            Categories
          </h5>
          <ChevronDown
            size={18}
            className={`transition-transform ${expandedSections.categories ? '' : '-rotate-90'}`}
          />
        </button>

        {expandedSections.categories && (
          <div className="space-y-3">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => onCategoryChange(category.id)}
                  className="w-4 h-4 border-2 border-gray-700 rounded accent-amber-700 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-amber-700 transition-colors">
                  {category.name}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Section */}
      <div className="mb-8">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex justify-between items-center mb-4 hover:text-amber-700 transition-colors"
        >
          <h5 className="text-sm font-bold uppercase tracking-wide text-gray-900">
            Price Range
          </h5>
          <ChevronDown
            size={18}
            className={`transition-transform ${expandedSections.price ? '' : '-rotate-90'}`}
          />
        </button>

        {expandedSections.price && (
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-600 uppercase">Min Price</label>
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) =>
                  onPriceChange({ ...priceRange, min: Number(e.target.value) })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-amber-700 text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-gray-600 uppercase">Max Price</label>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) =>
                  onPriceChange({ ...priceRange, max: Number(e.target.value) })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-amber-700 text-sm"
              />
            </div>

            <div className="text-sm text-gray-600">
              Showing: ${priceRange.min} - ${priceRange.max}
            </div>
          </div>
        )}
      </div>

      {/* Brands Section */}
      <div className="mb-8">
        <button
          onClick={() => toggleSection('brands')}
          className="w-full flex justify-between items-center mb-4 hover:text-amber-700 transition-colors"
        >
          <h5 className="text-sm font-bold uppercase tracking-wide text-gray-900">
            Brands
          </h5>
          <ChevronDown
            size={18}
            className={`transition-transform ${expandedSections.brands ? '' : '-rotate-90'}`}
          />
        </button>

        {expandedSections.brands && (
          <div className="space-y-3">
            {['Our Dreams', 'Premium', 'Luxury', 'Classic'].map((brand) => (
              <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-2 border-gray-700 rounded accent-amber-700 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-amber-700 transition-colors">
                  {brand}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};
