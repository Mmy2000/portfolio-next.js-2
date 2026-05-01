"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, ExternalLink, Github, Tag,
  Calendar, User, Layers, Star, ChevronRight,
} from "lucide-react";
import type { Project } from "@/app/types";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import ScrollProgress from "@/app/components/ui/ScrollProgress";
import CustomCursor from "@/app/components/ui/CustomCursor";
import { ThemeProvider } from "@/app/components/ui/ThemeProvider";

interface Props {
  project: Project;
  related: Project[];
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function ProjectDetailClient({ project, related }: Props) {
  const [activeImage, setActiveImage] = useState(0);

  const categoryColor = {
    fullstack: "var(--accent)",
    backend:   "var(--gold)",
    frontend:  "#34d399",
  }[project.category];

  return (
    <ThemeProvider>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main style={{ minHeight: "100vh", background: "var(--bg)" }}>

        {/* ── HERO BANNER ─────────────────────────────────── */}
        <section style={{ position: "relative", height: "60vh", minHeight: 380, overflow: "hidden" }}>
          <Image
            src={project.images[activeImage] ?? project.image}
            alt={project.title}
            fill
            style={{ objectFit: "cover", transition: "opacity 0.5s ease" }}
            priority
            sizes="100vw"
          />
          {/* Dark overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, var(--bg) 0%, rgba(7,7,13,0.55) 60%, rgba(7,7,13,0.3) 100%)",
          }} />

          {/* Grid bg */}
          <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.12 }} />

