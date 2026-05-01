"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";
import { useTheme } from "@/app/components/ui/ThemeProvider";

const ThreeScene = dynamic(() => import("@/app/components/ui/ThreeScene"), { ssr: false });

const ROLES = ["Full Stack Developer", "Django & DRF Expert", "React & Next.js Engineer", "Python Instructor @ NTI"];

const socials = [
  { icon: Github,   href: "https://github.com/Mmy2000",               label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/mahmoudyousef811",  label: "LinkedIn" },
  { icon: Mail,     href: "mailto:mm.yousef811@gmail.com",             label: "Email" },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay: 2.0 + delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Hero() {
  const { theme } = useTheme();
  const [roleIdx, setRoleIdx]     = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping]       = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const role  = ROLES[roleIdx];
    const delay = typing
      ? displayed.length === role.length ? 2200 : 55
      : 28;

    timerRef.current = setTimeout(() => {
      if (typing) {
        if (displayed.length < role.length) setDisplayed(role.slice(0, displayed.length + 1));
        else setTyping(false);
      } else {
        if (displayed.length > 0) setDisplayed(d => d.slice(0, -1));
        else { setRoleIdx(i => (i + 1) % ROLES.length); setTyping(true); }
      }
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [displayed, typing, roleIdx]);

  const isLight = theme === "light";

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>

      {/* Grid bg */}
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: isLight ? 0.35 : 0.18, pointerEvents: "none" }} />

      {/* Radial glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: isLight
          ? "radial-gradient(ellipse 65% 55% at 70% 50%, rgba(91,77,212,0.08) 0%, transparent 70%)"
          : "radial-gradient(ellipse 65% 55% at 70% 50%, rgba(124,109,240,0.09) 0%, transparent 70%)",
      }} />

      {/* 3D scene — responsive visibility */}
      <div className="hero-three-scene">
        <ThreeScene lightMode={isLight} />
        <div style={{ position: "absolute", inset: "0 auto 0 0", width: "50%", background: `linear-gradient(to right, var(--bg), transparent)` }} />
        <div style={{ position: "absolute", inset: "auto 0 0 0", height: "25%", background: `linear-gradient(to top, var(--bg), transparent)` }} />
      </div>

      {/* Content */}
      <div className="hero-layout" style={{ position: "relative", zIndex: 10 }}>
        <div className="hero-content">

          {/* Badge */}
          <motion.div {...fadeUp(0)} style={{ marginBottom: 24 }}>
            <span className="section-tag">
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--emerald)", display: "inline-block", animation: "glowPulse 2s ease-in-out infinite" }} />
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 {...fadeUp(0.08)} className="font-display heading-xl" style={{ color: "var(--fg)", marginBottom: 16 }}>
            Mahmoud<br />
            <span className="gradient-text">Yousef</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div {...fadeUp(0.16)} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, minHeight: 32, flexWrap: "wrap" }}>
            <span className="font-mono" style={{ fontSize: 13, color: "var(--accent)", opacity: 0.7 }}>&gt;_</span>
            <span className="font-mono" style={{ fontSize: 14, fontWeight: 500, color: "var(--fg-muted)" }}>{displayed}</span>
            <span className="type-cursor" />
          </motion.div>

          {/* Description */}
          <motion.p {...fadeUp(0.24)} className="font-body"
            style={{ fontSize: 16, lineHeight: 1.8, color: "var(--fg-muted)", marginBottom: 36, maxWidth: 480 }}>
            CS graduate from Zagazig University building real-world web products — bulletproof APIs in{" "}
            <strong style={{ color: "var(--fg)", fontWeight: 600 }}>Django & DRF</strong>, polished UIs in{" "}
            <strong style={{ color: "var(--fg)", fontWeight: 600 }}>React & Next.js</strong>.
            Currently at Hinet Soft & NTI.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.32)} style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 44 }}>
            <a href="#projects" className="btn-primary">
              View Projects <ArrowRight size={15} />
            </a>
            <a href="https://portfolio-next-js-sandy-ten.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <ExternalLink size={15} /> Live Portfolio
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div {...fadeUp(0.40)} style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--fg-subtle)" }}>Find me</span>
            <div style={{ height: 1, width: 28, background: "var(--border-md)" }} />
            {socials.map(({ icon: Icon, href, label }) => (
              <a key={href} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                style={{
                  width: 38, height: 38, borderRadius: 10,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "var(--card)", border: "1px solid var(--border-md)",
                  color: "var(--fg-muted)", textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--accent)"; el.style.color = "var(--accent)"; el.style.transform = "translateY(-3px)"; el.style.background = "var(--accent-soft)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border-md)"; el.style.color = "var(--fg-muted)"; el.style.transform = "translateY(0)"; el.style.background = "var(--card)"; }}
              >
                <Icon size={16} />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2 }}
        style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
      >
        <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--fg-subtle)" }}>scroll</span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  );
}
