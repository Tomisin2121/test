import { useState, useEffect, useRef } from 'react';
import { getGraph } from './graphStore';
import './wayfinder.css';

export default function AdminSimPage({ onNavigate }) {
  const G = getGraph();
  const [congestion, setCongestion] = useState(() =>
    Object.fromEntries(G.edges.map(e => [e.id, e.congestion]))
  );
  const mapRef = useRef(null);
  const leafletRef = useRef(null);
  const edgeLayerRef = useRef(null);

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
    leafletRef.current = { map, L };
    edgeLayerRef.current = edgeLayer;
    drawNetwork(L, edgeLayer, congestion);
    return () => { map.remove(); leafletRef.current = null; };
  }, []);

  useEffect(() => {
    if (!leafletRef.current) return;
    const { L } = leafletRef.current;
    drawNetwork(L, edgeLayerRef.current, congestion);
  }, [congestion]);

  const handleSlide = (id, val) => {
    const c = +val / 100;
    G.edges.find(e => e.id === id).congestion = c;
    setCongestion(prev => ({ ...prev, [id]: c }));
  };

  const handleSurge = () => {
    const heavy = ['Redemption Way', 'Arena Approach', 'Car Park Link'];
    const next = {};
    G.edges.forEach(e => {
      const c = heavy.includes(e.name) ? 0.9 : e.congestion;
      e.congestion = c;
      next[e.id] = c;
    });
    setCongestion(next);
  };

  const handleReset = () => {
    const next = {};
    G.edges.forEach(e => {
      e.congestion = e.baseCong;
      next[e.id] = e.baseCong;
    });
    setCongestion(next);
  };

  const congLabel = c => c < 0.34 ? 'Clear' : c < 0.66 ? 'Moderate' : 'Heavy';

  return (
    <div className="plan-split">
      <div className="plan-panel">
        <div className="plan-panel-inner">
          <h2 className="plan-title">Simulate congestion</h2>
          <p className="plan-sub">Set how busy each road is and watch routing adapt.</p>
          <button className="plan-ghost-btn" style={{ marginBottom: 6 }} onClick={handleSurge}>⚡ Simulate Holy Ghost Service surge</button>
          <button className="plan-ghost-btn" onClick={handleReset}>Reset to baseline</button>
          <div className="plan-eyebrow" style={{ marginTop: 22 }}>Roads</div>
          {G.edges.map(e => (
            <div key={e.id} className="seg" style={{ background: 'var(--ink)', border: '1px solid var(--line)', borderRadius: 11, padding: '12px 13px', margin: '0 0 9px' }}>
              <div className="sn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
                <b style={{ fontWeight: 500, color: '#eceae2' }}>{e.name}</b>
                <span className="meta" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10.5px', color: '#6f7568', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                  {G.nodeById[e.from].name.split(' ')[0]}–{G.nodeById[e.to].name.split(' ')[0]}
                </span>
              </div>
              <input type="range" min="0" max="100" value={Math.round((congestion[e.id] || 0) * 100)}
                onChange={e2 => handleSlide(e.id, e2.target.value)}
                style={{ width: '100%', accentColor: '#f2a82c', margin: '2px 0' }} />
              <div className="congval" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#a3a99c', textAlign: 'right' }}>
                {congLabel(congestion[e.id])} · {Math.round((congestion[e.id] || 0) * 100)}%
              </div>
            </div>
          ))}
        </div>
      </div>
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

function drawNetwork(L, layer, congestion) {
  const G = getGraph();
  layer.clearLayers();
  const congColor = c => c < 0.34 ? '#2bb189' : c < 0.66 ? '#e9a52f' : '#d6483b';
  G.edges.forEach(e => {
    const a = G.nodeById[e.from], b = G.nodeById[e.to];
    const c = congestion[e.id] ?? e.congestion;
    L.polyline([[a.lat, a.lng], [b.lat, b.lng]], {
      color: congColor(c),
      weight: e.lit ? 5 : 4,
      opacity: 0.9,
      dashArray: e.lit ? null : '4 9',
    }).bindTooltip(`${e.name} · ${e.length.toFixed(0)} m${!e.lit ? ' · unlit' : ''}${e.marshal ? ' · marshal' : ''}`).addTo(layer);
    if (e.marshal) {
      const mid = [(a.lat + b.lat) / 2, (a.lng + b.lng) / 2];
      L.marker(mid, {
        icon: L.divIcon({
          className: '',
          html: '<div style="width:18px;height:18px;border-radius:5px;background:#2bb189;color:#06251b;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;border:1.5px solid #0e1217">M</div>',
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
