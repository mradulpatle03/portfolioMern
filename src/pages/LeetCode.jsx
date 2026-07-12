// src/pages/LeetCode.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Code2, Trophy, Star, CheckCircle2, Clock,
  BarChart2, Zap, Target, Award, TrendingUp,
  ChevronRight, ExternalLink, Activity,
} from "lucide-react";

const BASE = "https://alfa-leetcode-api.onrender.com";
const USERNAME = "mradulpatle";

// ─── Palette (mapped to the site's cream/editorial theme variables) ────────
const C = {
  gold:   "#E8A93B", // var(--accent3)
  text:   "#141A2B", // var(--text)
  muted:  "#5D5A4E", // var(--muted)
  bg1:    "#F2EEE1", // var(--bg)
  bg2:    "#EDE8D6", // var(--bg2)
  card:   "rgba(232,224,201,0.55)", // var(--surface) translucent
  border: "rgba(20,26,43,0.18)",    // var(--border)
  purple: "#a78bfa",
  green:  "#2f9e63",
  amber:  "#c8830a",
  red:    "#d1453d",
  blue:   "#2B4EE6", // var(--accent)
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial:    { y: 28, opacity: 0 },
  animate:    { y: 0,  opacity: 1 },
  transition: { type: "spring", stiffness: 200, damping: 22, delay },
});

function safe(v) {
  if (v == null) return "—";
  if (typeof v === "object") return v.name ?? v.title ?? v.displayName ?? "—";
  return String(v);
}

// ─── UI atoms ────────────────────────────────────────────────────────────────
function SectionCard({ children, style = {} }) {
  return (
    <div style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 16,
      padding: 24,
      backdropFilter: "blur(8px)",
      ...style,
    }}>{children}</div>
  );
}

