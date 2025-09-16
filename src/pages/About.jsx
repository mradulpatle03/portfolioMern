import React, { useState, useEffect } from "react";
import {
  Code,
  FolderKanban,
  Lightbulb,
  GraduationCap,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";
import SkillsGrid from "../components/Skills";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: "500+", label: "DSA Problems Solved", icon: Code },
    { number: "9.79", label: "CGPA", icon: GraduationCap },
    { number: "4+", label: "Full-Stack Projects", icon: FolderKanban },
  ];

  const highlights = [
    {
      icon: Code,
      title: "Full-Stack Development",
      description:
        "Specialized in MERN stack with 4+ production-ready projects. Built scalable apps, real-time systems & modern UIs.",
    },
    {
      icon: Lightbulb,
      title: "Problem Solving",
      description:
        "Solved 500+ DSA problems with strong algorithmic thinking, applied in real-world backend optimizations.",
    },
  ];

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-12 text-[#E8EDDF]">
      <div className="max-w-6xl mx-auto">
        
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#F5CB5C] mb-4">
            Mradul Patle
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#CFDBD5]/80 max-w-3xl mx-auto leading-relaxed">
            Full-Stack Developer & Problem Solver passionate about creating{" "}
            <span className="text-[#F5CB5C]">scalable products</span> and{" "}
            <span className="text-[#F5CB5C]">innovative solutions</span>.
          </p>

          
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {[
              {
                icon: Mail,
                href: "mailto:mradulwork1316@gmail.com",
                label: "Email",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/mradul-patle-5207b52a7/",
                label: "LinkedIn",
              },
              {
                icon: Github,
                href: "https://github.com/mradulpatle03",
                label: "GitHub",
              },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-[#E8EDDF]/10 hover:bg-[#F5CB5C]/20 text-[#E8EDDF] hover:text-[#F5CB5C] transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                <link.icon size={18} />
                <span className="hidden sm:inline">{link.label}</span>
              </a>
            ))}
          </div>
        </div>

      
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="p-4 sm:p-6 rounded-xl bg-[#1a1a1a]/70 border border-[#CFDBD5]/20 text-center 
                hover:border-[#F5CB5C]/40 hover:shadow-[0_0_20px_#F5CB5C]/20
                transition-all duration-300 hover:scale-105"
              >
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-[#F5CB5C]" />
                <div className="text-2xl sm:text-3xl font-bold text-[#E8EDDF]">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-[#CFDBD5]">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

       
        <div
          className={`bg-[#111111]/60 border border-[#CFDBD5]/20 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mb-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F5CB5C] mb-4 sm:mb-6">
            About Me
          </h2>
          <div className="text-[#E8EDDF]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              I'm a Computer Science student at{" "}
              <span className="text-[#F5CB5C] font-semibold">IIIT Bhopal</span>{" "}
              with a <span className="text-[#F5CB5C]">9.79 CGPA</span>. Alongside
              academics, I’ve solved{" "}
              <span className="text-[#F5CB5C] font-semibold">500+ DSA problems</span>{" "}
              and built{" "}
              <span className="text-[#F5CB5C] font-semibold">
                scalable full-stack projects
              </span>
              .
            </p>
            <p>
              I recently completed a{" "}
              <span className="text-[#F5CB5C] font-semibold">
                4-month internship as a Tech Team Member at Explified
              </span>
              , contributing to the development of innovative web solutions using
              the MERN stack.
            </p>
            <p>
              I’m passionate about building impactful products, constantly
              learning new technologies, and applying problem-solving skills to
              real-world challenges.
            </p>
          </div>
        </div>

        
        <div
          className={`grid sm:grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <div
                key={i}
                onMouseEnter={() => setActiveCard(i)}
                onMouseLeave={() => setActiveCard(null)}
                className={`p-5 sm:p-6 rounded-xl bg-[#1a1a1a]/60 border border-[#CFDBD5]/20 backdrop-blur-sm
                hover:border-[#F5CB5C]/40 hover:shadow-[0_0_20px_#F5CB5C]/20 
                transition-all duration-500 hover:scale-105 cursor-pointer ${
                  activeCard === i ? "ring-2 ring-[#F5CB5C]" : ""
                }`}
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F5CB5C]/10 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#F5CB5C]" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold text-[#E8EDDF]">
                    {h.title}
                  </h4>
                </div>
                <p className="text-[#CFDBD5] text-sm sm:text-base leading-relaxed">
                  {h.description}
                </p>
                
              </div>
            );
          })}
        </div>

        <SkillsGrid />

        
        <div
          className={`text-center mt-12 sm:mt-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Link
            to={"/contact"}
            className="inline-flex items-center space-x-3 sm:space-x-4 bg-[#F5CB5C] text-[#111111] px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-[#E8EDDF] hover:scale-105 transition-all duration-300 text-sm sm:text-base font-semibold"
          >
            <span>Let's Build Something Amazing Together</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
