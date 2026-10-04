"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, ExternalLink, Github, Tag,
  Calendar, User, Layers, Star, ChevronRight, ArrowUpRight,
} from "lucide-react";
import type { Project } from "@/app/types";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import { RevealLines, FadeIn } from "@/app/components/ui/Reveal";
import TiltCard from "@/app/components/ui/TiltCard";
import Magnetic from "@/app/components/ui/Magnetic";
import { useIntroDone, EASE_OUT_EXPO } from "@/app/lib/intro";

interface Props {
  project: Project;
  related: Project[];
}

const CATEGORY_COLOR: Record<Project["category"], string> = {
  fullstack: "var(--accent)",
  backend:   "var(--gold)",
  frontend:  "#34d399",
};

export default function ProjectDetailClient({ project, related }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const intro = useIntroDone();

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY     = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const titleY   = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const show = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: intro ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, delay, ease: EASE_OUT_EXPO },
  });

  return (
    <>
      <Navbar />

      <main style={{ minHeight: "100vh" }}>

        {/* ── HERO BANNER ─────────────────────────────────── */}
        <section ref={heroRef} style={{ position: "relative", height: "72vh", minHeight: 440, overflow: "hidden" }}>
          {/* Image stack fades out at the bottom so the hero melts into the page */}
          <div style={{
            position: "absolute", inset: 0,
            WebkitMaskImage: "linear-gradient(to bottom, #000 82%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, #000 82%, transparent 100%)",
          }}>
          <motion.div style={{ position: "absolute", inset: 0, y: imgY, scale: imgScale }}>
            <AnimatePresence initial={false}>
              <motion.div key={activeImage} style={{ position: "absolute", inset: 0 }}
                initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: EASE_OUT_EXPO }}>
                <Image
                  src={project.images[activeImage] ?? project.image}
                  alt={project.title}
                  fill priority sizes="100vw"
                  style={{ objectFit: "cover" }}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Fixed dark scrim (not var(--bg)) keeps the white title legible in both themes */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(4,5,15,0.92) 0%, rgba(4,5,15,0.6) 50%, rgba(4,5,15,0.35) 100%)",
          }} />
          <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.12 }} />
          </div>

          {/* Back button */}
          <motion.div {...show(0)} style={{ position: "absolute", top: 110, left: 0, right: 0, zIndex: 10 }}>
            <div className="section-container">
              <Link href="/#projects" className="font-body back-link">
                <ArrowLeft size={15} /> Back to Projects
              </Link>
            </div>
          </motion.div>

          {/* Title overlay */}
          <motion.div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10, y: titleY }}>
            <div className="section-container" style={{ paddingBottom: "clamp(72px, 14vh, 120px)" }}>
              <motion.div {...show(0.1)} style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
                <span className="font-mono" style={{
                  padding: "5px 12px", borderRadius: 999, fontSize: 10.5, fontWeight: 700,
                  background: CATEGORY_COLOR[project.category], color: "#07070d",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                }}>
                  {project.category}
                </span>
                {project.featured && (
                  <span className="font-mono" style={{
                    display: "flex", alignItems: "center", gap: 5,
                    padding: "5px 12px", borderRadius: 999, fontSize: 10.5, fontWeight: 700,
                    background: "rgba(245,158,11,0.18)", border: "1px solid rgba(245,158,11,0.45)", color: "#fbbf24",
                    backdropFilter: "blur(8px)",
                  }}>
                    <Star size={10} style={{ fill: "#fbbf24" }} /> Featured
                  </span>
                )}
                <span className="font-mono" style={{
                  padding: "5px 12px", borderRadius: 999, fontSize: 10.5, fontWeight: 600,
                  background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(8px)",
                }}>
                  {project.year}
                </span>
              </motion.div>

              <RevealLines as="h1" waitForIntro delay={0.15} className="font-display"
                style={{ fontSize: "clamp(2.2rem, 6.5vw, 4.8rem)", fontWeight: 800, letterSpacing: "-0.045em", color: "#fff", lineHeight: 1 }}
                lines={[{ text: project.title }]} />
            </div>
          </motion.div>
        </section>

        {/* ── MAIN CONTENT ────────────────────────────────── */}
        <div className="section-container" style={{ paddingTop: 56, paddingBottom: 80 }}>
          <div className="project-detail-grid">

            {/* ── LEFT COLUMN ─────────────────────────────── */}
            <div>
              <div style={{ display: "grid", gap: 10, marginBottom: 48 }} className="project-meta-grid">
                {[
                  { icon: Calendar, label: "Year",     value: project.year },
                  { icon: User,     label: "Role",     value: project.role },
                  { icon: Layers,   label: "Category", value: project.category },
                ].map(({ icon: Icon, label, value }, i) => (
                  <FadeIn key={label} delay={0.05 + i * 0.06} className="glass-card spotlight" style={{ padding: "16px 18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <Icon size={13} style={{ color: "var(--accent-bright)" }} />
                      <span className="font-mono" style={{ fontSize: 10, color: "var(--fg-muted)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{label}</span>
                    </div>
                    <span className="font-display" style={{ fontSize: 15, fontWeight: 700, color: "var(--fg)", textTransform: "capitalize" }}>{value}</span>
                  </FadeIn>
                ))}
              </div>

              <div style={{ marginBottom: 44 }}>
                <RevealLines className="font-display" style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}
                  lines={[{ text: "Overview" }]} />
                <FadeIn delay={0.1} as="p" className="font-body" style={{ fontSize: 16.5, lineHeight: 1.85, color: "var(--fg-muted)" }}>
                  {project.longDescription}
                </FadeIn>
              </div>

              <div className="challenge-solution-grid" style={{ marginBottom: 48 }}>
                {[
                  { label: "The Challenge", text: project.challenge, accent: "var(--gold)",   n: "01" },
                  { label: "The Solution",  text: project.solution,  accent: "var(--accent)", n: "02" },
                ].map(({ label, text, accent, n }, i) => (
                  <FadeIn key={label} delay={i * 0.1} className="glass-card spotlight" style={{ padding: "26px 26px", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${accent}, transparent)` }} />
                    <div className="font-mono" style={{ fontSize: 10.5, color: accent, letterSpacing: "0.14em", marginBottom: 10 }}>{n}</div>
                    <h3 className="font-display" style={{ fontSize: 17, fontWeight: 800, color: "var(--fg)", marginBottom: 12, letterSpacing: "-0.02em" }}>
                      {label}
                    </h3>
                    <p className="font-body" style={{ fontSize: 14.5, lineHeight: 1.8, color: "var(--fg-muted)" }}>
                      {text}
                    </p>
                  </FadeIn>
                ))}
              </div>

              <div style={{ marginBottom: 48 }}>
                <RevealLines className="font-display" style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 20 }}
                  lines={[{ text: "Key Features" }]} />
                <div className="features-grid">
                  {project.features.map((f, i) => (
                    <FadeIn key={f.title} delay={(i % 2) * 0.08} y={20}
                      className="glass-card spotlight" style={{ padding: "18px 20px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <span className="font-mono" style={{ fontSize: 11, fontWeight: 700, color: "var(--accent-bright)", marginTop: 2, minWidth: 18 }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <div className="font-display" style={{ fontSize: 14.5, fontWeight: 700, color: "var(--fg)", marginBottom: 4 }}>
                          {f.title}
                        </div>
                        <div className="font-body" style={{ fontSize: 13.5, lineHeight: 1.65, color: "var(--fg-muted)" }}>
                          {f.description}
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>

              {project.metrics && project.metrics.length > 0 && (
                <div style={{ marginBottom: 40 }}>
                  <RevealLines className="font-display" style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}
                    lines={[{ text: "Impact & Highlights" }]} />
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {project.metrics.map((m, i) => (
                      <motion.span key={m}
                        initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06, type: "spring", stiffness: 260, damping: 18 }}
                        className="font-body"
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 8,
                          padding: "9px 16px", borderRadius: 999,
                          background: "var(--accent-soft)", border: "1px solid var(--accent-muted)",
                          color: "var(--accent-bright)", fontSize: 13.5, fontWeight: 500,
                        }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--emerald)", flexShrink: 0, boxShadow: "0 0 8px var(--emerald-glow)" }} />
                        {m}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── RIGHT SIDEBAR ────────────────────────────── */}
            <aside>
              {project.images.length > 1 && (
                <FadeIn delay={0.1} className="glass-card" style={{ padding: 16, marginBottom: 16 }}>
                  <h3 className="font-display" style={{ fontSize: 14, fontWeight: 700, color: "var(--fg)", marginBottom: 12, display: "flex", justifyContent: "space-between" }}>
                    Gallery
                    <span className="font-mono" style={{ fontSize: 11, color: "var(--fg-muted)", fontWeight: 500 }}>
                      {String(activeImage + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
                    </span>
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                    {project.images.map((img, i) => (
                      <button key={i} onClick={() => setActiveImage(i)} aria-label={`Show screenshot ${i + 1}`}
                        style={{
                          position: "relative", aspectRatio: "1", borderRadius: 10, overflow: "hidden",
                          border: `2px solid ${activeImage === i ? "var(--accent)" : "var(--border-md)"}`,
                          transition: "border-color 0.25s, transform 0.35s var(--ease-spring), opacity 0.25s",
                          cursor: "pointer", padding: 0, background: "none",
                          opacity: activeImage === i ? 1 : 0.6,
                          boxShadow: activeImage === i ? "var(--shadow-glow)" : "none",
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.opacity = activeImage === i ? "1" : "0.6"; }}
                      >
                        <Image src={img} alt={`${project.title} screenshot ${i + 1}`} fill
                          style={{ objectFit: "cover" }} sizes="120px" />
                      </button>
                    ))}
                  </div>
                </FadeIn>
              )}

              <FadeIn delay={0.15} className="glass-card" style={{ padding: "20px 20px", marginBottom: 16 }}>
                <h3 className="font-display" style={{ fontSize: 14, fontWeight: 700, color: "var(--fg)", marginBottom: 14 }}>
                  Tech Stack
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {project.techStack.map(t => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.2} className="glass-card" style={{ padding: "20px 20px", marginBottom: 16 }}>
                <h3 className="font-display" style={{ fontSize: 14, fontWeight: 700, color: "var(--fg)", marginBottom: 14, display: "flex", alignItems: "center", gap: 7 }}>
                  <Tag size={13} style={{ color: "var(--accent-bright)" }} /> Tags
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {project.tags.map(tag => (
                    <Link key={tag} href={`/?tag=${encodeURIComponent(tag)}#projects`} className="tag-pill" style={{ textDecoration: "none" }}>
                      # {tag}
                    </Link>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.25} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {project.liveUrl && (
                  <Magnetic strength={0.15} style={{ display: "flex" }}>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="btn-primary" style={{ width: "100%" }}>
                      <ExternalLink size={15} /> View Live Demo
                    </a>
                  </Magnetic>
                )}
                {project.githubUrl && (
                  <Magnetic strength={0.15} style={{ display: "flex" }}>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="btn-ghost" style={{ width: "100%" }}>
                      <Github size={15} /> Source Code
                    </a>
                  </Magnetic>
                )}
              </FadeIn>
            </aside>
          </div>

          {/* ── RELATED PROJECTS ────────────────────────────── */}
          {related.length > 0 && (
            <div style={{ marginTop: 100 }}>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
                <RevealLines className="font-display heading-lg"
                  lines={[{ text: "Related" }, { text: "Projects", gradient: true }]} />
                <Link href="/#projects" className="link-hover font-body"
                  style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 14, color: "var(--accent-bright)", fontWeight: 500 }}>
                  View All <ChevronRight size={14} />
                </Link>
              </div>

              <div className="projects-grid">
                {related.map((rp, i) => (
                  <FadeIn key={rp.id} delay={i * 0.08} y={40}>
                    <TiltCard className="glass-card spotlight project-card" max={6}>
                      <Link href={`/projects/${rp.id}`} data-cursor-label="View" style={{ textDecoration: "none", display: "flex", flexDirection: "column", height: "100%" }}>
                        <div className="project-card-media" style={{ height: 170 }}>
                          <Image src={rp.image} alt={rp.title} fill style={{ objectFit: "cover" }}
                            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
                          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(4,5,15,0.8), transparent 60%)" }} />
                          <span className="font-mono" style={{
                            position: "absolute", top: 12, left: 12,
                            padding: "3px 9px", borderRadius: 999, fontSize: 9, fontWeight: 700,
                            background: CATEGORY_COLOR[rp.category],
                            color: "#07070d", textTransform: "uppercase", letterSpacing: "0.1em",
                          }}>
                            {rp.category}
                          </span>
                        </div>
                        <div style={{ padding: "18px 20px", flex: 1 }}>
                          <h3 className="font-display" style={{ fontSize: 15.5, fontWeight: 800, color: "var(--fg)", marginBottom: 6, letterSpacing: "-0.02em", lineHeight: 1.25, display: "flex", justifyContent: "space-between", gap: 8 }}>
                            {rp.title}
                            <ArrowUpRight size={16} style={{ color: "var(--accent-bright)", flexShrink: 0 }} />
                          </h3>
                          <p className="font-body" style={{ fontSize: 13, lineHeight: 1.65, color: "var(--fg-muted)", marginBottom: 12 }}>
                            {rp.description.slice(0, 90)}…
                          </p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                            {rp.techStack.slice(0, 3).map(t => <span key={t} className="chip" style={{ fontSize: 10 }}>{t}</span>)}
                          </div>
                        </div>
                      </Link>
                    </TiltCard>
                  </FadeIn>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
