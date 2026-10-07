import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQS } from '../data/faqs';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section style={{
      padding: '5rem 0',
      backgroundColor: '#071228',
      position: 'relative'
    }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <span className="badge badge-blue" style={{ marginBottom: '0.85rem' }}>
            Frequently Asked Questions
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.85rem' }}>
            Got Questions? <span className="text-gradient-gold">We’ve Got Answers.</span>
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.05rem' }}>
            Everything you need to know about M-Pesa payments, product authenticity, and upcountry farmgate delivery.
          </p>
        </div>

        {/* Accordion List */}
        <div style={{
          maxWidth: '820px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="card-glass"
                style={{
                  backgroundColor: isOpen ? '#0D1E3F' : '#0A1733',
                  border: isOpen ? '1px solid rgba(245, 197, 66, 0.4)' : '1px solid rgba(30, 107, 255, 0.2)',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease'
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: '#FFFFFF',
                    gap: '1rem'
                  }}
                  aria-expanded={isOpen}
                >
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, color: isOpen ? '#F5C542' : '#FFFFFF' }}>
                    {faq.question}
                  </span>
                  <ChevronDown 
                    size={20} 
                    color={isOpen ? '#F5C542' : '#60A5FA'}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.3s ease',
                      flexShrink: 0
                    }} 
                  />
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 1.5rem 1.25rem 1.5rem',
                    color: '#CBD5E1',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    paddingTop: '0.85rem'
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom prompt */}
        <div style={{
          textAlign: 'center',
          marginTop: '2.5rem',
          color: '#94A3B8',
          fontSize: '0.9rem'
        }}>
          Still have a question?{' '}
          <a 
            href="https://wa.me/254700123456?text=Hello%20Agrovet%20ltd,%20I%20have%20a%20question%20before%20placing%20my%20order."
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#25D366', fontWeight: 700, textDecoration: 'underline' }}
          >
            Chat with our Nairobi Customer Desk on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
