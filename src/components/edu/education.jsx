import { useState, useEffect, useRef } from "react";

const EDUCATION = [
  {
    id: 1,
    degree: "B.Tech in Computer Science",
    institution: "Dr. A.P.J. Abdul Kalam Technical University",
    short: "AKTU",
    year: "2020 – 2024",
    grade: "8.4 CGPA",
    location: "Uttar Pradesh, India",
    icon: "🎓",
    accent: "cyan",
    tags: ["Data Structures", "OS", "DBMS", "Web Dev", "Machine Learning"],
    desc:
      "Completed a four-year undergraduate programme with focus on software engineering, algorithms, and full-stack development. Active member of the coding club and led two capstone projects.",
  },
  {
    id: 2,
    degree: "Intermediate (PCM + CS)",
    institution: "Central Board of Secondary Education",
    short: "CBSE — Class XII",
    year: "2019 – 2020",
    grade: "87.4%",
    location: "Ghaziabad, India",
    icon: "📐",
    accent: "violet",
    tags: ["Physics", "Chemistry", "Mathematics", "Computer Sc."],
    desc:
      "Specialised in Physics, Chemistry, Mathematics, and Computer Science. Secured distinction; represented school at regional mathematics olympiad.",
  },
  {
    id: 3,
    degree: "High School",
    institution: "Central Board of Secondary Education",
    short: "CBSE — Class X",
    year: "2017 – 2018",
    grade: "91%",
    location: "Ghaziabad, India",
    icon: "📚",
    accent: "pink",
    tags: ["Science", "Mathematics", "Social Studies", "English"],
    desc:
      "Graduated with distinction. Won first prize in the inter-school science exhibition and served as class monitor for two consecutive years.",
  },
];

