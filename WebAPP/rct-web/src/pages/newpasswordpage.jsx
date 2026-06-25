import './global.css';
import { useState } from 'react';

export default function NewPasswordPage({ onNavigate }) {
     const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const match = confirm.length > 0 && password === confirm;
  const noMatch = confirm.length > 0 && password !== confirm;
  return (
    <div className="auth-screen">
      <div className="auth-card">
        <button
          onClick={() => onNavigate?.('verification')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '6px',
            color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600,
            padding: 0, marginBottom: '20px'
          }}
        >
          ← Back
        </button>

        <h1 className="card-title">New Password</h1>
        <p className="card-subtitle">Create a strong password for your account</p>

        <div className="form-group">
          <label className="form-label">Enter New Password</label>
          <input
            className="form-input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <input
            className="form-input"
            type="password"
            placeholder="••••••••"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            style={{ borderColor: match ? 'var(--green-accent)' : noMatch ? 'var(--error)' : 'transparent' }}
          />
          {match && <p style={{ color: 'var(--green-accent)', fontSize: '0.8rem', marginTop: '6px', fontWeight: 600 }}>✓ Passwords match</p>}
          {noMatch && <p style={{ color: 'var(--error)', fontSize: '0.8rem', marginTop: '6px' }}>✗ Passwords do not match</p>}
        </div>

        <button className="btn-primary" onClick={() => onNavigate?.('success')}>
          Enter
        </button>

        <p className="terms-footer">
          <a href="#">Terms and condition</a>
        </p>
      </div>
    </div>
  );
}