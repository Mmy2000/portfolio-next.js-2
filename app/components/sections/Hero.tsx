"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, ExternalLink, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { useTheme } from "@/app/components/ui/ThemeProvider";
import Magnetic from "@/app/components/ui/Magnetic";
import { useIntroDone, EASE_OUT_EXPO } from "@/app/lib/intro";

const ThreeScene = dynamic(() => import("@/app/components/ui/ThreeScene"), { ssr: false });

const ROLES = ["Full Stack Developer", "Django & DRF Expert", "React & Next.js Engineer", "Python Instructor @ NTI"];

const socials = [
  { icon: Github,   href: "https://github.com/Mmy2000",               label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/mahmoudyousef811",  label: "LinkedIn" },
  { icon: Mail,     href: "mailto:mm.yousef811@gmail.com",             label: "Email" },
];

function useTypewriter(words: string[], enabled: boolean) {
  const [idx, setIdx]         = useState(0);
  const [text, setText]       = useState("");
  const [deleting, setDel]    = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const word = words[idx];
    const delay = !deleting ? (text === word ? 2200 : 55) : 28;
    const t = setTimeout(() => {
      if (!deleting) {
        if (text.length < word.length) setText(word.slice(0, text.length + 1));
        else setDel(true);
      } else if (text.length > 0) {
        setText(text.slice(0, -1));
      } else {
        setDel(false);
        setIdx(i => (i + 1) % words.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, idx, words, enabled]);

  return text;
}

function CairoClock() {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Africa/Cairo" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{time || "--:--:--"}</span>;
}

export default function Hero() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const intro = useIntroDone();
  const typed = useTypewriter(ROLES, intro);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY       = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sceneY         = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const gridY          = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const show = (delay: number) => ({
    initial: { opacity: 0, y: 30, filter: "blur(8px)" },
    animate: intro ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined,
    transition: { duration: 1, delay, ease: EASE_OUT_EXPO },
  });

  const letters = (word: string, base: number, gradient = false) =>
    word.split("").map((ch, i) => (
      <span key={i} className="mask-line" style={{ display: "inline-block" }}>
        <motion.span
          className={gradient ? "gradient-text" : undefined}
          style={{ display: "inline-block" }}
          initial={{ y: "110%", rotate: 8 }}
          animate={intro ? { y: "0%", rotate: 0 } : undefined}
          transition={{ duration: 1.1, delay: base + i * 0.045, ease: EASE_OUT_EXPO }}
        >
          {ch}
        </motion.span>
      </span>
    ));

  return (
    <section id="hero" ref={sectionRef}
      style={{ minHeight: "100svh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>

      {/* Grid backdrop */}
      <motion.div className="grid-bg grid-fade"
        style={{ position: "absolute", inset: "-10% 0 0 0", opacity: isLight ? 0.7 : 0.55, pointerEvents: "none", y: gridY }} />

      {/* 3D scene */}
      <motion.div className="hero-three-scene" style={{ y: sceneY }}>
        <motion.div style={{ position: "absolute", inset: 0 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={intro ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 2, delay: 0.1, ease: EASE_OUT_EXPO }}>
          <ThreeScene lightMode={isLight} />
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div className="hero-layout" style={{ y: contentY, opacity: contentOpacity }}>
        <div className="hero-content">

          <motion.div {...show(0.05)} style={{ marginBottom: 28 }}>
            <span className="section-tag section-tag--plain">
              <span className="pulse-dot" />
              Available for opportunities
            </span>
          </motion.div>

          <h1 className="font-display heading-xl" style={{ color: "var(--fg)", marginBottom: 26 }} aria-label="Mahmoud Yousef">
            <span aria-hidden="true" style={{ display: "block", whiteSpace: "nowrap" }}>{letters("Mahmoud", 0.1)}</span>
            <span aria-hidden="true" style={{ display: "block", whiteSpace: "nowrap" }}>{letters("Yousef", 0.35, true)}</span>
          </h1>

          <motion.div {...show(0.55)} style={{ marginBottom: 26 }}>
            <div className="hero-role">
              <span className="font-mono" style={{ fontSize: 13, color: "var(--emerald)" }}>&gt;_</span>
              <span className="font-mono" style={{ fontSize: 14, fontWeight: 500, color: "var(--fg)", minHeight: 22 }}>{typed}</span>
              <span className="type-cursor" />
            </div>
          </motion.div>

          <motion.p {...show(0.65)} className="font-body"
            style={{ fontSize: "clamp(15px, 1.6vw, 17px)", lineHeight: 1.8, color: "var(--fg-muted)", marginBottom: 38, maxWidth: 500 }}>
            CS graduate from Zagazig University building real-world web products — bulletproof APIs in{" "}
            <strong style={{ color: "var(--fg)", fontWeight: 600 }}>Django & DRF</strong>, polished UIs in{" "}
            <strong style={{ color: "var(--fg)", fontWeight: 600 }}>React & Next.js</strong>.
            Currently at Software House Solutions & NTI.
          </motion.p>

          <motion.div {...show(0.75)} style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 44 }}>
            <Magnetic>
              <a href="#projects" className="btn-primary">
                View Projects <ArrowRight size={15} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://portfolio-next-js-sandy-ten.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <ExternalLink size={15} /> Live Portfolio
              </a>
            </Magnetic>
          </motion.div>

          <motion.div {...show(0.85)} style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--fg-subtle)" }}>Find me</span>
            <div style={{ height: 1, width: 28, background: "var(--border-md)" }} />
            {socials.map(({ icon: Icon, href, label }) => (
              <Magnetic key={href} strength={0.5}>
                <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className="icon-btn">
                  <Icon size={16} />
                </a>
              </Magnetic>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <motion.div className="hero-bottom"
        initial={{ opacity: 0 }} animate={intro ? { opacity: 1 } : undefined} transition={{ delay: 1.2, duration: 1 }}>
        <div className="hero-meta font-mono" style={{ fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg-muted)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><MapPin size={11} /> Cairo, Egypt</span>
          <span style={{ color: "var(--fg-subtle)" }}>Local time — <CairoClock /></span>
        </div>
        <a href="#about" aria-label="Scroll to about" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textDecoration: "none", margin: "0 auto" }}>
          <div className="scroll-mouse"><span /></div>
          <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--fg-subtle)" }}>Scroll</span>
        </a>
        <div className="hero-meta font-mono" style={{ fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg-muted)", textAlign: "right", alignItems: "flex-end" }}>
          <span>Django · React · Next.js</span>
          <span style={{ color: "var(--fg-subtle)" }}>Open to remote work</span>
        </div>
      </motion.div>

      {/* Fade into the next section */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 160, background: "linear-gradient(to top, var(--bg), transparent)", pointerEvents: "none", zIndex: 5 }} />
    </section>
  );
}
