import { gsap } from 'gsap';

export const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const nf = new Map();
export function fmt(value, decimals = 0) {
  if (!nf.has(decimals)) {
    nf.set(decimals, new Intl.NumberFormat('vi-VN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }));
  }
  return nf.get(decimals).format(value);
}

/* Wrap every word of .title into masked spans, keeping <em>/<b> nesting intact. */
export function splitTitles(root) {
  root.querySelectorAll('.title, [data-split]').forEach((el) => {
    if (el.dataset.splitDone) return;
    el.dataset.splitDone = '1';
    const walk = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === 3) {
          const parts = child.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach((p) => {
            if (!p) return;
            if (/^\s+$/.test(p)) frag.appendChild(document.createTextNode(' '));
            else {
              const w = document.createElement('span');
              w.className = 'w';
              const wi = document.createElement('span');
              wi.className = 'wi';
              wi.textContent = p;
              w.appendChild(wi);
              frag.appendChild(w);
            }
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1 && !child.classList.contains('w')) {
          walk(child);
        }
      });
    };
    walk(el);
  });
}

/* Animate a [data-count] element from 0 to its target. */
export function countTo(el, tl, at = 0) {
  const target = parseFloat(el.dataset.count);
  const dec = parseInt(el.dataset.decimals || '0', 10);
  const from = parseFloat(el.dataset.from || '0');
  const obj = { v: from };
  const dur = parseFloat(el.dataset.dur || '1.8');
  el.textContent = fmt(from, dec);
  tl.to(obj, {
    v: target,
    duration: reduced ? 0.01 : dur,
    ease: 'power3.out',
    onUpdate: () => { el.textContent = fmt(obj.v, dec); },
    onComplete: () => { el.textContent = fmt(target, dec); },
  }, at);
}

/* Prepare an SVG path for stroke drawing. */
export function drawPath(path, tl, at, dur = 1.2) {
  const len = path.getTotalLength ? path.getTotalLength() : 600;
  gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
  tl.to(path, { strokeDashoffset: 0, duration: reduced ? 0.01 : dur, ease: 'power2.inOut' }, at);
}

const FROM = {
  up: { y: 34, autoAlpha: 0 },
  down: { y: -24, autoAlpha: 0 },
  left: { x: -40, autoAlpha: 0 },
  right: { x: 40, autoAlpha: 0 },
  scale: { scale: 0.92, autoAlpha: 0 },
  fade: { autoAlpha: 0 },
  flip: { rotationX: -70, y: 30, autoAlpha: 0, transformOrigin: '50% 0%' },
  wipe: { clipPath: 'inset(0 100% 0 0)', autoAlpha: 1 },
};

/*
 * Generic entrance choreography:
 * kicker → title words → [data-a] in DOM order (stagger) → wires → counters → footer.
 */
export function buildEnter(slideEl) {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: reduced ? 0.01 : 0.8 } });
  const k = slideEl.querySelector('.kicker');
  if (k) tl.from(k, { x: -24, autoAlpha: 0, duration: 0.6 }, 0.05);

  const words = slideEl.querySelectorAll('.title .wi');
  if (words.length) tl.from(words, { yPercent: 112, duration: reduced ? 0.01 : 1.1, stagger: 0.035, ease: 'expo.out' }, 0.12);

  const items = [...slideEl.querySelectorAll('[data-a]')].filter((n) => !n.closest('[data-step]'));
  let t = words.length ? 0.45 : 0.15;
  items.forEach((n) => {
    const kind = n.dataset.a || 'up';
    const delay = parseFloat(n.dataset.d || '0');
    tl.from(n, { ...FROM[kind] }, t + delay);
    t += parseFloat(n.dataset.gap || '0.07');
  });

  slideEl.querySelectorAll('path[data-draw]').forEach((p) => {
    if (p.closest('[data-step]')) return;
    drawPath(p, tl, parseFloat(p.dataset.draw) || 0.6, parseFloat(p.dataset.dur || '1.2'));
  });
  slideEl.querySelectorAll('[data-count]').forEach((c) => {
    if (c.closest('[data-step]')) return;
    countTo(c, tl, parseFloat(c.dataset.at || '0.5'));
  });
  // watermark years count up (Slide_V1: data-wm-from → data-wm-to)
  slideEl.querySelectorAll('[data-wm-from]').forEach((el) => {
    const o = { v: +el.dataset.wmFrom };
    el.textContent = o.v;
    tl.to(o, { v: +el.dataset.wmTo, duration: reduced ? 0.01 : 2.2, ease: 'power2.inOut', onUpdate: () => { el.textContent = Math.round(o.v); } }, 0.6);
  });
  const foot = slideEl.querySelector('.foot');
  if (foot) tl.from(foot, { autoAlpha: 0, y: 10, duration: 0.6 }, Math.min(t, 1.4));
  return tl;
}

/*
 * Steps work like Slide_V1: an idea that is not reached yet stays visible but dim and blurred,
 * and lights up when the presenter clicks / presses →.
 */
const DIM = { autoAlpha: 0.12, y: 0, filter: 'blur(3px)' };

export function revealStep(slideEl, n) {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: reduced ? 0.01 : 0.75 } });
  slideEl.querySelectorAll(`[data-step="${n}"]`).forEach((g) => {
    gsap.killTweensOf(g);
    tl.fromTo(g, { autoAlpha: 0.12, y: 26, filter: 'blur(6px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)' }, 0);
    g.querySelectorAll('[data-count]').forEach((c) => countTo(c, tl, 0.2));
    g.querySelectorAll('path[data-draw]').forEach((p) => drawPath(p, tl, 0.15));
  });
  // keep the revealed state inline: clearing it would let the dim [data-step] CSS default apply again
  tl.eventCallback('onComplete', () => slideEl.querySelectorAll(`[data-step="${n}"]`).forEach((g) => gsap.set(g, { autoAlpha: 1, filter: 'none' })));
  return tl;
}

/* Dim every step from `fromN` on (used on entry and when stepping back). */
export function hideSteps(slideEl, fromN = 1) {
  slideEl.querySelectorAll('[data-step]').forEach((g) => {
    if (parseInt(g.dataset.step, 10) < fromN) return;
    gsap.killTweensOf(g);
    gsap.set(g, DIM);
  });
}