function SectionHeading({ icon: Icon, title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: `${C.gold}18`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={18} color={C.gold} />
      </div>
      <h3 style={{ color: C.text, fontWeight: 700, fontSize: 17, margin: 0 }}>{title}</h3>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: `${C.bg2}99`, border: `1px solid ${hov ? C.gold + "55" : C.border}`,
        borderRadius: 16, padding: "20px 16px",
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: 8, textAlign: "center",
        transform: hov ? "scale(1.04)" : "scale(1)",
        transition: "border-color 0.3s, transform 0.3s",
        cursor: "default",
      }}
    >
      <div style={{ width: 40, height: 40, borderRadius: 10, background: `${C.gold}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={20} color={color} />
      </div>
      <div style={{ fontSize: 26, fontWeight: 800, color, lineHeight: 1 }}>{safe(value)}</div>
      <div style={{ fontSize: 12, color: `${C.muted}99`, lineHeight: 1.3 }}>{label}</div>
    </div>
  );
}

function StatPill({ label, value, color = C.gold }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
      padding: "12px 8px", background: `${C.bg2}99`,
      border: `1px solid ${C.border}`, borderRadius: 10, textAlign: "center",
    }}>
      <span style={{ fontSize: 20, fontWeight: 800, color }}>{safe(value)}</span>
      <span style={{ fontSize: 11, color: `${C.muted}88`, lineHeight: 1.3 }}>{label}</span>
    </div>
  );
}

function AnimBar({ pct, color, delay = 0 }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(pct), 350 + delay); return () => clearTimeout(t); }, [pct, delay]);
  return (
    <div style={{ height: 8, borderRadius: 99, background: "rgba(20,26,43,0.08)", overflow: "hidden" }}>
      <div style={{ height: "100%", borderRadius: 99, background: color, width: `${w}%`, transition: "width 1.1s ease" }} />
    </div>
  );
}

function DiffBar({ label, solved, total, color, delay }) {
  const pct = total ? Math.round((solved / total) * 100) : 0;
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color }}>{label}</span>
        <span style={{ fontSize: 13, color: `${C.muted}99` }}>{solved} / {total ?? "?"}</span>
      </div>
      <AnimBar pct={pct} color={color} delay={delay} />
    </div>
  );
}

function Pulse({ h = 80 }) {
  return (
    <div style={{
      height: h, borderRadius: 12,
      background: `${C.bg2}66`, border: `1px solid ${C.border}`,
      animation: "lc-pulse 1.8s ease-in-out infinite",
    }} />
  );
}

function ErrBox({ msg }) {
  return (
    <div style={{
      borderRadius: 10, padding: 18, textAlign: "center",
      color: "#c0392bcc", fontSize: 13,
      border: "1px solid rgba(192,57,43,0.2)", background: "rgba(192,57,43,0.04)",
    }}>{msg}</div>
  );
}

// ─── Heatmap ─────────────────────────────────────────────────────────────────
function Heatmap({ raw }) {
  let calObj = raw;
  if (typeof raw === "string") {
    try { calObj = JSON.parse(raw); } catch { return <ErrBox msg="Could not parse calendar" />; }
  }
  if (!calObj || typeof calObj !== "object" || Array.isArray(calObj)) return <ErrBox msg="No calendar data" />;

  const entries = Object.entries(calObj)
    .map(([ts, count]) => ({ date: new Date(Number(ts) * 1000), count: Number(count) || 0 }))
    .filter(e => !isNaN(e.date.getTime()));

  if (!entries.length) return <ErrBox msg="No submissions yet" />;

  const dateMap = {};
  entries.forEach(({ date, count }) => { dateMap[date.toDateString()] = count; });

  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - 364);
  start.setDate(start.getDate() - start.getDay());

  const weeks = [];
  const cur = new Date(start);
  while (cur <= today) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const day = new Date(cur);
      week.push({ date: day, count: dateMap[day.toDateString()] || 0 });
      cur.setDate(cur.getDate() + 1);
    }
    weeks.push(week);
  }

  const maxCount = Math.max(...entries.map(e => e.count), 1);
  const total = entries.reduce((s, e) => s + e.count, 0);

  function cellColor(count) {
    if (!count) return "rgba(20,26,43,0.06)";
    const t = Math.min(count / maxCount, 1);
    if (t < 0.25) return `${C.gold}40`;
    if (t < 0.5)  return `${C.gold}7a`;
    if (t < 0.75) return `${C.gold}b0`;
    return C.gold;
  }

  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthLabels = [];
  weeks.forEach((week, wi) => {
    const d = week[0].date;
    if (d.getDate() <= 7) monthLabels.push({ wi, label: MONTHS[d.getMonth()] });
  });

  return (
    <div>
      <div style={{ position: "relative", height: 18, marginBottom: 4 }}>
        {monthLabels.map(({ wi, label }) => (
          <span key={wi} style={{ position: "absolute", left: wi * 13, fontSize: 10, color: `${C.muted}70` }}>{label}</span>
        ))}
      </div>
      <div style={{ overflowX: "auto" }}>
        <div style={{ display: "flex", gap: 3, minWidth: "max-content" }}>
          {weeks.map((week, wi) => (
            <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {week.map((day, di) => (
                <div
                  key={di}
                  title={`${day.date.toDateString()}: ${day.count} submission${day.count !== 1 ? "s" : ""}`}
                  style={{
                    width: 10, height: 10, borderRadius: 2,
                    background: cellColor(day.count), cursor: "pointer",
                    transition: "transform 0.15s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.5)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
        <span style={{ fontSize: 12, color: `${C.muted}70` }}>{total.toLocaleString()} submissions in the last year</span>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 10, color: `${C.muted}55` }}>Less</span>
          {[0, 0.25, 0.5, 0.75, 1].map((v, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: cellColor(v * maxCount) }} />
          ))}
          <span style={{ fontSize: 10, color: `${C.muted}55` }}>More</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function LeetCode() {
  const [profile,        setProfile]        = useState(null);
  const [solved,         setSolved]         = useState(null);
  const [contest,        setContest]        = useState(null);
  const [contestHistory, setContestHistory] = useState(null);
  const [submissions,    setSubmissions]    = useState(null);
  const [calendar,       setCalendar]       = useState(null);
  const [skills,         setSkills]         = useState(null);
  const [languages,      setLanguages]      = useState(null);
  const [badges,         setBadges]         = useState(null);
  const [loading,        setLoading]        = useState(new Set());

  function startLoad(k) { setLoading(s => new Set([...s, k])); }
  function endLoad(k)   { setLoading(s => { const n = new Set(s); n.delete(k); return n; }); }

  async function get(key, url, setter, transform) {
    startLoad(key);
    try {
      const res  = await fetch(url);
      const data = await res.json();
      setter(transform ? transform(data) : data);
    } catch { /* silent */ } finally { endLoad(key); }
  }

  useEffect(() => {
    get("profile",  `${BASE}/${USERNAME}`,                    setProfile);
    get("solved",   `${BASE}/${USERNAME}/solved`,             setSolved);
    get("contest",  `${BASE}/${USERNAME}/contest`,            setContest);
    get("history",  `${BASE}/${USERNAME}/contest/history`,    setContestHistory);
    get("subs",     `${BASE}/${USERNAME}/submission?limit=8`, setSubmissions);
    get("calendar", `${BASE}/${USERNAME}/calendar`,           setCalendar, d => d.submissionCalendar ?? d);
    get("skills",   `${BASE}/${USERNAME}/skill`,              setSkills);
    get("langs",    `${BASE}/${USERNAME}/language`,           setLanguages);
    get("badges",   `${BASE}/${USERNAME}/badges`,             setBadges);
  }, []);

  const isL = k => loading.has(k);

  const diffRows = solved ? [
    { label: "Easy",   solved: solved.easySolved,   total: solved.totalEasy || 1000,   color: C.green, delay: 0   },
    { label: "Medium", solved: solved.mediumSolved, total: solved.totalMedium || 2100, color: C.amber, delay: 100 },
    { label: "Hard",   solved: solved.hardSolved,   total: solved.totalHard || 1000,   color: C.red,   delay: 200 },
  ] : null;

  const historyArr = Array.isArray(contestHistory)
    ? contestHistory
    : Array.isArray(contestHistory?.contestParticipation)
    ? contestHistory.contestParticipation
    : null;

  function contestTitle(c) {
    if (!c.contest) return "Contest";
    if (typeof c.contest === "string") return c.contest;
    return c.contest.title ?? c.contest.name ?? "Contest";
  }

  function diffStyle(d) {
    if (d === "Easy")   return { color: C.green,  bg: `${C.green}18` };
    if (d === "Medium") return { color: C.amber,  bg: `${C.amber}18` };
    if (d === "Hard")   return { color: C.red,    bg: `${C.red}18`   };
    return                     { color: C.muted,  bg: `${C.muted}18` };
  }

  const langList   = (languages?.languageProblemCount ?? []).sort((a, b) => b.problemsSolved - a.problemsSolved).slice(0, 7);
  const maxLang    = langList[0]?.problemsSolved || 1;
  const langColors = [C.gold, C.purple, C.green, C.amber, C.red, C.blue, C.muted];

  const skillsList = [
    ...(skills?.advanced     || []).slice(0, 3).map(s => ({ ...s, level: "Advanced",     color: C.red   })),
    ...(skills?.intermediate || []).slice(0, 3).map(s => ({ ...s, level: "Intermediate", color: C.amber })),
    ...(skills?.fundamental  || []).slice(0, 2).map(s => ({ ...s, level: "Fundamental",  color: C.green })),
  ];

  return (
    <section style={{ position: "relative", padding: "112px 24px 64px", color: C.text, minHeight: "100vh" }}>
      <style>{`@keyframes lc-pulse { 0%,100%{opacity:1} 50%{opacity:.4} }`}</style>

      {/* Radial bg — aligned with the rest of the portfolio's mesh-bg */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(80% 60% at 10% 10%, rgba(43,78,230,0.07), transparent),
                     radial-gradient(50% 40% at 90% 20%, rgba(232,169,59,0.10), transparent)`,
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 10 }}>

        {/* Header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 16 }}>
            <div>
              <p style={{ fontSize: 12, color: C.gold, fontFamily: "var(--font-mono)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8, margin: "0 0 8px" }}>
                Competitive Programming
              </p>
              <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, color: C.text, margin: "0 0 12px", lineHeight: 1.1 }}>
                LeetCode Journey
              </h1>
              <p style={{ color: `${C.muted}cc`, fontSize: 16, maxWidth: 560, margin: 0 }}>
                A live snapshot of my problem-solving progress, contest performance,
                and coding streaks — pulled directly from LeetCode.
              </p>
            </div>
            <a
              href={`https://leetcode.com/${USERNAME}`} target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "10px 20px", borderRadius: 99,
                border: `1px solid ${C.gold}55`, color: C.gold,
                fontSize: 13, fontWeight: 500, textDecoration: "none",
                transition: "background 0.2s, transform 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${C.gold}12`; e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              <ExternalLink size={14} /> View Profile
            </a>
          </div>
        </motion.div>

        {/* Top 4 stat cards */}
        <motion.div {...fadeUp(0.06)} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 24 }}>
          <StatCard icon={CheckCircle2} label="Total Solved"   value={solved?.solvedProblem} color={C.gold}   />
          <StatCard icon={Trophy}       label="Contest Rating" value={contest?.contestRating ? Math.round(Number(contest.contestRating)) : null} color={C.purple} />
          <StatCard icon={TrendingUp}   label="Global Rank"    value={profile?.ranking ? `#${Number(profile.ranking).toLocaleString()}` : null} color={C.green} />
          <StatCard icon={Award}        label="Badges Earned"  value={badges?.badgesCount}   color={C.amber}  />
        </motion.div>

        {/* Row: Difficulty + Contest */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20, marginBottom: 20 }}>
          <motion.div {...fadeUp(0.1)}>
            <SectionCard style={{ height: "100%" }}>
              <SectionHeading icon={Target} title="Problems Solved" />
              {isL("solved") ? <><Pulse h={56}/><div style={{height:8}}/><Pulse h={56}/></> :
               !diffRows ? <ErrBox msg="No data" /> : (
                <>
                  {diffRows.map(d => <DiffBar key={d.label} {...d} />)}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 16 }}>
                    <StatPill label="Easy"   value={solved?.easySolved}   color={C.green} />
                    <StatPill label="Medium" value={solved?.mediumSolved} color={C.amber} />
                    <StatPill label="Hard"   value={solved?.hardSolved}   color={C.red}   />
                  </div>
                </>
              )}
            </SectionCard>
          </motion.div>

          <motion.div {...fadeUp(0.12)}>
            <SectionCard style={{ height: "100%" }}>
              <SectionHeading icon={Trophy} title="Contest Performance" />
              {isL("contest") ? <Pulse h={160} /> :
               !contest ? <ErrBox msg="No contest data" /> : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <StatPill label="Rating"      value={contest.contestRating ? Math.round(Number(contest.contestRating)) : null} color={C.purple} />
                  <StatPill label="Global Rank" value={contest.contestGlobalRanking ? `#${Number(contest.contestGlobalRanking).toLocaleString()}` : null} color={C.gold} />
                  <StatPill label="Contests"    value={typeof contest.contestParticipation === "number" ? contest.contestParticipation : null} color={C.green} />
                  <StatPill label="Top %"       value={contest.contestTopPercentage != null ? `${contest.contestTopPercentage}%` : null} color={C.amber} />
                  <StatPill label="Attended"    value={typeof contest.contestAttend === "number" ? contest.contestAttend : null} color={C.red} />
                  <StatPill label="Badge"       value={safe(contest.contestBadges)} color={C.muted} />
                </div>
              )}
            </SectionCard>
          </motion.div>
        </div>

        {/* Heatmap */}
        <motion.div {...fadeUp(0.14)} style={{ marginBottom: 20 }}>
          <SectionCard>
            <SectionHeading icon={Activity} title="Submission Activity" />
            {isL("calendar") ? <Pulse h={80} /> :
             calendar ? <Heatmap raw={calendar} /> :
             <ErrBox msg="No calendar data" />}
          </SectionCard>
        </motion.div>

        {/* Row: Languages + Skills */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20, marginBottom: 20 }}>
          <motion.div {...fadeUp(0.16)}>
            <SectionCard style={{ height: "100%" }}>
              <SectionHeading icon={Code2} title="Languages Used" />
              {isL("langs") ? <Pulse h={160} /> :
               !langList.length ? <ErrBox msg="No language data" /> : (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {langList.map((lang, i) => {
                    const pct = Math.round((lang.problemsSolved / maxLang) * 100);
                    return (
                      <div key={i}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                          <span style={{ fontSize: 13, color: C.text }}>{lang.languageName}</span>
                          <span style={{ fontSize: 12, color: `${C.muted}88` }}>{lang.problemsSolved} solved</span>
                        </div>
                        <AnimBar pct={pct} color={langColors[i]} delay={i * 80} />
                      </div>
                    );
                  })}
                </div>
              )}
            </SectionCard>
          </motion.div>

          <motion.div {...fadeUp(0.18)}>
            <SectionCard style={{ height: "100%" }}>
              <SectionHeading icon={Zap} title="Problem Topics" />
              {isL("skills") ? <Pulse h={160} /> :
               !skillsList.length ? <ErrBox msg="No skill data" /> : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {skillsList.map((s, i) => (
                    <div key={i}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "9px 12px", borderRadius: 8,
                        background: `${C.bg2}80`, border: `1px solid ${C.border}`,
                        transition: "border-color 0.2s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = `${C.gold}33`}
                      onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 6, height: 6, borderRadius: 99, background: s.color }} />
                        <span style={{ fontSize: 13, color: C.text }}>{s.tagName}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 11, color: s.color }}>{s.level}</span>
                        <span style={{ fontSize: 11, color: `${C.muted}88` }}>{s.problemsSolved} solved</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>
          </motion.div>
        </div>

        {/* Contest History */}
        <motion.div {...fadeUp(0.2)} style={{ marginBottom: 20 }}>
          <SectionCard>
            <SectionHeading icon={BarChart2} title="Contest Rating History" />
            {isL("history") ? <Pulse h={120} /> :
             !historyArr?.length ? <ErrBox msg="No contest history" /> : (
              <>
                <div style={{ height: 80, display: "flex", alignItems: "flex-end", gap: 3, marginBottom: 16 }}>
                  {historyArr.slice(-24).map((c, i, arr) => {
                    const ratings = arr.map(x => Number(x.rating) || 0);
                    const mn = Math.min(...ratings), mx = Math.max(...ratings);
                    const range = mx - mn || 1;
                    const pct = ((Number(c.rating) - mn) / range) * 100;
                    const isLast = i === arr.length - 1;
                    return (
                      <div key={i}
                        title={`${contestTitle(c)} | Rating: ${Math.round(Number(c.rating))} | Rank: ${c.ranking}`}
                        style={{
                          flex: 1, borderRadius: "3px 3px 0 0",
                          height: `${Math.max(pct, 8)}%`,
                          background: isLast ? C.gold : `rgba(232,169,59,${0.15 + (pct / 100) * 0.65})`,
                          cursor: "pointer", transition: "opacity 0.2s",
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = "0.65"}
                        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                      />
                    );
                  })}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 12 }}>
                  {historyArr.slice(-4).reverse().map((c, i) => (
                    <div key={i} style={{ padding: 12, borderRadius: 10, background: `${C.bg2}80`, border: `1px solid ${C.border}` }}>
                      <div style={{ fontSize: 10, color: `${C.muted}66`, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {contestTitle(c)}
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: C.gold }}>{Math.round(Number(c.rating))}</div>
                      <div style={{ fontSize: 11, color: `${C.muted}88` }}>Rank #{c.ranking}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </SectionCard>
        </motion.div>

        {/* Recent Submissions */}
        <motion.div {...fadeUp(0.22)} style={{ marginBottom: 20 }}>
          <SectionCard>
            <SectionHeading icon={Clock} title="Recent Submissions" />
            {isL("subs") ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {Array(5).fill(0).map((_, i) => <Pulse key={i} h={44} />)}
              </div>
            ) : !submissions?.submission?.length ? <ErrBox msg="No submissions found" /> : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {submissions.submission.map((s, i) => {
                  const status = typeof s.statusDisplay === "string" ? s.statusDisplay : safe(s.statusDisplay);
                  const diff   = typeof s.difficulty   === "string" ? s.difficulty   : safe(s.difficulty);
                  const title  = typeof s.title        === "string" ? s.title        : safe(s.title);
                  const dc     = diffStyle(diff);
                  const ok     = status === "Accepted";
                  return (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "11px 14px", borderRadius: 10,
                        background: `${C.bg2}80`, border: `1px solid ${C.border}`,
                        transition: "border-color 0.2s", cursor: "default",
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = `${C.gold}30`}
                      onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                        <ChevronRight size={14} color={`${C.gold}80`} style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: C.text, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {title}
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, marginLeft: 12 }}>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99, color: dc.color, background: dc.bg }}>{diff}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: ok ? C.green : C.red }}>{status}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </SectionCard>
        </motion.div>

        {/* Badges */}
        {badges?.badges?.length > 0 && (
          <motion.div {...fadeUp(0.24)} style={{ marginBottom: 20 }}>
            <SectionCard>
              <SectionHeading icon={Star} title={`Badges Earned (${badges.badgesCount})`} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {badges.badges.map((b, i) => (
                  <motion.div key={i}
                    whileHover={{ scale: 1.08, y: -3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    title={b.displayName}
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                      padding: 12, borderRadius: 10, background: `${C.bg2}80`,
                      border: `1px solid ${C.border}`, cursor: "pointer", minWidth: 72,
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = `${C.gold}40`}
                    onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
                  >
                    {b.icon ? (
                      <img src={b.icon.startsWith("http") ? b.icon : `https://leetcode.com${b.icon}`} alt={b.displayName}
                        style={{ width: 40, height: 40, objectFit: "contain" }} />
                    ) : <Award size={32} color={C.gold} />}
                    <span style={{ fontSize: 10, color: `${C.muted}88`, textAlign: "center", maxWidth: 72, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {b.displayName}
                    </span>
                  </motion.div>
                ))}
              </div>
            </SectionCard>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div {...fadeUp(0.26)} style={{ textAlign: "center", marginTop: 24 }}>
          <a
            href={`https://leetcode.com/${USERNAME}`} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: C.gold, color: C.bg1, padding: "14px 32px", borderRadius: 99,
              fontSize: 14, fontWeight: 700, textDecoration: "none",
              boxShadow: `0 8px 32px ${C.gold}30`, transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.text; e.currentTarget.style.color = C.bg1; e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.color = C.bg1; e.currentTarget.style.transform = "scale(1)"; }}
          >
            View Full LeetCode Profile <ExternalLink size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}