import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const iv = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    emailjs.sendForm("your_service_id", "your_template_id", formRef.current, "your_public_key")
      .then(() => { setStatus("success"); setLoading(false); formRef.current.reset(); })
      .catch(() => { setStatus("error"); setLoading(false); });
  };

  const inputStyle = {
    width: "100%", background: "var(--surface)", border: "1px solid var(--border)",
    borderRadius: 8, padding: "12px 16px", color: "var(--text)",
    fontFamily: "var(--font-sans)", fontSize: 14, outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{ padding: "60px 24px 100px", maxWidth: 1000, margin: "0 auto" }}>
      <motion.div {...iv(0)} style={{ marginBottom: 64 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", marginBottom: 12 }}>// get in touch</p>
        <h1 style={{ fontSize: "clamp(40px,7vw,80px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 16 }}>
          Let's talk.
        </h1>
        <p style={{ fontSize: 17, color: "var(--muted)", maxWidth: 500 }}>
          Open to internships, freelance projects, and collaborations. Drop a message and I'll get back within 24 hours.
        </p>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }} className="contact-grid">
        {/* Form */}
        <motion.div {...iv(0.1)}>
          <form ref={formRef} onSubmit={sendEmail} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: 8 }}>name</label>
              <input type="text" name="from_name" required placeholder="Your name" style={inputStyle}
                onFocus={e => e.target.style.borderColor = "var(--accent)"}
                onBlur={e => e.target.style.borderColor = "var(--border)"} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: 8 }}>email</label>
              <input type="email" name="from_email" required placeholder="you@example.com" style={inputStyle}
                onFocus={e => e.target.style.borderColor = "var(--accent)"}
                onBlur={e => e.target.style.borderColor = "var(--border)"} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: 8 }}>message</label>
              <textarea name="message" required rows={5} placeholder="What's on your mind?" style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
                onFocus={e => e.target.style.borderColor = "var(--accent)"}
                onBlur={e => e.target.style.borderColor = "var(--border)"} />
            </div>
            <motion.button type="submit" disabled={loading} data-hover
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              style={{
                padding: "14px 28px", borderRadius: 8, border: "none",
                background: loading ? "rgba(232,255,71,0.5)" : "var(--accent)",
                color: "#0a0a0a", fontFamily: "var(--font-sans)", fontSize: 14,
                fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}>
              {loading ? "Sending..." : "Send message →"}
            </motion.button>
            {status === "success" && <p style={{ fontSize: 13, color: "#4ade80", fontFamily: "var(--font-mono)" }}>✓ Message sent!</p>}
            {status === "error" && <p style={{ fontSize: 13, color: "#f87171", fontFamily: "var(--font-mono)" }}>✗ Something went wrong. Try again.</p>}
          </form>
        </motion.div>

        {/* Contact info */}
        <motion.div {...iv(0.2)} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: 8 }}>// direct channels</p>
          {[
            { label: "Email", value: "mradulwork1316@gmail.com", href: "mailto:mradulwork1316@gmail.com" },
            { label: "Phone", value: "+91 62648 28235", href: "tel:+916264828235" },
            { label: "LinkedIn", value: "mradul-patle-5207b52a7", href: "https://www.linkedin.com/in/mradul-patle-5207b52a7/" },
            { label: "GitHub", value: "mradulpatle03", href: "https://github.com/mradulpatle03" },
          ].map((c, i) => (
            <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" data-hover
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "16px 20px", borderRadius: 10,
                border: "1px solid var(--border)", background: "var(--surface)",
                textDecoration: "none", transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.background = "#1a1a1a"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--surface)"; }}
            >
              <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--muted)" }}>{c.label}</span>
              <span style={{ fontSize: 13, color: "var(--text)" }}>{c.value} ↗</span>
            </a>
          ))}

          {/* Availability badge */}
          <div style={{ marginTop: 16, padding: "16px 20px", borderRadius: 10, border: "1px solid rgba(232,255,71,0.15)", background: "rgba(232,255,71,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 8px var(--accent)", animation: "glow-pulse 2s infinite", flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "var(--text)", fontWeight: 600 }}>Currently available</span>
            </div>
            <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 6, fontFamily: "var(--font-mono)" }}>for internships & freelance work</p>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        input::placeholder, textarea::placeholder { color: var(--muted); opacity: 0.6; }
      `}</style>
    </div>
  );
}