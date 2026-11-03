import * as THREE from 'three';
import { gsap } from 'gsap';
import GEO from './geo-vn.json';

/*
 * 09 · Dot globe (ported from Slide_V1 page 5): world land as grey dots, Viet Nam — including the
 * Hoàng Sa and Trường Sa archipelagos — lights up from dark to gold to blue, with light spikes.
 * Labels are DOM elements inside the [data-gl] box, projected every frame.
 */
const RAD = 2;
const LABELS = [
  { t: 'Hà Nội', lat: 21.03, lon: 105.85, left: true },
  { t: 'Đà Nẵng', lat: 16.05, lon: 108.2, left: true },
  { t: 'TP. Hồ Chí Minh', lat: 10.78, lon: 106.7, left: true },
  { t: 'QĐ Hoàng Sa (Việt Nam)', lat: 16.5, lon: 112.0, isl: true },
  { t: 'QĐ Trường Sa (Việt Nam)', lat: 9.8, lon: 114.0, isl: true },
];
const ll = (lat, lon, r = RAD) => {
  const ph = ((90 - lat) * Math.PI) / 180;
  const th = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th));
};
function dotTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 32;
  const g = c.getContext('2d');
  const r = g.createRadialGradient(16, 16, 0, 16, 16, 16);
  r.addColorStop(0, '#fff');
  r.addColorStop(0.5, 'rgba(255,255,255,.7)');
  r.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = r;
  g.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(c);
}

