"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, MapPin, ChevronDown } from "lucide-react";
import { experiences } from "@/app/lib/data";

export default function Experience() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState<string | null>(experiences[0].id);

  return (
    <section id="experience" className="section-pad" style={{ position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, left: 0, width: "45%", height: "100%",
        background: "radial-gradient(ellipse 55% 60% at 0% 50%, var(--gold-soft), transparent)",
        pointerEvents: "none",
      }} />

      <div ref={ref} className="section-container" style={{ position: "relative" }}>

        {/* Label */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-label-row">
          <span className="section-tag">04 — Experience</span>
          <div style={{ height: 1, width: 56, background: "linear-gradient(to right, var(--border-md), transparent)" }} />
        </motion.div>

        <div className="two-col-experience">
          {/* Left heading */}
          <div>
            <motion.h2 initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              className="font-display heading-lg" style={{ marginBottom: 16 }}>
              Where I&apos;ve<br /><span className="gradient-text">worked</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }}
              className="font-body"
              style={{ fontSize: 15, lineHeight: 1.8, color: "var(--fg-muted)" }}>
              From agency work in Dubai to product teams in Egypt and teaching at NTI — always building things that matter.
            </motion.p>
          </div>

          {/* Accordion */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {experiences.map((exp, i) => {
              const isOpen = open === exp.id;
              return (
                <motion.div key={exp.id}
                  initial={{ opacity: 0, x: 32 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card"
                  style={{ overflow: "hidden", borderColor: isOpen ? "var(--emerald)" : undefined, boxShadow: isOpen ? "var(--shadow-emerald)" : "var(--shadow-sm)" }}
                >
                  <button onClick={() => setOpen(isOpen ? null : exp.id)}
                    style={{
                      width: "100%", display: "flex", alignItems: "center",
                      justifyContent: "space-between", gap: 12,
                      padding: "18px 20px", textAlign: "left",
                      background: "transparent", border: "none", cursor: "none",
                    }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0, flex: 1 }}>
                      <div style={{
                        width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
                        background: isOpen ? "var(--emerald)" : "var(--border-lg)",
                        boxShadow: isOpen ? "0 0 10px var(--emerald-glow)" : "none",
                        transition: "all 0.3s ease",
                      }} />
                      <div style={{ minWidth: 0 }}>
                        <div className="font-display" style={{ fontSize: 14, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg)", lineHeight: 1.3, wordBreak: "break-word" }}>
                          {exp.role}
                        </div>
                        <div className="font-mono" style={{ fontSize: 11, color: "var(--emerald)", marginTop: 3 }}>
                          {exp.company}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                      <div className="exp-meta">
                        <span className="font-mono" style={{ fontSize: 10, color: "var(--fg-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                          <Calendar size={9} />{exp.period}
                        </span>
                        <span className="font-mono" style={{ fontSize: 9.5, color: "var(--fg-subtle)", display: "flex", alignItems: "center", gap: 4 }}>
                          <MapPin size={9} />{exp.location}
                        </span>
                      </div>
                      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
                        <ChevronDown size={15} style={{ color: "var(--fg-muted)" }} />
                      </motion.div>
                    </div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{ padding: "0 20px 20px", borderTop: "1px solid var(--border)" }}>
                      {/* Mobile period (shown inside when open on small screens) */}
                      <div className="font-mono" style={{ fontSize: 10, color: "var(--fg-muted)", marginTop: 14, marginBottom: 10, display: "flex", gap: 12, flexWrap: "wrap" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Calendar size={9} />{exp.period}</span>
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={9} />{exp.location}</span>
                      </div>
                      <p className="font-body" style={{ fontSize: 13.5, lineHeight: 1.75, color: "var(--fg-muted)", marginBottom: 14 }}>
                        {exp.description}
                      </p>
                      <ul style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                        {exp.highlights.map(h => (
                          <li key={h} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--emerald)", marginTop: 7, flexShrink: 0 }} />
                            <span className="font-body" style={{ fontSize: 13, lineHeight: 1.65, color: "var(--fg-muted)" }}>{h}</span>
                          </li>
                        ))}
                      </ul>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {exp.technologies.map(t => <span key={t} className="chip">{t}</span>)}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
