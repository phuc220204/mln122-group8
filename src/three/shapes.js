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
    ring: ring(N),
  };
}
