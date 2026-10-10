import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Smartphone, 
  Truck, 
  ShieldCheck, 
  AlertTriangle, 
  Receipt, 
  Share2, 
  ArrowRight,
  Clock,
  Printer,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DELIVERY_ZONES } from '../data/deliveryZones';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  onClearCart,
  onAddOrder
}) {
  if (!isOpen) return null;

  // Checkout Form State
  const [step, setStep] = useState(1); // 1: Delivery info, 2: Payment (M-Pesa STK Push / COD), 3: Success Confirmation
  const [selectedZoneId, setSelectedZoneId] = useState('nairobi-express');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    town: '',
    farmLandmark: '',
    notes: '',
    paymentMethod: 'mpesa', // 'mpesa' | 'cod'
    agreeCompliance: true
  });

  // M-Pesa STK Push Simulation State
  const [stkStatus, setStkStatus] = useState('idle'); // 'idle' | 'pushing' | 'awaiting_pin' | 'confirmed'
  const [stkCountdown, setStkCountdown] = useState(15);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');
  const [confirmedMpesaCode, setConfirmedMpesaCode] = useState('');

  const selectedZone = DELIVERY_ZONES.find(z => z.id === selectedZoneId) || DELIVERY_ZONES[0];
  const itemsTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = itemsTotal >= selectedZone.freeThreshold && selectedZone.freeThreshold > 0 ? 0 : selectedZone.fee;
  const grandTotal = itemsTotal + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Step 1 validation: Proceed to Payment
  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert('Please fill in your Full Name and Safaricom Phone Number.');
      return;
    }
    setStep(2);
  };

  // Trigger simulated M-Pesa STK push
  const handleTriggerMpesaStk = () => {
    setStkStatus('pushing');
    
    // Simulate push being delivered to Safaricom Daraja gateway
    setTimeout(() => {
      setStkStatus('awaiting_pin');
      
      // Countdown simulation
      let counter = 8;
      const interval = setInterval(() => {
        counter -= 1;
        setStkCountdown(counter);
        if (counter <= 0) {
          clearInterval(interval);
          completeOrder();
        }
      }, 1000);
    }, 1800);
  };

  // Complete Order
  const completeOrder = () => {
    const randomOrderId = `AGV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomMpesaCode = `QDK${Math.floor(10 + Math.random() * 89)}X${Math.floor(100 + Math.random() * 899)}MZ`;
    
    setConfirmedOrderId(randomOrderId);
    setConfirmedMpesaCode(randomMpesaCode);
    setStkStatus('confirmed');
    setStep(3);

    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F5C542', '#1E6BFF', '#10B981', '#FFFFFF']
      });
    } catch (e) {
      // ignore if confetti script fails
    }

    if (onAddOrder) {
      onAddOrder({
        id: randomOrderId,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        status: 'Processing',
        customerName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        county: selectedZone.county,
        town: formData.town,
        landmark: formData.farmLandmark,
        notes: formData.notes,
        paymentMethod: formData.paymentMethod === 'mpesa' ? 'M-Pesa STK Push' : 'Cash on Delivery',
        mpesaRef: randomMpesaCode,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          brand: item.brand,
          pack: item.selectedPack,
          qty: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
          image: item.image
        })),
        subtotal: itemsTotal,
        deliveryFee: deliveryFee,
        total: grandTotal
      });
    }

    onClearCart();
  };

  const handleShareWhatsAppReceipt = () => {
    const text = encodeURIComponent(
      `Agrovet ltd Order Confirmation\n` +
      `Order ID: ${confirmedOrderId}\n` +
      `M-Pesa Ref: ${confirmedMpesaCode}\n` +
      `Farmer: ${formData.fullName}\n` +
      `County: ${selectedZone.county} (${formData.town})\n` +
      `Total Paid: KES ${grandTotal.toLocaleString()}\n` +
      `Thank you for farming with genuine certified inputs!`
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
          maxWidth: '780px',
          maxHeight: '94vh',
          overflowY: 'auto',
          backgroundColor: '#0A1733',
          border: '1px solid rgba(30, 107, 255, 0.4)',
          borderRadius: '20px',
          padding: '0',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(245, 197, 66, 0.2)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: '#060F22',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
              {step === 3 ? 'Order Confirmed!' : 'Express Farmgate Checkout'}
            </h3>
            <div style={{ fontSize: '0.785rem', color: '#60A5FA' }}>
              {step === 1 && 'Step 1 of 2: Delivery Destination & County'}
              {step === 2 && 'Step 2 of 2: Instant M-Pesa Payment'}
              {step === 3 && `Order Reference: ${confirmedOrderId}`}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="btn btn-icon btn-outline"
            style={{ width: '36px', height: '36px', borderRadius: '50%' }}
            aria-label="Close checkout"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Area */}
        <div style={{ padding: '1.75rem' }}>
          {/* STEP 1: Delivery Details */}
          {step === 1 && (
            <form onSubmit={handleProceedToPayment}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div>
                  <label className="form-label">Full Name / Farm Contact *</label>
                  <input 
                    type="text" 
                    name="fullName"
                    required
                    placeholder="e.g. John Mwangi or Kipchoge Farms"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Safaricom Phone Number (for M-Pesa & SMS Tracking) *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    placeholder="e.g. 0712 345 678"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Select Delivery County / Region *</label>
                  <select 
                    value={selectedZoneId}
                    onChange={(e) => setSelectedZoneId(e.target.value)}
                    className="form-select"
                  >
                    {DELIVERY_ZONES.map(z => (
                      <option key={z.id} value={z.id}>
                        {z.name} — KES {itemsTotal >= z.freeThreshold && z.freeThreshold > 0 ? 'FREE' : z.fee}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Town / Specific Farm Area *</label>
                  <input 
                    type="text" 
                    name="town"
                    required
                    placeholder="e.g. Ruiru Kamakis, Kikuyu, Eldoret Maili Nne"
                    value={formData.town}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Farmgate Landmark / Driver Directions (Optional)</label>
                <input 
                  type="text" 
                  name="farmLandmark"
                  placeholder="e.g. Near St. Mary’s Church, 500m past tarmac road"
                  value={formData.farmLandmark}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              {/* Order Cost Breakdown Box */}
              <div style={{
                backgroundColor: 'rgba(5, 11, 24, 0.7)',
                borderRadius: '12px',
                padding: '1.25rem',
                border: '1px solid rgba(30, 107, 255, 0.25)',
                marginBottom: '1.5rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#94A3B8' }}>
                  <span>Items Subtotal ({cartItems.reduce((a,b)=>a+b.quantity,0)} units):</span>
                  <span style={{ color: '#FFFFFF', fontWeight: 600 }}>KES {itemsTotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem', color: '#94A3B8' }}>
                  <span>Estimated Courier ({selectedZone.method}):</span>
                  <span style={{ color: deliveryFee === 0 ? '#10B981' : '#FFFFFF', fontWeight: 600 }}>
                    {deliveryFee === 0 ? 'FREE' : `KES ${deliveryFee.toLocaleString()}`}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingTop: '0.75rem',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: '#F5C542'
                }}>
                  <span>Total Due:</span>
                  <span>KES {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Compliance & Pesticide Agreement */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.65rem',
                marginBottom: '1.5rem',
                fontSize: '0.8rem',
                color: '#94A3B8'
              }}>
                <input 
                  type="checkbox"
                  id="agreeCompliance"
                  name="agreeCompliance"
                  checked={formData.agreeCompliance}
                  onChange={handleInputChange}
                  style={{ marginTop: '0.2rem' }}
                />
                <label htmlFor="agreeCompliance">
                  I confirm that all agricultural chemicals and veterinary drugs ordered will be used strictly in accordance with manufacturer product labels, recommended withholding periods, and Kenya regulatory standards.
                </label>
              </div>

              <button 
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', padding: '0.9rem' }}
              >
                <span>Continue to Payment (M-Pesa STK Push)</span>
                <ArrowRight size={17} />
              </button>
            </form>
          )}

          {/* STEP 2: Payment Simulator (M-Pesa STK Push) */}
          {step === 2 && (
            <div>
              <div style={{
                backgroundColor: 'rgba(5, 11, 24, 0.8)',
                borderRadius: '16px',
                border: '1.5px solid rgba(30, 107, 255, 0.35)',
                padding: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    backgroundColor: '#0F5132',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Smartphone size={24} color="#25D366" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF' }}>
                      Lipa na M-Pesa Online (Daraja STK Push)
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                      A payment request will be sent to <strong>{formData.phone}</strong> for <strong>KES {grandTotal.toLocaleString()}</strong>.
                    </p>
                  </div>
                </div>

                {stkStatus === 'idle' && (
                  <div>
                    <div style={{
                      backgroundColor: 'rgba(30, 107, 255, 0.1)',
                      border: '1px solid rgba(30, 107, 255, 0.25)',
                      borderRadius: '8px',
                      padding: '1rem',
                      marginBottom: '1.25rem',
                      fontSize: '0.875rem',
                      color: '#E2E8F0',
                      lineHeight: 1.5
                    }}>
                      👉 <strong>How it works:</strong> Click "Send M-Pesa STK Push". Unlock your phone, wait for the Safaricom SIM prompt, enter your 4-digit M-Pesa PIN, and press OK. Your order is confirmed automatically.
                    </div>

                    <button
                      onClick={handleTriggerMpesaStk}
                      className="btn btn-primary btn-lg"
                      style={{ width: '100%', marginBottom: '0.75rem' }}
                    >
                      <Smartphone size={18} />
                      <span>Send M-Pesa STK Push Prompt</span>
                    </button>

                    {/* Pay on Delivery Option if Available */}
                    {selectedZone.codAvailable && (
                      <button
                        onClick={completeOrder}
                        className="btn btn-outline"
                        style={{ width: '100%', fontSize: '0.85rem' }}
                      >
                        <span>Choose Cash / M-Pesa on Delivery (Nairobi/Kiambu Depot)</span>
                      </button>
                    )}
                  </div>
                )}

                {stkStatus === 'pushing' && (
                  <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                    <div className="animate-pulse-glow" style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(30, 107, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.25rem auto'
                    }}>
                      <Smartphone size={32} color="#60A5FA" />
                    </div>
                    <h4 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                      Connecting to Safaricom Daraja Gateway...
                    </h4>
                    <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>
                      Dispatching USSD push notification to {formData.phone}
                    </p>
                  </div>
                )}

                {stkStatus === 'awaiting_pin' && (
                  <div style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
                    <div style={{
                      display: 'inline-block',
                      padding: '0.4rem 1rem',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(245, 197, 66, 0.15)',
                      border: '1px solid #F5C542',
                      color: '#F5C542',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      marginBottom: '1rem'
                    }}>
                      STK Push Sent to Your Phone!
                    </div>

                    <h4 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                      Check your phone screen & enter M-Pesa PIN
                    </h4>

                    <div style={{
                      fontSize: '2rem',
                      fontWeight: 800,
                      fontFamily: 'monospace',
                      color: '#F5C542',
                      marginBottom: '1rem'
                    }}>
                      00:0{stkCountdown}
                    </div>

                    <p style={{ color: '#94A3B8', fontSize: '0.85rem', maxWidth: '420px', margin: '0 auto 1.25rem auto' }}>
                      If the prompt did not appear, check your SIM card network or use the instant button below to simulate confirmation.
                    </p>

                    <button
                      onClick={completeOrder}
                      className="btn btn-sm btn-primary"
                    >
                      <span>Simulate Successful M-Pesa PIN Input</span>
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => setStep(1)}
                className="btn btn-outline"
                style={{ fontSize: '0.85rem' }}
              >
                ← Back to Delivery Information
              </button>
            </div>
          )}

          {/* STEP 3: Order Confirmation & Receipt */}
          {step === 3 && (
            <div>
              <div style={{
                textAlign: 'center',
                backgroundColor: 'rgba(5, 11, 24, 0.85)',
                borderRadius: '16px',
                border: '1.5px solid #10B981',
                padding: '2rem 1.5rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '2px solid #10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto'
                }}>
                  <CheckCircle2 size={36} color="#10B981" />
                </div>

                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.4rem' }}>
                  Thank You, {formData.fullName}!
                </h3>
                <p style={{ color: '#6EE7B7', fontWeight: 600, fontSize: '0.95rem', marginBottom: '1.25rem' }}>
                  Your order is booked & preparing for dispatch.
                </p>

                {/* Receipt Card */}
                <div style={{
                  backgroundColor: '#071228',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '1.25rem',
                  textAlign: 'left',
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#94A3B8' }}>Order Number:</span>
                    <strong style={{ color: '#F5C542', fontFamily: 'monospace' }}>{confirmedOrderId}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#94A3B8' }}>M-Pesa Reference:</span>
                    <strong style={{ color: '#60A5FA', fontFamily: 'monospace' }}>{confirmedMpesaCode}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#94A3B8' }}>Farm Destination:</span>
                    <strong style={{ color: '#FFFFFF' }}>{formData.town}, {selectedZone.county}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#94A3B8' }}>Courier Partner & ETA:</span>
                    <strong style={{ color: '#E2E8F0' }}>{selectedZone.method} ({selectedZone.eta})</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.25rem' }}>
                    <span style={{ color: '#94A3B8' }}>Total Amount Paid:</span>
                    <strong style={{ color: '#F5C542', fontSize: '1.1rem' }}>KES {grandTotal.toLocaleString()}</strong>
                  </div>
                </div>

                {/* SMS & Tracking Notice */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8rem',
                  color: '#94A3B8',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <Clock size={14} color="#60A5FA" />
                  <span>An SMS tracking dispatch link has been sent to <strong>{formData.phone}</strong></span>
                </div>

                {/* Share on WhatsApp & Close Buttons */}
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <button
                    onClick={handleShareWhatsAppReceipt}
                    className="btn btn-whatsapp"
                    style={{ padding: '0.75rem 1.4rem' }}
                  >
                    <Share2 size={16} />
                    <span>Send Receipt via WhatsApp</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="btn btn-outline"
                    style={{ padding: '0.75rem 1.25rem' }}
                  >
                    <Printer size={16} />
                    <span>Print Receipt</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="btn btn-primary"
                    style={{ padding: '0.75rem 1.4rem' }}
                  >
                    <span>Back to Shop</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
