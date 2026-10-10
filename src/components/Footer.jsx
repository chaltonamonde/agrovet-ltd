import React from 'react';
import { 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Truck, 
  CreditCard, 
  Award, 
  Clock,
  Heart
} from 'lucide-react';

export default function Footer({ setActiveView, onOpenWholesale, onOpenConsultation }) {
  const countiesList = [
    'Nairobi', 'Kiambu', 'Nakuru', 'Uasin Gishu', 'Trans-Nzoia', 
    'Meru', 'Nyeri', 'Kirinyaga', 'Murang\'a', 'Machakos', 
    'Kisumu', 'Kakamega', 'Bungoma', 'Kericho', 'Bomet', 
    'Embu', 'Kilifi', 'Mombasa', 'Laikipia', 'Nyandarua'
  ];

  return (
    <footer className="site-footer" style={{
      backgroundColor: '#030814',
      borderTop: '1px solid rgba(30, 107, 255, 0.25)',
      color: '#94A3B8',
      fontSize: '0.875rem',
      paddingTop: '4.5rem',
      paddingBottom: '2.5rem',
      position: 'relative'
    }}>
      <div className="container">
        {/* Main 4 Column Grid (Single tidy stack on mobile) */}
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3.5rem'
        }}>
          {/* Col 1: Brand & Compliance */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              marginBottom: '1rem',
              cursor: 'pointer'
            }} onClick={() => setActiveView('home')}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #0A1E46 0%, #061129 100%)',
                border: '1.5px solid #F5C542',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '1.25rem' }}>🌱</span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800 }}>
                <span style={{ color: '#FFFFFF' }}>Agrovet</span>
                <span style={{ color: '#F5C542' }}>ltd</span>
              </div>
            </div>

            <p style={{ color: '#94A3B8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Kenya’s premier 24/7 digital agrovet. Direct farmgate supply of genuine veterinary pharmaceuticals, certified seeds, crop protection chemicals, and professional agronomy consultations.
            </p>

            <div style={{
              backgroundColor: 'rgba(10, 25, 55, 0.6)',
              border: '1px solid rgba(30, 107, 255, 0.25)',
              borderRadius: '8px',
              padding: '0.65rem 0.85rem',
              fontSize: '0.75rem',
              fontFamily: 'monospace',
              color: '#60A5FA'
            }}>
              [PCPB Reg: PCPB/DLR/2026/0418]<br />
              [KVB Permit: KVB/PH/2026/1109]
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { label: 'Online Farm Shop', view: 'shop' },
                { label: 'Book Vet Consultation', view: 'consultation' },
                { label: 'Farmer Knowledge Guides', view: 'learn' },
                { label: 'About Us & Licences', view: 'about' },
                { label: 'Depot & Contact Info', view: 'contact' }
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => setActiveView(item.view)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#CBD5E1',
                      cursor: 'pointer',
                      padding: 0,
                      fontSize: '0.875rem',
                      transition: 'color 0.2s ease',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#F5C542'}
                    onMouseLeave={(e) => e.target.style.color = '#CBD5E1'}
                  >
                    → {item.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenWholesale}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#F5C542',
                    cursor: 'pointer',
                    padding: 0,
                    fontSize: '0.875rem',
                    fontWeight: 700
                  }}
                >
                  → Wholesale & Bulk Quotations
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('admin')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#60A5FA',
                    cursor: 'pointer',
                    padding: 0,
                    fontSize: '0.875rem',
                    fontWeight: 700
                  }}
                >
                  🛡️ Staff Admin Operations Console
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: County Logistics Dispatch */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              Counties Served (47/47)
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '0.75rem' }}>
              Same-day rider dispatch across Nairobi & Kiambu. Next-morning parcel service to:
            </p>
            <div className="footer-counties-wrap" style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.35rem'
            }}>
              {countiesList.map((county, idx) => (
                <span 
                  key={idx}
                  className="footer-county-pill"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '4px',
                    padding: '0.15rem 0.45rem',
                    fontSize: '0.72rem',
                    color: '#94A3B8'
                  }}
                >
                  {county}
                </span>
              ))}
              <span className="footer-counties-more" style={{ fontSize: '0.72rem', color: '#F5C542', alignSelf: 'center' }}>+27 more</span>
            </div>
          </div>

          {/* Col 4: Contacts & Payment Badges */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              Nairobi Central Depot
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#CBD5E1', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <MapPin size={16} color="#60A5FA" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Sheikh Karume Rd, Agri-Hub Suite 4, Nairobi CBD</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} color="#F5C542" style={{ flexShrink: 0 }} />
                <span>+254 700 123 456 / +254 733 987 654</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} color="#60A5FA" style={{ flexShrink: 0 }} />
                <span>orders@agrovetltd.co.ke</span>
              </div>
            </div>

            {/* Payment security badge */}
            <div style={{
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              padding: '0.65rem 0.85rem'
            }}>
              <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginBottom: '0.4rem', textTransform: 'uppercase', fontWeight: 700 }}>
                Instant Payment Gateway:
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="badge badge-success" style={{ fontSize: '0.75rem', fontWeight: 800 }}>
                  Lipa na M-Pesa
                </span>
                <span className="badge badge-blue" style={{ fontSize: '0.75rem' }}>
                  Airtel Money
                </span>
                <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>
                  Pay on Delivery
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Mandatory Notice Box */}
        <div className="footer-regulatory-box" style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '1.25rem 0',
          marginBottom: '2rem',
          fontSize: '0.785rem',
          color: '#64748B',
          lineHeight: 1.6
        }}>
          <strong style={{ color: '#E2E8F0' }}>Statutory Regulatory Compliance Notice:</strong> All pesticides, herbicides, fungicides, acaricides, and veterinary pharmaceuticals sold on this website must be applied strictly in accordance with approved manufacturer label instructions, safety intervals, and local regulations. Prescription products are subject to professional verification by a registered veterinary doctor under the Kenya Veterinary Board (KVB). Wear appropriate personal protective equipment (PPE) when handling chemicals.
        </div>

        {/* Bottom Copyright Row */}
        <div className="footer-bottom-row" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.8rem',
          color: '#64748B'
        }}>
          <div>
            © 2026 Agrovet ltd. All Rights Reserved. Built for Kenyan Farmers.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>PCPB / KVB Disclosures</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
