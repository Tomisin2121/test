import './inner-pages.css';

import { useState, useEffect, useRef } from 'react';
import { buildGraph, SAMPLE } from './wayfinderEngine';

const G = buildGraph(SAMPLE);

const napeps = [
  { id: 'A12', driver: 'Emeka Okafor',  route: 'Gate 1 → Lekki Gate', eta: '2 min',  fare: '₦150', seats: 2, status: 'moving', dist: '0.3km', nodeId: 'plaza'  },
  { id: 'B07', driver: 'Chukwudi Eze',  route: 'Car Park 4 → Jumat',  eta: '5 min',  fare: '₦200', seats: 1, status: 'moving', dist: '0.7km', nodeId: 'car_n'  },
  { id: 'C19', driver: 'Tunde Adeyemi', route: 'Arena → Main Gate',   eta: '8 min',  fare: '₦100', seats: 3, status: 'idle',   dist: '1.1km', nodeId: 'mkt'    },
  { id: 'D03', driver: 'Biodun Salami', route: 'Jumat → Gate 1',      eta: '11 min', fare: '₦150', seats: 2, status: 'moving', dist: '1.4km', nodeId: 'clinic' },
];

// Correct RCCG Redemption City coordinates — KM 46 Lagos-Ibadan Expressway, Mowe
const USER_NODE = { lat: 6.5731, lng: 3.4020 };

