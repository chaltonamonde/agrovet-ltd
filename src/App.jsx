import React, { useState, useEffect } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import CategoryGrid from './components/CategoryGrid';
import FeaturedProducts from './components/FeaturedProducts';
import HowItWorks from './components/HowItWorks';
import AskExpertCTA from './components/AskExpertCTA';
import ReviewsSection from './components/ReviewsSection';
import FAQSection from './components/FAQSection';
import ShopView from './components/ShopView';
import ConsultationSection from './components/ConsultationSection';
import LearnSection from './components/LearnSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ProductModal from './components/ProductModal';
import WholesaleModal from './components/WholesaleModal';
import AccountModal from './components/AccountModal';
import RestockDiscountModal from './components/RestockDiscountModal';
import StickyWhatsApp from './components/StickyWhatsApp';
import BackToTop from './components/BackToTop';
import { PRODUCTS } from './data/products';
import { INITIAL_ORDERS, INITIAL_SERVICE_BOOKINGS } from './data/adminData';

export default function App() {
  // Navigation & View State
  const [activeView, setActiveView] = useState('home'); // 'home' | 'shop' | 'consultation' | 'learn' | 'about' | 'contact' | 'admin'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Dynamic Catalog State with LocalStorage Persistence (Edit the Whole Shop)
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('agrovet_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved products from localStorage:', e);
    }
    return PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('agrovet_products', JSON.stringify(products));
    } catch (e) {
      console.warn('Failed to save products to localStorage:', e);
    }
  }, [products]);

  // Dynamic Customer Orders State with LocalStorage Persistence
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('agrovet_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved orders from localStorage:', e);
    }
    return INITIAL_ORDERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('agrovet_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed to save orders to localStorage:', e);
    }
  }, [orders]);

  // Dynamic Service Bookings State
  const [services, setServices] = useState(() => {
    try {
      const saved = localStorage.getItem('agrovet_services');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved services from localStorage:', e);
    }
    return INITIAL_SERVICE_BOOKINGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('agrovet_services', JSON.stringify(services));
    } catch (e) {
      console.warn('Failed to save services to localStorage:', e);
    }
  }, [services]);

  // Reset to original factory products
  const handleResetDefaultProducts = () => {
    setProducts(PRODUCTS);
    try {
      localStorage.removeItem('agrovet_products');
    } catch (e) {}
    showToast('Catalog restored to original factory defaults!');
  };

  // Add new completed order
  const handleAddOrder = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
    showToast(`Order ${newOrder.id} logged in system!`);
  };

  // Shopping Cart State
  const [cartItems, setCartItems] = useState([
    // Pre-populate with 1 realistic starter item so cart isn't empty on first glance
    {
      id: 'prod-01',
      name: 'Alamycin 10% Injection (Oxytetracycline)',
      brand: 'Norbrook Kenya',
      price: 650,
      selectedPack: '100 ml',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'
    }
  ]);

  // Modal Dialog States
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWholesaleOpen, setIsWholesaleOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState(null);

  // Trigger first-order discount modal after 12 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const seenDiscount = sessionStorage.getItem('seenDiscount');
      if (!seenDiscount) {
        setIsDiscountModalOpen(true);
        sessionStorage.setItem('seenDiscount', 'true');
      }
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart operations
  const handleAddToCart = (product) => {
    const packSize = product.selectedPack || product.packSizes?.[0]?.size || 'Standard Unit';
    const itemPrice = product.price;
    const addQty = product.quantity || 1;

    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.id === product.id && item.selectedPack === packSize);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += addQty;
        return updated;
      } else {
        return [...prev, {
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: itemPrice,
          selectedPack: packSize,
          quantity: addQty,
          image: product.image
        }];
      }
    });

    if (selectedProductModal) setSelectedProductModal(null);
    showToast(`Added ${product.name} to cart!`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId, selectedPack, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId, selectedPack);
      return;
    }
    setCartItems(prev => prev.map(item => {
      if (item.id === productId && item.selectedPack === selectedPack) {
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveItem = (productId, selectedPack) => {
    setCartItems(prev => prev.filter(item => !(item.id === productId && item.selectedPack === selectedPack)));
    showToast('Item removed from cart.');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Navigations & Interactivity
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setActiveView('shop');
  };

  const handleSearchSelect = (query) => {
    setSearchQuery(query);
    setActiveView('shop');
  };

  const handleConsultProduct = (product) => {
    if (selectedProductModal) setSelectedProductModal(null);
    const text = encodeURIComponent(
      `Hello Dr. Peter Karanja,\n` +
      `I want to consult before purchasing regulated product: ${product.name} (${product.activeIngredient}).\n` +
      `Please verify diagnosis and safe dosage for my farm.`
    );
    window.open(`https://wa.me/254700123456?text=${text}`, '_blank');
  };

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div style={{ position: 'relative', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {/* Live Canvas Background: Drifting Gold Particles & Ambient Waves */}
      <AnimatedBackground />

      {/* Primary Sticky Header */}
      <Navbar 
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenConsultation={() => setActiveView('consultation')}
        onOpenWholesale={() => setIsWholesaleOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onSelectProduct={(p) => setSelectedProductModal(p)}
      />

      {/* Main Dynamic View Content */}
      <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        {activeView === 'home' && (
          <main>
            <Hero 
              onShopNow={() => setActiveView('shop')}
              onConsultVet={() => setActiveView('consultation')}
              onSearchSelect={handleSearchSelect}
            />

            <TrustBar />

            <CategoryGrid 
              onSelectCategory={handleCategorySelect}
            />

            <FeaturedProducts 
              products={products}
              onAddToCart={handleAddToCart}
              onOpenProductModal={(p) => setSelectedProductModal(p)}
              onConsultProduct={handleConsultProduct}
              onViewAll={() => setActiveView('shop')}
            />

            <AskExpertCTA 
              onOpenConsultation={() => setActiveView('consultation')}
            />

            <HowItWorks 
              onShopNow={() => setActiveView('shop')}
            />

            <ReviewsSection />

            <FAQSection />
          </main>
        )}

        {activeView === 'shop' && (
          <ShopView 
            products={products}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onAddToCart={handleAddToCart}
            onOpenProductModal={(p) => setSelectedProductModal(p)}
            onConsultProduct={handleConsultProduct}
          />
        )}

        {activeView === 'consultation' && (
          <ConsultationSection />
        )}

        {activeView === 'learn' && (
          <LearnSection 
            onSelectProduct={(p) => setSelectedProductModal(p)}
          />
        )}

        {activeView === 'about' && (
          <AboutSection />
        )}

        {activeView === 'contact' && (
          <ContactSection />
        )}

        {activeView === 'admin' && (
          <AdminPanel 
            products={products}
            setProducts={setProducts}
            orders={orders}
            setOrders={setOrders}
            services={services}
            setServices={setServices}
            onBackToShop={() => setActiveView('shop')}
            onResetDefaultProducts={handleResetDefaultProducts}
          />
        )}
      </div>

      {/* Global Footer (shown on storefront views) */}
      {activeView !== 'admin' && (
        <Footer 
          setActiveView={setActiveView}
          onOpenWholesale={() => setIsWholesaleOpen(true)}
          onOpenConsultation={() => setActiveView('consultation')}
        />
      )}

      {/* Slide-out Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onAddToCart={handleAddToCart}
      />

      {/* Multi-step Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onClearCart={handleClearCart}
        onAddOrder={handleAddOrder}
      />

      {/* Product Deep-dive Modal */}
      <ProductModal 
        product={selectedProductModal}
        onClose={() => setSelectedProductModal(null)}
        onAddToCart={handleAddToCart}
        onConsultProduct={handleConsultProduct}
      />

      {/* Wholesale & Cooperative Quote Modal */}
      <WholesaleModal 
        isOpen={isWholesaleOpen}
        onClose={() => setIsWholesaleOpen(false)}
      />

      {/* Customer Account & Past Orders Modal */}
      <AccountModal 
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onOpenAdmin={() => setActiveView('admin')}
        onReorder={(order) => {
          showToast('Previous order items loaded to cart!');
          setIsCartOpen(true);
        }}
      />

      {/* First-Order Discount & Restock Modal */}
      <RestockDiscountModal 
        isOpen={isDiscountModalOpen}
        onClose={() => setIsDiscountModalOpen(false)}
      />

      {/* Floating Sticky 24/7 WhatsApp Vet Widget */}
      <StickyWhatsApp 
        onOpenConsultation={() => setActiveView('consultation')}
      />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Toast Notification Box */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          backgroundColor: '#0D1B36',
          border: '1.5px solid #F5C542',
          color: '#FFFFFF',
          borderRadius: '10px',
          padding: '0.85rem 1.4rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7), 0 0 15px rgba(245, 197, 66, 0.3)',
          zIndex: 1050,
          fontWeight: 600,
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'slideUp 0.25s ease-out'
        }}>
          <span style={{ color: '#10B981' }}>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
