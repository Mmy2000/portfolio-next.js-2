"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Send, Sparkles, AlertCircle, ArrowUpRight } from "lucide-react";
import emailjs from "@emailjs/browser";
import { RevealLines, FadeIn, SectionLabel } from "@/app/components/ui/Reveal";
import Magnetic from "@/app/components/ui/Magnetic";
import { EASE_OUT_EXPO } from "@/app/lib/intro";

const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

const contacts = [
  { icon: Mail,     label: "Email",    value: "mm.yousef811@gmail.com",          href: "mailto:mm.yousef811@gmail.com" },
  { icon: Github,   label: "GitHub",   value: "github.com/Mmy2000",               href: "https://github.com/Mmy2000" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/mahmoudyousef811", href: "https://linkedin.com/in/mahmoudyousef811" },
  { icon: MapPin,   label: "Location", value: "Cairo, Egypt — Open to Remote",    href: null },
];

const stateAnim = {
  initial: { opacity: 0, scale: 0.94, filter: "blur(8px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit:    { opacity: 0, scale: 0.96, filter: "blur(8px)" },
  transition: { duration: 0.5, ease: EASE_OUT_EXPO },
};

export default function Contact() {
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
    <section id="contact" className="section-pad">
      <div style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", height: "75%",
        background: "radial-gradient(ellipse 50% 50% at 50% 50%, var(--accent-soft), transparent 100%)",
        pointerEvents: "none",
      }} />

      <div className="section-container" style={{ position: "relative" }}>
        <SectionLabel index="05" label="Contact" />

        {/* Big heading */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <RevealLines className="font-display heading-contact" style={{ marginBottom: 24 }}
            lines={[{ text: "Let's build something" }, { text: "extraordinary", gradient: true }]} />
          <FadeIn delay={0.2} as="p" className="font-body"
            style={{ fontSize: 16.5, color: "var(--fg-muted)", maxWidth: 500, margin: "0 auto", lineHeight: 1.75 }}>
            Open to full-time roles, freelance projects, and interesting collaborations.
            Based in Cairo — available remotely worldwide.
          </FadeIn>
        </div>

        <div className="two-col-contact">
          {/* Info cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {contacts.map(({ icon: Icon, label, value, href }, i) => {
              const inner = (
                <>
                  <div className="icon-tile" style={{ width: 44, height: 44, background: "var(--emerald-soft)", borderColor: "var(--emerald-glow)", color: "var(--emerald)", flexShrink: 0 }}>
                    <Icon size={17} />
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div className="font-mono" style={{ fontSize: 10, color: "var(--fg-muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>
                      {label}
                    </div>
                    <div className="font-body" style={{ fontSize: 14, fontWeight: 500, color: "var(--fg)", wordBreak: "break-all" }}>
                      {value}
                    </div>
                  </div>
                  {href && <ArrowUpRight size={16} className="contact-arrow" />}
                </>
              );
              return (
                <FadeIn key={label} delay={0.1 + i * 0.07} y={20}>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                      className="glass-card spotlight contact-card">
                      {inner}
                    </a>
                  ) : (
                    <div className="glass-card spotlight contact-card">{inner}</div>
                  )}
                </FadeIn>
              );
            })}
          </div>

          {/* Form */}
          <FadeIn delay={0.2} className="glass-card spotlight" style={{ padding: "30px 30px", minHeight: 380, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div key="sent" {...stateAnim}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 0", gap: 16, textAlign: "center" }}>
                  <motion.div
                    initial={{ rotate: -30, scale: 0 }} animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                    className="icon-tile" style={{ width: 68, height: 68, borderRadius: 20 }}>
                    <Sparkles size={28} style={{ color: "var(--emerald)" }} />
                  </motion.div>
                  <h4 className="font-display" style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg)" }}>
                    Message sent!
                  </h4>
                  <p className="font-body" style={{ fontSize: 14.5, color: "var(--fg-muted)", lineHeight: 1.7 }}>
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>

              ) : status === "error" ? (
                <motion.div key="error" {...stateAnim}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 0", gap: 16, textAlign: "center" }}>
                  <div style={{
                    width: 68, height: 68, borderRadius: 20,
                    background: "var(--rose-soft)", border: "1px solid rgba(239,68,68,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <AlertCircle size={28} style={{ color: "var(--rose)" }} />
                  </div>
                  <h4 className="font-display" style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg)" }}>
                    Something went wrong
                  </h4>
                  <p className="font-body" style={{ fontSize: 14.5, color: "var(--fg-muted)", lineHeight: 1.7 }}>
                    Please try again or email me directly at{" "}
                    <a href="mailto:mm.yousef811@gmail.com" className="link-hover" style={{ color: "var(--accent-bright)" }}>
                      mm.yousef811@gmail.com
                    </a>
                  </p>
                </motion.div>

              ) : (
                <motion.form key="form" {...stateAnim} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div className="form-two-col">
                    {(["name", "email"] as const).map(field => (
                      <div key={field} className="form-field">
                        <label htmlFor={`contact-${field}`} className="form-label font-mono">
                          {field === "name" ? "Your Name" : "Email Address"}
                        </label>
                        <input id={`contact-${field}`} type={field === "email" ? "email" : "text"} required
                          value={form[field]}
                          onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                          placeholder={field === "email" ? "you@example.com" : "John Doe"}
                          autoComplete={field === "email" ? "email" : "name"}
                          className="form-input font-body" />
                      </div>
                    ))}
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-message" className="form-label font-mono">Message</label>
                    <textarea id="contact-message" required rows={5} value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Tell me about your project or opportunity..."
                      className="form-input font-body"
                      data-lenis-prevent
                      style={{ resize: "vertical", minHeight: 130 }} />
                  </div>

                  <Magnetic strength={0.2} style={{ display: "flex" }}>
                    <button type="submit" disabled={status === "sending"} className="btn-primary"
                      style={{ marginTop: 4, width: "100%", padding: "16px 28px", opacity: status === "sending" ? 0.7 : 1 }}>
                      {status === "sending" ? (
                        <>
                          <span style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", animation: "spin 0.7s linear infinite" }} />
                          Sending...
                        </>
                      ) : (
                        <>Send Message <Send size={15} /></>
                      )}
                    </button>
                  </Magnetic>
                </motion.form>
              )}
            </AnimatePresence>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
