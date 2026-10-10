import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Stethoscope, 
  ShieldAlert, 
  Sprout, 
  Leaf, 
  Wrench, 
  Egg, 
  Milk,
  Wheat,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export default function CategoryGrid({ onSelectCategory }) {
  const [showAllMobile, setShowAllMobile] = useState(false);

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Wheat': return <Wheat size={28} color="#F5C542" />;
      case 'Stethoscope': return <Stethoscope size={28} color="#60A5FA" />;
      case 'ShieldAlert': return <ShieldAlert size={28} color="#10B981" />;
      case 'Sprout': return <Sprout size={28} color="#F59E0B" />;
      case 'Leaf': return <Leaf size={28} color="#34D399" />;
      case 'Wrench': return <Wrench size={28} color="#60A5FA" />;
      case 'Egg': return <Egg size={28} color="#FCD34D" />;
      case 'Milk': return <Milk size={28} color="#93C5FD" />;
      default: return <Sprout size={28} color="#F5C542" />;
    }
  };

  return (
    <section className="category-section" style={{
      padding: '5rem 0 4rem 0',
      position: 'relative'
    }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{
          textAlign: 'center',
          maxWidth: '720px',
          margin: '0 auto 3.5rem auto'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.85rem',
            borderRadius: '9999px',
            background: 'rgba(30, 107, 255, 0.12)',
            border: '1px solid rgba(30, 107, 255, 0.35)',
            color: '#60A5FA',
            fontSize: '0.785rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.85rem'
          }}>
            <Sparkles size={14} color="#F5C542" />
            <span>Farmgate Supply Catalog</span>
          </div>
          <h2 className="section-title" style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.2,
            marginBottom: '0.85rem'
          }}>
            Explore Products by <span className="text-gradient-gold">Farming Category</span>
          </h2>
          <p className="section-desc" style={{ fontSize: '1.05rem', color: '#94A3B8' }}>
            Genuine certified products packaged direct from verified Kenyan distributors. 
            All agricultural chemicals and vet drugs are PCPB & KVB compliant.
          </p>
        </div>

        {/* Categories Grid (2-column on mobile, up to 6 on mobile by default) */}
        <div className="category-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.5rem'
        }}>
          {CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`card-glass card-interactive category-card ${idx >= 6 && !showAllMobile ? 'category-card-hidden-mobile' : ''}`}
              style={{
                padding: '1.75rem 1.5rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '210px',
                background: 'linear-gradient(180deg, rgba(13, 27, 54, 0.9) 0%, rgba(9, 19, 39, 0.95) 100%)',
                position: 'relative'
              }}
            >
              {/* Category Corner Glow Accent */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '70px',
                height: '70px',
                background: `radial-gradient(circle at top right, ${cat.accent}20 0%, transparent 70%)`,
                pointerEvents: 'none'
              }} />

              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.25rem'
                }}>
                  <div className="category-card-icon-wrap" style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(5, 11, 24, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                  }}>
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <span className="badge badge-blue category-card-count" style={{ fontSize: '0.72rem' }}>
                    {cat.itemCount}+ Items
                  </span>
                </div>

                <h3 className="category-card-title" style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '0.45rem'
                }}>
                  {cat.name}
                </h3>

                <p className="category-card-desc" style={{
                  fontSize: '0.85rem',
                  color: '#94A3B8',
                  lineHeight: 1.5
                }}>
                  {cat.description}
                </p>
              </div>

              <div className="category-card-link" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#F5C542',
                fontSize: '0.85rem',
                fontWeight: 700,
                marginTop: '1.25rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)'
              }}>
                <span>Browse Products</span>
                <ArrowRight size={15} />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View More Categories Toggle Button */}
        <div className="category-toggle-wrap">
          <button
            onClick={() => setShowAllMobile(!showAllMobile)}
            className="btn btn-outline-gold category-toggle-btn"
          >
            <span>{showAllMobile ? 'Show Fewer Categories' : 'View All 8 Farming Categories'}</span>
            {showAllMobile ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>
    </section>
  );
}
