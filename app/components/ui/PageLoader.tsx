"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { isIntroDone, markIntroDone, EASE_IN_OUT, EASE_OUT_EXPO } from "@/app/lib/intro";
import { getLenis } from "@/app/components/ui/SmoothScroll";

const DURATION = 1500; // ms for the counter to reach 100
const NAME = "MAHMOUD YOUSEF";

export default function PageLoader() {
  const [pct, setPct]   = useState(0);
  const [show, setShow] = useState(() => !isIntroDone());

  useEffect(() => {
    if (!show) return;
    const html = document.documentElement;
    html.style.overflow = "hidden";
    getLenis()?.stop();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduced ? 300 : DURATION;
    const start = performance.now();
    let raf = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      // ease-in-out so the count lingers believably near the end
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setPct(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else timeout = setTimeout(() => setShow(false), 280);
    };
    raf = requestAnimationFrame(tick);

    return () => { cancelAnimationFrame(raf); clearTimeout(timeout); };
  }, [show]);

  const handleExitComplete = () => {
    document.documentElement.style.overflow = "";
    getLenis()?.start();
  };

  // Let the page start its entrance while the curtain is still lifting
  useEffect(() => {
    if (!show) markIntroDone();
  }, [show]);

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {show && (
        <motion.div
          key="loader"
          className="loader"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: EASE_IN_OUT }}
        >
          <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.35 }} />
          <div className="loader-glow" />

          {/* Name — letter cascade */}
          <div className="loader-name font-display" aria-label={NAME}>
            {NAME.split("").map((ch, i) => (
              <span key={i} className="mask-line" style={{ display: "inline-block" }}>
                <motion.span
                  style={{ display: "inline-block" }}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.035, ease: EASE_OUT_EXPO }}
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              </span>
            ))}
          </div>

          <motion.div
            className="font-mono loader-sub"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          >
            Full Stack Developer — Portfolio ’{new Date().getFullYear().toString().slice(2)}
          </motion.div>

          {/* Bottom bar: progress + big counter */}
          <div className="loader-bottom">
            <div className="loader-track">
              <div className="loader-fill" style={{ transform: `scaleX(${pct / 100})` }} />
            </div>
            <div className="loader-count font-display">
              {String(pct).padStart(3, "0")}
              <span>%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
