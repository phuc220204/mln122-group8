import * as THREE from 'three';
import { gsap } from 'gsap';
import { buildGlobe } from './globe.js';

/*
 * 3D props ported from the reference decks (Slide_v1.1 coins / scale / receipt, Slide_V1 towers),
 * recoloured to the deck palette. Every label drawn inside a prop uses wording from the content file.
 */
export const C = { paper: 0xece6da, paper2: 0xd9d2c4, dark: 0x24262c, bg: 0x0a0b0d, gold: 0xe9b44c, red: 0xe5383b, muted: 0x8b8780, blue: 0x7fb3c8 };
const M = {
  paper: new THREE.MeshStandardMaterial({ color: C.paper2, roughness: 0.92 }),
  dark: new THREE.MeshStandardMaterial({ color: C.dark, roughness: 0.85 }),
  gold: new THREE.MeshStandardMaterial({ color: C.gold, roughness: 0.38, metalness: 0.25, emissive: 0x2a1a00 }),
  red: new THREE.MeshStandardMaterial({ color: C.red, roughness: 0.55, emissive: 0x200400 }),
};
const rnd = (a, b) => a + Math.random() * (b - a);

export const edge = (g, col = C.paper, op = 0.55) =>
  new THREE.LineSegments(new THREE.EdgesGeometry(g, 20), new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: op }));

function solid(g, mat, ecol, eop) {
  const m = new THREE.Mesh(g, mat);
  if (ecol !== undefined) m.add(edge(g, ecol, eop));
  return m;
}

export function canvasTex(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.anisotropy = 8;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function label(text, { size = 60, color = '#ece6da', weight = 600, family = 'Be Vietnam Pro', pad = 16, scale = 0.005, italic = false } = {}) {
  const font = `${italic ? 'italic ' : ''}${weight} ${size}px "${family}"`;
  const c = document.createElement('canvas');
  const x = c.getContext('2d');
  x.font = font;
  const w = Math.ceil(x.measureText(text).width) + pad * 2;
  const h = Math.ceil(size * 1.45) + pad * 2;
  c.width = w;
  c.height = h;
  x.font = font;
  x.fillStyle = color;
  x.textBaseline = 'middle';
  x.fillText(text, pad, h / 2 + size * 0.04);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false }));
  s.scale.set(w * scale, h * scale, 1);
  return s;
}

/* Scene skeleton shared by every prop: warm key light, red rim light, spin (drag) + root groups. */
export function base({ fov = 34, pos = [0, 0, 9], look = [0, 0, 0], fog = true } = {}) {
  const scene = new THREE.Scene();
  if (fog) scene.fog = new THREE.Fog(C.bg, 14, 30);
  const cam = new THREE.PerspectiveCamera(fov, 1, 0.1, 100);
  cam.position.set(...pos);
  cam.lookAt(...look);
  scene.add(new THREE.HemisphereLight(0xfff0d8, 0x1a120c, 0.75));
  const key = new THREE.DirectionalLight(0xffe2b8, 1.15);
  key.position.set(4, 7, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(C.red, 0.55);
  rim.position.set(-6, -1, -5);
  scene.add(rim);
  const spin = new THREE.Group();
  const root = new THREE.Group();
  spin.add(root);
  scene.add(spin);
  return { scene, cam, spin, root, update() {} };
}

/* 03 · Lợi ích vật chất: a stack of coins drops in, a big ₫ coin spins beside it. */
function coins() {
  const s = base({ pos: [0, 2.4, 8], look: [0, 0.3, 0] });
  const stack = [];
  const cg = new THREE.CylinderGeometry(0.85, 0.85, 0.16, 56);
  for (let i = 0; i < 9; i++) {
    const c = solid(cg, M.gold, 0x5a3a0a, 0.5);
    c.position.set(-0.9 + rnd(-0.06, 0.06), -1.3 + i * 0.17, rnd(-0.06, 0.06));
    c.userData.y = c.position.y;
    s.root.add(c);
    stack.push(c);
  }
  const face = canvasTex(256, 256, (x, w, h) => {
    x.fillStyle = '#e9b44c';
    x.fillRect(0, 0, w, h);
    x.strokeStyle = '#8a5d12';
    x.lineWidth = 8;
    x.beginPath();
    x.arc(w / 2, h / 2, 108, 0, 7);
    x.stroke();
    x.fillStyle = '#6b450a';
    x.font = '700 130px "Playfair Display"';
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    x.fillText('₫', w / 2, h / 2 + 6);
  });
  const faceMat = new THREE.MeshStandardMaterial({ map: face, roughness: 0.4, metalness: 0.2 });
  const big = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.2, 64), [M.gold, faceMat, faceMat]);
  big.rotation.x = Math.PI / 2;
  const bigG = new THREE.Group();
  bigG.add(big);
  bigG.position.set(1.3, 0.5, 0);
  s.root.add(bigG);
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(2.6, 48), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.25 }));
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -1.4;
  s.root.add(shadow);
  s.enter = () => stack.forEach((c, i) => gsap.fromTo(c.position, { y: c.userData.y + 5 }, { y: c.userData.y, duration: 0.9, delay: 0.1 + i * 0.08, ease: 'bounce.out' }));
  s.update = (t) => {
    bigG.rotation.y = t * 0.9;
    bigG.position.y = 0.6 + Math.sin(t * 1.2) * 0.12;
  };
  return s;
}

