import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  Clock, 
  MapPin, 
  Truck, 
  Send, 
  CheckCircle2, 
  ShieldCheck,
  Building
} from 'lucide-react';

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    county: '',
    subject: 'Order & Product Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/254700123456?text=Hello%20Agrovet%20ltd,%20I%20have%20an%20inquiry%20regarding%20products%20and%20farm%20delivery.', '_blank');
  };

  return (
    <section style={{
      padding: '4.5rem 0',
      position: 'relative',
      backgroundColor: '#050B18'
    }}>
      <div className="container">
        {/* Header */}
        <div style={{
          textAlign: 'center',
          maxWidth: '740px',
          margin: '0 auto 3.5rem auto'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.85rem',
            borderRadius: '9999px',
            background: 'rgba(30, 107, 255, 0.15)',
            border: '1px solid rgba(30, 107, 255, 0.4)',
            color: '#60A5FA',
            fontSize: '0.785rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.85rem'
          }}>
            <Building size={14} color="#F5C542" />
            <span>Farmgate Dispatch & Customer Desk</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            marginBottom: '0.85rem',
            lineHeight: 1.2
          }}>
            Connect With Our <span className="text-gradient-gold">Agro-Vet Support Team</span>
          </h2>

          <p style={{ fontSize: '1.05rem', color: '#94A3B8' }}>
            Whether you need urgent crop pest consultation, a wholesale quotation, or courier tracking updates, we are here for you 7 days a week.
          </p>
        </div>

        {/* Contact Info Cards & Form Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          maxWidth: '1050px',
          margin: '0 auto'
        }}>
          {/* Left Column: Direct Channels & Hours */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Phone & Hotline Card */}
            <div className="card-glass" style={{ padding: '1.5rem', backgroundColor: '#0A1733' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(245, 197, 66, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Phone size={22} color="#F5C542" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>Direct Call Center</h4>
                  <div style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 600 }}>Lines Open 7:30 AM – 6:30 PM</div>
                </div>
              </div>
              <div style={{ fontSize: '0.95rem', color: '#E2E8F0', lineHeight: 1.6 }}>
                Main Office: <a href="tel:+254700123456" style={{ color: '#F5C542', fontWeight: 700 }}>+254 700 123 456</a><br />
                Emergency Vet Desk: <a href="tel:+254733987654" style={{ color: '#60A5FA', fontWeight: 700 }}>+254 733 987 654</a>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="card-glass" style={{ padding: '1.5rem', backgroundColor: '#0A1733', border: '1px solid rgba(37, 211, 102, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(37, 211, 102, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <MessageCircle size={22} color="#25D366" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>Instant WhatsApp Hotline</h4>
                  <div style={{ fontSize: '0.78rem', color: '#25D366', fontWeight: 600 }}>Active 24 Hours / 7 Days</div>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#94A3B8', marginBottom: '1rem' }}>
                Quickest way to send crop photos, consult on animal medication, or check stock availability.
              </p>
              <button onClick={handleWhatsApp} className="btn btn-whatsapp" style={{ width: '100%' }}>
                <MessageCircle size={18} />
                <span>Open WhatsApp Chat Now</span>
              </button>
            </div>

            {/* Location & Hours */}
            <div className="card-glass" style={{ padding: '1.5rem', backgroundColor: '#0A1733' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(30, 107, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <MapPin size={22} color="#60A5FA" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>Depot & Dispatch Locations</h4>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Nairobi CBD Central Hub</div>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#E2E8F0', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                Sheikh Karume Rd, Agri-Hub Complex Suite 4, Nairobi<br />
                Regional Pickup Points: Eldoret, Nakuru, Kisumu, Nyeri, Meru.
              </p>
              <div style={{ fontSize: '0.78rem', color: '#60A5FA', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '0.5rem' }}>
                Email: orders@agrovetltd.co.ke • consultations@agrovetltd.co.ke
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Message Form */}
          <div className="card-glass" style={{ padding: '2rem', backgroundColor: '#0A1733' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.4rem' }}>
              Send Us a Direct Message
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '1.5rem' }}>
              We typically reply within 15 minutes during working hours.
            </p>

            {sent ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
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
                <h4 style={{ fontSize: '1.3rem', color: '#FFFFFF', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Message Received!
                </h4>
                <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Thank you, {form.name}. Our agro-vet customer care desk is reviewing your message.
                </p>
                <button onClick={() => setSent(false)} className="btn btn-outline">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Your Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Mary Wanjiku"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="e.g. 0712 345 678"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Your County / Town *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Machakos, Nakuru, Kiambu"
                    value={form.county}
                    onChange={(e) => setForm({ ...form, county: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Inquiry Topic</label>
                  <select 
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="form-select"
                  >
                    <option value="Order & Product Inquiry">Order & Product Inquiries</option>
                    <option value="Agro-Vet Advice">Crop / Livestock Health Advice</option>
                    <option value="Wholesale Quote">Bulk & Wholesale Order Quotation</option>
                    <option value="Courier Tracking">Delivery Status & Tracking</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Your Message or Question *</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Ask about product availability, dosage calculations, or delivery schedules..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                  <Send size={17} color="#050B18" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
