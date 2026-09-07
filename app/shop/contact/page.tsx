'use client';

import React, { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <>
      <div className="container" style={{ padding: '40px 20px', minHeight: '80vh' }}>
        <div className="row justify-content-between align-items-center mb-5">
          <div className="col-lg-6 col-md-12 col-12 d-flex flex-column justify-content-center">
            <div className="mb-4">
              <h2 className="font-weight-bold" style={{ color: '#2D2928' }}>Contact Us</h2>
              <h6 className="text-muted">
                If you have any questions please fill out the form
              </h6>
            </div>
            
            {success && (
              <div className="alert alert-success" role="alert">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="name" className="font-weight-bold text-muted" style={{ fontSize: '13px' }}>
                  Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  className="form-control w-100" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  style={{ height: '45px' }}
                />
              </div>
              
              <div className="row mb-3">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="email" className="font-weight-bold text-muted" style={{ fontSize: '13px' }}>
                      Email
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      className="form-control" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                      style={{ height: '45px' }}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="phone" className="font-weight-bold text-muted" style={{ fontSize: '13px' }}>
                      Phone
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className="form-control" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      style={{ height: '45px' }}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group mb-4">
                <label htmlFor="message" className="font-weight-bold text-muted" style={{ fontSize: '13px' }}>
                  Your Message
                </label>
                <textarea 
                  id="message" 
                  className="form-control w-100" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  required 
                  style={{ height: '155px', resize: 'none' }}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary text-uppercase font-weight-bold align-self-start"
                style={{
                  backgroundColor: '#E93172',
                  borderColor: '#E93172',
                  padding: '12px 32px',
                  borderRadius: '4px'
                }}
              >
                send message
              </button>
            </form>
          </div>
          
          <div className="col-lg-6 col-md-12 col-12 d-none d-lg-block text-right">
            <img 
              src="/images/e-commerce/contact/img.png" 
              alt="Contact visual" 
              className="img-fluid" 
              style={{ maxHeight: '500px', objectFit: 'cover', borderRadius: '4px' }}
            />
          </div>
        </div>
      </div>

      {/* Instagram Widget */}
      <div className="container mb-5">
        <h5 className="font-weight-bold text-center mt-5 mb-4" style={{ letterSpacing: '1px', textTransform: 'uppercase', fontSize: '14px', color: '#E93172' }}>
          Follow us on Instagram
        </h5>
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