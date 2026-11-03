import { gsap } from 'gsap';
import { buildEnter, revealStep, hideSteps, splitTitles, reduced } from '../components/anim.js';

/*
 * Deck engine: renders slide modules into the stage, owns the current index/step,
 * and runs enter/leave choreography. Listeners subscribe via onChange.
 */
export class Deck {
  constructor(stage, slides) {
    this.stage = stage;
    this.slides = slides;
    this.els = [];
    this.index = -1;
    this.step = 0;
    this.listeners = [];
    this.enterTl = null;

    slides.forEach((s, i) => {
      const el = document.createElement('section');
      el.className = `slide s${String(i + 1).padStart(2, '0')} ${s.cls || ''}`;
      el.dataset.index = i;
      el.setAttribute('aria-label', `${String(i + 1).padStart(2, '0')} · ${s.title}`);
      el.innerHTML = s.html;
      stage.appendChild(el);
      this.els.push(el);
    });
    splitTitles(stage);
    stage.querySelectorAll('.photo img').forEach((img) => {
      const fail = () => img.closest('.photo').classList.add('broken');
      img.addEventListener('error', fail);
      if (img.complete && img.naturalWidth === 0) fail();
    });
    slides.forEach((s, i) => s.mount && s.mount(this.els[i], this));
  }

  get current() { return this.slides[this.index]; }
  get currentEl() { return this.els[this.index]; }
  stepsOf(i) { return this.slides[i].steps || 0; }

  onChange(fn) { this.listeners.push(fn); }
  emit() { this.listeners.forEach((fn) => fn(this.index, this.step)); }

  go(i, { dir, toStep = 0 } = {}) {
    i = Math.max(0, Math.min(this.slides.length - 1, i));
    if (i === this.index) return;
    const prev = this.index;
    const prevEl = this.els[prev];
    const nextEl = this.els[i];
    const d = dir ?? (i > prev ? 1 : -1);

    if (this.enterTl) this.enterTl.progress(1).kill();
    gsap.killTweensOf(nextEl);

    if (prevEl) {
      const leaving = prevEl;
      // stop its own (possibly unfinished) fade-in so it can't resurface after leaving
      gsap.killTweensOf(leaving);
      leaving.style.pointerEvents = 'none';
      const s = this.slides[prev];
      gsap.to(leaving, {
        autoAlpha: 0,
        y: -14 * d,
        scale: 0.985,
        filter: 'blur(6px)',
        duration: reduced ? 0.01 : 0.4,
        ease: 'power2.in',
        onComplete: () => {
          leaving.classList.remove('is-active');
          gsap.set(leaving, { clearProps: 'all' });
          s.leave && s.leave(leaving);
        },
      });
    }

    this.index = i;
    this.step = 0;
    hideSteps(nextEl, 1);
    nextEl.classList.add('is-active');
    gsap.fromTo(nextEl, { autoAlpha: 0, y: 30 * d, filter: 'blur(8px)' },
      { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: reduced ? 0.01 : 0.7, delay: prevEl ? 0.25 : 0, ease: 'power3.out',
        onComplete: () => gsap.set(nextEl, { clearProps: 'filter,transform' }) });

    const tl = buildEnter(nextEl);
    tl.delay(prevEl ? 0.3 : 0.1);
    const s = this.slides[i];
    if (s.enter) s.enter(nextEl, tl, this);
    this.enterTl = tl;

    s.onStep && s.onStep(nextEl, 0);
    for (let k = 1; k <= toStep; k++) this.showStep(k, true);
    history.replaceState(null, '', `#${i + 1}`);
    this.emit();
  }

  showStep(n, instant = false) {
    const el = this.currentEl;
    const tl = revealStep(el, n);
    if (instant) tl.progress(1);
    this.step = n;
    const s = this.current;
    s.onStep && s.onStep(el, n);
  }

  next() {
    if (this.step < this.stepsOf(this.index)) {
      this.showStep(this.step + 1);
      this.emit();
    } else if (this.index < this.slides.length - 1) {
      this.go(this.index + 1, { dir: 1 });
    }
  }

  prev() {
    if (this.step > 0) {
      hideSteps(this.currentEl, this.step);
      this.step -= 1;
      this.current.onStep && this.current.onStep(this.currentEl, this.step);
      this.emit();
    } else if (this.index > 0) {
      const target = this.index - 1;
      this.go(target, { dir: -1, toStep: this.stepsOf(target) });
    }
  }
}
