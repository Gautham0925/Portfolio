import { scene, type SceneTier } from "@/lib/motion";

export type Graph = {
  count: number;
  positions: Float32Array;
  edges: Uint16Array;
  edgeCount: number;
  rank: Float32Array;
  neighbours: number[][];
};

function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildGraph(tier: SceneTier): Graph {
  const config = scene[tier];
  const random = seeded(20260);
  const points: [number, number, number][] = [];
  while (points.length < config.nodes) {
    const x = (random() * 2 - 1) * 4.7;
    const y = (random() * 2 - 1) * 3.3;
    const z = (random() * 2 - 1) * 2.4;
    if (Math.hypot(x, y) < 2.1) continue;
    if (Math.hypot(x / 4.7, y / 3.3, z / 2.4) > 1) continue;
    if (points.some(([px, py, pz]) => Math.hypot(px - x, py - y, pz - z) < 0.7)) continue;
    points.push([x, y, z]);
  }

  const pairs = new Set<number>();
  const neighbours: number[][] = points.map(() => []);
  points.forEach(([x, y, z], i) => {
    const nearest = points
      .map(([qx, qy, qz], j) => ({ j, d: Math.hypot(qx - x, qy - y, qz - z) }))
      .filter((entry) => entry.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, config.neighbours);
    nearest.forEach(({ j }) => {
      const a = Math.min(i, j);
      const b = Math.max(i, j);
      if (pairs.has(a * 1000 + b)) return;
      pairs.add(a * 1000 + b);
      neighbours[i]?.push(j);
      neighbours[j]?.push(i);
    });
  });

  const radius = (index: number) => {
    const p = points[index];
    return p ? Math.hypot(p[0], p[1], p[2]) : 0;
  };
  const list = [...pairs]
    .map((key) => [Math.floor(key / 1000), key % 1000] as const)
    .sort((a, b) => Math.min(radius(a[0]), radius(a[1])) - Math.min(radius(b[0]), radius(b[1])));

  const positions = new Float32Array(points.length * 3);
  points.forEach((p, i) => positions.set(p, i * 3));
  const edges = new Uint16Array(list.length * 2);
  list.forEach(([a, b], i) => {
    edges[i * 2] = a;
    edges[i * 2 + 1] = b;
  });

  const order = points.map((_, i) => ({ i, r: radius(i) })).sort((a, b) => a.r - b.r);
  const rank = new Float32Array(points.length);
  order.forEach(({ i }, position) => {
    rank[i] = position / points.length;
  });

  return { count: points.length, positions, edges, edgeCount: list.length, rank, neighbours };
}
