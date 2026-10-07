import React, { useState } from 'react';
import { 
  Stethoscope, 
  Upload, 
  MessageCircle, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  PhoneCall, 
  User, 
  FileText, 
  Sparkles,
  ShieldCheck,
  Camera
} from 'lucide-react';

export default function ConsultationSection() {
  const [formData, setFormData] = useState({
    farmerName: '',
    phone: '',
    county: 'Kiambu',
    farmType: 'Dairy Cattle',
    problemCategory: 'Livestock Disease Symptoms',
    description: '',
    urgency: 'Today (Within 4 Hours)',
    preferredMethod: 'WhatsApp Call & Photos'
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppInstant = () => {
    const text = encodeURIComponent(
      `Hello Agrovet ltd Consultation Desk,\n` +
      `Farmer: ${formData.farmerName || 'Kenyan Farmer'}\n` +
      `County: ${formData.county}\n` +
      `Farm Type: ${formData.farmType}\n` +
      `Issue: ${formData.description || 'Need urgent vet / agronomy consultation'}\n` +
      `I would like to share crop/animal photos for immediate diagnosis.`
    );
    window.open(`https://wa.me/254700123456?text=${text}`, '_blank');
  };

  const specialists = [
    {
      name: 'Dr. Peter Karanja',
      title: 'Senior Veterinary Surgeon (BVM, KVB Reg)',
      specialty: 'Dairy Herd Health, Mastitis & Antibiotic Protocols',
      experience: '12+ Years Field Experience',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Faith Muthoni',
      title: 'Lead Agronomist (MSc Crop Protection)',
      specialty: 'Horticulture, Pest Management & Soil Fertility',
      experience: '9+ Years Field Agronomy',
      image: 'https://images.unsplash.com/photo-1594824813576-9653664d4b29?auto=format&fit=crop&w=300&q=80'
    }
  ];

  return (
    <section style={{
      padding: '4.5rem 0',
      position: 'relative',
      backgroundColor: '#061024'
    }}>
      <div className="container">
        {/* Section Header */}
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
            <Stethoscope size={15} color="#F5C542" />
            <span>Licensed Clinical Agro-Vet Consultation</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            marginBottom: '0.85rem',
            lineHeight: 1.2
          }}>
            Don't Guess Chemical Doses.{' '}
            <span className="text-gradient-gold">Consult Our Doctors First.</span>
          </h2>

          <p style={{ fontSize: '1.05rem', color: '#94A3B8', lineHeight: 1.6 }}>
            Share high-resolution photos of diseased leaves, pest symptoms, or sick livestock. 
            Our registered Kenyan veterinary surgeons and agronomists review cases within 15 minutes.
          </p>
        </div>

        {/* Specialists Overview Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          maxWidth: '820px',
          margin: '0 auto 3.5rem auto'
        }}>
          {specialists.map((doc, idx) => (
            <div 
              key={idx}
              className="card-glass"
              style={{
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                backgroundColor: 'rgba(13, 27, 54, 0.75)',
                border: '1px solid rgba(30, 107, 255, 0.25)'
              }}
            >
              <img 
                src={doc.image} 
                alt={doc.name}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  border: '1.5px solid #F5C542'
                }}
              />
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.15rem' }}>
                  {doc.name}
                </h4>
                <div style={{ fontSize: '0.75rem', color: '#F5C542', fontWeight: 600, marginBottom: '0.25rem' }}>
                  {doc.title}
                </div>
                <div style={{ fontSize: '0.785rem', color: '#94A3B8' }}>
                  {doc.specialty}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Consultation Form Container */}
        <div style={{
          maxWidth: '820px',
          margin: '0 auto',
          backgroundColor: '#0A1733',
          border: '1px solid rgba(30, 107, 255, 0.35)',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
        }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '2px solid #10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <CheckCircle2 size={36} color="#10B981" />
              </div>
              <h3 style={{ fontSize: '1.5rem', color: '#FFFFFF', fontWeight: 800, marginBottom: '0.5rem' }}>
                Consultation Case Logged!
              </h3>
              <p style={{ color: '#E2E8F0', maxWidth: '520px', margin: '0 auto 1.5rem auto' }}>
                Dr. Peter Karanja and Faith Muthoni have received your case details. A licensed professional will reach you on <strong>{formData.phone}</strong> within 15 minutes.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={handleWhatsAppInstant}
                  className="btn btn-whatsapp"
                >
                  <MessageCircle size={18} />
                  <span>Speed up via WhatsApp Chat</span>
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-outline"
                >
                  Log Another Case
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF' }}>
                    Book an Agro-Vet Case Review
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                    Free initial assessment with every verified input purchase
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleWhatsAppInstant}
                  className="btn btn-sm btn-whatsapp"
                  style={{ gap: '0.4rem' }}
                >
                  <MessageCircle size={16} />
                  <span>Instant WhatsApp Connect</span>
                </button>
              </div>

              {/* Form Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.25rem',
                marginBottom: '1.25rem'
              }}>
                <div>
                  <label className="form-label">Farmer / Farm Name *</label>
                  <input 
                    type="text" 
                    name="farmerName"
                    required
                    placeholder="e.g. Samuel Kiptoo"
                    value={formData.farmerName}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Phone Number (WhatsApp Preferred) *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    placeholder="e.g. 0722 123 456"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Farming Enterprise Type *</label>
                  <select 
                    name="farmType"
                    value={formData.farmType}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="Dairy Cattle">Dairy Cattle Farming</option>
                    <option value="Poultry (Broilers / Layers / Kienyeji)">Poultry (Layers/Broilers/Kienyeji)</option>
                    <option value="Greenhouse Tomatoes & Capsicum">Greenhouse Tomatoes & Capsicum</option>
                    <option value="Open-Field Maize & Cereals">Open-Field Maize & Cereals</option>
                    <option value="Coffee & Tea Estates">Coffee & Tea Estates</option>
                    <option value="Sheep & Goats">Sheep & Goats</option>
                    <option value="Piggery / Swine">Piggery / Swine</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Farm Location (County) *</label>
                  <input 
                    type="text" 
                    name="county"
                    required
                    placeholder="e.g. Kiambu, Uasin Gishu, Nakuru"
                    value={formData.county}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Problem Description */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label className="form-label">Describe the Symptoms / Challenge in Detail *</label>
                <textarea 
                  name="description"
                  required
                  rows={4}
                  placeholder="e.g. My 3 Friesian cows showed sudden drop in milk and clots in the left quarter. We noticed ticks 4 days ago. Need guidance on antibiotic vs teat dip..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-textarea"
                />
              </div>

              {/* Photo Upload Box (Instant Preview Simulation) */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">
                  Attach Photo of Affected Crop / Animal (Recommended for Diagnosis):
                </label>
                <div style={{
                  border: '2px dashed rgba(30, 107, 255, 0.4)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  backgroundColor: 'rgba(5, 11, 24, 0.6)',
                  cursor: 'pointer',
                  position: 'relative'
                }}>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: 0,
                      cursor: 'pointer',
                      width: '100%',
                      height: '100%'
                    }}
                    aria-label="Upload photo for diagnosis"
                  />

                  {imagePreview ? (
                    <div>
                      <img 
                        src={imagePreview} 
                        alt="Farm Issue Preview" 
                        style={{ maxHeight: '140px', borderRadius: '8px', margin: '0 auto 0.5rem auto' }}
                      />
                      <div style={{ color: '#10B981', fontSize: '0.8rem', fontWeight: 600 }}>
                        ✓ Photo attached successfully. Click or drag to change.
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Camera size={32} color="#60A5FA" style={{ margin: '0 auto 0.5rem auto' }} />
                      <div style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 600 }}>
                        Click or tap to upload photo from your phone or camera
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.25rem' }}>
                        Supports JPG, PNG up to 10MB
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', padding: '0.9rem' }}
              >
                <Stethoscope size={18} color="#050B18" />
                <span>Submit Case to On-Duty Agro-Vet</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