/* 07 · Cán cân lợi ích: the beam swings, damps out and settles, then repeats. */
function scale() {
  const s = base({ pos: [0, 1, 9.5], look: [0, 0.4, 0] });
  const R = s.root;
  const foot = solid(new THREE.CylinderGeometry(0.9, 1.1, 0.25, 48), M.dark, C.paper, 0.4);
  foot.position.y = -1.7;
  R.add(foot);
  R.add(solid(new THREE.CylinderGeometry(0.07, 0.07, 3.3, 12), M.paper));
  const top = new THREE.Mesh(new THREE.SphereGeometry(0.16, 24, 16), M.gold);
  top.position.y = 1.68;
  R.add(top);
  const beam = new THREE.Group();
  beam.position.y = 1.6;
  beam.add(solid(new THREE.BoxGeometry(4, 0.08, 0.12), M.paper));
  R.add(beam);
  const lineMat = new THREE.LineBasicMaterial({ color: C.paper, transparent: true, opacity: 0.5 });
  const pans = [-2, 2].map((x, i) => {
    const g = new THREE.Group();
    const pan = solid(new THREE.CylinderGeometry(0.75, 0.5, 0.12, 40), M.dark, i ? C.paper : C.gold, 0.8);
    pan.position.y = -1.3;
    g.add(pan);
    [0, 2.09, 4.19].forEach((a) => {
      g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(Math.cos(a) * 0.68, -1.26, Math.sin(a) * 0.68)]), lineMat));
    });
    if (i === 0) {
      for (let k = 0; k < 4; k++) {
        const c = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.07, 32), M.gold);
        c.position.set(rnd(-0.15, 0.15), -1.2 + k * 0.075, rnd(-0.15, 0.15));
        g.add(c);
      }
    } else {
      const b1 = solid(new THREE.BoxGeometry(0.5, 0.32, 0.4), M.paper, C.bg, 0.5);
      b1.position.y = -1.07;
      const b2 = solid(new THREE.BoxGeometry(0.3, 0.22, 0.3), M.red, C.bg, 0.5);
      b2.position.set(0.05, -0.8, 0);
      b2.rotation.y = 0.4;
      g.add(b1, b2);
    }
    g.userData.x = x;
    R.add(g);
    return g;
  });
  const l1 = label('LỢI ÍCH CÁ NHÂN', { size: 34, color: '#e9b44c', scale: 0.0062 });
  const l2 = label('LỢI ÍCH XÃ HỘI', { size: 34, color: '#ece6da', scale: 0.0062 });
  R.add(l1, l2);
  let t0 = 0;
  s.enter = () => { t0 = -1; };
  s.update = (t) => {
    if (t0 < 0) t0 = t;
    const tau = (t - t0) % 8;
    const a = 0.32 * Math.exp(-0.55 * tau) * Math.cos(2.1 * tau);
    beam.rotation.z = a;
    pans.forEach((g) => g.position.set(Math.cos(a) * g.userData.x, 1.6 + Math.sin(a) * g.userData.x, 0));
    l1.position.set(pans[0].position.x, pans[0].position.y - 1.95, 0);
    l2.position.set(pans[1].position.x, pans[1].position.y - 1.95, 0);
    s.root.rotation.y = Math.sin(t * 0.3) * 0.35;
  };
  return s;
}

