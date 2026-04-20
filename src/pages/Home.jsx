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
    <span style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "clamp(18px,3vw,28px)", fontWeight: 400 }}>
      {displayed}<span style={{ animation: "blink 1s steps(1) infinite", display: "inline-block", width: 2, height: "1em", background: "var(--accent)", verticalAlign: "middle", marginLeft: 2 }} />
    </span>
  );
}

function TiltCard({ children, style }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -14;
    el.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`;
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

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 22 } },
  };

  return (
    <div>
      {/* HERO */}
      <section style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px", position: "relative", overflow: "hidden" }}>
        
        {/* Decorative glow orbs */}
        <div style={{ position: "absolute", top: "20%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: "rgba(124,92,252,0.08)", filter: "blur(80px)", animation: "glow-pulse 4s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "8%", width: 240, height: 240, borderRadius: "50%", background: "rgba(232,255,71,0.05)", filter: "blur(70px)", animation: "glow-pulse 6s ease-in-out infinite 2s", pointerEvents: "none" }} />

        <motion.div variants={containerVariants} initial="hidden" animate="visible"
          style={{ maxWidth: 860, width: "100%", textAlign: "center" }}>

          <motion.div variants={itemVariants}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 14px", borderRadius: 100,
              border: "1px solid rgba(232,255,71,0.25)",
              background: "rgba(232,255,71,0.05)",
              fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(232,255,71,0.8)",
              marginBottom: 32,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 8px var(--accent)", animation: "glow-pulse 2s infinite" }} />
              Available for internships & freelance
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} style={{
            fontSize: "clamp(42px, 7vw, 88px)", fontWeight: 800, lineHeight: 1.05,
            letterSpacing: "-0.03em", marginBottom: 20,
            background: "linear-gradient(135deg, #f0ede8 30%, #7a7672 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Mradul Patle
          </motion.h1>

          <motion.div variants={itemVariants} style={{ marginBottom: 28, height: 40, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <TypingRole />
          </motion.div>

          <motion.p variants={itemVariants} style={{
            fontSize: 17, color: "var(--muted)", lineHeight: 1.7,
            maxWidth: 560, margin: "0 auto 40px",
          }}>
            CS student at <span style={{ color: "var(--text)" }}>IIIT Bhopal</span> · 9.79 CGPA · 500+ DSA problems · building fast, real-world MERN apps.
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 64 }}>
            <motion.button onClick={() => navigate("/projects")} data-hover
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{
                padding: "13px 28px", borderRadius: 8, border: "none",
                background: "var(--accent)", color: "#0a0a0a",
                fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, cursor: "pointer",
                letterSpacing: "0.02em",
              }}>
              View Projects →
            </motion.button>
            <motion.button onClick={() => navigate("/contact")} data-hover
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{
                padding: "13px 28px", borderRadius: 8,
                border: "1px solid var(--border-hover)",
                background: "transparent", color: "var(--text)",
                fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, cursor: "pointer",
              }}>
              Contact Me
            </motion.button>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={itemVariants}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "var(--border)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", maxWidth: 520, margin: "0 auto" }}>
            {[
              { n: "9.79", label: "CGPA" },
              { n: "500+", label: "DSA Problems" },
              { n: "4+", label: "Projects Shipped" },
            ].map((s, i) => (
              <div key={i} style={{ background: "var(--surface)", padding: "20px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: "var(--accent)", letterSpacing: "-0.02em" }}>{s.n}</div>
                <div style={{ fontSize: 11, color: "var(--muted)", fontFamily: "var(--font-mono)", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* MARQUEE TECH STACK */}
      <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "16px 0", overflow: "hidden", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", gap: 32, width: "max-content", animation: "marquee 28s linear infinite" }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} style={{ whiteSpace: "nowrap", fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--muted)", display: "flex", alignItems: "center", gap: 32 }}>
              {item}
              <span style={{ color: "var(--accent)", opacity: 0.4, marginLeft: -16 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* FEATURED PROJECTS PREVIEW */}
      <section className="section" style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", marginBottom: 8 }}>// selected work</p>
              <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, letterSpacing: "-0.02em" }}>Projects</h2>
            </div>
            <motion.button onClick={() => navigate("/projects")} data-hover
              whileHover={{ x: 4 }}
              style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 14, cursor: "pointer", fontFamily: "var(--font-sans)", display: "flex", alignItems: "center", gap: 6 }}>
              All projects →
            </motion.button>
          </div>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {[
            { name: "Prep-Pilot", desc: "AI-powered coding interview prep with personalized roadmaps, DSA practice, and a browser IDE.", tech: ["MERN", "JWT", "AI API"], num: "01", link: "https://prep-pilot-front.onrender.com/" },
            { name: "Shopkey", desc: "Full-stack e-commerce with auth, product management, and Stripe-powered secure checkout.", tech: ["MERN", "Stripe", "JWT"], num: "02", link: "https://shopkey-432.vercel.app" },
            { name: "Chattt", desc: "Real-time 1-on-1 messaging with <200ms latency, online presence, and Zustand state.", tech: ["Socket.IO", "MERN", "Zustand"], num: "03", link: "https://fullstack-chatapp-e8lf.onrender.com" },
          ].map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <TiltCard style={{
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: 16, padding: 28, height: "100%",
                cursor: "pointer",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", opacity: 0.6 }}>{p.num}</span>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" data-hover
                    style={{ color: "var(--muted)", fontSize: 18, textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "var(--accent)"}
                    onMouseLeave={e => e.target.style.color = "var(--muted)"}
                  >↗</a>
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.01em" }}>{p.name}</h3>
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, marginBottom: 20 }}>{p.desc}</p>
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
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: 20, padding: "60px 48px",
            display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 28,
            position: "relative", overflow: "hidden",
          }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(232,255,71,0.04)", filter: "blur(40px)", pointerEvents: "none" }} />
          <div>
            <h2 style={{ fontSize: "clamp(24px,4vw,40px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 10 }}>
              Let's build something <span style={{ color: "var(--accent)", fontStyle: "italic", fontFamily: "var(--font-serif)" }}>remarkable</span>
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 15 }}>Open to internships, freelance projects, and full-time roles.</p>
          </div>
          <motion.button onClick={() => navigate("/contact")} data-hover
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            style={{
              padding: "14px 32px", borderRadius: 8, border: "none",
              background: "var(--accent)", color: "#0a0a0a",
              fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 700, cursor: "pointer",
              whiteSpace: "nowrap",
            }}>
            Get in touch →
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}