"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/app/components/ui/ThemeProvider";
import { navLinks } from "@/app/lib/data";
import Link from "next/link";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive]         = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3 }
    );
    document.querySelectorAll("section[id]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const iconBtn: React.CSSProperties = {
    width: 38, height: 38, borderRadius: 10,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "var(--card)", border: "1px solid var(--border-md)",
    color: "var(--fg-muted)",
    transition: "border-color 0.2s, color 0.2s, background 0.2s",
    flexShrink: 0,
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 900, padding: "12px 24px 0" }}
      >
        <nav style={{
          maxWidth: 1100, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 24px", borderRadius: 16,
          background: scrolled ? "var(--glass)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          border: scrolled ? "1px solid var(--border-md)" : "1px solid transparent",
          boxShadow: scrolled ? "var(--shadow-sm)" : "none",
          transition: "all 0.4s ease",
        }}>
          {/* Logo */}
          <Link href="/" className="font-display"
            style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.03em", color: "var(--fg)", textDecoration: "none", flexShrink: 0 }}>
            MY<span style={{ color: "var(--emerald)" }}>.</span>
          </Link>

          {/* Desktop links */}
          <div className="nav-desktop-links">
            {navLinks.map(link => {
              const isActive = active === link.href.slice(1);
              return (
                <a key={link.href} href={link.href} className="font-body"
                  style={{
                    fontSize: 14, fontWeight: 500, letterSpacing: "0.01em",
                    color: isActive ? "var(--accent)" : "var(--fg-muted)",
                    textDecoration: "none", position: "relative",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--fg)"; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span layoutId="nav-dot" style={{
                      position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)",
                      width: 4, height: 4, borderRadius: "50%", background: "var(--accent)", display: "block",
                    }} />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={toggleTheme} style={iconBtn} aria-label="Toggle theme"
              onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = "var(--accent)"; el.style.color = "var(--accent)"; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "var(--border-md)"; el.style.color = "var(--fg-muted)"; }}>
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <a href="#contact" className="btn-primary nav-hire-btn"
              style={{ padding: "9px 20px", fontSize: 13, borderRadius: 12, textDecoration: "none" }}>
              Hire Me
            </a>

            <button onClick={() => setMobileOpen(v => !v)} style={iconBtn} className="nav-mobile-btn"
              aria-label="Menu">
              {mobileOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed", top: 78, left: 16, right: 16, zIndex: 899,
              background: "var(--glass)", border: "1px solid var(--border-md)",
              backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              borderRadius: 16, padding: "12px 12px 16px",
              display: "flex", flexDirection: "column", gap: 4,
              boxShadow: "var(--shadow-lg)",
            }}
          >
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className="font-body"
                style={{
                  padding: "12px 16px", borderRadius: 10, fontSize: 15, fontWeight: 500,
                  color: "var(--fg-muted)", textDecoration: "none",
                  transition: "background 0.15s, color 0.15s",
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--accent-soft)"; el.style.color = "var(--accent)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "var(--fg-muted)"; }}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileOpen(false)}
              className="btn-primary"
              style={{ marginTop: 8, textDecoration: "none", textAlign: "center", borderRadius: 12 }}>
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
