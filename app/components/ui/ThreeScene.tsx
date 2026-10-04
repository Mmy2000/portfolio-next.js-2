"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// Ashima Arts 3D simplex noise (MIT) — drives the blob's surface displacement
const NOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const BLOB_VERT = /* glsl */ `
uniform float uTime;
uniform float uAmp;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
varying vec3 vPos;
${NOISE_GLSL}
void main(){
  float n  = snoise(normal * 1.15 + vec3(uTime * 0.18));
  float n2 = snoise(normal * 2.8  - vec3(uTime * 0.27)) * 0.35;
  float d  = (n + n2) * uAmp;
  vec3 p   = position + normal * d;
  vNoise = n;
  vPos   = p;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vView   = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;

const BLOB_FRAG = /* glsl */ `
uniform float uTime;
uniform vec3 uA;
uniform vec3 uB;
uniform vec3 uC;
uniform vec3 uBase;
uniform float uLight;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
varying vec3 vPos;
void main(){
  float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.4);
  float t = vNoise * 0.5 + 0.5;
  vec3 grad = mix(uA, uB, smoothstep(0.2, 0.9, t));
  grad = mix(grad, uC, smoothstep(0.35, 1.0, vPos.y * 0.32 + 0.5) * 0.5);

  // fine iridescent contour bands sweeping across the surface
  float bands = sin((vPos.y + vNoise * 0.7) * 22.0 - uTime * 0.8) * 0.5 + 0.5;
  float line  = smoothstep(0.94, 1.0, bands);

  float body = mix(0.10, 0.28, uLight);
  // light theme: softer, pastel rim so it does not read as a dark outline
  vec3 rimCol = mix(grad, mix(grad, vec3(1.0), 0.25), uLight);
  vec3 col = mix(uBase, rimCol, clamp(body + fres * mix(0.95, 0.75, uLight), 0.0, 1.0));
  col += grad * fres * 0.25 * (1.0 - uLight); // extra rim glow on dark backgrounds
  col += grad * line * mix(0.22, 0.12, uLight);
  gl_FragColor = vec4(col, 1.0);
}`;

function makeDotTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.25, "rgba(255,255,255,0.8)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

export default function ThreeScene({ lightMode = false }: { lightMode?: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const W = mount.clientWidth || 600;
    const H = mount.clientHeight || 600;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.set(0, 0, 6);

    const root = new THREE.Group();
    scene.add(root);

    const violet  = new THREE.Color(lightMode ? 0x4f46e5 : 0x6366f1);
    const emerald = new THREE.Color(lightMode ? 0x059669 : 0x10b981);
    const gold    = new THREE.Color(lightMode ? 0xd97706 : 0xf59e0b);
    const blend   = lightMode ? THREE.NormalBlending : THREE.AdditiveBlending;

    const disposables: { dispose(): void }[] = [];
    const track = <T extends { dispose(): void }>(o: T) => { disposables.push(o); return o; };

    // ── Shader blob core ───────────────────────────────────────
    const blobUniforms = {
      uTime:  { value: 0 },
      uAmp:   { value: 0.22 },
      uA:     { value: violet },
      uB:     { value: emerald },
      uC:     { value: gold },
      uBase:  { value: new THREE.Color(lightMode ? 0xf7f6ff : 0x04050f) },
      uLight: { value: lightMode ? 1 : 0 },
    };
    const blob = new THREE.Mesh(
      track(new THREE.IcosahedronGeometry(1.45, 40)),
      track(new THREE.ShaderMaterial({ uniforms: blobUniforms, vertexShader: BLOB_VERT, fragmentShader: BLOB_FRAG })),
    );
    root.add(blob);

    // ── Wireframe shells ───────────────────────────────────────
    const shellMat = track(new THREE.MeshBasicMaterial({
      color: violet, wireframe: true, transparent: true, opacity: lightMode ? 0.14 : 0.12, blending: blend, depthWrite: false,
    }));
    const shell = new THREE.Mesh(track(new THREE.IcosahedronGeometry(2.15, 2)), shellMat);
    root.add(shell);

    // ── Orbit rings ────────────────────────────────────────────
    const makeRing = (r: number, tube: number, color: THREE.Color, opacity: number, rx: number, rz: number) => {
      const m = new THREE.Mesh(
        track(new THREE.TorusGeometry(r, tube, 12, 256)),
        track(new THREE.MeshBasicMaterial({ color, transparent: true, opacity, blending: blend, depthWrite: false })),
      );
      m.rotation.x = rx; m.rotation.z = rz;
      root.add(m);
      return m;
    };
    const ring1 = makeRing(2.45, 0.006, violet,  lightMode ? 0.35 : 0.5,  Math.PI * 0.28, 0);
    const ring2 = makeRing(2.8,  0.004, emerald, lightMode ? 0.28 : 0.38, Math.PI * 0.55, Math.PI * 0.12);
    const ring3 = makeRing(2.2,  0.004, gold,    lightMode ? 0.22 : 0.3,  Math.PI * 0.72, Math.PI * 0.34);

    // Small "satellites" riding the rings
    const satGeo = track(new THREE.SphereGeometry(0.035, 16, 16));
    const sat1 = new THREE.Mesh(satGeo, track(new THREE.MeshBasicMaterial({ color: violet })));
    const sat2 = new THREE.Mesh(satGeo, track(new THREE.MeshBasicMaterial({ color: emerald })));
    ring1.add(sat1); ring2.add(sat2);

    // ── Particle field ─────────────────────────────────────────
    const dotTex = track(makeDotTexture());
    const makeParticles = (count: number, rMin: number, rMax: number, color: THREE.Color, size: number, opacity: number) => {
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(2 * Math.random() - 1);
        const r     = rMin + Math.pow(Math.random(), 0.7) * (rMax - rMin);
        pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);
      }
      const geo = track(new THREE.BufferGeometry());
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const pts = new THREE.Points(geo, track(new THREE.PointsMaterial({
        color, size, map: dotTex, transparent: true, opacity, sizeAttenuation: true, depthWrite: false, blending: blend,
      })));
      root.add(pts);
      return pts;
    };
    const pA = makeParticles(420, 2.3, 4.6, violet,  0.07, lightMode ? 0.5 : 0.8);
    const pB = makeParticles(220, 2.6, 5.0, emerald, 0.06, lightMode ? 0.45 : 0.7);
    const pC = makeParticles(80,  2.8, 4.2, gold,    0.08, lightMode ? 0.4 : 0.65);

    // ── Interaction state ──────────────────────────────────────
    const target = { x: 0, y: 0 };
    const cur    = { x: 0, y: 0 };
    let lastMouse = { x: 0, y: 0 };
    let energy = 0; // rises with pointer speed, makes the blob ripple harder

    const onMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth  - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      energy = Math.min(1, energy + Math.hypot(nx - lastMouse.x, ny - lastMouse.y) * 1.6);
      lastMouse = { x: nx, y: ny };
      target.x =  nx * 0.5;
      target.y = -ny * 0.3;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Render loop (paused when off-screen) ───────────────────
    let frameId = 0;
    let running = false;
    const clock = new THREE.Clock();
    let time = 0;
    const speed = reduced ? 0.25 : 1;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += clock.getDelta() * speed;
      const t = time;
      const scroll = Math.min(1, window.scrollY / window.innerHeight);

      cur.x += (target.x - cur.x) * 0.04;
      cur.y += (target.y - cur.y) * 0.04;
      energy *= 0.95;

      blobUniforms.uTime.value = t;
      blobUniforms.uAmp.value  = 0.2 + energy * 0.22 + Math.sin(t * 0.6) * 0.03;
      blob.rotation.y = t * 0.08 + cur.x;
      blob.rotation.x = cur.y * 0.8;

      shell.rotation.y = -t * 0.05 + cur.x * 0.5;
      shell.rotation.z =  t * 0.03;
      shellMat.opacity = (lightMode ? 0.12 : 0.1) + Math.sin(t) * 0.03;

      ring1.rotation.y = t * 0.16;
      ring2.rotation.y = -t * 0.11;
      ring2.rotation.x = Math.PI * 0.55 + Math.sin(t * 0.4) * 0.1;
      ring3.rotation.z = t * 0.09;
      sat1.position.set(Math.cos(t * 0.9) * 2.45, Math.sin(t * 0.9) * 2.45, 0);
      sat2.position.set(Math.cos(-t * 0.6 + 2) * 2.8, Math.sin(-t * 0.6 + 2) * 2.8, 0);

      pA.rotation.y = t * 0.03 + cur.x * 0.5;
      pA.rotation.x = t * 0.012 + cur.y * 0.4;
      pB.rotation.y = -t * 0.024 + cur.x * 0.35;
      pC.rotation.z = t * 0.02;

      // Scroll: drift up, tilt and recede as the hero leaves the viewport
      root.position.y = scroll * 1.2;
      root.rotation.x = scroll * 0.6;
      camera.position.z = 6 + scroll * 2.2;

      renderer.render(scene, camera);
    };

    const start = () => { if (!running) { running = true; clock.getDelta(); animate(); } };
    const stop  = () => { running = false; cancelAnimationFrame(frameId); };

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0 });
    io.observe(mount);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      disposables.forEach(d => d.dispose());
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [lightMode]);

  return (
    <div ref={mountRef}
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
      aria-hidden="true"
    />
  );
}
