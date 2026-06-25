import { useEffect, useRef, useState } from 'react';
import { buildGraph, SAMPLE, kRoutes, congLabel, ROUTE_COLORS } from './wayfinderEngine';
import './wayfinder.css';

const G = buildGraph(SAMPLE);

export default function WayfinderRoutesPage({ routes, origin, destination, preferLit, onNavigate }) {
  const mapRef     = useRef(null);
  const leafletRef = useRef(null);
  const [selRoute, setSelRoute] = useState(0);

  /* ── Init map ── */
  useEffect(() => {
    if (leafletRef.current || !mapRef.current) return;
    const L = window.L;
    if (!L || !routes?.length) return;

    const map = L.map(mapRef.current, { zoomControl: true }).setView([6.5731, 3.4020], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '© OpenStreetMap',
    }).addTo(map);

    leafletRef.current = { map, L };
    drawAll(L, map, routes, 0);

    return () => { map.remove(); leafletRef.current = null; };
  }, [routes]);

  /* ── Redraw when selection changes ── */
  useEffect(() => {
    if (!leafletRef.current || !routes?.length) return;
    const { L, map } = leafletRef.current;
    map.eachLayer(l => { if (l._isRouteLayer) map.removeLayer(l); });
    drawAll(L, map, routes, selRoute);
  }, [selRoute, routes]);

  if (!routes?.length) {
    return (
      <div className="plan-split">
        <div className="plan-panel">
          <div className="plan-panel-inner">
            <h2 className="plan-title">Routes</h2>
            <p className="plan-sub">No routes yet — head to Plan first.</p>
            <button className="plan-primary-btn" onClick={() => onNavigate('plan')}>
              Go to Plan →
            </button>
          </div>
        </div>
        <div className="plan-map-wrap">
          <div ref={mapRef} className="plan-map" />
        </div>
      </div>
    );
  }

  const inv    = routes.map(r => 1 / r.cost);
  const tot    = inv.reduce((a, b) => a + b, 0);
  const shares = inv.map(x => Math.round(x / tot * 100));
  const oName  = G.nodeById[origin]?.name  || origin;
  const dName  = G.nodeById[destination]?.name || destination;

  return (
    <div className="plan-split">

      {/* ── LEFT PANEL ── */}
      <div className="plan-panel">
        <div className="plan-panel-inner">
          <h2 className="plan-title">Routes</h2>
          <p className="plan-sub">
            <strong style={{ color: '#eceae2' }}>{oName}</strong>
            {' → '}
            <strong style={{ color: '#eceae2' }}>{dName}</strong>
            {' · '}{preferLit ? 'lit-preferred' : 'shortest'}
          </p>

          {/* Spreading notice */}
          <div className="wf-routes-notice">
            To stop everyone piling onto one road, Wayfinder recommends{' '}
            <strong>spreading</strong> traffic across the alternatives below — the share shows how many to send each way.
          </div>

          {/* Route cards */}
          {routes.map((r, i) => {
            const s = r.stats;
            const sel = i === selRoute;
            return (
              <div
                key={i}
                className={`wf-dark-card ${sel ? 'selected' : ''}`}
                onClick={() => setSelRoute(i)}
              >
                <div className="wf-dark-card-header">
                  <div className="wf-dark-card-name">
                    <span className="wf-dark-swatch" style={{ background: ROUTE_COLORS[i % 3] }} />
                    {i === 0 ? 'Recommended' : `Alternative ${i}`}
                  </div>
                  <span className="wf-dark-share">{shares[i]}% of traffic</span>
                </div>

                <div className="wf-dark-metrics">
                  <div className="wf-dark-metric">
                    <span>Distance</span>
                    <b>{(s.metres / 1000).toFixed(2)} km</b>
                  </div>
                  <div className="wf-dark-metric">
                    <span>Time</span>
                    <b>{Math.round(s.minutes)} min</b>
                  </div>
                  <div className="wf-dark-metric">
                    <span>Lit</span>
                    <b>{s.litPct}%</b>
                  </div>
                  <div className="wf-dark-metric">
                    <span>Congestion</span>
                    <b>{congLabel(s.avgCong)}</b>
                  </div>
                </div>

                <div className="wf-dark-pills">
                  {s.litPct === 100
                    ? <span className="wf-dark-pill lit">fully lit</span>
                    : <span className="wf-dark-pill dark">{100 - s.litPct}% unlit</span>
                  }
                  {s.marshal && <span className="wf-dark-pill marshal">marshal post</span>}
                </div>
              </div>
            );
          })}

          <button className="plan-ghost-btn" style={{ marginTop: '8px' }} onClick={() => onNavigate('plan')}>
            ← Re-plan
          </button>
        </div>
      </div>

      {/* ── RIGHT MAP ── */}
      <div className="plan-map-wrap">
        <div ref={mapRef} className="plan-map" />
        <div className="plan-map-legend">
          <div className="plan-legend-title">Road status</div>
          {routes.map((r, i) => (
            <div key={i} className="plan-legend-row">
              <span className="plan-ln" style={{ borderColor: ROUTE_COLORS[i % 3] }} />
              {i === 0 ? 'Recommended' : `Alt ${i}`}
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '8px 0' }} />
          <div className="plan-legend-row"><span className="plan-ln" style={{ borderColor: '#2bb189' }} />Clear</div>
          <div className="plan-legend-row"><span className="plan-ln" style={{ borderColor: '#e9a52f' }} />Moderate</div>
          <div className="plan-legend-row"><span className="plan-ln" style={{ borderColor: '#d6483b' }} />Congested</div>
          <div className="plan-legend-row"><span className="plan-ln plan-ln-dashed" style={{ borderColor: '#8a8f82' }} />Unlit (dark)</div>
        </div>
      </div>

    </div>
  );
}

function drawAll(L, map, routes, selIdx) {
  routes.forEach((r, i) => {
    const sel = i === selIdx;
    const latlngs = r.nodes.map(id => { const n = G.nodeById[id]; return [n.lat, n.lng]; });
    const line = L.polyline(latlngs, {
      color: ROUTE_COLORS[i % 3], weight: sel ? 9 : 4,
      opacity: sel ? 0.95 : 0.45, lineCap: 'round',
    });
    line._isRouteLayer = true;
    line.addTo(map);
    if (sel) {
      const pulse = L.polyline(latlngs, {
        color: '#fff', weight: 3, opacity: 0.9, lineCap: 'round', dashArray: '2 14',
      });
      pulse._isRouteLayer = true;
      pulse.addTo(map);
    }
  });

  const oNode = G.nodeById[routes[0]?.nodes[0]];
  const dNode = G.nodeById[routes[0]?.nodes[routes[0].nodes.length - 1]];
  if (oNode) { const p = L.marker([oNode.lat, oNode.lng], { icon: odIcon(L, 'A', '#f2a82c') }); p._isRouteLayer = true; p.addTo(map); }
  if (dNode) { const p = L.marker([dNode.lat, dNode.lng], { icon: odIcon(L, 'B', '#2bb189') }); p._isRouteLayer = true; p.addTo(map); }
}

function odIcon(L, label, color) {
  return L.divIcon({
    className: '',
    iconSize: [26, 26],
    iconAnchor: [13, 24],
    html: `<div style="width:26px;height:26px;border-radius:50% 50% 50% 4px;transform:rotate(45deg);background:${color};display:flex;align-items:center;justify-content:center;border:2px solid #0e1217;box-shadow:0 4px 12px rgba(0,0,0,.5);font-weight:700;font-size:13px;color:#fff;"><span style="transform:rotate(-45deg)">${label}</span></div>`,
  });
}