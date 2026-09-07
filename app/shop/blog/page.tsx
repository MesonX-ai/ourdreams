'use client';

import React from 'react';

const ARTICLES = [
  { id: '1', title: 'What is Shabby Chic?', date: 'March 12, 2020', desc: 'Sustainable furniture rocks this world! Enjoy the classic vintage feel of French country design and floral details.', image: '/images/e-commerce/home/article1.jpg' },
  { id: '2', title: 'Best Examples of Maximalism', date: 'March 12, 2020', desc: 'Decorate with vibrant colors, rich textures, patterns, and layered collections to stand out with bold styling.', image: '/images/e-commerce/home/article2.jpg' },
  { id: '3', title: 'What is Lorem Ipsum?', date: 'March 12, 2020', desc: 'Lorem Ipsum has been the industry standard dummy text ever since the 1500s. Explore its historical trends.', image: '/images/e-commerce/home/article3.jpg' },
];

export default function BlogPage() {
  return (
    <>
      <div className="container" style={{ padding: '40px 20px', minHeight: '80vh' }}>
        <h2 className="font-weight-bold mt-4 mb-3" style={{ color: '#2D2928', textTransform: 'uppercase' }}>From Our Blog</h2>
        <p className="text-muted mb-5" style={{ fontSize: '14px' }}>Design your home interior story! Here are the latest trends, tips, and design tricks to help you out.</p>
        
        <div className="row">
          {ARTICLES.map((article) => (
            <div key={article.id} className="col-lg-4 col-md-6 col-12 mb-5">
              <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: '6px', overflow: 'hidden' }}>
                <a href="/shop/blog/article">
                  <div style={{ overflow: 'hidden' }}>
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="card-img-top blog-post-img"
                      style={{ height: '220px', objectFit: 'cover', transition: 'transform 0.4s' }} 
                    />
                  </div>
                </a>
                <div className="card-body p-4">
                  <p className="text-muted font-weight-bold mb-2" style={{ fontSize: '12px' }}>{article.date}</p>
                  <h5 className="font-weight-bold mb-3" style={{ color: '#2D2928', fontSize: '18px', lineHeight: '1.4' }}>
                    <a href="/shop/blog/article" style={{ color: '#2D2928', textDecoration: 'none' }} className="blog-post-title">
                      {article.title}
                    </a>
                  </h5>
                  <p className="text-muted mb-4" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                    {article.desc}
                  </p>
                  <a href="/shop/blog/article" className="font-weight-bold" style={{ color: '#E93172', textDecoration: 'none' }}>
                    Read More →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .blog-post-img:hover {
          transform: scale(1.05);
        }
        .blog-post-title:hover {
          color: #E93172 !important;
        }
      `}</style>
    </>
  );
}