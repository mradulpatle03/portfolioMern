import { useState, useEffect } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import Footer from "./Footer";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
  { to: "/leetcode", label: "LeetCode" },
];

export default function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <div className="mesh-bg" />

      {/* NAV */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        background: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ fontFamily: "var(--font-mono)", fontSize: 16, color: "var(--text)", textDecoration: "none", letterSpacing: "0.05em" }} data-hover>
            <span style={{ color: "var(--accent)" }}>&lt;</span>mradul<span style={{ color: "var(--accent)" }}>/&gt;</span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", gap: 4 }} className="desktop-nav">
            {navItems.map(item => (
              <NavLink key={item.to} to={item.to} end={item.to === "/"}
                style={({ isActive }) => ({
                  padding: "6px 16px", borderRadius: 6,
                  fontSize: 13, fontWeight: 500, textDecoration: "none",
                  color: isActive ? "var(--accent)" : "var(--muted)",
                  background: isActive ? "rgba(232,255,71,0.06)" : "transparent",
                  transition: "all 0.2s",
                })}
                data-hover
              >{item.label}</NavLink>
            ))}
            <a href="https://drive.google.com/file/d/1oTJR8BzKcMBEjyKOJOliLON_hH-l-dWR/view?usp=sharing"
              target="_blank" rel="noopener noreferrer" data-hover
              style={{
                padding: "6px 16px", borderRadius: 6, fontSize: 13, fontWeight: 600,
                background: "var(--accent)", color: "#0a0a0a", textDecoration: "none", marginLeft: 8,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => e.target.style.opacity = 0.85}
              onMouseLeave={e => e.target.style.opacity = 1}
            >Resume ↗</a>
          </nav>

          {/* Mobile menu toggle */}
          <button onClick={() => setMenuOpen(o => !o)} data-hover
            style={{ background: "none", border: "1px solid var(--border)", borderRadius: 6, padding: "6px 10px", cursor: "pointer", color: "var(--text)", display: "none" }}
            className="mobile-toggle"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div style={{ background: "rgba(10,10,10,0.95)", borderTop: "1px solid var(--border)", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
            {navItems.map(item => (
              <NavLink key={item.to} to={item.to} end={item.to === "/"}
                onClick={() => setMenuOpen(false)}
                style={({ isActive }) => ({
                  padding: "10px 16px", borderRadius: 6, fontSize: 15,
                  fontWeight: 500, textDecoration: "none",
                  color: isActive ? "var(--accent)" : "var(--text)",
                })}
              >{item.label}</NavLink>
            ))}
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>

      <main style={{ position: "relative", zIndex: 1, paddingTop: 64 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}