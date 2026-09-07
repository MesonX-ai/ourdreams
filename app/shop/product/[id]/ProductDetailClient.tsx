'use client';

import React, { useState } from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
  regularPrice: number;
  category: string;
  image: string;
  desc: string;
};

export default function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState<string | null>(null);

  const handleAddToCart = () => {
    setMessage(`Successfully added ${quantity}x ${product.name} to your cart!`);
    setTimeout(() => setMessage(null), 4000);
  };

  return (
    <div className="container" style={{ padding: '60px 20px', minHeight: '80vh' }}>
      {message && (
        <div className="alert alert-success mt-3 mb-4" role="alert">
          {message}
        </div>
      )}

      <div className="row justify-content-between align-items-center">
        {/* Images Section */}
        <div className="col-lg-6 col-md-12 col-12 mb-5">
          <div className="text-center p-4" style={{ backgroundColor: '#fcfbf9', borderRadius: '6px' }}>
            <img 
              src={product.image} 
              alt={product.name} 
              className="img-fluid" 
              style={{ maxHeight: '420px', objectFit: 'contain' }}
            />
          </div>
          
          {/* Gallery thumbnails */}
          <div className="d-flex justify-content-center gap-3 mt-3">
            <div className="p-2 border" style={{ width: '80px', height: '80px', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#fcfbf9' }}>
              <img src={product.image} alt="Thumb" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div className="p-2 border" style={{ width: '80px', height: '80px', borderRadius: '4px', cursor: 'pointer', opacity: 0.5 }}>
              <img src="/images/e-commerce/home/product2.png" alt="Thumb" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div className="p-2 border" style={{ width: '80px', height: '80px', borderRadius: '4px', cursor: 'pointer', opacity: 0.5 }}>
              <img src="/images/e-commerce/home/product3.png" alt="Thumb" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          </div>
        </div>
        
        {/* Content details Section */}
        <div className="col-lg-5 col-md-12 col-12">
          <h6 className="text-uppercase mb-2 font-weight-bold" style={{ color: '#E93172', letterSpacing: '1px', fontSize: '12px' }}>
            {product.category}
          </h6>
          <h2 className="font-weight-bold mb-3" style={{ color: '#2D2928', fontSize: '32px' }}>
            {product.name}
          </h2>
          
          {/* Reviews */}
          <div className="d-flex align-items-center gap-3 mb-4" style={{ gap: '10px' }}>
            <img src="/images/e-commerce/details/stars.svg" alt="Rating stars" style={{ height: '18px' }} onError={(e) => {
              (e.target as any).style.display = 'none';
            }} />
            <span className="font-weight-bold" style={{ color: '#E93172', fontSize: '13px' }}>12 reviews</span>
          </div>
          
          <div className="mb-4">
            <h3 className="font-weight-bold mb-1" style={{ color: '#E93172', fontSize: '28px' }}>
              ${product.price}
              <span className="text-muted ml-3" style={{ fontSize: '16px', textDecoration: 'line-through', fontWeight: 500 }}>
                ${product.regularPrice}
              </span>
            </h3>
            <span className="badge badge-success text-uppercase font-weight-bold px-2 py-1" style={{ fontSize: '10px' }}>In Stock</span>
          </div>

          <p className="text-muted mb-4" style={{ fontSize: '14px', lineHeight: '1.7' }}>
            {product.desc}
          </p>

          <hr style={{ borderTop: '1px solid #e1e5eb', margin: '30px 0' }} />

          {/* Quantity and Actions */}
          <div className="d-flex flex-wrap align-items-center gap-4 mb-4" style={{ gap: '24px' }}>
            <div className="d-flex flex-column">
              <span className="font-weight-bold text-muted text-uppercase mb-2" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>Quantity</span>
              <div className="d-flex align-items-center border px-3 py-2" style={{ borderRadius: '4px', gap: '16px', height: '48px', backgroundColor: '#fcfbf9' }}>
                <button 
                  className="bg-transparent border-0 font-weight-bold"
                  onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : 1)}
                  style={{ fontSize: '18px', cursor: 'pointer', outline: 'none' }}
                >
                  -
                </button>
                <span className="font-weight-bold" style={{ fontSize: '15px' }}>{quantity}</span>
                <button 
                  className="bg-transparent border-0 font-weight-bold"
                  onClick={() => setQuantity(prev => prev + 1)}
                  style={{ fontSize: '18px', cursor: 'pointer', outline: 'none' }}
                >
                  +
                </button>
              </div>
            </div>

            <div className="d-flex flex-column justify-content-end" style={{ paddingTop: '20px' }}>
              <button 
                type="button"
                className="btn btn-primary text-uppercase font-weight-bold"
                style={{
                  backgroundColor: '#E93172',
                  borderColor: '#E93172',
                  height: '48px',
                  padding: '0 40px',
                  borderRadius: '4px',
                  fontSize: '13px'
                }}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}