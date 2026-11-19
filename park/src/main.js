import * as THREE from 'three';

const PROJ = [
  { id: 'bench',  n: '01', t: 'A Memoir to Public Benches', type: 'Installation', fx: 'slats',   url: '../bench/' },
  { id: 'mused',  n: '02', t: 'Mused',                       type: 'Product',      fx: 'rain',    url: '../mused/' },
  { id: 'strip',  n: '03', t: 'What remains when the song fades?', type: 'Interactive', fx: 'eq',   url: '../music-strip/' },
  { id: 'coterie',n: '04', t: 'Secret Coterie of Subterranean Statuary', type: 'Speculative', fx: 'glitch', url: '../secret-coterie/' },
  { id: 'rm',     n: '05', t: 'Reconnecting with spaces and self', type: 'Research', fx: 'clouds', url: '../multifunctional-spaces/' },
  { id: 'lol',    n: '06', t: 'Leap of Light',               type: 'Competition',  fx: 'beam',    url: '../leap-of-light/' },
  { id: 'sight',  n: '07', t: 'Sightsonic',                  type: 'Competition',  fx: 'wave',    url: '../sightsonic/' },
  { id: 'play',   n: '08', t: 'Capturing Play',              type: 'Photography',  fx: 'shutter', url: '../capturing-play/' },
  { id: 'noice',  n: '09', t: 'Noice',                       type: 'Interactive',  fx: 'fade',    url: null, soon: true },
];

const canvas = document.getElementById('park');
const stage = document.getElementById('scene');
const labelsEl = document.getElementById('labels');
const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches;

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
} catch (e) {
  document.documentElement.classList.add('no-gl');
  throw e;
}
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0x000000, 0);

const scene = new THREE.Scene();
const cam = new THREE.OrthographicCamera(-10, 10, 10, -10, -60, 80);
cam.position.set(14, 12.5, 14);
cam.lookAt(0, 0.4, 0);

scene.add(new THREE.AmbientLight(0xfff4e6, 0.9));
const sun = new THREE.DirectionalLight(0xffffff, 1.35);
sun.position.set(7, 14, 4);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -11, right: 11, top: 11, bottom: -11, near: 1, far: 40 });
sun.shadow.bias = -0.0008;
scene.add(sun);

/* helpers */
const M = (c, o) => new THREE.MeshLambertMaterial(Object.assign({ color: c, flatShading: true }, o || {}));
const add = (g, geo, mat, x = 0, y = 0, z = 0) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); g.add(m); return m; };
const box = (g, w, h, d, c, x, y, z) => add(g, new THREE.BoxGeometry(w, h, d), M(c), x, y, z);
const cyl = (g, rt, rb, h, c, seg, x, y, z) => add(g, new THREE.CylinderGeometry(rt, rb, h, seg || 12), M(c), x, y, z);
const sph = (g, r, c, x, y, z, o) => add(g, new THREE.SphereGeometry(r, 14, 10), M(c, o), x, y, z);
const glow = (c, k) => ({ emissive: c, emissiveIntensity: k == null ? 0.9 : k });

const world = new THREE.Group();
scene.add(world);
const island = new THREE.Group();
world.add(island);

/* ground */
const top = new THREE.Mesh(new THREE.CylinderGeometry(7.9, 7.5, 0.7, 11), M(0xb4c993));
top.position.y = -0.35; top.receiveShadow = true; island.add(top);
const under = new THREE.Mesh(new THREE.ConeGeometry(7.5, 5.2, 11), M(0x75604a));
under.rotation.x = Math.PI; under.position.y = -3.3; island.add(under);
[[-3, -4.6, 3.5, .8], [4, -5.4, -2.5, .55], [0.5, -6.4, 1, .4]].forEach(a => {
  const r = new THREE.Mesh(new THREE.DodecahedronGeometry(a[3], 0), M(0x8a7459));
  r.position.set(a[0], a[1], a[2]); r.userData.bob = a; island.add(r);
});
const ring = new THREE.Mesh(new THREE.RingGeometry(4.1, 5.75, 56), M(0xe9e1cf));
ring.rotation.x = -Math.PI / 2; ring.position.y = 0.012; ring.receiveShadow = true; island.add(ring);
const pond = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.0, 0.06, 28), M(0x8fc2d6, glow(0x4aa0c0, 0.12)));
pond.position.y = 0.03; pond.receiveShadow = true; island.add(pond);

