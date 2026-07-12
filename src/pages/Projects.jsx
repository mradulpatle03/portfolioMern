import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    name: "PlacementOS",
    link: "https://github.com/mradulpatle03/PlacementOS",
    tagline: "Placement Management System",
    period: "Jun 2026 – Present",
    branch: "feature/placement-os",
    tech: ["React", "Node.js", "MongoDB", "Redis", "BullMQ", "Socket.IO"],
    bullets: [
      "Assembled a full-stack SaaS platform digitizing the entire college placement lifecycle across 5 roles: Student, Coordinator, TPO, Recruiter, and Admin.",
      "Rolled out a Smart Eligibility Engine auto-filtering candidates by CGPA, branch, and backlogs, plus a configurable Policy Engine enforcing one-offer and dream-company rules.",
      "Integrated a 9-stage Kanban recruitment pipeline with drag-and-drop, bulk actions, and Excel/CSV export at every stage using BullMQ background jobs.",
    ],
    stat: { label: "roles supported", value: "5" },
    accent: "var(--accent2)",
  },
  {
    name: "HireFlow",
    link: "https://ai-hiring-platform-phi.vercel.app/",
    tagline: "AI Hiring Platform",
    period: "Apr 2026 – Jun 2026",
    branch: "feature/resume-scoring",
    tech: [
      "React",
      "Node.js",
      "MongoDB",
      "Socket.IO",
      "Groq LLM",
      "Bull Queue",
    ],
    bullets: [
      "Built a full-stack AI hiring platform with explainable multi-dimensional resume scoring across 5 dimensions using Groq LLM for automated candidate ranking.",
      "Coded real-time messaging via Socket.IO with typing indicators and an interview scheduling system with confirmation emails and calendar (.ics) attachments.",
      "Configured semantic resume-job matching using custom vector embeddings, a background screening queue, and a recruiter analytics dashboard with funnel and score charts.",
    ],
    stat: { label: "scoring dimensions", value: "5" },
    accent: "var(--bg2)",
  },
  {
    name: "Habit-Forge",
    link: "https://habitforge-sand.vercel.app/",
    tagline: "Intent vs Evidence Habit Tracker",
    period: "Jan 2026 – May 2026",
    branch: "feature/streak-decay",
    tech: [
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "JWT",
      "Tailwind",
      "Recharts",
    ],
    bullets: [
      "Architected a two-layer system (Intent vs Evidence) supporting 2 tracking modes to separate planned tasks from verified outcomes.",
      "Designed a confidence scoring model improving data reliability via proof-based prioritization.",
      "Implemented streak decay and insights analyzing 7-day activity patterns to boost consistency.",
    ],
    stat: { label: "tracking modes", value: "2" },
    accent: "var(--bg2)",
  },
];

