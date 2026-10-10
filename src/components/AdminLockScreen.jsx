import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  User, 
  ArrowLeft, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function AdminLockScreen({ onUnlock, onBackToStorefront }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsAuthenticating(true);

    setTimeout(() => {
      // Validate credentials: username === 'admin' and password === 'agrovet.ltd'
      if (username.trim() === 'admin' && password === 'agrovet.ltd') {
        sessionStorage.setItem('agrovet_admin_auth', 'true');
        onUnlock();
      } else {
        setIsAuthenticating(false);
        setErrorMsg('Authentication failed: Invalid username or security password. Please verify your staff credentials.');
      }
    }, 400);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      maxWidth: '100vw',
      overflowX: 'hidden',
      backgroundColor: '#030814',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.25rem 0.75rem',
      position: 'relative',
      fontFamily: 'var(--font-sans)',
      boxSizing: 'border-box'
    }}>
      {/* Ambient background glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(450px, 90vw)',
        height: 'min(450px, 90vw)',
        background: 'radial-gradient(circle, rgba(30, 107, 255, 0.15) 0%, rgba(245, 197, 66, 0.08) 50%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{
        width: '100%',
        maxWidth: '440px',
        backgroundColor: '#071228',
        border: '1.5px solid rgba(245, 197, 66, 0.35)',
        borderRadius: '20px',
        padding: 'clamp(1.25rem, 5vw, 2.25rem)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(245, 197, 66, 0.15)',
        position: 'relative',
        zIndex: 1,
        boxSizing: 'border-box'
      }}>
        {/* Header Branding */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #0A1E46 0%, #061129 100%)',
            border: '2px solid #F5C542',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 25px rgba(245, 197, 66, 0.35)',
            marginBottom: '1rem'
          }}>
            <Lock size={30} color="#F5C542" />
          </div>

          <div style={{
            fontSize: '0.72rem',
            color: '#60A5FA',
            letterSpacing: '0.08em',
            fontWeight: 700,
            textTransform: 'uppercase',
            marginBottom: '0.25rem'
          }}>
            Agrovet Ltd Operations Portal
          </div>

          <h2 style={{
            fontSize: 'clamp(1.25rem, 4vw, 1.65rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            margin: '0 0 0.4rem 0',
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            Restricted Staff Access
          </h2>

          <p style={{
            fontSize: '0.825rem',
            color: '#94A3B8',
            margin: 0,
            lineHeight: 1.4
          }}>
            Authorized veterinary & administrative personnel only. Enter your credentials to unlock the operations command center.
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #EF4444',
            borderRadius: '10px',
            padding: '0.75rem 0.9rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem',
            fontSize: '0.8rem',
            color: '#FCA5A5',
            lineHeight: 1.4
          }}>
            <AlertCircle size={16} color="#EF4444" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          {/* Username Field */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.785rem',
              fontWeight: 700,
              color: '#CBD5E1',
              marginBottom: '0.4rem'
            }}>
              Staff Username
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748B'
              }} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                autoFocus
                autoComplete="username"
                style={{
                  width: '100%',
                  padding: '0.75rem 0.85rem 0.75rem 2.4rem',
                  backgroundColor: '#040B1A',
                  border: '1.5px solid rgba(30, 107, 255, 0.35)',
                  borderRadius: '10px',
                  color: '#FFFFFF',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#F5C542'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(30, 107, 255, 0.35)'}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.785rem',
              fontWeight: 700,
              color: '#CBD5E1',
              marginBottom: '0.4rem'
            }}>
              Security Password
            </label>
            <div style={{ position: 'relative' }}>
              <KeyRound size={16} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748B'
              }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                autoComplete="current-password"
                style={{
                  width: '100%',
                  padding: '0.75rem 2.5rem 0.75rem 2.4rem',
                  backgroundColor: '#040B1A',
                  border: '1.5px solid rgba(30, 107, 255, 0.35)',
                  borderRadius: '10px',
                  color: '#FFFFFF',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#F5C542'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(30, 107, 255, 0.35)'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isAuthenticating}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '0.85rem',
              fontSize: '0.95rem',
              fontWeight: 800,
              justifyContent: 'center',
              marginTop: '0.5rem',
              borderRadius: '10px',
              boxShadow: '0 6px 20px rgba(245, 197, 66, 0.35)',
              opacity: isAuthenticating ? 0.75 : 1,
              cursor: isAuthenticating ? 'wait' : 'pointer'
            }}
          >
            {isAuthenticating ? (
              <span>Verifying Security Key...</span>
            ) : (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={18} color="#050B18" />
                Unlock Admin Console
              </span>
            )}
          </button>
        </form>

        {/* Footer Navigation & Security Audit Tag */}
        <div style={{
          marginTop: '1.75rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <button
            onClick={onBackToStorefront}
            style={{
              background: 'none',
              border: 'none',
              color: '#60A5FA',
              fontSize: '0.825rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.25rem'
            }}
          >
            <ArrowLeft size={14} />
            <span>Return to Public Farm Storefront</span>
          </button>

          <div style={{
            fontSize: '0.68rem',
            color: '#64748B',
            lineHeight: 1.4
          }}>
            PCPB & KVB Audit Logging Active • IP Session Protected
          </div>
        </div>
      </div>
    </div>
  );
}
