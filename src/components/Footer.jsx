import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "32px 24px",
      position: "relative", zIndex: 1,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <Link to="/" style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--muted)", textDecoration: "none" }}>
          <span style={{ color: "var(--accent)" }}>&lt;</span>mradul<span style={{ color: "var(--accent)" }}>/&gt;</span>
        </Link>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {[
            { label: "GitHub", href: "https://github.com/mradulpatle03" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/mradul-patle-5207b52a7/" },
            { label: "Email", href: "mailto:mradulwork1316@gmail.com" },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" data-hover
              style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "var(--accent)"}
              onMouseLeave={e => e.target.style.color = "var(--muted)"}
            >{s.label}</a>
          ))}
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>© {year} Mradul Patle</span>
      </div>
    </footer>
  );
}