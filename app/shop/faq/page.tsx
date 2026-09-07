'use client';

import React from 'react';

export default function FAQPage() {
  const handleScroll = (elementId: string) => {
    const element = document.querySelector(`#${elementId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="container" style={{ padding: '40px 20px', minHeight: '80vh' }}>
        <div className="row justify-content-between">
          
          {/* Sidebar Navigation */}
          <div className="col-lg-3 col-md-4 d-none d-md-block" style={{ position: 'sticky', top: '100px', height: '100%' }}>
            <h1 className="font-weight-bold text-uppercase mb-4" style={{ fontSize: '36px', color: '#2D2928' }}>faq</h1>
            <p className="text-muted mb-5" style={{ fontSize: '13px', lineHeight: '1.6' }}>
              Successful brands get into the mind slowly. A blurb in a magazine. A mention in a newspaper. A comment from a friend. A display in a retail.
            </p>
            
            <div className="d-flex flex-column align-items-start gap-3">
              <button 
                className="btn btn-link p-0 text-left font-weight-bold text-decoration-none dropdown-nav-btn" 
                onClick={() => handleScroll("company")}
              >
                Company Policies
              </button>
              <button 
                className="btn btn-link p-0 text-left font-weight-bold text-decoration-none dropdown-nav-btn" 
                onClick={() => handleScroll("payment")}
              >
                Payment Options
              </button>
              <button 
                className="btn btn-link p-0 text-left font-weight-bold text-decoration-none dropdown-nav-btn" 
                onClick={() => handleScroll("terms")}
              >
                Terms & Conditions
              </button>
              <button 
                className="btn btn-link p-0 text-left font-weight-bold text-decoration-none dropdown-nav-btn" 
                onClick={() => handleScroll("delivery")}
              >
                Delivery Job
              </button>
            </div>
          </div>
          
          {/* FAQ Accordion Contents */}
          <div className="col-lg-8 col-md-8 col-12">
            
            {/* Section 1 */}
            <div id="company" className="mb-5">
              <h6 className="text-uppercase mb-3 font-weight-bold" style={{ color: '#E93172', letterSpacing: '1px' }}>
                company Policies
              </h6>
              <h4 className="font-weight-bold mb-4" style={{ color: '#2D2928' }}>
                You Can Learn About Company Policies Guide, Some Rules, and Useful Info
              </h4>
              <p className="text-muted" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                Company policies guide is useful information for clients. You can learn about company rules regarding payment methods, shipping, support, etc. If you have questions you can always study this guide to find necessary answers for you, or use a contact form.
              </p>
            </div>
            <hr className="mb-5" />

            {/* Section 2 */}
            <div id="payment" className="mb-5">
              <h6 className="text-uppercase mb-3 font-weight-bold" style={{ color: '#E93172', letterSpacing: '1px' }}>
                payment options
              </h6>
              <h4 className="font-weight-bold mb-4" style={{ color: '#2D2928' }}>
                Do You Want To Know More About Payment Options? Here Is All You Need to Know
              </h4>
              <p className="text-muted" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                Here is some useful information about payment options. You can use your PayPal account to make a purchase. You need to know the email address to make a payment. You can also use your credit card to make a purchase. You can make a payment anywhere you want.
              </p>
            </div>
            <hr className="mb-5" />

            {/* Section 3 */}
            <div id="terms" className="mb-5">
              <h6 className="text-uppercase mb-3 font-weight-bold" style={{ color: '#E93172', letterSpacing: '1px' }}>
                terms & conditions
              </h6>
              <h4 className="font-weight-bold mb-4" style={{ color: '#2D2928' }}>
                The Terms of this Agreement Concerns Everyone Who Has Access to the Website
              </h4>
              <p className="text-muted" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                Everyone who has access to the website needs to be aware of these terms. You need to maintain your rights and obligations. Some guidelines facilitate the use of this wonderful website. Learning these guidelines can have some benefits.
              </p>
            </div>
            <hr className="mb-5" />

            {/* Section 4 */}
            <div id="delivery" className="mb-5">
              <h6 className="text-uppercase mb-3 font-weight-bold" style={{ color: '#E93172', letterSpacing: '1px' }}>
                delivery job
              </h6>
              <h4 className="font-weight-bold mb-4" style={{ color: '#2D2928' }}>
                Learn More About the Delivery Job We Provide. This Can Be Useful Information
              </h4>
              <p className="text-muted" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                Delivery is an important part of our daily routine. The key to success is the right timing. We pay attention to the speed, but what is most important, we care about the quality of our job. We can assure you that your order will be delivered in time.
              </p>
            </div>
          </div>
          
        </div>
      </div>

      <style jsx>{`
        .dropdown-nav-btn {
          color: #2D2928 !important;
          font-size: 14px;
          transition: color 0.2s;
        }
        .dropdown-nav-btn:hover {
          color: #E93172 !important;
        }
      `}</style>
    </>
  );
}