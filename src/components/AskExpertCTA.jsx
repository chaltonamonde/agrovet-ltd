import React from 'react';
import { Stethoscope, MessageCircle, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

export default function AskExpertCTA({ onOpenConsultation }) {
  const handleWhatsApp = () => {
    window.open('https://wa.me/254700123456?text=Hello%20Agrovet%20ltd,%20I%20need%20urgent%20agro-vet%20consultation%20for%20my%20farm.', '_blank');
  };

  return (
    <section style={{
      padding: '4rem 0',
      position: 'relative'
    }}>
      <div className="container">
        <div 
          className="card-glass border-glow-blue"
          style={{
            padding: '3rem 2rem',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(13, 27, 54, 0.95) 0%, rgba(10, 20, 44, 0.98) 100%)',
            border: '1.5px solid rgba(30, 107, 255, 0.35)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(30, 107, 255, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem'
          }}
        >
          {/* Left Details */}
          <div style={{ maxWidth: '620px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(30, 107, 255, 0.2)',
              border: '1px solid rgba(30, 107, 255, 0.4)',
              color: '#60A5FA',
              fontSize: '0.78rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}>
              <Clock size={13} color="#F5C542" />
              <span>15-Minute Clinical Response Guarantee</span>
            </div>

            <h3 style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.25,
              marginBottom: '0.85rem'
            }}>
              Unsure Which Drug or Fungicide Your Farm Needs?{' '}
              <span className="text-gradient-gold">Ask Our Licensed Doctors.</span>
            </h3>

            <p style={{ color: '#E2E8F0', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Misdiagnosing a crop blight or administering the wrong antibiotic dosage can cost you entire harvest yields or livestock. Connect with Dr. Peter Karanja (BVM) and Faith Muthoni (MSc Crop Protection).
            </p>

            {/* Doctors miniature badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: '#94A3B8' }}>
              <ShieldCheck size={16} color="#10B981" />
              <span>Certified under Kenya Veterinary Board & PCPB statutory standards</span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            minWidth: '260px'
          }}>
            <button
              onClick={onOpenConsultation}
              className="btn btn-primary btn-lg"
              style={{ padding: '0.95rem 1.6rem' }}
            >
              <Stethoscope size={18} color="#050B18" />
              <span>Book Farm Consultation</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="btn btn-whatsapp btn-lg"
              style={{ padding: '0.95rem 1.6rem' }}
            >
              <MessageCircle size={18} />
              <span>Direct WhatsApp Chat</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
