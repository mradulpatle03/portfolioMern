import { motion } from "framer-motion";
import SkillsGrid from "../components/Skills";

const iv = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

const STATS = [
  { n: "9.65", label: "CGPA at IIIT Bhopal" },
  { n: "1000+", label: "LeetCode Problems Solved" },
  { n: "1974", label: "Max LeetCode Rating" },
  { n: "600+", label: "GDG Members Served" },
];

const EXPERIENCE = [
  {
    role: "Web Development Lead",
    org: "Google Developers Group, IIIT Bhopal",
    period: "Oct 2025 — Present",
    location: "IIIT Bhopal (On-site)",
    current: true,
    points: [
      "Leading design & development of community/event web platforms on the MERN stack, improving engagement for 600+ active members.",
      "Collaborating with the GDG core team to manage repositories, enforce code standards, and streamline development via Git/GitHub.",
    ],
  },
  {
    role: "Web Development Intern",
    org: "Explified",
    period: "May 2025 — Aug 2025",
    location: "Remote",
    points: [
      "Delivered and deployed MERN stack web applications serving 1K+ users across internal and client platforms.",
      "Engineered AI-based tools, including a YouTube Summarizer, Chatbot, AI Presentation Maker, and AI Image Enhancer.",
      "Maintained scalable, production-ready codebases with Git/GitHub, improving team efficiency.",
    ],
  },
  {
    role: "Teaching Assistant",
    org: "IIIT Bhopal: Effective Communication & Soft Skills",
    period: "Jul 2024 — Jan 2025",
    location: "IIIT Bhopal (On-site)",
    points: [
      "Selected from 70+ candidates as Teaching Assistant.",
      "Developed grading rubrics for 10+ assignments across 80 students, reducing grading discrepancies.",
    ],
  },
];

const ACHIEVEMENTS = [
  { title: "Knight, LeetCode", detail: "1000+ problems solved · max rating 1974", accent: "var(--accent)" },
  { title: "9th Rank, MP Board (Class 12)", detail: "Among 7,00,000+ students statewide", accent: "var(--accent2)" },
];

