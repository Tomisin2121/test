import { useState, useEffect, useRef } from 'react';
import { getGraph, resetGraph, setGraph, buildGraph } from './graphStore';
import './wayfinder.css';

export default function AdminDataPage({ onNavigate }) {
  const [msg, setMsg] = useState('');
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
    drawNetwork(L, edgeLayer);
    return () => { map.remove(); leafletRef.current = null; };
  }, []);

  const redraw = () => {
    if (!leafletRef.current) return;
    const { L } = leafletRef.current;
    drawNetwork(L, edgeLayerRef.current);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.geojson';
    input.onchange = (ev) => {
      const f = ev.target.files[0];
      if (!f) return;
      const rd = new FileReader();
      rd.onload = () => {
        try {
          const gj = JSON.parse(rd.result);
          const raw = geojsonToGraph(gj);
          if (!raw.edges.length) throw new Error('No LineString features found.');
          setGraph(buildGraph(raw));
          redraw();
          setMsg(`Imported ${raw.nodes.length} junctions and ${raw.edges.length} road segments.`);
        } catch (err) {
          setMsg(`Could not import: ${err.message}`);
        }
      };
      rd.readAsText(f);
    };
    input.click();
  };

  const handleExport = () => {
    const G = getGraph();
    const feats = G.edges.map(e => {
      const a = G.nodeById[e.from], b = G.nodeById[e.to];
      return {
        type: 'Feature',
        properties: { name: e.name, lit: e.lit, marshal: e.marshal, congestion: +e.congestion.toFixed(2), oneway: e.oneway },
        geometry: { type: 'LineString', coordinates: [[a.lng, a.lat], [b.lng, b.lat]] },
      };
    });
    const fc = { type: 'FeatureCollection', features: feats };
    const blob = new Blob([JSON.stringify(fc, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'camp-roads.geojson';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRestore = () => {
    resetGraph();
    redraw();
    setMsg('Sample network restored.');
  };

  const G = getGraph();

  return (
    <div className="plan-split">
      <div className="plan-panel">
        <div className="plan-panel-inner">
          <h2 className="plan-title">Map data</h2>
          <p className="plan-sub">The map &amp; routing are real; the road graph is sample data. Import your own GeoJSON to replace it.</p>
          <div className="note" style={{
            background: 'rgba(242,168,44,0.08)', border: '1px solid rgba(242,168,44,0.25)', borderRadius: 10,
            padding: '11px 13px', fontSize: 12, lineHeight: 1.55, color: '#f8c95f', marginBottom: 18,
          }}>
            <b style={{ color: '#f2a82c' }}>Format:</b> a GeoJSON <i>FeatureCollection</i> of <b>LineString</b> features. Properties: <code>name</code>, <code>lit</code>, <code>marshal</code>, <code>congestion</code> (0–1), <code>oneway</code>.
          </div>

          <div className="plan-eyebrow">Import</div>
          <button className="plan-primary-btn" onClick={handleImport}>Import GeoJSON…</button>

          {msg && <p className="psub" style={{ marginTop: 12, color: '#a3a99c', fontSize: 13 }}>{msg}</p>}

          <div className="plan-eyebrow">Export</div>
          <button className="plan-ghost-btn" onClick={handleExport}>Download current graph as GeoJSON</button>
          <button className="plan-ghost-btn" onClick={handleRestore}>Restore sample network</button>

          <div className="plan-eyebrow">Current network</div>
          <p className="psub" style={{ fontSize: 13 }}>{G.nodes.length} junctions · {G.edges.length} road segments</p>
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

function geojsonToGraph(gj) {
  const feats = gj.type === 'FeatureCollection' ? gj.features : (gj.type === 'Feature' ? [gj] : []);
  const nodes = [];
  const idx = {};
  const key = (lng, lat) => lng.toFixed(5) + ',' + lat.toFixed(5);

  function nodeAt(lng, lat) {
    const k = key(lng, lat);
    if (idx[k] != null) return nodes[idx[k]].id;
    const id = 'n' + nodes.length;
    idx[k] = nodes.length;
    nodes.push({ id, name: 'Junction ' + (nodes.length + 1), lat, lng });
    return id;
  }

  const edges = [];
  feats.forEach(ft => {
    if (!ft.geometry || ft.geometry.type !== 'LineString') return;
    const co = ft.geometry.coordinates;
    if (co.length < 2) return;
    const p = ft.properties || {};
    const a = nodeAt(co[0][0], co[0][1]);
    const b = nodeAt(co[co.length - 1][0], co[co.length - 1][1]);
    if (a === b) return;
    edges.push({
      from: a, to: b,
      name: p.name || p.NAME || 'Road',
      lit: p.lit !== undefined ? !!p.lit : (p.lighting !== undefined ? !!p.lighting : true),
      marshal: !!p.marshal,
      congestion: p.congestion !== undefined ? Math.max(0, Math.min(1, +p.congestion)) : 0,
      oneway: !!p.oneway,
    });
  });

  return { nodes, edges };
}
