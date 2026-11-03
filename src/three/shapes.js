/*
 * Morph targets for the particle field. Every shape returns
 * { pos: Float32Array(N*3), tone: Float32Array(N) } where tone is
 * 0 = ivory, 1 = gold, 2 = red, 3 = blue.
 */
const TAU = Math.PI * 2;

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function make(N, seed, fill) {
  const pos = new Float32Array(N * 3);
  const tone = new Float32Array(N);
  const r = rng(seed);
  const g = () => (r() + r() + r() - 1.5) / 1.5; // ~gaussian in [-1,1]
  for (let i = 0; i < N; i++) {
    const p = fill(i, r, g);
    pos[i * 3] = p[0];
    pos[i * 3 + 1] = p[1];
    pos[i * 3 + 2] = p[2];
    tone[i] = p[3] ?? 0;
  }
  return { pos, tone };
}

const lerp = (a, b, t) => a + (b - a) * t;
function onSeg(a, b, t, j, g) {
  return [lerp(a[0], b[0], t) + g() * j, lerp(a[1], b[1], t) + g() * j, lerp(a[2], b[2], t) + g() * j];
}

/* random point on the 12 edges of a box centred at c */
function boxEdge(c, w, h, d, r) {
  const e = Math.floor(r() * 12);
  const t = r() - 0.5;
  const sx = w / 2, sy = h / 2, sz = d / 2;
  const s1 = e & 1 ? 1 : -1, s2 = e & 2 ? 1 : -1;
  let p;
  if (e < 4) p = [t * w, s1 * sy, s2 * sz];
  else if (e < 8) p = [s1 * sx, t * h, s2 * sz];
  else p = [s1 * sx, s2 * sy, t * d];
  return [c[0] + p[0], c[1] + p[1], c[2] + p[2]];
}

/* Market: a grid of stalls (box frames + sloped roofs) on a ground plane. */
export function market(N) {
  const cols = 8, rows = 5, sp = 1.75;
  const stalls = [];
  const r0 = rng(7);
  for (let x = 0; x < cols; x++) {
    for (let z = 0; z < rows; z++) {
      stalls.push({
        c: [(x - (cols - 1) / 2) * sp + (r0() - 0.5) * 0.3, 0, (z - (rows - 1) / 2) * sp + (r0() - 0.5) * 0.3],
        h: 0.7 + r0() * 0.9,
        tone: r0() < 0.22 ? 3 : r0() < 0.5 ? 1 : 0,
      });
    }
  }
  return make(N, 11, (i, r, g) => {
    if (i < N * 0.16) {
      // ground dust
      return [(r() - 0.5) * cols * sp * 1.25, -0.02, (r() - 0.5) * rows * sp * 1.4, 0];
    }
    const s = stalls[Math.floor(r() * stalls.length)];
    const k = r();
    const [cx, , cz] = s.c;
    if (k < 0.5) {
      const p = boxEdge([cx, s.h / 2, cz], 1.05, s.h, 0.8, r);
      return [p[0] + g() * 0.02, p[1], p[2] + g() * 0.02, s.tone === 3 ? 3 : 0];
    }
    if (k < 0.82) {
      // roof: two slopes
      const u = r() - 0.5, v = r();
      const side = r() < 0.5 ? -1 : 1;
      return [cx + u * 1.25, s.h + 0.38 * (1 - v), cz + side * v * 0.55, s.tone === 3 ? 3 : 1];
    }
    // shelves inside
    const lvl = Math.floor(r() * 3) + 1;
    return [cx + (r() - 0.5) * 0.9, (s.h * lvl) / 4, cz + 0.36, s.tone || 1];
  });
}

