"use client";
import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, Star, ArrowUpRight, ChevronRight, Tag, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { projects, getAllTags } from "@/app/lib/data";
import type { Project } from "@/app/types";
import { RevealLines, FadeIn, SectionLabel } from "@/app/components/ui/Reveal";
import TiltCard from "@/app/components/ui/TiltCard";
import Magnetic from "@/app/components/ui/Magnetic";
import { EASE_OUT_EXPO } from "@/app/lib/intro";

type CatFilter = "all" | Project["category"];
const CAT_FILTERS: { label: string; value: CatFilter }[] = [
  { label: "All",        value: "all" },
  { label: "Full Stack", value: "fullstack" },
  { label: "Backend",    value: "backend" },
  { label: "Frontend",   value: "frontend" },
];

function ProjectCard({ p, index, tagFilter, onTag }: {
  p: Project; index: number; tagFilter: string | null; onTag: (t: string) => void;
}) {
  return (
    <TiltCard className="glass-card spotlight project-card" max={6}>
      {/* Media */}
      <motion.div className="project-card-media"
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        whileInView={{ clipPath: "inset(0% 0 0 0)" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.1, delay: 0.1 + (index % 3) * 0.08, ease: EASE_OUT_EXPO }}>
        <Image src={p.image} alt={p.title} fill style={{ objectFit: "cover" }}
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(4,5,15,0.85) 0%, rgba(4,5,15,0.15) 55%, transparent 100%)" }} />

        {/* Whole image opens the case study */}
        <Link href={`/projects/${p.id}`} aria-label={`${p.title} case study`} data-cursor-label="View"
          style={{ position: "absolute", inset: 0, zIndex: 1 }} />

        <span className="project-index">{String(index + 1).padStart(2, "0")}</span>

        {p.featured && (
          <div style={{
            position: "absolute", top: 12, right: 12, zIndex: 2,
            display: "flex", alignItems: "center", gap: 4,
            padding: "4px 10px", borderRadius: 999,
            background: "rgba(245,158,11,0.18)", border: "1px solid rgba(245,158,11,0.45)",
            backdropFilter: "blur(8px)",
          }}>
            <Star size={9} style={{ color: "#fbbf24", fill: "#fbbf24" }} />
            <span className="font-mono" style={{ fontSize: 9, fontWeight: 700, color: "#fbbf24", letterSpacing: "0.08em" }}>FEATURED</span>
          </div>
        )}

        <div className="project-card-overlay" style={{ zIndex: 2, pointerEvents: "none" }}>
          {p.githubUrl && (
            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="glass-icon" aria-label="Source code" style={{ pointerEvents: "auto" }}>
              <Github size={16} />
            </a>
          )}
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="glass-icon" aria-label="Live demo" style={{ pointerEvents: "auto" }}>
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </motion.div>

      {/* Content */}
      <div style={{ padding: "20px 22px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
          <h3 className="font-display" style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--fg)", lineHeight: 1.25 }}>
            {p.title}
          </h3>
          <span className="font-mono" style={{ fontSize: 10.5, color: "var(--fg-muted)", flexShrink: 0, marginTop: 3 }}>{p.year}</span>
        </div>

        <p className="font-body" style={{ fontSize: 13.5, lineHeight: 1.7, color: "var(--fg-muted)", marginBottom: 14, flex: 1 }}>
          {p.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
          {p.techStack.slice(0, 4).map(t => <span key={t} className="chip">{t}</span>)}
          {p.techStack.length > 4 && <span className="chip">+{p.techStack.length - 4}</span>}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {p.tags.slice(0, 3).map(tag => (
            <button key={tag} onClick={() => onTag(tag)} className="font-mono"
              style={{
                padding: "2px 8px", borderRadius: 999, fontSize: 10, cursor: "pointer",
                background: tagFilter === tag ? "var(--gold-glow)" : "var(--gold-soft)",
                border: `1px solid ${tagFilter === tag ? "var(--gold)" : "var(--gold-glow)"}`,
                color: "var(--gold)", transition: "all 0.15s",
              }}>
              #{tag}
            </button>
          ))}
        </div>

        <Link href={`/projects/${p.id}`} className="project-details-link">
          View Case Study <ChevronRight size={12} />
        </Link>
      </div>
    </TiltCard>
  );
}

function ProjectsInner() {
  const searchParams = useSearchParams();
  const [catFilter, setCatFilter] = useState<CatFilter>("all");
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [showAll, setShowAll]     = useState(false);

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
  const toggleTag = (tag: string) => { setTagFilter(tagFilter === tag ? null : tag); setShowAll(false); };
  const isFiltered = catFilter !== "all" || tagFilter !== null;

  return (
    <section id="projects" className="section-pad">
      <div className="section-container">
        <SectionLabel index="03" label="Projects" />

        {/* Heading + category filters */}
        <div className="filter-row">
          <RevealLines className="font-display heading-lg"
            lines={[{ text: "Selected" }, { text: "Work", gradient: true }]} />

          <FadeIn delay={0.15}>
            <div className="segmented" role="group" aria-label="Filter by category">
              {CAT_FILTERS.map(f => (
                <button key={f.value} aria-pressed={catFilter === f.value}
                  onClick={() => { setCatFilter(f.value); setShowAll(false); }}>
                  {catFilter === f.value && (
                    <motion.span layoutId="cat-pill" className="segmented-pill"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                  )}
                  {f.label}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Tag filter bar */}
        <FadeIn delay={0.2}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Tag size={12} style={{ color: "var(--fg-muted)" }} />
            <span className="font-mono" style={{ fontSize: 10, color: "var(--fg-muted)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Filter by tag
            </span>
          </div>
          <div className="tag-filter-bar">
            {allTags.map(tag => (
              <button key={tag} onClick={() => toggleTag(tag)}
                className={`tag-pill ${tagFilter === tag ? "active" : ""}`}>
                # {tag}
              </button>
            ))}
            <AnimatePresence>
              {isFiltered && (
                <motion.button onClick={clearFilters} className="tag-pill"
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                  style={{ borderStyle: "dashed" }}>
                  <X size={11} /> Clear
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>

        {/* Results count */}
        <AnimatePresence>
          {isFiltered && (
            <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="font-mono"
              style={{ fontSize: 11, color: "var(--fg-muted)", marginBottom: 24, letterSpacing: "0.04em" }}>
              {filtered.length} project{filtered.length !== 1 ? "s" : ""} found
              {tagFilter ? ` tagged #${tagFilter}` : ""}
              {catFilter !== "all" ? ` in ${catFilter}` : ""}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Projects grid */}
        <motion.div layout className="projects-grid">
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
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  exit={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
                  transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: EASE_OUT_EXPO }}
                  style={{ height: "100%" }}
                >
                  <ProjectCard p={p} index={projects.indexOf(p)} tagFilter={tagFilter} onTag={toggleTag} />
                </motion.article>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* Show more */}
        {filtered.length > 3 && (
          <FadeIn delay={0.2} style={{ textAlign: "center", marginTop: 52 }}>
            <Magnetic>
              <button onClick={() => setShowAll(v => !v)} className="btn-ghost">
                {showAll ? "Show Less" : `View All ${filtered.length} Projects`}
                <motion.span animate={{ rotate: showAll ? 180 : 0 }} style={{ display: "flex" }}>
                  <ArrowUpRight size={15} style={{ color: "var(--accent-bright)" }} />
                </motion.span>
              </button>
            </Magnetic>
          </FadeIn>
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