function TiltCard({ children, style }) {
  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -8;
    el.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg)`;
  };
  const onLeave = (e) => {
    e.currentTarget.style.transform =
      "perspective(900px) rotateX(0) rotateY(0)";
  };
  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transition: "transform 0.18s ease",
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function CommitHash(seed) {
  // stable pseudo-hash purely for the git-log aesthetic
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h.toString(16).slice(0, 7);
}

export default function Projects() {
  const [open, setOpen] = useState(0);

  return (
    <div
      style={{ padding: "60px 24px 100px", maxWidth: 1100, margin: "0 auto" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: 40 }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--accent)",
            marginBottom: 12,
          }}
        >
          // selected work
        </p>
        <h1
          style={{
            fontSize: "clamp(40px,7vw,80px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          Projects
        </h1>
      </motion.div>

      {/* git log window */}
      <div
        style={{
          border: "1px solid var(--border)",
          borderRadius: 12,
          overflow: "hidden",
          background: "var(--surface)",
          boxShadow: "0 12px 40px rgba(20,26,43,0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 14px",
            borderBottom: "1px solid var(--border)",
            background: "var(--bg2)",
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#E85A4F",
            }}
          />
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#E8A93B",
            }}
          />
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#2B4EE6",
            }}
          />
          <span
            style={{
              marginLeft: 10,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--muted)",
            }}
          >
            mradul-patle — git log --oneline --graph
          </span>
        </div>

        <div style={{ padding: "8px 0" }}>
          {projects.map((p, i) => {
            const isOpen = open === i;
            return (
              <div
                key={p.name}
                style={{
                  borderBottom:
                    i < projects.length - 1
                      ? "1px solid var(--border)"
                      : "none",
                }}
              >
                {/* Commit row / header */}
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  data-hover
                  style={{
                    width: "100%",
                    textAlign: "left",
                    border: "none",
                    cursor: "pointer",
                    background: isOpen ? "var(--bg2)" : "transparent",
                    padding: "18px 22px",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    flexWrap: "wrap",
                    transition: "background 0.2s",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      color: "var(--accent3)",
                      flexShrink: 0,
                    }}
                  >
                    {CommitHash(p.name)}
                  </span>

                  <span
                    style={{
                      fontSize: "clamp(18px,2.6vw,26px)",
                      fontWeight: 800,
                      letterSpacing: "-0.01em",
                      color: "var(--text)",
                    }}
                  >
                    {p.name}
                  </span>

                  <span
                    style={{
                      fontSize: 13,
                      color: "var(--muted)",
                      flex: 1,
                      minWidth: 140,
                    }}
                  >
                    {p.tagline}
                  </span>

                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--muted)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.period}
                  </span>

                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-hover
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 7,
                        flexShrink: 0,
                        border: "1px solid var(--border-hover)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--muted)",
                        textDecoration: "none",
                        fontSize: 15,
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--accent)";
                        e.currentTarget.style.color = "var(--bg)";
                        e.currentTarget.style.borderColor = "var(--accent)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "var(--muted)";
                        e.currentTarget.style.borderColor =
                          "var(--border-hover)";
                      }}
                    >
                      ↗
                    </a>
                  )}

                  <motion.span
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--accent2)",
                      fontSize: 14,
                      flexShrink: 0,
                    }}
                  >
                    ›
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        style={{
                          padding: "4px 22px 26px 22px",
                          display: "grid",
                          gridTemplateColumns: "1fr auto",
                          gap: 24,
                        }}
                        className="proj-detail-grid"
                      >
                        <div>
                          <div
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 11,
                              color: "var(--muted)",
                              marginBottom: 12,
                              opacity: 0.8,
                            }}
                          >
                            branch:{" "}
                            <span style={{ color: "var(--accent)" }}>
                              {p.branch}
                            </span>
                          </div>
                          {p.bullets.map((b, j) => (
                            <motion.div
                              key={j}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: j * 0.06 }}
                              style={{
                                display: "flex",
                                gap: 10,
                                marginBottom: 10,
                                alignItems: "flex-start",
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: "var(--font-mono)",
                                  color: "#2f9e63",
                                  fontSize: 13,
                                  lineHeight: 1.6,
                                  flexShrink: 0,
                                }}
                              >
                                +
                              </span>
                              <span
                                style={{
                                  fontSize: 14,
                                  color: "var(--muted)",
                                  lineHeight: 1.65,
                                }}
                              >
                                {b}
                              </span>
                            </motion.div>
                          ))}

                          <div
                            style={{
                              display: "flex",
                              gap: 6,
                              flexWrap: "wrap",
                              marginTop: 16,
                            }}
                          >
                            {p.tech.map((t, j) => (
                              <span key={j} className="tag">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* More coming soon */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          marginTop: 32,
          textAlign: "center",
          padding: "28px",
          border: "1px dashed var(--border)",
          borderRadius: 16,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "var(--muted)",
          }}
        >
          // more commits on{" "}
          <a
            href="https://github.com/mradulpatle03"
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            style={{ color: "var(--accent)", textDecoration: "none" }}
          >
            GitHub ↗
          </a>
        </p>
      </motion.div>

      <style>{`
        @media (max-width: 640px) {
          .proj-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
