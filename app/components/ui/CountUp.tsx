"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

/**
 * Counts the numeric part of `value` up from zero when scrolled into view.
 * Non-numeric values (e.g. "A+") are rendered as-is.
 */
export default function CountUp({ value, duration = 1.6 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || target === null) return;
    const controls = animate(0, target, {
      duration, ease: [0.16, 1, 0.3, 1],
      onUpdate: v => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, duration]);

  return <span ref={ref}>{target === null ? value : `${n}${suffix}`}</span>;
}
