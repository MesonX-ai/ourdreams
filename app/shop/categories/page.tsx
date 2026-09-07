'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES_MOCK = [
  { id: '1', name: 'Awesome Armchair', price: 123, category: 'Furniture', img: '/images/e-commerce/home/product1.png' },
  { id: '2', name: 'Wooden casket', price: 90, category: 'Decoration', img: '/images/e-commerce/home/product2.png' },
  { id: '3', name: 'Awesome Lamp', price: 20, category: 'Lighting', img: '/images/e-commerce/home/product3.png' },
  { id: '4', name: 'Soft Pillow', price: 40, category: 'Bedding', img: '/images/e-commerce/home/product4.png' },
  { id: '5', name: 'Comfy Cushion', price: 30, category: 'Bedding', img: '/images/e-commerce/home/product5.png' },
  { id: '6', name: 'Scandinavian Sofa', price: 450, category: 'Furniture', img: '/images/e-commerce/home/product6.png' },
  { id: '7', name: 'Ceramic Vase', price: 15, category: 'Decoration', img: '/images/e-commerce/home/product7.png' },
  { id: '8', name: 'Minimalist Clock', price: 25, category: 'Decoration', img: '/images/e-commerce/home/product8.png' },
];

export default function CategoriesPage() {
  const [width, setWidth] = useState(1440);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const visibleSlidesCount = width > 992 ? 4 : width > 576 ? 2 : 1;
  const maxIndex = SLIDES_MOCK.length - visibleSlidesCount;

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <>
      <div className="container mb-5" style={{ marginTop: '32px' }}>
        
        {/* Banner Matrix Row */}
        <div className="row">
          
          {/* Main Full-width upper Banner */}
          <div className="col-12 mb-4">
            <a href="/shop/catalog" className="text-decoration-none">
              <div className="main-banner-wrapper">
                <img src="/images/e-commerce/main_banner.jpg" alt="Arrivals" className="img-fluid w-100" />
                <h2 className="main-banner-text">NEW ARRIVALS</h2>
              </div>
            </a>
          </div>

          {/* Left Block Col (Spring Sale) */}
          <div className="col-lg-6 col-md-6 col-12 mb-4">
            <a href="/shop/catalog" className="text-decoration-none">
              <div className="category-split-block spring-sale-block">
                <div className="right-discount-badge">SPRING SALE</div>
              </div>
            </a>
          </div>

          {/* Right Block Col (Living Room Collection) */}
          <div className="col-lg-6 col-md-6 col-12 mb-4">
            <a href="/shop/catalog" className="text-decoration-none">
              <div className="category-split-block living-room-block">
                <div className="split-text-content">
                  <div>
                    <span>Accessories</span>
                    <strong>For Living Room</strong>
                    <b>View Collection</b>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Bottom Row - Pillows (Col 3) */}
          <div className="col-lg-3 col-md-6 col-12 mb-4">
            <a href="/shop/catalog" className="text-decoration-none">
              <div className="category-split-block pillows-block">
                <div className="block-centered-content">
                  <span>up to 60%</span>
                  <strong>Pillows</strong>
                </div>
              </div>
            </a>
          </div>

          {/* Bottom Row - Kitchen (Col 6) */}
          <div className="col-lg-6 col-md-6 col-12 mb-4">
            <a href="/shop/catalog" className="text-decoration-none">
              <div className="category-split-block kitchen-block">
                <div className="split-text-content">
                  <div>
                    <span>Accessories</span>
                    <strong>For Kitchen</strong>
                    <b>View Collection</b>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Bottom Row - Bed Linen (Col 3) */}
          <div className="col-lg-3 col-md-6 col-12 mb-4">
            <a href="/shop/catalog" className="text-decoration-none">
              <div className="category-split-block bed-linen-block">
                <strong>Bed Linen</strong>
              </div>
            </a>
          </div>

        </div>

        {/* Our Dreams "You may also like" slider row */}
        <div className="section mt-5 position-relative">
          <h2 className="slider-section-heading mb-4 pl-2">You may also like:</h2>
          
          <div className="slider-outer-wrapper">
            <button className="slider-nav-arrow back-arrow" onClick={prevSlide}>
              <ChevronLeft size={24} />
            </button>

            <div className="slider-viewport" style={{ overflow: 'hidden' }}>
              <div className="slider-track" style={{
                display: 'flex',
                transition: 'transform 0.4s ease-in-out',
                transform: `translateX(-${carouselIndex * (100 / visibleSlidesCount)}%)`
              }}>
                {SLIDES_MOCK.map((item, index) => (
                  <div 
                    key={index} 
                    className="slider-item"
                    style={{
                      flex: `0 0 ${100 / visibleSlidesCount}%`,
                      padding: '0 15px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div className="slider-item-content">
                      <a href={`/shop/product/${item.id}`}>
                        <img 
                          src={item.img} 
                          alt={item.name} 
                          className="img-fluid mb-3" 
                        />
                      </a>
                      <p className="text-muted text-uppercase mb-1" style={{ fontSize: '11px', fontWeight: 600 }}>{item.category}</p>
                      <a href={`/shop/product/${item.id}`} className="text-decoration-none text-dark">
                        <h6 className="font-weight-bold" style={{ fontSize: '16px' }}>{item.name}</h6>
                      </a>
                      <h6 className="font-weight-bold" style={{ color: '#E93172', fontSize: '16px' }}>${item.price}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="slider-nav-arrow next-arrow" onClick={nextSlide}>
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Info Block Sandwiched */}
        <hr className="mt-5" />
        <div className="info-ourdreams-store py-4 my-4">
          <div className="row w-100 m-0 text-center">
            <div className="col-md-4 col-12 info-item-ourdreams-store mb-3 mb-md-0">
              <div className="d-flex align-items-center justify-content-center">
                <img src="/images/e-commerce/home/car.svg" alt="Free Shipping" style={{ width: '40px', height: '40px', marginRight: '16px' }} />
                <div className="text-left">
                  <h5 className="font-weight-bold text-uppercase mb-1" style={{ fontSize: '14px' }}>free shipping</h5>
                  <p className="text-muted mb-0" style={{ fontSize: '12px' }}>On all orders of $ 150</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12 info-item-ourdreams-store mb-3 mb-md-0">
              <div className="d-flex align-items-center justify-content-center">
                <img src="/images/e-commerce/home/headphones.svg" alt="24/7 Support" style={{ width: '40px', height: '40px', marginRight: '16px' }} />
                <div className="text-left">
                  <h5 className="font-weight-bold text-uppercase mb-1" style={{ fontSize: '14px' }}>24/7 support</h5>
                  <p className="text-muted mb-0" style={{ fontSize: '12px' }}>Get help when you need it</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12 info-item-ourdreams-store">
              <div className="d-flex align-items-center justify-content-center">
                <img src="/images/e-commerce/home/Sync.svg" alt="Money Back" style={{ width: '40px', height: '40px', marginRight: '16px' }} />
                <div className="text-left">
                  <h5 className="font-weight-bold text-uppercase mb-1" style={{ fontSize: '14px' }}>100% money back</h5>
                  <p className="text-muted mb-0" style={{ fontSize: '12px' }}>30 day money back guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="mb-5" />

        {/* Instagram Widget */}
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

      <style jsx global>{`
        /* Our Dreams Banner Grid Styles */
        .main-banner-wrapper {
          position: relative;
          cursor: pointer;
          text-align: center;
          border-radius: 6px;
          overflow: hidden;
        }

        .main-banner-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-weight: 800;
          color: #ffffff;
          font-size: 48px;
          letter-spacing: 2px;
          text-shadow: 2px 2px 8px rgba(0,0,0,0.3);
          margin-bottom: 0;
        }

        .category-split-block {
          cursor: pointer;
          height: 210px;
          position: relative;
          border-radius: 6px;
          background-size: cover;
          background-position: center;
        }

        .spring-sale-block {
          background-image: url('/images/e-commerce/spring-sale.jpg');
        }

        .right-discount-badge {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          padding: 16px 24px;
          letter-spacing: 0.15em;
          font-size: 14px;
          background: #262626;
          color: #ffffff;
          font-weight: 700;
          text-transform: uppercase;
        }

        .living-room-block {
          background-image: url('/images/e-commerce/clock_1.png');
          background-repeat: no-repeat;
          background-position: right center;
          background-color: #f3ece4;
        }

        .kitchen-block {
          background-image: url('/images/e-commerce/kitchen_banner.jpg');
        }

        .pillows-block {
          background-image: url('/images/e-commerce/pillows_banner.jpg');
        }

        .bed-linen-block {
          background-image: url('/images/e-commerce/linen_banner.jpg');
          color: #ffffff;
          font-size: 24px;
          font-weight: 800;
          display: flex;
          justify-content: center;
          align-items: center;
          text-transform: uppercase;
        }

        .split-text-content {
          display: flex;
          align-items: center;
          height: 100%;
          padding-left: 28px;
        }

        .split-text-content span {
          font-size: 13px;
          letter-spacing: 0.15em;
          font-weight: 700;
          color: #2D2928;
          text-transform: uppercase;
          display: block;
          margin-bottom: 4px;
        }

        .split-text-content strong {
          font-size: 24px;
          font-weight: 800;
          color: #2D2928;
          display: block;
          margin-bottom: 12px;
        }

        .split-text-content b {
          color: #E93172;
          font-size: 13px;
          font-weight: 700;
          display: block;
          text-transform: uppercase;
        }

        .block-centered-content {
          text-align: center;
          color: #2D2928;
        }

        .block-centered-content span {
          color: #E93172;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          display: block;
          margin-bottom: 4px;
        }

        .block-centered-content strong {
          font-size: 26px;
          font-weight: 800;
          display: block;
        }

        /* Responsive Slider Carousel Styles */
        .slider-section-heading {
          font-size: 22px;
          font-weight: 800;
          color: #2D2928;
          text-transform: capitalize;
        }

        .slider-outer-wrapper {
          position: relative;
          padding: 0 45px;
        }

        .slider-nav-arrow {
          position: absolute;
          top: 35%;
          transform: translateY(-50%);
          background: #ffffff;
          border: 1px solid #e1e5eb;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #2D2928;
          z-index: 10;
          transition: all 0.3s;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .slider-nav-arrow:hover {
          background-color: #E93172;
          border-color: #E93172;
          color: #ffffff;
        }

        .back-arrow {
          left: 0;
        }

        .next-arrow {
          right: 0;
        }

        .slider-item-content {
          background: #fcfbf9;
          padding: 15px;
          border-radius: 4px;
          text-align: left;
        }

        .slider-item-content img {
          border-radius: 4px;
          height: 220px;
          width: 100%;
          object-fit: contain;
          background-color: #ffffff;
        }
      `}</style>
    </>
  );
}