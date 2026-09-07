'use client';

import React from 'react';

const ORDER_MOCK = [
  { id: '# 123345', date: '16.06.2020', total: 70, delivery: 5, status: 'Delivered', img: '/images/e-commerce/account/products.svg' },
  { id: '# 123346', date: '16.06.2020', total: 70, delivery: 5, status: 'Delivered', img: '/images/e-commerce/account/products.svg' },
  { id: '# 123347', date: '16.06.2020', total: 70, delivery: 5, status: 'Delivered', img: '/images/e-commerce/account/products.svg' },
];

export default function AccountPage() {
  return (
    <>
      <div className="container mb-5" style={{ marginTop: '32px' }}>
        <div className="row">
          
          {/* Main Account Area (Col 8) */}
          <div className="col-lg-8 col-md-12 col-12">
            <h3 className="font-weight-bold mb-4 text-dark text-capitalize">My Account</h3>
            
            {/* Promo banner cards */}
            <div className="row mb-5">
              <div className="col-md-6 col-12 mb-3 mb-md-0">
                <div className="discount-block-account promo1-bg">
                  <h3 className="text-muted font-weight-bold mb-0">sale up to</h3>
                  <h1 className="font-weight-bold mb-3" style={{ color: '#E93172', fontSize: '36px' }}>30%</h1>
                  <a href="/shop/catalog" className="font-weight-bold text-dark text-decoration-none" style={{ fontSize: '14px' }}>Read More</a>
                </div>
              </div>
              
              <div className="col-md-6 col-12">
                <div className="discount-block-account promo2-bg">
                  <h3 className="text-muted font-weight-bold mb-0">sale up to</h3>
                  <h1 className="font-weight-bold mb-3" style={{ color: '#E93172', fontSize: '36px' }}>30%</h1>
                  <a href="/shop/catalog" className="font-weight-bold text-dark text-decoration-none" style={{ fontSize: '14px' }}>Read More</a>
                </div>
              </div>
            </div>

            {/* Orders list Table block */}
            <div className="mt-5 text-left">
              <h3 className="font-weight-bold mb-4 text-dark">My Orders</h3>
              <div className="table-responsive">
                <table className="table table-borderless table-account-align">
                  <thead>
                    <tr style={{ borderBottom: "1px solid #D9D9D9" }} className="text-dark">
                      <th className="bg-transparent px-0 text-left font-weight-bold">Date</th>
                      <th className="bg-transparent px-0 text-left font-weight-bold">Product</th>
                      <th className="bg-transparent px-0 text-left font-weight-bold">Delivery</th>
                      <th className="bg-transparent px-0 text-left font-weight-bold">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ORDER_MOCK.map((order, i) => (
                      <tr key={i} className="align-middle">
                        <td className="px-0 pt-4 text-left align-middle">
                          <p className="text-muted mb-0">{order.date}</p>
                        </td>
                        <td className="px-0 pt-4 text-left align-middle">
                          <div className="d-flex align-items-center">
                            <img src={order.img} alt="Product icon" style={{ width: '80px', marginRight: '16px' }} />
                            <div>
                              <h6 className="text-muted mb-1" style={{ fontSize: '12px' }}>{order.status}</h6>
                              <h5 className="font-weight-bold mb-0" style={{ fontSize: '16px', color: '#2D2928' }}>{order.id}</h5>
                            </div>
                          </div>
                        </td>
                        <td className="px-0 pt-4 text-left align-middle">
                          <h6 className="font-weight-bold mb-0" style={{ color: '#2D2928' }}>${order.delivery}</h6>
                        </td>
                        <td className="px-0 pt-4 text-left align-middle">
                          <h6 className="font-weight-bold mb-0" style={{ color: '#E93172' }}>${order.total}</h6>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Profile Sidebar Right Block (Col 4) */}
          <div className="col-lg-4 col-md-12 col-12">
            <section className="profile-card-ourdreams-store text-center">
              <div className="text-right w-100 pr-2">
                <button className="bg-transparent border-0 p-0" style={{ cursor: 'pointer' }}>
                  <img src="/images/e-commerce/account/settings.svg" alt="settings" style={{ width: '18px' }} />
                </button>
              </div>
              
              <div className="my-3">
                <img src="/images/e-commerce/account/avatar.svg" alt="avatar" style={{ width: '110px', borderRadius: '50%' }} />
              </div>
              
              <h5 className="font-weight-bold mt-4" style={{ color: '#E93172', fontSize: '20px' }}>Michael Daineka</h5>
              <p className="text-muted mb-4" style={{ fontSize: '13px' }}>michaeldaineka@gmail.com</p>
              
              {/* Counter status rows */}
              <div className="d-flex justify-content-between w-100 mb-4 px-4">
                <div className="d-flex flex-column align-items-center">
                  <h6 className="font-weight-bold text-muted text-uppercase mb-1" style={{ fontSize: '11px' }}>Title</h6>
                  <p className="font-weight-bold mb-0 text-dark">65</p>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <h6 className="font-weight-bold text-muted text-uppercase mb-1" style={{ fontSize: '11px' }}>Title</h6>
                  <p className="font-weight-bold mb-0 text-dark">0</p>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <h6 className="font-weight-bold text-muted text-uppercase mb-1" style={{ fontSize: '11px' }}>Title</h6>
                  <p className="font-weight-bold mb-0 text-dark">145</p>
                </div>
              </div>
              
              <hr style={{ borderTop: '1px solid #e1e5eb' }} />
              
              {/* Delivery Address block */}
              <div className="w-100 text-left px-3 my-3">
                <div className="d-flex justify-content-between align-items-start">
                  <div style={{ maxWidth: '220px' }}>
                    <h6 className="font-weight-bold mb-3" style={{ fontSize: '14px', color: '#2D2928' }}>Delivery Address</h6>
                    <p className="text-muted mb-0" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                      Mr. Robbie Williams 94 Kings Road, London SW39 6AZ
                    </p>
                  </div>
                  <button className="bg-transparent border-0 p-0" style={{ cursor: 'pointer' }}>
                    <img src="/images/e-commerce/account/edit.svg" alt="edit" style={{ width: '16px' }} />
                  </button>
                </div>
              </div>
              
              <hr style={{ borderTop: '1px solid #e1e5eb' }} />

              {/* Payment Method block */}
              <div className="w-100 text-left px-3 my-3">
                <div className="d-flex justify-content-between align-items-start">
                  <div style={{ maxWidth: '220px' }}>
                    <h6 className="font-weight-bold mb-3" style={{ fontSize: '14px', color: '#2D2928' }}>Payment Method</h6>
                    <div className="d-flex align-items-center mt-3 mb-1">
                      <img src="/images/e-commerce/account/visa.svg" alt="visa" style={{ width: '36px', marginRight: '12px' }} />
                      <p className="mb-0 text-dark font-weight-semibold" style={{ fontSize: '13px' }}>•••• •••• •••• 5632</p>
                    </div>
                  </div>
                  <button className="bg-transparent border-0 p-0" style={{ cursor: 'pointer' }}>
                    <img src="/images/e-commerce/account/edit.svg" alt="edit" style={{ width: '16px' }} />
                  </button>
                </div>
              </div>
              
              <hr style={{ borderTop: '1px solid #e1e5eb' }} />

              {/* Billing Address block */}
              <div className="w-100 text-left px-3 my-3">
                <div className="d-flex justify-content-between align-items-start">
                  <div style={{ maxWidth: '220px' }}>
                    <h6 className="font-weight-bold mb-3" style={{ fontSize: '14px', color: '#2D2928' }}>Billing Address</h6>
                    <p className="text-muted mb-0" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                      Mr. Robbie Williams 94 Kings Road, London SW39 6AZ
                    </p>
                  </div>
                  <button className="bg-transparent border-0 p-0" style={{ cursor: 'pointer' }}>
                    <img src="/images/e-commerce/account/edit.svg" alt="edit" style={{ width: '16px' }} />
                  </button>
                </div>
              </div>

            </section>
          </div>

        </div>
      </div>

      <style jsx global>{`
        /* Account Page Custom CSS styles */
        .discount-block-account {
          height: 200px;
          border-radius: 6px;
          padding: 36px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
          background-repeat: no-repeat;
          background-position: right center;
        }

        .promo1-bg {
          background-color: #f5f5f5;
          background-image: url("/images/e-commerce/account/promo1.svg");
        }

        .promo2-bg {
          background-color: #f5f5f5;
          background-image: url("/images/e-commerce/account/promo2.svg");
        }

        .profile-card-ourdreams-store {
          background-color: #fcfbf9;
          border: 1px solid #e1e5eb;
          padding: 30px 15px;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .table-account-align td {
          vertical-align: middle !important;
        }
      `}</style>
    </>
  );
}