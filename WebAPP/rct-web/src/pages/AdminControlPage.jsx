import { useState, useEffect, useRef } from 'react';
import { getGraph } from './graphStore';
import './wayfinder.css';

export default function AdminControlPage({ onNavigate }) {
  const G = getGraph();
  const [version, setVersion] = useState(0);
  const mapRef = useRef(null);
  const leafletRef = useRef(null);
  const edgeLayerRef = useRef(null);

  const dark = G.edges.filter(e => !e.lit);
  const withM = G.edges.filter(e => e.marshal);

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
    drawNetwork(L, edgeLayer);
    return () => { map.remove(); leafletRef.current = null; };
  }, []);

  useEffect(() => {
    if (!leafletRef.current) return;
    const { L } = leafletRef.current;
    drawNetwork(L, edgeLayerRef.current);
  }, [version]);

  const addLight = (id) => {
    G.edges.find(e => e.id === id).lit = true;
    setVersion(v => v + 1);
  };

  const toggleMarshal = (id) => {
    const e = G.edges.find(x => x.id === id);
    e.marshal = !e.marshal;
    setVersion(v => v + 1);
  };

  return (
    <div className="plan-split">
      <div className="plan-panel">
        <div className="plan-panel-inner">
          <h2 className="plan-title">Control center</h2>
          <p className="plan-sub">Turn an underused dark road into a trusted one — add lighting or a marshal.</p>

          <div className="plan-eyebrow">Dark spots ({dark.length})</div>
          {!dark.length && <div className="empty" style={{ color: '#6f7568', fontSize: 13, textAlign: 'center', padding: '40px 10px', lineHeight: 1.6 }}>No unlit roads remain. Every route is lit.</div>}
          {dark.map(e => (
            <div key={e.id} className="seg" style={{ background: 'var(--ink)', border: '1px solid var(--line)', borderRadius: 11, padding: '12px 13px', margin: '0 0 9px' }}>
              <div className="sn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
                <b style={{ fontWeight: 500, color: '#eceae2' }}>{e.name}</b>
                <span className="meta" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10.5px', color: '#6f7568', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                  {G.nodeById[e.from].name.split(' ')[0]}–{G.nodeById[e.to].name.split(' ')[0]}
                </span>
              </div>
              <div className="miniact" style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <button onClick={() => addLight(e.id)}
                  style={{ flex: 1, background: '#222b37', border: '1px solid rgba(255,255,255,0.09)', color: '#a3a99c', padding: 6, borderRadius: 8, fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>
                  💡 Add lighting
                </button>
                <button onClick={() => toggleMarshal(e.id)}
                  style={{ flex: 1, background: e.marshal ? '#f2a82c' : '#222b37', border: '1px solid rgba(255,255,255,0.09)', color: e.marshal ? '#1a1306' : '#a3a99c', padding: 6, borderRadius: 8, fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>
                  🛡 {e.marshal ? 'Marshal on' : 'Add marshal'}
                </button>
              </div>
            </div>
          ))}

          <div className="plan-eyebrow">All roads with a marshal</div>
          {!withM.length && <div className="empty" style={{ color: '#6f7568', fontSize: 13, textAlign: 'center', padding: 16, lineHeight: 1.6 }}>None yet.</div>}
          {withM.map(e => (
            <div key={e.id} className="seg" style={{ padding: '10px 13px', background: 'var(--ink)', border: '1px solid var(--line)', borderRadius: 11, margin: '0 0 9px' }}>
              <div className="sn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, margin: 0 }}>
                <b style={{ fontWeight: 500, color: '#eceae2' }}>{e.name}</b>
                <span className="pill marshal" style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: 'rgba(43,177,137,.13)', color: '#6fd9b4', fontFamily: "'JetBrains Mono',monospace", margin: 0 }}>marshal</span>
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

function drawNetwork(L, layer) {
  const G = getGraph();
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
