'use client';

import React from 'react';
import { ProductCard } from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  regularPrice: number;
  category: string;
  categoryId: string;
  image: string;
  inStock: boolean;
  isNew?: boolean;
}

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  onAddToCart?: (productId: string) => void;
  onAddToWishlist?: (productId: string) => void;
  sortBy?: 'relevant' | 'price-low' | 'price-high' | 'newest';
  viewType?: 'grid' | 'list';
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  onAddToCart,
  onAddToWishlist,
  sortBy = 'relevant',
  viewType = 'grid',
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-gray-500 text-lg mb-2">No products found</p>
        <p className="text-gray-400 text-sm">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div>
      {/* Grid Layout */}
      <div className={`grid gap-6 ${
        viewType === 'grid'
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          : 'grid-cols-1'
      }`}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onAddToCart={onAddToCart}
            onAddToWishlist={onAddToWishlist}
          />
        ))}
      </div>

      {/* Results Count */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{products.length}</span> results
        </p>
        <div className="text-xs text-gray-500">
          Sorted by: <span className="font-semibold capitalize">{sortBy}</span>
        </div>
      </div>
    </div>
  );
};
