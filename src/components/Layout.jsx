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
        borderBottom: scrolled ? "2px solid var(--text)" : "2px solid transparent",
        background: scrolled ? "rgba(242,238,225,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }} data-hover>
            <span style={{
              width: 26, height: 26, borderRadius: 6, background: "var(--accent)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 13, color: "var(--bg)",
            }}>M</span>
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 16, color: "var(--text)", letterSpacing: "-0.01em" }}>
              mradul<span style={{ color: "var(--accent2)" }}>.</span>dev
            </span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="desktop-nav">
            {navItems.map(item => (
              <NavLink key={item.to} to={item.to} end={item.to === "/"}
                style={({ isActive }) => ({
                  padding: "8px 14px", borderRadius: 4,
                  fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em",
                  textDecoration: "none",
                  color: isActive ? "var(--text)" : "var(--muted)",
                  borderBottom: isActive ? "2px solid var(--accent2)" : "2px solid transparent",
                  transition: "all 0.2s",
                })}
                data-hover
              >{item.label}</NavLink>
            ))}
            <a href="https://drive.google.com/file/d/1oTJR8BzKcMBEjyKOJOliLON_hH-l-dWR/view?usp=sharing"
              target="_blank" rel="noopener noreferrer" data-hover
              style={{
                padding: "9px 18px", borderRadius: 100, fontSize: 11, fontWeight: 700,
                fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em",
                background: "var(--text)", color: "var(--bg)", textDecoration: "none", marginLeft: 12,
                transition: "background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--accent2)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--text)"}
            >Resume ↗</a>
          </nav>

          {/* Mobile menu toggle */}
          <button onClick={() => setMenuOpen(o => !o)} data-hover
            style={{ background: "var(--bg2)", border: "2px solid var(--text)", borderRadius: 6, padding: "6px 10px", cursor: "pointer", color: "var(--text)", display: "none" }}
            className="mobile-toggle"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div style={{ background: "var(--bg)", borderTop: "2px solid var(--text)", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
            {navItems.map(item => (
              <NavLink key={item.to} to={item.to} end={item.to === "/"}
                onClick={() => setMenuOpen(false)}
                style={({ isActive }) => ({
                  padding: "10px 16px", borderRadius: 6, fontSize: 15,
                  fontFamily: "var(--font-mono)", fontWeight: 600, textDecoration: "none",
                  color: isActive ? "var(--accent2)" : "var(--text)",
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

      <main style={{ position: "relative", zIndex: 1, paddingTop: 68 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}