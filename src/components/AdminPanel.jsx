import React, { useState, useMemo } from 'react';
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
  MapPin
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
  onResetDefaultProducts
}) {
  // Navigation Tabs: 'analytics' | 'inventory' | 'orders' | 'services' | 'settings'
  const [activeTab, setActiveTab] = useState('analytics');

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
      color: '#FFFFFF',
      fontFamily: 'var(--font-sans)',
      paddingBottom: '5rem',
      position: 'relative'
    }}>
      {/* ==================================================== */}
      {/* ADMIN HEADER BANNER */}
      {/* ==================================================== */}
      <div style={{
        backgroundColor: '#061129',
        borderBottom: '1.5px solid rgba(30, 107, 255, 0.35)',
        padding: '1.25rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 90,
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7)'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          {/* Brand & Mode Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #1E6BFF 0%, #0A1E46 100%)',
              border: '1.5px solid #F5C542',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(245, 197, 66, 0.4)'
            }}>
              <ShieldCheck size={26} color="#F5C542" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <h1 style={{
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  margin: 0,
                  letterSpacing: '-0.02em'
                }}>
                  Agrovet Ltd Operations Command Center
                </h1>
                <span style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #10B981',
                  color: '#10B981',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.55rem',
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
                  Live System Active
                </span>
              </div>
              <div style={{ fontSize: '0.785rem', color: '#94A3B8', marginTop: '0.2rem' }}>
                KVB Reg. #2104 • PCPB Lic. #AGV-2026 • Real-Time Catalog & Sales Synchronization
              </div>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleExportData}
              className="btn btn-sm btn-outline"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.18)',
                color: '#CBD5E1',
                gap: '0.4rem',
                fontSize: '0.8rem'
              }}
              title="Download backup JSON"
            >
              <Download size={14} />
              <span>Export JSON</span>
            </button>

            <button
              onClick={onBackToShop}
              className="btn btn-sm btn-primary"
              style={{
                padding: '0.6rem 1.25rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 15px rgba(245, 197, 66, 0.3)'
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Storefront</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Row */}
        <div className="container" style={{ marginTop: '1.25rem' }}>
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.25rem',
            scrollbarWidth: 'none'
          }}>
            {[
              { id: 'analytics', label: '📊 Analytics & Inflows', desc: 'Category & Service Charts' },
              { id: 'inventory', label: `📦 Shop Inventory (${products.length})`, desc: 'Edit Products & Stock' },
              { id: 'orders', label: `🛒 Orders & Sales (${orders.length})`, desc: 'Manage Inflows & Delivery' },
              { id: 'services', label: `🩺 Consultations & Bookings (${services.length})`, desc: 'Vet & Agronomy Requests' },
              { id: 'settings', label: '⚙️ Settings & Tools', desc: 'Rates, PCPB & Backup' }
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    backgroundColor: isActive ? '#1E6BFF' : 'rgba(10, 23, 51, 0.7)',
                    border: isActive ? '1.5px solid #F5C542' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: isActive ? '#FFFFFF' : '#94A3B8',
                    padding: '0.65rem 1.1rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    boxShadow: isActive ? '0 6px 20px rgba(30, 107, 255, 0.4)' : 'none'
                  }}
                >
                  <span style={{ color: isActive ? '#FFFFFF' : '#E2E8F0' }}>{tab.label}</span>
                  <span style={{ fontSize: '0.68rem', color: isActive ? '#F5C542' : '#64748B', fontWeight: 500 }}>
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
      <div className="container" style={{ marginTop: '2rem' }}>

        {/* -------------------------------------------------- */}
        {/* TAB 1: CHARTS & ANALYTICS (INFLOWS & CATEGORIES) */}
        {/* -------------------------------------------------- */}
        {activeTab === 'analytics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Top Row: Executive Metric Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem'
            }}>
              {/* Card 1: Gross Inflow */}
              <div className="card-glass" style={{
                backgroundColor: '#0A1733',
                border: '1.5px solid rgba(245, 197, 66, 0.35)',
                borderRadius: '16px',
                padding: '1.35rem',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>
                    Total Gross Inflow (MTD)
                  </span>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(245, 197, 66, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <DollarSign size={20} color="#F5C542" />
                  </div>
                </div>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.5rem', fontFamily: 'var(--font-display)' }}>
                  KES {combinedGrossInflow.toLocaleString()}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.785rem' }}>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>+22.4%</span>
                  <span style={{ color: '#64748B' }}>vs previous 30 days</span>
                </div>
              </div>

              {/* Card 2: Shop Product Sales */}
              <div className="card-glass" style={{
                backgroundColor: '#0A1733',
                border: '1.5px solid rgba(30, 107, 255, 0.35)',
                borderRadius: '16px',
                padding: '1.35rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>
                    Shop Products Revenue
                  </span>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(30, 107, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <ShoppingBag size={20} color="#60A5FA" />
                  </div>
                </div>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#60A5FA', marginTop: '0.5rem', fontFamily: 'var(--font-display)' }}>
                  KES {totalShopSales.toLocaleString()}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.785rem' }}>
                  <span style={{ color: '#F5C542', fontWeight: 700 }}>
                    {((totalShopSales / combinedGrossInflow) * 100).toFixed(1)}%
                  </span>
                  <span style={{ color: '#64748B' }}>of all incoming business</span>
                </div>
              </div>

              {/* Card 3: Professional Services Revenue */}
              <div className="card-glass" style={{
                backgroundColor: '#0A1733',
                border: '1.5px solid rgba(16, 185, 129, 0.35)',
                borderRadius: '16px',
                padding: '1.35rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>
                    Services & Consultations
                  </span>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Stethoscope size={20} color="#10B981" />
                  </div>
                </div>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#10B981', marginTop: '0.5rem', fontFamily: 'var(--font-display)' }}>
                  KES {totalServicesInflow.toLocaleString()}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.785rem' }}>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>
                    {((totalServicesInflow / combinedGrossInflow) * 100).toFixed(1)}%
                  </span>
                  <span style={{ color: '#64748B' }}>veterinary & agronomy fees</span>
                </div>
              </div>

              {/* Card 4: Orders & Low Stock Alert */}
              <div className="card-glass" style={{
                backgroundColor: '#0A1733',
                border: lowStockCount > 0 ? '1.5px solid rgba(239, 68, 68, 0.45)' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '1.35rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>
                    Orders & Inventory Health
                  </span>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: lowStockCount > 0 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(30, 107, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Package size={20} color={lowStockCount > 0 ? '#EF4444' : '#60A5FA'} />
                  </div>
                </div>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.5rem', fontFamily: 'var(--font-display)' }}>
                  {orders.length} <span style={{ fontSize: '0.9rem', color: '#94A3B8', fontWeight: 500 }}>Active Orders</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.785rem' }}>
                  {lowStockCount > 0 ? (
                    <span style={{ color: '#EF4444', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <AlertTriangle size={13} /> {lowStockCount} Products Need Restock
                    </span>
                  ) : (
                    <span style={{ color: '#10B981', fontWeight: 600 }}>All Catalog SKUs Healthy</span>
                  )}
                </div>
              </div>
            </div>

            {/* Sub-navigation for Analytics views */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: '0.75rem',
              flexWrap: 'wrap'
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
                    padding: '0.45rem 0.9rem',
                    borderRadius: '8px',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    cursor: 'pointer'
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
                borderRadius: '20px',
                padding: '1.75rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.35rem' }}>🩺</span>
                      <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                        Revenue Inflows By Service
                      </h2>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#94A3B8', margin: '0.35rem 0 0 0' }}>
                      Detailed audit of all income generated across clinical vet visits, tele-triage, agronomy scouting, wholesale, and express logistics.
                    </p>
                  </div>
                  <div style={{
                    backgroundColor: 'rgba(30, 107, 255, 0.15)',
                    border: '1px solid rgba(30, 107, 255, 0.4)',
                    padding: '0.5rem 1rem',
                    borderRadius: '10px',
                    textAlign: 'right'
                  }}>
                    <span style={{ fontSize: '0.72rem', color: '#60A5FA', textTransform: 'uppercase', display: 'block', fontWeight: 700 }}>
                      Total Service Inflow
                    </span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F5C542', fontFamily: 'var(--font-display)' }}>
                      KES {totalServicesInflow.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* SVG Visual Comparison Chart: Money Coming In From Each Service */}
                <div style={{
                  backgroundColor: '#040B1A',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  padding: '1.25rem',
                  marginBottom: '1.75rem'
                }}>
                  <div style={{ fontSize: '0.8rem', color: '#CBD5E1', fontWeight: 700, marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Comparative Inflow Volume (KES)</span>
                    <span style={{ color: '#60A5FA', fontSize: '0.75rem' }}>Hover or tap bars for details</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {SERVICE_INFLOW_DATA.map((srv, idx) => {
                      const maxVal = Math.max(...SERVICE_INFLOW_DATA.map(s => s.inflowAmount));
                      const barPercent = (srv.inflowAmount / maxVal) * 100;
                      return (
                        <div key={srv.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.825rem' }}>
                            <span style={{ fontWeight: 600, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: srv.accentColor }} />
                              {srv.title}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{srv.bookingsCount} bookings</span>
                              <span style={{ fontWeight: 800, color: '#F5C542', fontFamily: 'var(--font-display)' }}>
                                KES {srv.inflowAmount.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          {/* Animated Progress Bar */}
                          <div style={{
                            width: '100%',
                            height: '14px',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '9999px',
                            overflow: 'hidden',
                            position: 'relative'
                          }}>
                            <div style={{
                              width: `${barPercent}%`,
                              height: '100%',
                              background: `linear-gradient(90deg, ${srv.accentColor} 0%, #F5C542 100%)`,
                              borderRadius: '9999px',
                              transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                              boxShadow: `0 0 10px ${srv.accentColor}55`
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
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.25rem'
                }}>
                  {SERVICE_INFLOW_DATA.map(service => (
                    <div key={service.id} style={{
                      backgroundColor: '#09152E',
                      border: `1px solid ${service.accentColor}44`,
                      borderRadius: '14px',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'transform 0.2s ease, border-color 0.2s ease'
                    }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                          <span style={{
                            backgroundColor: `${service.accentColor}22`,
                            color: service.accentColor,
                            border: `1px solid ${service.accentColor}55`,
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '0.2rem 0.6rem',
                            borderRadius: '9999px'
                          }}>
                            {service.growthRate} MoM Growth
                          </span>
                          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                            Avg: KES {service.avgTicket.toLocaleString()}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '0.985rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.35rem', lineHeight: 1.3 }}>
                          {service.title}
                        </h4>
                        <p style={{ fontSize: '0.785rem', color: '#94A3B8', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                          {service.description}
                        </p>
                      </div>

                      <div style={{
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        paddingTop: '0.75rem',
                        marginTop: '0.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <div style={{ fontSize: '0.68rem', color: '#64748B', textTransform: 'uppercase' }}>Inflow Share</div>
                          <div style={{ fontSize: '0.85rem', color: '#60A5FA', fontWeight: 600 }}>
                            {((service.inflowAmount / totalServicesInflow) * 100).toFixed(1)}% of Services
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.68rem', color: '#64748B', textTransform: 'uppercase' }}>Total Inflow</div>
                          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#F5C542', fontFamily: 'var(--font-display)' }}>
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
                borderRadius: '20px',
                padding: '1.75rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.35rem' }}>📊</span>
                      <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                        Category Inflows & Inventory Analysis
                      </h2>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#94A3B8', margin: '0.35rem 0 0 0' }}>
                      In-depth breakdown across Veterinary Drugs, Animal Feeds, Crop Protection, Fertilizers, Seeds, and Farm Tools.
                    </p>
                  </div>
                  <div style={{
                    backgroundColor: 'rgba(245, 197, 66, 0.1)',
                    border: '1px solid rgba(245, 197, 66, 0.35)',
                    padding: '0.5rem 1rem',
                    borderRadius: '10px',
                    textAlign: 'right'
                  }}>
                    <span style={{ fontSize: '0.72rem', color: '#F5C542', textTransform: 'uppercase', display: 'block', fontWeight: 700 }}>
                      Products Gross Revenue
                    </span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-display)' }}>
                      KES {CATEGORY_PERFORMANCE_DATA.reduce((a, c) => a + c.grossRevenue, 0).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* SVG Visual Horizontal Bars + Donut Breakdown */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '1.75rem'
                }}>
                  {/* Left: Interactive Category Revenue Distribution Bars */}
                  <div style={{
                    backgroundColor: '#040B1A',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '14px',
                    padding: '1.25rem'
                  }}>
                    <div style={{ fontSize: '0.85rem', color: '#FFFFFF', fontWeight: 700, marginBottom: '1rem' }}>
                      Revenue Generated by Category
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {CATEGORY_PERFORMANCE_DATA.map(cat => {
                        const totalCatRev = CATEGORY_PERFORMANCE_DATA.reduce((a, c) => a + c.grossRevenue, 0);
                        const share = ((cat.grossRevenue / totalCatRev) * 100).toFixed(1);
                        return (
                          <div key={cat.id}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                              <span style={{ color: '#E2E8F0', fontWeight: 600 }}>{cat.name}</span>
                              <span style={{ color: '#F5C542', fontWeight: 700 }}>
                                KES {cat.grossRevenue.toLocaleString()} ({share}%)
                              </span>
                            </div>
                            <div style={{
                              width: '100%',
                              height: '10px',
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
                    borderRadius: '14px',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{ fontSize: '0.85rem', color: '#FFFFFF', fontWeight: 700, marginBottom: '0.75rem', alignSelf: 'flex-start' }}>
                      Category Market Share Distribution
                    </div>
                    
                    <div style={{ position: 'relative', width: '180px', height: '180px' }}>
                      <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                        {(() => {
                          const totalCatRev = CATEGORY_PERFORMANCE_DATA.reduce((a, c) => a + c.grossRevenue, 0);
                          let accumulatedPercent = 0;
                          return CATEGORY_PERFORMANCE_DATA.map((cat, i) => {
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
                        <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#F5C542' }}>6 Categories</span>
                      </div>
                    </div>

                    {/* Donut Legend */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '0.5rem',
                      width: '100%',
                      marginTop: '1rem',
                      fontSize: '0.72rem'
                    }}>
                      {CATEGORY_PERFORMANCE_DATA.map(cat => (
                        <div key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: cat.accent }} />
                          <span style={{ color: '#94A3B8', truncate: true }}>{cat.name.split(' ')[0]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Comprehensive Category Table */}
                <div style={{
                  overflowX: 'auto',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px'
                }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    textAlign: 'left',
                    fontSize: '0.825rem'
                  }}>
                    <thead>
                      <tr style={{ backgroundColor: '#0A1733', color: '#60A5FA', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                        <th style={{ padding: '0.85rem 1rem' }}>Category</th>
                        <th style={{ padding: '0.85rem 1rem' }}>Units Sold</th>
                        <th style={{ padding: '0.85rem 1rem' }}>Average Price</th>
                        <th style={{ padding: '0.85rem 1rem' }}>Estimated Margin</th>
                        <th style={{ padding: '0.85rem 1rem' }}>Top Product</th>
                        <th style={{ padding: '0.85rem 1rem' }}>Stock Health</th>
                        <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Gross Inflow</th>
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
                          <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#FFFFFF' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: cat.accent }} />
                              {cat.name}
                            </div>
                          </td>
                          <td style={{ padding: '0.85rem 1rem', color: '#E2E8F0' }}>{cat.unitsSold} units</td>
                          <td style={{ padding: '0.85rem 1rem', color: '#94A3B8' }}>KES {cat.avgItemPrice.toLocaleString()}</td>
                          <td style={{ padding: '0.85rem 1rem', color: '#10B981', fontWeight: 600 }}>{cat.marginPercent}%</td>
                          <td style={{ padding: '0.85rem 1rem', color: '#CBD5E1', fontSize: '0.785rem' }}>{cat.topProduct}</td>
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <span style={{
                              backgroundColor: cat.stockHealth.includes('Alert') ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.12)',
                              color: cat.stockHealth.includes('Alert') ? '#EF4444' : '#10B981',
                              padding: '0.15rem 0.5rem',
                              borderRadius: '6px',
                              fontSize: '0.72rem',
                              fontWeight: 600
                            }}>
                              {cat.stockHealth}
                            </span>
                          </td>
                          <td style={{ padding: '0.85rem 1rem', textAlign: 'right', fontWeight: 800, color: '#F5C542', fontFamily: 'var(--font-display)' }}>
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
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.5rem'
              }}>
                {/* Monthly Revenue Trend Line/Area Chart */}
                <div className="card-glass" style={{
                  backgroundColor: '#071226',
                  border: '1px solid rgba(30, 107, 255, 0.3)',
                  borderRadius: '20px',
                  padding: '1.5rem'
                }}>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                      6-Month Revenue Inflow Trajectory
                    </h3>
                    <p style={{ fontSize: '0.785rem', color: '#94A3B8', marginTop: '0.25rem' }}>
                      Comparison of Shop Product Sales vs. Professional Services fees over May - Oct 2026.
                    </p>
                  </div>

                  {/* SVG Area Curve */}
                  <div style={{
                    backgroundColor: '#040B1A',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '1.25rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '140px', gap: '0.75rem', paddingTop: '1rem' }}>
                      {MONTHLY_REVENUE_TREND.map((item, idx) => {
                        const maxTrend = 2200000;
                        const prodHeight = (item.productSales / maxTrend) * 120;
                        const srvHeight = (item.servicesInflow / maxTrend) * 120;
                        return (
                          <div key={item.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                            <div style={{ width: '100%', maxWidth: '28px', display: 'flex', flexDirection: 'column-reverse', gap: '2px', alignItems: 'center' }}>
                              {/* Product Sales Bar */}
                              <div 
                                title={`Product Sales: KES ${item.productSales.toLocaleString()}`}
                                style={{
                                  width: '100%',
                                  height: `${prodHeight}px`,
                                  backgroundColor: '#1E6BFF',
                                  borderRadius: '3px 3px 0 0'
                                }} 
                              />
                              {/* Services Inflow Bar */}
                              <div 
                                title={`Services Inflow: KES ${item.servicesInflow.toLocaleString()}`}
                                style={{
                                  width: '100%',
                                  height: `${srvHeight}px`,
                                  backgroundColor: '#F5C542',
                                  borderRadius: '3px 3px 0 0'
                                }} 
                              />
                            </div>
                            <span style={{ fontSize: '0.65rem', color: '#94A3B8', marginTop: '0.5rem', whiteSpace: 'nowrap' }}>
                              {item.month.split(' ')[0]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    {/* Legend */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem', fontSize: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span style={{ width: '10px', height: '10px', backgroundColor: '#1E6BFF', borderRadius: '2px' }} />
                        <span style={{ color: '#CBD5E1' }}>Shop Products</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span style={{ width: '10px', height: '10px', backgroundColor: '#F5C542', borderRadius: '2px' }} />
                        <span style={{ color: '#CBD5E1' }}>Services & Consultations</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* County Inflow Matrix */}
                <div className="card-glass" style={{
                  backgroundColor: '#071226',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '20px',
                  padding: '1.5rem'
                }}>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                      Top County Revenue Distribution
                    </h3>
                    <p style={{ fontSize: '0.785rem', color: '#94A3B8', marginTop: '0.25rem' }}>
                      Inflows concentrated across Kenya's high-productivity agricultural breadbaskets.
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {COUNTY_REVENUE_DATA.map((c, i) => (
                      <div key={c.county} style={{
                        backgroundColor: '#0A1733',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <span style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: i === 0 ? '#F5C542' : 'rgba(255, 255, 255, 0.1)',
                            color: i === 0 ? '#050B18' : '#FFFFFF',
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {i + 1}
                          </span>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.825rem', color: '#FFFFFF' }}>{c.county}</div>
                            <div style={{ fontSize: '0.7rem', color: '#64748B' }}>{c.orders} Dispatches</div>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: 800, color: '#F5C542', fontSize: '0.9rem', fontFamily: 'var(--font-display)' }}>
                            KES {c.revenue.toLocaleString()}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 600 }}>{c.share} Share</div>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Inventory Controls Bar */}
            <div className="card-glass" style={{
              backgroundColor: '#071226',
              border: '1px solid rgba(30, 107, 255, 0.35)',
              borderRadius: '16px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                    Shop Catalog & Inventory Master
                  </h2>
                  <p style={{ fontSize: '0.825rem', color: '#94A3B8', margin: '0.25rem 0 0 0' }}>
                    Full management control: add products, modify prices, update stock, edit active ingredients and PCPB codes.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setIsAddProductOpen(true)}
                    className="btn btn-primary"
                    style={{
                      padding: '0.65rem 1.25rem',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      gap: '0.45rem'
                    }}
                  >
                    <Plus size={16} />
                    <span>Add New Product</span>
                  </button>
                  <button
                    onClick={onResetDefaultProducts}
                    className="btn btn-outline"
                    style={{
                      borderColor: 'rgba(255, 255, 255, 0.15)',
                      color: '#94A3B8',
                      fontSize: '0.8rem',
                      gap: '0.4rem'
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
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '0.75rem'
              }}>
                {/* Search Input */}
                <div style={{ position: 'relative' }}>
                  <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                  <input
                    type="text"
                    placeholder="Search by name, brand, ingredient..."
                    value={invSearch}
                    onChange={(e) => setInvSearch(e.target.value)}
                    style={{
                      width: '100%',
                      backgroundColor: '#040B1A',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '0.55rem 0.75rem 0.55rem 2.25rem',
                      color: '#FFFFFF',
                      fontSize: '0.825rem'
                    }}
                  />
                </div>

                {/* Category Dropdown */}
                <select
                  value={invCategory}
                  onChange={(e) => setInvCategory(e.target.value)}
                  style={{
                    backgroundColor: '#040B1A',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    padding: '0.55rem 0.75rem',
                    color: '#FFFFFF',
                    fontSize: '0.825rem'
                  }}
                >
                  <option value="all">All Categories ({products.length})</option>
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>

                {/* Stock Health Filter */}
                <select
                  value={invStockFilter}
                  onChange={(e) => setInvStockFilter(e.target.value)}
                  style={{
                    backgroundColor: '#040B1A',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    padding: '0.55rem 0.75rem',
                    color: '#FFFFFF',
                    fontSize: '0.825rem'
                  }}
                >
                  <option value="all">All Stock Statuses</option>
                  <option value="low-stock">⚠️ Low Stock Alerts (≤ 10)</option>
                  <option value="out-of-stock">🚫 Out of Stock (0)</option>
                </select>
              </div>
            </div>

            {/* Products Table */}
            <div className="card-glass" style={{
              backgroundColor: '#071226',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '0',
              overflow: 'hidden'
            }}>
              <div style={{
                padding: '0.85rem 1.25rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#050D20'
              }}>
                <span style={{ fontSize: '0.825rem', color: '#94A3B8' }}>
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

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.825rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#09152E', color: '#60A5FA', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <th style={{ padding: '0.85rem 1rem', width: '60px' }}>Image</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Product Details</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Category</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Price (KES)</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Inventory Stock</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Status Badges</th>
                      <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
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
                          {/* Thumbnail */}
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <img
                              src={prod.image}
                              alt={prod.name}
                              style={{
                                width: '44px',
                                height: '44px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                              }}
                            />
                          </td>

                          {/* Details */}
                          <td style={{ padding: '0.75rem 1rem', maxWidth: '280px' }}>
                            <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.85rem' }}>
                              {prod.name}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: '#60A5FA', marginTop: '0.15rem' }}>
                              {prod.brand} • <span style={{ color: '#94A3B8' }}>{prod.activeIngredient || 'Standard Formulated'}</span>
                            </div>
                          </td>

                          {/* Category */}
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <span style={{
                              backgroundColor: 'rgba(30, 107, 255, 0.15)',
                              color: '#60A5FA',
                              padding: '0.2rem 0.5rem',
                              borderRadius: '6px',
                              fontSize: '0.72rem',
                              fontWeight: 600
                            }}>
                              {prod.category}
                            </span>
                          </td>

                          {/* Price */}
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <div style={{ fontWeight: 800, color: '#F5C542', fontFamily: 'var(--font-display)' }}>
                              KES {prod.price.toLocaleString()}
                            </div>
                            {prod.originalPrice > prod.price && (
                              <div style={{ fontSize: '0.7rem', color: '#64748B', textDecoration: 'line-through' }}>
                                KES {prod.originalPrice.toLocaleString()}
                              </div>
                            )}
                          </td>

                          {/* Stock Counter with inline quick adjust */}
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                              <button
                                onClick={() => handleQuickStockAdjust(prod.id, -1)}
                                style={{
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '6px',
                                  border: '1px solid rgba(255, 255, 255, 0.15)',
                                  backgroundColor: '#040B1A',
                                  color: '#FFFFFF',
                                  cursor: 'pointer',
                                  fontWeight: 700
                                }}
                                title="Decrease stock by 1"
                              >
                                -
                              </button>
                              <span style={{
                                minWidth: '32px',
                                textAlign: 'center',
                                fontWeight: 800,
                                color: isLow ? '#EF4444' : '#10B981',
                                fontSize: '0.85rem'
                              }}>
                                {prod.stockCount ?? 20}
                              </span>
                              <button
                                onClick={() => handleQuickStockAdjust(prod.id, 5)}
                                style={{
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '6px',
                                  border: '1px solid rgba(255, 255, 255, 0.15)',
                                  backgroundColor: '#040B1A',
                                  color: '#FFFFFF',
                                  cursor: 'pointer',
                                  fontWeight: 700
                                }}
                                title="Quick restock +5"
                              >
                                +
                              </button>
                            </div>
                            {isLow && (
                              <div style={{ fontSize: '0.68rem', color: '#EF4444', marginTop: '0.2rem', fontWeight: 600 }}>
                                Low Stock Alert
                              </div>
                            )}
                          </td>

                          {/* Badges */}
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                              {prod.isBestSeller && (
                                <span style={{ backgroundColor: 'rgba(245, 197, 66, 0.2)', color: '#F5C542', fontSize: '0.68rem', padding: '0.1rem 0.35rem', borderRadius: '4px', fontWeight: 700 }}>
                                  Best Seller
                                </span>
                              )}
                              {prod.isRestricted && (
                                <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#EF4444', fontSize: '0.68rem', padding: '0.1rem 0.35rem', borderRadius: '4px', fontWeight: 700 }}>
                                  Regulated
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Actions */}
                          <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                              <button
                                onClick={() => setEditingProduct(prod)}
                                className="btn btn-icon btn-outline"
                                style={{ width: '32px', height: '32px', borderColor: 'rgba(30, 107, 255, 0.4)', color: '#60A5FA' }}
                                title="Edit entire product details"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(prod.id)}
                                className="btn btn-icon btn-outline"
                                style={{ width: '32px', height: '32px', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#EF4444' }}
                                title="Delete product"
                              >
                                <Trash2 size={14} />
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Orders Header Bar */}
            <div className="card-glass" style={{
              backgroundColor: '#071226',
              border: '1px solid rgba(30, 107, 255, 0.35)',
              borderRadius: '16px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                    Sales & Farmgate Orders Desk
                  </h2>
                  <p style={{ fontSize: '0.825rem', color: '#94A3B8', margin: '0.25rem 0 0 0' }}>
                    Monitor customer dispatches, verify M-Pesa STK transactions, and update delivery milestones.
                  </p>
                </div>

                <button
                  onClick={() => setIsNewSaleOpen(true)}
                  className="btn btn-primary"
                  style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', fontWeight: 700, gap: '0.45rem' }}
                >
                  <Plus size={16} />
                  <span>Log Direct Walk-In Sale</span>
                </button>
              </div>

              {/* Search & Status Filters */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '0.75rem'
              }}>
                <div style={{ position: 'relative' }}>
                  <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                  <input
                    type="text"
                    placeholder="Search by Order ID, farmer name, phone, county..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    style={{
                      width: '100%',
                      backgroundColor: '#040B1A',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '0.55rem 0.75rem 0.55rem 2.25rem',
                      color: '#FFFFFF',
                      fontSize: '0.825rem'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto' }}>
                  {['all', 'Pending', 'Processing', 'Dispatched', 'Delivered'].map(status => (
                    <button
                      key={status}
                      onClick={() => setOrderStatusFilter(status)}
                      style={{
                        backgroundColor: orderStatusFilter === status ? '#1E6BFF' : '#040B1A',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: orderStatusFilter === status ? '#FFFFFF' : '#94A3B8',
                        padding: '0.45rem 0.85rem',
                        borderRadius: '6px',
                        fontSize: '0.785rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {status === 'all' ? `All (${orders.length})` : status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="card-glass" style={{
              backgroundColor: '#071226',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              overflow: 'hidden'
            }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.825rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#09152E', color: '#60A5FA', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <th style={{ padding: '0.85rem 1rem' }}>Order Ref & Time</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Farmer & County</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Items Purchased</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Total (KES)</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Payment / M-Pesa</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Current Status</th>
                      <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
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
                          {/* Ref */}
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <div style={{ fontWeight: 800, color: '#FFFFFF', fontFamily: 'monospace' }}>
                              {ord.id}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                              {ord.date} {ord.time ? `• ${ord.time}` : ''}
                            </div>
                          </td>

                          {/* Customer */}
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{ord.customerName}</div>
                            <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{ord.county} ({ord.phone})</div>
                          </td>

                          {/* Items summary */}
                          <td style={{ padding: '0.85rem 1rem', maxWidth: '240px' }}>
                            <div style={{ fontSize: '0.785rem', color: '#E2E8F0' }}>
                              {ord.items?.map(it => `${it.qty}x ${it.name}`).slice(0, 2).join(', ')}
                              {ord.items?.length > 2 && ` +${ord.items.length - 2} more`}
                            </div>
                          </td>

                          {/* Total */}
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <div style={{ fontWeight: 800, color: '#F5C542', fontFamily: 'var(--font-display)', fontSize: '0.9rem' }}>
                              KES {ord.total?.toLocaleString()}
                            </div>
                          </td>

                          {/* Payment */}
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 700, display: 'block' }}>
                              {ord.paymentMethod}
                            </span>
                            <span style={{ fontSize: '0.68rem', color: '#64748B', fontFamily: 'monospace' }}>
                              Ref: {ord.mpesaRef}
                            </span>
                          </td>

                          {/* Status Dropdown */}
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <select
                              value={ord.status}
                              onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                              style={{
                                backgroundColor: '#040B1A',
                                border: `1px solid ${statusColor}`,
                                color: statusColor,
                                borderRadius: '6px',
                                padding: '0.25rem 0.5rem',
                                fontSize: '0.75rem',
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

                          {/* Actions */}
                          <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                            <button
                              onClick={() => setSelectedOrderDetails(ord)}
                              className="btn btn-sm btn-outline"
                              style={{
                                borderColor: 'rgba(30, 107, 255, 0.4)',
                                color: '#60A5FA',
                                padding: '0.35rem 0.75rem',
                                fontSize: '0.75rem'
                              }}
                            >
                              <Eye size={13} style={{ marginRight: '4px' }} />
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card-glass" style={{
              backgroundColor: '#071226',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              borderRadius: '16px',
              padding: '1.25rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                  Farmer Clinical & Agronomy Service Requests
                </h2>
                <p style={{ fontSize: '0.825rem', color: '#94A3B8', margin: '0.25rem 0 0 0' }}>
                  Manage incoming cases for Dr. Peter Karanja (Vet) and Faith Wambui (Agronomist).
                </p>
              </div>

              <button
                onClick={() => setIsNewServiceOpen(true)}
                className="btn btn-primary"
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', fontWeight: 700, gap: '0.45rem' }}
              >
                <Plus size={16} />
                <span>Log New Service Booking</span>
              </button>
            </div>

            {/* Service Requests Table */}
            <div className="card-glass" style={{
              backgroundColor: '#071226',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              overflow: 'hidden'
            }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.825rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#09152E', color: '#10B981', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <th style={{ padding: '0.85rem 1rem' }}>Booking ID</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Farmer Details</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Service Type</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Assigned Specialist</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Farmer Problem Notes</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Fee (KES)</th>
                      <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Status</th>
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
                        <td style={{ padding: '0.85rem 1rem', fontFamily: 'monospace', fontWeight: 800, color: '#FFFFFF' }}>
                          {srv.id}
                        </td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{srv.farmerName}</div>
                          <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{srv.county} • {srv.phone}</div>
                        </td>
                        <td style={{ padding: '0.85rem 1rem', color: '#60A5FA', fontWeight: 600 }}>
                          {srv.serviceType}
                        </td>
                        <td style={{ padding: '0.85rem 1rem', color: '#E2E8F0' }}>
                          {srv.assignedSpecialist}
                        </td>
                        <td style={{ padding: '0.85rem 1rem', maxWidth: '280px', color: '#CBD5E1', fontSize: '0.785rem' }}>
                          {srv.issue}
                        </td>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#F5C542', fontFamily: 'var(--font-display)' }}>
                          KES {srv.fee?.toLocaleString()}
                        </td>
                        <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                          <select
                            value={srv.status}
                            onChange={(e) => handleUpdateServiceStatus(srv.id, e.target.value)}
                            style={{
                              backgroundColor: '#040B1A',
                              border: '1px solid #10B981',
                              color: '#10B981',
                              borderRadius: '6px',
                              padding: '0.25rem 0.5rem',
                              fontSize: '0.75rem',
                              fontWeight: 700
                            }}
                          >
                            <option value="New Request">New Request</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Prescription Issued">Prescription Issued</option>
                            <option value="Visit Completed">Visit Completed</option>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            <div className="card-glass" style={{
              backgroundColor: '#071226',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1rem' }}>
                Agrovet Operating Licenses
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: '#94A3B8' }}>PCPB Agrovet Registration:</span>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>PCPB/DIS/2026/0922</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: '#94A3B8' }}>KVB Veterinary Practice:</span>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>KVB-2104-NBO-VALID</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: '#94A3B8' }}>Safaricom M-Pesa Paybill:</span>
                  <span style={{ color: '#F5C542', fontWeight: 700 }}>882991 (Acc: FARMER)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                  <span style={{ color: '#94A3B8' }}>WhatsApp 24/7 Hotline:</span>
                  <span style={{ color: '#25D366', fontWeight: 700 }}>+254 700 123 456</span>
                </div>
              </div>
            </div>

            <div className="card-glass" style={{
              backgroundColor: '#071226',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1rem' }}>
                Maintenance & System Reset
              </h3>
              <p style={{ fontSize: '0.825rem', color: '#94A3B8', marginBottom: '1.25rem' }}>
                If you ever want to re-seed demo products or restore the original product catalog, use these administrative triggers:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  onClick={onResetDefaultProducts}
                  className="btn btn-outline"
                  style={{ borderColor: 'rgba(245, 197, 66, 0.4)', color: '#F5C542', justifyContent: 'center' }}
                >
                  <RefreshCw size={15} />
                  <span>Restore Factory Starter Catalog</span>
                </button>
                <button
                  onClick={handleExportData}
                  className="btn btn-outline"
                  style={{ borderColor: 'rgba(30, 107, 255, 0.4)', color: '#60A5FA', justifyContent: 'center' }}
                >
                  <Download size={15} />
                  <span>Download Full Database Export</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ==================================================== */}
      {/* MODAL 1: EDIT PRODUCT DIALOG */}
      {/* ==================================================== */}
      {editingProduct && (
        <div className="modal-overlay" onClick={() => setEditingProduct(null)}>
          <div 
            className="card-glass" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#0A1733',
              border: '1.5px solid #1E6BFF',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '680px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '1.75rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                Edit Product: {editingProduct.name}
              </h3>
              <button 
                onClick={() => setEditingProduct(null)}
                className="btn btn-icon btn-outline"
                style={{ width: '32px', height: '32px' }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              handleSaveProductEdit(editingProduct);
            }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Name */}
              <div>
                <label className="form-label">Product Name *</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                />
              </div>

              {/* Brand & Category */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Brand / Manufacturer *</label>
                  <input
                    type="text"
                    value={editingProduct.brand}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    required
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label className="form-label">Category *</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price, Original Price, Stock */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Selling Price (KES) *</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    required
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label className="form-label">Original Price (KES)</label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice || editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label className="form-label">Stock Units Count *</label>
                  <input
                    type="number"
                    value={editingProduct.stockCount}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stockCount: Number(e.target.value), isLowStock: Number(e.target.value) <= 10 })}
                    required
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
              </div>

              {/* Active Ingredient & PCPB Code */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Active Ingredient</label>
                  <input
                    type="text"
                    value={editingProduct.activeIngredient || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, activeIngredient: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label className="form-label">Regulatory PCPB / KVB Code</label>
                  <input
                    type="text"
                    value={editingProduct.complianceCode || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, complianceCode: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="form-label">Image URL</label>
                <input
                  type="url"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                />
              </div>

              {/* Description */}
              <div>
                <label className="form-label">Product Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                />
              </div>

              {/* Checkboxes */}
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={editingProduct.isBestSeller || false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isBestSeller: e.target.checked })}
                  />
                  Best Seller Flag
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={editingProduct.isRestricted || false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isRestricted: e.target.checked })}
                  />
                  Restricted / Regulated
                </label>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ fontWeight: 700 }}
                >
                  Save & Apply Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 2: ADD NEW PRODUCT DIALOG */}
      {/* ==================================================== */}
      {isAddProductOpen && (
        <div className="modal-overlay" onClick={() => setIsAddProductOpen(false)}>
          <div 
            className="card-glass" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#0A1733',
              border: '1.5px solid #F5C542',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '680px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '1.75rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                Add New Product to Shop
              </h3>
              <button 
                onClick={() => setIsAddProductOpen(false)}
                className="btn btn-icon btn-outline"
                style={{ width: '32px', height: '32px' }}
              >
                <X size={16} />
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
            }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Twiga Milking Salve (500g)"
                  style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Brand / Manufacturer *</label>
                  <input
                    type="text"
                    name="brand"
                    required
                    placeholder="e.g. Twiga Chemical Industries"
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label className="form-label">Category *</label>
                  <select
                    name="category"
                    defaultValue="veterinary-drugs"
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Selling Price (KES) *</label>
                  <input
                    type="number"
                    name="price"
                    required
                    placeholder="e.g. 850"
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label className="form-label">Original Price (KES)</label>
                  <input
                    type="number"
                    name="originalPrice"
                    placeholder="e.g. 950"
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label className="form-label">Initial Stock Count *</label>
                  <input
                    type="number"
                    name="stockCount"
                    defaultValue={30}
                    required
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Active Ingredient / Composition</label>
                  <input
                    type="text"
                    name="activeIngredient"
                    placeholder="e.g. Chlorhexidine + Cetrimide"
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label className="form-label">Compliance Code</label>
                  <input
                    type="text"
                    name="complianceCode"
                    placeholder="e.g. KVB Reg. [KVB/VPR/2026/0411]"
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Image URL (Unsplash or direct image link)</label>
                <input
                  type="url"
                  name="image"
                  defaultValue="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
                  style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                />
              </div>

              <div>
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Enter detailed description of usage, benefits, and safety warnings for the farmer..."
                  style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input type="checkbox" name="isBestSeller" />
                  Mark as Best Seller
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input type="checkbox" name="isRestricted" />
                  Regulated Product
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ fontWeight: 700 }}
                >
                  Publish Product to Shop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 3: ORDER DETAILS & RECEIPT DIALOG */}
      {/* ==================================================== */}
      {selectedOrderDetails && (
        <div className="modal-overlay" onClick={() => setSelectedOrderDetails(null)}>
          <div 
            className="card-glass" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#0A1733',
              border: '1.5px solid #1E6BFF',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '620px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '1.75rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#60A5FA', textTransform: 'uppercase', fontWeight: 700 }}>
                  Official Agrovet Ltd Sales Invoice
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', margin: '0.2rem 0 0 0' }}>
                  {selectedOrderDetails.id}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedOrderDetails(null)}
                className="btn btn-icon btn-outline"
                style={{ width: '32px', height: '32px' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Farmer Details */}
            <div style={{
              backgroundColor: '#050E22',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '1rem',
              marginBottom: '1.25rem',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
              fontSize: '0.8rem'
            }}>
              <div>
                <span style={{ color: '#64748B', display: 'block' }}>Farmer Name:</span>
                <strong style={{ color: '#FFFFFF' }}>{selectedOrderDetails.customerName}</strong>
              </div>
              <div>
                <span style={{ color: '#64748B', display: 'block' }}>Phone / WhatsApp:</span>
                <strong style={{ color: '#F5C542' }}>{selectedOrderDetails.phone}</strong>
              </div>
              <div>
                <span style={{ color: '#64748B', display: 'block' }}>Delivery Location:</span>
                <span style={{ color: '#E2E8F0' }}>{selectedOrderDetails.county} ({selectedOrderDetails.town || 'Farmgate'})</span>
              </div>
              <div>
                <span style={{ color: '#64748B', display: 'block' }}>M-Pesa Reference:</span>
                <span style={{ color: '#10B981', fontFamily: 'monospace', fontWeight: 700 }}>{selectedOrderDetails.mpesaRef}</span>
              </div>
            </div>

            {/* Order Items Table */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#60A5FA', marginBottom: '0.5rem' }}>
                Purchased Agricultural Inputs
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {selectedOrderDetails.items?.map((it, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.65rem 0.85rem',
                    backgroundColor: '#040B1A',
                    borderRadius: '8px',
                    fontSize: '0.825rem'
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{it.name}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                        {it.pack || 'Unit'} • Qty: {it.qty}
                      </div>
                    </div>
                    <div style={{ fontWeight: 800, color: '#F5C542' }}>
                      KES {((it.price || 0) * (it.qty || 1)).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Row */}
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: '0.85rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <span style={{ fontSize: '0.9rem', color: '#94A3B8' }}>Total Paid via M-Pesa:</span>
              <span style={{ fontSize: '1.45rem', fontWeight: 800, color: '#F5C542', fontFamily: 'var(--font-display)' }}>
                KES {selectedOrderDetails.total?.toLocaleString()}
              </span>
            </div>

            {/* Actions: Print & WhatsApp dispatch notice */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => window.print()}
                className="btn btn-outline"
                style={{ flex: 1, justifyContent: 'center', borderColor: 'rgba(255,255,255,0.2)', color: '#CBD5E1' }}
              >
                <Printer size={15} />
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
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <MessageCircle size={15} />
                <span>Send WhatsApp Notice</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 4: DELETE CONFIRMATION */}
      {/* ==================================================== */}
      {deleteConfirmId && (
        <div className="modal-overlay" onClick={() => setDeleteConfirmId(null)}>
          <div 
            className="card-glass" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#0A1733',
              border: '1.5px solid #EF4444',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '420px',
              padding: '1.5rem',
              textAlign: 'center'
            }}
          >
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <AlertTriangle size={24} color="#EF4444" />
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>
              Confirm Product Deletion?
            </h4>
            <p style={{ fontSize: '0.825rem', color: '#94A3B8', marginBottom: '1.25rem' }}>
              This item will be immediately removed from the customer storefront catalog.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteConfirmId)}
                className="btn btn-primary"
                style={{ backgroundColor: '#EF4444', borderColor: '#EF4444', color: '#FFFFFF' }}
              >
                Yes, Delete Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 5: LOG DIRECT WALK-IN SALE */}
      {/* ==================================================== */}
      {isNewSaleOpen && (
        <div className="modal-overlay" onClick={() => setIsNewSaleOpen(false)}>
          <div 
            className="card-glass" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#0A1733',
              border: '1.5px solid #F5C542',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '540px',
              padding: '1.75rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                Log Direct Walk-In Sale
              </h3>
              <button 
                onClick={() => setIsNewSaleOpen(false)}
                className="btn btn-icon btn-outline"
                style={{ width: '32px', height: '32px' }}
              >
                <X size={16} />
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
                items: [
                  {
                    id: selectedProd.id,
                    name: selectedProd.name,
                    brand: selectedProd.brand,
                    pack: 'Counter Pickup',
                    qty: qty,
                    price: selectedProd.price,
                    total: totalAmount
                  }
                ],
                subtotal: totalAmount,
                deliveryFee: 0,
                total: totalAmount
              };

              setOrders(prev => [newSale, ...prev]);
              // Deduct stock
              handleQuickStockAdjust(selectedProd.id, -qty);
              setIsNewSaleOpen(false);
              showToast(`Sale recorded! Ref: ${orderId}`);
            }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Customer / Farmer Name *</label>
                <input
                  type="text"
                  name="farmerName"
                  required
                  placeholder="e.g. John Kinyua"
                  style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+254 7XX XXX XXX"
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label className="form-label">Payment Method *</label>
                  <select
                    name="paymentMethod"
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
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
                  style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
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
                  style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setIsNewSaleOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ fontWeight: 700 }}
                >
                  Confirm Sale & Deduct Stock
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
        <div className="modal-overlay" onClick={() => setIsNewServiceOpen(false)}>
          <div 
            className="card-glass" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#0A1733',
              border: '1.5px solid #10B981',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '540px',
              padding: '1.75rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                Log Veterinary / Agronomy Service
              </h3>
              <button 
                onClick={() => setIsNewServiceOpen(false)}
                className="btn btn-icon btn-outline"
                style={{ width: '32px', height: '32px' }}
              >
                <X size={16} />
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
            }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Farmer Name *</label>
                <input
                  type="text"
                  name="farmerName"
                  required
                  placeholder="e.g. Mary Wanjiku"
                  style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+254 7XX XXX XXX"
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label className="form-label">County *</label>
                  <input
                    type="text"
                    name="county"
                    defaultValue="Kiambu County"
                    required
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Service Type *</label>
                  <select
                    name="serviceType"
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  >
                    <option value="On-Farm Clinical Vet Visit">On-Farm Clinical Vet Visit</option>
                    <option value="24/7 Digital WhatsApp Telehealth">24/7 Digital WhatsApp Telehealth</option>
                    <option value="Agronomy Soil Testing & Fertility Audit">Agronomy Soil Testing & Audit</option>
                    <option value="Herd Vaccination & AI Protocol">Herd Vaccination & AI Protocol</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Assigned Specialist</label>
                  <select
                    name="assignedSpecialist"
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                  >
                    <option value="Dr. Peter Karanja (KVB Vet)">Dr. Peter Karanja (KVB Vet)</option>
                    <option value="Faith Wambui (PCPB Agronomist)">Faith Wambui (PCPB Agronomist)</option>
                    <option value="Mobile Veterinary Unit">Mobile Veterinary Unit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">Service Fee (KES) *</label>
                <input
                  type="number"
                  name="fee"
                  defaultValue={3000}
                  required
                  style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                />
              </div>

              <div>
                <label className="form-label">Clinical / Agronomy Case Notes</label>
                <textarea
                  name="issue"
                  rows={3}
                  placeholder="Describe farm problem, symptoms, animal counts, or crop block..."
                  style={{ width: '100%', padding: '0.65rem', backgroundColor: '#040B1A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setIsNewServiceOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ fontWeight: 700 }}
                >
                  Confirm & Log Inflow
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
          bottom: '24px',
          right: '24px',
          backgroundColor: '#0A1733',
          border: '1.5px solid #F5C542',
          color: '#FFFFFF',
          borderRadius: '10px',
          padding: '0.85rem 1.4rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(245, 197, 66, 0.4)',
          zIndex: 1100,
          fontWeight: 700,
          fontSize: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'slideUp 0.2s ease-out'
        }}>
          <span style={{ color: '#10B981' }}>✓</span>
          <span>{adminToast}</span>
        </div>
      )}
    </div>
  );
}
