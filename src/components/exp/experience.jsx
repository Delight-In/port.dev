import { useEffect, useRef, useState } from "react";

/* ── Data ─────────────────────────────────────────────────────── */
const EXPERIENCES = [
  {
    id: 1,
    role: "AI / ML Engineer Intern",
    company: "TechVision Analytics",
    type: "Internship",
    period: "Jan 2024 – Jun 2024",
    duration: "6 months",
    location: "Remote — Bengaluru, India",
    accent: "cyan",
    icon: "🤖",
    summary:
      "Developed NLP pipelines and fine-tuned transformer models for real-time sentiment classification on customer feedback streams.",
    achievements: [
      "Fine-tuned BERT on 200K labelled samples → 94.2% F1 on held-out test set",
      "Reduced inference latency by 38% by converting PyTorch model to ONNX + TensorRT",
      "Built FastAPI microservice deployed on AWS Lambda serving 50K+ daily requests",
      "Automated data-cleaning pipeline (pandas + regex) saving 12 hrs/week of manual work",
    ],
    stack: ["Python", "PyTorch", "HuggingFace", "FastAPI", "AWS Lambda", "ONNX"],
  },
  {
    id: 2,
    role: "Data Science Intern",
    company: "InsightEdge Solutions",
    type: "Internship",
    period: "Jul 2023 – Dec 2023",
    duration: "6 months",
    location: "Hybrid — Noida, India",
    accent: "violet",
    icon: "📊",
    summary:
      "Built end-to-end ML pipelines for churn prediction and sales forecasting across retail & e-commerce clients.",
    achievements: [
      "Trained XGBoost churn model achieving ROC-AUC of 0.91 on 500K customer dataset",
      "Designed Power BI dashboard adopted by 4 client teams as primary reporting tool",
      "Automated ETL ingestion from 3 heterogeneous sources using Apache Airflow DAGs",
      "Presented weekly model insights to non-technical stakeholders, driving 2 product pivots",
    ],
    stack: ["Python", "XGBoost", "scikit-learn", "Airflow", "SQL", "Power BI"],
  },
  {
    id: 3,
    role: "AI Research Contributor",
    company: "Open-Source — HuggingFace Community",
    type: "Open Source",
    period: "Mar 2023 – Present",
    duration: "Ongoing",
    location: "Remote / Global",
    accent: "amber",
    icon: "🔬",
    summary:
      "Contributing model cards, evaluation scripts, and dataset preprocessing utilities to open-source AI repos on HuggingFace Hub.",
    achievements: [
      "Merged 8 PRs improving documentation and evaluation scripts for classification pipelines",
      "Published 2 custom datasets (total 18K stars across repos) on HuggingFace Hub",
      "Wrote tokenizer benchmark comparing BERT, RoBERTa, DeBERTa across 5 NLP tasks",
      "Active in HuggingFace forums — 2.4K reputation, answered 130+ community questions",
    ],
    stack: ["Python", "HuggingFace", "Datasets", "Transformers", "Jupyter", "GitHub"],
  },
  {
    id: 4,
    role: "Data Analyst (Freelance)",
    company: "Self-employed",
    type: "Freelance",
    period: "Aug 2022 – Jun 2023",
    duration: "10 months",
    location: "Remote",
    accent: "emerald",
    icon: "📈",
    summary:
      "Delivered end-to-end data analysis and visualisation projects for 6 SME clients across edtech, logistics, and retail sectors.",
    achievements: [
      "Built interactive Plotly Dash app for logistics client to track delivery SLA breaches",
      "Wrote SQL queries against PostgreSQL (5M+ rows) reducing report generation time 10×",
      "Delivered cohort analysis uncovering 23% drop-off in edtech onboarding funnel",
      "Maintained 5-star rating across all projects on Freelancer.com platform",
    ],
    stack: ["Python", "Pandas", "Plotly Dash", "SQL", "PostgreSQL", "Tableau"],
  },
];

const SKILLS_RADAR = [
  { label: "Machine Learning", value: 88 },
  { label: "NLP / LLMs", value: 82 },
  { label: "Data Engineering", value: 75 },
  { label: "MLOps / Deployment", value: 70 },
  { label: "Data Visualisation", value: 85 },
  { label: "Statistical Analysis", value: 78 },
];

