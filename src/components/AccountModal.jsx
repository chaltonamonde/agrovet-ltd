import React, { useState } from 'react';
import { 
  X, 
  User, 
  Package, 
  MapPin, 
  Award, 
  Clock, 
  RotateCcw, 
  CheckCircle2, 
  Truck, 
  CreditCard,
  ChevronRight
} from 'lucide-react';

export default function AccountModal({ isOpen, onClose, onReorder, onOpenAdmin }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'addresses' | 'rewards'

  const mockPastOrders = [
    {
      id: 'AGV-2026-7841',
      date: '28 Sept 2026',
      status: 'Delivered',
      statusColor: '#10B981',
      items: [
        { name: 'Triatix D.D. EC Acaricide (1 Litre)', qty: 2, price: 2400 },
        { name: 'High-Yield Dairy Meal (50 kg Bag)', qty: 4, price: 2850 }
      ],
      total: 16200,
      deliveryTo: 'Green Pastures Dairy, Kikuyu, Kiambu',
      courier: 'Dedicated Agrovet Courier (Delivered)',
      mpesaRef: 'QCK89X109MZ'
    },
    {
      id: 'AGV-2026-6419',
      date: '14 Aug 2026',
      status: 'In Transit',
      statusColor: '#3B82F6',
      items: [
        { name: 'Thunder 145 O-TEQ Insecticide (500 ml)', qty: 1, price: 1850 },
        { name: 'Ridomil Gold MZ 68 WG Fungicide (1 kg)', qty: 2, price: 3200 }
      ],
      total: 8250,
      deliveryTo: 'Kipkaren Farm, Turbo, Uasin Gishu',
      courier: 'Wells Fargo Parcel #WF-88912',
      mpesaRef: 'QBJ44W291MZ'
    }
  ];

  const savedAddresses = [
    {
      id: 'addr-1',
      label: 'Main Farm (Dairy & Greenhouse)',
      recipient: 'Mwangi Kariuki (Farm Manager)',
      phone: '+254 722 998 877',
      county: 'Kiambu County',
      town: 'Kikuyu, Nachu Ward, Near Muguga Forest Road',
      isDefault: true
    },
    {
      id: 'addr-2',
      label: 'Upcountry Maize Plot',
      recipient: 'Mwangi Kariuki / Chemutai',
      phone: '+254 722 998 877',
      county: 'Uasin Gishu County',
      town: 'Turbo, Maili Nne, 2km Off Eldoret-Webuye Highway',
      isDefault: false
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="card-glass"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#0A1733',
          border: '1px solid rgba(30, 107, 255, 0.4)',
          borderRadius: '20px',
          padding: '0'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.75rem',
          backgroundColor: '#060F22',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: 'rgba(245, 197, 66, 0.2)',
              border: '1.5px solid #F5C542',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              color: '#F5C542'
            }}>
              MK
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF' }}>
                Mwangi Kariuki
              </h3>
              <div style={{ fontSize: '0.78rem', color: '#60A5FA' }}>
                Green Pastures Farm • Kiambu County
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button 
              onClick={() => {
                onClose();
                if (onOpenAdmin) onOpenAdmin();
              }}
              className="btn btn-sm btn-outline"
              style={{
                borderColor: '#F5C542',
                color: '#F5C542',
                backgroundColor: 'rgba(245, 197, 66, 0.1)',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.35rem 0.65rem'
              }}
            >
              🛡️ Admin Console
            </button>
            <button 
              onClick={onClose}
              className="btn btn-icon btn-outline"
              style={{ width: '34px', height: '34px', borderRadius: '50%' }}
              aria-label="Close modal"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: 'rgba(5, 11, 24, 0.5)',
          padding: '0 1.5rem'
        }}>
          {[
            { id: 'orders', label: 'Order History', icon: <Package size={15} /> },
            { id: 'addresses', label: 'Saved Farm Addresses', icon: <MapPin size={15} /> },
            { id: 'rewards', label: 'Mkulima Club Points', icon: <Award size={15} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.9rem 1.1rem',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid #F5C542' : '2px solid transparent',
                color: activeTab === tab.id ? '#F5C542' : '#94A3B8',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ padding: '1.5rem' }}>
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {mockPastOrders.map(order => (
                <div 
                  key={order.id}
                  style={{
                    backgroundColor: 'rgba(5, 11, 24, 0.7)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '1.25rem'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '0.75rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    paddingBottom: '0.6rem'
                  }}>
                    <div>
                      <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#F5C542' }}>
                        {order.id}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: '#94A3B8', marginLeft: '0.75rem' }}>
                        {order.date}
                      </span>
                    </div>

                    <span 
                      className="badge" 
                      style={{ 
                        backgroundColor: `${order.statusColor}20`, 
                        color: order.statusColor,
                        border: `1px solid ${order.statusColor}50` 
                      }}
                    >
                      ● {order.status}
                    </span>
                  </div>

                  {/* Items */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.75rem' }}>
                    {order.items.map((it, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                        <span style={{ color: '#E2E8F0' }}>{it.qty}x {it.name}</span>
                        <span style={{ color: '#94A3B8' }}>KES {(it.price * it.qty).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    paddingTop: '0.75rem',
                    fontSize: '0.85rem'
                  }}>
                    <div>
                      <div style={{ color: '#60A5FA', fontSize: '0.78rem' }}>
                        M-Pesa: {order.mpesaRef} • {order.courier}
                      </div>
                      <div style={{ fontWeight: 800, color: '#F5C542', fontSize: '1rem', marginTop: '0.2rem' }}>
                        Total: KES {order.total.toLocaleString()}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        alert(`Re-ordering items from ${order.id}. Added to cart.`);
                        onClose();
                      }}
                      className="btn btn-sm btn-outline-gold"
                      style={{ gap: '0.35rem' }}
                    >
                      <RotateCcw size={14} />
                      <span>Re-Order This Batch</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {savedAddresses.map(addr => (
                <div 
                  key={addr.id}
                  style={{
                    backgroundColor: 'rgba(5, 11, 24, 0.7)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '1.25rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF' }}>{addr.label}</h4>
                    {addr.isDefault && <span className="badge badge-blue">Default Delivery</span>}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#E2E8F0', lineHeight: 1.5 }}>
                    <strong>Recipient:</strong> {addr.recipient} ({addr.phone})<br />
                    <strong>County:</strong> {addr.county}<br />
                    <strong>Location:</strong> {addr.town}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Rewards Tab */}
          {activeTab === 'rewards' && (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(245, 197, 66, 0.15)',
                border: '2px solid #F5C542',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <Award size={32} color="#F5C542" />
              </div>
              <h4 style={{ fontSize: '1.3rem', color: '#FFFFFF', fontWeight: 800 }}>
                1,250 Mkulima Loyalty Points
              </h4>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', maxWidth: '420px', margin: '0.5rem auto 1.5rem auto' }}>
                Equivalent to <strong>KES 1,250 discount</strong> on your next fertilizer or certified seed order. Earn 50 points for every KES 1,000 spent!
              </p>
              <button onClick={onClose} className="btn btn-primary">
                Redeem on Next Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
