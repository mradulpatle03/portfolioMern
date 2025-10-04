// DevCommandHeroMinimal.jsx
// React + Tailwind + Framer Motion (JavaScript)
// npm i framer-motion
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {useNavigate} from "react-router-dom";



const commandsSeed = [
  { id: "projects", label: "Open Projects", hint: "View case studies" },
  { id: "about", label: "Who am I?", hint: "Read profile" },
  { id: "about", label: "Tech Stack", hint: "Tools I use" },
  { id: "contact", label: "Contact", hint: "Let’s collaborate" },
  { id: "resume", label: "Download Resume", hint: "PDF resume" },
];

function TerminalLine({ prefix = ">", text }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setShown(text.slice(0, i++));
      if (i > text.length) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [text]);
  return (
    <div className="font-mono text-sm text-slate-300">
      <span className="text-emerald-400">{prefix}</span> {shown}
      <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-slate-300/80 align-middle rounded-[2px]" />
    </div>
  );
}

export default function DevCommandHeroMinimal() {
  const [q, setQ] = useState("");
  const navigate = useNavigate(); 

  const commands = useMemo(() => {
    const qq = q.toLowerCase().trim();
    if (!qq) return commandsSeed;
    return commandsSeed.filter(
      (c) =>
        c.label.toLowerCase().includes(qq) ||
        c.hint.toLowerCase().includes(qq)
    );
  }, [q]);

   const go = (to) => {
    if (to === "resume") return navigate("/resume");
    if (to.startsWith("/")) return navigate(to);
    navigate(`/${to}`);
  };

  const fadeUp = (delay = 0) => ({
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { type: "spring", stiffness: 220, damping: 24, delay },
  });

  return (
    <section className="relative min-h-screen w-full overflow-hidden text-slate-100">
      {/* Static background gradients (no mouse effects) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_10%_10%,rgba(99,102,241,0.18),transparent),radial-gradient(50%_40%_at_90%_20%,rgba(236,72,153,0.16),transparent)]" />
        
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-8 px-6 py-24">

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.05)}
          className="text-center text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl"
        >
          {"<Full-Stack Web Developer\n\nCode. Build. Deploy. />"}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          {...fadeUp(0.1)}
          className="max-w-2xl text-center text-lg text-slate-300/90"
        >
          Fast, reliable, and thoughtfully animated web experiences with modern
          MERN practices and a dev‑tool workflow.
        </motion.p>

        {/* Terminal */}
        <motion.div
          {...fadeUp(0.15)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
        >
          <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full bg-red-400" />
              <span className="size-2 rounded-full bg-yellow-400" />
              <span className="size-2 rounded-full bg-emerald-400" />
            </span>
            <span>dev@portfolio: ~/home</span>
          </div>
          <div className="space-y-1.5">
            <TerminalLine text="hello-world: crafting fast, reliable, animated web experiences" />
            <TerminalLine text="stack: react / node / express / mongodb / javascript / tailwind / framer-motion" />
            <TerminalLine text="current: open to internships and freelance, MERN-focused" />
          </div>
        </motion.div>

        {/* Command Palette */}
        <motion.div
          {...fadeUp(0.2)}
          className="w-full rounded-2xl border border-indigo-400/20 bg-slate-900/70 shadow-[0_0_40px_-10px_rgba(99,102,241,0.4)]"
        >
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
            <span className="rounded-md bg-indigo-500/20 px-2 py-1 text-xs text-indigo-300">
              ⌘K
            </span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Type a command… e.g. projects"
              className="flex-1 bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
            />
          </div>
          <div className="max-h-56 overflow-auto px-2 py-2 no-scrollbar">
            {commands.map((c, i) => (
              <motion.button
                key={c.id}
                onClick={() => go(c.id)}
                whileHover={{ x: 6, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition hover:bg-white/5"
              >
                <span className="text-slate-100">{c.label}</span>
                <span className="text-xs text-slate-400">{c.hint}</span>
              </motion.button>
            ))}
            {!commands.length && (
              <div className="px-3 py-2 text-sm text-slate-500">
                No matches. Try “projects”.
              </div>
            )}
          </div>
        </motion.div>

        {/* Primary CTAs */}
        <motion.div
          {...fadeUp(0.25)}
          className="flex flex-wrap items-center justify-center gap-3 pt-1"
        >
          <motion.a
            href="/projects"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 600, damping: 28 }}
            className="rounded-lg bg-indigo-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-900/30 transition hover:bg-indigo-400"
          >
            Open Projects
          </motion.a>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 600, damping: 28 }}
            className="rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur transition hover:border-indigo-300/60 hover:text-indigo-200"
          >
            Contact
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
