import * as THREE from 'three';
import { gsap } from 'gsap';
import { buildShapes } from './shapes.js';
import { reduced } from '../components/anim.js';

const vert = /* glsl */ `
  attribute vec3 aPosA;
  attribute vec3 aPosB;
  attribute float aToneA;
  attribute float aToneB;
  attribute float aRand;
  uniform float uMorph;
  uniform float uTime;
  uniform float uSize;
  uniform float uPR;
  uniform float uRed;
  uniform float uScan;
  uniform vec3 uMouse;
  uniform vec3 uGold;
  uniform vec3 uRedC;
  uniform vec3 uBlue;
  uniform vec3 uIvory;
  varying vec3 vColor;
  varying float vAlpha;

  vec3 toneColor(float t) {
    if (t < 0.5) return uIvory;
    if (t < 1.5) return uGold;
    if (t < 2.5) return uRedC;
    return uBlue;
  }

  void main() {
    float t = clamp(uMorph * 1.6 - aRand * 0.6, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);
    vec3 p = mix(aPosA, aPosB, t);
    // mid-flight swirl so morphs read as motion, not a crossfade
    float fly = sin(t * 3.14159);
    p += vec3(sin(aRand * 91.0), cos(aRand * 57.0), sin(aRand * 23.0)) * fly * 0.9;
    // idle breathing
    p += vec3(sin(uTime * 0.7 + aRand * 40.0), cos(uTime * 0.6 + aRand * 31.0), sin(uTime * 0.5 + aRand * 17.0)) * 0.035;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    // pointer repulsion in view space
    vec2 d = mv.xy - uMouse.xy;
    float dist = length(d);
    float push = smoothstep(1.6, 0.0, dist) * 0.55;
    mv.xy += normalize(d + 1e-4) * push;

    vec3 c = mix(toneColor(aToneA), toneColor(aToneB), t);
    if (aRand < uRed) c = mix(c, uRedC, 0.85);
    float scan = uScan * smoothstep(0.18, 0.0, abs(p.y - (mod(uTime * 1.1, 9.0) - 4.5)));
    c += scan * vec3(0.55, 0.75, 0.85);
    vColor = c;
    vAlpha = 0.55 + 0.45 * fract(aRand * 13.37) + push * 0.6 + scan;

    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPR * (0.6 + fract(aRand * 7.31)) * (14.0 / -mv.z) * (1.0 + scan * 1.5);
  }
`;

const frag = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, a * a * vAlpha * uOpacity);
  }
