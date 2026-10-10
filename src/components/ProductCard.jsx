import React from 'react';
import { 
  ShoppingBag, 
  MessageCircle, 
  Star, 
  AlertTriangle, 
  ShieldCheck, 
  Eye, 
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onOpenProductModal, 
  onConsultProduct 
}) {
  const isRestricted = product.isRestricted;

  const handleWhatsAppOrder = (e) => {
    e.stopPropagation();
    const defaultPack = product.packSizes.find(p => p.default) || product.packSizes[0];
    const message = encodeURIComponent(
      `Hello Agrovet ltd, I would like to order:\n` +
      `Product: ${product.name}\n` +
      `Pack Size: ${defaultPack.size}\n` +
      `Price: KES ${product.price.toLocaleString()}\n` +
      `Please confirm stock and delivery to my farm.`
    );
    window.open(`https://wa.me/254700123456?text=${message}`, '_blank');
  };

  const handleActionClick = (e) => {
    e.stopPropagation();
    if (isRestricted) {
      onConsultProduct(product);
    } else {
      onAddToCart(product);
    }
  };

  return (
    <div 
      onClick={() => onOpenProductModal(product)}
      className="card-glass card-interactive product-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        height: '100%',
        backgroundColor: '#0D1B36',
        borderRadius: '16px',
        border: '1px solid rgba(30, 107, 255, 0.22)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Product Image & Badges Overlay */}
      <div 
        className="product-card-img-wrap"
        style={{
          position: 'relative',
          width: '100%',
          height: '210px',
          backgroundColor: '#071226',
          overflow: 'hidden'
        }}
      >
        <img 
          src={product.image} 
          alt={product.name}
          loading="lazy"
          width="300"
          height="300"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          className="product-img"
        />

        {/* Top Badges */}
        <div 
          className="product-card-badges"
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            right: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '0.4rem',
            pointerEvents: 'none'
          }}
        >
          <div>
            {isRestricted ? (
              <span className="badge badge-restricted" style={{ fontSize: '0.68rem', boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                <AlertTriangle size={11} />
                <span>Consult Req.</span>
              </span>
            ) : product.isBestSeller ? (
              <span className="badge badge-gold" style={{ fontSize: '0.68rem', boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                ★ Best Seller
              </span>
            ) : product.isPopular ? (
              <span className="badge badge-blue" style={{ fontSize: '0.68rem' }}>
                Hot
              </span>
            ) : null}
          </div>

          {product.isLowStock && (
            <span className="badge badge-warning" style={{ fontSize: '0.68rem', background: 'rgba(245, 158, 11, 0.9)', color: '#050B18' }}>
              Only {product.stockCount} left
            </span>
          )}
        </div>

        {/* Quick View Hover Pill */}
        <div 
          className="quick-view-overlay"
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            background: 'rgba(5, 11, 24, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#FFFFFF',
            borderRadius: '6px',
            padding: '0.25rem 0.5rem',
            fontSize: '0.72rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            backdropFilter: 'blur(4px)'
          }}
        >
          <Eye size={12} color="#60A5FA" />
          <span>View Info</span>
        </div>
      </div>

      {/* Product Content Body */}
      <div 
        className="product-card-body"
        style={{
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between'
        }}
      >
        <div>
          {/* Brand & Rating Row */}
          <div 
            className="product-card-meta"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.4rem'
            }}
          >
            <span style={{
              fontSize: '0.75rem',
              color: '#60A5FA',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              {product.brand}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Star size={13} fill="#F5C542" color="#F5C542" />
              <span style={{ fontSize: '0.785rem', fontWeight: 700, color: '#FFFFFF' }}>
                {product.rating}
              </span>
              <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
                ({product.reviewsCount})
              </span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            className="product-card-title"
            style={{
              fontSize: '1.05rem',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.35,
              marginBottom: '0.5rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {product.name}
          </h3>

          {/* Active Ingredient (Verification Signal) */}
          <div 
            className="product-card-ingredient"
            style={{
              backgroundColor: 'rgba(5, 11, 24, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '6px',
              padding: '0.35rem 0.6rem',
              marginBottom: '0.75rem',
              fontSize: '0.75rem',
              color: '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <ShieldCheck size={13} color="#10B981" style={{ flexShrink: 0 }} />
            <span style={{ 
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap' 
            }}>
              {product.activeIngredient}
            </span>
          </div>

          {/* Pack size indicator */}
          <div 
            className="product-card-sizes"
            style={{
              fontSize: '0.75rem',
              color: '#64748B',
              marginBottom: '0.85rem'
            }}
          >
            Sizes: {product.packSizes.map(p => p.size).join(' • ')}
          </div>
        </div>

        {/* Pricing & CTA Row */}
        <div>
          <div 
            className="product-card-price-row"
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.4rem',
              marginBottom: '0.9rem'
            }}
          >
            <span 
              className="product-card-price"
              style={{
                fontSize: '1.35rem',
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
                color: '#F5C542'
              }}
            >
              KES {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="price-strike">
                KES {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div 
            className="product-card-actions"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {isRestricted ? (
              <button
                onClick={handleActionClick}
                className="btn btn-sm btn-outline product-card-btn"
                style={{
                  flex: 1,
                  borderColor: 'rgba(239, 68, 68, 0.5)',
                  color: '#FCA5A5',
                  backgroundColor: 'rgba(239, 68, 68, 0.12)',
                  fontSize: '0.8rem',
                  padding: '0.65rem 0.6rem'
                }}
              >
                <AlertTriangle size={14} />
                <span>Consult to Buy</span>
              </button>
            ) : (
              <button
                onClick={handleActionClick}
                className="btn btn-sm btn-primary product-card-btn"
                style={{
                  flex: 1,
                  padding: '0.65rem 0.6rem',
                  fontSize: '0.825rem'
                }}
              >
                <ShoppingBag size={15} color="#050B18" />
                <span>Add to Cart</span>
              </button>
            )}

            {/* Quick WhatsApp Order Button */}
            <button
              onClick={handleWhatsAppOrder}
              className="btn btn-sm btn-outline product-card-wa-btn"
              title="Order on WhatsApp"
              style={{
                borderColor: 'rgba(37, 211, 102, 0.35)',
                color: '#25D366',
                backgroundColor: 'rgba(37, 211, 102, 0.08)',
                padding: '0.65rem 0.75rem'
              }}
              aria-label="Order on WhatsApp"
            >
              <MessageCircle size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
