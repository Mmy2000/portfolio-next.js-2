"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Send, Sparkles, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

// 🔧 Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

const contacts = [
  { icon: Mail,     label: "Email",    value: "mm.yousef811@gmail.com",          href: "mailto:mm.yousef811@gmail.com" },
  { icon: Github,   label: "GitHub",   value: "github.com/Mmy2000",               href: "https://github.com/Mmy2000" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/mahmoudyousef811", href: "https://linkedin.com/in/mahmoudyousef811" },
  { icon: MapPin,   label: "Location", value: "Cairo, Egypt — Open to Remote",    href: null },
];

export default function Contact() {
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name:    form.name,
          email:   form.email,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="section-pad" style={{ position: "relative" }}>
      <div style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "80%", height: "50%",
        background: "radial-gradient(ellipse 70% 80% at 50% 100%, var(--accent-soft), transparent)",
        pointerEvents: "none",
      }} />

      <div ref={ref} className="section-container" style={{ position: "relative" }}>

        {/* Label */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-label-row">
          <span className="section-tag">05 — Contact</span>
          <div style={{ height: 1, width: 56, background: "linear-gradient(to right, var(--border-md), transparent)" }} />
        </motion.div>

        {/* Big heading */}
        <motion.div initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 className="font-display heading-contact" style={{ marginBottom: 20 }}>
            Let&apos;s build something<br />
            <span className="gradient-text">extraordinary</span>
          </h2>
          <p className="font-body"
            style={{ fontSize: 16, color: "var(--fg-muted)", maxWidth: 480, margin: "0 auto", lineHeight: 1.75 }}>
            Open to full-time roles, freelance projects, and interesting collaborations.
            Based in Cairo — available remotely worldwide.
          </p>
        </motion.div>

        <div className="two-col-contact">
          {/* Info cards */}
          <motion.div initial={{ opacity: 0, x: -28 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {contacts.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="glass-card"
                style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                  background: "var(--emerald-soft)", border: "1px solid var(--emerald-glow)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={16} style={{ color: "var(--emerald)" }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div className="font-mono" style={{ fontSize: 10, color: "var(--fg-subtle)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>
                    {label}
                  </div>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                      className="font-body"
                      style={{ fontSize: 13, fontWeight: 500, color: "var(--fg)", textDecoration: "none", wordBreak: "break-all", transition: "color 0.2s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--fg)"; }}>
                      {value}
                    </a>
                  ) : (
                    <span className="font-body" style={{ fontSize: 13, fontWeight: 500, color: "var(--fg)" }}>{value}</span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 28 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.25 }}
            className="glass-card" style={{ padding: "28px 28px" }}>

            {status === "sent" ? (
              <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 0", gap: 16, textAlign: "center" }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 16,
                  background: "var(--accent-soft)", border: "1px solid var(--accent-muted)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Sparkles size={28} style={{ color: "var(--emerald)" }} />
                </div>
                <h4 className="font-display" style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg)" }}>
                  Message sent!
                </h4>
                <p className="font-body" style={{ fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.7 }}>
                  Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
              </motion.div>

            ) : status === "error" ? (
              <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 0", gap: 16, textAlign: "center" }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 16,
                  background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <AlertCircle size={28} style={{ color: "#ef4444" }} />
                </div>
                <h4 className="font-display" style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg)" }}>
                  Something went wrong
                </h4>
                <p className="font-body" style={{ fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.7 }}>
                  Please try again or email me directly at{" "}
                  <a href="mailto:mm.yousef811@gmail.com" style={{ color: "var(--accent)", textDecoration: "none" }}>
                    mm.yousef811@gmail.com
                  </a>
                </p>
              </motion.div>

            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="form-two-col">
                  {(["name", "email"] as const).map(field => (
                    <div key={field}>
                      <label className="font-mono" style={{ display: "block", fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 7 }}>
                        {field === "name" ? "Your Name" : "Email Address"}
                      </label>
                      <input type={field === "email" ? "email" : "text"} required
                        value={form[field]}
                        onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                        placeholder={field === "email" ? "you@example.com" : "John Doe"}
                        className="form-input font-body" />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="font-mono" style={{ display: "block", fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 7 }}>
                    Message
                  </label>
                  <textarea required rows={5} value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Tell me about your project or opportunity..."
                    className="form-input font-body"
                    style={{ resize: "vertical", minHeight: 120 }} />
                </div>

                <button type="submit" disabled={status === "sending"} className="btn-primary"
                  style={{ marginTop: 4, opacity: status === "sending" ? 0.65 : 1 }}>
                  {status === "sending" ? (
                    <>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", animation: "spin 0.7s linear infinite" }} />
                      Sending...
                    </>
                  ) : (
                    <><Send size={15} /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}