function tree(x, z, s) {
  const g = new THREE.Group();
  cyl(g, .12, .16, .7, 0x6b4a2f, 7, 0, .35, 0);
  const a = add(g, new THREE.ConeGeometry(.75, 1.2, 7), M(0x4f8a55), 0, 1.15, 0);
  const b = add(g, new THREE.ConeGeometry(.55, 1.0, 7), M(0x5c9a60), 0, 1.75, 0);
  g.position.set(x, 0, z); g.scale.setScalar(s || 1); g.traverse(o => { if (o.isMesh) o.castShadow = true; });
  island.add(g); return g;
}
function bush(x, z) { const g = new THREE.Group(); sph(g, .42, 0x6aa05f, 0, .32, 0); g.position.set(x, 0, z); g.traverse(o => { if (o.isMesh) o.castShadow = true; }); island.add(g); }
[[-6.6, 1.2, .95], [-5.2, -4.4, .85], [-.8, -6.7, .95], [4.2, -5.6, .8], [6.4, 1.8, .9], [3.6, 6.0, .85], [-3.6, 5.8, .8]].forEach(t => tree(t[0], t[1], t[2]));
[[-1.3, -1.4], [1.5, 1.2]].forEach(b => bush(b[0], b[1]));

/* project objects. each returns { g, h, tick(t, hot) } */
const objs = {};

objs.bench = () => {
  const g = new THREE.Group(), slats = [];
  [-1.05, 1.05].forEach(x => { box(g, .1, .55, .9, 0x2b2118, x, .28, 0); box(g, .1, .95, .1, 0x2b2118, x, .75, -.4); });
  for (let i = 0; i < 6; i++) { const s = box(g, .3, .07, .78, 0xd0a56a, -.85 + i * .34, .58, .04); slats.push(s); }
  box(g, 2.0, .15, .05, 0xc09459, 0, .92, -.4); box(g, 2.0, .15, .05, 0xc09459, 0, 1.12, -.4);
  return { g, h: 1.45, tick(t, hot) { slats.forEach((s, i) => { s.rotation.z = Math.sin(t * (hot ? 2.6 : 1.1) - i * .7) * .32; }); } };
};

objs.mused = () => {
  const g = new THREE.Group(), bars = [];
  box(g, 1.9, .5, .95, 0x1d1815, 0, .85, 0);
  [[-.8, -.38], [.8, -.38], [-.8, .38], [.8, .38]].forEach(p => box(g, .1, .6, .1, 0x1d1815, p[0], .3, p[1]));
  box(g, 1.7, .08, .34, 0xf4f1ea, 0, 1.12, .27);
  for (let i = 0; i < 9; i++) box(g, .1, .07, .2, 0x111111, -.72 + i * .18 + (i > 4 ? .18 : 0), 1.17, .2);
  const lid = box(g, 1.9, .06, .8, 0x2a221d, 0, 1.45, -.22); lid.rotation.x = -.5;
  const cols = [0xff2a1f, 0xff8a2a, 0xffcb1f, 0x21e85c, 0x1fd3a8, 0x00a8ea, 0x7d52e0, 0xb3309f, 0xff5a1f];
  for (let i = 0; i < 9; i++) { const b = box(g, .14, .5, .14, cols[i], -.72 + i * .18, 1.7, .3); b.material.emissive = new THREE.Color(cols[i]); b.material.emissiveIntensity = .5; bars.push(b); }
  return { g, h: 2.4, tick(t, hot) { bars.forEach((b, i) => { const k = .45 + .55 * Math.abs(Math.sin(t * (hot ? 3.2 : 1.6) + i * .9)); b.scale.y = k; b.position.y = 1.5 + .25 * k; }); } };
};

objs.strip = () => {
  const g = new THREE.Group(), bars = [];
  box(g, 2.3, .16, 1.5, 0x8a6620, 0, .08, 0);
  for (let i = 0; i < 9; i++) { const b = box(g, .17, 1, .17, [0xd9a93f, 0xe8c36a, 0xb08428][i % 3], -.9 + i * .225, .5, .25, 0); b.material.emissive = new THREE.Color(0x6b4a10); b.material.emissiveIntensity = .35; bars.push(b); }
  box(g, .55, .75, .5, 0x1d1815, .95, .5, -.35);
  cyl(g, .16, .16, .04, 0x3a342e, 14, .95, .62, -.09).rotation.x = Math.PI / 2;
  cyl(g, .03, .03, 1.1, 0x111111, 6, -.95, .7, -.3); sph(g, .09, 0x111111, -.95, 1.28, -.3);
  return { g, h: 1.8, tick(t, hot) { bars.forEach((b, i) => { const k = .25 + .75 * Math.abs(Math.sin(t * (hot ? 4 : 2) + i * 1.3 + Math.sin(t + i))); b.scale.y = k * 1.3; b.position.y = .16 + .5 * k * 1.3; }); } };
};

