import { Github, Linkedin, Twitter, Mail } from "lucide-react"; // npm install lucide-react

export default function Footer() {
  const socials = [
    { name: "GitHub", href: "https://github.com/mradulpatle03", Icon: Github },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/mradul-patle-5207b52a7/",
      Icon: Linkedin,
    },
    { name: "Twitter", href: "", Icon: Twitter },
    { name: "Email", href: "mailto:mradulwork1316@gmail.com", Icon: Mail },
  ];

  return (
    <footer className="relative z-10 mt-24 border-t border-[#CFDBD5]/20 bg-gradient-to-b from-[#1a1a1a]/80 to-[#111111]/90 backdrop-blur-md overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F5CB5C]/5 to-transparent animate-[shine_8s_linear_infinite]" />

      <style>{`
        @keyframes shine {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 py-16 text-center text-[#CFDBD5] relative">
        
        <h3 className="text-3xl sm:text-4xl font-extrabold text-[#F5CB5C] mb-6 tracking-wide animate-pulse">
          Let’s Create Something Amazing Together
        </h3>

        
        <p className="text-[#E8EDDF]/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Ready to bring your ideas to life? I’m always excited to collaborate
          with creative minds and build remarkable experiences.
        </p>

       
        <div className="flex justify-center flex-wrap gap-6 mb-10">
          {socials.map(({ name, href, Icon }, i) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-4 rounded-full bg-[#E8EDDF]/5 
                         hover:bg-[#F5CB5C]/20 text-[#CFDBD5]
                         transition-all duration-300 ease-out hover:scale-125
                         focus:outline-none focus:ring-2 focus:ring-[#F5CB5C]/40"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="sr-only">{name}</span>
              <Icon
                className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12 group-hover:text-[#F5CB5C]"
                strokeWidth={1.8}
              />
              
              <span className="absolute inset-0 rounded-full border border-[#F5CB5C]/0 group-hover:border-[#F5CB5C]/40 group-hover:scale-150 transition-all duration-500" />
            </a>
          ))}
        </div>

       
        <div className="mx-auto w-24 border-t border-[#CFDBD5]/30 mb-6" />

        
        <div className="text-xs text-[#E8EDDF]/60 font-mono tracking-wider">
          © {new Date().getFullYear()} &lt;MyPortfolio /&gt; — Crafted with ❤️
          and ☕
        </div>
      </div>
    </footer>
  );
}
