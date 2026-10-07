import React from 'react';
import { Search, CreditCard, Truck, Stethoscope, ArrowRight } from 'lucide-react';

export default function HowItWorks({ onShopNow }) {
  const steps = [
    {
      number: '01',
      icon: <Search size={26} color="#F5C542" />,
      title: 'Select Genuine Inputs',
      description: 'Browse certified veterinary medicines, seeds, and fertilizers with transparent active ingredients and manufacturer batch tags.'
    },
    {
      number: '02',
      icon: <CreditCard size={26} color="#60A5FA" />,
      title: 'Fast M-Pesa Checkout',
      description: 'Enter your phone number to receive an instant Safaricom STK Push prompt on your screen. Secure and automatic.'
    },
    {
      number: '03',
      icon: <Truck size={26} color="#F5C542" />,
      title: 'Farmgate Delivery',
      description: 'Dispatched same-day within Nairobi/Kiambu or overnight via Wells Fargo and Easy Coach express parcel to all 47 counties.'
    },
    {
      number: '04',
      icon: <Stethoscope size={26} color="#10B981" />,
      title: 'Dosage Support Included',
      description: 'Need dilution rates or withholding period verification? Our on-duty veterinarians and agronomists guide you on WhatsApp.'
    }
  ];

  return (
    <section style={{
      padding: '4.5rem 0',
      backgroundColor: '#071228',
      borderTop: '1px solid rgba(30, 107, 255, 0.2)',
      borderBottom: '1px solid rgba(30, 107, 255, 0.2)'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.85rem' }}>
            Simple & Transparent
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.75rem' }}>
            How Farming with <span className="text-gradient-gold">Agrovet ltd</span> Works
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.05rem' }}>
            From placing your order online to receiving sealed inputs right at your farm gate.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          position: 'relative'
        }}>
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="card-glass"
              style={{
                padding: '2rem 1.5rem',
                backgroundColor: 'rgba(10, 23, 51, 0.85)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.25rem'
                }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '12px',
                    backgroundColor: '#050B18',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {step.icon}
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: 'rgba(255, 255, 255, 0.1)'
                  }}>
                    {step.number}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.5rem' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#94A3B8', lineHeight: 1.5 }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