/* 16 · "Có hóa đơn": a printer feeds out a receipt listing the four self-check questions. */
function receipt() {
  const s = base({ pos: [0, 1.1, 9.8], look: [0, 0.7, 0] });
  const printer = solid(new THREE.BoxGeometry(2.3, 0.75, 1.1), M.dark, C.paper, 0.5);
  printer.position.y = 2.5;
  s.root.add(printer);
  const slot = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.05, 0.02), new THREE.MeshBasicMaterial({ color: 0x000000 }));
  slot.position.set(0, 2.16, 0.56);
  s.root.add(slot);
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 8), new THREE.MeshBasicMaterial({ color: C.gold }));
  led.position.set(0.9, 2.6, 0.56);
  s.root.add(led);
  const rows = ['Chính đáng?', 'Hại ai?', 'Minh bạch?', 'Bền vững?'];
  const tex = canvasTex(320, 900, (x, w) => {
    x.fillStyle = '#ece6da';
    x.fillRect(0, 0, w, 900);
    x.fillStyle = '#14100c';
    x.textAlign = 'center';
    x.font = '700 34px "Playfair Display"';
    x.fillText('HÓA ĐƠN', w / 2, 70);
    const dash = (y) => { x.setLineDash([6, 6]); x.strokeStyle = '#9c907c'; x.beginPath(); x.moveTo(20, y); x.lineTo(w - 20, y); x.stroke(); x.setLineDash([]); };
    dash(105);
    rows.forEach((r, i) => {
      x.textAlign = 'left';
      x.fillStyle = '#14100c';
      x.font = '600 23px "Be Vietnam Pro"';
      x.fillText(r, 24, 160 + i * 52);
      x.textAlign = 'right';
      x.fillStyle = '#b98620';
      x.font = '600 24px "Be Vietnam Pro"';
      x.fillText('✔', w - 24, 160 + i * 52);
    });
    dash(355);
    for (let i = 0; i < 34; i++) { x.fillStyle = '#14100c'; x.fillRect(30 + i * 7.6, 400, (i * 7) % 3 + 2, 80); }
    x.strokeStyle = '#e5383b';
    x.lineWidth = 4;
    x.beginPath();
    x.arc(w / 2, 640, 70, 0, 7);
    x.stroke();
  });
  const geo = new THREE.PlaneGeometry(1.5, 4.2, 1, 50);
  const clip = new THREE.Plane(new THREE.Vector3(0, -1, 0), 2.14);
  const strip = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: tex, side: THREE.DoubleSide, roughness: 0.95, clippingPlanes: [clip] }));
  strip.position.z = 0.5;
  s.root.add(strip);
  const base0 = geo.attributes.position.array.slice();
  const st = { y: 4.3 };
  s.enter = () => gsap.fromTo(st, { y: 4.3 }, { y: 0.05, duration: 3.2, ease: 'power1.inOut', delay: 0.3 });
  s.update = (t) => {
    strip.position.y = st.y;
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const k = Math.max(0, 2.1 - (base0[i * 3 + 1] + st.y));
      p.setZ(i, Math.sin(k * 1.6 + t * 1.2) * 0.06 * k + k * k * 0.04);
    }
    p.needsUpdate = true;
    geo.computeVertexNormals();
    led.material.color.setHex(Math.sin(t * 6) > 0 ? C.gold : C.dark);
    s.root.rotation.y = Math.sin(t * 0.4) * 0.25;
  };
  return s;
}

