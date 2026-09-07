'use client';

import React from 'react';

export default function Header() {
  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Left Menu Section */}
          <div className="header-left">
            <ul className="header-nav">
              <li><a href="/">Home</a></li>
              <li><a href="/shop">Store Front</a></li>
              <li><a href="/shop/catalog">Categories</a></li>
              <li><a href="/shop/categories">New Arrivals</a></li>
            </ul>
          </div>

          {/* Middle brand styled exactly from homepage */}
          <div className="header-center">
            <a href="/" className="header-logo">
              <span className="logo-text">
                OUR&nbsp;<span className="heart-pulse">&#9825;</span>&nbsp;DREAMS
              </span>
            </a>
          </div>

          {/* Right Menu Section */}
          <div className="header-right">
            <ul className="header-nav">
              <li><a href="/shop/wishlist">Wishlist</a></li>
              <li><a href="/shop/blog">Blog</a></li>
              <li><a href="/shop/account">My Account</a></li>
              <li><a href="/shop/login">Login</a></li>
            </ul>
            
            {/* Search, Cart, Profile Icons on the far right */}
            <div className="header-icons">
              <a href="/shop/catalog" className="icon-btn" title="Search">
                <div className="header-search-icon" />
              </a>
              <a href="/shop/cart" className="icon-btn" title="Cart">
                <div className="header-cart-icon" />
              </a>
              <a href="/shop/account" className="icon-btn" title="My Account">
                <div className="header-user-icon" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <style jsx global>{`
        /* Header/Navigation Custom Replica */
        .header {
          background-color: #ffffff;
          box-shadow: 0 4px 20px rgba(38, 38, 38, 0.05);
          position: fixed;
          width: 100%;
          top: 0;
          left: 0;
          z-index: 1000;
          height: 90px;
          display: flex;
          align-items: center;
          padding: 0 40px;
        }

        .header-container {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
        }

        .header-left {
          display: flex;
          align-items: center;
          flex: 1;
          justify-content: flex-end;
          padding-right: 40px;
        }

        .header-center {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
        }

        .header-right {
          display: flex;
          align-items: center;
          flex: 1;
          padding-left: 40px;
          justify-content: space-between;
        }

        .header-nav {
          display: flex;
          gap: 24px;
          list-style: none;
          margin-bottom: 0;
          align-items: center;
          padding: 0;
        }

        .header-nav a {
          color: #2D2928;
          text-decoration: none;
          font-family: 'Bebas Neue', sans-serif;
          font-weight: 500;
          font-size: 20px;
          letter-spacing: 0.5px;
          transition: color 0.3s ease;
          text-transform: uppercase;
        }

        .header-nav a:hover {
          color: #E93172;
        }

        /* Middle logo styling identical to homepage */
        .header-logo {
          text-decoration: none;
          display: inline-block;
        }

        .logo-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 2px;
          color: #2D2928;
          font-weight: 600;
          line-height: 32px;
          vertical-align: middle;
          white-space: nowrap;
          display: inline-block;
        }

        .heart-pulse {
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

        .header-icons {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
        }

        .header-search-icon {
          width: 20px;
          height: 20px;
          content: url("/images/e-commerce/header/search.svg");
          transition: all 0.3s;
        }

        .icon-btn:hover .header-search-icon {
          content: url("/images/e-commerce/header/search-active.svg");
        }

        .header-cart-icon {
          width: 20px;
          height: 20px;
          content: url("/images/e-commerce/header/shopping-cart.svg");
          transition: all 0.3s;
        }

        .icon-btn:hover .header-cart-icon {
          content: url("/images/e-commerce/header/shopping-cart-active.svg");
        }

        .header-user-icon {
          width: 20px;
          height: 20px;
          content: url("/images/e-commerce/header/person.svg");
          transition: all 0.3s;
        }

        .icon-btn:hover .header-user-icon {
          content: url("/images/e-commerce/header/person-active.svg");
        }

        @media (max-width: 1024px) {
          .header {
            padding: 0 20px;
            height: auto;
            padding-top: 15px;
            padding-bottom: 15px;
            position: static;
          }
          .header-container {
            flex-direction: column;
            gap: 15px;
          }
          .header-left, .header-right {
            padding: 0;
            justify-content: center;
            width: 100%;
          }
          .header-nav {
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
          }
        }
      `}</style>
    </>
  );
}