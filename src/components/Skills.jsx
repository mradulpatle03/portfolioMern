import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DEVICON = (name, variant = "original") =>
  `https://raw.githubusercontent.com/devicons/devicon/master/icons/${name}/${name}-${variant}.svg`;

const INVERT = new Set(["express", "nextjs", "github"]);

const categories = [
  {
    key: "lang",
    file: "languages.ts",
    label: "Languages",
    items: [
      { name: "C/C++", icon: DEVICON("cplusplus") },
      { name: "JavaScript", icon: DEVICON("javascript") },
      { name: "TypeScript", icon: DEVICON("typescript") },
      { name: "Python", icon: DEVICON("python") },
      { name: "HTML5", icon: DEVICON("html5") },
      { name: "CSS3", icon: DEVICON("css3") },
      { name: "SQL", icon: DEVICON("mysql") },
    ],
  },
  {
    key: "front",
    file: "frontend.jsx",
    label: "Frontend",
    items: [
      { name: "React", icon: DEVICON("react") },
      { name: "Next.js", icon: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg" },
      { name: "Redux", icon: DEVICON("redux") },
      { name: "Zustand", icon: null },
      { name: "Tailwind", icon: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" },
      { name: "Bootstrap", icon: DEVICON("bootstrap") },
      { name: "Chart.js", icon: DEVICON("chartjs") },
      { name: "Axios", icon: null },
    ],
  },
  {
    key: "back",
    file: "backend.js",
    label: "Backend & DB",
    items: [
      { name: "Node.js", icon: DEVICON("nodejs") },
      { name: "Express.js", icon: DEVICON("express") },
      { name: "MongoDB", icon: DEVICON("mongodb") },
      { name: "Mongoose", icon: null },
      { name: "MySQL", icon: DEVICON("mysql") },
      { name: "Redis", icon: DEVICON("redis") },
      { name: "Socket.IO", icon: DEVICON("socketio") },
      { name: "REST APIs", icon: null },
    ],
  },
  {
    key: "ml",
    file: "ml_dl.py",
    label: "ML / DL",
    items: [
      { name: "NumPy", icon: DEVICON("numpy") },
      { name: "Pandas", icon: DEVICON("pandas") },
      { name: "scikit-learn", icon: DEVICON("scikitlearn") },
      { name: "OpenCV", icon: DEVICON("opencv") },
      { name: "Mediapipe", icon: null },
      { name: "CNN", icon: null },
    ],
  },
  {
    key: "tools",
    file: "tools.sh",
    label: "Tools",
    items: [
      { name: "Git", icon: DEVICON("git") },
      { name: "GitHub", icon: DEVICON("github") },
      { name: "VS Code", icon: DEVICON("vscode") },
      { name: "Postman", icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
      { name: "Render", icon: null },
      { name: "Vercel", icon: DEVICON("vercel") },
    ],
  },
];

const coreConcepts = ["DBMS", "Operating Systems", "Computer Networks", "System Design", "OOP", "DSA", "DB Indexing", "CRUD", "Middleware"];

function iconInvert(url) {
  const m = url?.match(/icons\/([a-z]+)\//);
  return m && INVERT.has(m[1]);
}

export default function SkillsGrid() {
  const [active, setActive] = useState(0);
  const cat = categories[active];

  return (
    <div>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", marginBottom: 20 }}>// skills & tools</p>

      {/* Editor window */}
      <div style={{
        border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden",
        background: "var(--surface)", boxShadow: "0 12px 40px rgba(20,26,43,0.06)",
      }}>
        {/* Title bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "10px 14px", borderBottom: "1px solid var(--border)",
          background: "var(--bg2)",
        }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#E85A4F" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#E8A93B" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#2B4EE6" }} />
          <span style={{ marginLeft: 10, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)" }}>
            mradul-patle — {cat.file}
          </span>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", overflowX: "auto", borderBottom: "1px solid var(--border)", background: "var(--bg2)" }}>
          {categories.map((c, i) => (
            <button key={c.key} onClick={() => setActive(i)} data-hover
              style={{
                position: "relative", whiteSpace: "nowrap",
                padding: "10px 18px", border: "none", cursor: "pointer",
                background: active === i ? "var(--surface)" : "transparent",
                fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600,
                color: active === i ? "var(--text)" : "var(--muted)",
                borderRight: "1px solid var(--border)",
                transition: "color 0.2s",
              }}>
              {c.file}
              {active === i && (
                <motion.span layoutId="tab-underline"
                  style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 2, background: "var(--accent2)" }} />
              )}
            </button>
          ))}
        </div>

        {/* Code-style panel */}
        <div style={{ padding: "22px 22px 26px" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--muted)", marginBottom: 16 }}>
            <span style={{ color: "#a78bfa" }}>const</span>{" "}
            <span style={{ color: "var(--accent)" }}>{cat.key}</span>{" "}
            <span style={{ color: "var(--text)" }}>=</span>{" "}
            <span style={{ color: "var(--text)" }}>[</span>
            <span style={{ color: "var(--accent3)" }}> {cat.items.length} skills</span>
            <span style={{ color: "var(--text)" }}> ]</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={cat.key}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(104px, 1fr))", gap: 10 }}
            >
              {cat.items.map((s, i) => (
                <motion.div key={s.name}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.035 }}
                  whileHover={{ y: -4 }}
                  style={{
                    position: "relative", background: "var(--bg2)",
                    border: "1px solid var(--border)", borderRadius: 10,
                    padding: "16px 8px 12px",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                    cursor: "default", overflow: "hidden",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; }}
                >
                  <span style={{
                    position: "absolute", top: 6, right: 8,
                    fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--border-hover)",
                  }}>{String(i + 1).padStart(2, "0")}</span>

                  {s.icon ? (
                    <img src={s.icon} alt={s.name} loading="lazy"
                      style={{ width: 30, height: 30, objectFit: "contain", filter: iconInvert(s.icon) ? "invert(1)" : "none" }} />
                  ) : (
                    <div style={{
                      width: 30, height: 30, borderRadius: 7, background: "var(--surface)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "var(--accent2)",
                    }}>{s.name.slice(0, 2).toUpperCase()}</div>
                  )}
                  <span style={{ fontSize: 11, color: "var(--text)", fontFamily: "var(--font-mono)", textAlign: "center", lineHeight: 1.2 }}>{s.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Core concepts — terminal strip */}
      <div style={{
        marginTop: 20, border: "1px solid var(--border)", borderRadius: 10,
        background: "var(--muted)", padding: "14px 18px", overflow: "hidden",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ color: "var(--accent3)", fontFamily: "var(--font-mono)", fontSize: 12 }}>$</span>
          <span style={{ color: "#B9BCC9", fontFamily: "var(--font-mono)", fontSize: 12 }}>cat core-concepts.md</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {coreConcepts.map((s, i) => (
            <span key={i} style={{
              fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600,
              padding: "4px 11px", borderRadius: 100,
              border: "1px solid rgba(255,255,255,0.18)", color: "var(--bg)",
              background: "rgba(255,255,255,0.06)",
            }}>{s.toLocaleUpperCase()}</span>
          ))}
        </div>
      </div>
    </div>
  );
}