objs.coterie = () => {
  const g = new THREE.Group();
  box(g, .85, .6, .85, 0xcfc7bb, -.3, .3, 0);
  const fig = new THREE.Group(); g.add(fig);
  const body = cyl(fig, .22, .3, 1.0, 0x1f5b55, 8, -.3, 1.1, 0), head = sph(fig, .21, 0x1f5b55, -.3, 1.78, 0);
  const arm = box(fig, .5, .1, .12, 0x1f5b55, -.3, 1.4, 0); arm.rotation.z = .5;
  const hole = cyl(g, .5, .5, .05, 0x151515, 16, 1.0, .03, .5);
  const rimm = new THREE.Mesh(new THREE.TorusGeometry(.5, .05, 6, 22), M(0xf0b5ad, glow(0xf0b5ad, .6))); rimm.rotation.x = Math.PI / 2; rimm.position.set(1.0, .06, .5); g.add(rimm);
  return { g, h: 2.4, tick(t, hot) {
    const f = Math.floor(t * (hot ? 14 : 5)), q = (Math.sin(f * 91.7) * 43758.5) % 1, flick = hot ? q > -.2 : q > .82;
    fig.position.x = flick ? (q - .5) * .12 : 0; [body, head, arm].forEach(m => m.material.color.setHex(flick ? (q > .9 ? 0x00f0d0 : 0xff2e88) : 0x1f5b55));
    rimm.material.emissiveIntensity = .45 + .35 * Math.sin(t * 2);
  } };
};

objs.rm = () => {
  const g = new THREE.Group();
  box(g, 1.9, .06, 1.9, 0xe8dfc9, 0, .03, 0);
  [[-.85, -.85], [.85, -.85], [-.85, .85], [.85, .85]].forEach(p => cyl(g, .06, .06, 1.35, 0x2f7f7a, 6, p[0], .7, p[1]));
  const roof = add(g, new THREE.ConeGeometry(1.75, .75, 4), M(0xb85042), 0, 1.7, 0); roof.rotation.y = Math.PI / 4;
  box(g, .5, .05, .5, 0x8a6a4a, .1, .5, .1); cyl(g, .04, .04, .5, 0x8a6a4a, 6, .1, .25, .1);
  box(g, .22, .22, .22, 0xf4f1ea, -.4, .17, -.2);
  const cloud = new THREE.Group(); [[0, 0, 0, .3], [.3, -.05, .05, .24], [-.3, -.05, 0, .22]].forEach(c => sph(cloud, c[3], 0xffffff, c[0], c[1], c[2], glow(0xdceef2, .35))); cloud.position.set(0, 2.6, 0); g.add(cloud);
  return { g, h: 3.1, tick(t) { cloud.position.y = 2.6 + Math.sin(t * .9) * .12; cloud.position.x = Math.sin(t * .4) * .4; } };
};

objs.lol = () => {
  const g = new THREE.Group(), orbs = [];
  box(g, 1.0, .5, 1.1, 0x4a4742, -1.0, .25, 0); box(g, 1.0, .5, 1.1, 0x4a4742, 1.0, .25, 0);
  for (let i = 0; i < 11; i++) {
    const u = i / 10, x = -.9 + u * 1.8, y = .55 + Math.sin(u * Math.PI) * 1.25;
    const o = sph(g, .075 + Math.sin(u * Math.PI) * .05, 0xffd278, x, y, 0, glow(0xffb83a, 1)); orbs.push(o);
  }
  return { g, h: 2.2, tick(t, hot) { orbs.forEach((o, i) => { const k = .5 + .5 * Math.sin(t * (hot ? 5 : 2.4) - i * .6); o.material.emissiveIntensity = .35 + k * 1.1; o.scale.setScalar(.8 + k * .5); }); } };
};

