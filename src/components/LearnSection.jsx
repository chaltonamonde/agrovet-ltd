import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ShoppingBag,
  Share2
} from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { PRODUCTS } from '../data/products';

export default function LearnSection({ onSelectProduct }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Dairy Management', 'Crop Protection', 'Poultry Specialties', 'Soil & Plant Nutrition'];

  const filteredArticles = filterCategory === 'All' 
    ? ARTICLES 
    : ARTICLES.filter(a => a.category === filterCategory);

  return (
    <section style={{
      padding: '4.5rem 0',
      position: 'relative',
      backgroundColor: '#050B18'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          maxWidth: '740px',
          margin: '0 auto 3.5rem auto'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.85rem',
            borderRadius: '9999px',
            background: 'rgba(245, 197, 66, 0.12)',
            border: '1px solid rgba(245, 197, 66, 0.35)',
            color: '#F5C542',
            fontSize: '0.785rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.85rem'
          }}>
            <BookOpen size={14} color="#F5C542" />
            <span>Farmer Knowledge Hub & Field Guides</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            marginBottom: '0.85rem',
            lineHeight: 1.2
          }}>
            Practical Guidance to <span className="text-gradient-gold">Maximize Your Farm Yields</span>
          </h2>

          <p style={{ fontSize: '1.05rem', color: '#94A3B8' }}>
            Written by certified Kenyan agronomists and veterinary practitioners. 
            Evidence-based disease management, spraying calendars, and livestock feed formulations.
          </p>
        </div>

        {/* Categories Filter Pills */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '2.5rem'
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: '9999px',
                border: filterCategory === cat ? '1.5px solid #F5C542' : '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: filterCategory === cat ? 'rgba(245, 197, 66, 0.15)' : 'rgba(10, 23, 51, 0.6)',
                color: filterCategory === cat ? '#F5C542' : '#94A3B8',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Detailed Article Modal or Inline View */}
        {selectedArticle ? (
          <div className="card-glass" style={{
            maxWidth: '850px',
            margin: '0 auto',
            backgroundColor: '#0A1733',
            border: '1px solid rgba(30, 107, 255, 0.35)',
            borderRadius: '16px',
            padding: '2rem'
          }}>
            <button 
              onClick={() => setSelectedArticle(null)}
              className="btn btn-sm btn-outline"
              style={{ marginBottom: '1.5rem' }}
            >
              ← Back to All Guides
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '0.85rem', color: '#60A5FA' }}>
              <span className="badge badge-gold">{selectedArticle.category}</span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#94A3B8' }}>
                <Clock size={13} />
                {selectedArticle.readTime}
              </span>
            </div>

            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1rem', lineHeight: 1.3 }}>
              {selectedArticle.title}
            </h3>

            <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
              By <strong>{selectedArticle.author}</strong> • {selectedArticle.date}
            </div>

            {/* Key takeaways callout box */}
            <div style={{
              backgroundColor: 'rgba(30, 107, 255, 0.1)',
              border: '1px solid rgba(30, 107, 255, 0.3)',
              borderRadius: '12px',
              padding: '1.25rem',
              marginBottom: '1.75rem'
            }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F5C542', marginBottom: '0.75rem' }}>
                Key Field Takeaways:
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {selectedArticle.keyTakeaways.map((tip, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem', color: '#E2E8F0' }}>
                    <CheckCircle2 size={16} color="#10B981" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Content html simulation */}
            <div 
              style={{ color: '#E2E8F0', lineHeight: 1.7, fontSize: '1rem', marginBottom: '2rem' }}
              dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
            />

            {/* Recommended Products for this issue */}
            {selectedArticle.recommendedProductIds && (
              <div style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                paddingTop: '1.5rem'
              }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem' }}>
                  Recommended Certified Inputs Mentioned in this Guide:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                  {selectedArticle.recommendedProductIds.map(prodId => {
                    const prod = PRODUCTS.find(p => p.id === prodId);
                    if (!prod) return null;
                    return (
                      <div 
                        key={prod.id}
                        onClick={() => onSelectProduct(prod)}
                        className="card-glass"
                        style={{
                          padding: '0.85rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          cursor: 'pointer',
                          backgroundColor: 'rgba(5, 11, 24, 0.8)'
                        }}
                      >
                        <img 
                          src={prod.image} 
                          alt={prod.name}
                          style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.25 }}>
                            {prod.name}
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#F5C542', fontWeight: 700, marginTop: '0.2rem' }}>
                            KES {prod.price.toLocaleString()}
                          </div>
                        </div>
                        <button className="btn btn-sm btn-outline-gold" style={{ padding: '0.35rem 0.65rem' }}>
                          View
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Articles Grid */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.75rem'
          }}>
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="card-glass card-interactive"
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#0A1733'
                }}
              >
                <div>
                  <div style={{ height: '180px', overflow: 'hidden' }}>
                    <img 
                      src={article.image} 
                      alt={article.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div style={{ padding: '1.25rem 1.25rem 0 1.25rem' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem',
                      fontSize: '0.75rem'
                    }}>
                      <span className="badge badge-blue">{article.category}</span>
                      <span style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={12} />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 style={{
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      lineHeight: 1.35,
                      marginBottom: '0.65rem'
                    }}>
                      {article.title}
                    </h3>

                    <p style={{
                      fontSize: '0.85rem',
                      color: '#94A3B8',
                      lineHeight: 1.5,
                      marginBottom: '1rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div style={{
                  padding: '1rem 1.25rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: '#F5C542',
                  fontSize: '0.85rem',
                  fontWeight: 700
                }}>
                  <span>Read Field Guide</span>
                  <ArrowRight size={15} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
