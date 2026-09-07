'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Eye, ShoppingCart, Search, User, Truck, Headphones, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  price: number;
  regularPrice: number;
  category: string;
  image: string;
  inStock: boolean;
  isNew?: boolean;
};

type BlogPost = {
  id: string;
  title: string;
  date: string;
  image: string;
};

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Awesome Armchair',
    price: 123,
    regularPrice: 200,
    category: 'Furniture',
    image: '/images/e-commerce/home/product1.png',
    inStock: true,
  },
  {
    id: '2',
    name: 'Wooden casket',
    price: 90,
    regularPrice: 120,
    category: 'Decoration',
    image: '/images/e-commerce/home/product2.png',
    inStock: true,
  },
  {
    id: '3',
    name: 'Awesome Lamp',
    price: 20,
    regularPrice: 45,
    category: 'Lighting',
    image: '/images/e-commerce/home/product3.png',
    inStock: true,
  },
  {
    id: '4',
    name: 'Soft Pillow',
    price: 40,
    regularPrice: 70,
    category: 'Bedding',
    image: '/images/e-commerce/home/product4.png',
    inStock: true,
  },
];

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'What is Shabby Chic?',
    date: 'March 12, 2020',
    image: '/images/e-commerce/home/article1.jpg',
  },
  {
    id: '2',
    title: 'Best Examples of Maximalism',
    date: 'March 12, 2020',
    image: '/images/e-commerce/home/article2.jpg',
  },
  {
    id: '3',
    title: 'What is Lorem Ipsum?',
    date: 'March 12, 2020',
    image: '/images/e-commerce/home/article3.jpg',
  },
];

const INSTAGRAM_IMAGES = [
  '/images/e-commerce/home/insta1.jpg',
  '/images/e-commerce/home/insta2.jpg',
  '/images/e-commerce/home/insta3.jpg',
  '/images/e-commerce/home/insta4.jpg',
  '/images/e-commerce/home/insta5.jpg',
  '/images/e-commerce/home/insta6.jpg',
];

const CAROUSEL_IMAGES = [
  {
    image: '/images/e-commerce/home/bg.png',
    subtitle: 'CHAIR',
    title: 'GET ALL',
    mainTitle: 'THE GOOD STUFF',
  },
  {
    image: '/images/e-commerce/home/second_hero.jpg',
    subtitle: 'CHAIR',
    title: 'GET ALL',
    mainTitle: 'THE GOOD STUFF',
  },
  {
    image: '/images/e-commerce/home/first_hero.jpg',
    subtitle: 'CHAIR',
    title: 'GET ALL',
    mainTitle: 'THE GOOD STUFF',
  },
];

