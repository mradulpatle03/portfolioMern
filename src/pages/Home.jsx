import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ROLES = ["WebDevLead", "FullStackEngineer", "CompetitiveProgrammer", "SystemDesigner"];
const MARQUEE_ITEMS = ["React", "Node.js", "MongoDB", "Express", "TypeScript", "Socket.IO", "Redis", "BullMQ", "Tailwind", "Groq LLM", "JWT", "Git"];

const EXPERIENCE = [
  { role: "Web Development Lead", org: "Google Developers Group, IIIT Bhopal", period: "Oct 2025 — Present", current: true },
  { role: "Web Development Intern", org: "Explified", period: "May 2025 — Aug 2025" },
  { role: "Teaching Assistant", org: "IIIT Bhopal", period: "Jul 2024 — Jan 2025" },
];

function RoleSwitcher() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % ROLES.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ display: "inline-flex", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: "clamp(14px,2.2vw,19px)", fontWeight: 600 }}>
      <span style={{ color: "var(--muted)" }}>&lt;</span>
      <span style={{ position: "relative", height: "1.5em", overflow: "hidden", display: "inline-block", padding: "0 6px" }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={idx}
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -22, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "inline-block", color: "var(--accent2)", whiteSpace: "nowrap" }}
          >
            {ROLES[idx]}
          </motion.span>
        </AnimatePresence>
      </span>
      <span style={{ color: "var(--muted)" }}>/&gt;</span>
    </div>
  );
}

function TiltCard({ children, style }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -10;
    el.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) scale(1.015)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "perspective(600px) rotateX(0) rotateY(0) scale(1)"; };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ transition: "transform 0.15s ease", ...style }}>
      {children}
    </div>
  );
}

const WHOAMI_LINES = [
  { k: "name", v: "Mradul Patle" },
  { k: "role", v: "Web Dev Lead, GDG IIIT Bhopal" },
  { k: "education", v: "B.Tech CS · IIIT Bhopal · 9.65 CGPA" },
  { k: "stack", v: "[React, Node.js, MongoDB, Redis, Socket.io]" },
  { k: "leetcode", v: "1000+ solved · Knight · rating 1974" },
  { k: "status", v: "open_to_work = true" },
];

