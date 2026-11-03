/*
 * 3D state per slide. shape = morph target; pos/rot/scale place the object;
 * opacity is kept low on text-dense slides; red tints a share of particles;
 * scan sweeps a data line across the QR matrix.
 */
const S = (shape, pos, rot, scale, opacity, extra = {}) => ({ shape, pos, rot, scale, opacity, ...extra });

export const states = {
  cover:      S('market',   [0.6, -3.4, -2], [0.42, -0.35, 0], 1.05, 0.85, { spin: 0.02 }),
  problem:    S('market',   [4.2, -1.6, 0], [0.62, 0.5, 0], 0.85, 0.75, { spin: 0.04 }),
  interest:   S('floor',    [0, 0, 0], [0, 0, 0], 1, 0.55, { spin: 0 }),
  unity:      S('split',    [0, 0.6, -3], [0.4, 0, 0], 0.95, 0.5, { spin: 0.04 }),
  factors:    S('floor',    [0, 0, 0], [0, 0, 0], 1, 0.5, { spin: 0 }),
  groups:     S('floor',    [0, 0, 0], [0, 0, 0], 1, 0.45, { spin: 0, red: 0.06 }),
  state:      S('floor',    [0, 0, 0], [0, 0, 0], 1, 0.45, { spin: 0 }),
  view1:      S('cake',     [0, -0.6, -2.5], [0.55, 0, 0], 1.0, 0.45, { spin: 0.05 }),
  policy:     S('floor',    [0, 0, 0], [0, 0, 0], 1, 0.3, { spin: 0 }),
  anatomy:    S('network5', [0, 0, -4.5], [0.12, 0, 0], 1.15, 0.24, { spin: 0.03, red: 0.18 }),
  risk:       S('cliff',    [0.4, 0, -3.5], [0.08, -0.25, 0], 1.0, 0.38, { spin: 0, red: 0.12 }),
  tools:      S('floor',    [0, 0, 0], [0, 0, 0], 1, 0.3, { spin: 0 }),
  results:    S('qr',       [0, 0, -4], [0.05, 0, 0], 1.0, 0.24, { spin: 0, scan: true }),
  view2:      S('split',    [0, 0.2, -3], [0.4, 0, 0], 0.95, 0.36, { spin: 0.03 }),
  solutions:  S('network5', [0, 0, -4.5], [0.12, 0, 0], 1.1, 0.28, { spin: 0.05 }),
  lesson1:    S('floor',    [0, 0, 0], [0, 0, 0], 1, 0.45, { spin: 0 }),
  lesson2:    S('cliff',    [0.2, -0.2, -3.5], [0.08, -0.2, 0], 1.0, 0.36, { spin: 0, red: 0.08 }),
  message:    S('cakeBig',  [0, -1.1, -1.5], [0.62, 0, 0], 1.0, 0.6, { spin: 0.08 }),
  refs:       S('ring',     [5.5, 0, -2], [0.3, -0.6, 0], 0.9, 0.22, { spin: 0.05 }),
};
