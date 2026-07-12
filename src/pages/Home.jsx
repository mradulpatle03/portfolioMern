import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ROLES = ["Full-Stack Developer", "MERN Engineer", "DSA Problem Solver", "Open Source Contributor"];
const MARQUEE_ITEMS = ["React", "Node.js", "MongoDB", "Express", "TypeScript", "Socket.IO", "Tailwind", "JWT", "REST APIs", "Redux", "Zustand", "Git"];

function TypingRole() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [wait, setWait] = useState(false);

  useEffect(() => {
    const target = ROLES[idx];
    if (wait) { const t = setTimeout(() => setWait(false), 1200); return () => clearTimeout(t); }
    if (!deleting && displayed === target) { setWait(true); setDeleting(true); return; }
    if (deleting && displayed === "") { setDeleting(false); setIdx(i => (i + 1) % ROLES.length); return; }
    const speed = deleting ? 40 : 70;
    const t = setTimeout(() => {
      setDisplayed(d => deleting ? d.slice(0, -1) : target.slice(0, d.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, deleting, idx, wait]);

  return (
    <span style={{ color: "var(--accent2)", fontFamily: "var(--font-mono)", fontSize: "clamp(16px,2.6vw,22px)", fontWeight: 600 }}>
      {displayed}<span style={{ animation: "blink 1s steps(1) infinite", display: "inline-block", width: 2, height: "1em", background: "var(--accent2)", verticalAlign: "middle", marginLeft: 2 }} />
    </span>
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
      <section style={{ minHeight: "calc(100vh - 68px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px", position: "relative", overflow: "hidden" }}>

        <div style={{ position: "absolute", top: "18%", left: "6%", width: 260, height: 260, borderRadius: "50%", background: "rgba(43,78,230,0.07)", filter: "blur(70px)", animation: "glow-pulse 4s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "12%", right: "8%", width: 220, height: 220, borderRadius: "50%", background: "rgba(232,169,59,0.10)", filter: "blur(60px)", animation: "glow-pulse 6s ease-in-out infinite 2s", pointerEvents: "none" }} />

        <motion.div variants={containerVariants} initial="hidden" animate="visible"
          style={{ maxWidth: 860, width: "100%", textAlign: "center" }}>

          <motion.h1 variants={itemVariants} style={{
            fontSize: "clamp(44px, 7.5vw, 92px)", fontWeight: 800, lineHeight: 0.98,
            letterSpacing: "-0.03em", marginBottom: 20,
            fontFamily: "var(--font-sans)", color: "var(--text)",
          }}>
            Mradul <span style={{ color: "var(--accent2)" }}>Patle</span>
          </motion.h1>

          <motion.div variants={itemVariants} style={{ marginBottom: 28, height: 32, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <TypingRole />
          </motion.div>

          <motion.p variants={itemVariants} style={{
            fontSize: 17, color: "var(--muted)", lineHeight: 1.7,
            maxWidth: 560, margin: "0 auto 40px",
          }}>
            CS student at <span style={{ color: "var(--text)", fontWeight: 600 }}>IIIT Bhopal</span> · 9.79 CGPA · 500+ DSA problems · building fast, real-world MERN apps.
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 64 }}>
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

          {/* Stats row */}
          <motion.div variants={itemVariants}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "2px solid var(--text)", borderRadius: 8, overflow: "hidden", maxWidth: 520, margin: "0 auto" }}>
            {[
              { n: "9.79", label: "CGPA" },
              { n: "500+", label: "DSA Problems" },
              { n: "4+", label: "Projects Shipped" },
            ].map((s, i) => (
              <div key={i} style={{
                background: i === 1 ? "var(--accent2)" : "var(--bg2)",
                color: i === 1 ? "var(--bg)" : "var(--text)",
                padding: "20px 16px", textAlign: "center",
                borderRight: i < 2 ? "2px solid var(--text)" : "none",
              }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em" }}>{s.n}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 4, opacity: 0.85 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
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

      {/* FEATURED PROJECTS PREVIEW */}
      <section className="section" style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
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
            { name: "Prep-Pilot", desc: "AI-powered coding interview prep with personalized roadmaps, DSA practice, and a browser IDE.", tech: ["MERN", "JWT", "AI API"], num: "01", link: "https://prep-pilot-front.onrender.com/", accent: "var(--accent2)" },
            { name: "Shopkey", desc: "Full-stack e-commerce with auth, product management, and Stripe-powered secure checkout.", tech: ["MERN", "Stripe", "JWT"], num: "02", link: "https://shopkey-432.vercel.app", accent: "var(--bg2)" },
            { name: "Chattt", desc: "Real-time 1-on-1 messaging with <200ms latency, online presence, and Zustand state.", tech: ["Socket.IO", "MERN", "Zustand"], num: "03", link: "https://fullstack-chatapp-e8lf.onrender.com", accent: "var(--bg2)" },
          ].map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <TiltCard style={{
                background: p.accent, border: "2px solid var(--text)",
                borderRadius: 10, padding: 28, height: "100%",
                cursor: "pointer",
                color: p.name === "Prep-Pilot" ? "var(--bg)" : "var(--text)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, opacity: 0.7 }}>{p.num}</span>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" data-hover
                    style={{ color: "inherit", fontSize: 18, textDecoration: "none" }}
                  >↗</a>
                </div>
                <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 22, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.01em" }}>{p.name}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 20, opacity: p.name === "Prep-Pilot" ? 0.9 : 1, color: p.name === "Prep-Pilot" ? "var(--bg)" : "var(--muted)" }}>{p.desc}</p>
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