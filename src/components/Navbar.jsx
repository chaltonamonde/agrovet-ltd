import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  MessageCircle, 
  Menu, 
  X, 
  Phone, 
  ShieldCheck, 
  User, 
  Truck, 
  HelpCircle,
  FileText,
  ChevronDown,
  Building
} from 'lucide-react';

export default function Navbar({ 
  cartCount, 
  onOpenCart, 
  activeView, 
  setActiveView, 
  searchQuery, 
  setSearchQuery,
  onOpenConsultation,
  onOpenWholesale,
  onOpenAccount,
  onSelectProduct
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop Products' },
    { id: 'consultation', label: 'Consultation' },
    { id: 'learn', label: 'Farmer Guides' },
    { id: 'about', label: 'About & Licences' },
    { id: 'contact', label: 'Contact & Depots' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      width: '100%',
      transition: 'all 0.3s ease'
    }}>
      {/* Top Trust Notification Bar */}
      <div style={{
        backgroundColor: '#071226',
        borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
        padding: '0.4rem 1rem',
        fontSize: '0.785rem',
        color: '#94A3B8'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#F5C542' }}>
              <Truck size={14} />
              <span>Countrywide Express Delivery (All 47 Counties)</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <ShieldCheck size={14} color="#60A5FA" />
              <span>100% Genuine PCPB & KVB Certified Inputs</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <a 
              href="tel:+254700123456" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#E2E8F0' }}
            >
              <Phone size={13} color="#D4A017" />
              <span>Nairobi Depot: +254 700 123 456</span>
            </a>
            <button 
              onClick={onOpenWholesale}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#60A5FA',
                cursor: 'pointer',
                fontSize: '0.785rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <Building size={13} />
              <span>Wholesale & Bulk Quotes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav style={{
        backgroundColor: isScrolled ? 'rgba(5, 11, 24, 0.95)' : 'rgba(5, 11, 24, 0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(30, 107, 255, 0.2)',
        boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.5)' : 'none',
        transition: 'background-color 0.3s ease'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '76px',
          gap: '1rem'
        }}>
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveView('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0A1E46 0%, #061129 100%)',
              border: '1.5px solid #F5C542',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(245, 197, 66, 0.3)'
            }}>
              <span style={{ fontSize: '1.35rem', lineHeight: 1 }}>🌱</span>
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.45rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <span style={{ color: '#FFFFFF' }}>Agrovet</span>
                <span style={{ color: '#F5C542' }}>ltd</span>
              </div>
              <div style={{
                fontSize: '0.68rem',
                color: '#60A5FA',
                letterSpacing: '0.05em',
                fontWeight: 600,
                textTransform: 'uppercase'
              }}>
                Kenya's Digital Agrovet
              </div>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div style={{
            position: 'relative',
            flex: 1,
            maxWidth: '380px',
            display: 'none',
            alignItems: 'center'
          }} className="desktop-search">
            <Search 
              size={17} 
              style={{
                position: 'absolute',
                left: '12px',
                color: searchFocused ? '#F5C542' : '#64748B',
                transition: 'color 0.2s ease'
              }} 
            />
            <input 
              type="text"
              placeholder="Search vet drugs, seeds, chemicals, feeds..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeView !== 'shop') setActiveView('shop');
              }}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="form-input"
              style={{
                paddingLeft: '2.4rem',
                paddingRight: '1rem',
                fontSize: '0.875rem',
                borderRadius: '9999px',
                height: '42px',
                backgroundColor: '#08142C',
                borderColor: searchFocused ? '#F5C542' : 'rgba(30, 107, 255, 0.25)'
              }}
            />
          </div>

          {/* Desktop Navigation Links */}
          <div style={{
            display: 'none',
            alignItems: 'center',
            gap: '1.5rem'
          }} className="desktop-nav">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveView(link.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.925rem',
                  fontWeight: activeView === link.id ? 700 : 500,
                  color: activeView === link.id ? '#F5C542' : '#E2E8F0',
                  padding: '0.5rem 0.25rem',
                  position: 'relative',
                  transition: 'color 0.2s ease'
                }}
              >
                {link.label}
                {activeView === link.id && (
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: '#F5C542',
                    borderRadius: '2px',
                    boxShadow: '0 0 8px rgba(245, 197, 66, 0.8)'
                  }} />
                )}
              </button>
            ))}
          </div>

          {/* Right Action Icons & CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Ask Vet WhatsApp Quick Button */}
            <button
              onClick={onOpenConsultation}
              className="btn btn-sm btn-outline"
              style={{
                display: 'none',
                borderColor: 'rgba(30, 107, 255, 0.4)',
                color: '#60A5FA',
                padding: '0.55rem 0.85rem'
              }}
              id="ask-vet-nav-btn"
            >
              <MessageCircle size={15} color="#25D366" />
              <span>Ask Vet</span>
            </button>

            {/* Account Profile */}
            <button
              onClick={onOpenAccount}
              className="btn btn-icon btn-outline"
              title="Farmer Account & Orders"
              style={{ width: '40px', height: '40px' }}
              aria-label="Farmer Account"
            >
              <User size={18} color="#E2E8F0" />
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="btn btn-primary"
              style={{
                position: 'relative',
                padding: '0.6rem 1.1rem',
                gap: '0.45rem',
                fontSize: '0.875rem'
              }}
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingBag size={18} color="#050B18" />
              <span style={{ fontWeight: 700, color: '#050B18' }}>Cart</span>
              {cartCount > 0 && (
                <span style={{
                  background: '#050B18',
                  color: '#F5C542',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '0.1rem 0.45rem',
                  borderRadius: '9999px',
                  border: '1px solid #D4A017'
                }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-icon btn-outline"
              style={{ display: 'inline-flex', width: '40px', height: '40px' }}
              className="mobile-toggle"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input Row */}
        <div className="mobile-search-row" style={{
          padding: '0 1rem 0.75rem 1rem',
          display: 'none'
        }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search 
              size={16} 
              style={{ position: 'absolute', left: '12px', top: '12px', color: '#64748B' }} 
            />
            <input 
              type="text"
              placeholder="Search products, vet medicines, feeds..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeView !== 'shop') setActiveView('shop');
              }}
              className="form-input"
              style={{
                paddingLeft: '2.4rem',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                height: '40px'
              }}
            />
          </div>
        </div>

        {/* Mobile Slide-down Menu Drawer */}
        {mobileMenuOpen && (
          <div style={{
            backgroundColor: '#071228',
            borderTop: '1px solid rgba(30, 107, 255, 0.25)',
            borderBottom: '1px solid rgba(30, 107, 255, 0.25)',
            padding: '1.25rem 1.25rem 1.75rem 1.25rem',
            animation: 'fadeIn 0.2s ease'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveView(link.id);
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    background: activeView === link.id ? 'rgba(245, 197, 66, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    border: activeView === link.id ? '1px solid rgba(245, 197, 66, 0.35)' : '1px solid rgba(255, 255, 255, 0.05)',
                    color: activeView === link.id ? '#F5C542' : '#FFFFFF',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <span>{link.label}</span>
                  {activeView === link.id && <span style={{ color: '#F5C542' }}>●</span>}
                </button>
              ))}

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
                <button
                  onClick={() => {
                    onOpenConsultation();
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-whatsapp"
                  style={{ flex: 1 }}
                >
                  <MessageCircle size={17} />
                  <span>Ask Vet</span>
                </button>
                <button
                  onClick={() => {
                    onOpenWholesale();
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-outline-gold"
                  style={{ flex: 1 }}
                >
                  <Building size={17} />
                  <span>Wholesale</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Responsive CSS for Desktop/Mobile view toggling */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-search { display: flex !important; }
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
          #ask-vet-nav-btn { display: inline-flex !important; }
        }
        @media (max-width: 899px) {
          .mobile-search-row { display: block !important; }
        }
      `}</style>
    </header>
  );
}
