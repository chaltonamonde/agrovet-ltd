import React, { useState } from 'react';
import { 
  X, 
  Building, 
  CheckCircle2, 
  FileText, 
  Truck, 
  Send, 
  MessageCircle,
  Percent
} from 'lucide-react';

export default function WholesaleModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    orgName: '',
    orgType: 'Commercial Dairy Farm',
    contactPerson: '',
    phone: '',
    county: '',
    targetProducts: 'Fertilizer (DAP/CAN 50kg Bags)',
    estimatedQuantity: '100 - 500 Bags / Units',
    deliveryTimeframe: 'Within 7 Days'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppQuote = () => {
    const text = encodeURIComponent(
      `Hello Agrovet ltd Wholesale Desk,\n` +
      `Organization: ${formData.orgName || 'Kenyan Farm Enterprise'}\n` +
      `Category: ${formData.orgType}\n` +
      `Contact: ${formData.contactPerson} (${formData.phone})\n` +
      `County: ${formData.county}\n` +
      `Required Supplies: ${formData.targetProducts}\n` +
      `Volume: ${formData.estimatedQuantity}\n` +
      `Please provide a formal distributor proforma invoice and bulk delivery estimate.`
    );
    window.open(`https://wa.me/254700123456?text=${text}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="card-glass"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: '#0A1733',
          border: '1px solid rgba(245, 197, 66, 0.4)',
          borderRadius: '20px',
          padding: '0'
        }}
      >
        <div style={{
          padding: '1.25rem 1.75rem',
          backgroundColor: '#060F22',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Building size={22} color="#F5C542" />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                Bulk & Wholesale Quotations
              </h3>
              <div style={{ fontSize: '0.78rem', color: '#60A5FA' }}>
                For Cooperatives, Commercial Ranches, Large Estates & Retail Agrovets
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="btn btn-icon btn-outline"
            style={{ width: '34px', height: '34px', borderRadius: '50%' }}
            aria-label="Close modal"
          >
            <X size={17} />
          </button>
        </div>

        <div style={{ padding: '1.75rem' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '2px solid #10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <CheckCircle2 size={32} color="#10B981" />
              </div>
              <h4 style={{ fontSize: '1.4rem', color: '#FFFFFF', fontWeight: 800, marginBottom: '0.5rem' }}>
                Quotation Request Received!
              </h4>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', maxWidth: '450px', margin: '0 auto 1.5rem auto' }}>
                Our corporate agricultural sales desk will prepare a formal Proforma Invoice with factory distributor volume discounts within 2 business hours.
              </p>
              <button onClick={handleWhatsAppQuote} className="btn btn-whatsapp">
                <MessageCircle size={18} />
                <span>Expedite via Wholesale WhatsApp</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{
                backgroundColor: 'rgba(245, 197, 66, 0.1)',
                border: '1px solid rgba(245, 197, 66, 0.3)',
                borderRadius: '10px',
                padding: '0.85rem 1rem',
                marginBottom: '1.5rem',
                fontSize: '0.85rem',
                color: '#FDE047',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Percent size={18} style={{ flexShrink: 0 }} />
                <span>
                  <strong>Bulk Advantage:</strong> Save up to 18% off retail prices on full palette and truckload deliveries of fertilizer, dairy meal, and crop chemicals.
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <label className="form-label">Farm / Cooperative Name *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Kipkaren Dairy Farmers Co-op"
                    value={formData.orgName}
                    onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Enterprise Type *</label>
                  <select 
                    value={formData.orgType}
                    onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                    className="form-select"
                  >
                    <option value="Commercial Dairy Farm">Commercial Dairy Farm</option>
                    <option value="Farmers Cooperative / SACCO">Farmers Cooperative / SACCO</option>
                    <option value="Local Agrovet Retail Stockist">Local Agrovet Retail Stockist</option>
                    <option value="Horticulture / Floriculture Farm">Horticulture / Floriculture Farm</option>
                    <option value="NGO / Agricultural Development Project">NGO / Agricultural Development</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Contact Person Name *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Grace Cherono"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Direct Phone Number *</label>
                  <input 
                    type="tel"
                    required
                    placeholder="e.g. 0722 987 654"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label className="form-label">Required Products & Supply Specifications *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. 200 bags YaraMila NPK, 50 drums Triatix EC, 40 Solo Sprayers"
                  value={formData.targetProducts}
                  onChange={(e) => setFormData({ ...formData, targetProducts: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div>
                  <label className="form-label">Destination County & Offloading Town *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Eldoret, Uasin Gishu"
                    value={formData.county}
                    onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Estimated Delivery Timeline</label>
                  <select 
                    value={formData.deliveryTimeframe}
                    onChange={(e) => setFormData({ ...formData, deliveryTimeframe: e.target.value })}
                    className="form-select"
                  >
                    <option value="Immediate (1-3 Days)">Immediate Dispatch (1-3 Days)</option>
                    <option value="Within 7 Days">Within 7 Days</option>
                    <option value="Upcoming Planting Season">Upcoming Planting Season (Pre-Order)</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginBottom: '0.75rem' }}>
                <FileText size={18} color="#050B18" />
                <span>Request Formal Proforma Invoice</span>
              </button>

              <button 
                type="button" 
                onClick={handleWhatsAppQuote}
                className="btn btn-outline"
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                <span>Or Chat with Corporate Sales on WhatsApp</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
