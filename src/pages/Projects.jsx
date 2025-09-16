// src/components/Projects.jsx
import React, { useState } from "react";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    name: "Shopkey",
    tech: [
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "JWT",
      "Tailwind",
      "Stripe API",
    ],
    description:
      "A full-stack e-commerce platform with authentication, product management, and secure checkout. Features search, filter, and pagination.",
    link: "https://shopkey-432.vercel.app",
  },
  {
    name: "Blogg",
    tech: ["MERN", "Cloudinary", "Redux Toolkit"],
    description:
      "A blogging platform with authentication, CRUD blogs, rich text editing, image upload, and category filtering. Supports 300+ blog posts.",
    link: "https://blogg-frontend-8jz9.vercel.app",
  },
  {
    name: "Social App",
    tech: ["MongoDB", "Express.js", "Next.js", "Node.js", "JWT", "Tailwind"],
    description:
      "A real-time social network with posts, likes, comments, chat, follow system, notifications, and profiles. Designed for scale.",
    link: "https://new-social-frontend-1zg1.vercel.app",
  },
  {
    name: "Chattt",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Zustand", "Socket.IO"],
    description:
      "A real-time chat app supporting 1-on-1 messaging with online/offline presence and <200ms latency. Optimized with Zustand.",
    link: "https://fullstack-chatapp-e8lf.onrender.com",
  },
];

const Projects = () => {
  const [active, setActive] = useState(null);

  return (
    <section className="py-16 px-6 sm:px-12 lg:px-20 text-[#E8EDDF]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#F5CB5C] mb-12 text-center">
          Projects
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div
              key={i}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className={`relative p-6 rounded-2xl bg-[#1a1a1a]/70 border border-[#CFDBD5]/20 
              backdrop-blur-sm transition-all duration-500 hover:scale-105 
              hover:border-[#F5CB5C]/40 hover:shadow-[0_0_25px_#F5CB5C]/30 cursor-pointer`}
            >
              <h3 className="text-xl font-semibold text-[#E8EDDF] mb-3 flex items-center justify-between">
                {project.name}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="z-10 text-[#F5CB5C] hover:text-[#E8EDDF] transition-colors"
                >
                  <ExternalLink size={18} />
                </a>
              </h3>

              <p className="text-sm text-[#CFDBD5] mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs rounded-full bg-[#F5CB5C]/10 text-[#F5CB5C] border border-[#F5CB5C]/30"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F5CB5C]/5 to-transparent opacity-0 transition-opacity duration-500 ${
                  active === i ? "opacity-100" : ""
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
