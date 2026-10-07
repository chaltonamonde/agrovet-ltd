import React from 'react';
import { Star, ShieldCheck, MapPin, Quote } from 'lucide-react';
import { REVIEWS } from '../data/reviews';

export default function ReviewsSection() {
  return (
    <section style={{
      padding: '5rem 0',
      backgroundColor: '#050B18',
      position: 'relative'
    }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.85rem' }}>
            ★ Verified Farmer Testimonials
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.85rem' }}>
            Trusted by Commercial & Smallholder <span className="text-gradient-gold">Farmers Across Kenya</span>
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.05rem' }}>
            Read how authentic sealed inputs and on-demand agro-vet advice have protected harvests and milk yields.
          </p>
        </div>

        {/* Reviews Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {REVIEWS.map(rev => (
            <div 
              key={rev.id}
              className="card-glass"
              style={{
                padding: '1.75rem',
                backgroundColor: 'rgba(10, 23, 51, 0.85)',
                border: '1px solid rgba(30, 107, 255, 0.22)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: '16px',
                position: 'relative'
              }}
            >
              <div>
                {/* Rating stars & verified badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="#F5C542" color="#F5C542" />
                    ))}
                  </div>
                  <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>
                    <ShieldCheck size={11} />
                    <span>Verified Buyer</span>
                  </span>
                </div>

                {/* Comment */}
                <p style={{
                  color: '#E2E8F0',
                  fontSize: '0.925rem',
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                  marginBottom: '1.25rem'
                }}>
                  "{rev.comment}"
                </p>

                {/* Product tag */}
                <div style={{
                  fontSize: '0.75rem',
                  color: '#60A5FA',
                  backgroundColor: 'rgba(30, 107, 255, 0.1)',
                  padding: '0.3rem 0.6rem',
                  borderRadius: '6px',
                  display: 'inline-block',
                  marginBottom: '1.25rem'
                }}>
                  Ordered: {rev.productName}
                </div>
              </div>

              {/* Author & Farm Details */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '1rem'
              }}>
                <img 
                  src={rev.avatar} 
                  alt={rev.author}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1.5px solid #F5C542'
                  }}
                />
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF' }}>
                    {rev.author}
                  </h4>
                  <div style={{ fontSize: '0.75rem', color: '#F5C542', fontWeight: 600 }}>
                    {rev.farmName}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <MapPin size={11} />
                    <span>{rev.location} • {rev.farmType}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