/*
 * 06 · Lợi ích nhóm (built on Slide_v1.1 "shells"): cá nhân at the core, the nhóm octahedron around it,
 * the xã hội shell outside. A red quyền lực tetrahedron hides behind the group and only shows itself
 * (with control lines into the group) once the slide reveals "Thường không lộ diện".
 */
function powerShells() {
  const s = base({ pos: [0, 0.3, 8.2], look: [0, 0, 0] });
  const R = s.root;
  const society = edge(new THREE.IcosahedronGeometry(2.2, 1), C.blue, 0.28);
  const groupGeo = new THREE.OctahedronGeometry(1.35, 0);
  const groupLine = new THREE.LineBasicMaterial({ color: C.gold, transparent: true, opacity: 0.9 });
  const group = new THREE.LineSegments(new THREE.EdgesGeometry(groupGeo), groupLine);
  const groupFill = new THREE.Mesh(groupGeo, new THREE.MeshStandardMaterial({ color: C.gold, transparent: true, opacity: 0.08, roughness: 0.5, depthWrite: false }));
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.5, 48, 32), M.paper);
  const powerMat = new THREE.MeshStandardMaterial({ color: C.red, emissive: 0x5a0a08, roughness: 0.45, transparent: true, opacity: 0 });
  const power = new THREE.Mesh(new THREE.TetrahedronGeometry(0.6, 0), powerMat);
  const powerEdge = edge(power.geometry, C.red, 0);
  power.add(powerEdge);
  R.add(society, groupFill, group, core, power);

  // "đứng sau": thin control lines from the hidden power into three corners of the group
  const anchors = [new THREE.Vector3(0, 1.35, 0), new THREE.Vector3(1.35, 0, 0), new THREE.Vector3(0, 0, -1.35)];
  const beamPos = new Float32Array(anchors.length * 6);
  const beamGeo = new THREE.BufferGeometry();
  beamGeo.setAttribute('position', new THREE.BufferAttribute(beamPos, 3));
  const beamMat = new THREE.LineBasicMaterial({ color: C.red, transparent: true, opacity: 0, blending: THREE.AdditiveBlending });
  R.add(new THREE.LineSegments(beamGeo, beamMat));

  const lSoc = label('XÃ HỘI', { size: 40, color: '#7fb3c8', scale: 0.006 });
  const lGroup = label('NHÓM', { size: 40, color: '#e9b44c', scale: 0.006 });
  const lCore = label('CÁ NHÂN', { size: 34, color: '#ece6da', scale: 0.0055 });
  const lPower = label('QUYỀN LỰC', { size: 40, color: '#e5383b', scale: 0.006 });
  lSoc.position.set(-2.7, 1.55, 0);
  lGroup.position.set(-2.15, -1.05, 0);
  lCore.position.set(0, -0.82, 1.3);
  lPower.position.set(2.45, -1.35, 0);
  lPower.material.opacity = 0;
  R.add(lSoc, lGroup, lCore, lPower);

  const gold = new THREE.Color(C.gold);
  const red = new THREE.Color(C.red);
  const st = { neg: 0 };
  s.setMode = (mode) => gsap.to(st, { neg: mode === 'neg' ? 1 : 0, duration: 0.8, ease: 'power2.inOut', overwrite: true });
  s.enter = () => {
    gsap.killTweensOf(st);
    st.neg = 0;
    // timed with the slide's "Thường không lộ diện" un-redaction
    gsap.to(st, { neg: 1, duration: 1.4, ease: 'power2.inOut', delay: 2.4 });
  };
  s.update = (t) => {
    const n = st.neg;
    society.rotation.y = t * 0.12;
    society.rotation.x = t * 0.05;
    group.rotation.set(0, -t * 0.3, t * 0.1);
    groupFill.rotation.copy(group.rotation);
    core.scale.setScalar(1 + Math.sin(t * 1.6) * 0.04);
    // the power sits behind the group (away from the camera) and drifts there
    power.position.set(0.85 + Math.cos(t * 0.5) * 0.25, 0.15 + Math.sin(t * 0.9) * 0.15, -1.9);
    power.rotation.set(t * 0.8, t * 0.6, 0);
    power.scale.setScalar((0.7 + 0.3 * n) * (1 + Math.sin(t * 3) * 0.06 * n));
    powerMat.opacity = 0.95 * n;
    powerMat.emissiveIntensity = 0.6 + 0.4 * Math.sin(t * 5) * n;
    powerEdge.material.opacity = 0.8 * n;
    group.updateMatrix();
    anchors.forEach((a, i) => {
      const w = a.clone().applyMatrix4(group.matrix);
      beamPos.set([power.position.x, power.position.y, power.position.z, w.x, w.y, w.z], i * 6);
    });
    beamGeo.attributes.position.needsUpdate = true;
    beamMat.opacity = n * (0.45 + 0.2 * Math.sin(t * 6));
    groupLine.color.copy(gold).lerp(red, n * 0.65);
    lPower.material.opacity = n;
  };
  return s;
}

