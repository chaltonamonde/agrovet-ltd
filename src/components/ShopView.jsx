import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Grid, 
  List, 
  Search, 
  X, 
  SlidersHorizontal, 
  Check, 
  ChevronDown,
  Sparkles,
  ShoppingBag,
  MessageCircle,
  AlertTriangle,
  Star,
  ShieldCheck
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import ProductCard from './ProductCard';

export default function ShopView({ 
  selectedCategory, 
  setSelectedCategory,
  searchQuery, 
  setSearchQuery,
  onAddToCart,
  onOpenProductModal,
  onConsultProduct
}) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price-low' | 'price-high' | 'rating'
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedTarget, setSelectedTarget] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(15000);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [showAllInMobile, setShowAllInMobile] = useState(false);

  // Extract distinct brands and target types
  const brands = useMemo(() => {
    const list = Array.from(new Set(PRODUCTS.map(p => p.brand)));
    return ['all', ...list];
  }, []);

  const targets = [
    'all',
    'Dairy Cattle',
    'Poultry',
    'Maize',
    'Tomatoes',
    'Sheep & Goats',
    'Vegetables'
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(prod => {
      // Category filter
      if (selectedCategory && selectedCategory !== 'all' && prod.category !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== 'all' && prod.brand !== selectedBrand) {
        return false;
      }
      // Target animal/crop
      if (selectedTarget !== 'all') {
        const matchesTarget = prod.targetCropsOrAnimals.some(t => 
          t.toLowerCase().includes(selectedTarget.toLowerCase())
        );
        if (!matchesTarget) return false;
      }
      // In stock
      if (inStockOnly && prod.stockCount <= 0) {
        return false;
      }
      // Max price
      if (prod.price > maxPrice) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = prod.name.toLowerCase().includes(q);
        const matchIngredient = prod.activeIngredient.toLowerCase().includes(q);
        const matchDesc = prod.description.toLowerCase().includes(q);
        const matchBrand = prod.brand.toLowerCase().includes(q);
        if (!matchName && !matchIngredient && !matchDesc && !matchBrand) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: popular / best seller
      if (a.isBestSeller && !b.isBestSeller) return -1;
      if (!a.isBestSeller && b.isBestSeller) return 1;
      return 0;
    });
  }, [selectedCategory, selectedBrand, selectedTarget, inStockOnly, maxPrice, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedTarget('all');
    setInStockOnly(false);
    setMaxPrice(15000);
    setSearchQuery('');
  };

  return (
    <div className="shop-section" style={{
      padding: '3rem 0 5rem 0',
      backgroundColor: '#050B18',
      minHeight: '80vh'
    }}>
      <div className="container">
        {/* Page Title & Breadcrumb */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.25rem' }}>
              Agricultural & Veterinary <span className="text-gradient-gold">Shop</span>
            </h1>
            <p style={{ color: '#94A3B8', fontSize: '0.95rem' }}>
              Showing {filteredProducts.length} certified genuine products with countrywide delivery.
            </p>
          </div>

          {/* Quick category badges on top for desktop */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSelectedCategory('all')}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '9999px',
                border: selectedCategory === 'all' ? '1.5px solid #F5C542' : '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: selectedCategory === 'all' ? 'rgba(245, 197, 66, 0.15)' : 'rgba(10, 23, 51, 0.6)',
                color: selectedCategory === 'all' ? '#F5C542' : '#CBD5E1',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              All Categories
            </button>
            {CATEGORIES.slice(0, 5).map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '9999px',
                  border: selectedCategory === cat.id ? '1.5px solid #F5C542' : '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: selectedCategory === cat.id ? 'rgba(245, 197, 66, 0.15)' : 'rgba(10, 23, 51, 0.6)',
                  color: selectedCategory === cat.id ? '#F5C542' : '#CBD5E1',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {cat.shortName}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Sort Controls Bar */}
        <div style={{
          backgroundColor: '#0A1733',
          border: '1px solid rgba(30, 107, 255, 0.25)',
          borderRadius: '14px',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="btn btn-outline d-md-none"
            style={{ padding: '0.55rem 0.95rem', fontSize: '0.85rem', gap: '0.4rem' }}
          >
            <SlidersHorizontal size={15} />
            <span>Filter Products</span>
          </button>

          {/* Active Search Display */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '220px' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '340px' }}>
              <Search size={15} style={{ position: 'absolute', left: '10px', top: '12px', color: '#64748B' }} />
              <input 
                type="text" 
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2rem', height: '38px', fontSize: '0.85rem', borderRadius: '8px' }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: '10px', top: '10px', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Sort By & View Mode */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.825rem', color: '#94A3B8' }}>Sort By:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
                style={{ height: '38px', padding: '0.2rem 2rem 0.2rem 0.75rem', fontSize: '0.825rem', width: 'auto' }}
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Grid / List View Toggle */}
            <div style={{ display: 'flex', backgroundColor: '#061024', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '2px' }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  background: viewMode === 'grid' ? '#1E6BFF' : 'none',
                  border: 'none',
                  color: '#FFFFFF',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
                title="Grid View"
                aria-label="Grid View"
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  background: viewMode === 'list' ? '#1E6BFF' : 'none',
                  border: 'none',
                  color: '#FFFFFF',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
                title="List View"
                aria-label="List View"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Sidebar Filters + Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '2rem'
        }} className="shop-grid-layout">
          {/* Desktop Sidebar Filters */}
          <aside className="shop-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Filter Group: Categories */}
            <div className="card-glass" style={{ padding: '1.25rem', backgroundColor: '#0A1733' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF' }}>Categories</h4>
                <button onClick={resetFilters} style={{ background: 'none', border: 'none', color: '#F5C542', fontSize: '0.75rem', cursor: 'pointer' }}>
                  Reset All
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <button
                  onClick={() => setSelectedCategory('all')}
                  style={{
                    padding: '0.45rem 0.65rem',
                    borderRadius: '6px',
                    textAlign: 'left',
                    background: selectedCategory === 'all' ? 'rgba(245, 197, 66, 0.15)' : 'none',
                    border: 'none',
                    color: selectedCategory === 'all' ? '#F5C542' : '#CBD5E1',
                    fontSize: '0.85rem',
                    fontWeight: selectedCategory === 'all' ? 700 : 500,
                    cursor: 'pointer'
                  }}
                >
                  All Products ({PRODUCTS.length})
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      padding: '0.45rem 0.65rem',
                      borderRadius: '6px',
                      textAlign: 'left',
                      background: selectedCategory === cat.id ? 'rgba(245, 197, 66, 0.15)' : 'none',
                      border: 'none',
                      color: selectedCategory === cat.id ? '#F5C542' : '#CBD5E1',
                      fontSize: '0.85rem',
                      fontWeight: selectedCategory === cat.id ? 700 : 500,
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{cat.name}</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      {PRODUCTS.filter(p => p.category === cat.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Group: Target Animal / Crop */}
            <div className="card-glass" style={{ padding: '1.25rem', backgroundColor: '#0A1733' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.75rem' }}>
                Animal / Crop Focus
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {targets.map(target => (
                  <button
                    key={target}
                    onClick={() => setSelectedTarget(target)}
                    style={{
                      padding: '0.4rem 0.65rem',
                      borderRadius: '6px',
                      textAlign: 'left',
                      background: selectedTarget === target ? 'rgba(30, 107, 255, 0.2)' : 'none',
                      border: 'none',
                      color: selectedTarget === target ? '#60A5FA' : '#CBD5E1',
                      fontSize: '0.825rem',
                      cursor: 'pointer'
                    }}
                  >
                    {target === 'all' ? 'All Enterprises' : target}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Group: Brand */}
            <div className="card-glass" style={{ padding: '1.25rem', backgroundColor: '#0A1733' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.75rem' }}>
                Manufacturer / Brand
              </h4>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="form-select"
                style={{ fontSize: '0.85rem' }}
              >
                {brands.map(b => (
                  <option key={b} value={b}>{b === 'all' ? 'All Verified Brands' : b}</option>
                ))}
              </select>
            </div>

            {/* Filter Group: Price Range */}
            <div className="card-glass" style={{ padding: '1.25rem', backgroundColor: '#0A1733' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF' }}>Max Price</h4>
                <span style={{ color: '#F5C542', fontWeight: 700, fontSize: '0.85rem' }}>
                  KES {maxPrice.toLocaleString()}
                </span>
              </div>
              <input 
                type="range"
                min="500"
                max="15000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5C542', cursor: 'pointer' }}
              />
            </div>
          </aside>

          {/* Products Grid or List View */}
          <main>
            {filteredProducts.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '4rem 1rem',
                backgroundColor: '#0A1733',
                borderRadius: '16px',
                border: '1px solid rgba(30, 107, 255, 0.2)'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(30, 107, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto'
                }}>
                  <Search size={28} color="#60A5FA" />
                </div>
                <h3 style={{ fontSize: '1.35rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                  No products match your filter
                </h3>
                <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Try resetting your price slider or searching for a different active ingredient.
                </p>
                <button onClick={resetFilters} className="btn btn-primary">
                  Clear All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <>
                <div className="products-grid" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {filteredProducts.map((product, idx) => (
                    <div key={product.id} className={idx >= 8 && !showAllInMobile ? 'product-hidden-mobile' : ''}>
                      <ProductCard 
                        product={product}
                        onAddToCart={onAddToCart}
                        onOpenProductModal={onOpenProductModal}
                        onConsultProduct={onConsultProduct}
                      />
                    </div>
                  ))}
                </div>
                {filteredProducts.length > 8 && (
                  <div className="shop-more-mobile-wrap" style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    <button
                      onClick={() => setShowAllInMobile(!showAllInMobile)}
                      className="btn btn-outline-gold"
                      style={{ padding: '0.65rem 1.4rem', fontSize: '0.85rem' }}
                    >
                      {showAllInMobile ? 'Show Fewer Products' : `View All ${filteredProducts.length} Products`}
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* List View */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    onClick={() => onOpenProductModal(product)}
                    className="card-glass card-interactive"
                    style={{
                      padding: '1.25rem',
                      display: 'flex',
                      gap: '1.25rem',
                      alignItems: 'center',
                      backgroundColor: '#0A1733',
                      cursor: 'pointer',
                      flexWrap: 'wrap'
                    }}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name}
                      style={{ width: '100px', height: '100px', borderRadius: '10px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1, minWidth: '220px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <span style={{ fontSize: '0.75rem', color: '#60A5FA', textTransform: 'uppercase', fontWeight: 600 }}>
                          {product.brand}
                        </span>
                        {product.isRestricted && <span className="badge badge-restricted" style={{ fontSize: '0.65rem' }}>Consult Req.</span>}
                      </div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.35rem' }}>
                        {product.name}
                      </h3>
                      <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '0.4rem' }}>
                        Active: <strong style={{ color: '#E2E8F0' }}>{product.activeIngredient}</strong>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                        Sizes: {product.packSizes.map(p => p.size).join(', ')}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', minWidth: '160px' }}>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F5C542', fontFamily: 'var(--font-display)' }}>
                        KES {product.price.toLocaleString()}
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.6rem', justifyContent: 'flex-end' }}>
                        {product.isRestricted ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onConsultProduct(product);
                            }}
                            className="btn btn-sm btn-outline"
                            style={{ borderColor: '#EF4444', color: '#FCA5A5' }}
                          >
                            Consult
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddToCart(product);
                            }}
                            className="btn btn-sm btn-primary"
                          >
                            + Add
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Drawer Filter */}
      {mobileFilterOpen && (
        <div className="modal-overlay" onClick={() => setMobileFilterOpen(false)}>
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '90%',
              maxWidth: '360px',
              backgroundColor: '#09152E',
              borderRadius: '16px',
              padding: '1.5rem',
              maxHeight: '85vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', fontWeight: 700 }}>Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)} style={{ background: 'none', border: 'none', color: '#FFFFFF' }}>
                <X size={18} />
              </button>
            </div>

            {/* Category selection */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label className="form-label">Category</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-select"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Brand selection */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label className="form-label">Brand</label>
              <select 
                value={selectedBrand} 
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="form-select"
              >
                {brands.map(b => (
                  <option key={b} value={b}>{b === 'all' ? 'All Brands' : b}</option>
                ))}
              </select>
            </div>

            <button 
              onClick={() => setMobileFilterOpen(false)} 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '1rem' }}
            >
              Apply Filters ({filteredProducts.length} Results)
            </button>
          </div>
        </div>
      )}

      {/* Responsive layout styles */}
      <style>{`
        @media (max-width: 860px) {
          .shop-grid-layout {
            grid-template-columns: 1fr !important;
          }
          .shop-sidebar {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
