import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';

export default function FeaturedProducts({ 
  onAddToCart, 
  onOpenProductModal, 
  onConsultProduct, 
  onViewAll,
  products = PRODUCTS
}) {
  const [activeTab, setActiveTab] = useState('best-sellers');

  const getFilteredProducts = () => {
    const list = products || PRODUCTS;
    switch (activeTab) {
      case 'best-sellers':
        return list.filter(p => p.isBestSeller).slice(0, 4);
      case 'veterinary':
        return list.filter(p => p.category === 'veterinary-drugs' || p.category === 'dairy').slice(0, 4);
      case 'crops':
        return list.filter(p => p.category === 'crop-chemicals' || p.category === 'fertilizers').slice(0, 4);
      case 'seeds-feeds':
        return list.filter(p => p.category === 'seeds' || p.category === 'animal-feeds').slice(0, 4);
      default:
        return list.slice(0, 4);
    }
  };

  const displayedProducts = getFilteredProducts();

  return (
    <section className="featured-section" style={{
      padding: '4.5rem 0',
      backgroundColor: '#050B18',
      position: 'relative'
    }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(245, 197, 66, 0.12)',
              border: '1px solid rgba(245, 197, 66, 0.35)',
              color: '#F5C542',
              fontSize: '0.785rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '0.75rem'
            }}>
              <Sparkles size={14} color="#F5C542" />
              <span>Certified Top Demand Inputs</span>
            </div>

            <h2 className="section-title" style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.2
            }}>
              Featured & Best-Selling <span className="text-gradient-gold">Farm Supplies</span>
            </h2>
          </div>

          {/* Curated Filter Tabs */}
          <div className="featured-tabs" style={{
            display: 'flex',
            backgroundColor: '#0A1733',
            padding: '4px',
            borderRadius: '12px',
            border: '1px solid rgba(30, 107, 255, 0.25)',
            gap: '4px',
            overflowX: 'auto',
            maxWidth: '100%'
          }}>
            {[
              { id: 'best-sellers', label: '★ Best Sellers' },
              { id: 'veterinary', label: 'Veterinary & Dairy' },
              { id: 'crops', label: 'Crop Chemicals' },
              { id: 'seeds-feeds', label: 'Seeds & Feeds' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="featured-tab-btn"
                style={{
                  padding: '0.55rem 0.95rem',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: activeTab === tab.id ? 'var(--blue-600)' : 'transparent',
                  color: activeTab === tab.id ? '#FFFFFF' : '#94A3B8',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Cards Grid (2-column on mobile) */}
        <div className="products-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {displayedProducts.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onOpenProductModal={onOpenProductModal}
              onConsultProduct={onConsultProduct}
            />
          ))}
        </div>

        {/* View All Products CTA */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onViewAll}
            className="btn btn-outline-gold btn-lg"
            style={{ padding: '0.9rem 2.2rem' }}
          >
            <span>View All Products in Online Agrovet</span>
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}
