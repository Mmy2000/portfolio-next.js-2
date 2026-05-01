"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { skillCategories } from "@/app/lib/data";

export default function Skills() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const cat = skillCategories[active];

  return (
    <section id="skills" className="section-pad" style={{ position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, right: 0, width: "50%", height: "100%",
        background: "radial-gradient(ellipse 60% 70% at 100% 50%, var(--accent-soft), transparent)",
        pointerEvents: "none",
      }} />

      <div ref={ref} className="section-container" style={{ position: "relative" }}>

        {/* Label */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-label-row">
          <span className="section-tag">02 — Skills</span>
          <div style={{ height: 1, width: 56, background: "linear-gradient(to right, var(--border-md), transparent)" }} />
        </motion.div>

        <div className="two-col-skills">
          {/* Left: heading + tabs */}
          <div>
            <motion.h2 initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              className="font-display heading-lg" style={{ marginBottom: 16 }}>
              My tech<br /><span className="gradient-text">toolkit</span>
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }}
              className="font-body"
              style={{ fontSize: 15, lineHeight: 1.8, color: "var(--fg-muted)", marginBottom: 28 }}>
              Spanning the full stack — from database design to UI animations and DevOps pipelines.
            </motion.p>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {skillCategories.map((c, i) => (
                <motion.button key={c.label}
                  initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.18 + i * 0.07 }}
                  onClick={() => setActive(i)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "14px 18px", borderRadius: 12, textAlign: "left",
                    background: active === i ? "var(--emerald-soft)" : "var(--card)",
                    border: `1px solid ${active === i ? "var(--emerald)" : "var(--border-md)"}`,
                    color: active === i ? "var(--emerald)" : "var(--fg-muted)",
                    boxShadow: active === i ? "var(--shadow-emerald)" : "var(--shadow-sm)",
                    transition: "all 0.25s ease", cursor: "none",
                  }}>
                  <span className="font-display" style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em" }}>{c.label}</span>
                  <span className="font-mono" style={{ fontSize: 10, opacity: 0.55 }}>{c.skills.length} skills</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right: skill bars */}
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card" style={{ padding: "28px 28px" }}>

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
                <div style={{ width: 3, height: 20, borderRadius: 2, background: "linear-gradient(to bottom, var(--accent), var(--gold))" }} />
                <h3 className="font-display" style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg)" }}>
                  {cat.label}
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {cat.skills.map((skill, i) => (
                  <div key={skill.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span className="font-mono" style={{ fontSize: 12.5, fontWeight: 500, color: "var(--fg)" }}>{skill.name}</span>
                      <span className="font-mono" style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)" }}>{skill.level}%</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 999, background: "var(--border-md)", overflow: "hidden" }}>
                      <motion.div
                        style={{ height: "100%", borderRadius: 999, background: "linear-gradient(90deg, var(--accent) 0%, var(--gold) 100%)", boxShadow: "0 0 8px var(--accent-glow)" }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1.1, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