objs.sight = () => {
  const g = new THREE.Group(), bars = [];
  box(g, 1.7, .22, .9, 0xe9e1cf, 0, .11, 0);
  const hs = [.25, .5, .8, .45, 1.0, .6, .9, .4, .7, .35, .2];
  for (let i = 0; i < 11; i++) { const b = box(g, .1, 1, .1, 0xd9381e, -.75 + i * .15, .7, 0); b.material.emissive = new THREE.Color(0x7a1a08); b.material.emissiveIntensity = .3; b.userData.k = hs[i]; bars.push(b); }
  const band = new THREE.Mesh(new THREE.TorusGeometry(.85, .07, 8, 24, Math.PI), M(0x111111)); band.position.y = .95; g.add(band);
  cyl(g, .2, .2, .16, 0x111111, 14, -.85, .95, 0).rotation.z = Math.PI / 2; cyl(g, .2, .2, .16, 0x111111, 14, .85, .95, 0).rotation.z = Math.PI / 2;
  return { g, h: 2.0, tick(t, hot) { bars.forEach((b, i) => { const k = b.userData.k * (.6 + .4 * Math.sin(t * (hot ? 5 : 2.4) + i * .8)); b.scale.y = .2 + k * 1.1; b.position.y = .22 + (.2 + k * 1.1) / 2 + .02; }); } };
};

objs.play = () => {
  const g = new THREE.Group();
  [[.0, .45, .0, .2, 0], [-.5, .45, -.2, -.25, .45], [.5, .45, -.2, -.25, -.45]].forEach((l, i) => {
    const leg = cyl(g, .03, .05, 1.15, 0x2a2724, 6, 0, 0, 0); leg.position.set(i === 0 ? 0 : l[0] * .6, .55, i === 0 ? .3 : -.1);
    leg.rotation.set(i === 0 ? .32 : -.18, 0, i === 0 ? 0 : (i === 1 ? -.38 : .38));
  });
  box(g, .75, .5, .42, 0x161616, 0, 1.3, 0); box(g, .75, .05, .43, 0xff4b1f, 0, 1.12, 0);
  const lens = cyl(g, .19, .19, .34, 0x2b2b2b, 16, 0, 1.3, .36); lens.rotation.x = Math.PI / 2;
  const glass = cyl(g, .13, .13, .02, 0x7ab5d8, 16, 0, 1.3, .54, { }); glass.rotation.x = Math.PI / 2; glass.material = M(0x7ab5d8, glow(0x7ab5d8, .25));
  box(g, .2, .1, .14, 0x2b2b2b, .22, 1.62, 0);
  sph(g, .16, 0xc2301f, 1.05, .16, .45);
  return { g, h: 2.0, tick(t, hot) { const f = hot ? (Math.sin(t * 7) > .8 ? 1.6 : .25) : .25 + .1 * Math.sin(t * 1.4); glass.material.emissiveIntensity = f; } };
};

objs.noice = () => {
  const g = new THREE.Group();
  cyl(g, .28, .2, .3, 0x9a9a92, 10, 0, .15, 0);
  cyl(g, .03, .03, .55, 0x5c9a60, 5, 0, .55, 0);
  const l1 = add(g, new THREE.SphereGeometry(.2, 8, 6), M(0x7bb372), .18, .85, 0); l1.scale.set(1, .45, .6);
  const l2 = add(g, new THREE.SphereGeometry(.2, 8, 6), M(0x7bb372), -.18, .75, 0); l2.scale.set(1, .45, .6);
  return { g, h: 1.3, tick(t) { g.rotation.z = Math.sin(t * 1.2) * .03; } };
};

/* place objects on the path */
const items = [];
const OS = 1.4, R = 4.9, a0 = -Math.PI * .5;
PROJ.forEach((p, i) => {
  const o = objs[p.id](), a = a0 + i * (Math.PI * 2 / PROJ.length);
  o.g.position.set(Math.cos(a) * R, 0, Math.sin(a) * R);
  o.g.rotation.y = Math.PI / 4 + (Math.sin(i * 12.9) * .18);
  o.g.traverse(m => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } });
  o.g.userData.i = i; o.hot = 0; o.p = p; o.h *= OS;
  island.add(o.g); items.push(o);
});

/* labels */
const labelEls = items.map((o, i) => {
  const el = document.createElement('div');
  el.className = 'lab' + (o.p.soon ? ' soon' : '');
  el.innerHTML = '<div class="lb"><i>' + o.p.n + '</i><span>' + o.p.t + '<em>' + o.p.type + (o.p.soon ? ' / coming soon' : '') + '</em></span></div>';
  labelsEl.appendChild(el); return el;
});