const ACCENT_MAP = {
  cyan: {
    border: "border-cyan-500/25",
    glow: "hover:shadow-[0_0_40px_rgba(34,211,238,0.1)]",
    tag: "bg-cyan-400/10 text-cyan-300 border-cyan-400/20",
    bar: "bg-cyan-400",
    barGlow: "shadow-[0_0_8px_rgba(34,211,238,0.6)]",
    dot: "bg-cyan-400",
    ring: "ring-cyan-400/30",
    text: "text-cyan-400",
    badge: "bg-cyan-400/15 text-cyan-300",
    corner: "from-cyan-500/10",
  },
  violet: {
    border: "border-violet-500/25",
    glow: "hover:shadow-[0_0_40px_rgba(167,139,250,0.1)]",
    tag: "bg-violet-400/10 text-violet-300 border-violet-400/20",
    bar: "bg-violet-400",
    barGlow: "shadow-[0_0_8px_rgba(167,139,250,0.6)]",
    dot: "bg-violet-400",
    ring: "ring-violet-400/30",
    text: "text-violet-400",
    badge: "bg-violet-400/15 text-violet-300",
    corner: "from-violet-500/10",
  },
  amber: {
    border: "border-amber-500/25",
    glow: "hover:shadow-[0_0_40px_rgba(251,191,36,0.1)]",
    tag: "bg-amber-400/10 text-amber-300 border-amber-400/20",
    bar: "bg-amber-400",
    barGlow: "shadow-[0_0_8px_rgba(251,191,36,0.6)]",
    dot: "bg-amber-400",
    ring: "ring-amber-400/30",
    text: "text-amber-400",
    badge: "bg-amber-400/15 text-amber-300",
    corner: "from-amber-500/10",
  },
  emerald: {
    border: "border-emerald-500/25",
    glow: "hover:shadow-[0_0_40px_rgba(52,211,153,0.1)]",
    tag: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
    bar: "bg-emerald-400",
    barGlow: "shadow-[0_0_8px_rgba(52,211,153,0.6)]",
    dot: "bg-emerald-400",
    ring: "ring-emerald-400/30",
    text: "text-emerald-400",
    badge: "bg-emerald-400/15 text-emerald-300",
    corner: "from-emerald-500/10",
  },
};

