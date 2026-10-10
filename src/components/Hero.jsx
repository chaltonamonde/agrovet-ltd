import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  MessageCircle, 
  Search, 
  ShieldCheck, 
  Truck, 
  Award, 
  Sparkles,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { TRUST_STATS } from '../data/reviews';

export default function Hero({ onShopNow, onConsultVet, onSearchSelect }) {
  const [heroSearch, setHeroSearch] = useState('');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const popularSearches = [
    'Dairy Meal 50kg',
    'Thunder Insecticide',
    'H614D Maize Seed',
    'Solo 425 Sprayer',
    'Triatix Tick Dip',
    'Ridomil Gold'
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      onSearchSelect(heroSearch.trim());
    }
  };

  return (
    <section className="hero-section" style={{
      position: 'relative',
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      paddingTop: '3.5rem',
      paddingBottom: '4.5rem'
    }}>
      {/* Background Video / Animated Canvas Farm Atmosphere */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden'
      }}>
        {!prefersReducedMotion ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="hero-bg-video"
            poster="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.38) saturate(1.2)'
            }}
          >
            {/* Direct reliable lightweight farm landscape video stream */}
            <source 
              src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-green-farm-field-42410-large.mp4" 
              type="video/mp4" 
            />
          </video>
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            backgroundImage: 'url("https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.35)'
          }} />
        )}

        {/* Dark Navy Blue & Gold Atmospheric Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 30%, rgba(30, 107, 255, 0.22) 0%, rgba(10, 20, 40, 0.78) 50%, rgba(5, 11, 24, 0.96) 100%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(5, 11, 24, 0.6) 0%, transparent 40%, rgba(5, 11, 24, 1) 100%)',
          pointerEvents: 'none'
        }} />
      </div>

      {/* Hero Content Container */}
      <div className="container" style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        maxWidth: '960px'
      }}>
        {/* Trust Pill / Verification Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 1rem',
          borderRadius: '9999px',
          background: 'rgba(10, 30, 70, 0.7)',
          border: '1px solid rgba(245, 197, 66, 0.4)',
          boxShadow: '0 0 20px rgba(245, 197, 66, 0.2)',
          backdropFilter: 'blur(8px)',
          marginBottom: '1.5rem',
          animation: 'slideUp 0.6s ease-out'
        }}>
          <Sparkles size={16} color="#F5C542" />
          <span style={{
            fontSize: '0.825rem',
            fontWeight: 700,
            color: '#F5C542',
            letterSpacing: '0.04em',
            textTransform: 'uppercase'
          }}>
            Kenya's Premier 24/7 Digital Agrovet
          </span>
          <span style={{ color: '#64748B' }}>•</span>
          <span style={{ fontSize: '0.8rem', color: '#E2E8F0', fontWeight: 500 }}>
            PCPB & KVB Registered
          </span>
        </div>

        {/* Main Title */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.3rem, 5.5vw, 4.2rem)',
          fontWeight: 800,
          color: '#FFFFFF',
          lineHeight: 1.12,
          letterSpacing: '-0.03em',
          marginBottom: '1.25rem',
          textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)'
        }}>
          Genuine Agro-Inputs & Vet Care,{' '}
          <span style={{
            background: 'linear-gradient(135deg, #FFDE59 0%, #D4A017 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>
            Delivered Straight to Your Farm.
          </span>
        </h1>

        {/* Value Promise Description */}
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: '#E2E8F0',
          maxWidth: '780px',
          margin: '0 auto 2.25rem auto',
          lineHeight: 1.6,
          fontWeight: 400,
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)'
        }}>
          No more risky counterfeit chemicals or waiting for Facebook replies. Order certified 
          veterinary medicines, certified seeds, and high-yield fertilizers 24/7 with instant 
          M-Pesa payment and countrywide farmgate courier dispatch.
        </p>

        {/* Interactive Search Box */}
        <div style={{
          maxWidth: '680px',
          margin: '0 auto 1.75rem auto'
        }}>
          <form 
            onSubmit={handleSearchSubmit}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(8, 20, 44, 0.85)',
              borderRadius: '9999px',
              border: '1.5px solid rgba(30, 107, 255, 0.45)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(30, 107, 255, 0.25)',
              padding: '0.4rem 0.5rem 0.4rem 1.25rem',
              backdropFilter: 'blur(12px)'
            }}
          >
            <Search size={20} color="#60A5FA" style={{ flexShrink: 0, marginRight: '0.75rem' }} />
            <input 
              type="text"
              placeholder="Search by crop, animal disease, brand, or active ingredient..."
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#FFFFFF',
                fontSize: '1rem',
                width: '100%',
                fontFamily: 'inherit'
              }}
            />
            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ borderRadius: '9999px', padding: '0.7rem 1.6rem', flexShrink: 0 }}
            >
              <span>Search</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Filter Tags / Popular Pills */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginTop: '0.85rem'
          }}>
            <span style={{ fontSize: '0.785rem', color: '#94A3B8', fontWeight: 600 }}>
              Popular this week:
            </span>
            {popularSearches.map((item) => (
              <button
                key={item}
                onClick={() => onSearchSelect(item)}
                style={{
                  background: 'rgba(30, 107, 255, 0.12)',
                  border: '1px solid rgba(30, 107, 255, 0.3)',
                  borderRadius: '9999px',
                  color: '#93C5FD',
                  fontSize: '0.785rem',
                  padding: '0.2rem 0.65rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#F5C542';
                  e.currentTarget.style.color = '#F5C542';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(30, 107, 255, 0.3)';
                  e.currentTarget.style.color = '#93C5FD';
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Two Buttons */}
        <div className="hero-cta-group" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '3.5rem'
        }}>
          {/* Shop Now (Gold) */}
          <button 
            onClick={onShopNow}
            className="btn btn-primary btn-lg hero-cta-btn"
            style={{
              padding: '1rem 2.2rem',
              fontSize: '1.05rem',
              boxShadow: '0 6px 25px rgba(245, 197, 66, 0.45)'
            }}
          >
            <span>Shop Products Now</span>
            <ArrowRight size={18} />
          </button>

          {/* Chat on WhatsApp (Blue / Electric Royal) */}
          <a
            href="https://wa.me/254700123456?text=Hello%20Agrovet%20ltd,%20I%20need%20urgent%20agro-vet%20guidance%20for%20my%20farm."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-lg hero-cta-btn"
            style={{
              padding: '1rem 2rem',
              fontSize: '1.05rem',
              gap: '0.6rem'
            }}
          >
            <MessageCircle size={20} color="#25D366" />
            <span>Chat with Vet on WhatsApp</span>
          </a>
        </div>

        {/* Animated Trust Counters Grid (2x2 on mobile) */}
        <div className="hero-stats-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          maxWidth: '920px',
          margin: '0 auto'
        }}>
          {TRUST_STATS.map((stat, idx) => (
            <div 
              key={idx}
              className="card-glass hero-stat-card"
              style={{
                padding: '1.25rem 1rem',
                textAlign: 'center',
                backgroundColor: 'rgba(13, 27, 54, 0.75)',
                border: '1px solid rgba(30, 107, 255, 0.25)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.85rem',
                fontWeight: 800,
                color: '#F5C542',
                lineHeight: 1,
                marginBottom: '0.35rem'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '0.2rem'
              }}>
                {stat.label}
              </div>
              <div style={{
                fontSize: '0.72rem',
                color: '#94A3B8'
              }}>
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
