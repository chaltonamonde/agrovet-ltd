import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  MapPin, 
  Building, 
  Users, 
  Clock, 
  CheckCircle2,
  FileText,
  Truck
} from 'lucide-react';

export default function AboutSection() {
  const complianceLicences = [
    {
      authority: 'Pest Control Products Board (PCPB)',
      mandate: 'Agrochemical Dealer & Distribution Licence',
      number: '[PCPB/DLR/2026/0418]',
      status: 'Fully Active & Audited'
    },
    {
      authority: 'Kenya Veterinary Board (KVB)',
      mandate: 'Veterinary Pharmacy & Medicines Dispensing Permit',
      number: '[KVB/PH/2026/1109]',
      status: 'Registered Vet Oversight'
    },
    {
      authority: 'Kenya Plant Health Inspectorate (KEPHIS)',
      mandate: 'Certified Seed Merchant & Quality Assurance',
      number: '[KEPHIS/SM/7822]',
      status: 'Genuine Seed Lots Verified'
    },
    {
      authority: 'National Environment Management Authority (NEMA)',
      mandate: 'Agrochemical Safe Storage & Waste Handling Clearance',
      number: '[NEMA/ACH/2026/0091]',
      status: 'Compliant Standards'
    }
  ];

  const teamMembers = [
    {
      name: 'Dr. Peter Karanja',
      role: 'Principal Veterinary Surgeon & Clinical Director',
      credentials: 'BVM (University of Nairobi), KVB Registered',
      bio: 'Over 12 years managing herd fertility, mastitis prevention protocols, and poultry vaccination schedules across Central Kenya and the Rift Valley.',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Faith Muthoni',
      role: 'Head of Agronomy & Crop Protection',
      credentials: 'MSc Crop Protection (Egerton), PCPB Certified',
      bio: 'Specialist in greenhouse pest suppression (Tuta absoluta, whiteflies), foliar nutrient correction, and non-chemical IPM rotation strategies.',
      image: 'https://images.unsplash.com/photo-1594824813576-9653664d4b29?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Moses Kiprotich',
      role: 'Cold-Chain & Countrywide Logistics Manager',
      credentials: 'Certified Agro-Logistics Specialist',
      bio: 'Supervises insulated vaccine dispatch and same-day express courier fulfillment through Wells Fargo, Easy Coach, and regional rider fleets.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    }
  ];

  return (
    <section style={{
      padding: '4.5rem 0',
      position: 'relative',
      backgroundColor: '#071228'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          maxWidth: '760px',
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
            <ShieldCheck size={14} color="#F5C542" />
            <span>Integrity, Science & Kenyan Farming</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            marginBottom: '0.85rem',
            lineHeight: 1.2
          }}>
            Protecting Kenyan Farmers from Counterfeits,{' '}
            <span className="text-gradient-gold">One Genuine Batch at a Time.</span>
          </h2>

          <p style={{ fontSize: '1.05rem', color: '#94A3B8', lineHeight: 1.6 }}>
            "Agrovet ltd" was founded in Nairobi to solve an urgent crisis: up to 30% of agricultural 
            chemicals and animal medicines sold on social media or unregulated kiosks are counterfeit or watered down. 
            We built a 24/7 digital dispensary anchored on certified science and strict legal compliance.
          </p>
        </div>

        {/* Company Mission & Core Values Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.75rem',
          marginBottom: '4rem'
        }}>
          <div className="card-glass" style={{ padding: '2rem', backgroundColor: '#0A1733' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#F5C542', fontWeight: 700, marginBottom: '0.75rem' }}>
              Our Founding Story
            </h3>
            <p style={{ color: '#E2E8F0', lineHeight: 1.6, fontSize: '0.925rem' }}>
              We started as a physical veterinary practice and Facebook consultation page. While hundreds of farmers reached out weekly with crop blights and sick dairy cows, ordering required chaotic manual WhatsApp messages and long delays. Farmers frequently lost crops or livestock while waiting.
            </p>
            <p style={{ color: '#94A3B8', lineHeight: 1.6, fontSize: '0.925rem', marginTop: '0.75rem' }}>
              In 2026, we launched our full-stack online agrovet shop: bringing factory-fresh, sealed agro-inputs, real-time stock levels, M-Pesa automated billing, and same-day dispatch to all 47 counties.
            </p>
          </div>

          <div className="card-glass" style={{ padding: '2rem', backgroundColor: '#0A1733' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#60A5FA', fontWeight: 700, marginBottom: '0.75rem' }}>
              Our 4 Quality Guarantees
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { title: 'Zero Counterfeits', desc: 'Direct supply contracts with Bayer, Norbrook, Syngenta and Kenya Seed.' },
                { title: 'Cold-Chain Integrity', desc: 'All poultry and livestock vaccines shipped in temperature-controlled cooler boxes.' },
                { title: 'Dosage Support Included', desc: 'Every product comes with dilution charts and on-call vet support.' },
                { title: 'Transparent Fair Prices', desc: 'Same factory prices whether you farm in Nairobi or a remote rural village.' }
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem' }}>
                  <CheckCircle2 size={16} color="#10B981" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <strong style={{ color: '#FFFFFF' }}>{item.title}:</strong>{' '}
                    <span style={{ color: '#94A3B8' }}>{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Regulatory Licences Box (Clearly marked placeholders per prompt) */}
        <div style={{
          backgroundColor: '#0A1733',
          border: '1.5px solid rgba(245, 197, 66, 0.4)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '4rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Award size={24} color="#F5C542" />
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF' }}>
                  Official Kenya Regulatory Licences & Accreditation
                </h3>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                  Transparent statutory registrations under the Laws of Kenya
                </div>
              </div>
            </div>
            <span className="badge badge-gold">Verified Genuine</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem'
          }}>
            {complianceLicences.map((lic, idx) => (
              <div 
                key={idx}
                style={{
                  backgroundColor: 'rgba(5, 11, 24, 0.7)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  padding: '1rem'
                }}
              >
                <div style={{ fontSize: '0.75rem', color: '#60A5FA', textTransform: 'uppercase', fontWeight: 700 }}>
                  {lic.authority}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF', margin: '0.25rem 0' }}>
                  {lic.mandate}
                </div>
                <div style={{ fontFamily: 'monospace', color: '#F5C542', fontSize: '0.825rem', fontWeight: 700 }}>
                  {lic.number}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#10B981', marginTop: '0.35rem' }}>
                  ● {lic.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div style={{ marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', textAlign: 'center', marginBottom: '2rem' }}>
            Meet the Certified Agro-Vet Clinical Team
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {teamMembers.map((member, i) => (
              <div 
                key={i}
                className="card-glass"
                style={{
                  padding: '1.75rem 1.5rem',
                  backgroundColor: '#0A1733',
                  textAlign: 'center'
                }}
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  style={{
                    width: '96px',
                    height: '96px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #F5C542',
                    margin: '0 auto 1rem auto'
                  }}
                />
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.2rem' }}>
                  {member.name}
                </h4>
                <div style={{ fontSize: '0.8rem', color: '#60A5FA', fontWeight: 600, marginBottom: '0.4rem' }}>
                  {member.role}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#F5C542', fontFamily: 'monospace', marginBottom: '0.85rem' }}>
                  {member.credentials}
                </div>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: 1.5 }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Physical Depot Location & Map Mockup Section */}
        <div className="card-glass" style={{
          padding: '2rem',
          backgroundColor: '#0A1733',
          border: '1px solid rgba(30, 107, 255, 0.3)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#F5C542', marginBottom: '0.5rem' }}>
                <MapPin size={20} />
                <span style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}>
                  Central Fulfillment Hub
                </span>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.75rem' }}>
                Nairobi Central Depot & Cold-Store
              </h3>
              <p style={{ color: '#E2E8F0', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                Located at <strong>Sheikh Karume Road, Agri-Hub Complex Suite 4, Nairobi CBD</strong>. 
                Our central facility houses a licensed pharmaceutical cold-storage room, temperature-monitored vaccine refrigerators, and daily loading docks for courier fleets.
              </p>
              <div style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: 1.6 }}>
                <strong>Operating Hours:</strong><br />
                Monday – Saturday: 7:30 AM – 6:30 PM<br />
                Sunday & Public Holidays: 9:00 AM – 2:00 PM<br />
                Emergency Vet Phone Line: 24/7 Active
              </div>
            </div>

            {/* Stylized Interactive Map Mockup */}
            <div style={{
              height: '240px',
              borderRadius: '14px',
              backgroundColor: '#050D1E',
              border: '1px solid rgba(30, 107, 255, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Map grid lines simulation */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(rgba(30, 107, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 107, 255, 0.1) 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }} />

              {/* Pin indicator */}
              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <div className="animate-float" style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  backgroundColor: '#D4A017',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.5rem auto',
                  boxShadow: '0 0 25px rgba(245, 197, 66, 0.8)'
                }}>
                  <MapPin size={28} color="#050B18" />
                </div>
                <div style={{
                  backgroundColor: 'rgba(5, 11, 24, 0.9)',
                  border: '1px solid #F5C542',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#FFFFFF'
                }}>
                  Agrovet ltd Nairobi Central Depot
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
