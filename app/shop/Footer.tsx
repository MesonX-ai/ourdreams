'use client';

import React from 'react';

export default function Footer() {
  return (
    <>
      <footer className="footer-v2">
        <div className="container">
          {/* Top Newsletter Row */}
          <div className="footer-top-row">
            <div className="footer-newsletter-info">
              <h5 className="newsletter-heading">Many desktop publishing</h5>
              <p className="newsletter-desc">
                Do you want to receive exclusive email offers? Subscribe to our newsletter! You will receive a unique promo code which gives you a 20% discount on all our products in 10 minutes.
              </p>
            </div>
            <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" className="footer-email-input" required />
              <button type="submit" className="footer-subscribe-btn">Subscribe</button>
            </form>
          </div>
          
          <hr className="footer-divider" />
          
          {/* Middle Links Row */}
          <div className="footer-middle-row">
            <div className="footer-brand-column">
              <a href="/" className="footer-logo-link">
                <span className="footer-logo-text">
                  OUR&nbsp;<span className="heart-pulse">&#9825;</span>&nbsp;DREAMS
                </span>
              </a>
              <p className="footer-brand-desc">
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
              <div className="footer-social-links">
                <a href="https://ourdreams-store.com/" target="_blank" rel="noopener noreferrer">
                  <img src="/images/e-commerce/google.svg" alt="Google" />
                </a>
                <a href="https://twitter.com/ourdreams-store" target="_blank" rel="noopener noreferrer">
                  <img src="/images/e-commerce/twitter.svg" alt="Twitter" />
                </a>
                <a href="https://www.linkedin.com/company/ourdreams-store/" target="_blank" rel="noopener noreferrer">
                  <img src="/images/e-commerce/linkedin.svg" alt="LinkedIn" />
                </a>
                <a href="https://www.facebook.com/ourdreams-store/" target="_blank" rel="noopener noreferrer">
                  <img src="/images/e-commerce/facebook.svg" alt="Facebook" />
                </a>
              </div>
            </div>
            
            <div className="footer-links-grid">
              <div className="footer-links-col">
                <h5>COMPANY</h5>
                <ul>
                  <li><a href="/shop/about">What We Do</a></li>
                  <li><a href="/shop/catalog">Available Services</a></li>
                  <li><a href="/shop/blog">Latest Posts</a></li>
                  <li><a href="/shop/faq">FAQs</a></li>
                </ul>
              </div>
              
              <div className="footer-links-col">
                <h5>MY ACCOUNT</h5>
                <ul>
                  <li><a href="/shop/login">Sign In</a></li>
                  <li><a href="/shop/cart">View Cart</a></li>
                  <li><a href="/shop/account">Order Tracking</a></li>
                  <li><a href="/shop/faq">Help & Support</a></li>
                </ul>
              </div>
              
              <div className="footer-links-col">
                <h5>CUSTOMER SERVICE</h5>
                <ul>
                  <li><a href="/shop/contact">Help & Contact Us</a></li>
                  <li><a href="/shop/account">Returns & Refunds</a></li>
                  <li><a href="/shop/catalog">Online Stores</a></li>
                  <li><a href="/shop/about-team">Terms & Conditions</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <hr className="footer-divider" />
          
          {/* Bottom Copyright Row */}
          <div className="footer-bottom-row">
            <p className="copyright-text" suppressHydrationWarning>
              © 2020-{new Date().getFullYear()} powered by <a href="https://ourdreams-store.com" target="_blank" rel="noopener noreferrer">Our Dreams</a>
            </p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        /* Footer V2 Styles */
        .footer-v2 {
          background-color: #2D2928;
          color: #ffffff;
          padding: 60px 0 30px;
          margin-top: 80px;
        }
        
        .footer-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
          flex-wrap: wrap;
        }
        
        .footer-newsletter-info {
          flex: 1;
          min-width: 300px;
        }
        
        .newsletter-heading {
          font-size: 16px;
          font-weight: 700;
          color: #E93172;
          text-transform: uppercase;
          margin-bottom: 12px;
          letter-spacing: 1px;
        }
        
        .newsletter-desc {
          font-size: 14px;
          color: #9cb3c9;
          line-height: 1.6;
          margin-bottom: 0;
        }
        
        .footer-newsletter-form {
          display: flex;
          gap: 16px;
          flex: 1.2;
          min-width: 320px;
          align-items: center;
        }
        
        .footer-email-input {
          flex: 1;
          height: 51px;
          padding: 12px 20px;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          background-color: #ffffff;
          color: #2D2928;
          outline: none;
        }
        
        .footer-subscribe-btn {
          height: 51px;
          padding: 0 32px;
          background-color: #E93172;
          color: #ffffff;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.3s;
          text-transform: uppercase;
        }
        
        .footer-subscribe-btn:hover {
          background-color: #a05f3f;
        }
        
        .footer-divider {
          border: 0;
          border-top: 1px solid #3e4c5b;
          margin: 40px 0;
        }
        
        .footer-middle-row {
          display: flex;
          justify-content: space-between;
          gap: 48px;
          flex-wrap: wrap;
        }
        
        .footer-brand-column {
          flex: 1;
          min-width: 280px;
        }
        
        .footer-logo {
          height: 38px;
          margin-bottom: 24px;
          display: block;
        }
        
        .footer-logo-link {
          text-decoration: none;
          display: inline-block;
          margin-bottom: 24px;
        }
        
        .footer-logo-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 2px;
          color: #ffffff;
          font-weight: 600;
          line-height: 32px;
          vertical-align: middle;
          white-space: nowrap;
          display: inline-block;
        }
        
        .footer-logo-text .heart-pulse {
          display: inline-block;
          color: #E93172;
          animation: heart-pulse-keyframes 1.5s ease-in-out infinite;
        }
        
        @keyframes heart-pulse-keyframes {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
        }
        
        .footer-brand-desc {
          font-size: 14px;
          color: #9cb3c9;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        
        .footer-social-links {
          display: flex;
          gap: 16px;
        }
        
        .footer-social-links a {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background-color: #3e4c5b;
          transition: all 0.3s ease;
        }
        
        .footer-social-links a:hover {
          background-color: #E93172;
          transform: translateY(-2px);
        }
        
        .footer-social-links img {
          width: 18px;
          height: 18px;
          filter: brightness(0) invert(1);
        }
        
        .footer-links-grid {
          flex: 2;
          display: flex;
          justify-content: space-between;
          gap: 32px;
          min-width: 400px;
          flex-wrap: wrap;
        }
        
        .footer-links-col {
          flex: 1;
          min-width: 130px;
        }
        
        .footer-links-col h5 {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 24px;
          letter-spacing: 1px;
        }
        
        .footer-links-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .footer-links-col li {
          margin-bottom: 12px;
        }
        
        .footer-links-col a {
          font-size: 13px;
          color: #9cb3c9;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease, padding-left 0.2s ease;
          display: inline-block;
        }
        
        .footer-links-col a:hover {
          color: #E93172;
          padding-left: 4px;
        }
        
        .footer-bottom-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          color: #9cb3c9;
          margin-top: 30px;
        }
        
        .copyright-text a {
          color: #E93172;
          text-decoration: none;
          font-weight: 600;
        }
        
        .copyright-text a:hover {
          color: #ffffff;
        }
      `}</style>
    </>
  );
}