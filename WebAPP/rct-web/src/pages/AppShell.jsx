import { useState } from 'react';
import './AppShell.css';

const navItems = [
  {
    id: 'plan', label: 'Plan',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
  },
  {
    id: 'wayfinder', label: 'Routes',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 18l5-5 4 3 7-9"/><circle cx="4" cy="18" r="1.5"/><circle cx="20" cy="7" r="1.5"/></svg>
  },
  {
    id: 'napep', label: 'NAPEPs',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 4v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
  },
  {
    id: 'registration', label: 'Register',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
  },
  {
    id: 'profile', label: 'Profile',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  },
  {
    id: 'payment', label: 'Payment',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
  },
];

const RAIL_PAGES = ['plan', 'wayfinder', 'napep'];

export default function AppShell({ currentPage, onNavigate, children, hideRightPanel }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isRail = RAIL_PAGES.includes(currentPage);

  return (
    <div className={`shell ${hideRightPanel ? 'shell--no-right' : ''} ${isRail ? 'shell--rail' : ''}`}>

      {/* ── MOBILE TOP BAR ── */}
      <header className="mobile-topbar">
        <button className="hamburger" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
          <span/><span/><span/>
        </button>
        <div className="mobile-brand">
          <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="2.5" fill="none"/>
            <path d="M14 30 L24 14 L34 30" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <circle cx="24" cy="30" r="3" fill="white"/>
          </svg>
          <span>RCT</span>
        </div>
        <div style={{width:40}}/>
      </header>

      {/* ── MOBILE DRAWER OVERLAY ── */}
      {drawerOpen && (
        <div className="drawer-overlay" onClick={() => setDrawerOpen(false)}>
          <nav className="drawer" onClick={e => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="nav-brand">
                <div className="nav-logo-icon">
                  <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="2.5" fill="none"/>
                    <path d="M14 30 L24 14 L34 30" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    <circle cx="24" cy="30" r="3" fill="white"/>
                  </svg>
                </div>
                <div>
                  <p className="brand-line1">REDEMPTION CITY</p>
                  <p className="brand-line2">TRANSIT</p>
                </div>
              </div>
              <button className="drawer-close" onClick={() => setDrawerOpen(false)}>✕</button>
            </div>
            <ul className="nav-list">
              {navItems.map(item => (
                <li key={item.id}>
                  <button
                    className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                    onClick={() => { onNavigate(item.id); setDrawerOpen(false); }}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="nav-footer">
              <button className="nav-item logout" onClick={() => onNavigate('landing')}>
                <span className="nav-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                </span>
                <span className="nav-label">Logout</span>
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* ── DESKTOP SIDEBAR ── */}
      <aside className={`sidebar ${isRail ? 'sidebar--rail' : ''}`}>

        {/* Logo — full when expanded, icon-only when rail */}
        <div className="nav-brand">
          <div className="nav-logo-icon">
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="2.5" fill="none"/>
              <path d="M14 30 L24 14 L34 30" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="24" cy="30" r="3" fill="white"/>
            </svg>
          </div>
          {!isRail && (
            <div>
              <p className="brand-line1">REDEMPTION CITY</p>
              <p className="brand-line2">TRANSIT</p>
            </div>
          )}
        </div>

        <ul className="nav-list">
          {navItems.map(item => (
            <li key={item.id}>
              <button
                className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
                title={isRail ? item.label : undefined}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="nav-footer">
          <button
            className="nav-item logout"
            onClick={() => onNavigate('landing')}
            title={isRail ? 'Logout' : undefined}
          >
            <span className="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </span>
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </aside>

      {/* ── CENTER CONTENT ── */}
      <main className="shell-main">
        {children}
      </main>

      {/* ── RIGHT PANEL ── */}
      {!hideRightPanel && (
        <aside className="right-panel">
          <RightPanel onNavigate={onNavigate} />
        </aside>
      )}

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav className="mobile-bottom-nav">
        {navItems.slice(0, 5).map(item => (
          <button
            key={item.id}
            className={`bottom-nav-btn ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

    </div>
  );
}

function RightPanel({ onNavigate }) {
  const napeps = [
    { id: 1, name: 'NAPEP #A12', route: 'Gate 1 → Lekki Gate', eta: '2 min', status: 'moving' },
    { id: 2, name: 'NAPEP #B07', route: 'Car Park 4 → Jumat',  eta: '5 min', status: 'moving' },
    { id: 3, name: 'NAPEP #C19', route: 'Arena → Main Gate',   eta: '8 min', status: 'idle'   },
  ];
  const stats = [
    { label: 'Rides Today',  value: '5'  },
    { label: 'Total Trips',  value: '42' },
    { label: 'Saved Routes', value: '3'  },
  ];

  return (
    <div className="rp-wrap">
      <div className="rp-profile">
        <div className="rp-avatar">JD</div>
        <div>
          <p className="rp-name">John Doe</p>
          <p className="rp-role">Passenger</p>
        </div>
        <button className="rp-edit-btn" onClick={() => onNavigate('profile')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
      </div>

      <div className="rp-card">
        <div className="rp-card-header">
          <span className="rp-card-title">Redemption City</span>
          <span className="rp-weather-icon">⛅</span>
        </div>
        <p className="rp-temp">28°C</p>
        <p className="rp-weather-desc">Partly cloudy · Good for travel</p>
      </div>

      <div className="rp-card">
        <div className="rp-card-header">
          <span className="rp-card-title">Live NAPEPs</span>
          <span className="rp-live-dot"/>
        </div>
        <ul className="rp-napep-list">
          {napeps.map(n => (
            <li key={n.id} className="rp-napep-item">
              <div className={`rp-napep-status ${n.status}`}/>
              <div className="rp-napep-info">
                <p className="rp-napep-name">{n.name}</p>
                <p className="rp-napep-route">{n.route}</p>
              </div>
              <span className="rp-napep-eta">{n.eta}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rp-card">
        <p className="rp-card-title" style={{marginBottom:'12px'}}>Your Stats</p>
        <div className="rp-stats-grid">
          {stats.map(s => (
            <div key={s.label} className="rp-stat">
              <p className="rp-stat-value">{s.value}</p>
              <p className="rp-stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rp-actions">
        <button className="rp-action-btn primary" onClick={() => onNavigate('plan')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
          Plan Route
        </button>
        <button className="rp-action-btn danger">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          Emergency
        </button>
      </div>
    </div>
  );
}