/* Cake: layered disc; wedge pulled out when `pull` > 0. */
export function cake(N, scale = 1, pull = 0.55) {
  const R = 3.1 * scale, H = 1.5 * scale;
  const layers = [[-H / 2, -H / 6 + 0.06], [-H / 6 + 0.14, H / 6], [H / 6 + 0.08, H / 2]];
  return make(N, 21, (i, r, g) => {
    const k = r();
    let a = r() * TAU, rad, y, tone;
    if (k < 0.42) {
      rad = Math.sqrt(r()) * R; y = H / 2; tone = r() < 0.3 ? 1 : 0;
    } else if (k < 0.8) {
      rad = R; const L = layers[Math.floor(r() * 3)]; y = lerp(L[0], L[1], r()); tone = 1;
    } else if (k < 0.92) {
      // cut lines on top
      a = Math.floor(r() * 6) * (TAU / 6); rad = r() * R; y = H / 2 + 0.01; tone = 1;
    } else {
      rad = Math.sqrt(r()) * R; y = -H / 2; tone = 0;
    }
    let x = Math.cos(a) * rad, z = Math.sin(a) * rad;
    if (pull && a >= 0 && a < TAU / 6) {
      const m = TAU / 12;
      x += Math.cos(m) * pull; z += Math.sin(m) * pull; y += pull * 0.2;
      tone = tone === 0 ? 1 : 2;
    }
    return [x + g() * 0.03, y + g() * 0.02, z + g() * 0.03, tone];
  });
}

/* Split: the cake halved and pushed apart (gold ↔ red), glowing seam between. */
export function split(N) {
  const base = cake(N, 1, 0);
  const r = rng(31);
  for (let i = 0; i < N; i++) {
    const x = base.pos[i * 3];
    if (r() < 0.06) {
      base.pos[i * 3] = (r() - 0.5) * 0.12;
      base.pos[i * 3 + 1] = (r() - 0.5) * 3.2;
      base.pos[i * 3 + 2] = (r() - 0.5) * 6.2;
      base.tone[i] = 0;
      continue;
    }
    const s = x < 0 ? -1 : 1;
    base.pos[i * 3] = x + s * 1.1;
    base.pos[i * 3 + 1] += s * 0.12;
    base.tone[i] = s < 0 ? 1 : 2;
  }
  return base;
}

/* Network: k nodes on a ring + a centre hub, beams between them. */
export function network(N, k = 4, radius = 3.4) {
  const nodes = Array.from({ length: k }, (_, i) => {
    const a = (i / k) * TAU + Math.PI / 2;
    return [Math.cos(a) * radius, Math.sin(a) * radius * 0.82, 0];
  });
  const hub = [0, 0, 0];
  const edges = [];
  for (let i = 0; i < k; i++) { edges.push([nodes[i], nodes[(i + 1) % k]]); edges.push([nodes[i], hub]); }
  return make(N, 51 + k, (i, r, g) => {
    const q = r();
    if (q < 0.5) {
      const n = nodes[Math.floor(r() * k)];
      const u = r() * TAU, v = Math.acos(2 * r() - 1), rr = 0.55 * Math.cbrt(r());
      return [n[0] + rr * Math.sin(v) * Math.cos(u), n[1] + rr * Math.sin(v) * Math.sin(u), n[2] + rr * Math.cos(v), 1];
    }
    if (q < 0.6) {
      const u = r() * TAU, v = Math.acos(2 * r() - 1), rr = 0.75 * Math.cbrt(r());
      return [rr * Math.sin(v) * Math.cos(u), rr * Math.sin(v) * Math.sin(u), rr * Math.cos(v), 0];
    }
    if (q < 0.93) {
      const [a, b] = edges[Math.floor(r() * edges.length)];
      return [...onSeg(a, b, r(), 0.035, g), 3];
    }
    // halo
    const u = r() * TAU, rr = radius * (1.25 + r() * 0.5);
    return [Math.cos(u) * rr, Math.sin(u) * rr * 0.82, g() * 0.6, 0];
  });
}

