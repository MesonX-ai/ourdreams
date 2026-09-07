'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  regularPrice: number;
  category: string;
  categoryId: string;
  image: string;
  inStock: boolean;
  isNew?: boolean;
  onAddToCart?: (id: string) => void;
  onAddToWishlist?: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  regularPrice,
  category,
  categoryId,
  image,
  inStock,
  isNew,
  onAddToCart,
  onAddToWishlist,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount = Math.round(((regularPrice - price) / regularPrice) * 100);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    onAddToWishlist?.(id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddToCart?.(id);
  };

  return (
    <div className="group relative flex flex-col">
      <Link href={`/shop/product/${id}`}>
        <div
          className="relative mb-4 overflow-hidden bg-gray-100 aspect-square rounded-lg cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold z-10">
              {discount}% OFF
            </div>
          )}

          {/* New Badge */}
          {isNew && (
            <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold z-10">
              NEW
            </div>
          )}

          {/* Product Image */}
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
          />

          {/* Action Buttons Overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center gap-6 bg-black/0 group-hover:bg-black/20 transition-all duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              onClick={handleWishlist}
              className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
              title="Add to Wishlist"
            >
              <Heart
                size={20}
                className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'}
              />
            </button>

            <button
              className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
              title="View Details"
            >
              <Eye size={20} className="text-gray-700" />
            </button>

            <button
              onClick={handleAddToCart}
              className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
              title="Add to Cart"
              disabled={!inStock}
            >
              <ShoppingCart size={20} className={inStock ? 'text-gray-700' : 'text-gray-400'} />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{category}</p>
          <h6 className="text-sm font-medium text-gray-800 mb-2 group-hover:text-amber-700 transition-colors line-clamp-2">
            {name}
          </h6>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">${price.toFixed(2)}</span>
            {regularPrice > price && (
              <span className="text-sm text-gray-400 line-through">
                ${regularPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <p className={`text-xs mt-1 ${inStock ? 'text-green-600' : 'text-red-600'}`}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </p>
        </div>
      </Link>
    </div>
  );
};
