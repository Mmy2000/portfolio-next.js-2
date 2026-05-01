"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene({ lightMode = false }: { lightMode?: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const W = mount.clientWidth || 600;
    const H = mount.clientHeight || 600;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.set(0, 0, 5);

    // ── Theme-aware colors ──
    const violet  = lightMode ? 0x4f46e5 : 0x6366f1;
    const emerald = lightMode ? 0x059669 : 0x10b981;
    const gold    = lightMode ? 0xd97706 : 0xf59e0b;

    // ── Outer wireframe icosahedron ──
    const outerGeo = new THREE.IcosahedronGeometry(2.0, 3);
    const outerMat = new THREE.MeshBasicMaterial({
      color: violet, wireframe: true, transparent: true,
      opacity: lightMode ? 0.20 : 0.18,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    scene.add(outerMesh);

    // ── Inner solid sphere ──
    const innerGeo = new THREE.IcosahedronGeometry(1.4, 6);
    const innerMat = new THREE.MeshPhongMaterial({
      color:    lightMode ? 0xf4f3ff : 0x06070f,
      emissive: lightMode ? 0xe0ddff : 0x09080f,
      shininess: 90, transparent: true,
      opacity: lightMode ? 0.88 : 0.92,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // ── Second wireframe — emerald, slower ──
    const midGeo = new THREE.IcosahedronGeometry(1.68, 2);
    const midMat = new THREE.MeshBasicMaterial({
      color: emerald, wireframe: true, transparent: true,
      opacity: lightMode ? 0.10 : 0.09,
    });
    const midMesh = new THREE.Mesh(midGeo, midMat);
    scene.add(midMesh);

    // ── Rings: violet + emerald + gold ──
    const makeRing = (r: number, tube: number, color: number, opacity: number, rx: number, rz: number) => {
      const m = new THREE.Mesh(
        new THREE.TorusGeometry(r, tube, 16, 220),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity })
      );
      m.rotation.x = rx; m.rotation.z = rz;
      scene.add(m);
      return m;
    };

    const ring1 = makeRing(2.35, 0.008, violet,  lightMode ? 0.30 : 0.35, Math.PI * 0.25, 0);
    const ring2 = makeRing(2.65, 0.005, emerald, lightMode ? 0.22 : 0.28, Math.PI * 0.52, Math.PI * 0.10);
    const ring3 = makeRing(2.10, 0.004, gold,    lightMode ? 0.16 : 0.20, Math.PI * 0.70, Math.PI * 0.32);

    // ── Particles: two colors ──
    const makeParticles = (count: number, rMin: number, rMax: number, color: number, size: number, opacity: number) => {
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(2 * Math.random() - 1);
        const r     = rMin + Math.random() * (rMax - rMin);
        pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color, size, transparent: true, opacity, sizeAttenuation: true }));
      scene.add(pts);
      return pts;
    };

    const pvio = makeParticles(200, 2.1, 3.5, violet,  0.022, lightMode ? 0.45 : 0.6);
    const pem  = makeParticles(100, 2.4, 3.8, emerald, 0.018, lightMode ? 0.35 : 0.5);

    // ── Lights ──
    scene.add(new THREE.AmbientLight(violet, lightMode ? 0.35 : 0.25));
    const pl1 = new THREE.PointLight(violet,  lightMode ? 5 : 4, 12);
    const pl2 = new THREE.PointLight(emerald, lightMode ? 4 : 3, 12);
    const pl3 = new THREE.PointLight(gold,    lightMode ? 2 : 1.5, 10);
    pl1.position.set( 4,  3,  2);
    pl2.position.set(-4, -2, -3);
    pl3.position.set( 2, -4,  1);
    scene.add(pl1, pl2, pl3);

    // ── Mouse tracking ──
    const mouse   = { x: 0, y: 0 };
    const target  = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
      target.x =  mouse.x * 0.45;
      target.y = -mouse.y * 0.28;
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Animate ──
    let frameId: number;
    const clock = new THREE.Clock();
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const mat1 = ring1.material as THREE.MeshBasicMaterial;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      current.x = lerp(current.x, target.x, 0.035);
      current.y = lerp(current.y, target.y, 0.035);

      outerMesh.rotation.y = t * 0.065 + current.x;
      outerMesh.rotation.x = t * 0.022 + current.y;
      outerMat.opacity = (lightMode ? 0.16 : 0.15) + Math.sin(t * 1.0) * 0.05;

      midMesh.rotation.y = -t * 0.048 + current.x * 0.6;
      midMesh.rotation.z =  t * 0.028;

      innerMesh.rotation.y = t * 0.038 + current.x * 0.4;
      innerMesh.rotation.x = current.y * 0.5;

      ring1.rotation.y = t * 0.13;
      mat1.opacity = (lightMode ? 0.24 : 0.30) + Math.sin(t * 0.85) * 0.08;
      ring2.rotation.y = -t * 0.095;
      ring2.rotation.x = Math.PI * 0.52 + Math.sin(t * 0.4) * 0.09;
      ring3.rotation.z = t * 0.078;

      pvio.rotation.y = t * 0.032 + current.x * 0.4;
      pvio.rotation.x = t * 0.014 + current.y * 0.3;
      pem.rotation.y  = -t * 0.025 + current.x * 0.3;
      pem.rotation.x  =  t * 0.018;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
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