          {/* Back button */}
          <motion.div {...fadeUp(0)} style={{ position: "absolute", top: 100, left: 0, right: 0, zIndex: 10 }}>
            <div className="section-container">
              <Link href="/#projects"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "8px 16px", borderRadius: 10,
                  background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.85)", textDecoration: "none", backdropFilter: "blur(8px)",
                  fontSize: 13, fontWeight: 500, transition: "all 0.2s",
                }}
                className="font-body"
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.15)"; el.style.color = "#fff"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.08)"; el.style.color = "rgba(255,255,255,0.85)"; }}
              >
                <ArrowLeft size={15} /> Back to Projects
              </Link>
            </div>
          </motion.div>

          {/* Title overlay */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10 }}>
            <div className="section-container" style={{ paddingBottom: 40 }}>
              <motion.div {...fadeUp(0.1)} style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                <span style={{
                  padding: "4px 12px", borderRadius: 6, fontSize: 11, fontWeight: 700,
                  background: categoryColor, color: "#07070d",
                  fontFamily: "var(--font-mono)", letterSpacing: "0.08em", textTransform: "uppercase",
                }}>
                  {project.category}
                </span>
                {project.featured && (
                  <span style={{
                    display: "flex", alignItems: "center", gap: 4,
                    padding: "4px 12px", borderRadius: 6, fontSize: 11, fontWeight: 700,
                    background: "var(--gold-soft)", border: "1px solid var(--gold-glow)", color: "var(--gold)",
                    fontFamily: "var(--font-mono)",
                  }}>
                    <Star size={10} /> Featured
                  </span>
                )}
              </motion.div>

              <motion.h1 {...fadeUp(0.15)} className="font-display"
                style={{ fontSize: "clamp(1.9rem, 5vw, 3.2rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.1, marginBottom: 0 }}>
                {project.title}
              </motion.h1>
            </div>
          </div>
        </section>

        {/* ── MAIN CONTENT ────────────────────────────────── */}
        <div className="section-container" style={{ paddingTop: 56, paddingBottom: 80 }}>
          <div className="project-detail-grid">

            {/* ── LEFT COLUMN ─────────────────────────────── */}
            <div>
              {/* Meta cards row */}
              <motion.div {...fadeUp(0.05)}
                style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 40 }}
                className="project-meta-grid"
              >
                {[
                  { icon: Calendar, label: "Year",     value: project.year },
                  { icon: User,     label: "Role",     value: project.role },
                  { icon: Layers,   label: "Category", value: project.category },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="glass-card" style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <Icon size={13} style={{ color: "var(--accent)" }} />
                      <span className="font-mono" style={{ fontSize: 10, color: "var(--fg-subtle)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
                    </div>
                    <span className="font-display" style={{ fontSize: 14, fontWeight: 700, color: "var(--fg)", textTransform: "capitalize" }}>{value}</span>
                  </div>
                ))}
              </motion.div>

              {/* Description */}
              <motion.div {...fadeUp(0.1)} style={{ marginBottom: 36 }}>
                <h2 className="font-display" style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg)", marginBottom: 14 }}>
                  Overview
                </h2>
                <p className="font-body" style={{ fontSize: 15.5, lineHeight: 1.85, color: "var(--fg-muted)" }}>
                  {project.longDescription}
                </p>
              </motion.div>

              {/* Challenge / Solution */}
              <motion.div {...fadeUp(0.15)} style={{ display: "grid", gap: 16, marginBottom: 40 }} className="challenge-solution-grid">
                {[
                  { label: "The Challenge", text: project.challenge, accent: "var(--gold)" },
                  { label: "The Solution",  text: project.solution,  accent: "var(--accent)" },
                ].map(({ label, text, accent }) => (
                  <div key={label} className="glass-card" style={{ padding: "22px 24px", borderLeft: `3px solid ${accent}` }}>
                    <h3 className="font-display" style={{ fontSize: 15, fontWeight: 800, color: "var(--fg)", marginBottom: 10, letterSpacing: "-0.01em" }}>
                      {label}
                    </h3>
                    <p className="font-body" style={{ fontSize: 14, lineHeight: 1.8, color: "var(--fg-muted)" }}>
                      {text}
                    </p>
                  </div>
                ))}
              </motion.div>

              {/* Features */}
              <motion.div {...fadeUp(0.2)} style={{ marginBottom: 40 }}>
                <h2 className="font-display" style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg)", marginBottom: 18 }}>
                  Key Features
                </h2>
                <div style={{ display: "grid", gap: 12 }} className="features-grid">
                  {project.features.map((f, i) => (
                    <motion.div key={f.title}
                      initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="glass-card" style={{ padding: "16px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}
                    >
                      <div style={{
                        width: 8, height: 8, borderRadius: "50%", background: "var(--accent)",
                        marginTop: 7, flexShrink: 0, boxShadow: "0 0 8px var(--accent-glow)",
                      }} />
                      <div>
                        <div className="font-display" style={{ fontSize: 14, fontWeight: 700, color: "var(--fg)", marginBottom: 4 }}>
                          {f.title}
                        </div>
                        <div className="font-body" style={{ fontSize: 13, lineHeight: 1.65, color: "var(--fg-muted)" }}>
                          {f.description}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Metrics */}
              {project.metrics && project.metrics.length > 0 && (
                <motion.div {...fadeUp(0.25)} style={{ marginBottom: 40 }}>
                  <h2 className="font-display" style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg)", marginBottom: 14 }}>
                    Impact & Highlights
                  </h2>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {project.metrics.map(m => (
                      <span key={m} style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        padding: "8px 14px", borderRadius: 10,
                        background: "var(--accent-soft)", border: "1px solid var(--accent-muted)",
                        color: "var(--accent)", fontSize: 13, fontWeight: 500,
                        fontFamily: "var(--font-body)",
                      }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
                        {m}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* ── RIGHT SIDEBAR ────────────────────────────── */}
            <aside>

              {/* Image gallery */}
              {project.images.length > 1 && (
                <motion.div {...fadeUp(0.1)} className="glass-card" style={{ padding: 16, marginBottom: 20 }}>
                  <h3 className="font-display" style={{ fontSize: 14, fontWeight: 700, color: "var(--fg)", marginBottom: 12 }}>
                    Gallery
                  </h3>
                  <div style={{ display: "grid", gap: 8 }}>
                    {project.images.map((img, i) => (
                      <button key={i} onClick={() => setActiveImage(i)} style={{
                        position: "relative", height: 88, borderRadius: 10, overflow: "hidden",
                        border: `2px solid ${activeImage === i ? "var(--accent)" : "var(--border-md)"}`,
                        transition: "border-color 0.2s, transform 0.2s",
                        cursor: "none", padding: 0,
                        boxShadow: activeImage === i ? "var(--shadow-glow)" : "none",
                      }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                      >
                        <Image src={img} alt={`${project.title} screenshot ${i + 1}`} fill
                          style={{ objectFit: "cover" }} sizes="300px" />
                        {activeImage === i && (
                          <div style={{ position: "absolute", inset: 0, background: "rgba(124,109,240,0.2)" }} />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tech stack */}
              <motion.div {...fadeUp(0.15)} className="glass-card" style={{ padding: "20px 20px", marginBottom: 20 }}>
                <h3 className="font-display" style={{ fontSize: 14, fontWeight: 700, color: "var(--fg)", marginBottom: 14 }}>
                  Tech Stack
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {project.techStack.map(t => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </motion.div>

              {/* Tags */}
              <motion.div {...fadeUp(0.2)} className="glass-card" style={{ padding: "20px 20px", marginBottom: 20 }}>
                <h3 className="font-display" style={{ fontSize: 14, fontWeight: 700, color: "var(--fg)", marginBottom: 14, display: "flex", alignItems: "center", gap: 7 }}>
                  <Tag size={13} style={{ color: "var(--accent)" }} /> Tags
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {project.tags.map(tag => (
                    <Link key={tag} href={`/?tag=${encodeURIComponent(tag)}#projects`}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 4,
                        padding: "4px 10px", borderRadius: 6,
                        background: "var(--gold-soft)", border: "1px solid var(--gold-glow)",
                        color: "var(--gold)", fontSize: 11.5, fontWeight: 500,
                        fontFamily: "var(--font-mono)", textDecoration: "none",
                        transition: "background 0.2s, border-color 0.2s",
                      }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--gold-glow)"; el.style.borderColor = "var(--gold)"; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--gold-soft)"; el.style.borderColor = "var(--gold-glow)"; }}
                    >
                      # {tag}
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* CTA links */}
              <motion.div {...fadeUp(0.25)} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="btn-primary" style={{ textDecoration: "none", justifyContent: "center" }}>
                    <ExternalLink size={15} /> View Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="btn-ghost" style={{ textDecoration: "none", justifyContent: "center" }}>
                    <Github size={15} /> Source Code
                  </a>
                )}
              </motion.div>
            </aside>
          </div>

          {/* ── RELATED PROJECTS ────────────────────────────── */}
          {related.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginTop: 80 }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
                <h2 className="font-display" style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg)" }}>
                  Related Projects
                </h2>
                <Link href="/#projects" className="font-body"
                  style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "var(--accent)", textDecoration: "none", fontWeight: 500 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.75"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                >
                  View All <ChevronRight size={14} />
                </Link>
              </div>

              <div className="projects-grid">
                {related.map((rp, i) => (
                  <motion.div key={rp.id}
                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.55 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link href={`/projects/${rp.id}`} style={{ textDecoration: "none", display: "block" }}>
                      <div className="glass-card gradient-border" style={{ overflow: "hidden" }}>
                        {/* Image */}
                        <div style={{ position: "relative", height: 140, overflow: "hidden" }}>
                          <Image src={rp.image} alt={rp.title} fill
                            style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                            onMouseEnter={e => { (e.target as HTMLElement).style.transform = "scale(1.06)"; }}
                            onMouseLeave={e => { (e.target as HTMLElement).style.transform = "scale(1)"; }}
                          />
                          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--bg-1), transparent 60%)" }} />
                          <span style={{
                            position: "absolute", top: 10, left: 10,
                            padding: "3px 8px", borderRadius: 5, fontSize: 9, fontWeight: 700,
                            background: {
                              fullstack: "var(--accent)", backend: "var(--gold)", frontend: "#34d399",
                            }[rp.category],
                            color: "#07070d", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.08em",
                          }}>
                            {rp.category}
                          </span>
                        </div>
                        {/* Content */}
                        <div style={{ padding: "16px 18px" }}>
                          <h3 className="font-display" style={{ fontSize: 14, fontWeight: 800, color: "var(--fg)", marginBottom: 6, letterSpacing: "-0.01em", lineHeight: 1.25 }}>
                            {rp.title}
                          </h3>
                          <p className="font-body" style={{ fontSize: 12.5, lineHeight: 1.65, color: "var(--fg-muted)", marginBottom: 12 }}>
                            {rp.description.slice(0, 90)}…
                          </p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                            {rp.techStack.slice(0, 3).map(t => <span key={t} className="chip" style={{ fontSize: 10 }}>{t}</span>)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </ThemeProvider>
  );
}
