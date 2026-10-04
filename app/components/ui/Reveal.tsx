"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_OUT_EXPO, useIntroDone } from "@/app/lib/intro";

type Line = { text: string; gradient?: boolean };

/**
 * Masked line reveal — each line slides up from behind an overflow mask.
 * Used for all section headings so the whole site shares one motion language.
 */
export function RevealLines({
  lines, as: Tag = "h2", className = "", style, delay = 0, waitForIntro = false,
}: {
  lines: Line[];
  as?: "h1" | "h2" | "h3" | "div";
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  waitForIntro?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const intro = useIntroDone();
  const go = inView && (!waitForIntro || intro);

  return (
    <Tag ref={ref} className={className} style={style} aria-label={lines.map(l => l.text).join(" ")}>
      {lines.map((l, i) => (
        <span key={i} className="mask-line" aria-hidden="true">
          <motion.span
            className={l.gradient ? "gradient-text" : undefined}
            style={{ display: "inline-block" }}
            initial={{ y: "115%", rotate: 4 }}
            animate={go ? { y: "0%", rotate: 0 } : undefined}
            transition={{ duration: 1, delay: delay + i * 0.1, ease: EASE_OUT_EXPO }}
          >
            {l.text}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Generic fade-up-on-scroll wrapper. */
export function FadeIn({
  children, delay = 0, y = 28, className, style, as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "p" | "li" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: 0.9, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </Comp>
  );
}

/** Numbered section label with an animated rule that draws in. */
export function SectionLabel({ index, label }: { index: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="section-label-row">
      <motion.span
        className="section-tag"
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      >
        <span className="section-tag-index">{index}</span>
        {label}
      </motion.span>
      <motion.div
        className="section-rule"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : undefined}
        transition={{ duration: 1.2, delay: 0.15, ease: EASE_OUT_EXPO }}
      />
    </div>
  );
}