`;

export class ParticleScene {
  constructor(canvas) {
    const lite = /[?&]lite\b/.test(location.search) || (navigator.hardwareConcurrency || 8) <= 2;
    this.N = lite ? 7000 : 16000;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setClearColor(0x0a0b0d, 1);
    this.pr = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(this.pr);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0a0b0d, 0.028);
    this.camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    this.camera.position.set(0, 0, 15);

    this.pivot = new THREE.Group();   // per-state placement
    this.tilt = new THREE.Group();    // pointer parallax
    this.spin = new THREE.Group();    // idle rotation
    this.scene.add(this.pivot);
    this.pivot.add(this.tilt);
    this.tilt.add(this.spin);

    this.shapes = buildShapes(this.N);
    const g = new THREE.BufferGeometry();
    const start = this.shapes.scatter;
    this.A = new Float32Array(start.pos);
    this.B = new Float32Array(start.pos);
    this.TA = new Float32Array(start.tone);
    this.TB = new Float32Array(start.tone);
    const rand = new Float32Array(this.N);
    for (let i = 0; i < this.N; i++) rand[i] = Math.random();
    this.rand = rand;
    g.setAttribute('position', new THREE.BufferAttribute(this.A, 3));
    g.setAttribute('aPosA', new THREE.BufferAttribute(this.A, 3));
    g.setAttribute('aPosB', new THREE.BufferAttribute(this.B, 3));
    g.setAttribute('aToneA', new THREE.BufferAttribute(this.TA, 1));
    g.setAttribute('aToneB', new THREE.BufferAttribute(this.TB, 1));
    g.setAttribute('aRand', new THREE.BufferAttribute(rand, 1));
    this.geo = g;

    this.uniforms = {
      uMorph: { value: 1 },
      uTime: { value: 0 },
      uSize: { value: 2.6 },
      uPR: { value: this.pr },
      uOpacity: { value: 0 },
      uRed: { value: 0 },
      uScan: { value: 0 },
      uMouse: { value: new THREE.Vector3(999, 999, 0) },
      uGold: { value: new THREE.Color('#e9b44c') },
      uRedC: { value: new THREE.Color('#e5383b') },
      uBlue: { value: new THREE.Color('#7fb3c8') },
      uIvory: { value: new THREE.Color('#d9d2c4') },
    };
    const mat = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: this.uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.points = new THREE.Points(g, mat);
    this.points.frustumCulled = false;
    this.spin.add(this.points);

    this.spinSpeed = 0.05;
    this.mouse = new THREE.Vector2(0, 0);
    this.mouseTarget = new THREE.Vector2(0, 0);
    this.hasPointer = false;
    this.raycaster = new THREE.Raycaster();
    this.plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    this.hit = new THREE.Vector3();

    window.addEventListener('pointermove', (e) => {
      this.mouseTarget.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
      this.hasPointer = true;
    });
    window.addEventListener('pointerleave', () => { this.hasPointer = false; });
    window.addEventListener('resize', () => this.resize());
    this.resize();
    this.clock = new THREE.Clock();
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }

  resize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    // keep the composition similar on narrow screens
    this.camera.position.z = 15 * Math.max(1, (16 / 9) / this.camera.aspect * 0.8);
    this.camera.updateProjectionMatrix();
  }

  /* Freeze the in-flight blend into A, load the new target into B, and replay the morph. */
  morphTo(name) {
    const target = this.shapes[name];
    if (!target || this.current === name) return;
    this.current = name;
    const m = this.uniforms.uMorph.value;
    for (let i = 0; i < this.N; i++) {
      let t = Math.min(1, Math.max(0, m * 1.6 - this.rand[i] * 0.6));
      t = t * t * (3 - 2 * t);
      const fly = Math.sin(t * Math.PI) * 0.9;
      const r = this.rand[i];
      const o = i * 3;
      this.A[o] = this.A[o] + (this.B[o] - this.A[o]) * t + Math.sin(r * 91) * fly;
      this.A[o + 1] = this.A[o + 1] + (this.B[o + 1] - this.A[o + 1]) * t + Math.cos(r * 57) * fly;
      this.A[o + 2] = this.A[o + 2] + (this.B[o + 2] - this.A[o + 2]) * t + Math.sin(r * 23) * fly;
      this.TA[i] = t > 0.5 ? this.TB[i] : this.TA[i];
    }
    this.B.set(target.pos);
    this.TB.set(target.tone);
    ['aPosA', 'aPosB', 'aToneA', 'aToneB'].forEach((k) => { this.geo.attributes[k].needsUpdate = true; });
    this.uniforms.uMorph.value = 0;
    gsap.to(this.uniforms.uMorph, { value: 1, duration: reduced ? 0.01 : 2.4, ease: 'power2.inOut', overwrite: true });
  }

  setState(s) {
    const d = reduced ? 0.01 : 2.2;
    this.morphTo(s.shape);
    gsap.to(this.pivot.position, { x: s.pos[0], y: s.pos[1], z: s.pos[2], duration: d, ease: 'power3.inOut', overwrite: true });
    gsap.to(this.pivot.rotation, { x: s.rot[0], y: s.rot[1], z: s.rot[2], duration: d, ease: 'power3.inOut', overwrite: true });
    gsap.to(this.pivot.scale, { x: s.scale, y: s.scale, z: s.scale, duration: d, ease: 'power3.inOut', overwrite: true });
    gsap.to(this.uniforms.uOpacity, { value: s.opacity, duration: 1.4, ease: 'power2.out', overwrite: true });
    gsap.to(this.uniforms.uRed, { value: s.red || 0, duration: 1.6, overwrite: true });
    gsap.to(this.uniforms.uScan, { value: s.scan ? 1 : 0, duration: 1, overwrite: true });
    gsap.to(this, { spinSpeed: s.spin ?? 0.05, duration: 1.5, overwrite: true });
  }

  loop() {
    const dt = Math.min(this.clock.getDelta(), 0.05);
    const u = this.uniforms;
    u.uTime.value += dt;
    this.mouse.lerp(this.mouseTarget, 0.06);
    this.spin.rotation.y += this.spinSpeed * dt;
    // camera drifts toward the pointer (Slide_V1 parallax) instead of tilting the object
    this.tilt.rotation.x = -this.mouse.y * 0.05;
    this.tilt.rotation.y = this.mouse.x * 0.07;
    this.camera.position.x += (this.mouse.x * 0.9 + Math.sin(u.uTime.value * 0.07) * 0.3 - this.camera.position.x) * 0.03;
    this.camera.position.y += (this.mouse.y * 0.5 - this.camera.position.y) * 0.03;
    this.camera.lookAt(0, 0, 0);

    if (this.hasPointer) {
      this.raycaster.setFromCamera(this.mouseTarget, this.camera);
      if (this.raycaster.ray.intersectPlane(this.plane, this.hit)) {
        this.hit.applyMatrix4(this.camera.matrixWorldInverse);
        u.uMouse.value.copy(this.hit);
      }
    } else u.uMouse.value.set(999, 999, 0);

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.loop);
  }
}
