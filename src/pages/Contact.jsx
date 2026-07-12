import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const iv = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

const channels = [
  { label: "email", value: "mradulwork1316@gmail.com", href: "mailto:mradulwork1316@gmail.com" },
  { label: "phone", value: "+91 62648 28235", href: "tel:+916264828235" },
  { label: "linkedin", value: "mradul-patle-5207b52a7", href: "https://www.linkedin.com/in/mradul-patle-5207b52a7/" },
  { label: "github", value: "mradulpatle03", href: "https://github.com/mradulpatle03" },
];

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
    fontFamily: "var(--font-mono)", fontSize: 13.5, outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{ padding: "60px 24px 100px", maxWidth: 1000, margin: "0 auto" }}>
      <motion.div {...iv(0)} style={{ marginBottom: 48 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", marginBottom: 12 }}>// get in touch</p>
        <h1 style={{ fontSize: "clamp(40px,7vw,80px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 16 }}>
          Let's talk.
        </h1>
        <p style={{ fontSize: 17, color: "var(--muted)", maxWidth: 500 }}>
          Open to internships, freelance projects, and collaborations. Drop a message and I'll get back within 24 hours.
        </p>
      </motion.div>

      {/* Editor window */}
      <motion.div {...iv(0.08)} style={{
        border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden",
        background: "var(--surface)", boxShadow: "0 12px 40px rgba(20,26,43,0.06)",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "10px 14px", borderBottom: "1px solid var(--border)", background: "var(--bg2)",
        }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#E85A4F" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#E8A93B" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#2B4EE6" }} />
          <span style={{ marginLeft: 10, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)" }}>
            mradul-patle — send_message.js
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 0 }} className="contact-grid">
          {/* Form as "code" */}
          <div style={{ padding: "26px 26px 30px", borderRight: "1px solid var(--border)" }} className="contact-form-col">
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--muted)", marginBottom: 18 }}>
              <span style={{ color: "#a78bfa" }}>function</span>{" "}
              <span style={{ color: "var(--accent)" }}>sendMessage</span>
              <span style={{ color: "var(--text)" }}>(payload) {"{"}</span>
            </div>

            <form ref={formRef} onSubmit={sendEmail} style={{ display: "flex", flexDirection: "column", gap: 14, paddingLeft: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--accent2)", marginBottom: 6 }}>from_name:</label>
                <input type="text" name="from_name" required placeholder="'Your name'" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "var(--accent)"}
                  onBlur={e => e.target.style.borderColor = "var(--border)"} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--accent2)", marginBottom: 6 }}>from_email:</label>
                <input type="email" name="from_email" required placeholder="'you@example.com'" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "var(--accent)"}
                  onBlur={e => e.target.style.borderColor = "var(--border)"} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--accent2)", marginBottom: 6 }}>message:</label>
                <textarea name="message" required rows={5} placeholder="`What's on your mind?`" style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
                  onFocus={e => e.target.style.borderColor = "var(--accent)"}
                  onBlur={e => e.target.style.borderColor = "var(--border)"} />
              </div>

              <motion.button type="submit" disabled={loading} data-hover
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                style={{
                  padding: "13px 26px", borderRadius: 8, border: "none", marginTop: 4,
                  background: loading ? "rgba(43,78,230,0.5)" : "var(--accent)",
                  color: "var(--bg)", fontFamily: "var(--font-mono)", fontSize: 13,
                  fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}>
                {loading ? "sending()..." : "return submit();"}
              </motion.button>

              {status === "success" && (
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "#2f9e63", background: "rgba(47,158,99,0.08)", border: "1px solid rgba(47,158,99,0.2)", borderRadius: 6, padding: "8px 12px" }}>
                  ✓ 200 OK — message sent successfully
                </div>
              )}
              {status === "error" && (
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "#d1453d", background: "rgba(209,69,61,0.08)", border: "1px solid rgba(209,69,61,0.2)", borderRadius: 6, padding: "8px 12px" }}>
                  ✗ 500 — something went wrong, try again
                </div>
              )}
            </form>

            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--text)", marginTop: 18 }}>{"}"}</div>
          </div>

          {/* Contact channels as a config/env panel */}
          <div style={{ padding: "26px 22px 30px", background: "var(--bg2)" }}>
            <p style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              .env — direct channels
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {channels.map((c, i) => (
                <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" data-hover
                  style={{
                    display: "flex", flexDirection: "column", gap: 3,
                    padding: "12px 14px", borderRadius: 8,
                    border: "1px solid var(--border)", background: "var(--surface)",
                    textDecoration: "none", transition: "border-color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; }}
                >
                  <span style={{ fontSize: 10.5, fontFamily: "var(--font-mono)", color: "var(--accent2)" }}>{c.label.toUpperCase()}</span>
                  <span style={{ fontSize: 12.5, fontFamily: "var(--font-mono)", color: "var(--text)", wordBreak: "break-all" }}>{c.value}</span>
                </a>
              ))}
            </div>

            <div style={{ marginTop: 18, padding: "14px 16px", borderRadius: 8, border: "1px solid rgba(47,158,99,0.25)", background: "rgba(47,158,99,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12.5, fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--text)" }}>status: available</span>
              </div>
              <p style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 6, fontFamily: "var(--font-mono)" }}>for internships & full-time opportunities</p>
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 720px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .contact-form-col { border-right: none !important; border-bottom: 1px solid var(--border); }
        }
        input::placeholder, textarea::placeholder { color: var(--muted); opacity: 0.55; font-style: italic; }
      `}</style>
    </div>
  );
}