/* ── useInView hook ──────────────────────────────────────────── */
function useInView(threshold = 0.12) {
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

/* ── Animated counter ──────────────────────────────────────── */
function Counter({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const [ref, inView] = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const duration = 1200;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Skill bar ─────────────────────────────────────────────── */
function SkillBar({ skill, index }) {
  const [ref, inView] = useInView(0.2);
  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-white/65 text-sm font-mono">{skill.label}</span>
        <span className="text-white/35 text-xs font-mono">{inView ? skill.value : 0}%</span>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 transition-all duration-1000 ease-out"
          style={{
            width: inView ? `${skill.value}%` : "0%",
            transitionDelay: `${index * 80 + 200}ms`,
            boxShadow: inView ? "0 0 8px rgba(34,211,238,0.5)" : "none",
          }}
        />
      </div>
    </div>
  );
}

/* ── Experience Card ──────────────────────────────────────── */
function ExpCard({ exp, index }) {
  const a = ACCENT_MAP[exp.accent];
  const [ref, inView] = useInView(0.1);
  const [expanded, setExpanded] = useState(false);

  return (
    
    <div
      ref={ref}
      className={`relative transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Timeline connector dot */}
      <div className="absolute -left-[45px] top-8 hidden lg:flex items-center justify-center">
        <div className={`w-3.5 h-3.5 rounded-full ${a.dot} ring-4 ${a.ring} ring-offset-[3px] ring-offset-[#050508]`} />
      </div>

      <div
        className={`group relative rounded-2xl border ${a.border} bg-white/[0.025] backdrop-blur-sm 
          ${a.glow} hover:bg-white/[0.05] transition-all duration-400 overflow-hidden cursor-pointer`}
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Ambient corner glow */}
        <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${a.corner} to-transparent rounded-full blur-3xl pointer-events-none opacity-60`} />

        {/* Top bar */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-4 p-6">
          {/* Icon */}
          <div className={`flex-shrink-0 w-12 h-12 rounded-xl border ${a.border} bg-gradient-to-br ${a.corner} to-transparent flex items-center justify-center text-xl`}>
            {exp.icon}
          </div>

          <div className="flex-1 min-w-0">
            {/* Role + type badge */}
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-white font-bold text-base sm:text-lg leading-tight" style={{ fontFamily: "'Courier New', monospace" }}>
                {exp.role}
              </h3>
              <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full tracking-widest uppercase ${a.badge}`}>
                {exp.type}
              </span>
            </div>

            {/* Company */}
            <p className={`${a.text} text-sm font-medium mb-2`}>{exp.company}</p>

            {/* Meta row */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/30">
              <span>📅 {exp.period}</span>
              <span>⏱ {exp.duration}</span>
              <span>📍 {exp.location}</span>
            </div>
          </div>

          {/* Expand chevron */}
          <div className={`flex-shrink-0 w-7 h-7 rounded-full border ${a.border} flex items-center justify-center transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}>
            <svg className="w-3 h-3 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Summary (always visible) */}
        <div className="relative z-10 px-6 pb-4">
          <p className="text-white/45 text-sm leading-relaxed">{exp.summary}</p>
        </div>

        {/* Expanded: achievements + stack */}
        <div
          className="overflow-hidden transition-all duration-500"
          style={{ maxHeight: expanded ? "600px" : "0px" }}
        >
          <div className="px-6 pb-6 space-y-5">
            {/* Divider */}
            <div className={`h-px bg-gradient-to-r ${a.corner} via-white/10 to-transparent`} />

            {/* Achievements */}
            <div>
              <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase font-mono mb-3">Key Achievements</p>
              <ul className="space-y-2.5">
                {exp.achievements.map((ach, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${a.dot}`} />
                    <span className="text-white/60 text-sm leading-relaxed">{ach}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack tags */}
            <div>
              <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase font-mono mb-3">Stack</p>
              <div className="flex flex-wrap gap-2">
                {exp.stack.map((s) => (
                  <span key={s} className={`px-2.5 py-1 text-xs rounded-lg border ${a.tag}`}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Neural net background SVG ────────────────────────────── */
function NeuralBg() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Layer 1 nodes */}
      {[120, 220, 320, 420, 520].map((y, i) => (
        <circle key={`l1-${i}`} cx={180} cy={y} r={5} fill="rgba(34,211,238,0.6)" />
      ))}
      {/* Layer 2 nodes */}
      {[160, 280, 400, 480].map((y, i) => (
        <circle key={`l2-${i}`} cx={480} cy={y} r={5} fill="rgba(167,139,250,0.6)" />
      ))}
      {/* Layer 3 nodes */}
      {[200, 320, 440].map((y, i) => (
        <circle key={`l3-${i}`} cx={780} cy={y} r={5} fill="rgba(251,191,36,0.6)" />
      ))}
      {/* Output */}
      {[280, 360].map((y, i) => (
        <circle key={`lo-${i}`} cx={1050} cy={y} r={6} fill="rgba(52,211,153,0.6)" />
      ))}
      {/* Connections L1→L2 */}
      {[120, 220, 320, 420, 520].flatMap((y1) =>
        [160, 280, 400, 480].map((y2, j) => (
          <line key={`c12-${y1}-${j}`} x1={180} y1={y1} x2={480} y2={y2} stroke="rgba(34,211,238,0.15)" strokeWidth={0.8} />
        ))
      )}
      {/* Connections L2→L3 */}
      {[160, 280, 400, 480].flatMap((y1) =>
        [200, 320, 440].map((y2, j) => (
          <line key={`c23-${y1}-${j}`} x1={480} y1={y1} x2={780} y2={y2} stroke="rgba(167,139,250,0.15)" strokeWidth={0.8} />
        ))
      )}
      {/* Connections L3→Out */}
      {[200, 320, 440].flatMap((y1) =>
        [280, 360].map((y2, j) => (
          <line key={`c3o-${y1}-${j}`} x1={780} y1={y1} x2={1050} y2={y2} stroke="rgba(251,191,36,0.15)" strokeWidth={0.8} />
        ))
      )}
    </svg>
  );
}

/* ── Main Component ───────────────────────────────────────── */
export default function Experience() {
  const [headerRef, headerIn] = useInView(0.1);

  return (
    <section id="experience">
    <div
      className="relative min-h-screen w-full overflow-hidden font-sans"
      style={{ background: "#050508" }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-100px] left-[15%] w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[140px]" />
        <div className="absolute top-[40%] right-[-100px] w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] rounded-full bg-amber-500/4 blur-[100px]" />
        {/* Neural net decorative bg */}
        <NeuralBg />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 py-24">

        {/* ── Header ── */}
        <div
          ref={headerRef}
          className={`mb-8 transition-all duration-700 ${headerIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-400/60" />
            <span className="text-[10px] text-cyan-400/60 tracking-[0.3em] uppercase font-mono">
              Work History
            </span>
          </div>

          <h2
            className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-none mb-4"
            style={{ fontFamily: "'Courier New', monospace", letterSpacing: "-0.04em" }}
          >
            Experience
            <span className="text-transparent bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text">_</span>
          </h2>
          <p className="text-white/35 text-sm sm:text-base max-w-lg leading-relaxed font-mono">
            Building at the intersection of artificial intelligence, data engineering,<br className="hidden sm:block" />
            and production systems.
          </p>
        </div>

        {/* ── Stat counters ── */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-3 mb-16 transition-all duration-700 delay-200 ${
            headerIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {[
            { label: "Projects Shipped", target: 24, suffix: "+" },
            { label: "Models Trained", target: 40, suffix: "+" },
            { label: "Data Points Processed", target: 2, suffix: "M+" },
            { label: "Months Experience", target: 22, suffix: "" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center py-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300"
            >
              <span className="text-3xl font-black text-white font-mono mb-1">
                <Counter target={s.target} suffix={s.suffix} />
              </span>
              <span className="text-[10px] text-white/25 tracking-widest uppercase text-center px-2">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Timeline ── */}
        <div className="relative mb-20">
          {/* Vertical line */}
          <div className="hidden lg:block absolute left-0 top-6 bottom-6 w-px bg-gradient-to-b from-cyan-400/30 via-violet-400/20 via-amber-400/20 to-emerald-400/15" />

          <div className="lg:pl-12 flex flex-col gap-5">
            {EXPERIENCES.map((exp, i) => (
              <ExpCard key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-white/[0.06]" />
          <span className="text-[10px] text-white/20 tracking-[0.25em] uppercase font-mono">
            Core Competencies
          </span>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </div>

        {/* ── Skills radar (bar chart style) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5 mb-16">
          {SKILLS_RADAR.map((s, i) => (
            <SkillBar key={s.label} skill={s} index={i} />
          ))}
        </div>

        {/* ── Terminal card at the bottom ── */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-amber-500/50" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
            <span className="ml-3 text-[10px] text-white/20 font-mono tracking-widest">
              ~/portfolio/experience — zsh
            </span>
          </div>
          {/* Terminal lines */}
          <div className="px-5 py-5 space-y-2 font-mono text-sm">
            {[
              { prompt: "$ ", cmd: "cat summary.txt", color: "text-cyan-400" },
              { out: "→ 4 roles across AI, Data Science & Open-Source", color: "text-white/50" },
              { out: "→ Comfortable from raw data → production ML systems", color: "text-white/50" },
              { out: "→ Frameworks: PyTorch · scikit-learn · HuggingFace · Airflow", color: "text-white/50" },
              { prompt: "$ ", cmd: "echo $STATUS", color: "text-violet-400" },
              { out: "OPEN TO FULL-TIME AI/ML ROLES", color: "text-emerald-400" },
            ].map((line, i) => (
              <div key={i} className="flex items-start gap-2">
                {line.prompt && <span className="text-white/25">{line.prompt}</span>}
                <span className={line.color}>{line.cmd || line.out}</span>
              </div>
            ))}
            <div className="flex items-center gap-1 mt-1">
              <span className="text-white/25">$ </span>
              <span className="w-2 h-4 bg-cyan-400/70 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}