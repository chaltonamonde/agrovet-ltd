import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  BarChart3,
  TrendingUp,
  Package,
  ShoppingBag,
  DollarSign,
  Users,
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Printer,
  MessageCircle,
  Truck,
  ShieldCheck,
  Stethoscope,
  Wheat,
  Sprout,
  Leaf,
  Wrench,
  Building,
  Phone,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  X,
  RefreshCw,
  Download,
  Eye,
  Sliders,
  Calendar,
  Layers,
  MapPin,
  Lock
} from 'lucide-react';
import { 
  INITIAL_ORDERS, 
  SERVICE_INFLOW_DATA, 
  CATEGORY_PERFORMANCE_DATA, 
  MONTHLY_REVENUE_TREND, 
  COUNTY_REVENUE_DATA, 
  INITIAL_SERVICE_BOOKINGS 
} from '../data/adminData';
import { CATEGORIES } from '../data/categories';

export default function AdminPanel({
  products,
  setProducts,
  orders,
  setOrders,
  services,
  setServices,
  onBackToShop,
  onResetDefaultProducts,
  onLock
}) {
  // Tab alias map: URL aliases → internal tab IDs
  const TAB_ALIAS = { catalog: 'inventory', shop: 'inventory', analytics: 'analytics', inventory: 'inventory', orders: 'orders', services: 'services', settings: 'settings' };

  // Read tab from URL ?tab= on initial render
  const getInitialTab = () => {
    try {
      const param = new URLSearchParams(window.location.search).get('tab');
      if (param && TAB_ALIAS[param]) return TAB_ALIAS[param];
    } catch (e) {}
    return 'analytics';
  };

  // Navigation Tabs: 'analytics' | 'inventory' | 'orders' | 'services' | 'settings'
  const [activeTab, setActiveTab] = useState(getInitialTab);

  // Sync URL ?tab= when tab changes
  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tabId);
      window.history.replaceState({}, '', url.toString());
    } catch (e) {}
  }, []);

  // Sub-filter for Analytics tab: 'all' | 'services' | 'categories' | 'trends'
  const [analyticsSubTab, setAnalyticsSubTab] = useState('all');

  // Modals
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [isNewSaleOpen, setIsNewSaleOpen] = useState(false);
  const [isNewServiceOpen, setIsNewServiceOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Inventory Filters
  const [invSearch, setInvSearch] = useState('');
  const [invCategory, setInvCategory] = useState('all');
  const [invStockFilter, setInvStockFilter] = useState('all'); // 'all' | 'low-stock' | 'out-of-stock'

  // Orders Filters
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all'); // 'all' | 'Pending' | 'Processing' | 'Dispatched' | 'Delivered'

  // Service Bookings Filters
  const [serviceStatusFilter, setServiceStatusFilter] = useState('all');

  // Quick Notification Toast
  const [adminToast, setAdminToast] = useState(null);
  const showToast = (msg) => {
    setAdminToast(msg);
    setTimeout(() => setAdminToast(null), 3000);
  };

  // ----------------------------------------------------
  // COMPUTED KPI METRICS
  // ----------------------------------------------------
  const totalShopSales = useMemo(() => {
    return orders.reduce((acc, o) => acc + (o.total || 0), 0);
  }, [orders]);

  const totalServicesInflow = useMemo(() => {
    return services.reduce((acc, s) => acc + (s.fee || 0), 0) + 
      SERVICE_INFLOW_DATA.reduce((acc, item) => acc + item.inflowAmount, 0);
  }, [services]);

  const combinedGrossInflow = totalShopSales + totalServicesInflow;

  const lowStockCount = useMemo(() => {
    return products.filter(p => (p.stockCount !== undefined && p.stockCount <= 10) || p.isLowStock).length;
  }, [products]);

  // ----------------------------------------------------
  // INVENTORY OPERATIONS (EDIT THE WHOLE SHOP)
  // ----------------------------------------------------
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = 
        p.name.toLowerCase().includes(invSearch.toLowerCase()) ||
        p.brand?.toLowerCase().includes(invSearch.toLowerCase()) ||
        p.activeIngredient?.toLowerCase().includes(invSearch.toLowerCase());
      const matchCategory = invCategory === 'all' || p.category === invCategory;
      const matchStock = 
        invStockFilter === 'all' ? true :
        invStockFilter === 'low-stock' ? (p.stockCount <= 10 || p.isLowStock) :
        invStockFilter === 'out-of-stock' ? p.stockCount === 0 : true;
      return matchSearch && matchCategory && matchStock;
    });
  }, [products, invSearch, invCategory, invStockFilter]);

  const handleQuickStockAdjust = (productId, delta) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const newStock = Math.max(0, (p.stockCount || 0) + delta);
        return {
          ...p,
          stockCount: newStock,
          isLowStock: newStock <= 10
        };
      }
      return p;
    }));
    showToast(`Stock updated!`);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    setDeleteConfirmId(null);
    showToast('Product successfully deleted from catalog.');
  };

  const handleSaveProductEdit = (updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditingProduct(null);
    showToast(`Saved changes for ${updatedProduct.name}!`);
  };

  const handleAddNewProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: `prod-custom-${Date.now()}`,
      slug: newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: 5.0,
      reviewsCount: 1,
      isLowStock: Number(newProduct.stockCount) <= 10
    };
    setProducts(prev => [productWithId, ...prev]);
    setIsAddProductOpen(false);
    showToast(`Added ${newProduct.name} to shop!`);
  };

  // ----------------------------------------------------
  // ORDERS OPERATIONS (MANAGE SALES)
  // ----------------------------------------------------
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchSearch = 
        o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.customerName?.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.phone?.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.county?.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.mpesaRef?.toLowerCase().includes(orderSearch.toLowerCase());
      const matchStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, orderSearch, orderStatusFilter]);

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, status: newStatus };
      }
      return o;
    }));
    if (selectedOrderDetails && selectedOrderDetails.id === orderId) {
      setSelectedOrderDetails(prev => ({ ...prev, status: newStatus }));
    }
    showToast(`Order ${orderId} status set to ${newStatus}`);
  };

  // ----------------------------------------------------
  // SERVICES OPERATIONS
  // ----------------------------------------------------
  const filteredServices = useMemo(() => {
    return services.filter(s => {
      return serviceStatusFilter === 'all' || s.status === serviceStatusFilter;
    });
  }, [services, serviceStatusFilter]);

  const handleUpdateServiceStatus = (serviceId, newStatus) => {
    setServices(prev => prev.map(s => {
      if (s.id === serviceId) {
        return { ...s, status: newStatus };
      }
      return s;
    }));
    showToast(`Service booking status updated!`);
  };

  // Export Data JSON
  const handleExportData = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      shopCatalog: products,
      customerOrders: orders,
      serviceBookings: services,
      financialBenchmarks: {
        totalShopSales,
        totalServicesInflow,
        combinedGrossInflow
      }
    };
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", jsonStr);
    downloadAnchor.setAttribute("download", `Agrovet_Ltd_Admin_Export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Export file downloaded!');
  };

  return (
    <div className="admin-container" style={{
      backgroundColor: '#030814',
      minHeight: '100vh',
      width: '100%',
      maxWidth: '100vw',
      overflowX: 'hidden',
      color: '#FFFFFF',
      fontFamily: 'var(--font-sans)',
      paddingBottom: '5rem',
      position: 'relative',
      boxSizing: 'border-box'
    }}>
      {/* ==================================================== */}
      {/* ADMIN HEADER BANNER (RESPONSIVE) */}
      {/* ==================================================== */}
      <div style={{
        backgroundColor: '#061129',
        borderBottom: '1.5px solid rgba(30, 107, 255, 0.35)',
        padding: '0.85rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 90,
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7)',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          padding: '0 0.85rem'
        }}>
          {/* Brand & Mode Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', maxWidth: '100%' }}>
            <div style={{
              width: '40px',
              height: '40px',
              minWidth: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #1E6BFF 0%, #0A1E46 100%)',
              border: '1.5px solid #F5C542',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(245, 197, 66, 0.35)'
            }}>
              <ShieldCheck size={22} color="#F5C542" />
            </div>
            <div style={{ minWidth: 0, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h1 style={{
                  fontSize: 'clamp(1rem, 3.5vw, 1.25rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  margin: 0,
                  letterSpacing: '-0.02em',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  Agrovet Ltd Operations Command
                </h1>
                <span style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #10B981',
                  color: '#10B981',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.45rem',
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
                  Live Sync
                </span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.15rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                KVB #2104 • PCPB #AGV-2026 • Secure Staff Console
              </div>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleExportData}
              className="btn btn-sm btn-outline"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.18)',
                color: '#CBD5E1',
                gap: '0.35rem',
                fontSize: '0.75rem',
                padding: '0.4rem 0.65rem'
              }}
              title="Download backup JSON"
            >
              <Download size={13} />
              <span>Export</span>
            </button>

            {/* Lock Console Button */}
            <button
              onClick={onLock}
              className="btn btn-sm btn-outline"
              style={{
                borderColor: 'rgba(239, 68, 68, 0.4)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: '#EF4444',
                gap: '0.35rem',
                fontSize: '0.75rem',
                padding: '0.4rem 0.65rem',
                fontWeight: 700
              }}
              title="Lock Console & Log Out"
            >
              <Lock size={13} />
              <span>Lock</span>
            </button>

            <button
              onClick={onBackToShop}
              className="btn btn-sm btn-primary"
              style={{
                padding: '0.45rem 0.85rem',
                fontSize: '0.785rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <ArrowLeft size={14} />
              <span>Storefront</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Row with smooth touch scrolling */}
        <div className="container" style={{ marginTop: '0.85rem', padding: '0 0.85rem' }}>
          <div style={{
            display: 'flex',
            gap: '0.4rem',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: '0.35rem',
            scrollbarWidth: 'none',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            {[
              { id: 'analytics', label: '📊 Inflows & Charts', desc: 'Revenue Analysis' },
              { id: 'inventory', label: `📦 Shop Catalog (${products.length})`, desc: 'Edit All Products' },
              { id: 'orders', label: `🛒 Orders (${orders.length})`, desc: 'Sales & Delivery' },
              { id: 'services', label: `🩺 Bookings (${services.length})`, desc: 'Vet & Agronomy' },
              { id: 'settings', label: '⚙️ Settings', desc: 'Rates & Reset' }
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  style={{
                    backgroundColor: isActive ? '#1E6BFF' : 'rgba(10, 23, 51, 0.8)',
                    border: isActive ? '1.5px solid #F5C542' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: isActive ? '#FFFFFF' : '#94A3B8',
                    padding: '0.5rem 0.85rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    boxShadow: isActive ? '0 4px 15px rgba(30, 107, 255, 0.4)' : 'none'
                  }}
                >
                  <span style={{ color: isActive ? '#FFFFFF' : '#E2E8F0' }}>{tab.label}</span>
                  <span style={{ fontSize: '0.65rem', color: isActive ? '#F5C542' : '#64748B', fontWeight: 500 }}>
                    {tab.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* MAIN ADMIN CONTENT BODY */}
      {/* ==================================================== */}
      <div className="container" style={{ marginTop: '1.25rem', padding: '0 0.85rem' }}>

        {/* -------------------------------------------------- */}
        {/* TAB 1: CHARTS & ANALYTICS (INFLOWS & CATEGORIES) */}
        {/* -------------------------------------------------- */}
        {activeTab === 'analytics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '100%' }}>
            
            {/* Top Row: Executive Metric Cards (Responsive Grid) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
              gap: '0.75rem',
              width: '100%'
            }}>
              {/* Card 1: Gross Inflow */}
              <div className="card-glass" style={{
                backgroundColor: '#0A1733',
                border: '1.5px solid rgba(245, 197, 66, 0.35)',
                borderRadius: '14px',
                padding: '1rem',
                boxSizing: 'border-box'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>
                    Gross Inflow (MTD)
                  </span>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(245, 197, 66, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <DollarSign size={16} color="#F5C542" />
                  </div>
                </div>
                <div style={{ fontSize: 'clamp(1.2rem, 4.5vw, 1.7rem)', fontWeight: 800, color: '#FFFFFF', marginTop: '0.35rem', fontFamily: 'var(--font-display)', wordBreak: 'break-word' }}>
                  KES {combinedGrossInflow.toLocaleString()}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.35rem', fontSize: '0.72rem' }}>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>+22.4%</span>
                  <span style={{ color: '#64748B' }}>vs last month</span>
                </div>
              </div>

              {/* Card 2: Shop Product Sales */}
              <div className="card-glass" style={{
                backgroundColor: '#0A1733',
                border: '1.5px solid rgba(30, 107, 255, 0.35)',
                borderRadius: '14px',
                padding: '1rem',
                boxSizing: 'border-box'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>
                    Products Sales
                  </span>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(30, 107, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <ShoppingBag size={16} color="#60A5FA" />
                  </div>
                </div>
                <div style={{ fontSize: 'clamp(1.2rem, 4.5vw, 1.7rem)', fontWeight: 800, color: '#60A5FA', marginTop: '0.35rem', fontFamily: 'var(--font-display)', wordBreak: 'break-word' }}>
                  KES {totalShopSales.toLocaleString()}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.35rem', fontSize: '0.72rem' }}>
                  <span style={{ color: '#F5C542', fontWeight: 700 }}>
                    {((totalShopSales / combinedGrossInflow) * 100).toFixed(1)}%
                  </span>
                  <span style={{ color: '#64748B' }}>of all business</span>
                </div>
              </div>

              {/* Card 3: Professional Services Revenue */}
              <div className="card-glass" style={{
                backgroundColor: '#0A1733',
                border: '1.5px solid rgba(16, 185, 129, 0.35)',
                borderRadius: '14px',
                padding: '1rem',
                boxSizing: 'border-box'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>
                    Services Inflow
                  </span>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Stethoscope size={16} color="#10B981" />
                  </div>
                </div>
                <div style={{ fontSize: 'clamp(1.2rem, 4.5vw, 1.7rem)', fontWeight: 800, color: '#10B981', marginTop: '0.35rem', fontFamily: 'var(--font-display)', wordBreak: 'break-word' }}>
                  KES {totalServicesInflow.toLocaleString()}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.35rem', fontSize: '0.72rem' }}>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>
                    {((totalServicesInflow / combinedGrossInflow) * 100).toFixed(1)}%
                  </span>
                  <span style={{ color: '#64748B' }}>vet & agronomy</span>
                </div>
              </div>

              {/* Card 4: Orders & Low Stock Alert */}
              <div className="card-glass" style={{
                backgroundColor: '#0A1733',
                border: lowStockCount > 0 ? '1.5px solid rgba(239, 68, 68, 0.45)' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '14px',
                padding: '1rem',
                boxSizing: 'border-box'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>
                    Inventory Health
                  </span>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    backgroundColor: lowStockCount > 0 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(30, 107, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Package size={16} color={lowStockCount > 0 ? '#EF4444' : '#60A5FA'} />
                  </div>
                </div>
                <div style={{ fontSize: 'clamp(1.2rem, 4.5vw, 1.7rem)', fontWeight: 800, color: '#FFFFFF', marginTop: '0.35rem', fontFamily: 'var(--font-display)' }}>
                  {orders.length} <span style={{ fontSize: '0.785rem', color: '#94A3B8', fontWeight: 500 }}>Orders</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.35rem', fontSize: '0.72rem' }}>
                  {lowStockCount > 0 ? (
                    <span style={{ color: '#EF4444', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <AlertTriangle size={12} /> {lowStockCount} Need Restock
                    </span>
                  ) : (
                    <span style={{ color: '#10B981', fontWeight: 600 }}>All SKUs Healthy</span>
                  )}
                </div>
              </div>
            </div>

            {/* Sub-navigation for Analytics views (Horizontal scroll on phone) */}
            <div style={{
              display: 'flex',
              gap: '0.4rem',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: '0.5rem',
              scrollbarWidth: 'none',
              width: '100%'
            }}>
              {[
                { id: 'all', label: 'All Analysis Views' },
                { id: 'services', label: '🩺 Revenue From Each Service' },
                { id: 'categories', label: '📦 Analysis in Each Category' },
                { id: 'trends', label: '📈 Monthly Trends & Counties' }
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setAnalyticsSubTab(sub.id)}
                  style={{
                    backgroundColor: analyticsSubTab === sub.id ? 'rgba(245, 197, 66, 0.15)' : 'transparent',
                    border: analyticsSubTab === sub.id ? '1px solid #F5C542' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: analyticsSubTab === sub.id ? '#F5C542' : '#94A3B8',
                    padding: '0.4rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* -------------------------------------------------- */}
            {/* SECTION 1: HOW MUCH MONEY COMES IN FROM EACH SERVICE */}
            {/* -------------------------------------------------- */}
            {(analyticsSubTab === 'all' || analyticsSubTab === 'services') && (
              <div className="card-glass" style={{
                backgroundColor: '#071226',
                border: '1px solid rgba(30, 107, 255, 0.35)',
                borderRadius: '16px',
                padding: 'clamp(1rem, 3.5vw, 1.5rem)',
                boxSizing: 'border-box',
                width: '100%'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  marginBottom: '1.25rem'
                }}>
                  <div style={{ maxWidth: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>🩺</span>
                      <h2 style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.3rem)', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                        Revenue Inflows By Service
                      </h2>
                    </div>
                    <p style={{ fontSize: '0.785rem', color: '#94A3B8', margin: '0.25rem 0 0 0' }}>
                      Audit of income generated across clinical vet visits, telehealth, agronomy audits, and logistics.
                    </p>
                  </div>
                  <div style={{
                    backgroundColor: 'rgba(30, 107, 255, 0.15)',
                    border: '1px solid rgba(30, 107, 255, 0.4)',
                    padding: '0.4rem 0.75rem',
                    borderRadius: '8px',
                    textAlign: 'right'
                  }}>
                    <span style={{ fontSize: '0.68rem', color: '#60A5FA', textTransform: 'uppercase', display: 'block', fontWeight: 700 }}>
                      Services Total
                    </span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#F5C542', fontFamily: 'var(--font-display)' }}>
                      KES {totalServicesInflow.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* SVG Visual Comparison Chart: Money Coming In From Each Service */}
                <div style={{
                  backgroundColor: '#040B1A',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '1rem',
                  marginBottom: '1.25rem',
                  width: '100%',
                  boxSizing: 'border-box'
                }}>
                  <div style={{ fontSize: '0.78rem', color: '#CBD5E1', fontWeight: 700, marginBottom: '0.85rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Comparative Volume (KES)</span>
                    <span style={{ color: '#60A5FA', fontSize: '0.7rem' }}>Ranked by revenue</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {SERVICE_INFLOW_DATA.map((srv) => {
                      const maxVal = Math.max(...SERVICE_INFLOW_DATA.map(s => s.inflowAmount));
                      const barPercent = (srv.inflowAmount / maxVal) * 100;
                      return (
                        <div key={srv.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', width: '100%' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', flexWrap: 'wrap', gap: '0.25rem' }}>
                            <span style={{ fontWeight: 600, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.35rem', minWidth: '160px' }}>
                              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: srv.accentColor, flexShrink: 0 }} />
                              <span style={{ overflowWrap: 'anywhere' }}>{srv.title}</span>
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginLeft: 'auto' }}>
                              <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{srv.bookingsCount} jobs</span>
                              <span style={{ fontWeight: 800, color: '#F5C542', fontFamily: 'var(--font-display)' }}>
                                KES {srv.inflowAmount.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          {/* Animated Progress Bar */}
                          <div style={{
                            width: '100%',
                            height: '12px',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '9999px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${barPercent}%`,
                              height: '100%',
                              background: `linear-gradient(90deg, ${srv.accentColor} 0%, #F5C542 100%)`,
                              borderRadius: '9999px'
                            }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Grid of All 6 Service Cards with Inflow Metrics */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                  gap: '0.85rem',
                  width: '100%'
                }}>
                  {SERVICE_INFLOW_DATA.map(service => (
                    <div key={service.id} style={{
                      backgroundColor: '#09152E',
                      border: `1px solid ${service.accentColor}44`,
                      borderRadius: '12px',
                      padding: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxSizing: 'border-box'
                    }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span style={{
                            backgroundColor: `${service.accentColor}22`,
                            color: service.accentColor,
                            border: `1px solid ${service.accentColor}55`,
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            padding: '0.15rem 0.5rem',
                            borderRadius: '9999px'
                          }}>
                            {service.growthRate} MoM
                          </span>
                          <span style={{ fontSize: '0.7rem', color: '#64748B' }}>
                            Avg: KES {service.avgTicket.toLocaleString()}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '0.925rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.35rem', lineHeight: 1.3 }}>
                          {service.title}
                        </h4>
                        <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '0.65rem', lineHeight: 1.4 }}>
                          {service.description}
                        </p>
                      </div>

                      <div style={{
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        paddingTop: '0.65rem',
                        marginTop: '0.35rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <div style={{ fontSize: '0.65rem', color: '#64748B', textTransform: 'uppercase' }}>Inflow Share</div>
                          <div style={{ fontSize: '0.785rem', color: '#60A5FA', fontWeight: 600 }}>
                            {((service.inflowAmount / totalServicesInflow) * 100).toFixed(1)}% of Services
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.65rem', color: '#64748B', textTransform: 'uppercase' }}>Total Inflow</div>
                          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#F5C542', fontFamily: 'var(--font-display)' }}>
                            KES {service.inflowAmount.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* -------------------------------------------------- */}
            {/* SECTION 2: EVERYTHING IN EACH PRODUCT CATEGORY */}
            {/* -------------------------------------------------- */}
            {(analyticsSubTab === 'all' || analyticsSubTab === 'categories') && (
              <div className="card-glass" style={{
                backgroundColor: '#071226',
                border: '1px solid rgba(245, 197, 66, 0.35)',
                borderRadius: '16px',
                padding: 'clamp(1rem, 3.5vw, 1.5rem)',
                boxSizing: 'border-box',
                width: '100%'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  marginBottom: '1.25rem'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>📊</span>
                      <h2 style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.3rem)', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                        Category Inflows & Analysis
                      </h2>
                    </div>
                    <p style={{ fontSize: '0.785rem', color: '#94A3B8', margin: '0.25rem 0 0 0' }}>
                      Breakdown across Vet Drugs, Animal Feeds, Crop Protection, Fertilizers, Seeds, and Tools.
                    </p>
                  </div>
                  <div style={{
                    backgroundColor: 'rgba(245, 197, 66, 0.1)',
                    border: '1px solid rgba(245, 197, 66, 0.35)',
                    padding: '0.4rem 0.75rem',
                    borderRadius: '8px',
                    textAlign: 'right'
                  }}>
                    <span style={{ fontSize: '0.68rem', color: '#F5C542', textTransform: 'uppercase', display: 'block', fontWeight: 700 }}>
                      Products Revenue
                    </span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-display)' }}>
                      KES {CATEGORY_PERFORMANCE_DATA.reduce((a, c) => a + c.grossRevenue, 0).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* SVG Visual Horizontal Bars + Donut Breakdown (Responsive Stack on Mobile) */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                  gap: '1rem',
                  marginBottom: '1.25rem',
                  width: '100%'
                }}>
                  {/* Left: Category Revenue Distribution Bars */}
                  <div style={{
                    backgroundColor: '#040B1A',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '1rem',
                    boxSizing: 'border-box'
                  }}>
                    <div style={{ fontSize: '0.8rem', color: '#FFFFFF', fontWeight: 700, marginBottom: '0.75rem' }}>
                      Revenue Generated by Category
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {CATEGORY_PERFORMANCE_DATA.map(cat => {
                        const totalCatRev = CATEGORY_PERFORMANCE_DATA.reduce((a, c) => a + c.grossRevenue, 0);
                        const share = ((cat.grossRevenue / totalCatRev) * 100).toFixed(1);
                        return (
                          <div key={cat.id}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.2rem', flexWrap: 'wrap', gap: '0.2rem' }}>
                              <span style={{ color: '#E2E8F0', fontWeight: 600 }}>{cat.name}</span>
                              <span style={{ color: '#F5C542', fontWeight: 700 }}>
                                KES {cat.grossRevenue.toLocaleString()} ({share}%)
                              </span>
                            </div>
                            <div style={{
                              width: '100%',
                              height: '8px',
                              backgroundColor: 'rgba(255, 255, 255, 0.06)',
                              borderRadius: '9999px',
                              overflow: 'hidden'
                            }}>
                              <div style={{
                                width: `${share}%`,
                                height: '100%',
                                backgroundColor: cat.accent,
                                borderRadius: '9999px'
                              }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right: SVG Donut Visual */}
                  <div style={{
                    backgroundColor: '#040B1A',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box'
                  }}>
                    <div style={{ fontSize: '0.8rem', color: '#FFFFFF', fontWeight: 700, marginBottom: '0.65rem', alignSelf: 'flex-start' }}>
                      Category Market Share
                    </div>
                    
                    <div style={{ position: 'relative', width: '160px', height: '160px' }}>
                      <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                        {(() => {
                          const totalCatRev = CATEGORY_PERFORMANCE_DATA.reduce((a, c) => a + c.grossRevenue, 0);
                          let accumulatedPercent = 0;
                          return CATEGORY_PERFORMANCE_DATA.map((cat) => {
                            const percent = (cat.grossRevenue / totalCatRev) * 100;
                            const strokeDasharray = `${percent} ${100 - percent}`;
                            const strokeDashoffset = -accumulatedPercent;
                            accumulatedPercent += percent;
                            return (
                              <circle
                                key={cat.id}
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                stroke={cat.accent}
                                strokeWidth="15"
                                strokeDasharray={strokeDasharray}
                                strokeDashoffset={strokeDashoffset}
                                pathLength="100"
                              />
                            );
                          });
                        })()}
                      </svg>
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center'
                      }}>
                        <span style={{ fontSize: '0.65rem', color: '#94A3B8', textTransform: 'uppercase' }}>Shop Total</span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#F5C542' }}>6 Sectors</span>
                      </div>
                    </div>

                    {/* Donut Legend */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '0.4rem',
                      width: '100%',
                      marginTop: '0.75rem',
                      fontSize: '0.7rem'
                    }}>
                      {CATEGORY_PERFORMANCE_DATA.map(cat => (
                        <div key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: cat.accent, flexShrink: 0 }} />
                          <span style={{ color: '#94A3B8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cat.name.split(' ')[0]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Category Table with Mobile Scroll Container */}
                <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px' }}>
                  <table style={{
                    width: '100%',
                    minWidth: '580px',
                    borderCollapse: 'collapse',
                    textAlign: 'left',
                    fontSize: '0.78rem'
                  }}>
                    <thead>
                      <tr style={{ backgroundColor: '#0A1733', color: '#60A5FA', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                        <th style={{ padding: '0.65rem 0.85rem' }}>Category</th>
                        <th style={{ padding: '0.65rem 0.85rem' }}>Units Sold</th>
                        <th style={{ padding: '0.65rem 0.85rem' }}>Avg Price</th>
                        <th style={{ padding: '0.65rem 0.85rem' }}>Margin</th>
                        <th style={{ padding: '0.65rem 0.85rem' }}>Top Product</th>
                        <th style={{ padding: '0.65rem 0.85rem', textAlign: 'right' }}>Gross Inflow</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CATEGORY_PERFORMANCE_DATA.map((cat, i) => (
                        <tr 
                          key={cat.id}
                          style={{
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                            backgroundColor: i % 2 === 0 ? 'rgba(6, 17, 41, 0.5)' : 'rgba(10, 23, 51, 0.3)'
                          }}
                        >
                          <td style={{ padding: '0.65rem 0.85rem', fontWeight: 700, color: '#FFFFFF' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: cat.accent, flexShrink: 0 }} />
                              {cat.name}
                            </div>
                          </td>
                          <td style={{ padding: '0.65rem 0.85rem', color: '#E2E8F0' }}>{cat.unitsSold} units</td>
                          <td style={{ padding: '0.65rem 0.85rem', color: '#94A3B8' }}>KES {cat.avgItemPrice.toLocaleString()}</td>
                          <td style={{ padding: '0.65rem 0.85rem', color: '#10B981', fontWeight: 600 }}>{cat.marginPercent}%</td>
                          <td style={{ padding: '0.65rem 0.85rem', color: '#CBD5E1', fontSize: '0.72rem' }}>{cat.topProduct}</td>
                          <td style={{ padding: '0.65rem 0.85rem', textAlign: 'right', fontWeight: 800, color: '#F5C542', fontFamily: 'var(--font-display)' }}>
                            KES {cat.grossRevenue.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* -------------------------------------------------- */}
            {/* SECTION 3: MONTHLY TRENDS & GEOGRAPHIC COUNTY MATRIX */}
            {/* -------------------------------------------------- */}
            {(analyticsSubTab === 'all' || analyticsSubTab === 'trends') && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '1rem',
                width: '100%'
              }}>
                {/* Monthly Revenue Trend Line/Area Chart */}
                <div className="card-glass" style={{
                  backgroundColor: '#071226',
                  border: '1px solid rgba(30, 107, 255, 0.3)',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  boxSizing: 'border-box'
                }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                      6-Month Revenue Trajectory
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.2rem' }}>
                      Products vs. Professional Services fees over May - Oct 2026.
                    </p>
                  </div>

                  <div style={{
                    backgroundColor: '#040B1A',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    padding: '1rem',
                    boxSizing: 'border-box'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '120px', gap: '0.4rem', paddingTop: '0.5rem' }}>
                      {MONTHLY_REVENUE_TREND.map((item) => {
                        const maxTrend = 2200000;
                        const prodHeight = (item.productSales / maxTrend) * 100;
                        const srvHeight = (item.servicesInflow / maxTrend) * 100;
                        return (
                          <div key={item.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                            <div style={{ width: '100%', maxWidth: '24px', display: 'flex', flexDirection: 'column-reverse', gap: '2px', alignItems: 'center' }}>
                              <div style={{ width: '100%', height: `${prodHeight}px`, backgroundColor: '#1E6BFF', borderRadius: '2px 2px 0 0' }} />
                              <div style={{ width: '100%', height: `${srvHeight}px`, backgroundColor: '#F5C542', borderRadius: '2px 2px 0 0' }} />
                            </div>
                            <span style={{ fontSize: '0.62rem', color: '#94A3B8', marginTop: '0.35rem', whiteSpace: 'nowrap' }}>
                              {item.month.split(' ')[0]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    {/* Legend */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.75rem', fontSize: '0.72rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <span style={{ width: '8px', height: '8px', backgroundColor: '#1E6BFF', borderRadius: '2px' }} />
                        <span style={{ color: '#CBD5E1' }}>Products</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <span style={{ width: '8px', height: '8px', backgroundColor: '#F5C542', borderRadius: '2px' }} />
                        <span style={{ color: '#CBD5E1' }}>Services</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* County Inflow Matrix */}
                <div className="card-glass" style={{
                  backgroundColor: '#071226',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  boxSizing: 'border-box'
                }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                      Top County Distribution
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.2rem' }}>
                      Revenue across Kenya's high-productivity farming zones.
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {COUNTY_REVENUE_DATA.map((c, i) => (
                      <div key={c.county} style={{
                        backgroundColor: '#0A1733',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: i === 0 ? '#F5C542' : 'rgba(255, 255, 255, 0.1)',
                            color: i === 0 ? '#050B18' : '#FFFFFF',
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {i + 1}
                          </span>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.785rem', color: '#FFFFFF' }}>{c.county}</div>
                            <div style={{ fontSize: '0.68rem', color: '#64748B' }}>{c.orders} Orders</div>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: 800, color: '#F5C542', fontSize: '0.85rem', fontFamily: 'var(--font-display)' }}>
                            KES {c.revenue.toLocaleString()}
                          </div>
                          <div style={{ fontSize: '0.68rem', color: '#10B981', fontWeight: 600 }}>{c.share}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------- */}
        {/* TAB 2: SHOP INVENTORY MANAGER (EDIT THE WHOLE SHOP) */}
        {/* -------------------------------------------------- */}
        {activeTab === 'inventory' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
            {/* Inventory Controls Bar */}
            <div className="card-glass" style={{
              backgroundColor: '#071226',
              border: '1px solid rgba(30, 107, 255, 0.35)',
              borderRadius: '16px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              boxSizing: 'border-box',
              width: '100%'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                <div>
                  <h2 style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.3rem)', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                    Shop Catalog & Inventory Master
                  </h2>
                  <p style={{ fontSize: '0.785rem', color: '#94A3B8', margin: '0.2rem 0 0 0' }}>
                    Full management control: add products, modify prices, update stock, and edit active ingredients.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', width: '100%', justifyContent: 'flex-start' }}>
                  <button
                    onClick={() => setIsAddProductOpen(true)}
                    className="btn btn-primary"
                    style={{
                      padding: '0.55rem 1rem',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      gap: '0.35rem',
                      flex: '1 1 auto',
                      justifyContent: 'center'
                    }}
                  >
                    <Plus size={15} />
                    <span>Add Product</span>
                  </button>
                  <button
                    onClick={onResetDefaultProducts}
                    className="btn btn-outline"
                    style={{
                      borderColor: 'rgba(255, 255, 255, 0.15)',
                      color: '#94A3B8',
                      fontSize: '0.78rem',
                      gap: '0.35rem',
                      padding: '0.55rem 0.85rem'
                    }}
                    title="Restore original starter products catalog"
                  >
                    <RefreshCw size={13} />
                    <span>Reset Catalog</span>
                  </button>
                </div>
              </div>

              {/* Filters Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
                gap: '0.5rem',
                width: '100%'
              }}>
                <div style={{ position: 'relative', width: '100%' }}>
                  <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                  <input
                    type="text"
                    placeholder="Search name, brand, active ingredient..."
                    value={invSearch}
                    onChange={(e) => setInvSearch(e.target.value)}
                    style={{
                      width: '100%',
                      backgroundColor: '#040B1A',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '0.5rem 0.65rem 0.5rem 2rem',
                      color: '#FFFFFF',
                      fontSize: '0.785rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <select
                  value={invCategory}
                  onChange={(e) => setInvCategory(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: '#040B1A',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    padding: '0.5rem 0.65rem',
                    color: '#FFFFFF',
                    fontSize: '0.785rem',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="all">All Categories ({products.length})</option>
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>

                <select
                  value={invStockFilter}
                  onChange={(e) => setInvStockFilter(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: '#040B1A',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    padding: '0.5rem 0.65rem',
                    color: '#FFFFFF',
                    fontSize: '0.785rem',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="all">All Stock Statuses</option>
                  <option value="low-stock">⚠️ Low Stock Alerts (≤ 10)</option>
                  <option value="out-of-stock">🚫 Out of Stock (0)</option>
                </select>
              </div>
            </div>

            {/* RESPONSIVE INVENTORY VIEW: CARDS ON MOBILE (<=768px), TABLE ON DESKTOP */}
            {/* 1. Mobile Cards View */}
            <div className="mobile-inventory-cards" style={{ display: 'none', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
              {filteredProducts.map((prod) => {
                const isLow = (prod.stockCount <= 10) || prod.isLowStock;
                return (
                  <div key={prod.id} style={{
                    backgroundColor: '#071228',
                    border: isLow ? '1.5px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '0.85rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem',
                    boxSizing: 'border-box',
                    width: '100%'
                  }}>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <img
                        src={prod.image}
                        alt={prod.name}
                        style={{
                          width: '54px',
                          height: '54px',
                          borderRadius: '8px',
                          objectFit: 'cover',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          flexShrink: 0
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.85rem', lineHeight: 1.25, overflowWrap: 'anywhere' }}>
                          {prod.name}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#60A5FA', marginTop: '0.2rem' }}>
                          {prod.brand} • <span style={{ color: '#94A3B8' }}>{prod.activeIngredient || 'Formulated'}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.35rem', flexWrap: 'wrap' }}>
                          <span style={{ backgroundColor: 'rgba(30, 107, 255, 0.2)', color: '#60A5FA', fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>
                            {prod.category}
                          </span>
                          {prod.isBestSeller && (
                            <span style={{ backgroundColor: 'rgba(245, 197, 66, 0.2)', color: '#F5C542', fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 700 }}>
                              Best Seller
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      paddingTop: '0.6rem',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.65rem', color: '#64748B', textTransform: 'uppercase' }}>Price</div>
                        <div style={{ fontWeight: 800, color: '#F5C542', fontFamily: 'var(--font-display)', fontSize: '0.95rem' }}>
                          KES {prod.price.toLocaleString()}
                        </div>
                      </div>

                      {/* Stock Counter with inline quick adjust */}
                      <div>
                        <div style={{ fontSize: '0.65rem', color: isLow ? '#EF4444' : '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>
                          {isLow ? '⚠️ Low Stock' : 'In Stock'}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <button
                            onClick={() => handleQuickStockAdjust(prod.id, -1)}
                            style={{
                              width: '26px',
                              height: '26px',
                              borderRadius: '6px',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                              backgroundColor: '#040B1A',
                              color: '#FFFFFF',
                              cursor: 'pointer',
                              fontWeight: 700
                            }}
                          >
                            -
                          </button>
                          <span style={{ minWidth: '28px', textAlign: 'center', fontWeight: 800, color: isLow ? '#EF4444' : '#10B981', fontSize: '0.85rem' }}>
                            {prod.stockCount ?? 20}
                          </span>
                          <button
                            onClick={() => handleQuickStockAdjust(prod.id, 5)}
                            style={{
                              width: '26px',
                              height: '26px',
                              borderRadius: '6px',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                              backgroundColor: '#040B1A',
                              color: '#FFFFFF',
                              cursor: 'pointer',
                              fontWeight: 700
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div style={{ display: 'flex', gap: '0.35rem', marginLeft: 'auto' }}>
                        <button
                          onClick={() => setEditingProduct(prod)}
                          className="btn btn-sm btn-outline"
                          style={{ borderColor: 'rgba(30, 107, 255, 0.5)', color: '#60A5FA', padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                        >
                          <Edit2 size={13} style={{ marginRight: '4px' }} />
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(prod.id)}
                          className="btn btn-sm btn-outline"
                          style={{ borderColor: 'rgba(239, 68, 68, 0.5)', color: '#EF4444', padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 2. Desktop Table View */}
            <div className="desktop-inventory-table card-glass" style={{
              backgroundColor: '#071226',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '0',
              overflow: 'hidden',
              width: '100%'
            }}>
              <div style={{
                padding: '0.75rem 1.25rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#050D20'
              }}>
                <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                  Showing <strong style={{ color: '#F5C542' }}>{filteredProducts.length}</strong> items in catalog
                </span>
                {invCategory !== 'all' && (
                  <button
                    onClick={() => setInvCategory('all')}
                    style={{ background: 'none', border: 'none', color: '#60A5FA', fontSize: '0.75rem', cursor: 'pointer' }}
                  >
                    Clear Filter
                  </button>
                )}
              </div>

              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%' }}>
                <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#09152E', color: '#60A5FA', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <th style={{ padding: '0.75rem 1rem', width: '50px' }}>Image</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Product Details</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Category</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Price (KES)</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Stock</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Badges</th>
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((prod, idx) => {
                      const isLow = (prod.stockCount <= 10) || prod.isLowStock;
                      return (
                        <tr
                          key={prod.id}
                          style={{
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                            backgroundColor: idx % 2 === 0 ? 'rgba(5, 11, 24, 0.6)' : 'rgba(7, 18, 38, 0.3)'
                          }}
                        >
                          <td style={{ padding: '0.65rem 1rem' }}>
                            <img
                              src={prod.image}
                              alt={prod.name}
                              style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}
                            />
                          </td>
                          <td style={{ padding: '0.65rem 1rem', maxWidth: '240px' }}>
                            <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.825rem' }}>{prod.name}</div>
                            <div style={{ fontSize: '0.7rem', color: '#60A5FA', marginTop: '0.1rem' }}>
                              {prod.brand} • <span style={{ color: '#94A3B8' }}>{prod.activeIngredient || 'Formulated'}</span>
                            </div>
                          </td>
                          <td style={{ padding: '0.65rem 1rem' }}>
                            <span style={{ backgroundColor: 'rgba(30, 107, 255, 0.15)', color: '#60A5FA', padding: '0.15rem 0.45rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600 }}>
                              {prod.category}
                            </span>
                          </td>
                          <td style={{ padding: '0.65rem 1rem' }}>
                            <div style={{ fontWeight: 800, color: '#F5C542', fontFamily: 'var(--font-display)' }}>
                              KES {prod.price.toLocaleString()}
                            </div>
                          </td>
                          <td style={{ padding: '0.65rem 1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                              <button onClick={() => handleQuickStockAdjust(prod.id, -1)} style={{ width: '22px', height: '22px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: '#040B1A', color: '#FFFFFF', cursor: 'pointer', fontWeight: 700 }}>-</button>
                              <span style={{ minWidth: '26px', textAlign: 'center', fontWeight: 800, color: isLow ? '#EF4444' : '#10B981', fontSize: '0.8rem' }}>{prod.stockCount ?? 20}</span>
                              <button onClick={() => handleQuickStockAdjust(prod.id, 5)} style={{ width: '22px', height: '22px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: '#040B1A', color: '#FFFFFF', cursor: 'pointer', fontWeight: 700 }}>+</button>
                            </div>
                          </td>
                          <td style={{ padding: '0.65rem 1rem' }}>
                            {prod.isBestSeller && (
                              <span style={{ backgroundColor: 'rgba(245, 197, 66, 0.2)', color: '#F5C542', fontSize: '0.65rem', padding: '0.1rem 0.35rem', borderRadius: '4px', fontWeight: 700 }}>
                                Best Seller
                              </span>
                            )}
                          </td>
                          <td style={{ padding: '0.65rem 1rem', textAlign: 'right' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.35rem' }}>
                              <button onClick={() => setEditingProduct(prod)} className="btn btn-icon btn-outline" style={{ width: '30px', height: '30px', color: '#60A5FA' }}>
                                <Edit2 size={13} />
                              </button>
                              <button onClick={() => setDeleteConfirmId(prod.id)} className="btn btn-icon btn-outline" style={{ width: '30px', height: '30px', color: '#EF4444' }}>
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------- */}
        {/* TAB 3: ORDERS & SALES MANAGER */}
        {/* -------------------------------------------------- */}
        {activeTab === 'orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
            {/* Orders Header Bar */}
            <div className="card-glass" style={{
              backgroundColor: '#071226',
              border: '1px solid rgba(30, 107, 255, 0.35)',
              borderRadius: '16px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              boxSizing: 'border-box',
              width: '100%'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                <div>
                  <h2 style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.3rem)', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                    Sales & Farmgate Orders Desk
                  </h2>
                  <p style={{ fontSize: '0.785rem', color: '#94A3B8', margin: '0.2rem 0 0 0' }}>
                    Track customer dispatches, verify M-Pesa STK transactions, and update delivery milestones.
                  </p>
                </div>

                <button
                  onClick={() => setIsNewSaleOpen(true)}
                  className="btn btn-primary"
                  style={{ padding: '0.55rem 1rem', fontSize: '0.8rem', fontWeight: 700, gap: '0.35rem' }}
                >
                  <Plus size={15} />
                  <span>Log Direct Walk-In Sale</span>
                </button>
              </div>

              {/* Search & Status Filters */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                gap: '0.5rem',
                width: '100%'
              }}>
                <div style={{ position: 'relative', width: '100%' }}>
                  <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                  <input
                    type="text"
                    placeholder="Search Order ID, farmer, phone, county..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    style={{
                      width: '100%',
                      backgroundColor: '#040B1A',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '0.5rem 0.65rem 0.5rem 2rem',
                      color: '#FFFFFF',
                      fontSize: '0.785rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.3rem', overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
                  {['all', 'Pending', 'Processing', 'Dispatched', 'Delivered'].map(status => (
                    <button
                      key={status}
                      onClick={() => setOrderStatusFilter(status)}
                      style={{
                        backgroundColor: orderStatusFilter === status ? '#1E6BFF' : '#040B1A',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: orderStatusFilter === status ? '#FFFFFF' : '#94A3B8',
                        padding: '0.4rem 0.65rem',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        flexShrink: 0
                      }}
                    >
                      {status === 'all' ? `All (${orders.length})` : status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RESPONSIVE ORDERS VIEW: CARDS ON MOBILE, TABLE ON DESKTOP */}
            {/* 1. Mobile Orders Cards */}
            <div className="mobile-orders-cards" style={{ display: 'none', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
              {filteredOrders.map((ord) => {
                const statusColor = 
                  ord.status === 'Delivered' ? '#10B981' :
                  ord.status === 'Dispatched' ? '#60A5FA' :
                  ord.status === 'Processing' ? '#F5C542' : '#EF4444';
                return (
                  <div key={ord.id} style={{
                    backgroundColor: '#071228',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '0.85rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    boxSizing: 'border-box',
                    width: '100%'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 800, color: '#FFFFFF', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                        {ord.id}
                      </span>
                      <select
                        value={ord.status}
                        onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                        style={{
                          backgroundColor: '#040B1A',
                          border: `1px solid ${statusColor}`,
                          color: statusColor,
                          borderRadius: '6px',
                          padding: '0.2rem 0.45rem',
                          fontSize: '0.72rem',
                          fontWeight: 700
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div style={{ fontSize: '0.785rem', color: '#E2E8F0' }}>
                      <strong>{ord.customerName}</strong> • <span style={{ color: '#94A3B8' }}>{ord.county} ({ord.phone})</span>
                    </div>

                    <div style={{ fontSize: '0.72rem', color: '#94A3B8', overflowWrap: 'anywhere' }}>
                      {ord.items?.map(it => `${it.qty}x ${it.name}`).join(', ')}
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      paddingTop: '0.5rem',
                      marginTop: '0.25rem'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.65rem', color: '#64748B' }}>Total ({ord.paymentMethod})</div>
                        <div style={{ fontWeight: 800, color: '#F5C542', fontFamily: 'var(--font-display)', fontSize: '0.95rem' }}>
                          KES {ord.total?.toLocaleString()}
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedOrderDetails(ord)}
                        className="btn btn-sm btn-outline"
                        style={{ borderColor: 'rgba(30, 107, 255, 0.5)', color: '#60A5FA', padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                      >
                        <Eye size={12} style={{ marginRight: '4px' }} />
                        Receipt
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 2. Desktop Orders Table */}
            <div className="desktop-orders-table card-glass" style={{
              backgroundColor: '#071226',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              overflow: 'hidden',
              width: '100%'
            }}>
              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%' }}>
                <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#09152E', color: '#60A5FA', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <th style={{ padding: '0.75rem 1rem' }}>Order Ref</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Farmer & County</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Items</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Total</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Payment</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((ord, idx) => {
                      const statusColor = 
                        ord.status === 'Delivered' ? '#10B981' :
                        ord.status === 'Dispatched' ? '#60A5FA' :
                        ord.status === 'Processing' ? '#F5C542' : '#EF4444';
                      return (
                        <tr
                          key={ord.id}
                          style={{
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                            backgroundColor: idx % 2 === 0 ? 'rgba(5, 11, 24, 0.6)' : 'rgba(7, 18, 38, 0.3)'
                          }}
                        >
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <div style={{ fontWeight: 800, color: '#FFFFFF', fontFamily: 'monospace' }}>{ord.id}</div>
                            <div style={{ fontSize: '0.68rem', color: '#64748B' }}>{ord.date}</div>
                          </td>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{ord.customerName}</div>
                            <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{ord.county}</div>
                          </td>
                          <td style={{ padding: '0.75rem 1rem', maxWidth: '200px' }}>
                            <div style={{ fontSize: '0.75rem', color: '#E2E8F0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {ord.items?.map(it => `${it.qty}x ${it.name}`).join(', ')}
                            </div>
                          </td>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <div style={{ fontWeight: 800, color: '#F5C542', fontFamily: 'var(--font-display)' }}>
                              KES {ord.total?.toLocaleString()}
                            </div>
                          </td>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <span style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 700, display: 'block' }}>{ord.paymentMethod}</span>
                            <span style={{ fontSize: '0.65rem', color: '#64748B', fontFamily: 'monospace' }}>{ord.mpesaRef}</span>
                          </td>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <select
                              value={ord.status}
                              onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                              style={{
                                backgroundColor: '#040B1A',
                                border: `1px solid ${statusColor}`,
                                color: statusColor,
                                borderRadius: '6px',
                                padding: '0.2rem 0.45rem',
                                fontSize: '0.72rem',
                                fontWeight: 700
                              }}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Dispatched">Dispatched</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                            <button
                              onClick={() => setSelectedOrderDetails(ord)}
                              className="btn btn-sm btn-outline"
                              style={{ borderColor: 'rgba(30, 107, 255, 0.4)', color: '#60A5FA', padding: '0.3rem 0.65rem', fontSize: '0.72rem' }}
                            >
                              <Eye size={12} style={{ marginRight: '3px' }} />
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------- */}
        {/* TAB 4: CONSULTATIONS & SERVICE REQUESTS */}
        {/* -------------------------------------------------- */}
        {activeTab === 'services' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
            <div className="card-glass" style={{
              backgroundColor: '#071226',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              borderRadius: '16px',
              padding: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem',
              boxSizing: 'border-box',
              width: '100%'
            }}>
              <div>
                <h2 style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.3rem)', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                  Farmer Clinical & Agronomy Requests
                </h2>
                <p style={{ fontSize: '0.785rem', color: '#94A3B8', margin: '0.2rem 0 0 0' }}>
                  Manage cases for Dr. Peter Karanja (Vet) and Faith Wambui (Agronomist).
                </p>
              </div>

              <button
                onClick={() => setIsNewServiceOpen(true)}
                className="btn btn-primary"
                style={{ padding: '0.55rem 1rem', fontSize: '0.8rem', fontWeight: 700, gap: '0.35rem' }}
              >
                <Plus size={15} />
                <span>Log Service Case</span>
              </button>
            </div>

            {/* RESPONSIVE SERVICES VIEW */}
            {/* 1. Mobile Cards */}
            <div className="mobile-services-cards" style={{ display: 'none', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
              {filteredServices.map((srv) => (
                <div key={srv.id} style={{
                  backgroundColor: '#071228',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  boxSizing: 'border-box',
                  width: '100%'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, color: '#FFFFFF', fontFamily: 'monospace', fontSize: '0.825rem' }}>
                      {srv.id}
                    </span>
                    <select
                      value={srv.status}
                      onChange={(e) => handleUpdateServiceStatus(srv.id, e.target.value)}
                      style={{
                        backgroundColor: '#040B1A',
                        border: '1px solid #10B981',
                        color: '#10B981',
                        borderRadius: '6px',
                        padding: '0.2rem 0.45rem',
                        fontSize: '0.72rem',
                        fontWeight: 700
                      }}
                    >
                      <option value="New Request">New Request</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Prescription Issued">Prescription</option>
                      <option value="Visit Completed">Visit Done</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <div style={{ fontSize: '0.785rem', color: '#E2E8F0' }}>
                    <strong>{srv.farmerName}</strong> • <span style={{ color: '#94A3B8' }}>{srv.county} ({srv.phone})</span>
                  </div>

                  <div style={{ fontSize: '0.72rem', color: '#60A5FA', fontWeight: 600 }}>
                    {srv.serviceType} ({srv.assignedSpecialist})
                  </div>

                  <div style={{ fontSize: '0.72rem', color: '#CBD5E1', overflowWrap: 'anywhere' }}>
                    {srv.issue}
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '0.4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.68rem', color: '#64748B' }}>Service Fee</span>
                    <span style={{ fontWeight: 800, color: '#F5C542', fontFamily: 'var(--font-display)', fontSize: '0.95rem' }}>
                      KES {srv.fee?.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* 2. Desktop Table */}
            <div className="desktop-services-table card-glass" style={{
              backgroundColor: '#071226',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              overflow: 'hidden',
              width: '100%'
            }}>
              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%' }}>
                <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#09152E', color: '#10B981', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <th style={{ padding: '0.75rem 1rem' }}>Booking ID</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Farmer</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Service Type</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Specialist</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Case Notes</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Fee</th>
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredServices.map((srv, idx) => (
                      <tr
                        key={srv.id}
                        style={{
                          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                          backgroundColor: idx % 2 === 0 ? 'rgba(5, 11, 24, 0.6)' : 'rgba(7, 18, 38, 0.3)'
                        }}
                      >
                        <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', fontWeight: 800, color: '#FFFFFF' }}>{srv.id}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{srv.farmerName}</div>
                          <div style={{ fontSize: '0.68rem', color: '#94A3B8' }}>{srv.county}</div>
                        </td>
                        <td style={{ padding: '0.75rem 1rem', color: '#60A5FA', fontWeight: 600 }}>{srv.serviceType}</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#E2E8F0' }}>{srv.assignedSpecialist}</td>
                        <td style={{ padding: '0.75rem 1rem', maxWidth: '200px', color: '#CBD5E1', fontSize: '0.72rem' }}>{srv.issue}</td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 800, color: '#F5C542', fontFamily: 'var(--font-display)' }}>
                          KES {srv.fee?.toLocaleString()}
                        </td>
                        <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                          <select
                            value={srv.status}
                            onChange={(e) => handleUpdateServiceStatus(srv.id, e.target.value)}
                            style={{
                              backgroundColor: '#040B1A',
                              border: '1px solid #10B981',
                              color: '#10B981',
                              borderRadius: '6px',
                              padding: '0.2rem 0.45rem',
                              fontSize: '0.72rem',
                              fontWeight: 700
                            }}
                          >
                            <option value="New Request">New Request</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Prescription Issued">Prescription</option>
                            <option value="Visit Completed">Visit Done</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------- */}
        {/* TAB 5: SETTINGS & COMPLIANCE TOOLS */}
        {/* -------------------------------------------------- */}
        {activeTab === 'settings' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1rem', width: '100%' }}>
            <div className="card-glass" style={{
              backgroundColor: '#071226',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '1.25rem',
              boxSizing: 'border-box'
            }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.85rem' }}>
                Agrovet Operating Licenses
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: '#94A3B8' }}>PCPB Agrovet Lic:</span>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>PCPB/DIS/2026/0922</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: '#94A3B8' }}>KVB Veterinary Lic:</span>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>KVB-2104-NBO-VALID</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: '#94A3B8' }}>M-Pesa Paybill:</span>
                  <span style={{ color: '#F5C542', fontWeight: 700 }}>882991 (Acc: FARMER)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0' }}>
                  <span style={{ color: '#94A3B8' }}>Hotline:</span>
                  <span style={{ color: '#25D366', fontWeight: 700 }}>+254 700 123 456</span>
                </div>
              </div>
            </div>

            <div className="card-glass" style={{
              backgroundColor: '#071226',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '1.25rem',
              boxSizing: 'border-box'
            }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.85rem' }}>
                Maintenance & System Reset
              </h3>
              <p style={{ fontSize: '0.785rem', color: '#94A3B8', marginBottom: '1rem' }}>
                Use these administrative triggers to reset demo catalog or download full JSON backups:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <button
                  onClick={onResetDefaultProducts}
                  className="btn btn-outline"
                  style={{ borderColor: 'rgba(245, 197, 66, 0.4)', color: '#F5C542', justifyContent: 'center', fontSize: '0.8rem' }}
                >
                  <RefreshCw size={14} />
                  <span>Restore Factory Starter Catalog</span>
                </button>
                <button
                  onClick={handleExportData}
                  className="btn btn-outline"
                  style={{ borderColor: 'rgba(30, 107, 255, 0.4)', color: '#60A5FA', justifyContent: 'center', fontSize: '0.8rem' }}
                >
                  <Download size={14} />
                  <span>Download Full Database Export</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ==================================================== */}
      {/* MODAL 1: EDIT PRODUCT DIALOG (RESPONSIVE) */}
      {/* ==================================================== */}
      {editingProduct && (
        <div className="modal-overlay" onClick={() => setEditingProduct(null)} style={{ padding: '0.75rem', boxSizing: 'border-box' }}>
          <div 
            className="card-glass" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#0A1733',
              border: '1.5px solid #1E6BFF',
              borderRadius: '18px',
              width: '100%',
              maxWidth: 'min(640px, 94vw)',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: 'clamp(1rem, 4vw, 1.75rem)',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                Edit Product
              </h3>
              <button onClick={() => setEditingProduct(null)} className="btn btn-icon btn-outline" style={{ width: '30px', height: '30px' }}>
                <X size={15} />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              handleSaveProductEdit(editingProduct);
            }} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label className="form-label">Product Name *</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '0.75rem' }}>
                <div>
                  <label className="form-label">Brand / Manufacturer *</label>
                  <input
                    type="text"
                    value={editingProduct.brand}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    required
                    style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label className="form-label">Category *</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))', gap: '0.75rem' }}>
                <div>
                  <label className="form-label">Selling Price (KES) *</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    required
                    style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label className="form-label">Original Price (KES)</label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice || editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label className="form-label">Stock Units *</label>
                  <input
                    type="number"
                    value={editingProduct.stockCount}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stockCount: Number(e.target.value), isLowStock: Number(e.target.value) <= 10 })}
                    required
                    style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '0.75rem' }}>
                <div>
                  <label className="form-label">Active Ingredient</label>
                  <input
                    type="text"
                    value={editingProduct.activeIngredient || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, activeIngredient: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label className="form-label">PCPB / KVB Code</label>
                  <input
                    type="text"
                    value={editingProduct.complianceCode || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, complianceCode: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Image URL</label>
                <input
                  type="url"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label className="form-label">Product Description</label>
                <textarea
                  rows={2}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={editingProduct.isBestSeller || false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isBestSeller: e.target.checked })}
                  />
                  Best Seller Flag
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={editingProduct.isRestricted || false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isRestricted: e.target.checked })}
                  />
                  Regulated Product
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setEditingProduct(null)} className="btn btn-outline" style={{ fontSize: '0.8rem' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ fontWeight: 700, fontSize: '0.8rem' }}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 2: ADD NEW PRODUCT DIALOG (RESPONSIVE) */}
      {/* ==================================================== */}
      {isAddProductOpen && (
        <div className="modal-overlay" onClick={() => setIsAddProductOpen(false)} style={{ padding: '0.75rem', boxSizing: 'border-box' }}>
          <div 
            className="card-glass" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#0A1733',
              border: '1.5px solid #F5C542',
              borderRadius: '18px',
              width: '100%',
              maxWidth: 'min(640px, 94vw)',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: 'clamp(1rem, 4vw, 1.75rem)',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                Add New Product
              </h3>
              <button onClick={() => setIsAddProductOpen(false)} className="btn btn-icon btn-outline" style={{ width: '30px', height: '30px' }}>
                <X size={15} />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.target);
              handleAddNewProduct({
                name: fd.get('name'),
                brand: fd.get('brand'),
                category: fd.get('category'),
                price: Number(fd.get('price')),
                originalPrice: Number(fd.get('originalPrice') || fd.get('price')),
                stockCount: Number(fd.get('stockCount') || 25),
                activeIngredient: fd.get('activeIngredient'),
                complianceCode: fd.get('complianceCode'),
                description: fd.get('description'),
                image: fd.get('image') || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
                isBestSeller: fd.get('isBestSeller') === 'on',
                isRestricted: fd.get('isRestricted') === 'on',
                packSizes: [{ size: 'Standard Unit', price: Number(fd.get('price')), inStock: true, default: true }]
              });
            }} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label className="form-label">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Twiga Milking Salve 500g"
                  style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '0.75rem' }}>
                <div>
                  <label className="form-label">Brand / Manufacturer *</label>
                  <input
                    type="text"
                    name="brand"
                    required
                    placeholder="e.g. Twiga Chemical Industries"
                    style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label className="form-label">Category *</label>
                  <select
                    name="category"
                    defaultValue="veterinary-drugs"
                    style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))', gap: '0.75rem' }}>
                <div>
                  <label className="form-label">Price (KES) *</label>
                  <input
                    type="number"
                    name="price"
                    required
                    placeholder="e.g. 850"
                    style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label className="form-label">Original Price (KES)</label>
                  <input
                    type="number"
                    name="originalPrice"
                    placeholder="e.g. 950"
                    style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label className="form-label">Initial Stock *</label>
                  <input
                    type="number"
                    name="stockCount"
                    defaultValue={30}
                    required
                    style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Image URL</label>
                <input
                  type="url"
                  name="image"
                  defaultValue="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
                  style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  rows={2}
                  placeholder="Usage instructions and benefits..."
                  style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                  <input type="checkbox" name="isBestSeller" />
                  Best Seller Flag
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                  <input type="checkbox" name="isRestricted" />
                  Regulated Product
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setIsAddProductOpen(false)} className="btn btn-outline" style={{ fontSize: '0.8rem' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ fontWeight: 700, fontSize: '0.8rem' }}>
                  Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 3: ORDER DETAILS & RECEIPT DIALOG (RESPONSIVE) */}
      {/* ==================================================== */}
      {selectedOrderDetails && (
        <div className="modal-overlay" onClick={() => setSelectedOrderDetails(null)} style={{ padding: '0.75rem', boxSizing: 'border-box' }}>
          <div 
            className="card-glass" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#0A1733',
              border: '1.5px solid #1E6BFF',
              borderRadius: '18px',
              width: '100%',
              maxWidth: 'min(580px, 94vw)',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: 'clamp(1rem, 4vw, 1.5rem)',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#60A5FA', textTransform: 'uppercase', fontWeight: 700 }}>
                  Agrovet Ltd Invoice
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: '0.15rem 0 0 0' }}>
                  {selectedOrderDetails.id}
                </h3>
              </div>
              <button onClick={() => setSelectedOrderDetails(null)} className="btn btn-icon btn-outline" style={{ width: '30px', height: '30px' }}>
                <X size={15} />
              </button>
            </div>

            {/* Farmer Details */}
            <div style={{
              backgroundColor: '#050E22',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px',
              padding: '0.85rem',
              marginBottom: '1rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
              gap: '0.5rem',
              fontSize: '0.78rem'
            }}>
              <div>
                <span style={{ color: '#64748B', display: 'block' }}>Farmer:</span>
                <strong style={{ color: '#FFFFFF' }}>{selectedOrderDetails.customerName}</strong>
              </div>
              <div>
                <span style={{ color: '#64748B', display: 'block' }}>Phone:</span>
                <strong style={{ color: '#F5C542' }}>{selectedOrderDetails.phone}</strong>
              </div>
              <div>
                <span style={{ color: '#64748B', display: 'block' }}>County:</span>
                <span style={{ color: '#E2E8F0' }}>{selectedOrderDetails.county}</span>
              </div>
              <div>
                <span style={{ color: '#64748B', display: 'block' }}>M-Pesa Ref:</span>
                <span style={{ color: '#10B981', fontFamily: 'monospace', fontWeight: 700 }}>{selectedOrderDetails.mpesaRef}</span>
              </div>
            </div>

            {/* Order Items */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#60A5FA', marginBottom: '0.4rem' }}>
                Purchased Inputs
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {selectedOrderDetails.items?.map((it, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.55rem 0.75rem',
                    backgroundColor: '#040B1A',
                    borderRadius: '6px',
                    fontSize: '0.78rem'
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{it.name}</div>
                      <div style={{ fontSize: '0.68rem', color: '#64748B' }}>Qty: {it.qty}</div>
                    </div>
                    <div style={{ fontWeight: 800, color: '#F5C542' }}>
                      KES {((it.price || 0) * (it.qty || 1)).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Total Paid:</span>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#F5C542', fontFamily: 'var(--font-display)' }}>
                KES {selectedOrderDetails.total?.toLocaleString()}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button onClick={() => window.print()} className="btn btn-outline" style={{ flex: '1 1 auto', justifyContent: 'center', fontSize: '0.8rem' }}>
                <Printer size={14} />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={() => {
                  const text = encodeURIComponent(
                    `Hello ${selectedOrderDetails.customerName},\n` +
                    `Your Agrovet ltd order (${selectedOrderDetails.id}) is ${selectedOrderDetails.status.toUpperCase()}.\n` +
                    `M-Pesa Ref: ${selectedOrderDetails.mpesaRef}.\n` +
                    `Thank you for trusting genuine PCPB certified farm inputs!`
                  );
                  window.open(`https://wa.me/${selectedOrderDetails.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
                }}
                className="btn btn-primary"
                style={{ flex: '1 1 auto', justifyContent: 'center', fontSize: '0.8rem' }}
              >
                <MessageCircle size={14} />
                <span>WhatsApp Notice</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 4: DELETE CONFIRMATION */}
      {/* ==================================================== */}
      {deleteConfirmId && (
        <div className="modal-overlay" onClick={() => setDeleteConfirmId(null)} style={{ padding: '0.75rem', boxSizing: 'border-box' }}>
          <div 
            className="card-glass" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#0A1733',
              border: '1.5px solid #EF4444',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '380px',
              padding: '1.25rem',
              textAlign: 'center',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem auto' }}>
              <AlertTriangle size={20} color="#EF4444" />
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.35rem' }}>
              Confirm Product Deletion?
            </h4>
            <p style={{ fontSize: '0.785rem', color: '#94A3B8', marginBottom: '1rem' }}>
              This item will be removed immediately from the live shop catalog.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              <button onClick={() => setDeleteConfirmId(null)} className="btn btn-outline" style={{ fontSize: '0.8rem' }}>
                Cancel
              </button>
              <button onClick={() => handleDeleteProduct(deleteConfirmId)} className="btn btn-primary" style={{ backgroundColor: '#EF4444', borderColor: '#EF4444', color: '#FFFFFF', fontSize: '0.8rem' }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 5: LOG DIRECT WALK-IN SALE */}
      {/* ==================================================== */}
      {isNewSaleOpen && (
        <div className="modal-overlay" onClick={() => setIsNewSaleOpen(false)} style={{ padding: '0.75rem', boxSizing: 'border-box' }}>
          <div 
            className="card-glass" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#0A1733',
              border: '1.5px solid #F5C542',
              borderRadius: '18px',
              width: '100%',
              maxWidth: 'min(520px, 94vw)',
              padding: 'clamp(1rem, 4vw, 1.5rem)',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                Log Direct Walk-In Sale
              </h3>
              <button onClick={() => setIsNewSaleOpen(false)} className="btn btn-icon btn-outline" style={{ width: '30px', height: '30px' }}>
                <X size={15} />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.target);
              const selectedProd = products.find(p => p.id === fd.get('productId')) || products[0];
              const qty = Number(fd.get('qty') || 1);
              const orderId = `AGV-POS-${Math.floor(1000 + Math.random() * 9000)}`;
              const mpesaRef = `POS${Math.floor(10000 + Math.random() * 89999)}`;
              const totalAmount = (selectedProd.price || 0) * qty;

              const newSale = {
                id: orderId,
                date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
                status: 'Delivered',
                customerName: fd.get('farmerName'),
                phone: fd.get('phone'),
                county: fd.get('county') || 'Nairobi Counter',
                town: 'Agrovet Counter',
                paymentMethod: fd.get('paymentMethod'),
                mpesaRef: mpesaRef,
                items: [{
                  id: selectedProd.id,
                  name: selectedProd.name,
                  brand: selectedProd.brand,
                  pack: 'Counter Pickup',
                  qty: qty,
                  price: selectedProd.price,
                  total: totalAmount
                }],
                subtotal: totalAmount,
                deliveryFee: 0,
                total: totalAmount
              };

              setOrders(prev => [newSale, ...prev]);
              handleQuickStockAdjust(selectedProd.id, -qty);
              setIsNewSaleOpen(false);
              showToast(`Sale recorded! Ref: ${orderId}`);
            }} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label className="form-label">Customer / Farmer Name *</label>
                <input
                  type="text"
                  name="farmerName"
                  required
                  placeholder="e.g. John Kinyua"
                  style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: '0.75rem' }}>
                <div>
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+254 7XX XXX XXX"
                    style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label className="form-label">Payment Method *</label>
                  <select
                    name="paymentMethod"
                    style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                  >
                    <option value="M-Pesa Till / Paybill">M-Pesa Till / Paybill</option>
                    <option value="Cash Counter">Cash Counter</option>
                    <option value="Bank / SACCO Transfer">Bank / SACCO Transfer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">Select Product *</label>
                <select
                  name="productId"
                  style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} - KES {p.price.toLocaleString()} (Stock: {p.stockCount ?? 20})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Quantity *</label>
                <input
                  type="number"
                  name="qty"
                  min={1}
                  defaultValue={1}
                  required
                  style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setIsNewSaleOpen(false)} className="btn btn-outline" style={{ fontSize: '0.8rem' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ fontWeight: 700, fontSize: '0.8rem' }}>
                  Confirm Sale
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 6: LOG NEW SERVICE BOOKING */}
      {/* ==================================================== */}
      {isNewServiceOpen && (
        <div className="modal-overlay" onClick={() => setIsNewServiceOpen(false)} style={{ padding: '0.75rem', boxSizing: 'border-box' }}>
          <div 
            className="card-glass" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#0A1733',
              border: '1.5px solid #10B981',
              borderRadius: '18px',
              width: '100%',
              maxWidth: 'min(520px, 94vw)',
              padding: 'clamp(1rem, 4vw, 1.5rem)',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                Log Clinical / Agronomy Case
              </h3>
              <button onClick={() => setIsNewServiceOpen(false)} className="btn btn-icon btn-outline" style={{ width: '30px', height: '30px' }}>
                <X size={15} />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.target);
              const newBooking = {
                id: `SRV-MAN-${Math.floor(100 + Math.random() * 899)}`,
                date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                farmerName: fd.get('farmerName'),
                phone: fd.get('phone'),
                county: fd.get('county'),
                serviceType: fd.get('serviceType'),
                assignedSpecialist: fd.get('assignedSpecialist'),
                issue: fd.get('issue'),
                fee: Number(fd.get('fee') || 3000),
                status: 'New Request',
                paid: true
              };
              setServices(prev => [newBooking, ...prev]);
              setIsNewServiceOpen(false);
              showToast('Service case recorded!');
            }} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label className="form-label">Farmer Name *</label>
                <input
                  type="text"
                  name="farmerName"
                  required
                  placeholder="e.g. Mary Wanjiku"
                  style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: '0.75rem' }}>
                <div>
                  <label className="form-label">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+254 7XX XXX XXX"
                    style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label className="form-label">County *</label>
                  <input
                    type="text"
                    name="county"
                    defaultValue="Kiambu County"
                    required
                    style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: '0.75rem' }}>
                <div>
                  <label className="form-label">Service Type *</label>
                  <select
                    name="serviceType"
                    style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                  >
                    <option value="On-Farm Clinical Vet Visit">Clinical Vet Visit</option>
                    <option value="24/7 Digital WhatsApp Telehealth">WhatsApp Telehealth</option>
                    <option value="Agronomy Soil Testing & Fertility Audit">Soil Testing Audit</option>
                    <option value="Herd Vaccination & AI Protocol">Vaccination Drive</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Specialist</label>
                  <select
                    name="assignedSpecialist"
                    style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                  >
                    <option value="Dr. Peter Karanja (KVB Vet)">Dr. Peter (Vet)</option>
                    <option value="Faith Wambui (PCPB Agronomist)">Faith (Agronomist)</option>
                    <option value="Mobile Veterinary Unit">Mobile Vet Unit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">Fee (KES) *</label>
                <input
                  type="number"
                  name="fee"
                  defaultValue={3000}
                  required
                  style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label className="form-label">Case Notes</label>
                <textarea
                  name="issue"
                  rows={2}
                  placeholder="Describe farm issue, animal count, or crop block..."
                  style={{ width: '100%', padding: '0.6rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setIsNewServiceOpen(false)} className="btn btn-outline" style={{ fontSize: '0.8rem' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ fontWeight: 700, fontSize: '0.8rem' }}>
                  Log Case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Toast Notification */}
      {adminToast && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#0A1733',
          border: '1.5px solid #F5C542',
          color: '#FFFFFF',
          borderRadius: '10px',
          padding: '0.75rem 1.25rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(245, 197, 66, 0.4)',
          zIndex: 1100,
          fontWeight: 700,
          fontSize: '0.8rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ color: '#10B981' }}>✓</span>
          <span>{adminToast}</span>
        </div>
      )}

      {/* Mobile Display Responsive CSS Rules */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-inventory-table { display: none !important; }
          .mobile-inventory-cards { display: flex !important; }
          
          .desktop-orders-table { display: none !important; }
          .mobile-orders-cards { display: flex !important; }
          
          .desktop-services-table { display: none !important; }
          .mobile-services-cards { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
