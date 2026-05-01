"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const socials = [
  { icon: Github,   href: "https://github.com/Mmy2000",              label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/mahmoudyousef811", label: "LinkedIn" },
  { icon: Mail,     href: "mailto:mm.yousef811@gmail.com",            label: "Email" },
];

export default function Footer() {
  return (
    <footer style={{ padding: "40px 24px 28px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, var(--border-md), transparent)", marginBottom: 28 }} />

        <div className="footer-layout">
          {/* Logo */}
          <div>
            <a href="#" className="font-display"
              style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.03em", color: "var(--fg)", textDecoration: "none" }}>
              MY<span style={{ color: "var(--emerald)" }}>.</span>
            </a>
            <p className="font-mono" style={{ fontSize: 10.5, color: "var(--fg-subtle)", marginTop: 4, letterSpacing: "0.04em" }}>
              Next.js · Three.js · Framer Motion · Tailwind
            </p>
          </div>

          {/* Socials */}
          <div style={{ display: "flex", gap: 8 }}>
            {socials.map(({ icon: Icon, href, label }) => (
              <a key={href} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                style={{
                  width: 36, height: 36, borderRadius: 9,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "var(--card)", border: "1px solid var(--border-md)",
                  color: "var(--fg-muted)", textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--accent)"; el.style.color = "var(--accent)"; el.style.transform = "translateY(-3px)"; el.style.background = "var(--accent-soft)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border-md)"; el.style.color = "var(--fg-muted)"; el.style.transform = "translateY(0)"; el.style.background = "var(--card)"; }}>
                <Icon size={14} />
              </a>
            ))}
          </div>

          {/* Back to top */}
          <motion.a href="#" whileHover={{ y: -3 }} className="font-mono"
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--fg-subtle)", textDecoration: "none", letterSpacing: "0.04em", transition: "color 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--fg-subtle)"; }}>
            Back to top <ArrowUp size={12} />
          </motion.a>
        </div>

        <div className="font-mono" style={{ textAlign: "center", marginTop: 24, fontSize: 11, color: "var(--fg-subtle)", letterSpacing: "0.04em" }}>
          © {new Date().getFullYear()} Mahmoud M. Yousef. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
