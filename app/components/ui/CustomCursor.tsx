"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);
  const [hov, setHov] = useState(false);
  const [click, setClick] = useState(false);
  const pos  = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf  = useRef<number>(0);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const onMove  = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const onDown  = () => setClick(true);
    const onUp    = () => setClick(false);
    const onOver  = (e: Event) => { if ((e.target as HTMLElement).closest("a,button,[data-cursor]")) setHov(true); };
    const onOut   = (e: Event) => { if ((e.target as HTMLElement).closest("a,button,[data-cursor]")) setHov(false); };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    document.addEventListener("mouseover",  onOver);
    document.addEventListener("mouseout",   onOut);

    const loop = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.11);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.11);
      const size = hov ? 46 : click ? 22 : 36;
      if (ringRef.current) {
        ringRef.current.style.width  = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.transform = `translate(${ring.current.x - size / 2}px, ${ring.current.y - size / 2}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseout",   onOut);
    };
  }, [hov, click]);

  return (
    <>
      <div ref={ringRef} style={{
        position: "fixed", top: 0, left: 0,
        borderRadius: "50%",
        border: `1.5px solid ${hov ? "var(--emerald)" : "rgba(99,102,241,0.55)"}`,
        background: hov ? "var(--emerald-soft)" : "transparent",
        pointerEvents: "none", zIndex: 99999,
        willChange: "transform",
        transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s, background 0.2s",
      }} />
      <div ref={dotRef} style={{
        position: "fixed", top: 0, left: 0,
        width: 8, height: 8, borderRadius: "50%",
        background: hov ? "var(--emerald)" : "var(--accent)",
        pointerEvents: "none", zIndex: 99999,
        willChange: "transform",
        opacity: hov ? 0 : 1,
        transition: "opacity 0.15s, background 0.2s",
      }} />
    </>
  );
}
