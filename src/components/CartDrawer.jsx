import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { FREE_DELIVERY_THRESHOLD } from '../data/deliveryZones';
import { PRODUCTS } from '../data/products';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onProceedToCheckout,
  onAddToCart
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const freeDeliveryPercent = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  // Cart upsell item
  const upsellItem = PRODUCTS.find(p => !cartItems.some(item => item.id === p.id));

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#09152E',
          borderLeft: '1px solid rgba(30, 107, 255, 0.35)',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.8)',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideUp 0.25s ease-out'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#060F22'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} color="#F5C542" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF' }}>
              Your Farm Order ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="btn btn-icon btn-outline"
            style={{ width: '34px', height: '34px', borderRadius: '50%' }}
            aria-label="Close cart"
          >
            <X size={17} />
          </button>
        </div>

        {/* Free Delivery Progress Bar */}
        <div style={{
          backgroundColor: 'rgba(10, 25, 55, 0.85)',
          borderBottom: '1px solid rgba(30, 107, 255, 0.2)',
          padding: '0.85rem 1.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.785rem',
            marginBottom: '0.4rem',
            color: '#E2E8F0'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Truck size={14} color="#F5C542" />
              {remainingForFreeDelivery > 0 ? (
                <span>Add <strong>KES {remainingForFreeDelivery.toLocaleString()}</strong> more for <strong>FREE Kenya Delivery</strong></span>
              ) : (
                <span style={{ color: '#10B981', fontWeight: 700 }}>
                  🎉 You’ve unlocked FREE Farmgate Delivery!
                </span>
              )}
            </span>
            <span style={{ fontWeight: 700, color: '#F5C542' }}>{freeDeliveryPercent}%</span>
          </div>

          {/* Progress Track */}
          <div style={{
            width: '100%',
            height: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '9999px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${freeDeliveryPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #1E6BFF 0%, #F5C542 100%)',
              borderRadius: '9999px',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Cart Items List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {cartItems.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 1rem',
              color: '#94A3B8'
            }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: 'rgba(30, 107, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <ShoppingBag size={32} color="#60A5FA" />
              </div>
              <h4 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                Your cart is empty
              </h4>
              <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                Stock up on certified veterinary medicines, fertilizers, and seeds for your farm.
              </p>
              <button 
                onClick={onClose}
                className="btn btn-primary"
                style={{ padding: '0.75rem 1.5rem' }}
              >
                Browse Farm Shop
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div 
                key={`${item.id}-${item.selectedPack || 'default'}`}
                style={{
                  display: 'flex',
                  gap: '0.9rem',
                  padding: '0.85rem',
                  backgroundColor: 'rgba(13, 27, 54, 0.7)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                <img 
                  src={item.image} 
                  alt={item.name}
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    backgroundColor: '#061024'
                  }}
                />

                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '0.885rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    lineHeight: 1.3,
                    marginBottom: '0.2rem'
                  }}>
                    {item.name}
                  </div>

                  <div style={{
                    fontSize: '0.75rem',
                    color: '#60A5FA',
                    marginBottom: '0.4rem'
                  }}>
                    Pack Size: {item.selectedPack || item.packSizes?.[0]?.size || 'Standard Unit'}
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '0.4rem'
                  }}>
                    {/* Stepper */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#061024',
                      borderRadius: '6px',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.selectedPack, item.quantity - 1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#E2E8F0',
                          padding: '0.2rem 0.5rem',
                          cursor: 'pointer'
                        }}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0 0.4rem', color: '#FFFFFF' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.selectedPack, item.quantity + 1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#E2E8F0',
                          padding: '0.2rem 0.5rem',
                          cursor: 'pointer'
                        }}
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      color: '#F5C542',
                      fontSize: '0.95rem'
                    }}>
                      KES {(item.price * item.quantity).toLocaleString()}
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id, item.selectedPack)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#64748B',
                        cursor: 'pointer',
                        padding: '0.2rem'
                      }}
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Upsell recommendation */}
          {upsellItem && cartItems.length > 0 && (
            <div style={{
              marginTop: '0.5rem',
              padding: '0.85rem',
              backgroundColor: 'rgba(30, 107, 255, 0.08)',
              border: '1px dashed rgba(30, 107, 255, 0.35)',
              borderRadius: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#F5C542', fontWeight: 700, marginBottom: '0.4rem' }}>
                <Sparkles size={13} />
                <span>Frequently Added with this Order:</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                <div style={{ fontSize: '0.8rem', color: '#E2E8F0', fontWeight: 600 }}>
                  {upsellItem.name}
                  <div style={{ color: '#F5C542', fontSize: '0.785rem', fontWeight: 700 }}>
                    KES {upsellItem.price.toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => onAddToCart(upsellItem)}
                  className="btn btn-sm btn-outline-gold"
                  style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
                >
                  + Add
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Subtotal & Checkout Button */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '1.25rem 1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: '#060F22'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '0.35rem'
            }}>
              <span style={{ color: '#94A3B8', fontSize: '0.875rem' }}>Estimated Subtotal:</span>
              <span style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
                color: '#F5C542'
              }}>
                KES {subtotal.toLocaleString()}
              </span>
            </div>

            <div style={{
              fontSize: '0.75rem',
              color: '#64748B',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}>
              <ShieldCheck size={13} color="#10B981" />
              <span>Courier fees calculated by County at next step</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="btn btn-primary btn-lg"
              style={{
                width: '100%',
                padding: '0.9rem',
                fontSize: '1rem'
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={17} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
