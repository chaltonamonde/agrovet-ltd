import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Stethoscope, 
  Award,
  CheckCircle2,
  Lock
} from 'lucide-react';

export default function TrustBar() {
  const trustFeatures = [
    {
      icon: <ShieldCheck size={26} color="#F5C542" />,
      title: 'PCPB & KVB Licensed',
      description: 'Official Kenya regulatory compliance. Batch tested genuine inputs only.',
      metaPlaceholder: '[PCPB Lic: PCPB/DLR/2026/0418] • [KVB Permit: KVB/PH/2026/1109]'
    },
    {
      icon: <Truck size={26} color="#60A5FA" />,
      title: 'Fast 47 Counties Delivery',
      description: 'Same-day Nairobi/Kiambu & overnight Wells Fargo / Easy Coach farmgate dispatch.',
      metaPlaceholder: 'Nairobi Express: 3-5 Hrs • Upcountry: Next Morning'
    },
    {
      icon: <CreditCard size={26} color="#F5C542" />,
      title: 'Secure M-Pesa STK Push',
      description: 'Instant automated Safaricom Daraja STK push with immediate SMS payment receipt.',
      metaPlaceholder: 'Till / Paybill: [Official Paybill No. to be verified]'
    },
    {
      icon: <Stethoscope size={26} color="#60A5FA" />,
      title: 'Agro-Vet Expert Support',
      description: 'Registered veterinary doctors and agronomists available 7 days a week.',
      metaPlaceholder: 'WhatsApp Vet Desk • 15 Min Response Guarantee'
    }
  ];

  return (
    <section style={{
      backgroundColor: '#071329',
      borderTop: '1px solid rgba(30, 107, 255, 0.25)',
      borderBottom: '1px solid rgba(30, 107, 255, 0.25)',
      padding: '2.5rem 0',
      position: 'relative'
    }}>
      <div className="container">
        {/* Compliance Notice Banner */}
        <div style={{
          backgroundColor: 'rgba(10, 25, 55, 0.6)',
          border: '1px dashed rgba(245, 197, 66, 0.35)',
          borderRadius: '8px',
          padding: '0.65rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '2rem',
          fontSize: '0.8rem',
          color: '#94A3B8'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={16} color="#F5C542" />
            <span>
              <strong style={{ color: '#FFFFFF' }}>Regulatory Integrity:</strong> All agricultural pesticides & veterinary pharmaceuticals supplied under strict compliance with Kenyan Laws (Cap 346 & Cap 366).
            </span>
          </div>
          <div style={{ fontFamily: 'monospace', color: '#F5C542', fontSize: '0.75rem' }}>
            REGULATORY PERMITS: [PCPB/KVB licences active and verified]
          </div>
        </div>

        {/* 4 Trust Pillars Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {trustFeatures.map((feat, index) => (
            <div 
              key={index}
              className="card-glass"
              style={{
                padding: '1.5rem',
                backgroundColor: 'rgba(13, 27, 54, 0.8)',
                border: '1px solid rgba(30, 107, 255, 0.22)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(5, 11, 24, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}>
                  {feat.icon}
                </div>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '0.4rem'
                }}>
                  {feat.title}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#94A3B8',
                  lineHeight: 1.5,
                  marginBottom: '1rem'
                }}>
                  {feat.description}
                </p>
              </div>

              <div style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.07)',
                paddingTop: '0.75rem',
                fontSize: '0.725rem',
                color: '#60A5FA',
                fontFamily: 'monospace',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <CheckCircle2 size={12} color="#10B981" />
                <span>{feat.metaPlaceholder}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
