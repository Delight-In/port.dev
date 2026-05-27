import { useState, useEffect } from "react";

const NAV_LINKS = [
  { name: "Work", id: "experience" },
  { name: "About", id: "about" },
  { name: "Skills", id: "education" },
  { name: "Blogs", id: "blogs" },
];

export default function PortfolioLanding({
  isAuthenticated,
  setIsAuthenticated,
  setUser,
}) {

  const [scrolled, setScrolled] =
    useState(false);

  const [visible, setVisible] =
    useState(false);

  // Login modal
  const [showLogin,
    setShowLogin] =
      useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);

    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans">
      
      {/* ── Background image + overlays ── */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('books.png'), linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-slate-900/70 to-black/90" />

        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
          }}
        />

        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      {/* ── Navbar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/60 backdrop-blur-xl border-b border-white/5 shadow-xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <a
            href="#"
            className={`flex items-center gap-3 transition-all duration-700 ${
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-6"
            }`}
          >
            <div className="relative w-9 h-9 flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-violet-500 rounded-lg rotate-45" />
              <div className="absolute inset-[3px] bg-black rounded-md rotate-45" />

              <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                P
              </span>
            </div>

            <span
              className="text-white font-semibold text-lg tracking-wide"
              style={{
                fontFamily: "'Courier New', monospace",
                letterSpacing: "0.08em",
              }}
            >
              priyanka
              <span className="text-cyan-400">.</span>
              dev
            </span>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-white/70 hover:text-white transition-all duration-300 text-sm tracking-wide"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Login Button */}
          {!isAuthenticated ? (
            <button
              onClick={() => setShowLogin(true)}
              className="px-5 py-2 rounded-full bg-white/10 border border-white/10 text-white text-sm hover:bg-white/20 transition-all duration-300 backdrop-blur-md"
            >
              Admin Login
            </button>
          ) : (
            <button
              onClick={() => {
                setIsAuthenticated(false);
                localStorage.removeItem("token");
              }}
              className="px-5 py-2 rounded-full bg-red-500/20 border border-red-400/20 text-red-200 text-sm hover:bg-red-500/30 transition-all duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      {/* ── Login Modal ── */}
      {showLogin && !isAuthenticated && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md px-4">
          
          {/* Close */}
          <button
            onClick={() => setShowLogin(false)}
            className="absolute top-6 right-6 text-white text-2xl"
          >
            ✕
          </button>

          <AdminAuth
            setIsAuthenticated={setIsAuthenticated}
            setUser={setUser}
          />
        </div>
      )}

      {/* ── Hero Section ── */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <h1
          className={`text-5xl sm:text-7xl md:text-8xl font-black text-white leading-none mb-6 transition-all duration-700 delay-300 ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{
            fontFamily: "'Georgia', serif",
            letterSpacing: "-0.03em",
          }}
        >
          Crafting
          <br />

          <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
            Digital
          </span>

          <br />
          Experiences
        </h1>

        <p
          className={`max-w-lg text-white/50 text-base md:text-lg leading-relaxed mb-12 transition-all duration-700 delay-[400ms] ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          Full-stack developer & UI designer building clean, fast, and memorable products that people actually enjoy using.
        </p>
      </main>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}