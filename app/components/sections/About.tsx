"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Server, Layers, Zap } from "lucide-react";
import { RevealLines, FadeIn, SectionLabel } from "@/app/components/ui/Reveal";
import CountUp from "@/app/components/ui/CountUp";
import { EASE_OUT_EXPO } from "@/app/lib/intro";

const stats = [
  { value: "4+",  label: "Years Experience" },
  { value: "6+",  label: "Projects Shipped" },
  { value: "4",   label: "Companies" },
  { value: "AI",  label: "Excellent Grad Project" },
];

const traits = [
  { icon: Server,  title: "Backend Architecture", desc: "APIs and data systems designed to scale. PostgreSQL, Redis, Celery — I think in systems." },
  { icon: Layers,  title: "Full-Stack Ownership",  desc: "From schema to pixel — no handoffs, no guessing. I own every layer." },
  { icon: Code2,   title: "Code Craftsmanship",    desc: "Readable, tested, documented code isn't a luxury. It's the standard." },
  { icon: Zap,     title: "Performance-First",     desc: "Sub-second APIs, optimized queries, buttery-smooth UIs at 60fps." },
];

export default function About() {
  const gridRef = useRef(null);
  const inView  = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="section-pad">
      <div className="section-container">
        <SectionLabel index="01" label="About" />

        <div className="two-col-about">
          {/* Left */}
          <div>
            <RevealLines className="font-display heading-lg" style={{ marginBottom: 28 }}
              lines={[{ text: "Crafting software" }, { text: "that endures", gradient: true }]} />

            <FadeIn delay={0.15} as="p" className="font-body"
              style={{ fontSize: 16, lineHeight: 1.85, color: "var(--fg-muted)", marginBottom: 16 }}>
              I&apos;m Mahmoud — a Computer Science graduate from Zagazig University (Class of 2023) and a Full Stack
              Developer based in Cairo, Egypt. I specialize in building production-grade web applications end-to-end.
            </FadeIn>

            <FadeIn delay={0.22} as="p" className="font-body"
              style={{ fontSize: 16, lineHeight: 1.85, color: "var(--fg-muted)", marginBottom: 40 }}>
              My core stack is{" "}
              <strong style={{ color: "var(--fg)", fontWeight: 600 }}>Django & DRF</strong> for robust, scalable backends, and{" "}
              <strong style={{ color: "var(--fg)", fontWeight: 600 }}>React & Next.js</strong> for fast, polished frontends.
              Currently building ERP & CRM systems at Software House Solutions and teaching Python at NTI.
            </FadeIn>

            {/* Stats */}
            <div className="stats-grid">
              {stats.map((s, i) => (
                <FadeIn key={s.label} delay={0.3 + i * 0.08} className="glass-card spotlight stat-card">
                  <div className="font-display stat-value gradient-text">
                    <CountUp value={s.value} />
                  </div>
                  <div className="font-mono" style={{ fontSize: 10, color: "var(--fg-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {s.label}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right: trait cards */}
          <div ref={gridRef} className="trait-grid">
            {traits.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div key={t.title}
                  initial={{ opacity: 0, y: 40, rotateX: -20 }}
                  animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
                  whileHover={{ y: -6, transition: { duration: 0.4, ease: EASE_OUT_EXPO } }}
                  transition={{ duration: 1, delay: 0.15 + i * 0.1, ease: EASE_OUT_EXPO }}
                  className="glass-card spotlight" style={{ padding: 24, transformPerspective: 800 }}
                >
                  <div className="icon-tile" style={{ marginBottom: 18 }}>
                    <Icon size={18} />
                  </div>
                  <h3 className="font-display" style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em", color: "var(--fg)", marginBottom: 8 }}>
                    {t.title}
                  </h3>
                  <p className="font-body" style={{ fontSize: 13.5, lineHeight: 1.7, color: "var(--fg-muted)" }}>
                    {t.desc}
                  </p>
                  <span className="font-mono" style={{ position: "absolute", top: 20, right: 22, fontSize: 10, color: "var(--fg-subtle)", letterSpacing: "0.1em" }}>
                    0{i + 1}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
