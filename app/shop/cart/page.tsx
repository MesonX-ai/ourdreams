'use client';

import React, { useState } from 'react';

type CartItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
};

const INITIAL_CART: CartItem[] = [
  { id: '1', name: 'Awesome Armchair', category: 'Furniture', price: 123, quantity: 1, image: '/images/e-commerce/home/product1.png' },
  { id: '3', name: 'Awesome Lamp', category: 'Lighting', price: 20, quantity: 2, image: '/images/e-commerce/home/product3.png' },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);
  const [checkedOut, setCheckedOut] = useState(false);

  const updateQuantity = (id: string, amount: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + amount;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setCheckedOut(true);
    setCartItems([]);
  };

  return (
    <>
      <div className="container" style={{ padding: '40px 20px', minHeight: '80vh' }}>
        <h2 className="font-weight-bold mt-4 mb-5" style={{ color: '#2D2928' }}>Shopping Cart</h2>
        
        {checkedOut ? (
          <div className="alert alert-success text-center p-5" role="alert">
            <h4 className="font-weight-bold mb-3">Order Placed Successfully!</h4>
            <p className="mb-4">Thank you for your purchase. We will email you with your tracking details shortly.</p>
            <a href="/shop/catalog" className="btn btn-primary" style={{ backgroundColor: '#E93172', borderColor: '#E93172', padding: '10px 30px' }}>
              Continue Shopping
            </a>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-5">
            <h5 className="font-weight-bold text-muted mb-4">Your cart is currently empty.</h5>
            <a href="/shop/catalog" className="btn btn-primary" style={{ backgroundColor: '#E93172', borderColor: '#E93172', padding: '12px 36px' }}>
              Browse Collection
            </a>
          </div>
        ) : (
          <div className="row justify-content-between">
            <div className="col-lg-8 col-md-12 col-12 mb-5">
              <table className="table borderless" style={{ borderCollapse: 'separate', borderSpacing: '0 15px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #D9D9D9' }}>
                    <th className="bg-transparent text-dark px-0 text-left" style={{ fontWeight: 700 }}>Product</th>
                    <th className="bg-transparent text-dark px-0 text-left" style={{ fontWeight: 700 }}>Price</th>
                    <th className="bg-transparent text-dark px-0 text-left" style={{ fontWeight: 700 }}>Quantity</th>
                    <th className="bg-transparent text-dark px-0 text-left" style={{ fontWeight: 700 }}>Total</th>
                    <th className="bg-transparent text-dark px-0 text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
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
                      <td className="px-3 py-4 align-middle font-weight-bold" style={{ color: '#2D2928', fontSize: '15px' }}>
                        ${item.price}
                      </td>
                      <td className="px-3 py-4 align-middle">
                        <div className="d-flex align-items-center" style={{ gap: '12px' }}>
                          <button 
                            className="bg-transparent border-0 p-1 fontWeight-bold"
                            onClick={() => updateQuantity(item.id, -1)}
                            style={{ cursor: 'pointer', fontSize: '18px', color: '#2D2928' }}
                          >
                            -
                          </button>
                          <span className="font-weight-bold" style={{ fontSize: '15px' }}>{item.quantity}</span>
                          <button 
                            className="bg-transparent border-0 p-1 fontWeight-bold"
                            onClick={() => updateQuantity(item.id, 1)}
                            style={{ cursor: 'pointer', fontSize: '18px', color: '#2D2928' }}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-3 py-4 align-middle font-weight-bold" style={{ color: '#E93172', fontSize: '16px' }}>
                        ${item.price * item.quantity}
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
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cart Total Summary Box */}
            <div className="col-lg-3 col-md-12 col-12">
              <div className="p-4" style={{ backgroundColor: '#fcfbf9', borderRadius: '4px', border: '1px solid #f0edf8' }}>
                <h5 className="font-weight-bold mb-4" style={{ color: '#2D2928', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Cart Total</h5>
                
                <div className="d-flex justify-content-between mb-3" style={{ fontSize: '14px' }}>
                  <span className="text-muted">Subtotal</span>
                  <span className="font-weight-bold" style={{ color: '#2D2928' }}>${subtotal}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-3" style={{ fontSize: '14px' }}>
                  <span className="text-muted">Shipping</span>
                  <span className="font-weight-bold" style={{ color: '#2D2928' }}>
                    {shipping === 0 ? 'FREE' : `$${shipping}`}
                  </span>
                </div>
                
                <hr style={{ borderTop: '1px solid #e1e5eb' }} />
                
                <div className="d-flex justify-content-between mb-4" style={{ fontSize: '16px' }}>
                  <span className="font-weight-bold" style={{ color: '#2D2928' }}>Order Total</span>
                  <span className="font-weight-bold" style={{ color: '#E93172', fontSize: '18px' }}>${total}</span>
                </div>
                
                <button 
                  className="btn btn-primary btn-block text-uppercase font-weight-bold"
                  style={{
                    backgroundColor: '#E93172',
                    borderColor: '#E93172',
                    height: '48px',
                    fontSize: '13px',
                    borderRadius: '4px'
                  }}
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}