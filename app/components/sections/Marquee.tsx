"use client";
import { skillCategories } from "@/app/lib/data";

const TECH = Array.from(new Set(skillCategories.flatMap(c => c.skills.map(s => s.name))));
const VALUES = [
  "Scalable APIs", "Clean Architecture", "Pixel-Perfect UI", "Performance-First",
  "Tested & Documented", "Real-Time Systems", "End-to-End Ownership", "Remote-Ready",
];

function Row({ items, reverse = false, outline = false }: { items: string[]; reverse?: boolean; outline?: boolean }) {
  // Render the list twice so the -50% translate loops seamlessly
  const doubled = [...items, ...items];
  return (
    <div className="marquee">
      <div className={`marquee-track ${reverse ? "marquee-track--reverse" : ""}`}>
        {doubled.map((t, i) => (
          <span key={i} className={`marquee-item font-display ${outline ? "marquee-item--outline" : ""}`}>
            {t}
            <span className="marquee-sep" aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section aria-label="Technologies and values" className="marquee-section">
      <div className="marquee-band">
        <Row items={TECH} />
        <Row items={VALUES} reverse outline />
      </div>
    </section>
  );
}
