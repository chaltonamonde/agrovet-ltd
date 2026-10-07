import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Copy, 
  Check, 
  Tag, 
  BellRing, 
  Smartphone,
  CheckCircle2
} from 'lucide-react';

export default function RestockDiscountModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const [phone, setPhone] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const couponCode = 'MKULIMA10';

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (phone.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="card-glass"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: '#09152E',
          border: '1.5px solid rgba(245, 197, 66, 0.5)',
          borderRadius: '20px',
          padding: '2rem',
          position: 'relative',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(245, 197, 66, 0.3)'
        }}
      >
        <button 
          onClick={onClose}
          className="btn btn-icon btn-outline"
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            width: '32px',
            height: '32px',
            borderRadius: '50%'
          }}
          aria-label="Close discount modal"
        >
          <X size={16} />
        </button>

        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'rgba(245, 197, 66, 0.15)',
          border: '2px solid #F5C542',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem auto'
        }}>
          <Tag size={28} color="#F5C542" />
        </div>

        <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.4rem' }}>
          Welcome, Mkulima!
        </h3>
        <p style={{ color: '#E2E8F0', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
          Enjoy <strong>KES 500 OFF</strong> your first order of certified inputs with coupon code:
        </p>

        {/* Coupon Code Copy Box */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          backgroundColor: '#050D1E',
          border: '1px dashed #F5C542',
          borderRadius: '12px',
          padding: '0.85rem 1.25rem',
          marginBottom: '1.75rem'
        }}>
          <span style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            fontFamily: 'monospace',
            color: '#F5C542',
            letterSpacing: '0.1em'
          }}>
            {couponCode}
          </span>

          <button
            onClick={handleCopy}
            className="btn btn-sm btn-primary"
            style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
          >
            {copied ? <Check size={14} color="#050B18" /> : <Copy size={14} color="#050B18" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Seasonal Deworming & Restock Signup */}
        {subscribed ? (
          <div style={{
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid #10B981',
            borderRadius: '10px',
            padding: '1rem',
            color: '#A7F3D0',
            fontSize: '0.875rem'
          }}>
            <CheckCircle2 size={18} style={{ display: 'inline', marginRight: '6px' }} />
            You're enrolled! You'll receive timely deworming reminders and planting season alerts.
          </div>
        ) : (
          <form onSubmit={handleSubscribe}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.8rem',
              color: '#94A3B8',
              marginBottom: '0.6rem',
              justifyContent: 'center'
            }}>
              <BellRing size={14} color="#60A5FA" />
              <span>Get SMS alerts for cattle deworming dates & fertilizer subsidies:</span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="tel"
                placeholder="07XX XXX XXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="form-input"
                style={{ textAlign: 'center', fontSize: '0.9rem' }}
              />
              <button type="submit" className="btn btn-secondary" style={{ flexShrink: 0 }}>
                Get Reminders
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
