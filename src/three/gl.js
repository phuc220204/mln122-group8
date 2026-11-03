import * as THREE from 'three';
import { gsap } from 'gsap';
import { BUILDERS } from './props.js';
import { reduced } from '../components/anim.js';

/*
 * Per-slide 3D objects (ported from Slide_v1.1): one renderer, one scene per [data-gl] box,
 * drawn with scissor into that box's on-screen rect, so it follows the scaled stage.
 * Scenes are built lazily on first visit and only rendered while their slide is shown.
 */
export function createGL(canvas) {
  const R = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  R.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  R.setSize(window.innerWidth, window.innerHeight, false);
  R.setScissorTest(true);
  R.setClearColor(0x000000, 0);
  R.localClippingEnabled = true;

  const built = {};
  const active = new Set();
  const clock = new THREE.Clock();

  function bindDrag(s) {
    const el = s.el;
    let down = false;
    let lx = 0;
    let ly = 0;
    el.addEventListener('pointerdown', (e) => { down = true; lx = e.clientX; ly = e.clientY; el.setPointerCapture(e.pointerId); });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      s.drag.px = (e.clientX - r.left) / r.width - 0.5;
      s.drag.py = (e.clientY - r.top) / r.height - 0.5;
      if (!down) return;
      s.drag.tx += (e.clientX - lx) * 0.008;
      s.drag.ty = Math.max(-0.8, Math.min(0.8, s.drag.ty + (e.clientY - ly) * 0.006));
      lx = e.clientX;
      ly = e.clientY;
    });
    el.addEventListener('pointerup', () => { down = false; });
    el.addEventListener('pointerleave', () => { s.drag.px = 0; s.drag.py = 0; });
  }

  function get(slideEl) {
    const el = slideEl && slideEl.querySelector('[data-gl]');
    if (!el || !BUILDERS[el.dataset.gl]) return null;
    const k = el.dataset.gl;
    if (!built[k]) {
      const s = BUILDERS[k](el);
      Object.assign(s, { key: k, el, drag: { x: 0, y: 0, tx: 0, ty: 0, px: 0, py: 0 } });
      bindDrag(s);
      built[k] = s;
    }
    return built[k];
  }

  function show(slideEl) {
    const s = get(slideEl);
    if (!s) return;
    active.add(s);
    if (s.leaving) s.leaving.kill();
    s.leaving = null;
    gsap.fromTo(s.spin.scale, { x: 0.001, y: 0.001, z: 0.001 }, { x: 1, y: 1, z: 1, duration: reduced ? 0.01 : 1.4, ease: 'expo.out' });
    s.drag.tx = 0;
    s.drag.ty = 0;
    if (s.enter) s.enter();
  }

  function hide(slideEl) {
    const s = get(slideEl);
    if (!s || !active.has(s)) return;
    if (s.leave) s.leave();
    s.leaving = gsap.to(s.spin.scale, { x: 0.001, y: 0.001, z: 0.001, duration: reduced ? 0.01 : 0.4, ease: 'power2.in', onComplete: () => active.delete(s) });
  }

  window.addEventListener('resize', () => R.setSize(window.innerWidth, window.innerHeight, false));
  // slides can replay a prop's entrance (e.g. when the step holding it is revealed)
  window.addEventListener('gl:replay', (e) => { const s = built[e.detail]; if (s && active.has(s) && s.enter) s.enter(); });
  // ...or switch a prop between states (e.g. hovering the positive / negative card)
  window.addEventListener('gl:mode', (e) => { const s = built[e.detail.key]; if (s && s.setMode) s.setMode(e.detail.mode); });

  function loop() {
    requestAnimationFrame(loop);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    R.setScissor(0, 0, window.innerWidth, window.innerHeight);
    R.clear();
    active.forEach((s) => {
      // a box inside a still-dimmed step stays dark until that step is revealed
      const step = s.el.closest('[data-step]');
      if (step && +getComputedStyle(step).opacity < 0.5) return;
      const r = s.el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return;
      const y = window.innerHeight - r.bottom;
      R.setViewport(r.left, y, r.width, r.height);
      R.setScissor(r.left, y, r.width, r.height);
      s.cam.aspect = r.width / r.height;
      s.cam.updateProjectionMatrix();
      const d = s.drag;
      d.x += (d.tx - d.x) * 0.08;
      d.y += (d.ty - d.y) * 0.08;
      const br = s.baseRot || [0, 0];
      const tilt = s.tilt ?? 1;
      s.spin.rotation.y = br[1] + d.x + d.px * 0.35 * tilt;
      s.spin.rotation.x = br[0] + d.y + d.py * 0.2 * tilt;
      s.update(t, dt);
      R.render(s.scene, s.cam);
    });
  }
  loop();

  return { show, hide, built };
}
