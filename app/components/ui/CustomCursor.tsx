"use client";
import { useEffect, useRef } from "react";

const INTERACTIVE = "a,button,[data-cursor],input,textarea,label,select";

export default function CustomCursor() {
  const ringRef  = useRef<HTMLDivElement>(null);
  const dotRef   = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Only on precise pointers (mouse / trackpad) and when motion is welcome
    const fine    = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const pos  = { x: -200, y: -200 };
    const ring = { x: -200, y: -200 };
    let size = 34, targetSize = 34;
    let raf = 0;
    let visible = false;

    const ringEl  = ringRef.current!;
    const dotEl   = dotRef.current!;
    const labelEl = labelRef.current!;

    const setState = (state: "idle" | "hover" | "label" | "text", label = "") => {
      ringEl.dataset.state = state;
      labelEl.textContent = label;
      targetSize = state === "label" ? 88 : state === "hover" ? 54 : state === "text" ? 6 : 34;
    };

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX; pos.y = e.clientY;
      if (!visible) {
        visible = true;
        ring.x = pos.x; ring.y = pos.y;
        ringEl.style.opacity = "1"; dotEl.style.opacity = "1";
      }

      // Spotlight cards: feed pointer position into CSS vars
      const spot = (e.target as HTMLElement).closest?.(".spotlight") as HTMLElement | null;
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    };

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      const labelled = t.closest("[data-cursor-label]") as HTMLElement | null;
      if (labelled) return setState("label", labelled.dataset.cursorLabel ?? "");
      if (t.closest("input,textarea")) return setState("text");
      if (t.closest(INTERACTIVE)) return setState("hover");
      setState("idle");
    };

    const onDown  = () => ringEl.classList.add("is-down");
    const onUp    = () => ringEl.classList.remove("is-down");
    const onLeave = () => { visible = false; ringEl.style.opacity = "0"; dotEl.style.opacity = "0"; };

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.16;
      ring.y += (pos.y - ring.y) * 0.16;
      size += (targetSize - size) * 0.18;
      ringEl.style.width  = `${size}px`;
      ringEl.style.height = `${size}px`;
      ringEl.style.transform = `translate3d(${ring.x - size / 2}px, ${ring.y - size / 2}px, 0)`;
      dotEl.style.transform  = `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup",   onUp);
    document.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup",   onUp);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" data-state="idle" aria-hidden="true">
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
