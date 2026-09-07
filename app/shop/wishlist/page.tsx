'use client';

import React, { useState } from 'react';

type WishlistItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  image: string;
};

const INITIAL_WISHLIST: WishlistItem[] = [
  { id: '1', name: 'Awesome Armchair', category: 'Furniture', price: 123, inStock: true, image: '/images/e-commerce/home/product1.png' },
  { id: '2', name: 'Wooden casket', category: 'Decoration', price: 90, inStock: true, image: '/images/e-commerce/home/product2.png' },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(INITIAL_WISHLIST);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const removeItem = (id: string) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
    showToast('Product successfully removed');
  };

  const addToCart = (item: WishlistItem) => {
    showToast(`${item.name} successfully added to your cart`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <>
      <div className="container" style={{ padding: '40px 20px', minHeight: '80vh' }}>
        
        {toastMessage && (
          <div style={{
            position: 'fixed',
            top: '100px',
            right: '40px',
            backgroundColor: '#2D2928',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 2000,
            fontSize: '14px',
            fontWeight: 600
          }}>
            {toastMessage}
          </div>
        )}

        <div className="row mb-5">
          <div className="col-12" style={{ overflowX: 'auto' }}>
            <h2 className="font-weight-bold mt-4 mb-4" style={{ color: '#2D2928' }}>Wishlist</h2>
            
            <table className="table borderless" style={{ borderCollapse: 'separate', borderSpacing: '0 15px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #D9D9D9' }}>
                  <th className="bg-transparent text-dark px-0 text-left" style={{ fontWeight: 700 }}>Product</th>
                  <th className="bg-transparent text-dark px-0 text-left" style={{ fontWeight: 700 }}>Price</th>
                  <th className="bg-transparent text-dark px-0 text-left" style={{ fontWeight: 700 }}>Stock status</th>
                  <th className="bg-transparent text-dark px-0 text-left" style={{ fontWeight: 700 }}></th>
                  <th className="bg-transparent text-dark px-0 text-right" style={{ fontWeight: 700 }}></th>
                </tr>
              </thead>
              <tbody>
                {wishlist.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-5">
                      <h5 className="font-weight-bold text-muted">No items in your wishlist</h5>
                      <a href="/shop/catalog" className="btn btn-primary mt-3" style={{ backgroundColor: '#E93172', borderColor: '#E93172' }}>Continue Shopping</a>
                    </td>
                  </tr>
                ) : (
                  wishlist.map((item) => (
                    <tr key={item.id} style={{ backgroundColor: '#fcfbf9' }}>
                      <td className="px-3 py-4 align-middle">
                        <div className="d-flex align-items-center">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', marginRight: '20px' }} 
                          />
                          <div>
                            <h6 className="text-muted text-uppercase mb-1" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>{item.category}</h6>
                            <h5 className="font-weight-bold mb-0" style={{ fontSize: '16px', color: '#2D2928' }}>{item.name}</h5>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 align-middle font-weight-bold" style={{ color: '#E93172', fontSize: '16px' }}>
                        ${item.price}
                      </td>
                      <td className="px-3 py-4 align-middle">
                        <span className="font-weight-bold text-uppercase" style={{ fontSize: '13px', color: item.inStock ? '#22c55e' : '#9ca3af' }}>
                          {item.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-3 py-4 align-middle">
                        {item.inStock && (
                          <button 
                            className="btn btn-outline-primary text-uppercase font-weight-bold"
                            style={{ borderColor: '#E93172', color: '#E93172', fontSize: '11px', borderRadius: '4px' }}
                            onClick={() => addToCart(item)}
                          >
                            Add to Cart
                          </button>
                        )}
                      </td>
                      <td className="px-3 py-4 align-middle text-right">
                        <button 
                          className="btn bg-transparent border-0 p-0" 
                          onClick={() => removeItem(item.id)}
                          style={{ cursor: 'pointer' }}
                        >
                          <img src="/images/e-commerce/close.svg" alt="Remove" style={{ width: '16px' }} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4-Column Info Block */}
        <div className="row text-center mt-5 mb-5 py-4" style={{ backgroundColor: '#fcfbf9', borderRadius: '4px' }}>
          <div className="col-md-4 col-sm-12 border-right mb-3 mb-md-0">
            <h5 className="font-weight-bold" style={{ fontSize: '14px', color: '#2D2928' }}>FREE SHIPPING</h5>
            <p className="text-muted mb-0" style={{ fontSize: '12px' }}>On all orders of $150</p>
          </div>
          <div className="col-md-4 col-sm-12 border-right mb-3 mb-md-0">
            <h5 className="font-weight-bold" style={{ fontSize: '14px', color: '#2D2928' }}>24/7 SUPPORT</h5>
            <p className="text-muted mb-0" style={{ fontSize: '12px' }}>Get help when you need it</p>
          </div>
          <div className="col-md-4 col-sm-12">
            <h5 className="font-weight-bold" style={{ fontSize: '14px', color: '#2D2928' }}>100% MONEY BACK</h5>
            <p className="text-muted mb-0" style={{ fontSize: '12px' }}>30 day money back guarantee</p>
          </div>
        </div>

        {/* Instagram widget footer of Wishlist */}
        <div className="row g-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="col-lg-2 col-md-4 col-4">
              <img 
                src={`/images/e-commerce/home/insta${i}.jpg`} 
                alt="Insta" 
                className="img-fluid" 
                style={{ borderRadius: '4px', height: '180px', width: '100%', objectFit: 'cover' }} 
              />
            </div>
          ))}
        </div>

      </div>
    </>
  );
}