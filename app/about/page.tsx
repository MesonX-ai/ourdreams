'use client';

import React from 'react';

export default function AboutPage() {
  return (
    <>
      <div className="container" style={{ padding: '60px 20px', minHeight: '80vh', marginTop: '32px' }}>
        <div className="row">
          
          {/* Left Text Block */}
          <div className="col-lg-7 col-md-7 col-12">
            <h3 className="font-weight-bold mb-5" style={{ color: '#29323a', fontSize: '30px' }}>About Us</h3>
            
            {/* Block 01 */}
            <div style={{ position: "relative" }} className="mb-5">
              <h1 className="font-weight-bold" style={{
                fontSize: '88px',
                color: '#f5f5f5',
                position: 'absolute',
                left: 0,
                top: 0,
                zIndex: -1,
                lineHeight: 1
              }}>
                01
              </h1>
              <div style={{ paddingLeft: '67px', paddingTop: '28px', position: 'relative' }}>
                <h6 className="text-uppercase mb-3 font-weight-bold" style={{ color: '#bd744c', letterSpacing: '1px', fontSize: '13px' }}>
                  Technology
                </h6>
                <h4 className="font-weight-bold mb-4" style={{ width: '80%', color: '#29323a', fontSize: '20px', lineHeight: '1.4' }}>
                  Sustainable Furniture Rocks This World! Check Out New Minimalistic Wooden Collection
                </h4>
                <p className="text-muted" style={{ width: '93%', fontSize: '14px', lineHeight: '1.6' }}>
                  There is no denying that eco-friendly materials can easily conquer the market. But can we produce enough to fulfill the growing demands? Can we create an astonishing look for the new collection of eco-friendly furniture? That is a tough question. But did make an effort!{" "}
                </p>
                <div style={{
                  backgroundColor: '#bd744c',
                  height: '3px',
                  width: '80px',
                  position: 'absolute',
                  bottom: '-2px',
                  left: '67px'
                }}></div>
                <hr className="mt-4" />
              </div>
            </div>

            {/* Block 02 */}
            <div style={{ position: "relative" }} className="mb-5">
              <h1 className="font-weight-bold" style={{
                fontSize: '88px',
                color: '#f5f5f5',
                position: 'absolute',
                left: 0,
                top: 0,
                zIndex: -1,
                lineHeight: 1
              }}>
                02
              </h1>
              <div style={{ paddingLeft: '67px', paddingTop: '28px', position: 'relative' }}>
                <h6 className="text-uppercase mb-3 font-weight-bold" style={{ color: '#bd744c', letterSpacing: '1px', fontSize: '13px' }}>
                  Interior
                </h6>
                <h4 className="font-weight-bold mb-4" style={{ width: '80%', color: '#29323a', fontSize: '20px', lineHeight: '1.4' }}>
                  Primary Palette Can Allow You To Be Bold! Give Your Interior Artistic Edge
                </h4>
                <p className="text-muted" style={{ width: '93%', fontSize: '14px', lineHeight: '1.6' }}>
                  Use this well-known tip for mixing two primary colors with a trendy muted palette. Neutral spaces with wooden furniture can be changed within a minutes using the right set of vibrant colors. Such interior design helps you to stand out from ordinary palettes.{" "}
                </p>
                <div style={{
                  backgroundColor: '#bd744c',
                  height: '3px',
                  width: '80px',
                  position: 'absolute',
                  bottom: '-2px',
                  left: '67px'
                }}></div>
                <hr className="mt-4" />
              </div>
            </div>

            {/* Block 03 */}
            <div style={{ position: "relative" }} className="mb-5">
              <h1 className="font-weight-bold" style={{
                fontSize: '88px',
                color: '#f5f5f5',
                position: 'absolute',
                left: 0,
                top: 0,
                zIndex: -1,
                lineHeight: 1
              }}>
                03
              </h1>
              <div style={{ paddingLeft: '67px', paddingTop: '28px', position: 'relative' }}>
                <h6 className="text-uppercase mb-3 font-weight-bold" style={{ color: '#bd744c', letterSpacing: '1px', fontSize: '13px' }}>
                  Design
                </h6>
                <h4 className="font-weight-bold mb-4" style={{ width: '80%', color: '#29323a', fontSize: '20px', lineHeight: '1.4' }}>
                  Check Out The Latest Design Trends! Minimalism, Stripes, and Sculptural Furniture
                </h4>
                <p className="text-muted" style={{ width: '93%', fontSize: '14px', lineHeight: '1.6' }}>
                  Let's mix stripes and checks - everyone's favorite patterns. New-season colors add the right balance to this awesome mix. Even in bedroom decor you can use this fun new trend along with classic cushions and delicate color scheme or love colorful decoration.{" "}
                </p>
                <div style={{
                  backgroundColor: '#bd744c',
                  height: '3px',
                  width: '80px',
                  position: 'absolute',
                  bottom: '-2px',
                  left: '67px'
                }}></div>
                <hr className="mt-4" />
              </div>
            </div>
          </div>
          
          {/* Right Product Showcase Images */}
          <div className="col-lg-5 col-md-5 col-12 d-flex flex-column gap-4 text-center">
            <img 
              src="/images/e-commerce/about/img1.png" 
              alt="Sustainable design" 
              className="img-fluid mb-5 shadow-sm" 
              style={{ borderRadius: '4px', border: '1px solid #e1e5eb', flex: '1 1 auto', objectFit: 'cover' }} 
            />
            <img 
              src="/images/e-commerce/about/img2.png" 
              alt="Minimalist collection" 
              className="img-fluid shadow-sm" 
              style={{ borderRadius: '4px', border: '1px solid #e1e5eb', flex: '1 1 auto', objectFit: 'cover' }} 
            />
          </div>
          
        </div>

        {/* Sandwiched InfoBlock Section */}
        <hr className="mt-5" />
        <div className="info-ourdreams-store py-4 my-4">
          <div className="row w-100 m-0 text-center">
            <div className="col-md-4 col-12 info-item-ourdreams-store mb-3 mb-md-0">
              <div className="d-flex align-items-center justify-content-center">
                <img src="/images/e-commerce/home/car.svg" alt="Free Shipping" style={{ width: '40px', height: '40px', marginRight: '16px' }} />
                <div className="text-left">
                  <h5 className="font-weight-bold text-uppercase mb-1" style={{ fontSize: '14px', color: '#29323a' }}>free shipping</h5>
                  <p className="text-muted mb-0" style={{ fontSize: '12px' }}>On all orders of $ 150</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12 info-item-ourdreams-store mb-3 mb-md-0">
              <div className="d-flex align-items-center justify-content-center">
                <img src="/images/e-commerce/home/headphones.svg" alt="24/7 Support" style={{ width: '40px', height: '40px', marginRight: '16px' }} />
                <div className="text-left">
                  <h5 className="font-weight-bold text-uppercase mb-1" style={{ fontSize: '14px', color: '#29323a' }}>24/7 support</h5>
                  <p className="text-muted mb-0" style={{ fontSize: '12px' }}>Get help when you need it</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12 info-item-ourdreams-store">
              <div className="d-flex align-items-center justify-content-center">
                <img src="/images/e-commerce/home/Sync.svg" alt="Money Back" style={{ width: '40px', height: '40px', marginRight: '16px' }} />
                <div className="text-left">
                  <h5 className="font-weight-bold text-uppercase mb-1" style={{ fontSize: '14px', color: '#29323a' }}>100% money back</h5>
                  <p className="text-muted mb-0" style={{ fontSize: '12px' }}>30 day money back guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="mb-5" />

        {/* Instagram Widget */}
        <div className="row g-2 mt-5">
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

      <style jsx global>{`
        .info-ourdreams-store {
          height: 180px;
          display: flex;
          align-items: center;
          border-top: 1px solid #d9d9d9;
          border-bottom: 1px solid #d9d9d9;
          margin: 80px 0;
        }

        .info-item-ourdreams-store {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }

        @media (min-width: 768px) {
          .info-item-ourdreams-store:not(:last-child) {
            border-right: 1px solid #d9d9d9;
          }
        }

        .info-item-ourdreams-store h5 {
          font-size: 15px;
          font-weight: 700;
          color: #29323a;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .info-item-ourdreams-store p {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 0;
        }
      `}</style>
    </>
  );
}