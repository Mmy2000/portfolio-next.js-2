"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Server, Layers, Zap } from "lucide-react";

const stats = [
  { value: "4+",  label: "Years Experience" },
  { value: "6+",  label: "Projects Shipped" },
  { value: "3",   label: "Companies" },
  { value: "A.I", label: "Grad Grade" },
];

const traits = [
  { icon: Server,  title: "Backend Architecture", desc: "APIs and data systems designed to scale. PostgreSQL, Redis, Celery — I think in systems." },
  { icon: Layers,  title: "Full-Stack Ownership",  desc: "From schema to pixel — no handoffs, no guessing. I own every layer." },
  { icon: Code2,   title: "Code Craftsmanship",    desc: "Readable, tested, documented code isn't a luxury. It's the standard." },
  { icon: Zap,     title: "Performance-First",     desc: "Sub-second APIs, optimized queries, buttery-smooth UIs at 60fps." },
];

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.1 } } },
  item: {
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
  },
};

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="section-pad">
      <div ref={ref} className="section-container">

        {/* Label */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-label-row">
          <span className="section-tag">01 — About</span>
          <div style={{ height: 1, width: 56, background: "linear-gradient(to right, var(--border-md), transparent)" }} />
        </motion.div>

        <div className="two-col-about">
          {/* Left */}
          <motion.div variants={stagger.container} initial="hidden" animate={inView ? "show" : "hidden"}>
            <motion.h2 variants={stagger.item} className="font-display heading-lg" style={{ marginBottom: 24 }}>
              Crafting software<br />
              <span className="gradient-text">that endures</span>
            </motion.h2>

            <motion.p variants={stagger.item} className="font-body"
              style={{ fontSize: 15.5, lineHeight: 1.85, color: "var(--fg-muted)", marginBottom: 16 }}>
              I&apos;m Mahmoud — a Computer Science graduate from Zagazig University (Class of 2023) and a Full Stack
              Developer based in Cairo, Egypt. I specialize in building production-grade web applications end-to-end.
            </motion.p>

            <motion.p variants={stagger.item} className="font-body"
              style={{ fontSize: 15.5, lineHeight: 1.85, color: "var(--fg-muted)", marginBottom: 36 }}>
              My core stack is{" "}
              <strong style={{ color: "var(--fg)", fontWeight: 600 }}>Django & DRF</strong> for robust, scalable backends, and{" "}
              <strong style={{ color: "var(--fg)", fontWeight: 600 }}>React & Next.js</strong> for fast, polished frontends.
              Currently working at Hinet Soft and teaching Python at NTI.
            </motion.p>

            {/* Stats */}
            <motion.div variants={stagger.item} className="stats-grid">
              {stats.map(s => (
                <div key={s.label} style={{
                  padding: "18px 16px", borderRadius: 14,
                  background: "var(--card)", border: "1px solid var(--border-md)",
                  boxShadow: "var(--shadow-sm)",
                }}>
                  <div className="font-display" style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", background: "linear-gradient(135deg, var(--accent-bright), var(--emerald))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1, marginBottom: 4 }}>
                    {s.value}
                  </div>
                  <div className="font-mono" style={{ fontSize: 10, color: "var(--fg-subtle)", letterSpacing: "0.04em" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: trait cards */}
          <div className="trait-grid">
            {traits.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div key={t.title}
                  initial={{ opacity: 0, scale: 0.93, y: 20 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.25 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card gradient-border" style={{ padding: 22 }}
                >
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: "var(--accent-soft)", border: "1px solid var(--accent-muted)",
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14,
                  }}>
                    <Icon size={17} style={{ color: "var(--accent)" }} />
                  </div>
                  <h3 className="font-display" style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-0.01em", color: "var(--fg)", marginBottom: 6 }}>
                    {t.title}
                  </h3>
                  <p className="font-body" style={{ fontSize: 12.5, lineHeight: 1.65, color: "var(--fg-muted)" }}>
                    {t.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
