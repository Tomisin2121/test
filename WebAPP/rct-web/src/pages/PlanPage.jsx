import { useState, useEffect, useRef } from 'react';
import { buildGraph, SAMPLE, kRoutes } from './wayfinderEngine';
import './wayfinder.css';

const G = buildGraph(SAMPLE);

export default function PlanPage({ onNavigate, onRoutesReady }) {
  const [origin, setOrigin]           = useState('gate1');
  const [destination, setDestination] = useState('aud');
  const [preferLit, setPreferLit]     = useState(true);
  const mapRef     = useRef(null);
  const leafletRef = useRef(null);
  const edgeLayerRef = useRef(null);
  const odLayerRef   = useRef(null);

  useEffect(() => {
    if (leafletRef.current || !mapRef.current) return;
    const L = window.L;
    if (!L) return;

    const map = L.map(mapRef.current, { zoomControl: true })
      .setView([6.5731, 3.4020], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '© OpenStreetMap',
    }).addTo(map);

    const edgeLayer = L.layerGroup().addTo(map);
    const odLayer   = L.layerGroup().addTo(map);
    leafletRef.current   = { map, L };
    edgeLayerRef.current = edgeLayer;
    odLayerRef.current   = odLayer;

    drawNetwork(L, edgeLayer);

    return () => { map.remove(); leafletRef.current = null; };
  }, []);

  useEffect(() => {
    if (!leafletRef.current) return;
    const { L } = leafletRef.current;
    const ol = odLayerRef.current;
    ol.clearLayers();
    const o = G.nodeById[origin], d = G.nodeById[destination];
    if (o) ol.addLayer(L.marker([o.lat, o.lng], { icon: odIcon(L, 'A', '#f2a82c') }));
    if (d) ol.addLayer(L.marker([d.lat, d.lng], { icon: odIcon(L, 'B', '#2bb189') }));
  }, [origin, destination]);

  const handleFind = () => {
    const routes = kRoutes(G, origin, destination, { preferLit });
    onRoutesReady?.(routes, origin, destination, preferLit);
    onNavigate('wayfinder');
  };

  const swap = () => { setOrigin(destination); setDestination(origin); };

  const nodeOpts = G.nodes.map(n => (
    <option key={n.id} value={n.id}>{n.name}</option>
  ));

  return (
    <div className="plan-split">

      {/* ── LEFT CONTROL PANEL ── */}
      <div className="plan-panel">
        <div className="plan-panel-inner">
          <h2 className="plan-title">Plan a route</h2>
          <p className="plan-sub">
            Pick where you're starting and where you're headed.
            Wayfinder shows every viable road — not just the one everyone follows.
          </p>

          <div className="plan-eyebrow">Trip</div>

          <div className="plan-field">
            <label className="plan-label">From</label>
            <select
              className="plan-select"
              value={origin}
              onChange={e => setOrigin(e.target.value)}
            >
              {nodeOpts}
            </select>
          </div>

          <button className="plan-swap-btn" onClick={swap} title="Swap">⇅</button>

          <div className="plan-field">
            <label className="plan-label">To</label>
            <select
              className="plan-select"
              value={destination}
              onChange={e => setDestination(e.target.value)}
            >
              {nodeOpts}
            </select>
          </div>

          <button className="plan-ghost-btn">Or pick points on the map</button>

          <div className="plan-eyebrow">Preferences</div>

          <div
            className={`plan-toggle ${preferLit ? 'on' : ''}`}
            onClick={() => setPreferLit(p => !p)}
          >
            <div>
              <p className="plan-toggle-label">Prefer well-lit roads</p>
              <p className="plan-toggle-sub">Avoid dark segments; favour patrolled routes</p>
            </div>
            <div className="plan-sw">
              <div className="plan-sw-thumb" />
            </div>
          </div>

          <button className="plan-primary-btn" onClick={handleFind}>
            Find routes
          </button>
        </div>
      </div>

      {/* ── RIGHT MAP ── */}
      <div className="plan-map-wrap">
        <div ref={mapRef} className="plan-map" />
        <div className="plan-map-legend">
          <div className="plan-legend-title">Road status</div>
          <div className="plan-legend-row"><span className="plan-ln" style={{ borderColor: '#2bb189' }} />Clear</div>
          <div className="plan-legend-row"><span className="plan-ln" style={{ borderColor: '#e9a52f' }} />Moderate</div>
          <div className="plan-legend-row"><span className="plan-ln" style={{ borderColor: '#d6483b' }} />Congested</div>
          <div className="plan-legend-row"><span className="plan-ln plan-ln-dashed" style={{ borderColor: '#8a8f82' }} />Unlit (dark)</div>
        </div>
      </div>

    </div>
  );
}

function drawNetwork(L, layer) {
  layer.clearLayers();
  const congColor = c => c < 0.34 ? '#2bb189' : c < 0.66 ? '#e9a52f' : '#d6483b';
  G.edges.forEach(e => {
    const a = G.nodeById[e.from], b = G.nodeById[e.to];
    L.polyline([[a.lat, a.lng], [b.lat, b.lng]], {
      color: congColor(e.congestion),
      weight: e.lit ? 5 : 4,
      opacity: 0.9,
      dashArray: e.lit ? null : '4 9',
    }).bindTooltip(`${e.name} · ${e.length.toFixed(0)} m${!e.lit ? ' · unlit' : ''}${e.marshal ? ' · marshal' : ''}`).addTo(layer);
    if (e.marshal) {
      const mid = [(a.lat + b.lat) / 2, (a.lng + b.lng) / 2];
      L.marker(mid, {
        icon: L.divIcon({
          className: '',
          html: `<div style="width:18px;height:18px;border-radius:5px;background:#2bb189;color:#06251b;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;border:1.5px solid #0e1217">M</div>`,
          iconSize: [18, 18],
        }),
      }).addTo(layer);
    }
  });
  G.nodes.forEach(n => {
    L.circleMarker([n.lat, n.lng], {
      radius: 5, color: '#0e1217', weight: 2, fillColor: '#cdd2c6', fillOpacity: 1,
    }).bindTooltip(n.name, { direction: 'top' }).addTo(layer);
  });
}

function odIcon(L, label, color) {
  return L.divIcon({
    className: '',
    iconSize: [26, 26],
    iconAnchor: [13, 24],
    html: `<div style="
      width:26px;height:26px;border-radius:50% 50% 50% 4px;
      transform:rotate(45deg);background:${color};
      display:flex;align-items:center;justify-content:center;
      border:2px solid #0e1217;box-shadow:0 4px 12px rgba(0,0,0,.5);
      font-weight:700;font-size:13px;color:#fff;
    "><span style="transform:rotate(-45deg)">${label}</span></div>`,
  });
}