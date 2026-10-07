import React, { useState } from 'react';
import { MessageCircle, X, Stethoscope, ChevronUp, ChevronDown } from 'lucide-react';

export default function StickyWhatsApp({ onOpenConsultation }) {
  const [expanded, setExpanded] = useState(false);

  const handleGeneralWhatsApp = () => {
    window.open('https://wa.me/254700123456?text=Hello%20Agrovet%20ltd,%20I%20need%20urgent%20agricultural/veterinary%20advice.', '_blank');
  };

  const handleVetWhatsApp = () => {
    window.open('https://wa.me/254700123456?text=Hello%20Dr.%20Peter,%20I%20have%20a%20sick%20animal%20and%20need%20a%20clinical%20prescription/dosage%20review.', '_blank');
  };

  const handleAgroWhatsApp = () => {
    window.open('https://wa.me/254700123456?text=Hello%20Agronomist%20Faith,%20I%20have%20crop%20leaf/pest%20symptoms%20and%20need%20chemical%20spray%20guidance.', '_blank');
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 990,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '0.75rem'
    }}>
      {/* Expanded Quick Ask Menu */}
      {expanded && (
        <div 
          className="card-glass"
          style={{
            backgroundColor: '#0A1733',
            border: '1px solid rgba(37, 211, 102, 0.4)',
            borderRadius: '16px',
            padding: '1.25rem',
            width: '290px',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(37, 211, 102, 0.25)',
            animation: 'slideUp 0.2s ease-out'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '0.65rem',
            marginBottom: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#25D366',
                boxShadow: '0 0 8px #25D366'
              }} />
              <strong style={{ fontSize: '0.85rem', color: '#FFFFFF' }}>Agro-Vet On Duty</strong>
            </div>
            <button
              onClick={() => setExpanded(false)}
              style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
              aria-label="Close widget"
            >
              <X size={15} />
            </button>
          </div>

          <p style={{ fontSize: '0.785rem', color: '#94A3B8', marginBottom: '0.85rem', lineHeight: 1.4 }}>
            Direct 1-on-1 WhatsApp consultation with registered Kenyan agro-vet professionals.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              onClick={handleVetWhatsApp}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.6rem 0.75rem',
                backgroundColor: 'rgba(5, 11, 24, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                color: '#FFFFFF',
                fontSize: '0.825rem',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>🐄</span>
              <div>
                <div style={{ fontWeight: 600 }}>Talk to Vet Doctor</div>
                <div style={{ fontSize: '0.7rem', color: '#60A5FA' }}>Livestock & Dairy Health</div>
              </div>
            </button>

            <button
              onClick={handleAgroWhatsApp}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.6rem 0.75rem',
                backgroundColor: 'rgba(5, 11, 24, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                color: '#FFFFFF',
                fontSize: '0.825rem',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>🌽</span>
              <div>
                <div style={{ fontWeight: 600 }}>Talk to Agronomist</div>
                <div style={{ fontSize: '0.7rem', color: '#10B981' }}>Crop Spraying & Nutrition</div>
              </div>
            </button>

            <button
              onClick={() => {
                setExpanded(false);
                onOpenConsultation();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                padding: '0.55rem',
                backgroundColor: 'rgba(245, 197, 66, 0.1)',
                border: '1px solid rgba(245, 197, 66, 0.3)',
                borderRadius: '8px',
                color: '#F5C542',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: '0.25rem'
              }}
            >
              <span>Upload Crop/Animal Photo Form</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="btn btn-whatsapp animate-pulse-glow"
        style={{
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          padding: 0,
          boxShadow: '0 6px 25px rgba(37, 211, 102, 0.55)',
          position: 'relative'
        }}
        aria-label="Chat with Agro-Vet on WhatsApp"
      >
        <MessageCircle size={28} color="#FFFFFF" />

        {/* Online Status Green Ping Indicator */}
        <span style={{
          position: 'absolute',
          top: '2px',
          right: '2px',
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          backgroundColor: '#10B981',
          border: '2.5px solid #050B18'
        }} />
      </button>
    </div>
  );
}
