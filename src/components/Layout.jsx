// src/components/Layout.jsx
import { useState, useEffect } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import Footer from "./Footer";

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#242423] to-[#111111] relative overflow-hidden text-[#E8EDDF]">
      <style>{`
    @keyframes beamMove {
      0%   { transform: translateX(-100%) rotate(45deg); }
      100% { transform: translateX(100%)  rotate(45deg); }
    }
    @keyframes floatUp {
      0%   { transform: translateY(100vh) scale(0.6); opacity: 0; }
      40%  { opacity: 0.9; }
      100% { transform: translateY(-10vh) scale(1.1); opacity: 0; }
    }
  `}</style>

      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`beam-${i}`}
            className="absolute top-0 h-[200%] w-[8rem] bg-gradient-to-b from-[#F5CB5C]/0 via-[#F5CB5C]/10 to-[#F5CB5C]/0 blur-3xl"
            style={{
              left: `${i * 15}%`,
              animation: `beamMove ${18 + i * 4}s linear infinite`,
              animationDelay: `${i * 3}s`,
            }}
          />
        ))}

        {Array.from({ length: 40 }).map((_, i) => {
          const duration = 8 + Math.random() * 8;
          const negativeDelay = -(Math.random() * duration);
          return (
            <div
              key={`particle-${i}`}
              className="absolute w-[4px] h-[4px] rounded-full bg-[#CFDBD5] drop-shadow-[0_0_6px_#CFDBD5]"
              style={{
                left: `${Math.random() * 100}%`,
                animation: `floatUp ${duration}s linear infinite`,
                animationDelay: `${negativeDelay}s`,
              }}
            />
          );
        })}
      </div>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? " backdrop-blur-md shadow-xl" : "bg-transparent"
        }`}
      >
        {isScrolled && <div className="absolute bottom-0 left-0 right-0" />}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300
              ${isScrolled ? "h-14" : "h-16"} md:h-20`}
          >
            <Link
              to="/"
              className="taglogo group relative inline-flex items-baseline gap-2 text-2xl font-extrabold tracking-wide text-[#F5CB5C] transition-transform hover:scale-[1.06] focus-visible:scale-[1.03] outline-none"
              aria-label="Mradul — Developer Portfolio"
            >
              {/* Render exactly: <Mradul /> */}
              <span className="font-mono text-white/90">&lt;</span>
              <span className="relative inline-flex items-baseline font-mono leading-none">
                <span className="taglogo__text text-white">Mradul</span>
                <span
                  aria-hidden
                  className="taglogo__caret ml-1 inline-block h-[1em] w-[0.08em] align-[-0.12em] bg-white/85"
                />
              </span>
              <span className="font-mono text-white/90">/&gt;</span>

              {/* underline (draws on hover/focus) */}
              <span
                aria-hidden
                className="taglogo__underline pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full"
              />
            </Link>

            <style>{`
/* Typography and smoothing */
.taglogo { text-rendering: geometricPrecision; -webkit-font-smoothing: antialiased; }

/* Animated underline via background-size for performance */
.taglogo__underline {
  background: linear-gradient(90deg, #F5CB5C 0%, rgba(245,203,92,0.85) 60%, rgba(245,203,92,0) 100%) left bottom / 0% 2px no-repeat;
  transition: background-size 420ms ease;
  border-radius: 2px;
}
.taglogo:hover .taglogo__underline,
.taglogo:focus-visible .taglogo__underline {
  background-size: 100% 2px;
}

/* Neon glow scan on the text when active */
@keyframes tag-neon {
  0%, 100% { filter: none; }
  45% { filter: brightness(1.04) contrast(1.04) drop-shadow(0 0 6px rgba(245,203,92,0.35)); }
  60% { filter: brightness(0.99) contrast(1); }
}
.taglogo:hover .taglogo__text,
.taglogo:focus-visible .taglogo__text {
  animation: tag-neon 600ms linear 1;
  text-shadow:
    1px 0 rgba(34,211,238,0.35),
   -1px 0 rgba(236,72,153,0.35);
}

/* Caret blink */
@keyframes caret-blink {
  0%, 45% { opacity: 1; }
  50%, 95% { opacity: 0; }
  100% { opacity: 1; }
}
.taglogo__caret { animation: caret-blink 1.15s steps(1, end) infinite; }

/* Reduced motion: disable animations and effects */
@media (prefers-reduced-motion: reduce) {
  .taglogo, .taglogo__caret, .taglogo__text { animation: none !important; transition: none !important; text-shadow: none !important; }
}
`}</style>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `relative nav-hover px-4 py-2 text-sm font-medium transition-colors duration-300 group ${
                      isActive
                        ? "text-[#F5CB5C]"
                        : "text-[#CFDBD5] hover:text-[#E8EDDF]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span
                        className={`absolute left-0 bottom-0 h-[2px] w-full bg-[#F5CB5C] origin-left transition-transform duration-300 ${
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}

              <button className="ml-4 px-6 py-2 rounded-full font-medium text-[#111111] bg-[#F5CB5C] transition-all duration-300 hover:bg-[#E8EDDF] hover:scale-105 hover:shadow-[0_0_15px_#F5CB5C]/40">
                Hire Me
              </button>
            </nav>

            <button
              onClick={() => setIsMobileMenuOpen((s) => !s)}
              className="md:hidden px-4 py-2 text-[#E8EDDF] hover:text-[#F5CB5C] transition-transform duration-300"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 transform transition-transform duration-300 ${
                  isMobileMenuOpen ? "rotate-90" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`md:hidden origin-top transform transition-all duration-500 ease-in-out 
    ${
      isMobileMenuOpen
        ? "scale-y-100 opacity-100 backdrop-blur-md"
        : "scale-y-0 opacity-0 backdrop-blur-0 h-3"
    }
    `}
        >
          <div className="px-6 py-6 space-y-5">
            {navItems.map((item, idx) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 text-base font-medium rounded-md transition-colors duration-300
           ${
             isActive
               ? "bg-[#F5CB5C]/20 text-[#F5CB5C]"
               : "text-[#CFDBD5] hover:text-[#E8EDDF] hover:bg-[#E8EDDF]/5"
           }
           ${
             isMobileMenuOpen ? `animate-fadeSlide delay-[${idx * 100}ms]` : ""
           }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <button
              className="w-full mt-4 px-6 py-2 rounded-full font-medium text-[#111111]
                 bg-[#F5CB5C] transition-all duration-300 hover:bg-[#E8EDDF]
                 hover:scale-105 active:scale-95"
            >
              Hire Me
            </button>
          </div>

          <style>{`
    @keyframes fadeSlide {
      0% { opacity: 0; transform: translateY(-10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeSlide {
      animation: fadeSlide 0.4s ease forwards;
    }
  `}</style>
        </div>
      </header>

      <main className="relative z-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
