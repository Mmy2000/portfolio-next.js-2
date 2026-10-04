"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Magnetic from "@/app/components/ui/Magnetic";
import { getLenis } from "@/app/components/ui/SmoothScroll";
import { navLinks } from "@/app/lib/data";

const socials = [
  { icon: Github,   href: "https://github.com/Mmy2000",              label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/mahmoudyousef811", label: "LinkedIn" },
  { icon: Mail,     href: "mailto:mm.yousef811@gmail.com",            label: "Email" },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isHome = usePathname() === "/";
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const ctaY       = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  const toTop = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={ref} style={{ position: "relative", padding: "40px 0 28px", overflow: "hidden" }}>
      <div className="section-container">
        {/* Giant CTA */}
        <motion.a href={isHome ? "#contact" : "/#contact"} data-cursor-label="Say hi"
          style={{ y: ctaY, opacity: ctaOpacity, display: "block", textDecoration: "none", marginBottom: 56 }}>
          <div className="font-mono" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--emerald)", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
            <span className="pulse-dot" /> Have a project in mind?
          </div>
          <div className="font-display footer-cta" style={{ display: "flex", alignItems: "flex-end", gap: "0.15em", flexWrap: "wrap" }}>
            <span style={{ color: "var(--fg)" }}>Let&apos;s</span>
            <span className="gradient-text">talk</span>
            <ArrowUpRight style={{ width: "0.6em", height: "0.6em", color: "var(--accent-bright)", marginBottom: "0.08em" }} strokeWidth={1.5} />
          </div>
        </motion.a>

        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, var(--border-lg), transparent)", marginBottom: 28 }} />

        <div className="footer-layout">
          <div>
            <a href="/" className="font-display"
              style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.04em", color: "var(--fg)", textDecoration: "none" }}>
              MY<span style={{ color: "var(--emerald)" }}>.</span>
            </a>
            <p className="font-mono" style={{ fontSize: 10.5, color: "var(--fg-muted)", marginTop: 4, letterSpacing: "0.04em" }}>
              Next.js · Three.js · Framer Motion · Lenis
            </p>
          </div>

          <nav aria-label="Footer" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 20px" }}>
            {navLinks.map(l => (
              <a key={l.href} href={isHome ? l.href : `/${l.href}`} className="link-hover font-body" style={{ fontSize: 13.5 }}>
                {l.label}
              </a>
            ))}
          </nav>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {socials.map(({ icon: Icon, href, label }) => (
              <Magnetic key={href} strength={0.5}>
                <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className="icon-btn">
                  <Icon size={15} />
                </a>
              </Magnetic>
            ))}
            <Magnetic strength={0.5}>
              <a href="#" onClick={toTop} aria-label="Back to top" className="icon-btn" style={{ borderRadius: 999, background: "var(--accent-soft)", borderColor: "var(--accent-muted)", color: "var(--accent-bright)" }}>
                <ArrowUp size={15} />
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="font-mono" style={{ textAlign: "center", marginTop: 28, fontSize: 11, color: "var(--fg-muted)", letterSpacing: "0.04em" }}>
          © {new Date().getFullYear()} Mahmoud M. Yousef. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
