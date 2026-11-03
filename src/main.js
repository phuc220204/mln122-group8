import '@fontsource/oswald/500.css';
import '@fontsource/oswald/600.css';
import '@fontsource/oswald/700.css';
import '@fontsource/playfair-display/400-italic.css';
import '@fontsource/playfair-display/700.css';
import '@fontsource/be-vietnam-pro/300.css';
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/400-italic.css';
import '@fontsource/be-vietnam-pro/600.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/700.css';

import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/chrome.css';
import './styles/slides.css';

import { slides } from './slides/index.js';
import { Deck } from './deck/engine.js';
import { fitStage } from './deck/stage.js';
import { createUI } from './deck/ui.js';
import { states } from './three/states.js';

const stage = document.getElementById('stage');
const deck = new Deck(stage, slides);
fitStage(stage);
createUI(deck, stage, document.getElementById('ui'));

// Three.js is optional: the deck still works if WebGL is unavailable.
let scene = null;
import('./three/scene.js')
  .then(({ ParticleScene }) => {
    try {
      scene = new ParticleScene(document.getElementById('bg3d'));
      scene.setState(states[deck.current ? deck.current.scene : slides[0].scene]);
    } catch (e) {
      console.warn('WebGL unavailable – 3D background disabled', e);
    }
  });
deck.onChange((i) => scene && scene.setState(states[slides[i].scene]));

// Per-slide 3D objects (Slide_v1.1 / Slide_V1 props), drawn into each slide's [data-gl] box.
let gl = null;
let shownIdx = -1;
const syncGL = () => {
  if (!gl || deck.index === shownIdx) return;
  if (shownIdx >= 0) gl.hide(deck.els[shownIdx]);
  shownIdx = deck.index;
  gl.show(deck.els[shownIdx]);
};
import('./three/gl.js').then(({ createGL }) => {
  try {
    gl = createGL(document.getElementById('gl'));
    syncGL();
  } catch (e) {
    console.warn('WebGL unavailable – slide 3D objects disabled', e);
  }
});
deck.onChange(syncGL);

// Gentle photo parallax following the pointer.
window.addEventListener('pointermove', (e) => {
  const x = e.clientX / window.innerWidth - 0.5;
  const y = e.clientY / window.innerHeight - 0.5;
  stage.style.setProperty('--px', x.toFixed(3));
  stage.style.setProperty('--py', y.toFixed(3));
});

const start = parseInt(location.hash.slice(1), 10);
document.fonts.ready.then(() => deck.go(Number.isFinite(start) ? start - 1 : 0));

if (import.meta.env.DEV) {
  // Debug hooks: window.show(i, steps) jumps to a slide and fast-forwards every animation.
  import('gsap').then(({ gsap }) => {
    window.deck = deck;
    window.getGL = () => gl;
    window.getScene = () => scene;
    window.gsap = gsap;
    window.show = async (i, steps = 0) => {
      deck.go(i);
      for (let k = 0; k < steps; k++) deck.next();
      await new Promise((r) => setTimeout(r, 60));
      gsap.globalTimeline.getChildren(true, true, false).forEach((t) => { try { t.progress(1); } catch (e) { /* noop */ } });
      return deck.index;
    };
  });
}
