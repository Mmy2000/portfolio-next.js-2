"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [pct, setPct]   = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPct(p => {
        const next = p + Math.random() * 14 + 4;
        if (next >= 100) { clearInterval(interval); setTimeout(() => setDone(true), 350); return 100; }
        return next;
      });
    }, 70);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 99998,
            background: "var(--bg)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28,
          }}
        >
          <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.25 }} />

          {/* Decorative glows */}
          <div style={{
            position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)",
            width: 300, height: 300, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
            filter: "blur(40px)", pointerEvents: "none",
          }} />

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ position: "relative", zIndex: 1, textAlign: "center" }}
          >
            <div className="font-display"
              style={{ fontSize: 54, fontWeight: 800, letterSpacing: "-0.04em", color: "var(--fg)", lineHeight: 1 }}>
              MY<span style={{ color: "var(--emerald)" }}>.</span>
            </div>
            <div className="font-mono"
              style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--fg-subtle)", marginTop: 8 }}>
              Loading Portfolio
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{ position: "relative", zIndex: 1, width: 160 }}
          >
            <div style={{ height: 2, background: "var(--border-md)", borderRadius: 999, overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${Math.min(pct, 100)}%`,
                background: "linear-gradient(90deg, var(--accent), var(--emerald))",
                borderRadius: 999,
                boxShadow: "0 0 10px var(--accent-glow)",
                transition: "width 0.08s linear",
              }} />
            </div>
            <div className="font-mono"
              style={{ fontSize: 9, color: "var(--fg-subtle)", textAlign: "right", marginTop: 8, letterSpacing: "0.06em" }}>
              {Math.min(Math.round(pct), 100)}%
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
