"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Moon, Sun, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/app/components/ui/ThemeProvider";
import Magnetic from "@/app/components/ui/Magnetic";
import { navLinks } from "@/app/lib/data";
import { useIntroDone, EASE_OUT_EXPO } from "@/app/lib/intro";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const isHome   = pathname === "/";
  const intro    = useIntroDone();

  const [scrolled, setScrolled]     = useState(false);
  const [hidden, setHidden]         = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive]         = useState("");
  const [hovered, setHovered]       = useState<string | null>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", y => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 320 && !mobileOpen);
  });

  useEffect(() => {
    if (!isHome) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    document.querySelectorAll("section[id]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [isHome]);

  // Lock page scroll behind the mobile menu
  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const href = (h: string) => (isHome ? h : `/${h}`);
  const pillTarget = hovered ?? active;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={intro ? { y: hidden ? -110 : 0, opacity: 1 } : undefined}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 900, padding: "14px 16px 0" }}
      >
        <nav style={{
          maxWidth: 1200, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
          padding: scrolled ? "8px 8px 8px 22px" : "12px 8px 12px 22px",
          borderRadius: 999,
          background: scrolled ? "var(--glass)" : "transparent",
          backdropFilter: scrolled ? "blur(22px) saturate(160%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(22px) saturate(160%)" : "none",
          border: scrolled ? "1px solid var(--border-md)" : "1px solid transparent",
          boxShadow: scrolled ? "var(--shadow-md)" : "none",
          transition: "all 0.5s var(--ease-out-expo)",
        }}>
          {/* Logo */}
          <Link href="/" aria-label="Home" className="font-display"
            style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.04em", color: "var(--fg)", textDecoration: "none", display: "flex", alignItems: "center", gap: 2 }}>
            MY
            <motion.span
              style={{ color: "var(--emerald)", display: "inline-block" }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >.</motion.span>
          </Link>

          {/* Desktop links with a sliding pill */}
          <div className="nav-desktop-links" onMouseLeave={() => setHovered(null)}>
            {navLinks.map(link => {
              const id = link.href.slice(1);
              return (
                <a key={link.href} href={href(link.href)} className="nav-link font-body"
                  data-active={active === id}
                  onMouseEnter={() => setHovered(id)}
                  style={{ isolation: "isolate" }}>
                  {pillTarget === id && (
                    <motion.span layoutId="nav-pill" className="nav-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                  )}
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Magnetic strength={0.4}>
              <button onClick={toggleTheme} className="icon-btn" aria-label="Toggle theme" style={{ borderRadius: 999 }}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={theme}
                    initial={{ rotate: -90, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                    style={{ display: "flex" }}>
                    {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </Magnetic>

            <Magnetic strength={0.25}>
              <a href={href("#contact")} className="btn-primary nav-hire-btn" style={{ padding: "10px 20px", fontSize: 13 }}>
                Hire Me <ArrowUpRight size={14} />
              </a>
            </Magnetic>

            <button onClick={() => setMobileOpen(v => !v)} className="icon-btn nav-mobile-btn"
              aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}
              style={{ borderRadius: 999, position: "relative" }}>
              {[0, 1].map(i => (
                <motion.span key={i}
                  animate={mobileOpen
                    ? { rotate: i === 0 ? 45 : -45, y: 0 }
                    : { rotate: 0, y: i === 0 ? -3.5 : 3.5 }}
                  transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                  style={{ position: "absolute", width: 16, height: 1.5, borderRadius: 2, background: "currentColor" }} />
              ))}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 899,
              background: "var(--bg)",
              display: "flex", flexDirection: "column", justifyContent: "center",
              padding: "100px 28px 40px",
            }}
          >
            <div className="grid-bg grid-fade" style={{ position: "absolute", inset: 0, opacity: 0.6, pointerEvents: "none" }} />
            <nav style={{ position: "relative", display: "flex", flexDirection: "column", gap: 4 }}>
              {navLinks.map((link, i) => (
                <div key={link.href} className="mask-line">
                  <motion.a href={href(link.href)} onClick={() => setMobileOpen(false)}
                    className="font-display"
                    initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: EASE_OUT_EXPO }}
                    style={{
                      display: "flex", alignItems: "baseline", gap: 14,
                      fontSize: "clamp(2.4rem, 11vw, 3.6rem)", fontWeight: 800, letterSpacing: "-0.04em",
                      color: active === link.href.slice(1) ? "var(--accent-bright)" : "var(--fg)", textDecoration: "none", lineHeight: 1.15,
                    }}>
                    <span className="font-mono" style={{ fontSize: 12, color: "var(--emerald)", letterSpacing: "0.1em" }}>0{i + 1}</span>
                    {link.label}
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.a href={href("#contact")} onClick={() => setMobileOpen(false)}
              className="btn-primary"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              style={{ position: "relative", marginTop: 40, alignSelf: "flex-start" }}>
              Let&apos;s work together <ArrowUpRight size={15} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
