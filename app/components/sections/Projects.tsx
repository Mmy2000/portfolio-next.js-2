"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, Star, ArrowUpRight, ChevronRight, Tag } from "lucide-react";
import { projects, getAllTags } from "@/app/lib/data";
import type { Project } from "@/app/types";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

type CatFilter = "all" | Project["category"];
const CAT_FILTERS: { label: string; value: CatFilter }[] = [
  { label: "All",        value: "all" },
  { label: "Full Stack", value: "fullstack" },
  { label: "Backend",    value: "backend" },
  { label: "Frontend",   value: "frontend" },
];

function ProjectsInner() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const searchParams = useSearchParams();

  const [catFilter, setCatFilter] = useState<CatFilter>("all");
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [showAll, setShowAll]     = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const allTags = getAllTags();

  // Pick up ?tag= from URL (set by detail page tag links)
  useEffect(() => {
    const tag = searchParams.get("tag");
    if (tag) setTagFilter(tag);
  }, [searchParams]);

  const filtered = projects.filter(p => {
    const catOk = catFilter === "all" || p.category === catFilter;
    const tagOk = !tagFilter || p.tags.includes(tagFilter);
    return catOk && tagOk;
  });
  const visible = showAll ? filtered : filtered.slice(0, 3);

  const clearFilters = () => { setCatFilter("all"); setTagFilter(null); setShowAll(false); };
  const isFiltered = catFilter !== "all" || tagFilter !== null;

  return (
    <section id="projects" className="section-pad">
      <div ref={ref} className="section-container">

        {/* Label */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-label-row">
          <span className="section-tag">03 — Projects</span>
          <div style={{ height: 1, width: 56, background: "linear-gradient(to right, var(--border-md), transparent)" }} />
        </motion.div>

        {/* Heading + category filters */}
        <div className="filter-row">
          <motion.h2 initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            className="font-display heading-lg">
            Selected <span className="gradient-text">Work</span>
          </motion.h2>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }}
            className="filter-buttons">
            {CAT_FILTERS.map(f => (
              <button key={f.value} onClick={() => { setCatFilter(f.value); setShowAll(false); }}
                className="font-mono"
                style={{
                  padding: "7px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "none",
                  background: catFilter === f.value ? "var(--accent)" : "var(--card)",
                  color:      catFilter === f.value ? "#fff"           : "var(--fg-muted)",
                  border:    `1px solid ${catFilter === f.value ? "var(--accent)" : "var(--border-md)"}`,
                  boxShadow:  catFilter === f.value ? "var(--shadow-glow)" : "none",
                  transition: "all 0.2s ease",
                }}>
                {f.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Tag filter bar */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <Tag size={12} style={{ color: "var(--fg-subtle)" }} />
            <span className="font-mono" style={{ fontSize: 10, color: "var(--fg-subtle)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Filter by tag
            </span>
          </div>
          <div className="tag-filter-bar">
            {allTags.map(tag => (
              <button key={tag} onClick={() => { setTagFilter(tagFilter === tag ? null : tag); setShowAll(false); }}
                className={`tag-pill ${tagFilter === tag ? "active" : ""}`}>
                # {tag}
              </button>
            ))}
            {isFiltered && (
              <button onClick={clearFilters} className="font-mono"
                style={{
                  padding: "5px 12px", borderRadius: 999, fontSize: 11, cursor: "none",
                  background: "transparent", border: "1px solid var(--border-md)", color: "var(--fg-subtle)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--fg)"; el.style.borderColor = "var(--border-lg)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--fg-subtle)"; el.style.borderColor = "var(--border-md)"; }}
              >
                ✕ Clear
              </button>
            )}
          </div>
        </motion.div>

        {/* Results count */}
        {isFiltered && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono"
            style={{ fontSize: 11, color: "var(--fg-subtle)", marginBottom: 24, letterSpacing: "0.04em" }}>
            {filtered.length} project{filtered.length !== 1 ? "s" : ""} found
            {tagFilter ? ` tagged #${tagFilter}` : ""}
            {catFilter !== "all" ? ` in ${catFilter}` : ""}
          </motion.p>
        )}

        {/* Projects grid */}
        <div className="projects-grid">
          <AnimatePresence mode="popLayout">
            {visible.length === 0 ? (
              <motion.div key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0" }}>
                <p className="font-body" style={{ color: "var(--fg-muted)", fontSize: 15 }}>
                  No projects match the current filters.
                </p>
                <button onClick={clearFilters} className="btn-ghost" style={{ marginTop: 16 }}>
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              visible.map((p, i) => (
                <motion.article key={p.id} layout
                  initial={{ opacity: 0, scale: 0.94, y: 24 }}
                  animate={{ opacity: 1, scale: 1,    y: 0 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card gradient-border"
                  style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Image */}
                  <div style={{ position: "relative", height: 180, overflow: "hidden", borderRadius: "20px 20px 0 0", flexShrink: 0 }}>
                    <Image src={p.image} alt={p.title} fill
                      style={{ objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)", transform: hoveredId === p.id ? "scale(1.08)" : "scale(1)" }}
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--bg-1) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)" }} />

                    {/* Hover overlay with links */}
                    <div style={{
                      position: "absolute", inset: 0,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                      background: "rgba(7,7,13,0.72)", backdropFilter: "blur(4px)",
                      opacity: hoveredId === p.id ? 1 : 0, transition: "opacity 0.3s ease",
                    }}>
                      <Link href={`/projects/${p.id}`}
                        style={{
                          padding: "9px 18px", borderRadius: 10, background: "var(--accent)",
                          color: "#fff", textDecoration: "none", fontSize: 12, fontWeight: 600,
                          fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 6,
                          transition: "transform 0.2s",
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                      >
                        View Details <ChevronRight size={13} />
                      </Link>
                      {p.githubUrl && (
                        <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                          style={{
                            width: 38, height: 38, borderRadius: 10,
                            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#fff", textDecoration: "none", transition: "transform 0.2s",
                          }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                        ><Github size={16} /></a>
                      )}
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                          style={{
                            width: 38, height: 38, borderRadius: 10,
                            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#fff", textDecoration: "none", transition: "transform 0.2s",
                          }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                        ><ExternalLink size={16} /></a>
                      )}
                    </div>

                    {p.featured && (
                      <div style={{
                        position: "absolute", top: 12, right: 12,
                        display: "flex", alignItems: "center", gap: 4,
                        padding: "3px 10px", borderRadius: 6,
                        background: "var(--gold-soft)", border: "1px solid var(--gold-glow)",
                      }}>
                        <Star size={9} style={{ color: "var(--gold)" }} />
                        <span className="font-mono" style={{ fontSize: 9, fontWeight: 700, color: "var(--gold)", letterSpacing: "0.05em" }}>FEATURED</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: "18px 20px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
                      <h3 className="font-display" style={{ fontSize: 15.5, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg)", lineHeight: 1.25 }}>
                        {p.title}
                      </h3>
                      <span className="font-mono" style={{ fontSize: 10, color: "var(--fg-subtle)", flexShrink: 0, marginTop: 2 }}>{p.year}</span>
                    </div>

                    <p className="font-body" style={{ fontSize: 13, lineHeight: 1.7, color: "var(--fg-muted)", marginBottom: 12, flex: 1 }}>
                      {p.description}
                    </p>

                    {/* Tech stack */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                      {p.techStack.slice(0, 4).map(t => <span key={t} className="chip">{t}</span>)}
                      {p.techStack.length > 4 && <span className="chip">+{p.techStack.length - 4}</span>}
                    </div>

                    {/* Tags row */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {p.tags.slice(0, 3).map(tag => (
                        <button key={tag} onClick={() => setTagFilter(tagFilter === tag ? null : tag)}
                          className="font-mono"
                          style={{
                            padding: "2px 7px", borderRadius: 4, fontSize: 10, cursor: "none",
                            background: tagFilter === tag ? "var(--gold-glow)" : "var(--gold-soft)",
                            border: `1px solid ${tagFilter === tag ? "var(--gold)" : "var(--gold-glow)"}`,
                            color: "var(--gold)", transition: "all 0.15s",
                          }}>
                          #{tag}
                        </button>
                      ))}
                    </div>

                    {/* View details link */}
                    <Link href={`/projects/${p.id}`} className="project-details-link">
                      View Case Study <ChevronRight size={12} />
                    </Link>
                  </div>
                </motion.article>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Show more */}
        {filtered.length > 3 && (
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
            style={{ textAlign: "center", marginTop: 44 }}>
            <button onClick={() => setShowAll(v => !v)} className="btn-ghost" style={{ gap: 8 }}>
              {showAll ? "Show Less" : `View All ${filtered.length} Projects`}
              <ArrowUpRight size={15} style={{ color: "var(--accent)" }} />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default function Projects() {
  return (
    <Suspense fallback={null}>
      <ProjectsInner />
    </Suspense>
  );
}
