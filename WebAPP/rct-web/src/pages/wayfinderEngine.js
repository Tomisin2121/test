/* =====================================================================
   WAYFINDER ENGINE
   RCCG Redemption City: lat 6.5731, lng 3.4020 (KM 46 Lagos-Ibadan Expressway, Mowe)
   Nodes spread tightly within the ~2500ha camp at zoom 16
   ===================================================================== */

export const CAMP_CENTER = { lat: 6.5731, lng: 3.4020 };

export const SAMPLE = {
  nodes: [
    { id: 'gate1',  name: 'Main Gate (Expressway)',   lat: 6.5668, lng: 3.3975 },
    { id: 'plaza',  name: 'Junction Plaza',            lat: 6.5698, lng: 3.3995 },
    { id: 'gate2',  name: 'Gate 2',                    lat: 6.5682, lng: 3.4038 },
    { id: 'oldaud', name: 'Old Auditorium',             lat: 6.5728, lng: 3.4012 },
    { id: 'aud',    name: 'Auditorium / Arena',         lat: 6.5758, lng: 3.4020 },
    { id: 'mkt',    name: 'Market Square',              lat: 6.5715, lng: 3.4048 },
    { id: 'gate3',  name: 'Gate 3',                     lat: 6.5732, lng: 3.4082 },
    { id: 'car_s',  name: 'South Car Park',             lat: 6.5688, lng: 3.4003 },
    { id: 'car_n',  name: 'North Car Park',             lat: 6.5772, lng: 3.3995 },
    { id: 'est_a',  name: 'Estate A',                   lat: 6.5742, lng: 3.4058 },
    { id: 'est_b',  name: 'Estate B',                   lat: 6.5702, lng: 3.3978 },
    { id: 'link1',  name: 'West Link',                  lat: 6.5730, lng: 3.3982 },
    { id: 'link2',  name: 'East Link',                  lat: 6.5750, lng: 3.4054 },
    { id: 'clinic', name: 'Camp Clinic',                lat: 6.5700, lng: 3.4024 },
    { id: 'uni',    name: 'Redemption University',      lat: 6.5785, lng: 3.4038 },
    { id: 'perim',  name: 'North Perimeter',            lat: 6.5782, lng: 3.4008 },
  ],
  edges: [
    ['gate1', 'plaza',  1, 1, 0.85, 'Redemption Way'],
    ['plaza', 'oldaud', 1, 0, 0.82, 'Redemption Way'],
    ['oldaud','aud',    1, 0, 0.90, 'Arena Approach'],
    ['plaza', 'car_s',  1, 0, 0.45, 'Car Park Link'],
    ['plaza', 'gate2',  1, 0, 0.40, 'Cross Road'],
    ['gate2', 'mkt',    1, 0, 0.35, 'Market Street'],
    ['mkt',   'oldaud', 1, 1, 0.30, 'Market Link'],
    ['mkt',   'clinic', 1, 0, 0.20, 'Clinic Road'],
    ['clinic','oldaud', 1, 0, 0.25, 'Clinic Road'],
    ['gate1', 'est_b',  1, 0, 0.22, 'West Estate Rd'],
    ['est_b', 'link1',  0, 0, 0.10, 'West Link'],
    ['link1', 'car_n',  0, 0, 0.10, 'West Link'],
    ['link1', 'oldaud', 0, 1, 0.10, 'West Link'],
    ['car_n', 'aud',    1, 0, 0.15, 'North Approach'],
    ['gate3', 'est_a',  1, 0, 0.30, 'East Estate Rd'],
    ['est_a', 'link2',  1, 1, 0.20, 'East Link'],
    ['link2', 'aud',    1, 0, 0.22, 'East Approach'],
    ['gate3', 'mkt',    1, 0, 0.30, 'East Market Rd'],
    ['aud',   'perim',  1, 0, 0.10, 'North Perimeter'],
    ['perim', 'uni',    1, 0, 0.05, 'University Rd'],
    ['perim', 'car_n',  1, 0, 0.10, 'North Perimeter'],
    ['car_s', 'clinic', 1, 0, 0.20, 'Clinic South'],
    ['est_b', 'car_s',  1, 0, 0.20, 'South Loop'],
  ],
};