export default function NapepPage() {
  const [selected, setSelected]   = useState(null);
  const [panelOpen, setPanelOpen] = useState(true);
  const mapRef     = useRef(null);
  const leafletRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (leafletRef.current || !mapRef.current) return;
    const L = window.L;
    if (!L) return;

    const map = L.map(mapRef.current, { zoomControl: true })
      .setView([USER_NODE.lat, USER_NODE.lng], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '© OpenStreetMap',
    }).addTo(map);

    leafletRef.current = { map, L };

    // Road network
    G.edges.forEach(e => {
      const a = G.nodeById[e.from], b = G.nodeById[e.to];
      const congColor = c => c < 0.34 ? '#2bb189' : c < 0.66 ? '#e9a52f' : '#d6483b';
      L.polyline([[a.lat, a.lng], [b.lat, b.lng]], {
        color: congColor(e.congestion), weight: e.lit ? 4 : 3,
        opacity: 0.8, dashArray: e.lit ? null : '4 8',
      }).addTo(map);
    });

    // User location
    L.marker([USER_NODE.lat, USER_NODE.lng], {
      icon: L.divIcon({
        className: '',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        html: `<div style="width:28px;height:28px;border-radius:50%;background:rgba(26,61,43,0.15);display:flex;align-items:center;justify-content:center;">
          <div style="width:14px;height:14px;border-radius:50%;background:#1a3d2b;border:2.5px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>
        </div>`,
      }),
      zIndexOffset: 500,
    }).bindTooltip('You are here', { direction: 'top' }).addTo(map);

    // NAPEP markers
    napeps.forEach(n => {
      const node = G.nodeById[n.nodeId];
      if (!node) return;
      const color = n.status === 'moving' ? '#2d7a4f' : '#f59e0b';
      const marker = L.marker([node.lat, node.lng], {
        icon: L.divIcon({
          className: '',
          iconSize: [36, 36],
          iconAnchor: [18, 18],
          html: `<div style="width:36px;height:36px;border-radius:50%;background:${color};border:2.5px solid white;box-shadow:0 3px 10px rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 4v3h-7V8z"/>
              <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
          </div>`,
        }),
        zIndexOffset: 1000,
      }).bindTooltip(`NAPEP #${n.id} · ${n.driver}<br>${n.route} · ${n.eta}`, {
        direction: 'top', permanent: false,
      });

      marker.on('click', () => setSelected(prev => prev === n.id ? null : n.id));
      marker.addTo(map);
      markersRef.current[n.id] = { marker, node };
    });

    // NO fitBounds — setView stays in control
    return () => { map.remove(); leafletRef.current = null; };
  }, []);

  // Pan + ring on card selection
  useEffect(() => {
    if (!leafletRef.current) return;
    const { map, L } = leafletRef.current;
    if (leafletRef.current.highlightLayer) {
      map.removeLayer(leafletRef.current.highlightLayer);
      leafletRef.current.highlightLayer = null;
    }
    if (!selected) return;
    const entry = markersRef.current[selected];
    if (!entry) return;
    const ring = L.circleMarker([entry.node.lat, entry.node.lng], {
      radius: 22, color: '#1a3d2b', weight: 2.5,
      fillColor: 'transparent', fillOpacity: 0, opacity: 0.7,
      dashArray: '4 4',
    }).addTo(map);
    leafletRef.current.highlightLayer = ring;
    map.panTo([entry.node.lat, entry.node.lng], { animate: true, duration: 0.5 });
  }, [selected]);

  return (
    <div className="napep-split">

      {/* ── LEFT PANEL ── */}
      <div className={`napep-panel ${!panelOpen ? 'collapsed' : ''}`}>
        <button
          className="napep-collapse-btn"
          onClick={() => setPanelOpen(p => !p)}
          title={panelOpen ? 'Collapse panel' : 'Expand panel'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {panelOpen
              ? <polyline points="15 18 9 12 15 6" />
              : <polyline points="9 18 15 12 9 6" />
            }
          </svg>
        </button>

        {panelOpen && (
          <div className="napep-panel-inner">
            <div className="napep-panel-header">
              <div>
                <h2 className="napep-title">Nearest NAPEPs</h2>
                <p className="napep-sub">Your comfort is our priority</p>
              </div>
              <div className="napep-live-badge">
                <span className="live-dot-green" />
                {napeps.filter(n => n.status === 'moving').length} moving
              </div>
            </div>

            <div className="napep-panel-divider" />

            <div className="napep-panel-list-header">
              <span>Available NAPEPs</span>
              <span className="napep-count-badge">{napeps.length}</span>
            </div>

            <div className="napep-list">
              {napeps.map(n => (
                <div
                  key={n.id}
                  className={`napep-card ${selected === n.id ? 'selected' : ''}`}
                  onClick={() => setSelected(selected === n.id ? null : n.id)}
                >
                  <div className="napep-card-left">
                    <div className={`napep-icon-wrap ${n.status}`}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="3" width="15" height="13" rx="2" />
                        <path d="M16 8h4l3 4v3h-7V8z" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                      </svg>
                    </div>
                  </div>
                  <div className="napep-card-body">
                    <div className="napep-card-header">
                      <span className="napep-id">NAPEP #{n.id}</span>
                      <span className={`napep-status-tag ${n.status}`}>
                        {n.status === 'moving' ? '● Moving' : '● Idle'}
                      </span>
                    </div>
                    <p className="napep-driver">{n.driver}</p>
                    <p className="napep-route">{n.route}</p>
                    <div className="napep-meta">
                      <span>⏱ {n.eta}</span>
                      <span>📍 {n.dist}</span>
                      <span>💺 {n.seats} seats</span>
                      <span>💰 {n.fare}</span>
                    </div>
                    {selected === n.id && (
                      <button className="napep-book-btn">Book This NAPEP</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── RIGHT MAP ── */}
      <div className="napep-map-wrap">
        <div ref={mapRef} className="napep-map" />
        <div className="napep-map-badge">
          <span className="live-dot-green" />
          {napeps.length} NAPEPs nearby
        </div>
        <div className="napep-map-legend">
          <div className="napep-legend-row">
            <span className="napep-legend-dot" style={{ background: '#2d7a4f' }} />Moving
          </div>
          <div className="napep-legend-row">
            <span className="napep-legend-dot" style={{ background: '#f59e0b' }} />Idle
          </div>
          <div className="napep-legend-row">
            <span className="napep-legend-dot" style={{ background: '#1a3d2b' }} />You
          </div>
        </div>
      </div>

    </div>
  );
}