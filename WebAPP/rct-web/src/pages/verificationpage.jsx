import { useRef } from 'react';
import './global.css';

export default function VerificationPage({ onNavigate }) {
  const inputs = useRef([]);

  const handleInput = (e, idx) => {
    const val = e.target.value.replace(/\D/g, '');
    e.target.value = val.slice(-1);
    if (val && idx < 5) inputs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !e.target.value && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <button
          onClick={() => onNavigate?.('forgotPassword')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '6px',
            color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600,
            padding: 0, marginBottom: '20px'
          }}
        >
          ← Back
        </button>

        <h1 className="card-title">Verification</h1>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: '8px 0 12px' }}>
          Verification code
        </h2>
        <p className="card-subtitle">
          We've sent a verification code to your email
        </p>

        <div className="otp-row">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <input
              key={i}
              ref={(el) => (inputs.current[i] = el)}
              className="otp-input"
              type="text"
              inputMode="numeric"
              maxLength={1}
              onInput={(e) => handleInput(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          ))}
        </div>

        <button className="btn-primary" onClick={() => onNavigate?.('newPassword')}>
          Verify
        </button>

        <p className="auth-footer" style={{ marginTop: '16px' }}>
          I didn't receive the code?{' '}
          <a href="#">Send again</a>
        </p>

        <p className="terms-footer">
          <a href="#">Terms and condition</a>
        </p>
      </div>
    </div>
  );
}