export const ROUTE_COLORS = ['#f2a82c', '#5b8def', '#b07ad6'];
export const SPEED = { Driver: 18, Tricycle: 15, Passenger: 4.8 };

function haversine(a, b) {
  const R = 6371000, toR = Math.PI / 180;
  const dLat = (b.lat - a.lat) * toR, dLng = (b.lng - a.lng) * toR;
  const la1 = a.lat * toR, la2 = b.lat * toR;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function buildGraph(raw) {
  const nodes = raw.nodes.map(n => ({ ...n }));
  const nodeById = {};
  nodes.forEach(n => (nodeById[n.id] = n));
  const edges = raw.edges.map((e, i) => {
    const o = Array.isArray(e)
      ? { from: e[0], to: e[1], lit: !!e[2], marshal: !!e[3], congestion: +e[4] || 0, name: e[5] || 'Road', oneway: false }
      : { oneway: false, lit: true, marshal: false, congestion: 0, name: 'Road', ...e };
    o.id = 'e' + i;
    const a = nodeById[o.from], b = nodeById[o.to];
    o.length = a && b ? haversine(a, b) : 0;
    o.baseCong = o.congestion;
    return o;
  }).filter(e => e.length > 0);
  const adj = {};
  nodes.forEach(n => (adj[n.id] = []));
  edges.forEach(e => {
    adj[e.from].push({ to: e.to, edge: e });
    if (!e.oneway) adj[e.to].push({ to: e.from, edge: e });
  });
  return { nodes, edges, nodeById, adj };
}

function edgeCost(e, prefs, penalty) {
  let c = e.length;
  c *= 1 + 1.6 * e.congestion;
  if (prefs.preferLit && !e.lit) c *= 2.4;
  if (prefs.preferLit && e.marshal) c *= 0.9;
  return c * (penalty || 1);
}

function dijkstra(G, src, dst, prefs, penalties) {
  const dist = {}, prev = {}, prevEdge = {}, done = {};
  G.nodes.forEach(n => (dist[n.id] = Infinity));
  dist[src] = 0;
  const Q = new Set(G.nodes.map(n => n.id));
  while (Q.size) {
    let u = null, best = Infinity;
    for (const id of Q) { if (dist[id] < best) { best = dist[id]; u = id; } }
    if (u === null) break;
    Q.delete(u); done[u] = 1;
    if (u === dst) break;
    for (const { to, edge } of G.adj[u]) {
      if (done[to]) continue;
      const nd = dist[u] + edgeCost(edge, prefs, penalties && penalties[edge.id]);
      if (nd < dist[to]) { dist[to] = nd; prev[to] = u; prevEdge[to] = edge; }
    }
  }
  if (dist[dst] === Infinity) return null;
  const path = [dst], eids = [];
  let cur = dst;
  while (cur !== src) { const p = prev[cur]; eids.unshift(prevEdge[cur]); path.unshift(p); cur = p; }
  return { nodes: path, edges: eids, cost: dist[dst] };
}

export function kRoutes(G, src, dst, prefs, k = 3) {
  if (src === dst) return [];
  const pen = {}, out = [];
  for (let i = 0; i < k + 2 && out.length < k; i++) {
    const r = dijkstra(G, src, dst, prefs, pen);
    if (!r) break;
    const sig = r.edges.map(e => e.id).join('-');
    if (out.some(o => o.sig === sig)) break;
    r.sig = sig; out.push(r);
    r.edges.forEach(e => (pen[e.id] = (pen[e.id] || 1) * 1.8));
  }
  return out.map(r => ({ ...r, stats: routeStats(r, 'Passenger') }));
}

export function routeStats(r, role) {
  let len = 0, litLen = 0, marshal = false, congW = 0;
  r.edges.forEach(e => {
    len += e.length;
    if (e.lit) litLen += e.length;
    if (e.marshal) marshal = true;
    congW += e.congestion * e.length;
  });
  const speed = SPEED[role] || 14;
  const minutes = (len / 1000) / speed * 60;
  return { metres: len, minutes, litPct: len ? Math.round(litLen / len * 100) : 0, marshal, avgCong: len ? congW / len : 0 };
}

export function congLabel(c) {
  return c < 0.34 ? 'Clear' : c < 0.66 ? 'Moderate' : 'Heavy';
}