export function buildGlobe(el) {
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  const spin = new THREE.Group();
  const grp = new THREE.Group();
  spin.add(grp);
  scene.add(spin);

  grp.add(new THREE.Mesh(new THREE.SphereGeometry(RAD * 0.99, 64, 64), new THREE.MeshBasicMaterial({ color: 0x101318 })));
  const atm = new THREE.ShaderMaterial({
    uniforms: { c: { value: new THREE.Color(0x7fb3c8) } },
    vertexShader: 'varying vec3 vN; void main(){ vN=normalize(normalMatrix*normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader: 'uniform vec3 c; varying vec3 vN; void main(){ float i=pow(max(0.,0.68-dot(vN,vec3(0.,0.,1.))),3.2); gl_FragColor=vec4(c*i*.8,i*.7); }',
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(RAD * 1.16, 64, 64), atm));
  const gm = new THREE.LineBasicMaterial({ color: 0x2e333d, transparent: true, opacity: 0.45 });
  for (let lat = -60; lat <= 60; lat += 30) {
    const pts = [];
    for (let lon = -180; lon <= 180; lon += 3) pts.push(ll(lat, lon, RAD * 1.001));
    grp.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gm));
  }
  for (let lon = -180; lon < 180; lon += 30) {
    const pts = [];
    for (let lat = -90; lat <= 90; lat += 3) pts.push(ll(lat, lon, RAD * 1.001));
    grp.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gm));
  }
  const tex = dotTexture();

  // world land
  const L = GEO.land;
  const lp = new Float32Array((L.length / 2) * 3);
  for (let i = 0; i < L.length; i += 2) {
    const v = ll(L[i] / 10, L[i + 1] / 10, RAD * 1.002);
    lp.set([v.x, v.y, v.z], (i / 2) * 3);
  }
  const lg = new THREE.BufferGeometry();
  lg.setAttribute('position', new THREE.BufferAttribute(lp, 3));
  grp.add(new THREE.Points(lg, new THREE.PointsMaterial({ size: 0.03, map: tex, color: 0x6f747e, transparent: true, opacity: 0.8, depthWrite: false })));

  // Viet Nam mainland + Hoàng Sa + Trường Sa
  const pts = [];
  for (let i = 0; i < GEO.vn.length; i += 2) pts.push([GEO.vn[i] / 100, GEO.vn[i + 1] / 100]);
  const r = (a, b) => a + Math.random() * (b - a);
  for (let i = 0; i < 26; i++) pts.push([r(15.7, 17.1), r(111.2, 112.8)]);
  for (let i = 0; i < 46; i++) pts.push([r(7.8, 11.5), r(111.6, 115.6)]);
  const vnN = pts.length;
  const vp = new Float32Array(vnN * 3);
  const vc = new Float32Array(vnN * 3);
  const delay = new Float32Array(vnN);
  const target = new Float32Array(vnN);
  pts.forEach((q, i) => {
    const v = ll(q[0], q[1], RAD * 1.004);
    vp.set([v.x, v.y, v.z], i * 3);
    delay[i] = Math.random();
    target[i] = Math.random();
  });
  const vnGeo = new THREE.BufferGeometry();
  vnGeo.setAttribute('position', new THREE.BufferAttribute(vp, 3));
  vnGeo.setAttribute('color', new THREE.BufferAttribute(vc, 3));
  grp.add(new THREE.Points(vnGeo, new THREE.PointsMaterial({ size: 0.036, map: tex, vertexColors: true, transparent: true, depthWrite: false })));

  // light spikes (illustrative)
  const src = [[21.03, 105.85], [16.05, 108.2], [10.78, 106.7], [20.85, 106.68], [10.03, 105.78], [12.24, 109.19], [18.67, 105.69], [11.94, 108.44]];
  for (let i = 0; i < 22; i++) src.push(pts[Math.floor(Math.random() * (GEO.vn.length / 2))]);
  const spikeData = src.map((q, i) => {
    const a = ll(q[0], q[1], RAD * 1.004);
    return { a, dir: a.clone().normalize(), len: i < 8 ? 0.55 + Math.random() * 0.25 : 0.12 + Math.random() * 0.3 };
  });
  const sp = new Float32Array(src.length * 6);
  const sc = new Float32Array(src.length * 6);
  src.forEach((_, i) => sc.set([0.91, 0.71, 0.3, 0.5, 0.7, 0.78], i * 6));
  const sg = new THREE.BufferGeometry();
  sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  sg.setAttribute('color', new THREE.BufferAttribute(sc, 3));
  grp.add(new THREE.LineSegments(sg, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending })));

  // camera faces Viet Nam
  const c = ll(13.5, 108, 1).normalize();
  cam.position.copy(c.clone().multiplyScalar(5.6));
  cam.position.y += 0.25;
  cam.lookAt(ll(14, 108, RAD * 0.55));

  const box = document.createElement('div');
  box.className = 'glabels';
  el.appendChild(box);
  const labels = LABELS.map((o) => {
    const d = document.createElement('span');
    d.className = `glabel${o.isl ? ' isl' : ''}${o.left ? ' left' : ''}`;
    d.textContent = o.t;
    box.appendChild(d);
    return { ...o, el: d, v: ll(o.lat, o.lon, RAD * 1.01) };
  });

  const st = { p: 0, g: 0 };
  const dim = [0.16, 0.14, 0.12];
  const amb = [0.95, 0.72, 0.3];
  const cy = [0.5, 0.72, 0.8];
  const s = { scene, cam, spin, root: grp, tilt: 0.25 };
  s.enter = () => {
    st.p = 0;
    st.g = 0;
    gsap.to(st, { p: 1, duration: 3, ease: 'power1.inOut', delay: 0.5 });
    gsap.to(st, { g: 1, duration: 1.6, ease: 'expo.out', delay: 1.6 });
  };
  s.update = (t) => {
    grp.rotation.y = Math.sin(t * 0.22) * 0.1;
    const col = vnGeo.attributes.color.array;
    for (let i = 0; i < vnN; i++) {
      const k = Math.min(1, Math.max(0, (st.p * 1.4 - delay[i] * 0.9) / 0.5));
      let q;
      if (k < 0.5) { const u = k * 2; q = [dim[0] + (amb[0] - dim[0]) * u, dim[1] + (amb[1] - dim[1]) * u, dim[2] + (amb[2] - dim[2]) * u]; }
      else { const u = (k - 0.5) * 2 * target[i]; q = [amb[0] + (cy[0] - amb[0]) * u, amb[1] + (cy[1] - amb[1]) * u, amb[2] + (cy[2] - amb[2]) * u]; }
      const tw = 0.85 + 0.15 * Math.sin(t * 3 + i);
      col[i * 3] = q[0] * tw;
      col[i * 3 + 1] = q[1] * tw;
      col[i * 3 + 2] = q[2] * tw;
    }
    vnGeo.attributes.color.needsUpdate = true;
    spikeData.forEach((d, i) => {
      const e = d.a.clone().addScaledVector(d.dir, d.len * st.g * (0.9 + 0.1 * Math.sin(t * 2 + i)));
      sp.set([d.a.x, d.a.y, d.a.z, e.x, e.y, e.z], i * 6);
    });
    sg.attributes.position.needsUpdate = true;
    spin.updateMatrixWorld();
    const camDir = cam.position.clone().normalize();
    labels.forEach((o) => {
      const w = o.v.clone().applyMatrix4(grp.matrixWorld);
      const vis = w.clone().normalize().dot(camDir) > 0.15;
      const p = w.project(cam);
      o.el.style.left = `${((p.x + 1) / 2) * 100}%`;
      o.el.style.top = `${((1 - p.y) / 2) * 100}%`;
      o.el.style.opacity = vis ? Math.min(1, st.p * 1.5) : 0;
    });
  };
  return s;
}
