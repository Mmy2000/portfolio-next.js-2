"use client";
import { motion, useScroll, useSpring } from "framer-motion";
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div style={{
      scaleX, transformOrigin: "0%",
      position: "fixed", top: 0, left: 0, right: 0, height: 2,
      background: "linear-gradient(90deg, var(--accent), var(--emerald), var(--gold))",
      zIndex: 99996,
      boxShadow: "0 0 12px var(--accent-glow)",
    }} />
  );
}
