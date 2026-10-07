import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  MessageCircle, 
  Star, 
  ShieldCheck, 
  AlertTriangle, 
  Truck, 
  Clock, 
  Check, 
  Plus, 
  Minus,
  Sparkles,
  Info,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function ProductModal({ 
  product, 
  onClose, 
  onAddToCart, 
  onConsultProduct 
}) {
  if (!product) return null;

  // Selected pack size state
  const defaultPack = product.packSizes.find(p => p.default) || product.packSizes[0];
  const [selectedPack, setSelectedPack] = useState(defaultPack);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('usage'); // 'usage' | 'safety' | 'withholding' | 'reviews'

  // Calculate current price based on selected pack size
  const currentPrice = selectedPack ? selectedPack.price : product.price;

  // Find related products in same category
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 2);

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      price: currentPrice,
      selectedPack: selectedPack.size,
      quantity
    });
  };

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Hello Agrovet ltd,\n` +
      `I want to order: ${product.name}\n` +
      `Pack Size: ${selectedPack.size}\n` +
      `Quantity: ${quantity}\n` +
      `Total: KES ${(currentPrice * quantity).toLocaleString()}\n` +
      `Active Ingredient: ${product.activeIngredient}\n` +
      `Please arrange delivery to my farm.`
    );
    window.open(`https://wa.me/254700123456?text=${message}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="card-glass"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '900px',
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: '#0A1733',
          border: '1px solid rgba(30, 107, 255, 0.4)',
          borderRadius: '20px',
          padding: '0',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(30, 107, 255, 0.25)',
          position: 'relative'
        }}
      >
        {/* Sticky Modal Header Bar */}
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: 'rgba(10, 23, 51, 0.95)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="badge badge-blue">{product.brand}</span>
            {product.isRestricted && (
              <span className="badge badge-restricted">
                <AlertTriangle size={12} />
                <span>Restricted Veterinary/Agrochemical</span>
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="btn btn-icon btn-outline"
            style={{ width: '36px', height: '36px', borderRadius: '50%' }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Main Content Grid */}
        <div style={{ padding: '1.5rem 1.75rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            {/* Left: Product Image & Verification */}
            <div>
              <div style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#061024',
                border: '1px solid rgba(30, 107, 255, 0.25)',
                height: '340px'
              }}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  background: 'rgba(5, 11, 24, 0.85)',
                  backdropFilter: 'blur(6px)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  color: '#60A5FA',
                  fontFamily: 'monospace',
                  border: '1px solid rgba(30, 107, 255, 0.3)'
                }}>
                  {product.complianceCode}
                </div>
              </div>

              {/* Delivery ETA & Trust Box */}
              <div style={{
                marginTop: '1rem',
                backgroundColor: 'rgba(5, 11, 24, 0.6)',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                fontSize: '0.8rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10B981' }}>
                  <Truck size={16} />
                  <span><strong>Dispatches within 3 hours</strong> from Nairobi Central Depot</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94A3B8' }}>
                  <ShieldCheck size={16} color="#F5C542" />
                  <span>PCPB/KVB Verified Manufacturer Original Seal Guarantee</span>
                </div>
              </div>
            </div>

            {/* Right: Product Details, Pack Size, Price & CTA */}
            <div>
              <h2 style={{
                fontSize: '1.65rem',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.25,
                marginBottom: '0.5rem'
              }}>
                {product.name}
              </h2>

              {/* Rating & Stock */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem',
                fontSize: '0.85rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Star size={15} fill="#F5C542" color="#F5C542" />
                  <span style={{ fontWeight: 700, color: '#FFFFFF' }}>{product.rating}</span>
                  <span style={{ color: '#94A3B8' }}>({product.reviewsCount} farmer reviews)</span>
                </div>
                <span style={{ color: '#64748B' }}>•</span>
                <span style={{ color: product.isLowStock ? '#F59E0B' : '#10B981', fontWeight: 600 }}>
                  {product.isLowStock ? `Low Stock (${product.stockCount} left)` : 'In Stock at Depot'}
                </span>
              </div>

              {/* Active Ingredient Box */}
              <div style={{
                backgroundColor: 'rgba(30, 107, 255, 0.1)',
                border: '1px solid rgba(30, 107, 255, 0.3)',
                borderRadius: '8px',
                padding: '0.65rem 0.9rem',
                marginBottom: '1.25rem'
              }}>
                <div style={{ fontSize: '0.72rem', color: '#60A5FA', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>
                  Active Ingredient & Strength
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#FFFFFF', marginTop: '0.2rem' }}>
                  {product.activeIngredient}
                </div>
              </div>

              {/* Price display */}
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '0.75rem',
                marginBottom: '1.25rem'
              }}>
                <span style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-display)',
                  color: '#F5C542'
                }}>
                  KES {currentPrice.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="price-strike" style={{ fontSize: '1.1rem' }}>
                    KES {(product.originalPrice * (selectedPack ? selectedPack.price / product.price : 1)).toFixed(0)}
                  </span>
                )}
                <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>
                  Save 15%
                </span>
              </div>

              {/* Pack Size Selector */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label className="form-label">
                  Select Pack Size / Quantity:
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {product.packSizes.map((pack) => (
                    <button
                      key={pack.size}
                      onClick={() => setSelectedPack(pack)}
                      style={{
                        padding: '0.55rem 0.95rem',
                        borderRadius: '8px',
                        border: selectedPack?.size === pack.size 
                          ? '1.5px solid #F5C542' 
                          : '1px solid rgba(255, 255, 255, 0.12)',
                        backgroundColor: selectedPack?.size === pack.size 
                          ? 'rgba(245, 197, 66, 0.15)' 
                          : 'rgba(5, 11, 24, 0.6)',
                        color: selectedPack?.size === pack.size ? '#F5C542' : '#E2E8F0',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {pack.size} - KES {pack.price.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Add to Cart Row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap'
              }}>
                {/* Stepper */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#071228',
                  borderRadius: '8px',
                  border: '1px solid rgba(30, 107, 255, 0.3)',
                  height: '46px'
                }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#FFFFFF',
                      padding: '0 0.85rem',
                      cursor: 'pointer'
                    }}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span style={{ fontWeight: 700, padding: '0 0.6rem', color: '#FFFFFF', minWidth: '24px', textAlign: 'center' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#FFFFFF',
                      padding: '0 0.85rem',
                      cursor: 'pointer'
                    }}
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Primary Action Button */}
                {product.isRestricted ? (
                  <button
                    onClick={() => onConsultProduct(product)}
                    className="btn btn-outline"
                    style={{
                      flex: 1,
                      height: '46px',
                      borderColor: 'rgba(239, 68, 68, 0.5)',
                      color: '#FCA5A5',
                      backgroundColor: 'rgba(239, 68, 68, 0.15)'
                    }}
                  >
                    <AlertTriangle size={17} />
                    <span>Consult Licensed Vet to Order</span>
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="btn btn-primary"
                    style={{ flex: 1, height: '46px' }}
                  >
                    <ShoppingBag size={18} color="#050B18" />
                    <span>Add to Cart • KES {(currentPrice * quantity).toLocaleString()}</span>
                  </button>
                )}

                {/* WhatsApp Order Button */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="btn btn-whatsapp"
                  style={{ height: '46px', padding: '0 1.25rem' }}
                  title="Order direct on WhatsApp"
                >
                  <MessageCircle size={18} />
                  <span style={{ display: 'none' }} className="d-sm-inline">WhatsApp</span>
                </button>
              </div>

              {/* Target crops or animals */}
              <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                <strong style={{ color: '#E2E8F0' }}>Recommended For:</strong> {product.targetCropsOrAnimals.join(', ')}
              </div>
            </div>
          </div>

          {/* Detailed Guidance Tabs: Usage, Withholding, Safety */}
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            {/* Tabs Header */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: '0.5rem',
              marginBottom: '1.25rem',
              overflowX: 'auto'
            }}>
              {[
                { id: 'usage', label: 'Dosage & Application' },
                { id: 'withholding', label: 'Withholding Period & Safety' },
                { id: 'description', label: 'Full Technical Specs' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: activeTab === tab.id ? 'rgba(245, 197, 66, 0.15)' : 'transparent',
                    border: activeTab === tab.id ? '1px solid #F5C542' : '1px solid transparent',
                    color: activeTab === tab.id ? '#F5C542' : '#94A3B8',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div style={{
              backgroundColor: 'rgba(5, 11, 24, 0.5)',
              borderRadius: '12px',
              padding: '1.25rem',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              {activeTab === 'usage' && (
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#F5C542', marginBottom: '0.5rem' }}>
                    Official Field Application & Dosage Guide:
                  </h4>
                  <p style={{ color: '#E2E8F0', lineHeight: 1.6, fontSize: '0.925rem' }}>
                    {product.usageDosage}
                  </p>
                  <div style={{
                    marginTop: '0.75rem',
                    padding: '0.65rem 0.85rem',
                    backgroundColor: 'rgba(30, 107, 255, 0.1)',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    color: '#60A5FA'
                  }}>
                    💡 <strong>Mkulima Tip:</strong> Unsure about calibration for your specific knapsack or animal body weight? Click "Chat on WhatsApp" for instant calculation assistance from our veterinary desk.
                  </div>
                </div>
              )}

              {activeTab === 'withholding' && (
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#EF4444', marginBottom: '0.5rem' }}>
                    Withholding Period & Consumer Safety:
                  </h4>
                  <div style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '8px',
                    padding: '0.85rem 1rem',
                    marginBottom: '0.75rem',
                    color: '#FECACA',
                    fontSize: '0.9rem'
                  }}>
                    {product.withholdingPeriod}
                  </div>
                  <h4 style={{ fontSize: '0.95rem', color: '#F5C542', marginBottom: '0.35rem' }}>
                    Operator Safety & PPE Notes:
                  </h4>
                  <p style={{ color: '#94A3B8', fontSize: '0.85rem' }}>
                    {product.safetyNotes}
                  </p>
                </div>
              )}

              {activeTab === 'description' && (
                <div>
                  <p style={{ color: '#E2E8F0', lineHeight: 1.6, fontSize: '0.925rem', marginBottom: '0.75rem' }}>
                    {product.description}
                  </p>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                    <strong>Manufacturer / Marketing Authorization Holder:</strong> {product.brand}<br />
                    <strong>Kenyan Statutory Registration:</strong> {product.complianceCode}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Frequently Bought Together Upsell Section */}
          {relatedProducts.length > 0 && (
            <div style={{
              backgroundColor: 'rgba(13, 27, 54, 0.6)',
              border: '1px solid rgba(30, 107, 255, 0.25)',
              borderRadius: '12px',
              padding: '1.25rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem'
              }}>
                <Sparkles size={16} color="#F5C542" />
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>
                  Frequently Bought Together
                </span>
                <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
                  Bundle & Save KES 350
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '0.75rem'
              }}>
                {relatedProducts.map(rel => (
                  <div 
                    key={rel.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.6rem 0.85rem',
                      backgroundColor: 'rgba(5, 11, 24, 0.7)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <img 
                      src={rel.image} 
                      alt={rel.name}
                      style={{ width: '44px', height: '44px', borderRadius: '6px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.2 }}>
                        {rel.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#F5C542', fontWeight: 700 }}>
                        KES {rel.price.toLocaleString()}
                      </div>
                    </div>
                    <button
                      onClick={() => onAddToCart(rel)}
                      className="btn btn-sm btn-outline-gold"
                      style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
