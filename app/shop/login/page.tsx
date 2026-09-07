'use client';

import React, { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
    setTimeout(() => {
      window.location.href = '/shop';
    }, 2000);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center" style={{
        minHeight: '85vh',
        backgroundImage: 'url(/images/e-commerce/login/bg.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '40px 20px'
      }}>
        <div className="card shadow border-0" style={{ maxWidth: '450px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
          <div className="card-body p-5">
            <div className="text-center mb-5">
              <h4 className="font-weight-bold" style={{ color: '#2D2928' }}>Login</h4>
              <p className="text-muted" style={{ fontSize: '14px' }}>Sign in to your e-commerce account</p>
            </div>
            
            {registered ? (
              <div className="alert alert-success text-center" role="alert">
                Login successful! Redirecting to homepage...
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <label htmlFor="loginEmail" className="font-weight-bold text-muted" style={{ fontSize: '13px' }}>
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    id="loginEmail" 
                    className="form-control" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    style={{ height: '48px', border: '1px solid #e1e5eb', borderRadius: '4px' }}
                    placeholder="Enter email"
                  />
                </div>
                
                <div className="form-group mb-4">
                  <div className="d-flex justify-content-between mb-1">
                    <label htmlFor="loginPass" className="font-weight-bold text-muted mb-0" style={{ fontSize: '13px' }}>
                      Password
                    </label>
                    <a href="#" className="font-weight-bold" style={{ fontSize: '13px', color: '#E93172', textDecoration: 'none' }}>
                      Forgot Password?
                    </a>
                  </div>
                  <input 
                    type="password" 
                    id="loginPass" 
                    className="form-control" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    style={{ height: '48px', border: '1px solid #e1e5eb', borderRadius: '4px' }}
                    placeholder="Password"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary btn-block text-uppercase font-weight-bold mb-4"
                  style={{
                    backgroundColor: '#E93172',
                    borderColor: '#E93172',
                    height: '48px',
                    fontSize: '14px',
                    borderRadius: '4px'
                  }}
                >
                  sign in
                </button>
                
                <div className="text-center" style={{ fontSize: '14px' }}>
                  <span className="text-muted">Don't have an account? </span>
                  <a href="/shop/login" className="font-weight-bold" style={{ color: '#E93172', textDecoration: 'none' }}>
                    Sign Up
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}