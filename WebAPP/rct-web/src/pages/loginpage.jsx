import './global.css';
import { useState } from 'react';

const ROLES = [
  {
    key: 'passenger',
    title: 'Passenger',
    subtitle: 'Book keke, taxis & shuttles across Redemption City',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="3"/><path d="M6 21v-1a6 6 0 0 1 12 0v1"/></svg>,
  },
  {
    key: 'tricycle',
    title: 'Tricycle',
    subtitle: 'Drive keke & earn by transporting passengers',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="17" r="2.5"/><circle cx="17" cy="17" r="2.5"/><path d="M7 17h7l-1-9H9zM14 11h4l1 6"/></svg>,
  },
  {
    key: 'driver',
    title: 'Driver',
    subtitle: 'Earn by driving passengers around the city',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11M5 11h14v5H5zM7 16v2M17 16v2"/></svg>,
  },
  {
    key: 'admin',
    title: 'Admin',
    subtitle: 'Manage platform operations & users',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
];

export default function LoginPage({ onNavigate }) {
  const [role, setRole] = useState(null);

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <h1 className="card-title">Login</h1>
        <p className="card-subtitle">Welcome back! Enter your credentials</p>

        <div style={{ marginBottom: '24px' }}>
          <label className="form-label" style={{ marginBottom: '10px' }}>I am a…</label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '8px',
          }}>
            {ROLES.map(r => {
              const sel = role === r.key;
              return (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setRole(r.key)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 6px',
                    border: `1.5px solid ${sel ? 'var(--green-accent)' : 'var(--border)'}`,
                    borderRadius: '12px',
                    background: sel ? 'var(--green-light)' : 'var(--white)',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    fontWeight: sel ? '700' : '600',
                    color: sel ? 'var(--green-dark)' : 'var(--text-muted)',
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{ color: sel ? 'var(--green-accent)' : 'var(--text-muted)', width: '24px', height: '24px' }}>
                    {r.icon}
                  </span>
                  <span>{r.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" placeholder="johndoe@gmail.com" />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-input" type="password" placeholder="••••••••" />
        </div>

        <div className="forgot-link">
          <a className="link" onClick={() => onNavigate?.('forgotPassword')}>
            Forgot Password?
          </a>
        </div>

        <button className="btn-primary">Login</button>

        <div className="divider">or continue with</div>

        <button className="btn-outline">
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continue with Google
        </button>

        <button className="btn-outline">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
          Continue with iOS
        </button>

        <p className="auth-footer">
          Need an account?{' '}
          <a onClick={() => onNavigate?.('signup')}>Sign up</a>
        </p>
      </div>
    </div>
  );
}