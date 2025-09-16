// src/components/SkillsGrid.jsx
import React from "react";

const allSkills = [
  { name: "C/C++", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg" },
  
  { name: "HTML5", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" },
  { name: "Python", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
  
  { name: "React", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" },
  { name: "Redux", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" },
  { name: "Zustand", icon: "https://avatars.githubusercontent.com/u/40601819?s=200&v=4" },
  { name: "Tailwind CSS", icon: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" },
  { name: "Bootstrap", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg" },
  { name: "Next.js", icon: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg" },
  { name: "MongoDB", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg" },
  { name: "Node.js", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" },
  { name: "Express.js", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" },
  { name: "GitHub", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg" },
  { name: "Postman", icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
  { name: "VS Code", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg" },
];

const extraSkills = [
  "NumPy",
  "Pandas",
  "Matplotlib",
  "Mongoose",
  "RESTful APIs",
  "Git",
  "Render",
  "Vercel",
];

const SkillsGrid = () => {
  return (
    <section className="mt-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-[#F5CB5C] text-center mb-14">
        Skills & Technologies
      </h2>

      {/* Main Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {allSkills.map((skill, idx) => (
          <div
            key={idx}
            className="relative h-28 sm:h-32 rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
          >
            {/* Background Icon */}
            <img
              src={skill.icon}
              alt={skill.name}
              className="absolute inset-0 w-full h-full object-contain p-6 opacity-80 group-hover:scale-110 transition-transform duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <span className="text-[#F5CB5C] font-semibold text-sm sm:text-base drop-shadow-lg">
                {skill.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Extra Skills (as text tags) */}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {extraSkills.map((skill, i) => (
          <span
            key={i}
            className="px-4 py-2 text-xs sm:text-sm rounded-full  border border-[#CFDBD5]/20 text-[#dae8e1] hover:bg-[#F5CB5C]/20 hover:text-[#F5CB5C] transition-all duration-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default SkillsGrid;
