"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Server, Monitor, Wrench } from "lucide-react";
import { skillCategories } from "@/app/lib/data";
import { RevealLines, FadeIn, SectionLabel } from "@/app/components/ui/Reveal";
import CountUp from "@/app/components/ui/CountUp";
import { EASE_OUT_EXPO } from "@/app/lib/intro";

const ICONS = [Server, Monitor, Wrench];

export default function Skills() {
  const panelRef = useRef(null);
  const inView   = useInView(panelRef, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const cat = skillCategories[active];
  const avg = Math.round(cat.skills.reduce((s, k) => s + k.level, 0) / cat.skills.length);

  return (
    <section id="skills" className="section-pad">
      <div style={{
        position: "absolute", top: 0, right: 0, width: "60%", height: "100%",
        background: "radial-gradient(ellipse 60% 70% at 100% 50%, var(--accent-soft), transparent)",
        pointerEvents: "none",
      }} />

      <div className="section-container" style={{ position: "relative" }}>
        <SectionLabel index="02" label="Skills" />

        <div className="two-col-skills">
          {/* Left: heading + tabs */}
          <div>
            <RevealLines className="font-display heading-lg" style={{ marginBottom: 20 }}
              lines={[{ text: "My tech" }, { text: "toolkit", gradient: true }]} />

            <FadeIn delay={0.15} as="p" className="font-body"
              style={{ fontSize: 15.5, lineHeight: 1.8, color: "var(--fg-muted)", marginBottom: 32 }}>
              Spanning the full stack — from database design to UI animations and DevOps pipelines.
            </FadeIn>

            <div role="tablist" aria-label="Skill categories" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {skillCategories.map((c, i) => {
                const Icon = ICONS[i % ICONS.length];
                const isActive = active === i;
                return (
                  <FadeIn key={c.label} delay={0.2 + i * 0.07}>
                    <button
                      role="tab" aria-selected={isActive}
                      onClick={() => setActive(i)}
                      style={{
                        position: "relative", isolation: "isolate", width: "100%",
                        display: "flex", alignItems: "center", gap: 14,
                        padding: "16px 18px", borderRadius: 16, textAlign: "left",
                        background: "var(--card)", border: "1px solid var(--border-md)",
                        color: isActive ? "var(--fg)" : "var(--fg-muted)",
                        transition: "color 0.25s", cursor: "pointer",
                      }}>
                      {isActive && (
                        <motion.span layoutId="skill-tab"
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                          style={{
                            position: "absolute", inset: -1, borderRadius: 16, zIndex: -1,
                            background: "linear-gradient(135deg, var(--emerald-soft), var(--accent-soft))",
                            border: "1px solid var(--emerald)", boxShadow: "var(--shadow-emerald)",
                          }} />
                      )}
                      <span className="icon-tile" style={{ width: 36, height: 36, borderRadius: 10, color: isActive ? "var(--emerald)" : "var(--fg-muted)" }}>
                        <Icon size={16} />
                      </span>
                      <span className="font-display" style={{ fontSize: 15.5, fontWeight: 700, letterSpacing: "-0.01em", flex: 1 }}>{c.label}</span>
                      <span className="font-mono" style={{ fontSize: 10.5, opacity: 0.6 }}>{String(c.skills.length).padStart(2, "0")}</span>
                    </button>
                  </FadeIn>
                );
              })}
            </div>
          </div>

          {/* Right: skill bars */}
          <div ref={panelRef} className="glass-card spotlight" style={{ padding: "30px 30px", overflow: "hidden" }}>
            <AnimatePresence mode="wait">
              <motion.div key={active}
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 30 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 3, height: 22, borderRadius: 2, background: "linear-gradient(to bottom, var(--accent), var(--gold))" }} />
                    <h3 className="font-display" style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg)" }}>
                      {cat.label}
                    </h3>
                  </div>
                  <div className="font-mono" style={{ fontSize: 10.5, color: "var(--fg-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Avg <span style={{ color: "var(--emerald)", fontWeight: 700 }}>{avg}%</span>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                  {cat.skills.map((skill, i) => (
                    <div key={skill.name}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9 }}>
                        <span className="font-mono" style={{ fontSize: 13, fontWeight: 500, color: "var(--fg)" }}>{skill.name}</span>
                        <span className="font-mono" style={{ fontSize: 11.5, fontWeight: 700, color: "var(--accent-bright)" }}>
                          {inView ? <CountUp value={`${skill.level}%`} duration={1.3} /> : "0%"}
                        </span>
                      </div>
                      <div className="skill-bar">
                        <motion.div className="skill-bar-fill"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1.3, delay: 0.1 + i * 0.07, ease: EASE_OUT_EXPO }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