function WhoamiTerminal() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [bootDone, setBootDone] = useState(false);
  const [showCmd, setShowCmd] = useState(false);

  const cmd = "whoami --verbose";

  useEffect(() => {
    if (!showCmd) {
      if (charIdx < cmd.length) {
        const t = setTimeout(() => setCharIdx(c => c + 1), 55);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => { setShowCmd(true); setCharIdx(0); }, 350);
      return () => clearTimeout(t);
    }
    if (lineIdx >= WHOAMI_LINES.length) { setBootDone(true); return; }
    const full = `${WHOAMI_LINES[lineIdx].k}: ${WHOAMI_LINES[lineIdx].v}`;
    if (charIdx < full.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), 14);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setLineIdx(l => l + 1); setCharIdx(0); }, 220);
    return () => clearTimeout(t);
  }, [charIdx, lineIdx, showCmd]);

  const renderLine = (line, typedLen) => {
    const full = `${line.k}: ${line.v}`;
    const shown = full.slice(0, typedLen);
    const keyDone = shown.length >= line.k.length + 1;
    return (
      <div style={{ display: "flex", gap: 6 }}>
        <span style={{ color: "#E8A93B" }}>&gt;</span>
        <span>
          <span style={{ color: "#F2789F" }}>{shown.slice(0, Math.min(shown.length, line.k.length))}</span>
          {keyDone && <span style={{ color: "#8B90A3" }}>{shown.slice(line.k.length, line.k.length + 1)}</span>}
          {keyDone && <span style={{ color: "#EDE8D6" }}>{shown.slice(line.k.length + 1)}</span>}
        </span>
      </div>
    );
  };

  return (
    <div style={{
      background: "#141A2B", borderRadius: 12, border: "2px solid var(--text)",
      overflow: "hidden", width: "100%", maxWidth: 460,
      boxShadow: "8px 8px 0 var(--accent2)",
      fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.9,
    }}>
      {/* title bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "#1D2438", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#E85A4F" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#E8A93B" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#2f9e63" }} />
        <span style={{ marginLeft: 8, fontSize: 11, color: "#8B90A3" }}>mradul@iiitb: ~</span>
      </div>
      <div style={{ padding: "18px 18px 22px" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 10, color: "#EDE8D6" }}>
          <span style={{ color: "#2f9e63" }}>$</span>
          <span>{showCmd ? cmd : cmd.slice(0, charIdx)}</span>
          {!showCmd && <span style={{ animation: "blink 1s steps(1) infinite", display: "inline-block", width: 7, height: 15, background: "#EDE8D6" }} />}
        </div>
        <div style={{ color: "#EDE8D6" }}>
          {WHOAMI_LINES.slice(0, lineIdx).map((l, i) => (
            <div key={i}>{renderLine(l, `${l.k}: ${l.v}`.length)}</div>
          ))}
          {showCmd && lineIdx < WHOAMI_LINES.length && renderLine(WHOAMI_LINES[lineIdx], charIdx)}
        </div>
        {bootDone && (
          <div style={{ display: "flex", gap: 6, marginTop: 10, color: "#EDE8D6" }}>
            <span style={{ color: "#2f9e63" }}>$</span>
            <span style={{ animation: "blink 1s steps(1) infinite", display: "inline-block", width: 7, height: 15, background: "#EDE8D6" }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 22 } },
  };

  return (
    <div>
      {/* HERO */}
      <section style={{ minHeight: "calc(100vh - 68px)", display: "flex", alignItems: "center", padding: "80px 24px", position: "relative", overflow: "hidden" }}>

        <div style={{ position: "absolute", top: "18%", left: "6%", width: 260, height: 260, borderRadius: "50%", background: "rgba(43,78,230,0.07)", filter: "blur(70px)", animation: "glow-pulse 4s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "12%", right: "8%", width: 220, height: 220, borderRadius: "50%", background: "rgba(232,169,59,0.10)", filter: "blur(60px)", animation: "glow-pulse 6s ease-in-out infinite 2s", pointerEvents: "none" }} />

        <div className="hero-grid" style={{ maxWidth: 1200, width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 56, alignItems: "center", position: "relative", zIndex: 1 }}>

          <motion.div variants={containerVariants} initial="hidden" animate="visible">

            <motion.div variants={itemVariants} style={{ marginBottom: 20 }}>
              <div style={{
                display: "inline-flex", borderRadius: 4, overflow: "hidden",
                border: "1px solid var(--text)", fontFamily: "var(--font-mono)",
                fontSize: 10.5, fontWeight: 700, letterSpacing: "0.04em",
              }}>
                <span style={{ padding: "5px 10px", background: "var(--text)", color: "var(--bg)" }}>STATUS</span>
                <span style={{ padding: "5px 10px", background: "#2f9e63", color: "#fff" }}>OPEN TO WORK</span>
              </div>
            </motion.div>

            <motion.h1 variants={itemVariants} style={{
              fontSize: "clamp(40px, 6.2vw, 76px)", fontWeight: 800, lineHeight: 0.98,
              letterSpacing: "-0.03em", marginBottom: 20,
              fontFamily: "var(--font-sans)", color: "var(--text)",
            }}>
              Mradul <span style={{ color: "var(--accent2)" }}>Patle</span>
            </motion.h1>

            <motion.div variants={itemVariants} style={{ marginBottom: 24, height: 32, display: "flex", alignItems: "center" }}>
              <RoleSwitcher />
            </motion.div>

            <motion.p variants={itemVariants} style={{
              fontSize: 17, color: "var(--muted)", lineHeight: 1.7,
              maxWidth: 480, marginBottom: 36,
            }}>
              CS student at <span style={{ color: "var(--text)", fontWeight: 600 }}>IIIT Bhopal</span> · 9.65 CGPA · 1000+ DSA problems solved · Web Dev Lead @GDG.
            </motion.p>

            <motion.div variants={itemVariants} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <motion.button onClick={() => navigate("/projects")} data-hover
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{
                  padding: "13px 28px", borderRadius: 6, border: "2px solid var(--text)",
                  background: "var(--accent)", color: "var(--bg)",
                  fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", cursor: "pointer",
                }}>
                View Projects →
              </motion.button>
              <motion.button onClick={() => navigate("/contact")} data-hover
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{
                  padding: "13px 28px", borderRadius: 6,
                  border: "2px solid var(--text)",
                  background: "transparent", color: "var(--text)",
                  fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", cursor: "pointer",
                }}>
                Contact Me
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Signature: live "whoami" terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotate: -2 }}
            animate={{ opacity: 1, x: 0, rotate: -2 }}
            transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 90 }}
            className="hero-terminal"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <WhoamiTerminal />
          </motion.div>
        </div>

        <style>{`
          @media (max-width: 860px) {
            .hero-grid { grid-template-columns: 1fr !important; text-align: left; }
            .hero-terminal { margin-top: 12px; }
          }
        `}</style>
      </section>

      {/* MARQUEE TECH STACK */}
      <div style={{ borderTop: "2px solid var(--text)", borderBottom: "2px solid var(--text)", padding: "16px 0", overflow: "hidden", position: "relative", zIndex: 1, background: "var(--bg2)" }}>
        <div style={{ display: "flex", gap: 32, width: "max-content", animation: "marquee 28s linear infinite" }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} style={{ whiteSpace: "nowrap", fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--muted)", display: "flex", alignItems: "center", gap: 32 }}>
              {item}
              <span style={{ color: "var(--accent2)", marginLeft: -16 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* EXPERIENCE STRIP */}
      <section className="section" style={{ padding: "72px 24px 0", maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent)", marginBottom: 8 }}>Currently</p>
            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 800, letterSpacing: "-0.02em" }}>Experience</h2>
          </div>
          <motion.button onClick={() => navigate("/about")} data-hover
            whileHover={{ x: 4 }}
            style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 13, fontFamily: "var(--font-mono)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            Full story →
          </motion.button>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 1, background: "var(--border)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
          {EXPERIENCE.map((e, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{ background: "var(--surface)", padding: "24px 22px", position: "relative" }}>
              {e.current && (
                <span style={{ position: "absolute", top: 20, right: 20, fontSize: 10, fontFamily: "var(--font-mono)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#2f9e63" }}>● Active</span>
              )}
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, letterSpacing: "-0.01em", paddingRight: e.current ? 60 : 0 }}>{e.role}</div>
              <div style={{ fontSize: 13, color: "var(--accent)", marginBottom: 10 }}>{e.org}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--font-mono)" }}>{e.period}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS PREVIEW */}
      <section className="section" style={{ padding: "80px 24px 100px", maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
            <div>
              <p className="hf-label" style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent)", marginBottom: 8 }}>Selected Work</p>
              <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, letterSpacing: "-0.02em" }}>Projects</h2>
            </div>
            <motion.button onClick={() => navigate("/projects")} data-hover
              whileHover={{ x: 4 }}
              style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 13, fontFamily: "var(--font-mono)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              All projects →
            </motion.button>
          </div>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {[
            { name: "PlacementOS", desc: "Full-stack SaaS digitizing college placements: 5 roles, Smart Eligibility Engine, and a 9-stage Kanban recruitment pipeline with BullMQ.", tech: ["React", "Redis", "BullMQ", "Socket.io"], num: "01", link: "https://github.com/mradulpatle03/PlacementOS", accent: "var(--accent2)" },
            { name: "HireFlow", desc: "AI hiring platform with explainable multi-dimensional resume scoring via Groq LLM, semantic job matching, and real-time recruiter chat.", tech: ["Groq LLM", "Socket.io", "MERN"], num: "02", link: "https://ai-hiring-platform-phi.vercel.app/", accent: "var(--bg2)" },
            { name: "Habit-Forge", desc: "Two-layer habit tracker separating Intent from Evidence, with a confidence scoring model and 7-day streak decay insights.", tech: ["Recharts", "MERN", "JWT"], num: "03", link: "https://habitforge-sand.vercel.app/", accent: "var(--bg2)" },
          ].map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <TiltCard style={{
                background: p.accent, border: "2px solid var(--text)",
                borderRadius: 10, padding: 28, height: "100%",
                cursor: "pointer",
                color: p.name === "PlacementOS" ? "var(--bg)" : "var(--text)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, opacity: 0.7 }}>{p.num}</span>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" data-hover
                    style={{ color: "inherit", fontSize: 18, textDecoration: "none" }}
                  >↗</a>
                </div>
                <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 22, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.01em" }}>{p.name}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 20, opacity: p.name === "PlacementOS" ? 0.9 : 1, color: p.name === "PlacementOS" ? "var(--bg)" : "var(--muted)" }}>{p.desc}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {p.tech.map((t, j) => <span key={j} className="tag">{t}</span>)}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="section" style={{ padding: "0 24px 100px" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{
            maxWidth: 1200, margin: "0 auto",
            background: "var(--text)", color: "var(--bg)",
            borderRadius: 14, padding: "60px 48px",
            display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 28,
            position: "relative", overflow: "hidden",
          }}>
          <div style={{ position: "absolute", top: -50, right: -30, width: 200, height: 200, borderRadius: "50%", background: "var(--accent3)", opacity: 0.9, pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(24px,4vw,40px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 10 }}>
              Let's build something <span style={{ color: "var(--accent2)", fontStyle: "italic", fontFamily: "var(--font-serif)" }}>remarkable</span>
            </h2>
            <p style={{ color: "#B9BCC9", fontSize: 15 }}>Open to internships, freelance projects, and full-time roles.</p>
          </div>
          <motion.button onClick={() => navigate("/contact")} data-hover
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            style={{
              padding: "14px 32px", borderRadius: 6, border: "2px solid var(--bg)",
              background: "var(--bg)", color: "var(--text)",
              fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", cursor: "pointer",
              whiteSpace: "nowrap", position: "relative", zIndex: 1,
            }}>
            Get in touch →
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}