export default function ShopLandingPage() {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 42,
    seconds: 23,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          return { days: 2, hours: 14, minutes: 42, seconds: 23 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const nextCarousel = () => {
    setCurrentCarouselIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  };

  const prevCarousel = () => {
    setCurrentCarouselIndex((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#ffffff', color: '#2D2928' }}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        /* Header/Navigation */
        .header {
          background-color: #ffffff;
          box-shadow: 0 4px 20px rgba(38, 38, 38, 0.1);
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 40px;
        }
        
        .header-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
        }
        
        .header-nav {
          display: flex;
          gap: 32px;
          list-style: none;
          margin-bottom: 0;
          align-items: center;
        }
        
        .nav-item-dropdown {
          position: relative;
        }
        
        .dropdown-toggle-link {
          display: flex;
          align-items: center;
          color: #2D2928;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: color 0.3s;
          cursor: pointer;
          text-transform: capitalize;
        }
        
        .dropdown-toggle-link::after {
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          margin-left: 6px;
          background-image: url("/images/e-commerce/header/chevron-down.svg");
          background-size: contain;
          background-repeat: no-repeat;
          transition: transform 0.3s, background-image 0.3s;
        }
        
        .nav-item-dropdown:hover .dropdown-toggle-link {
          color: #E93172;
        }
        
        .nav-item-dropdown:hover .dropdown-toggle-link::after {
          background-image: url("/images/e-commerce/header/chevron-down-active.svg");
          transform: rotate(180deg);
        }
        
        .header-dropdown-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          background-color: #ffffff;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          padding: 12px 0;
          min-width: 180px;
          list-style: none;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1100;
          margin-top: 10px;
        }
        
        .nav-item-dropdown:hover .header-dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }
        
        .header-dropdown-menu li {
          margin: 0;
        }
        
        .header-dropdown-menu a {
          display: block;
          padding: 8px 24px;
          color: #6b7280;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s ease;
          text-align: left;
          white-space: nowrap;
        }
        
        .header-dropdown-menu a:hover {
          color: #E93172;
          background-color: #fcfbf9;
          padding-left: 28px;
        }
        
        .header-nav a {
          color: #2D2928;
          text-decoration: none;
          font-family: 'Bebas Neue', sans-serif;
          font-weight: 500;
          font-size: 18px;
          letter-spacing: 1.5px;
          transition: color 0.3s ease;
          text-transform: uppercase;
        }
        
        .header-nav a:hover {
          color: #E93172;
        }
        
        .header-icons {
          display: flex;
          gap: 24px;
          align-items: center;
        }
        
        .icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #2D2928;
          transition: color 0.3s;
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
        
        /* Carousel */
        .carousel-container {
          position: relative;
          width: 100%;
          height: 600px;
          margin-top: 0px;
          overflow: hidden;
          background-color: #f5f1e8;
        }
        
        .carousel-slide {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
        }
        
        .carousel-slide.active {
          opacity: 1;
        }
        
        .carousel-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .carousel-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .carousel-text-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        @media (min-width: 768px) {
          .carousel-text-area {
            align-items: flex-start;
            text-align: left;
            width: 100%;
            max-width: 1440px;
            padding: 0 10%;
          }
        }

        .carousel-subtitle {
          font-size: 14px;
          font-weight: 700;
          color: #E93172;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 8px;
        }

        .carousel-title-h2 {
          font-size: 32px;
          font-weight: 600;
          color: #2D2928;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .carousel-title-h1 {
          font-size: 56px;
          font-weight: 800;
          color: #2D2928;
          text-transform: uppercase;
          margin-bottom: 30px;
          letter-spacing: 1px;
          line-height: 1.1;
        }

        .carousel-btn {
          border: 1.5px solid #2D2928;
          background: transparent;
          color: #2D2928;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          padding: 12px 36px;
          letter-spacing: 1px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          position: relative;
          transition: all 0.3s ease;
        }

        .carousel-btn::after {
          content: '';
          display: inline-block;
          width: 16px;
          height: 16px;
          background-image: url("/images/e-commerce/home/arrow-right.svg");
          background-size: contain;
          background-repeat: no-repeat;
          transition: transform 0.25s ease, background-image 0.25s ease;
        }

        .carousel-btn:hover {
          background-color: #E93172;
          border-color: #E93172;
          color: #ffffff;
          padding-right: 42px;
        }

        .carousel-btn:hover::after {
          background-image: url("/images/e-commerce/home/arrow-right-hover.svg");
          transform: translateX(6px);
        }
        
        .carousel-controls {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 16px;
          z-index: 10;
        }
        
        .carousel-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
          border: none;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .carousel-dot.active {
          background-color: #E93172;
        }
        
        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(255, 255, 255, 0.8);
          border: none;
          width: 48px;
          height: 48px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2D2928;
          transition: all 0.3s;
          z-index: 10;
        }
        
        .carousel-arrow:hover {
          background-color: #E93172;
          color: white;
        }
        
        .carousel-arrow.left {
          left: 32px;
        }
        
        .carousel-arrow.right {
          right: 32px;
        }
        
        /* Container */
        .container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 40px;
        }
        
        /* Section */
        .section {
          padding: 80px 0;
        }
        
        .section-title {
          font-size: 32px;
          font-weight: 700;
          color: #2D2928;
          margin-bottom: 16px;
          text-align: center;
        }
        
        .section-subtitle {
          font-size: 14px;
          color: #6b7280;
          text-align: center;
          margin-bottom: 48px;
        }
        
        /* Info Block */
        .info-blocks {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 60px;
        }
        
        .info-block {
          text-align: center;
          padding: 32px 16px;
        }
        
        .info-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f0e6e0;
          border-radius: 50%;
          color: #E93172;
        }
        
        .info-block h4 {
          font-size: 16px;
          font-weight: 600;
          color: #2D2928;
          margin-bottom: 8px;
        }
        
        .info-block p {
          font-size: 12px;
          color: #6b7280;
        }
        
        /* Product Grid */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 32px;
        }
        
        .product-card {
          background: #f9fafb;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .product-card:hover {
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        }
        
        .product-image {
          position: relative;
          width: 100%;
          padding-bottom: 100%;
          background: #f3f4f6;
          overflow: hidden;
        }
        
        .product-image img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .product-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background-color: #dc2626;
          color: white;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 700;
          z-index: 5;
        }
        
        .product-new {
          position: absolute;
          top: 12px;
          right: 12px;
          background-color: #22c55e;
          color: white;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 700;
          z-index: 5;
        }
        
        .product-actions {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 10;
        }
        
        .product-card:hover .product-actions {
          opacity: 1;
        }
        
        .action-btn {
          width: 48px;
          height: 48px;
          background: white;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          color: #2D2928;
        }
        
        .action-btn:hover {
          background: #f0e6e0;
          color: #E93172;
        }
        
        .product-info {
          padding: 20px;
        }
        
        .product-category {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          color: #6b7280;
          margin-bottom: 8px;
        }
        
        .product-name {
          font-size: 16px;
          font-weight: 600;
          color: #2D2928;
          margin-bottom: 8px;
          text-decoration: none;
          display: block;
          transition: color 0.2s;
        }
        
        .product-card:hover .product-name {
          color: #E93172;
        }
        
        .product-price {
          font-size: 16px;
          font-weight: 700;
          color: #E93172;
        }
        
        .product-old-price {
          font-size: 13px;
          color: #9ca3af;
          text-decoration: line-through;
          margin-left: 8px;
        }
        
        /* View More Button */
        .view-more-btn {
          display: block;
          margin: 48px auto 0;
          padding: 12px 48px;
          background-color: #E93172;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s;
          text-align: center;
        }
        
        .view-more-btn:hover {
          background-color: #a05f3f;
        }
        
        /* Blog Section */
        .blog-container {
          background: linear-gradient(135deg, #f5f1e8 0%, #ede9e0 100%);
          padding: 80px 40px;
          margin-top: 60px;
        }
        
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 48px;
        }
        
        .blog-card {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .blog-card:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }
        
        .blog-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        
        .blog-content {
          padding: 20px;
        }
        
        .blog-date {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 8px;
        }
        
        .blog-title {
          font-size: 16px;
          font-weight: 600;
          color: #2D2928;
          margin-bottom: 12px;
        }
        
        .blog-link {
          color: #E93172;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: color 0.3s;
        }
        
        .blog-link:hover {
          color: #a05f3f;
        }
        
        /* Instagram Grid */
        .instagram-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
          margin-top: 48px;
        }
        
        .instagram-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 4px;
          transition: transform 0.3s;
          cursor: pointer;
        }
        
        .instagram-image:hover {
          transform: scale(1.05);
        }
        
        /* Newsletter */
        .newsletter-section {
          background: linear-gradient(135deg, #f5f1e8 0%, #ede9e0 100%);
          padding: 48px;
          border-radius: 8px;
          text-align: center;
          margin: 80px 0;
        }
        
        .newsletter-title {
          font-size: 24px;
          font-weight: 700;
          color: #2D2928;
          margin-bottom: 16px;
        }
        
        .newsletter-text {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 24px;
        }
        
        .newsletter-form {
          display: flex;
          gap: 8px;
          max-width: 400px;
          margin: 0 auto;
        }
        
        .newsletter-form input {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          font-family: inherit;
          font-size: 14px;
        }
        
        .newsletter-form button {
          padding: 12px 24px;
          background-color: #E93172;
          color: white;
          border: none;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .newsletter-form button:hover {
          background-color: #a05f3f;
        }
        
        /* Asymmetric Top Selling Grid CSS */
        .top-selling-grid {
          margin-top: 40px;
        }

        .top-card-first {
          background-image: url("/images/e-commerce/home/top1.jpg");
          background-size: 105%;
          background-position: center;
          height: 446px;
          border-radius: 6px;
          padding: 50px 32px;
          cursor: pointer;
          transition: background-size 0.35s ease;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          margin-bottom: 30px;
        }

        .top-card-first:hover {
          background-size: 110%;
        }

        .top-card-first h6 {
          text-transform: uppercase;
          color: #E93172;
          font-weight: 700;
          font-size: 14px;
          margin-bottom: 8px;
        }

        .top-card-first h2 {
          font-weight: 800;
          color: #2D2928;
          font-size: 30px;
          margin-bottom: 12px;
        }

        .top-stroke {
          width: 30px;
          border: 3px solid #E93172;
          border-radius: 30px;
          margin-bottom: 24px;
        }

        .top-card-first p {
          color: #6b7280;
          font-size: 14px;
        }

        .top-col-right {
          display: flex;
          flex-direction: column;
        }

        .top2-box {
          height: 208px;
          background-image: url("/images/e-commerce/home/top2.jpg");
          background-size: 105%;
          background-position: center;
          background-repeat: no-repeat;
          border-radius: 6px;
          padding: 30px;
          text-align: right;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          cursor: pointer;
          transition: background-size 0.35s ease;
          text-decoration: none;
          margin-bottom: 30px;
        }

        .top2-box:hover {
          background-size: 110%;
        }

        .top2-box h6 {
          color: #E93172;
          font-weight: 700;
          text-transform: capitalize;
          margin-bottom: 4px;
        }

        .top2-box p {
          color: #2D2928;
          text-decoration: underline;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 0;
        }

        .top4-box {
          height: 208px;
          background-image: url("/images/e-commerce/home/top4.jpg");
          background-size: 105%;
          background-position: center;
          background-repeat: no-repeat;
          border-radius: 6px;
          display: flex;
          padding-bottom: 24px;
          cursor: pointer;
          transition: background-size 0.35s ease;
          text-decoration: none;
          margin-bottom: 30px;
        }

        .top4-box:hover {
          background-size: 110%;
        }

        .top4-box .top-label {
          margin-left: auto;
          margin-top: auto;
          background-color: #262626;
          padding: 16px 24px;
          color: #ffffff;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 1px;
        }

        .top3-box {
          height: 208px;
          background-image: url("/images/e-commerce/home/top3.jpg");
          background-size: 105%;
          background-position: center;
          background-repeat: no-repeat;
          border-radius: 6px;
          display: flex;
          padding-bottom: 24px;
          cursor: pointer;
          transition: background-size 0.35s ease;
          text-decoration: none;
          margin-bottom: 30px;
        }

        .top3-box:hover {
          background-size: 110%;
        }

        .top3-box .top-label {
          margin-left: auto;
          margin-top: auto;
          background-color: #262626;
          padding: 16px 24px;
          color: #ffffff;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 1px;
        }

        .top5-box {
          height: 208px;
          background-image: url("/images/e-commerce/home/top5.jpg");
          background-size: 105%;
          background-position: center;
          background-repeat: no-repeat;
          border-radius: 6px;
          display: flex;
          align-items: center;
          padding: 0 20px;
          cursor: pointer;
          transition: background-size 0.35s ease;
          text-decoration: none;
          margin-bottom: 30px;
        }

        .top5-box:hover {
          background-size: 110%;
        }

        .top5-inner {
          display: flex;
          justify-content: space-between;
          width: 100%;
          align-items: center;
        }

        .top5-inner .top5-stroke {
          flex-grow: 1;
          height: 1px;
          background-color: #262626;
        }

        .top5-inner .top5-content {
          margin: 0 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .top5-inner .top5-content p {
          margin-bottom: 0;
          font-size: 12px;
          color: #2D2928;
          text-transform: lowercase;
        }

        .top5-inner .top5-content h5 {
          font-weight: 700;
          color: #E93172;
          text-transform: uppercase;
          font-size: 16px;
          margin: 4px 0 0;
          letter-spacing: 1px;
        }

        /* Classic Info block - sandwiched */
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
          color: #2D2928;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .info-item-ourdreams-store p {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 0;
        }
        .promo-section {
          background-color: #f5f1e8;
          background-repeat: no-repeat;
          background-position: right center;
          background-size: contain;
          height: 500px;
          display: flex;
          align-items: center;
          margin: 60px 0;
          position: relative;
        }
        
        @media (min-width: 768px) {
          .promo-section {
            background-image: url("/images/e-commerce/home/promo.png");
          }
        }
        
        .promo-subtitle {
          font-size: 14px;
          font-weight: 700;
          color: #E93172;
          text-transform: uppercase;
          margin-bottom: 12px;
          letter-spacing: 1px;
        }
        
        .promo-title {
          font-size: 48px;
          font-weight: 800;
          color: #2D2928;
          text-transform: uppercase;
          margin-bottom: 16px;
          line-height: 1.1;
        }
        
        .promo-stroke {
          border: 4px solid #E93172;
          width: 64px;
          border-radius: 30px;
          margin: 20px 0 30px;
        }
        
        /* Countdown indicator blocks */
        .promo-countdown {
          display: flex;
          gap: 16px;
          margin-bottom: 30px;
        }
        
        .countdown-block {
          border: 1px solid #2D2928;
          height: 64px;
          width: 64px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.8);
        }
        
        .countdown-block h5 {
          color: #E93172;
          font-weight: 700;
          font-size: 16px;
          margin: 0;
        }
        
        .countdown-block p {
          color: #6b7280;
          font-size: 10px;
          margin: 0;
          text-transform: uppercase;
          font-weight: 600;
        }
        
        .promo-price-box {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .promo-old-price {
          font-size: 24px;
          color: #9ca3af;
          text-decoration: line-through;
          font-weight: 600;
        }
        
        .promo-new-price {
          font-size: 36px;
          color: #E93172;
          font-weight: 800;
        }
        
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
          color: #ffffff;
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
        
        @media (max-width: 1024px) {
          .info-blocks {
            grid-template-columns: repeat(2, 1fr);
          }
          .blog-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .instagram-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .footer-links-grid {
            min-width: auto;
          }
        }
        
        @media (max-width: 768px) {
          .header {
            padding: 12px 20px;
            flex-wrap: wrap;
          }
          .header-nav {
            gap: 16px;
            display: none;
          }
          .container {
            padding: 0 20px;
          }
          .section {
            padding: 40px 0;
          }
          .carousel-container {
            height: 300px;
          }
          .carousel-content h2 {
            font-size: 28px;
          }
          .carousel-content p {
            font-size: 16px;
          }
          .info-blocks {
            grid-template-columns: 1fr;
          }
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .blog-grid {
            grid-template-columns: 1fr;
          }
          .instagram-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .footer-top-row, .footer-middle-row {
            flex-direction: column;
            gap: 30px;
          }
          .footer-newsletter-form {
            width: 100%;
          }
        }
      `}</style>

      {/* Carousel */}
      <div className="carousel-container">
        {CAROUSEL_IMAGES.map((slide, index) => (
          <div key={index} className={`carousel-slide ${index === currentCarouselIndex ? 'active' : ''}`}>
            <img src={slide.image} alt={slide.mainTitle} className="carousel-image" onError={(e) => {
              (e.target as any).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1440" height="600"%3E%3Crect fill="%23e5e7eb" width="1440" height="600"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="32"%3ECarousel Image%3C/text%3E%3C/svg%3E';
            }} />
            <div className="carousel-content">
              <div className="carousel-text-area">
                <span className="carousel-subtitle">{slide.subtitle}</span>
                <h2 className="carousel-title-h2">{slide.title}</h2>
                <h1 className="carousel-title-h1">{slide.mainTitle}</h1>
                <a href="/shop/catalog" className="carousel-btn text-decoration-none">
                  view more
                </a>
              </div>
            </div>
          </div>
        ))}
        
        <button className="carousel-arrow left" onClick={prevCarousel}>
          <ChevronLeft size={24} />
        </button>
        <button className="carousel-arrow right" onClick={nextCarousel}>
          <ChevronRight size={24} />
        </button>
        
        <div className="carousel-controls">
          {CAROUSEL_IMAGES.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentCarouselIndex ? 'active' : ''}`}
              onClick={() => setCurrentCarouselIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="container">
        {/* New Arrivals */}
        <div className="section" style={{ marginTop: '50px' }}>
          <h2 className="section-title">NEW ARRIVALS</h2>
          <p className="section-subtitle" style={{ maxWidth: '650px', margin: '0 auto 48px', lineHeight: '1.6' }}>
            Check out our new furniture collection! Cozy sofa, fancy chair, wooden casket, and many more. The new collection brings an informal elegance to your home.
          </p>
          
          <div className="products-grid">
            {PRODUCTS.slice(0, 4).map((product) => {
              const discount = Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100);
              return (
                <div
                  key={product.id}
                  className="product-card"
                  onMouseEnter={() => setHoveredProductId(product.id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                >
                  <div className="product-image">
                    <img src={product.image} alt={product.name} onError={(e) => {
                      (e.target as any).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="280" height="280"%3E%3Crect fill="%23f3f4f6" width="280" height="280"/%3E%3C/svg%3E';
                    }} />
                    {discount > 0 && <div className="product-badge">{discount}% SALE</div>}
                    {hoveredProductId === product.id && (
                      <div className="product-actions">
                        <button className="action-btn" title="Wishlist">
                          <Heart size={20} />
                        </button>
                        <button className="action-btn" title="View">
                          <Eye size={20} />
                        </button>
                        <button className="action-btn" title="Add to Cart">
                          <ShoppingCart size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="product-info">
                    <div className="product-category">{product.category}</div>
                    <a href={`/shop/product/${product.id}`} className="product-name">
                      {product.name}
                    </a>
                    <div className="product-price">
                      ${product.price}
                      <span className="product-old-price">${product.regularPrice}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <button className="view-more-btn">VIEW MORE PRODUCTS</button>
        </div>

        {/* Promo News and Inspiration Section */}
        <section className="promo-section">
          <div style={{ paddingLeft: "8%" }}>
            <h5 className="promo-subtitle">news and inspiration</h5>
            <h1 className="promo-title">new arrivals</h1>
            <div className="promo-stroke" />
            
            <div className="promo-countdown">
              <div className="countdown-block">
                <h5>{timeLeft.days}</h5>
                <p>days</p>
              </div>
              <div className="countdown-block">
                <h5>{timeLeft.hours}</h5>
                <p>hours</p>
              </div>
              <div className="countdown-block">
                <h5>{timeLeft.minutes}</h5>
                <p>mins</p>
              </div>
              <div className="countdown-block">
                <h5>{timeLeft.seconds}</h5>
                <p>secs</p>
              </div>
            </div>
            
            <div className="promo-price-box">
              <span className="promo-old-price"><del>$ 140,56</del></span>
              <span className="promo-new-price">$ 70</span>
            </div>
          </div>
        </section>

        {/* Top Selling Products */}
        <div className="section">
          <h2 className="section-title">TOP SELLING PRODUCTS</h2>
          <p className="section-subtitle" style={{ maxWidth: '650px', margin: '0 auto 48px', lineHeight: '1.6' }}>
            These furniture sets will become an essential part of an ecosystem of elements in your home. Your domestic space will easily embrace these tables, chairs, and bookshelves.
          </p>
          
          <div className="row">
            {/* Left Big Mosaic Column */}
            <div className="col-md-6 col-12">
              <a href="/shop/product/1" className="top-card-first text-decoration-none">
                <h6>All new</h6>
                <h2>SPRING THINGS</h2>
                <div className="top-stroke" />
                <p>Save up to 30%</p>
              </a>
            </div>
            
            {/* Right Group Column */}
            <div className="col-md-6 col-12">
              <div className="row">
                <div className="col-6">
                  <a href="/shop/product/2" className="top2-box">
                    <div>
                      <h6>Online Exclusive</h6>
                      <p>shop now</p>
                    </div>
                  </a>
                  <a href="/shop/product/4" className="top4-box">
                    <div className="top-label">
                      spring sale
                    </div>
                  </a>
                </div>
                
                <div className="col-6">
                  <a href="/shop/product/3" className="top3-box">
                    <div className="top-label">
                      70% SALE
                    </div>
                  </a>
                  <a href="/shop/product/1" className="top5-box">
                    <div className="top5-inner">
                      <div className="top5-stroke" />
                      <div className="top5-content">
                        <p>collection</p>
                        <h5>summer</h5>
                      </div>
                      <div className="top5-stroke" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sandwiched InfoBlock Section */}
        <div className="info-ourdreams-store">
          <div className="row w-100 m-0">
            <div className="col-md-4 col-12 info-item-ourdreams-store mb-3 mb-md-0">
              <div className="d-flex align-items-center">
                <img src="/images/e-commerce/home/car.svg" alt="Free Shipping" style={{ width: '40px', height: '40px', marginRight: '16px' }} />
                <div>
                  <h5>free shipping</h5>
                  <p>On all orders of $ 150</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12 info-item-ourdreams-store mb-3 mb-md-0">
              <div className="d-flex align-items-center">
                <img src="/images/e-commerce/home/headphones.svg" alt="24/7 Support" style={{ width: '40px', height: '40px', marginRight: '16px' }} />
                <div>
                  <h5>24/7 support</h5>
                  <p>Get help when you need it</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12 info-item-ourdreams-store">
              <div className="d-flex align-items-center">
                <img src="/images/e-commerce/home/Sync.svg" alt="Money Back" style={{ width: '40px', height: '40px', marginRight: '16px' }} />
                <div>
                  <h5>100% money back</h5>
                  <p>30 day money back guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Section */}
        <div className="blog-container">
          <div className="container">
            <h2 className="section-title" style={{ color: '#2D2928', marginTop: 0 }}>NEWS AND INSPIRATION</h2>
            <p className="section-subtitle">Design your home interior story! Here are the latest trends, tips, and design tricks to help you out.</p>
            
            <div className="blog-grid">
              {BLOG_POSTS.map((post) => (
                <div key={post.id} className="blog-card">
                  <img src={post.image} alt={post.title} className="blog-image" onError={(e) => {
                    (e.target as any).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="280" height="200"%3E%3Crect fill="%23e5e7eb" width="280" height="200"/%3E%3C/svg%3E';
                  }} />
                  <div className="blog-content">
                    <p className="blog-date">{post.date}</p>
                    <h3 className="blog-title">{post.title}</h3>
                    <a href={`/blog/${post.id}`} className="blog-link">Read More →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Instagram Section */}
        <div className="section">
          <h2 className="section-title">FOLLOW US ON INSTAGRAM</h2>
          <p className="section-subtitle">Join our community and see inspiration from our followers</p>
          
          <div className="instagram-grid">
            {INSTAGRAM_IMAGES.map((image, index) => (
              <img 
                key={index}
                src={image} 
                alt={`Instagram ${index + 1}`} 
                className="instagram-image"
                onError={(e) => {
                  (e.target as any).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23e5e7eb" width="200" height="200"/%3E%3C/svg%3E';
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
