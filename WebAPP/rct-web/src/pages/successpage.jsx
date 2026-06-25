import './global.css';
import './SuccessPage.css';

export default function SuccessPage({ onNavigate }) {
  return (
    <div className="auth-screen">
      <div className="auth-card success-card">
        <div className="success-badge">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="card-title" style={{ textAlign: 'center' }}>Password Changed</h1>
        <p className="card-subtitle" style={{ textAlign: 'center' }}>
          Your password has been updated successfully.
        </p>

        <button
          className="btn-primary"
          style={{ marginTop: '32px' }}
          onClick={() => onNavigate?.('login')}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}