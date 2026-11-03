/*
 * Adaptive stage: the short side keeps the 1920×1080 design scale, the long side
 * stretches to fill the viewport (capped at 2.4:1 wide / 4:3 tall, beyond that it letterboxes).
 * Exposes --ex (extra width per side) and --ey (extra height) so CSS can rebalance margins.
 */
const BASE_W = 1920;
const BASE_H = 1080;
const MAX_WIDE = 2.4;
const MAX_TALL = 1.3;

export function fitStage(stage) {
  const api = {
    scale: 1,
    width: BASE_W,
    height: BASE_H,
    reservedBottom: () => 0,
    fit() {
      const W = window.innerWidth;
      const H = Math.max(200, window.innerHeight - api.reservedBottom());
      let w = BASE_W;
      let h = BASE_H;
      if (W / H >= BASE_W / BASE_H) {
        api.scale = H / BASE_H;
        w = Math.min(W / api.scale, BASE_H * MAX_WIDE);
      } else {
        api.scale = W / BASE_W;
        h = Math.min(H / api.scale, BASE_W / MAX_TALL);
      }
      api.width = w;
      api.height = h;
      stage.style.width = `${w}px`;
      stage.style.height = `${h}px`;
      stage.style.setProperty('--ex', `${(w - BASE_W) / 2}px`);
      stage.style.setProperty('--ey', `${h - BASE_H}px`);
      const cy = H / 2 - window.innerHeight / 2;
      stage.style.transform = `translate(-50%, calc(-50% + ${cy}px)) scale(${api.scale})`;
    },
  };
  window.addEventListener('resize', () => api.fit());
  api.fit();
  return api;
}