/* interaction */
const ray = new THREE.Raycaster(), ptr = new THREE.Vector2(9, 9);
let hover = -1, listHover = -1, px = 0, py = 0;
function setSize() {
  const w = stage.clientWidth, h = stage.clientHeight;
  renderer.setSize(w, h, false);
  const asp = w / h, hh = asp < 1 ? 8.8 / asp : Math.max(7.6, 9.6 / asp), hw = hh * asp, off = (w > 900) ? hw * 0.2 : 0;
  const vo = asp < 1 ? hh * 0.2 : 0;
  cam.left = -hw - off; cam.right = hw - off; cam.top = hh - vo; cam.bottom = -hh - vo;
  cam.updateProjectionMatrix();
}
addEventListener('resize', setSize); setSize();
canvas.addEventListener('pointermove', e => {
  const r = canvas.getBoundingClientRect();
  ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  px = ptr.x; py = ptr.y;
});
canvas.addEventListener('pointerleave', () => { ptr.set(9, 9); });
function pick() {
  if (ptr.x > 2) return -1;
  ray.setFromCamera(ptr, cam);
  const hit = ray.intersectObjects(items.map(o => o.g), true)[0];
  if (!hit) return -1;
  let n = hit.object; while (n && n.userData.i == null) n = n.parent; return n ? n.userData.i : -1;
}
let busy = false, pend = null;
function go(p) {
  if (!p || p.soon || busy) return; busy = true; pend = p;
  const dest = p.url + '?from=' + p.fx;
  if (reduce) { location.href = dest; return; }
  TR.run(p.fx, 'in', 600).then(() => { location.href = dest; });
}
function dest(p) { return p.url + '?from=' + p.fx; }
let lastType = 'mouse', armed = -1;
canvas.addEventListener('pointerdown', e => { lastType = e.pointerType; if (e.pointerType === 'touch') { const r = canvas.getBoundingClientRect(); ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); } });
canvas.addEventListener('click', e => {
  const r = canvas.getBoundingClientRect(); ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  const i = pick(); if (i < 0) { armed = -1; listHover = -1; return; }
  if (lastType === 'touch' && armed !== i) { armed = i; listHover = i; return; }
  go(PROJ[i]);
});
document.addEventListener('keydown', e => { if (busy && pend && (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); location.href = dest(pend); } });
addEventListener('pageshow', e => { busy = false; if (e.persisted) document.querySelectorAll('canvas').forEach(c => { if (c.style.zIndex === '2147483000') c.remove(); }); });
document.querySelectorAll('[data-pi]').forEach(a => {
  const i = +a.dataset.pi;
  a.addEventListener('mouseenter', () => { listHover = i; });
  a.addEventListener('mouseleave', () => { listHover = -1; });
  a.addEventListener('focus', () => { listHover = i; });
  a.addEventListener('blur', () => { listHover = -1; });
  a.addEventListener('click', e => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return; e.preventDefault(); go(PROJ[i]); });
});

/* loop */
const clock = new THREE.Clock(), v = new THREE.Vector3();
let rotY = 0, rotX = 0;
function frame() {
  const t = clock.getElapsedTime();
  hover = pick();
  const active = hover > -1 ? hover : listHover;
  canvas.style.cursor = hover > -1 && !PROJ[hover].soon ? 'pointer' : 'default';
  island.position.y = reduce ? 0 : Math.sin(t * .8) * .18;
  island.children.forEach(c => { if (c.userData.bob) c.position.y = c.userData.bob[1] + Math.sin(t * .8 + c.userData.bob[0]) * .08; });
  const tx = reduce ? 0 : px * .1, ty = reduce ? 0 : py * .03;
  rotY += (tx - rotY) * .05; rotX += (ty - rotX) * .05;
  world.rotation.y = rotY; world.rotation.x = rotX;
  items.forEach((o, i) => {
    const on = i === active ? 1 : 0; o.hot += (on - o.hot) * .14;
    o.g.scale.setScalar(OS * (1 + o.hot * .08)); o.g.position.y = o.hot * .14;
    if (!reduce) o.tick(t, o.hot > .5);
    else o.tick(1.3, false);
    v.copy(o.g.position); v.y += o.h * (1 + o.hot * .08) + .55; island.localToWorld(v); v.project(cam);
    const w = stage.clientWidth, h = stage.clientHeight;
    labelEls[i].style.transform = 'translate(' + ((v.x * .5 + .5) * w).toFixed(1) + 'px,' + ((-v.y * .5 + .5) * h).toFixed(1) + 'px)';
    labelEls[i].classList.toggle('on', i === active);
  });
  renderer.render(scene, cam);
  requestAnimationFrame(frame);
}
frame();
document.documentElement.classList.add('gl');
