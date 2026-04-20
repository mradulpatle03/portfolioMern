import { motion } from "framer-motion";

const skills = [
  { name: "C/C++", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg" },
  { name: "JavaScript", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" },
  { name: "Python", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
  { name: "React", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg" },
  { name: "Node.js", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" },
  { name: "Express.js", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" },
  { name: "MongoDB", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg" },
  { name: "Redux", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" },
  { name: "Tailwind", icon: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" },
  { name: "GitHub", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg" },
  { name: "Docker", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" },
  { name: "VS Code", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg" },
  { name: "Postman", icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
];

const extras = ["Socket.IO", "JWT", "REST APIs", "Zustand", "Mongoose", "Git", "Vercel", "Render", "NumPy", "Pandas"];

export default function SkillsGrid() {
  return (
    <div>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", marginBottom: 24 }}>// skills & tools</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))", gap: 10, marginBottom: 20 }}>
        {skills.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.03 }}
            whileHover={{ y: -3, borderColor: "rgba(232,255,71,0.3)" }}
            style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 12, padding: "16px 8px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
              cursor: "default",
            }}>
            <img src={s.icon} alt={s.name} style={{ width: 28, height: 28, objectFit: "contain", filter: s.name === "Express.js" || s.name === "Next.js" || s.name === "GitHub" ? "invert(1)" : "none", opacity: 0.85 }} loading="lazy" />
            <span style={{ fontSize: 10, color: "var(--muted)", fontFamily: "var(--font-mono)", textAlign: "center", lineHeight: 1.2 }}>{s.name}</span>
          </motion.div>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {extras.map((s, i) => (
          <span key={i} className="tag">{s}</span>
        ))}
      </div>
    </div>
  );
}