export default function About() {
  return (
    <div style={{ padding: "60px 24px 100px", maxWidth: 1100, margin: "0 auto" }}>

      {/* Header */}
      <motion.div {...iv(0)} style={{ marginBottom: 56 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", marginBottom: 12 }}>// about me</p>
        <h1 style={{ fontSize: "clamp(40px,7vw,80px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>
          Mradul<br />
          <span style={{ color: "var(--muted)" }}>Patle</span>
        </h1>
      </motion.div>

      {/* Bio + Photo */}
      <motion.div {...iv(0.1)} style={{
        display: "grid", gridTemplateColumns: "1fr auto",
        gap: 48, alignItems: "start", marginBottom: 48,
      }} className="about-grid">
        <div>
          <p style={{ fontSize: 18, lineHeight: 1.75, color: "var(--muted)", marginBottom: 20 }}>
            CS undergrad at <span style={{ color: "var(--text)", fontWeight: 600 }}>IIIT Bhopal</span> (9.65 CGPA), currently leading web development for <span style={{ color: "var(--text)", fontWeight: 600 }}>Google Developers Group IIIT Bhopal</span>. I build full-stack products on the MERN stack and have solved <span style={{ color: "var(--text)", fontWeight: 600 }}>1000+ DSA problems</span>, earning Knight status on LeetCode with a max rating of 1974.
          </p>
          <p style={{ fontSize: 18, lineHeight: 1.75, color: "var(--muted)", marginBottom: 20 }}>
            I spent a summer as a <span style={{ color: "var(--text)", fontWeight: 600 }}>Web Development Intern at Explified</span>, shipping MERN applications to 1,000+ users and building AI-powered tools, including a YouTube summarizer, chatbot, presentation maker, and image enhancer.
          </p>
          <p style={{ fontSize: 18, lineHeight: 1.75, color: "var(--muted)" }}>
            Right now I'm building <span style={{ color: "var(--text)", fontWeight: 600 }}>PlacementOS</span>, <span style={{ color: "var(--text)", fontWeight: 600 }}>HireFlow</span>, and <span style={{ color: "var(--text)", fontWeight: 600 }}>Habit-Forge</span> - full-stack systems using queues, LLMs, and real-time infrastructure. Passionate about performance, clean architecture, and shipping products that actually matter.
          </p>
        </div>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div style={{ width: 200, height: 200, borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)" }}>
            <img src="/mradul.png" alt="Mradul Patle" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ position: "absolute", inset: -8, borderRadius: 24, border: "1px solid rgba(232,90,79,0.15)", zIndex: -1 }} />
          <div style={{
            position: "absolute", bottom: -14, left: "50%", transform: "translateX(-50%)",
            display: "inline-flex", borderRadius: 4, overflow: "hidden",
            border: "1px solid var(--text)", fontFamily: "var(--font-mono)",
            fontSize: 10, fontWeight: 700, letterSpacing: "0.04em", whiteSpace: "nowrap",
            boxShadow: "0 4px 12px rgba(20,26,43,0.12)",
          }}>
            <span style={{ padding: "4px 8px", background: "var(--text)", color: "var(--bg)" }}>ROLE</span>
            <span style={{ padding: "4px 8px", background: "var(--accent)", color: "#fff" }}>WEB DEV LEAD</span>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div {...iv(0.15)} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 64 }}>
        {STATS.map((s, i) => (
          <div key={i} style={{
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: 12, padding: "24px 20px",
          }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: "var(--accent2)", letterSpacing: "-0.03em", marginBottom: 6 }}>{s.n}</div>
            <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--font-mono)" }}>{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Experience Timeline */}
      <motion.div {...iv(0.2)} style={{ marginBottom: 64 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", marginBottom: 24 }}>// experience</p>
        <div style={{ position: "relative", paddingLeft: 28 }}>
          <div style={{ position: "absolute", left: 5, top: 6, bottom: 6, width: 2, background: "var(--border)" }} />
          {EXPERIENCE.map((e, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              style={{ position: "relative", marginBottom: i === EXPERIENCE.length - 1 ? 0 : 32 }}>
              <div style={{
                position: "absolute", left: -28, top: 4, width: 12, height: 12, borderRadius: "50%",
                background: e.current ? "#2f9e63" : "var(--bg2)",
                border: `2px solid ${e.current ? "#2f9e63" : "var(--text)"}`,
              }} />
              <div style={{
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: 12, padding: "20px 24px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                      <span style={{ fontSize: 16, fontWeight: 700 }}>{e.role}</span>
                      {e.current && (
                        <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", fontWeight: 700, color: "#2f9e63", letterSpacing: "0.04em" }}>ACTIVE</span>
                      )}
                    </div>
                    <div style={{ fontSize: 13, color: "var(--accent)" }}>{e.org}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>{e.period}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)", opacity: 0.8 }}>{e.location}</div>
                  </div>
                </div>
                <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
                  {e.points.map((p, j) => (
                    <li key={j} style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>{p}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Education + Achievements */}
      <motion.div {...iv(0.22)} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 64 }} className="edu-ach-grid">
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "24px 24px" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", marginBottom: 16 }}>// education</p>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>B.Tech in Computer Science</div>
          <div style={{ fontSize: 13, color: "var(--accent)", marginBottom: 8 }}>IIIT Bhopal</div>
          <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--font-mono)" }}>Aug 2023 — May 2027 · CGPA 9.65</div>
        </div>

        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "24px 24px" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", marginBottom: 16 }}>// achievements</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {ACHIEVEMENTS.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: a.accent, marginTop: 6, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{a.title}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{a.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div {...iv(0.25)}>
        <SkillsGrid />
      </motion.div>

      <style>{`
        @media (max-width: 640px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .about-grid > div:last-child { align-self: center; margin: 0 auto; }
          .edu-ach-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}