const CERTS = [
  { name: "Full-Stack Web Development", issuer: "The Odin Project", year: "2023" },
  { name: "React — The Complete Guide", issuer: "Udemy / Maximilian", year: "2023" },
  { name: "Machine Learning Specialisation", issuer: "Coursera / Andrew Ng", year: "2024" },
  { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", year: "2024" },
];

const ACCENT = {
  cyan: {
    border: "border-cyan-400/30",
    glow: "shadow-[0_0_30px_rgba(34,211,238,0.08)]",
    badge: "bg-cyan-400/10 text-cyan-300 border-cyan-400/20",
    dot: "bg-cyan-400",
    line: "from-cyan-400",
    icon: "from-cyan-400/20 to-cyan-400/5",
    grade: "text-cyan-400",
    ring: "ring-cyan-400/20",
  },
  violet: {
    border: "border-violet-400/30",
    glow: "shadow-[0_0_30px_rgba(167,139,250,0.08)]",
    badge: "bg-violet-400/10 text-violet-300 border-violet-400/20",
    dot: "bg-violet-400",
    line: "from-violet-400",
    icon: "from-violet-400/20 to-violet-400/5",
    grade: "text-violet-400",
    ring: "ring-violet-400/20",
  },
  pink: {
    border: "border-pink-400/30",
    glow: "shadow-[0_0_30px_rgba(244,114,182,0.08)]",
    badge: "bg-pink-400/10 text-pink-300 border-pink-400/20",
    dot: "bg-pink-400",
    line: "from-pink-400",
    icon: "from-pink-400/20 to-pink-400/5",
    grade: "text-pink-400",
    ring: "ring-pink-400/20",
  },
};

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function EducationCard({ item, index }) {
  const a = ACCENT[item.accent];
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Timeline dot */}
      <div className="absolute -left-[41px] top-7 hidden md:flex items-center justify-center">
        <div className={`w-4 h-4 rounded-full ${a.dot} ring-4 ${a.ring} ring-offset-2 ring-offset-black`} />
      </div>

      {/* Card */}
      <div
        className={`relative rounded-2xl border ${a.border} bg-white/[0.03] backdrop-blur-sm ${a.glow} hover:bg-white/[0.06] transition-all duration-300 overflow-hidden p-6 md:p-7`}
      >
        {/* Subtle corner gradient */}
        <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${a.icon} rounded-full blur-3xl pointer-events-none`} />

        <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-5">
          {/* Icon circle */}
          <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${a.icon} border ${a.border} flex items-center justify-center text-2xl`}>
            {item.icon}
          </div>

          <div className="flex-1 min-w-0">
            {/* Top row */}
            <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
              <h3 className="text-white font-semibold text-lg leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
                {item.degree}
              </h3>
              <span className={`text-sm font-bold font-mono ${a.grade}`}>{item.grade}</span>
            </div>

            {/* Institution */}
            <p className="text-white/50 text-sm mb-1">{item.institution}</p>

            {/* Year + Location */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/35 mb-4">
              <span>🗓 {item.year}</span>
              <span>📍 {item.location}</span>
            </div>

            {/* Description */}
            <p className="text-white/55 text-sm leading-relaxed mb-4">{item.desc}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <span
                  key={t}
                  className={`px-2.5 py-0.5 text-xs rounded-full border ${a.badge}`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CertCard({ cert, index }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300 px-5 py-4 ${
        inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
      }`}
      style={{ transitionDelay: `${index * 80}ms`, transition: "all 0.6s ease" }}
    >
      <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-base flex-shrink-0">
        🏅
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white/85 text-sm font-medium truncate">{cert.name}</p>
        <p className="text-white/40 text-xs">{cert.issuer}</p>
      </div>
      <span className="text-xs text-amber-400/70 font-mono flex-shrink-0">{cert.year}</span>
    </div>
  );
}

export default function Education() {
  const [heroRef, heroIn] = useInView(0.1);

  return (
    <section id="education">
    <div className="relative min-h-screen w-full bg-black overflow-hidden font-sans">

      {/* ── Background effects ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[100px]" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "url('land.png')"
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 py-20 md:py-28">

        {/* ── Section Header ── */}
        <div
          ref={heroRef}
          className={`mb-16 transition-all duration-700 ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[48px] bg-gradient-to-r from-transparent to-cyan-400/60" />
            <span className="text-xs text-cyan-400/70 tracking-[0.25em] uppercase font-medium">
              Background
            </span>
          </div>
          <h2
            className="text-5xl md:text-6xl font-black text-white leading-none mb-4"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.03em" }}
          >
            Education
            <span className="text-cyan-400">.</span>
          </h2>
          <p className="text-white/40 text-base max-w-xl leading-relaxed">
            A foundation built on curiosity — from classrooms to codebases, the journey
            that shaped how I think and build.
          </p>
        </div>

        {/* ── Timeline ── */}
        <div className="relative mb-20">
          {/* Vertical timeline line (desktop only) */}
          <div className="hidden md:block absolute left-0 top-7 bottom-7 w-px bg-gradient-to-b from-cyan-400/40 via-violet-400/30 to-pink-400/20" />

          <div className="md:pl-12 flex flex-col gap-6">
            {EDUCATION.map((item, i) => (
              <EducationCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-white/8" />
          <span className="text-xs text-white/25 tracking-widest uppercase">Certifications</span>
          <div className="h-px flex-1 bg-white/8" />
        </div>

        {/* ── Certifications grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CERTS.map((c, i) => (
            <CertCard key={c.name} cert={c} index={i} />
          ))}
        </div>

        {/* ── Footer stat bar ── */}
        <div className="mt-16 grid grid-cols-3 gap-4">
          {[
            { label: "Institutions", value: "3" },
            { label: "Certifications", value: `${CERTS.length}+` },
            { label: "Top Grade", value: "91%" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center py-5 rounded-2xl bg-white/[0.03] border border-white/8 hover:bg-white/[0.06] transition-all duration-300"
            >
              <span className="text-3xl font-black text-white mb-1">{value}</span>
              <span className="text-xs text-white/35 tracking-widest uppercase">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </section>
  );
}