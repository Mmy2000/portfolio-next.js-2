"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Plus, GraduationCap, BookOpen, Award } from "lucide-react";
import { experiences, education, courses } from "@/app/lib/data";
import { RevealLines, FadeIn, SectionLabel } from "@/app/components/ui/Reveal";
import { EASE_OUT_EXPO } from "@/app/lib/intro";

// "Dubai, UAE (Remote)" → "UAE"
const countries = new Set(
  experiences
    .filter(e => e.location)
    .map(e => e.location!.split(",").pop()!.replace(/\(.*\)/, "").trim())
).size;

export default function Experience() {
  const [open, setOpen] = useState<string | null>(experiences[0].id);
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <section id="experience" className="section-pad">
      <div style={{
        position: "absolute", top: 0, left: 0, width: "50%", height: "100%",
        background: "radial-gradient(ellipse 55% 60% at 0% 50%, var(--gold-soft), transparent)",
        pointerEvents: "none",
      }} />

      <div className="section-container" style={{ position: "relative" }}>
        <SectionLabel index="04" label="Experience" />

        <div className="two-col-experience">
          {/* Left heading (sticky on desktop) */}
          <div className="sticky-col">
            <RevealLines className="font-display heading-lg" style={{ marginBottom: 20 }}
              lines={[{ text: "Where I've" }, { text: "worked", gradient: true }]} />
            <FadeIn delay={0.15} as="p" className="font-body"
              style={{ fontSize: 15.5, lineHeight: 1.8, color: "var(--fg-muted)", marginBottom: 28 }}>
              From agency work in Dubai to product teams in Egypt and teaching at NTI — always building things that matter.
            </FadeIn>
            <FadeIn delay={0.22}>
              <div style={{ display: "flex", gap: 28 }}>
                {[
                  { n: String(experiences.length).padStart(2, "0"), l: "Roles" },
                  { n: String(countries).padStart(2, "0"), l: "Countries" },
                ].map(s => (
                  <div key={s.l}>
                    <div className="font-display gradient-text" style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.n}</div>
                    <div className="font-mono" style={{ fontSize: 10, color: "var(--fg-muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 6 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Timeline */}
          <div ref={listRef} className="timeline">
            <div className="timeline-rail">
              <motion.div className="timeline-fill" style={{ scaleY: fill }} />
            </div>

            {experiences.map((exp, i) => {
              const isOpen = open === exp.id;
              return (
                <motion.div key={exp.id} style={{ position: "relative" }}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease: EASE_OUT_EXPO }}>
                  <span className="timeline-node" data-open={isOpen} />

                  <div className="glass-card spotlight"
                    style={{
                      overflow: "hidden",
                      borderColor: isOpen ? "var(--emerald-glow)" : undefined,
                      boxShadow: isOpen ? "var(--shadow-emerald)" : undefined,
                    }}>
                    <button onClick={() => setOpen(isOpen ? null : exp.id)} aria-expanded={isOpen}
                      style={{
                        width: "100%", display: "flex", alignItems: "center",
                        justifyContent: "space-between", gap: 12,
                        padding: "20px 22px", textAlign: "left",
                        background: "transparent", border: "none", cursor: "pointer",
                      }}>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div className="font-display" style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg)", lineHeight: 1.3, wordBreak: "break-word" }}>
                          {exp.role}
                        </div>
                        <div className="font-mono" style={{ fontSize: 11.5, color: "var(--emerald)", marginTop: 4 }}>
                          {exp.company}
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
                        <div className="exp-meta">
                          <span className="font-mono" style={{ fontSize: 10.5, color: "var(--fg-muted)", display: "flex", alignItems: "center", gap: 5 }}>
                            <Calendar size={10} />{exp.period}
                          </span>
                          {exp.location && (
                            <span className="font-mono" style={{ fontSize: 10, color: "var(--fg-muted)", opacity: 0.75, display: "flex", alignItems: "center", gap: 5 }}>
                              <MapPin size={10} />{exp.location}
                            </span>
                          )}
                        </div>
                        <motion.span
                          animate={{ rotate: isOpen ? 135 : 0 }}
                          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                          style={{
                            width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                            border: `1px solid ${isOpen ? "var(--emerald)" : "var(--border-md)"}`,
                            color: isOpen ? "var(--emerald)" : "var(--fg-muted)",
                            transition: "border-color 0.3s, color 0.3s",
                          }}>
                          <Plus size={14} />
                        </motion.span>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                          style={{ overflow: "hidden" }}>
                          <div style={{ padding: "0 22px 22px", borderTop: "1px solid var(--border)" }}>
                            <div className="font-mono exp-meta-inline" style={{ fontSize: 10.5, color: "var(--fg-muted)", marginTop: 16, marginBottom: 12, gap: 14, flexWrap: "wrap" }}>
                              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Calendar size={10} />{exp.period}</span>
                              {exp.location && <span style={{ display: "flex", alignItems: "center", gap: 5 }}><MapPin size={10} />{exp.location}</span>}
                            </div>
                            <p className="font-body" style={{ fontSize: 14, lineHeight: 1.75, color: "var(--fg-muted)", marginTop: 16, marginBottom: 16 }}>
                              {exp.description}
                            </p>
                            <ul style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 18, listStyle: "none" }}>
                              {exp.highlights.map((h, j) => (
                                <motion.li key={h}
                                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 + j * 0.05, duration: 0.5, ease: EASE_OUT_EXPO }}
                                  style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--emerald)", marginTop: 8, flexShrink: 0, boxShadow: "0 0 8px var(--emerald-glow)" }} />
                                  <span className="font-body" style={{ fontSize: 13.5, lineHeight: 1.65, color: "var(--fg-muted)" }}>{h}</span>
                                </motion.li>
                              ))}
                            </ul>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                              {exp.technologies.map(t => <span key={t} className="chip">{t}</span>)}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        {/* ── Education & courses ───────────────────────── */}
        <div style={{ marginTop: 96 }}>
          <RevealLines as="h3" className="font-display" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.035em", marginBottom: 28 }}
            lines={[{ text: "Education & " }, { text: "learning", gradient: true }]} />

          <div className="edu-grid">
            {/* Degree */}
            <FadeIn className="glass-card spotlight" style={{ padding: 28, overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, var(--emerald), var(--accent), transparent)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                <div className="icon-tile" style={{ width: 46, height: 46, color: "var(--emerald)" }}><GraduationCap size={20} /></div>
                <div>
                  <div className="font-display" style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg)" }}>{education.school}</div>
                  <div className="font-body" style={{ fontSize: 14, color: "var(--fg-muted)" }}>{education.degree}</div>
                </div>
              </div>
              <div className="font-mono" style={{ fontSize: 10.5, color: "var(--fg-muted)", display: "flex", alignItems: "center", gap: 5, marginBottom: 18 }}>
                <Calendar size={10} />{education.period}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
                <span className="chip" style={{ fontSize: 11, padding: "4px 10px" }}>Grade: {education.grade}</span>
                <span className="chip" style={{ fontSize: 11, padding: "4px 10px", color: "var(--gold)", background: "var(--gold-soft)", borderColor: "var(--gold-glow)" }}>
                  <Award size={11} style={{ marginRight: 5 }} />Graduation Project: {education.projectGrade}
                </span>
              </div>
              <p className="font-body" style={{ fontSize: 14, lineHeight: 1.7, color: "var(--fg-muted)" }}>
                <span style={{ color: "var(--fg)", fontWeight: 600 }}>Graduation project — </span>{education.project}
              </p>
            </FadeIn>

            {/* Courses */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {courses.map((c, i) => (
                <FadeIn key={c.title} delay={0.08 + i * 0.07} y={20} className="glass-card spotlight"
                  style={{ padding: "16px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div className="icon-tile" style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0 }}><BookOpen size={15} /></div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div className="font-display" style={{ fontSize: 14.5, fontWeight: 700, color: "var(--fg)", lineHeight: 1.35, marginBottom: 3 }}>{c.title}</div>
                    <div className="font-body" style={{ fontSize: 12.5, color: "var(--emerald)", marginBottom: 4 }}>{c.provider}</div>
                    <div className="font-mono" style={{ fontSize: 10, color: "var(--fg-muted)", letterSpacing: "0.04em" }}>{c.period} · {c.mode}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
