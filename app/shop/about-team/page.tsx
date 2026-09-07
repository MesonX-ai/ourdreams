'use client';

import React from 'react';

const TEAM = [
  { id: 1, name: 'Andreas Walter', role: 'CEO / Art & Creative Manager', img: '/images/e-commerce/team/person1.jpg' },
  { id: 2, name: 'Phoenix Houston', role: 'Founder / World Traveler', img: '/images/e-commerce/team/person2.jpg' },
  { id: 3, name: 'Maria Lennon', role: 'Design Consultant', img: '/images/e-commerce/team/person3.jpg' },
  { id: 4, name: 'John-James Mosley', role: 'Digital Marketing Guru', img: '/images/e-commerce/team/person4.jpg' },
  { id: 5, name: 'Daryl Peters', role: 'Director of Operations', img: '/images/e-commerce/team/person5.jpg' },
  { id: 6, name: 'Arianne Savage', role: 'Project Manager / Technical Lead', img: '/images/e-commerce/team/person6.jpg' },
  { id: 7, name: 'Anisa Devine', role: 'Director of Showroom Design', img: '/images/e-commerce/team/person7.jpg' },
  { id: 8, name: 'Ashwin Chaney', role: 'Customer Service Manager', img: '/images/e-commerce/team/person8.jpg' },
];

export default function AboutTeamPage() {
  return (
    <>
      <div className="container" style={{ padding: '40px 20px', minHeight: '80vh' }}>
        <div className="row mb-5">
          <div className="col-12">
            <h3 className="font-weight-bold" style={{ color: '#2D2928' }}>
              Meet the team who dares to create differently.
            </h3>
          </div>
        </div>
        
        <div className="row">
          {TEAM.map((member) => (
            <div key={member.id} className="col-lg-3 col-md-4 col-sm-6 col-12 mb-5">
              <div className="text-center">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="img-fluid mb-3" 
                  style={{
                    borderRadius: '4px',
                    width: '100%',
                    height: '280px',
                    objectFit: 'cover',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                  }} 
                />
                <h6 className="font-weight-bold mb-1" style={{ color: '#2D2928', fontSize: '16px' }}>{member.name}</h6>
                <p className="text-muted mb-3" style={{ fontSize: '13px' }}>
                  {member.role}
                </p>
                
                <div className="d-flex justify-content-center gap-3">
                  <a href="#" className="social-icon">
                    <img src="/images/e-commerce/team/google.svg" alt="Google" style={{ width: '18px', filter: 'grayscale(1) opacity(0.6)' }} />
                  </a>
                  <a href="#" className="social-icon">
                    <img src="/images/e-commerce/team/facebook.svg" alt="Facebook" style={{ width: '18px', filter: 'grayscale(1) opacity(0.6)' }} />
                  </a>
                  <a href="#" className="social-icon">
                    <img src="/images/e-commerce/team/behance.svg" alt="Behance" style={{ width: '18px', filter: 'grayscale(1) opacity(0.6)' }} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Instagram gallery section for About Team as well */}
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