'use client';

import React from 'react';

export default function BlogArticlePage() {
  return (
    <>
      {/* Blog Article Banner */}
      <div style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url(/images/e-commerce/blog/article/header.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '350px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff'
      }}>
        <div className="text-center">
          <h1 className="font-weight-bold text-uppercase mb-2" style={{ fontSize: '42px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>What is Shabby Chic?</h1>
          <p className="font-weight-bold" style={{ letterSpacing: '1px', textTransform: 'uppercase', fontSize: '13px' }}>March 12, 2020 · Written by Our Dreams</p>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 20px', minHeight: '80vh', maxWidth: '850px' }}>
        <div className="row justify-content-center">
          <div className="col-12">
            
            {/* Meta author line */}
            <div className="d-flex align-items-center mb-5 pb-4 border-bottom">
              <img 
                src="/images/e-commerce/blog/article/person.svg" 
                alt="Author" 
                style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#f0e6e0', padding: '8px', marginRight: '16px' }} 
              />
              <div>
                <h6 className="font-weight-bold mb-0" style={{ color: '#2D2928' }}>The Good Storyteller</h6>
                <span className="text-muted" style={{ fontSize: '12px' }}>Interior Design Consultant</span>
              </div>
            </div>

            {/* Main content body */}
            <div className="article-body" style={{ color: '#2D2928', fontSize: '15px', lineHeight: '1.8' }}>
              <p className="mb-4">
                There is no denying that eco-friendly materials can easily conquer the market. But can we produce enough to fulfill the growing demands? Can we create an astonishing look for the new collection of eco-friendly furniture? That is a tough question. But did make an effort!
              </p>
              
              <p className="mb-4">
                Shabby chic is a style of interior design where furniture and furnishings are either chosen for their appearance of age and signs of wear and tear or where new items are distressed to achieve the appearance of an antique. At the same time, a soft, opulent, yet cottage-style decor, often with an emphasis on white, pastel, and furniture with floral themes, is used to introduce cozy, informal elegance.
              </p>

              <blockquote className="my-5 p-4" style={{
                borderLeft: '5px solid #E93172',
                backgroundColor: '#fcfbf9',
                borderRadius: '0 4px 4px 0',
                fontStyle: 'italic',
                fontSize: '17px'
              }}>
                "Your domestic space will easily embrace these tables, chairs, and bookshelves. Vintage objects combined with modern structures create a gorgeous ecosystem of design."
              </blockquote>

              <img 
                src="/images/e-commerce/blog/article/article-image.png" 
                alt="Shabby chic furniture" 
                className="img-fluid w-100 my-5 shadow-sm" 
                style={{ borderRadius: '6px' }}
              />

              <h4 className="font-weight-bold mt-5 mb-3" style={{ color: '#2D2928' }}>Sustainable Design Elements</h4>
              <p className="mb-4">
                Use this well-known tip for mixing two primary colors with a trendy muted palette. Neutral spaces with wooden furniture can be changed within a minutes using the right set of vibrant colors. Such interior design helps you to stand out from ordinary palettes.
              </p>

              <p className="mb-5">
                Let's mix stripes and checks—everyone's favorite patterns. New-season colors add the right balance to this awesome mix. Even in bedroom decor you can use this fun new trend along with classic cushions and delicate color scheme or love colorful decoration.
              </p>
            </div>

            {/* Back to Blog */}
            <div className="text-center mt-5 pt-4 border-top">
              <a href="/shop/blog" className="btn btn-outline-primary text-uppercase font-weight-bold" style={{
                color: '#E93172',
                borderColor: '#E93172',
                padding: '10px 30px',
                borderRadius: '4px'
              }}>
                ← Back to Blog
              </a>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}