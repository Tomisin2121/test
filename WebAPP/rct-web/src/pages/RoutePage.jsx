import './inner-pages.css';
import AppShell from './AppShell';
import { useState } from 'react';

const routes = [
  { id: 1, name: 'Route A — Main Road', from: 'Gate 1', to: 'Lekki Gate', time: '8 min', fare: '₦150', stops: 3, status: 'fast', desc: 'Via Church Avenue · Low traffic' },
  { id: 2, name: 'Route B — Arena Bypass', from: 'Gate 1', to: 'Lekki Gate', time: '12 min', fare: '₦150', stops: 5, status: 'moderate', desc: 'Via Arena · Moderate traffic' },
  { id: 3, name: 'Route C — Scenic', from: 'Gate 1', to: 'Lekki Gate', time: '18 min', fare: '₦100', stops: 7, status: 'slow', desc: 'Via Car Park 2 · Longer but cheaper' },
];

export default function RoutesPage({ onNavigate }) {
  const [selected, setSelected] = useState(1);

  return (
    <AppShell currentPage="route" onNavigate={onNavigate}>
      <div className="inner-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Routes</h1>
            <p className="page-subtitle">Choose the best route for your trip</p>
          </div>
        </div>

        {/* From / To inputs */}
        <div className="route-inputs">
          <div className="route-input-row">
            <div className="route-dot origin"/>
            <input className="route-input-field" placeholder="From: Gate 1" defaultValue="Gate 1 — Main Entrance"/>
          </div>
          <div className="route-input-divider"/>
          <div className="route-input-row">
            <div className="route-dot dest"/>
            <input className="route-input-field" placeholder="To: Destination"/>
          </div>
        </div>

        {/* Map */}
        <div className="map-container" style={{height:'200px', marginBottom:'20px'}}>
          <div className="map-bg">
            <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="xMidYMid slice">
              <rect width="600" height="200" fill="#e8f0e8"/>
              <line x1="0" y1="100" x2="600" y2="100" stroke="#c8d8c8" strokeWidth="12"/>
              <line x1="300" y1="0" x2="300" y2="200" stroke="#c8d8c8" strokeWidth="8"/>
              <line x1="0" y1="50" x2="600" y2="50" stroke="#d4e0d4" strokeWidth="5"/>
              <line x1="150" y1="0" x2="150" y2="200" stroke="#d4e0d4" strokeWidth="5"/>
              <line x1="450" y1="0" x2="450" y2="200" stroke="#d4e0d4" strokeWidth="5"/>
              {/* Route A */}
              <polyline points="60,100 300,100 300,50 540,50" stroke="#1a3d2b" strokeWidth="3" fill="none"/>
              {/* Route B */}
              <polyline points="60,100 150,100 150,130 450,130 450,100 540,100" stroke="#2d7a4f" strokeWidth="2.5" fill="none" strokeDasharray="6,3" opacity="0.7"/>
              {/* Start/End pins */}
              <circle cx="60" cy="100" r="8" fill="#1a3d2b"/>
              <circle cx="540" cy="50" r="8" fill="#dc2626"/>
            </svg>
          </div>
        </div>

        {/* Route cards */}
        <div className="section-header">
          <h2 className="section-title">Available Routes</h2>
          <span className="section-badge">{routes.length} found</span>
        </div>

        <div className="routes-list">
          {routes.map(r => (
            <div
              key={r.id}
              className={`route-card ${selected === r.id ? 'selected' : ''}`}
              onClick={() => setSelected(r.id)}
            >
              <div className="route-card-header">
                <div>
                  <p className="route-name">{r.name}</p>
                  <p className="route-desc">{r.desc}</p>
                </div>
                <span className={`route-status-badge ${r.status}`}>
                  {r.status === 'fast' ? '🟢 Fast' : r.status === 'moderate' ? '🟡 Moderate' : '🔴 Slow'}
                </span>
              </div>
              <div className="route-meta-row">
                <span className="route-meta-item">⏱ {r.time}</span>
                <span className="route-meta-item">💰 {r.fare}</span>
                <span className="route-meta-item">📍 {r.stops} stops</span>
              </div>
              {selected === r.id && (
                <button className="btn-primary" style={{marginTop:'12px', maxWidth:'200px'}}>
                  Confirm Route
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}