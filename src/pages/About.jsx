import { motion } from "framer-motion";
import SkillsGrid from "../components/Skills";

const iv = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

export default function About() {
  return (
    <div style={{ padding: "60px 24px 100px", maxWidth: 1100, margin: "0 auto" }}>
      
      {/* Header */}
      <motion.div {...iv(0)} style={{ marginBottom: 64 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", marginBottom: 12 }}>// about me</p>
        <h1 style={{ fontSize: "clamp(40px,7vw,80px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>
          Mradul<br />
          <span style={{ color: "var(--muted)" }}>Patle</span>
        </h1>
      </motion.div>

      {/* Bio + Photo */}
      <motion.div {...iv(0.1)} style={{
        display: "grid", gridTemplateColumns: "1fr auto",
        gap: 48, alignItems: "start", marginBottom: 64,
      }} className="about-grid">
        <div>
          <p style={{ fontSize: 18, lineHeight: 1.75, color: "var(--muted)", marginBottom: 20 }}>
            CS student at <span style={{ color: "var(--text)", fontWeight: 600 }}>IIIT Bhopal</span> with a <span style={{ color: "var(--accent)", fontWeight: 600 }}>9.79 CGPA</span>. I build full-stack products with the MERN stack and have solved <span style={{ color: "var(--text)", fontWeight: 600 }}>500+ DSA problems</span> on platforms like LeetCode and Codeforces.
          </p>
          <p style={{ fontSize: 18, lineHeight: 1.75, color: "var(--muted)", marginBottom: 20 }}>
            I completed a <span style={{ color: "var(--text)", fontWeight: 600 }}>4-month internship as a Tech Team Member at Explified</span>, building real-world web solutions used by thousands.
          </p>
          <p style={{ fontSize: 18, lineHeight: 1.75, color: "var(--muted)" }}>
            Passionate about performance, clean architecture, and shipping products that actually matter.
          </p>
        </div>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div style={{ width: 200, height: 200, borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)" }}>
            <img src="/mradul.png" alt="Mradul Patle" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ position: "absolute", inset: -8, borderRadius: 24, border: "1px solid rgba(232,90,79,0.15)", zIndex: -1 }} />
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div {...iv(0.15)} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 64 }}>
        {[
          { n: "9.79", label: "CGPA at IIIT Bhopal" },
          { n: "500+", label: "DSA Problems Solved" },
          { n: "4+", label: "Projects Shipped" },
          { n: "4mo", label: "Internship @ Explified" },
        ].map((s, i) => (
          <div key={i} style={{
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: 12, padding: "24px 20px",
          }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: "var(--accent)", letterSpacing: "-0.03em", marginBottom: 6 }}>{s.n}</div>
            <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--font-mono)" }}>{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Experience */}
      <motion.div {...iv(0.2)} style={{ marginBottom: 64 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", marginBottom: 24 }}>// experience</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--border)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
          {[
            { role: "Tech Team Member (Intern)", company: "Explified", period: "4 months", note: "Built MERN stack features for a live product" },
            { role: "CS Undergraduate", company: "IIIT Bhopal", period: "2022 – present", note: "9.79 CGPA · DSA · OS · DBMS · CN" },
          ].map((e, i) => (
            <div key={i} style={{
              background: "var(--surface)", padding: "20px 24px",
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
              flexWrap: "wrap", gap: 8,
            }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{e.role}</div>
                <div style={{ fontSize: 13, color: "var(--accent)", marginBottom: 4 }}>{e.company}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{e.note}</div>
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)", whiteSpace: "nowrap" }}>{e.period}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div {...iv(0.25)}>
        <SkillsGrid />
      </motion.div>

      <style>{`
        @media (max-width: 640px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}