/* 12 · Ngưỡng (Slide_V1 towers): the 500 triệu threshold of NĐ 68 and the 1 tỷ threshold of NĐ 141 rise up. */
function towers() {
  const s = base({ fov: 32, pos: [0, 5.2, 13.5], look: [0, 2.1, 0], fog: false });
  const grid = new THREE.GridHelper(12, 24, 0x3a3f4a, 0x1c1f25);
  grid.material.transparent = true;
  grid.material.opacity = 0.7;
  s.root.add(grid);
  const DATA = [
    { v: 500, top: '500 triệu', cap: 'NĐ 68/2026', c: C.paper2, x: -1.7 },
    { v: 1000, top: '1 tỷ', cap: 'NĐ 141/2026', c: C.gold, x: 1.7, hl: true },
  ];
  const items = DATA.map((o) => {
    const g = new THREE.BoxGeometry(1.5, 1, 1.5);
    g.translate(0, 0.5, 0);
    const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ color: o.c, emissive: o.c, emissiveIntensity: o.hl ? 0.35 : 0.1, roughness: 0.4, transparent: true, opacity: o.hl ? 0.92 : 0.8 }));
    m.add(new THREE.LineSegments(new THREE.EdgesGeometry(g), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 })));
    m.position.x = o.x;
    m.scale.y = 0.001;
    s.root.add(m);
    const glow = new THREE.Mesh(new THREE.CircleGeometry(1.4, 40), new THREE.MeshBasicMaterial({ color: o.c, transparent: true, opacity: o.hl ? 0.35 : 0.12, blending: THREE.AdditiveBlending, depthWrite: false }));
    glow.rotation.x = -Math.PI / 2;
    glow.position.set(o.x, 0.02, 0);
    s.root.add(glow);
    const lt = label(o.top, { size: 64, family: 'Oswald', weight: 600, color: o.hl ? '#e9b44c' : '#ece6da', scale: 0.0075 });
    const lc = label(o.cap, { size: 30, family: 'JetBrains Mono', weight: 500, color: '#8b8780', scale: 0.0075 });
    s.root.add(lt, lc);
    return { m, o, lt, lc, h: (o.v / 1000) * 4.2 };
  });
  s.tilt = 0.6;
  s.enter = () => items.forEach((it, k) => {
    gsap.killTweensOf(it.m.scale);
    gsap.fromTo(it.m.scale, { y: 0.001 }, { y: it.h, duration: 1.6, ease: 'expo.out', delay: 0.4 + k * 0.3 });
  });
  s.update = (t) => {
    s.root.rotation.y = Math.sin(t * 0.25) * 0.3;
    items.forEach((it) => {
      const y = it.m.scale.y;
      it.lt.position.set(it.o.x, y + 0.6, 0);
      it.lc.position.set(it.o.x, y + 0.15, 0);
      const vis = Math.min(1, y / it.h);
      it.lt.material.opacity = vis;
      it.lc.material.opacity = vis;
    });
  };
  return s;
}

export const BUILDERS = { coins, scale, receipt, towers, powerShells, globe: buildGlobe };
