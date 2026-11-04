/*
 * 3D state per slide. shape = morph target; pos/rot/scale place the object;
 * opacity is kept low on text-dense slides.
 */
const S = (shape, pos, rot, scale, opacity, extra = {}) => ({ shape, pos, rot, scale, opacity, ...extra });

// slides without the particle field: it fades out and keeps its last shape
const HIDDEN = { hidden: true };

export const states = {
  cover:      S('market',   [0.6, -3.4, -2], [0.42, -0.35, 0], 1.05, 0.85, { spin: 0.02 }),
  problem:    HIDDEN,
  interest:   HIDDEN,
  unity:      HIDDEN,
  factors:    HIDDEN,
  groups:     HIDDEN,
  state:      HIDDEN,
  view1:      HIDDEN,
  policy:     S('floor',    [0, 0, 0], [0, 0, 0], 1, 0.3, { spin: 0 }),
  anatomy:    HIDDEN,
  risk:       HIDDEN,
  tools:      HIDDEN,
  results:    HIDDEN,
  view2:      HIDDEN,
  solutions:  HIDDEN,
  lesson1:    HIDDEN,
  lesson2:    HIDDEN,
  message:    HIDDEN,
  refs:       S('ring',     [5.5, 0, -2], [0.3, -0.6, 0], 0.9, 0.22, { spin: 0.05 }),
};
