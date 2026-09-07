'use client';

import React from 'react';

export default function ErrorPage() {
  return (
    <>
      <div className="container text-center d-flex flex-column align-items-center justify-content-center" style={{ padding: '60px 20px', minHeight: '80vh' }}>
        <div className="mb-4">
          <img 
            src="/images/e-commerce/404/404.png" 
            alt="Page not found" 
            className="img-fluid" 
            style={{ maxHeight: '350px', objectFit: 'contain' }} 
          />
        </div>
        <h2 className="font-weight-bold mb-3" style={{ color: '#2D2928', textTransform: 'uppercase' }}>Opps... Page Not Found</h2>
        <p className="text-muted mb-5" style={{ maxWidth: '500px', fontSize: '14px', lineHeight: '1.6' }}>
          Beautifully designed web apparel template built with React and Bootstrap to create modern apps and speed up development. Sorry, the page you looking for doesn't exist.
        </p>
        <a 
          href="/shop" 
          className="btn btn-primary text-uppercase font-weight-bold"
          style={{
            backgroundColor: '#E93172',
            borderColor: '#E93172',
            padding: '12px 36px',
            borderRadius: '4px',
            fontSize: '13px'
          }}
        >
          back to home
        </a>
      </div>
    </>
  );
}