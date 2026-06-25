import './inner-pages.css';
import AppShell from './AppShell';

const recentRoutes = [
  { id: 1, from: 'Gate 1', to: 'Car Park 4 → Lekki Gate', time: '8 min', fare: '₦150', napep: 'A12' },
  { id: 2, from: 'Arena', to: 'Jumat Mosque → Main Gate', time: '12 min', fare: '₦200', napep: 'B07' },
];

const alerts = [
  { id: 1, type: 'warning', msg: 'Heavy traffic near Car Park 2 — use alternate route' },
  { id: 2, type: 'info', msg: 'NAPEP #C19 delayed by 5 min at Arena stop' },
];

export default function HomePage({ onNavigate }) {
  return (
    <AppShell currentPage="plan" onNavigate={onNavigate}>
      <div className="inner-page">

        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Good morning 👋</h1>
            <p className="page-subtitle">Where are you headed today?</p>
          </div>
          <button className="icon-btn" onClick={() => onNavigate('profile')}>
            <div className="avatar-sm">JD</div>
          </button>
        </div>

        {/* Search bar */}
        <div className="search-bar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input placeholder="Search destination in Redemption City..." />
          <button className="search-filter-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
          </button>
        </div>

        {/* Map placeholder */}
        <div className="map-container">
          <div className="map-bg">
            {/* Simulated map grid */}
            <svg width="100%" height="100%" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice">
              <rect width="600" height="300" fill="#e8f0e8"/>
              {/* Roads */}
              <line x1="0" y1="150" x2="600" y2="150" stroke="#c8d8c8" strokeWidth="12"/>
              <line x1="300" y1="0" x2="300" y2="300" stroke="#c8d8c8" strokeWidth="8"/>
              <line x1="0" y1="80" x2="600" y2="80" stroke="#d4e0d4" strokeWidth="5"/>
              <line x1="0" y1="220" x2="600" y2="220" stroke="#d4e0d4" strokeWidth="5"/>
              <line x1="150" y1="0" x2="150" y2="300" stroke="#d4e0d4" strokeWidth="5"/>
              <line x1="450" y1="0" x2="450" y2="300" stroke="#d4e0d4" strokeWidth="5"/>
              {/* Blocks */}
              <rect x="30" y="30" width="100" height="40" rx="4" fill="#cdd8cc"/>
              <rect x="160" y="30" width="120" height="40" rx="4" fill="#cdd8cc"/>
              <rect x="320" y="30" width="80" height="40" rx="4" fill="#cdd8cc"/>
              <rect x="420" y="30" width="150" height="40" rx="4" fill="#cdd8cc"/>
              <rect x="30" y="170" width="100" height="40" rx="4" fill="#cdd8cc"/>
              <rect x="160" y="170" width="120" height="40" rx="4" fill="#cdd8cc"/>
              <rect x="320" y="170" width="80" height="40" rx="4" fill="#cdd8cc"/>
              <rect x="420" y="170" width="150" height="40" rx="4" fill="#cdd8cc"/>
              {/* Route line */}
              <polyline points="100,150 200,150 200,80 400,80 400,150 500,150" stroke="#1a3d2b" strokeWidth="3" fill="none" strokeDasharray="8,4"/>
              {/* NAPEP markers */}
              <circle cx="200" cy="150" r="10" fill="#1a3d2b"/>
              <text x="200" y="154" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">A</text>
              <circle cx="400" cy="80" r="10" fill="#2d7a4f"/>
              <text x="400" y="84" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">B</text>
              {/* User pin */}
              <circle cx="300" cy="150" r="12" fill="#1a3d2b" opacity="0.15"/>
              <circle cx="300" cy="150" r="7" fill="#1a3d2b"/>
              <circle cx="300" cy="150" r="3" fill="white"/>
            </svg>
          </div>

          {/* Map overlay buttons */}
          <div className="map-overlay-top">
            <button className="map-pill" onClick={() => onNavigate('route')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M7 6h8"/><path d="M5 8v3a2 2 0 002 2h10a2 2 0 002-2V8"/><line x1="12" y1="13" x2="12" y2="16"/></svg>
              Toggle Alternative Routes
            </button>
          </div>

          <div className="map-overlay-bottom">
            <div className="live-tracking-badge">
              <span className="live-dot-green"/>
              Live Tracking
            </div>
            <div className="map-route-cards">
              {recentRoutes.map(r => (
                <div key={r.id} className="map-route-chip">
                  <div className="chip-dot"/>
                  <div className="chip-info">
                    <p className="chip-title">{r.from} → {r.to}</p>
                    <p className="chip-meta">NAPEP #{r.napep} · {r.time} · {r.fare}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="section-header">
          <h2 className="section-title">Alerts</h2>
        </div>
        <div className="alerts-list">
          {alerts.map(a => (
            <div key={a.id} className={`alert-item ${a.type}`}>
              <span className="alert-icon">{a.type === 'warning' ? '⚠️' : 'ℹ️'}</span>
              <p className="alert-msg">{a.msg}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="section-header">
          <h2 className="section-title">Quick Actions</h2>
        </div>
        <div className="quick-actions">
          {[
          { label: 'Find NAPEP', icon: '🛺', page: 'napep' },
          { label: 'Routes', icon: '🗺️', page: 'route' },
            { label: 'Register', icon: '📋', page: 'registration' },
            { label: 'Payment', icon: '💳', page: 'payment' },
          ].map(a => (
            <button key={a.label} className="quick-action-card" onClick={() => onNavigate(a.page)}>
              <span className="qa-icon">{a.icon}</span>
              <span className="qa-label">{a.label}</span>
            </button>
          ))}
        </div>

      </div>
    </AppShell>
  );
}