"use client";
import { useEffect, useRef } from "react";

// Fixed, page-wide ambient layer: slow drifting colour blobs + a soft
// spotlight that trails the pointer. Pure CSS transforms — cheap to animate.
export default function AuroraBackground() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 3 };
    const cur = { ...target };
    let raf = 0;

    const onMove = (e: PointerEvent) => { target.x = e.clientX; target.y = e.clientY; };
    const loop = () => {
      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;
      if (spotRef.current) spotRef.current.style.transform = `translate3d(${cur.x - 400}px, ${cur.y - 400}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", onMove); };
  }, []);

  return (
    <div className="aurora" aria-hidden="true">
      <div className="aurora-blob aurora-blob--a" />
      <div className="aurora-blob aurora-blob--b" />
      <div className="aurora-blob aurora-blob--c" />
      <div ref={spotRef} className="aurora-spot" />
      <div className="aurora-vignette" />
    </div>
  );
}