/* QR: a 29×29 module matrix with three finder patterns. */
export function qr(N) {
  const n = 29, size = 6.4, cell = size / n;
  const r0 = rng(61);
  const on = [];
  const finder = (x, y, ox, oy) => {
    const dx = x - ox, dy = y - oy;
    if (dx < 0 || dy < 0 || dx > 6 || dy > 6) return null;
    const ring = Math.max(Math.abs(dx - 3), Math.abs(dy - 3));
    return ring === 3 || ring <= 1;
  };
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const f = finder(x, y, 0, 0) ?? finder(x, y, n - 7, 0) ?? finder(x, y, 0, n - 7);
      if (f === true) on.push([x, y, 1]);
      else if (f === null && r0() < 0.47) on.push([x, y, r0() < 0.12 ? 3 : 0]);
    }
  }
  return make(N, 63, (i, r, g) => {
    if (i < N * 0.08) return [(r() - 0.5) * 11, (r() - 0.5) * 8, 1 + r() * 3, 3];
    const m = on[Math.floor(r() * on.length)];
    return [
      (m[0] + r()) * cell - size / 2,
      size / 2 - (m[1] + r()) * cell,
      g() * 0.05,
      m[2],
    ];
  });
}

/* Cliff: rising revenue bars up to a threshold, then a sheer drop. */
export function cliff(N) {
  const bars = 11, x0 = -5.2, w = 0.42, gap = 0.12, wallX = x0 + bars * (w + gap) + 0.1, top = 2.6, floor = -2.4;
  return make(N, 71, (i, r, g) => {
    const q = r();
    if (q < 0.55) {
      const b = Math.floor(r() * bars);
      const h = lerp(0.4, top, Math.pow((b + 1) / bars, 1.2));
      const bx = x0 + b * (w + gap);
      const edge = r() < 0.55;
      const x = bx + (edge ? (r() < 0.5 ? 0 : w) : r() * w);
      const y = floor + (edge ? r() * (h - floor) : (r() < 0.5 ? h - floor : r() * (h - floor)));
      return [x, y, g() * 0.25, b > bars - 3 ? 1 : 0];
    }
    if (q < 0.7) {
      // threshold line (dashed)
      const x = x0 + r() * (wallX - x0 + 3.6);
      if (Math.floor(x * 3) % 2) return [x, top + 0.25, 0, 2];
      return [x, top + 0.25, 0, 0];
    }
    if (q < 0.86) {
      // falling stream past the cliff
      const t = r();
      return [wallX + 0.25 + Math.pow(t, 2) * 0.9 + g() * 0.08, lerp(top, floor, t), g() * 0.3, 2];
    }
    // the floor below the cliff
    return [wallX + 0.4 + r() * 3.4, floor + g() * 0.05, g() * 0.4, r() < 0.5 ? 2 : 0];
  });
}

/* Ring: a thin luminous torus with a sparse halo. */
export function ring(N) {
  return make(N, 81, (i, r, g) => {
    const a = r() * TAU;
    if (r() < 0.8) {
      const b = r() * TAU, R = 3.6, t = 0.1;
      return [(R + t * Math.cos(b)) * Math.cos(a), (R + t * Math.cos(b)) * Math.sin(a), t * Math.sin(b), r() < 0.3 ? 1 : 0];
    }
    const rr = 3.6 + 1.6 * r();
    return [Math.cos(a) * rr, Math.sin(a) * rr, g() * 0.8, 0];
  });
}

/* Scatter: a loose spherical cloud used as the intro state. */
export function scatter(N) {
  return make(N, 91, (i, r) => {
    const u = r() * TAU, v = Math.acos(2 * r() - 1), rr = 9 * Math.cbrt(r());
    return [rr * Math.sin(v) * Math.cos(u), rr * Math.sin(v) * Math.sin(u) * 0.6, rr * Math.cos(v), r() < 0.2 ? 1 : 0];
  });
}

/* Floor (Slide_V1): a softly rippling ground plane that stays low behind slide content. */
export function floor(N) {
  return make(N, 101, (i, r, g) => {
    const x = (r() - 0.5) * 34;
    const z = -18 + r() * 20;
    return [x, -4.2 + Math.sin(x * 0.4 + z * 0.3) * 0.25 + g() * 0.02, z, r() < 0.12 ? 1 : r() < 0.2 ? 3 : 0];
  });
}

export function buildShapes(N) {
  return {
    scatter: scatter(N),
    floor: floor(N),
    market: market(N),
    cake: cake(N, 1, 0.55),
    cakeBig: cake(N, 1.4, 0),
    split: split(N),
    network4: network(N, 4),
    network5: network(N, 5),
    qr: qr(N),
    cliff: cliff(N),
    ring: ring(N),
  };
}
