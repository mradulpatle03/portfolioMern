import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    name: "Prep-Pilot",
    num: "01",
    year: "2024",
    category: "Full-Stack",
    tech: ["MongoDB", "Express.js", "React", "Node.js", "JWT", "Tailwind", "AI API"],
    description: "All-in-one coding interview prep platform. AI-generated personalized learning roadmaps, topic-wise DSA practice, company-specific question banks, an AI-powered doubt solver chatbot, and a built-in browser IDE.",
    link: "https://prep-pilot-front.onrender.com/",
    highlight: true,
  },
  {
    name: "Shopkey",
    num: "02",
    year: "2024",
    category: "E-Commerce",
    tech: ["MongoDB", "Express.js", "React", "Node.js", "JWT", "Tailwind", "Stripe"],
    description: "Full-stack e-commerce platform with authentication, product management, search, filter, pagination, and Stripe-powered secure checkout.",
    link: "https://shopkey-432.vercel.app",
  },
  {
    name: "Chattt",
    num: "03",
    year: "2024",
    category: "Real-Time",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Zustand", "Socket.IO"],
    description: "Real-time chat app supporting 1-on-1 messaging with online/offline presence indicators and under 200ms latency, optimized with Zustand state management.",
    link: "https://fullstack-chatapp-e8lf.onrender.com",
  },
];

function TiltCard({ children, style }) {
  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -12;
    el.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateZ(8px)`;
  };
  const onLeave = (e) => { e.currentTarget.style.transform = "perspective(700px) rotateX(0) rotateY(0) translateZ(0)"; };
  return (
    <div onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ transition: "transform 0.18s ease", willChange: "transform", ...style }}>
      {children}
    </div>
  );
}

export default function Projects() {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ padding: "60px 24px 100px", maxWidth: 1100, margin: "0 auto" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: 64 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", marginBottom: 12 }}>// selected work</p>
        <h1 style={{ fontSize: "clamp(40px,7vw,80px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>
          Projects
        </h1>
      </motion.div>

      {/* Project list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {projects.map((p, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}>
            <TiltCard style={{
              background: hovered === i ? "var(--bg2)" : "var(--surface)",
              border: `1px solid ${p.highlight ? "rgba(232,90,79,0.2)" : "var(--border)"}`,
              borderRadius: 16,
            }}>
              <div
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ padding: "32px 36px", cursor: "default" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", opacity: 0.5 }}>{p.num}</span>
                    <h2 style={{ fontSize: "clamp(22px,3.5vw,36px)", fontWeight: 800, letterSpacing: "-0.02em" }}>{p.name}</h2>
                    {p.highlight && (
                      <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 100, background: "rgba(232,90,79,0.1)", color: "var(--accent2)", border: "1px solid rgba(232,90,79,0.2)", fontFamily: "var(--font-mono)" }}>
                        featured
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>{p.year}</span>
                    <span className="tag">{p.category}</span>
                    <a href={p.link} target="_blank" rel="noopener noreferrer" data-hover
                      style={{
                        width: 36, height: 36, borderRadius: 8,
                        border: "1px solid var(--border-hover)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "var(--muted)", textDecoration: "none", fontSize: 16,
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "var(--bg)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border-hover)"; }}
                    >↗</a>
                  </div>
                </div>

                <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.7, maxWidth: 680, marginBottom: 20 }}>{p.description}</p>

                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {p.tech.map((t, j) => <span key={j} className="tag">{t}</span>)}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      {/* More coming soon */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        style={{ marginTop: 48, textAlign: "center", padding: "32px", border: "1px dashed var(--border)", borderRadius: 16 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--muted)" }}>
          // more projects on{" "}
          <a href="https://github.com/mradulpatle03" target="_blank" rel="noopener noreferrer" data-hover
            style={{ color: "var(--accent)", textDecoration: "none" }}>GitHub ↗</a>
        </p>
      </motion.div>
    </div>
  );
}