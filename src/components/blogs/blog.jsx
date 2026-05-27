import { useState } from "react";
import { Calendar, Clock, Search, ChevronDown } from "lucide-react";

const blogs = [
  {
    slug: "designing-modern-luxury-interfaces",
    title: "Designing Modern Luxury Interfaces",
    description:
      "Discover how glassmorphism, motion, and premium typography create unforgettable digital experiences.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    date: "May 23, 2026",
    time: "6 min read",
    tag: "Design",
    tagColor: "design",
    details: {
      projectTitle: "Modern Luxury UI System",
      requirements: ["React.js frontend", "Glassmorphism design", "Responsive layout", "Smooth animations"],
      details: "This project focuses on creating a premium luxury interface using modern UI principles such as glassmorphism, cinematic spacing, immersive typography, and motion-based interactions.",
      data: "The design system uses reusable components, responsive grids, animation timing systems, typography scales, and accessibility-focused color contrast ratios.",
      implementationSteps: ["Created reusable React components", "Designed responsive card layouts", "Implemented hover animations", "Added smooth transitions", "Integrated search and category filtering"],
      result: "The final product delivered a premium visual experience with high engagement and modern interaction patterns.",
      conclusion: "Luxury interfaces depend heavily on typography, spacing, subtle motion, and emotional storytelling through UI.",
    },
  },
  {
    slug: "ai-powered-design-systems",
    title: "AI-Powered Design Systems",
    description:
      "Explore how artificial intelligence is revolutionizing design workflows and creating adaptive interfaces.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
    date: "May 18, 2026",
    time: "8 min read",
    tag: "AI",
    tagColor: "ai",
    details: {
      projectTitle: "Generative UI Framework",
      requirements: ["Machine learning models", "Real-time adaptation", "User preference learning", "A/B testing framework"],
      details: "An AI-driven design system that learns from user interactions and automatically generates personalized interface variations.",
      data: "Trained on 1M+ user interactions, achieving 40% higher engagement and 25% reduction in design iteration time.",
      implementationSteps: ["Collected user interaction data", "Trained ML models on design patterns", "Built real-time adaptation engine", "Integrated with existing design tokens", "Deployed A/B testing pipeline"],
      result: "Reduced design iteration time by 60% and improved user satisfaction scores by 35%.",
      conclusion: "AI-powered design systems represent the next frontier in creating truly adaptive user experiences.",
    },
  },
  {
    slug: "motion-design-principles",
    title: "Motion Design Principles for 2026",
    description:
      "Learn the latest motion design trends and how to implement them in your web projects.",
    image:
      "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=800&auto=format&fit=crop",
    date: "May 12, 2026",
    time: "5 min read",
    tag: "Motion",
    tagColor: "motion",
    details: {
      projectTitle: "Kinetic UI Library",
      requirements: ["GSAP animations", "Scroll-triggered effects", "Micro-interactions", "Performance optimization"],
      details: "A comprehensive motion design system that brings interfaces to life with purposeful, delightful animations.",
      data: "Implemented 50+ animation components with 60fps performance across all devices.",
      implementationSteps: ["Audited existing animation patterns", "Created reusable animation hooks", "Built scroll-based animation triggers", "Optimized for Core Web Vitals", "Documented motion design tokens"],
      result: "Achieved 99% motion smoothness score and reduced animation-related bugs by 80%.",
      conclusion: "Thoughtful motion design enhances usability and creates emotional connections with users.",
    },
  },
  {
    slug: "ux-research-methods",
    title: "Modern UX Research Methods",
    description:
      "Discover effective UX research techniques for understanding user needs and validating designs.",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop",
    date: "May 5, 2026",
    time: "7 min read",
    tag: "UX",
    tagColor: "ux",
    details: {
      projectTitle: "User Insights Platform",
      requirements: ["Remote testing tools", "Analytics integration", "Heatmap tracking", "Session recording"],
      details: "A unified research platform that combines quantitative and qualitative user data for actionable insights.",
      data: "Conducted 500+ user interviews and analyzed 10,000+ user sessions to identify key pain points.",
      implementationSteps: ["Set up research repository", "Conducted user interviews", "Analyzed behavioral data", "Created journey maps", "Validated findings with usability tests"],
      result: "Identified 15 critical usability issues and increased task completion rates by 45%.",
      conclusion: "Data-driven UX research is essential for creating products that truly serve user needs.",
    },
  },
  {
    slug: "web-performance-optimization",
    title: "Advanced Web Performance Optimization",
    description:
      "Master the art of building blazing-fast web applications with modern optimization techniques.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    date: "April 28, 2026",
    time: "10 min read",
    tag: "Development",
    tagColor: "dev",
    details: {
      projectTitle: "Performance-first Framework",
      requirements: ["Code splitting", "Image optimization", "Caching strategies", "Bundle analysis"],
      details: "A comprehensive performance optimization system that achieves perfect Core Web Vitals scores.",
      data: "Reduced initial load time by 67% and achieved 100% Lighthouse scores across all metrics.",
      implementationSteps: ["Audited existing performance", "Implemented code splitting", "Optimized asset delivery", "Added service workers", "Set up monitoring systems"],
      result: "Improved conversion rates by 28% and reduced bounce rate by 42%.",
      conclusion: "Performance optimization directly impacts business metrics and user satisfaction.",
    },
  },
];

const TAG_STYLES = {
  design: { bg: "rgba(168,85,247,0.15)", color: "#c084fc" },
  dev:    { bg: "rgba(99,102,241,0.15)",  color: "#818cf8" },
  motion: { bg: "rgba(236,72,153,0.15)",  color: "#f472b6" },
  ai:     { bg: "rgba(16,185,129,0.15)",  color: "#34d399" },
  ux:     { bg: "rgba(245,158,11,0.15)",  color: "#fbbf24" },
};

const CATEGORIES = [
  { label: "All",         value: "All"    },
  { label: "Design",      value: "design" },
  { label: "Development", value: "dev"    },
  { label: "Motion",      value: "motion" },
  { label: "AI",          value: "ai"     },
  { label: "UX",          value: "ux"     },
];

/* ── Detail panel (full-width row) ── */
function DetailPanel({ blog }) {
  const d = blog.details;
  return (
    <div
      style={{
        gridColumn: "1 / -1",
        background: "rgba(168,85,247,0.06)",
        border: "1px solid rgba(168,85,247,0.2)",
        borderRadius: 22,
        padding: "28px 28px 24px",
        animation: "fadeSlideIn 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(20px,4vw,28px)",
          fontWeight: 600,
          color: "#c084fc",
          marginBottom: 22,
        }}
      >
        {d.projectTitle}
      </h3>

      {/* Info grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginBottom: 20,
        }}
      >
        {[
          {
            title: "Requirements",
            content: (
              <ul style={{ paddingLeft: 16, color: "#9ca3af", fontSize: 12, lineHeight: 1.65 }}>
                {d.requirements.map((r, i) => (
                  <li key={i} style={{ marginBottom: 5 }}>{r}</li>
                ))}
              </ul>
            ),
          },
          {
            title: "Key Data",
            content: <p style={{ color: "#9ca3af", fontSize: 12, lineHeight: 1.65 }}>{d.data}</p>,
          },
          {
            title: "Project Details",
            content: <p style={{ color: "#9ca3af", fontSize: 12, lineHeight: 1.65 }}>{d.details}</p>,
          },
          {
            title: "Implementation",
            content: (
              <ol style={{ paddingLeft: 16, color: "#9ca3af", fontSize: 12, lineHeight: 1.65 }}>
                {d.implementationSteps.map((s, i) => (
                  <li key={i} style={{ marginBottom: 5 }}>{s}</li>
                ))}
              </ol>
            ),
          },
        ].map(({ title, content }) => (
          <div
            key={title}
            style={{
              padding: 16,
              borderRadius: 14,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <h4 style={{ color: "#fff", fontSize: 13, fontWeight: 600, letterSpacing: "0.05em", marginBottom: 10 }}>
              {title}
            </h4>
            {content}
          </div>
        ))}
      </div>

      {/* Result + Conclusion */}
      <div
        style={{
          padding: "18px 22px",
          borderRadius: 14,
          background: "rgba(168,85,247,0.08)",
          border: "1px solid rgba(168,85,247,0.2)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {[
          { title: "Results",    text: d.result     },
          { title: "Conclusion", text: d.conclusion },
        ].map(({ title, text }) => (
          <div key={title}>
            <h4 style={{ color: "#fff", fontSize: 13, fontWeight: 600, letterSpacing: "0.05em", marginBottom: 8 }}>
              {title}
            </h4>
            <p style={{ color: "#d1d5db", fontSize: 12, lineHeight: 1.7 }}>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Article card ── */
function ArticleCard({ blog, isOpen, onToggle }) {
  const ts = TAG_STYLES[blog.tagColor] || TAG_STYLES.design;
  return (
    <article
      style={{
        borderRadius: 22,
        overflow: "hidden",
        border: `1px solid ${isOpen ? "rgba(168,85,247,0.4)" : "rgba(255,255,255,0.08)"}`,
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(18px)",
        transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s",
        boxShadow: isOpen
          ? "0 16px 40px -10px rgba(168,85,247,0.35)"
          : "0 4px 6px -1px rgba(0,0,0,0.1)",
      }}
      onMouseEnter={e => { if (!isOpen) e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {/* Image */}
      <div style={{ height: 200, overflow: "hidden" }}>
        <img
          src={blog.image}
          alt={blog.title}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.07)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
        />
      </div>

      {/* Body */}
      <div style={{ padding: "22px 22px 18px" }}>
        <span
          style={{
            display: "inline-block",
            background: ts.bg,
            color: ts.color,
            fontSize: 10,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            padding: "3px 11px",
            borderRadius: 999,
            fontWeight: 500,
            marginBottom: 12,
          }}
        >
          {blog.tag}
        </span>

        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(19px,3.5vw,23px)",
            fontWeight: 600,
            color: isOpen ? "#c084fc" : "#fff",
            marginBottom: 10,
            lineHeight: 1.3,
            transition: "color 0.3s",
          }}
        >
          {blog.title}
        </h2>

        <p style={{ color: "#9ca3af", lineHeight: 1.65, fontSize: 13, marginBottom: 16 }}>
          {blog.description}
        </p>

        <div style={{ display: "flex", gap: 14, color: "#9ca3af", fontSize: 11, marginBottom: 18, flexWrap: "wrap" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Calendar size={11} /> {blog.date}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Clock size={11} /> {blog.time}
          </span>
        </div>

        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          style={{
            width: "100%",
            padding: "10px 16px",
            borderRadius: 12,
            border: `1px solid ${isOpen ? "rgba(168,85,247,0.4)" : "rgba(255,255,255,0.08)"}`,
            background: isOpen ? "rgba(168,85,247,0.2)" : "rgba(168,85,247,0.1)",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontWeight: 500,
            fontSize: 12,
            transition: "all 0.3s",
            fontFamily: "'DM Sans', sans-serif",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(168,85,247,0.25)";
            e.currentTarget.style.borderColor = "rgba(168,85,247,0.5)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = isOpen ? "rgba(168,85,247,0.2)" : "rgba(168,85,247,0.1)";
            e.currentTarget.style.borderColor = isOpen ? "rgba(168,85,247,0.4)" : "rgba(255,255,255,0.08)";
          }}
        >
          {isOpen ? "Close details" : "Read full article"}
          <ChevronDown
            size={16}
            style={{ transition: "transform 0.3s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>
      </div>
    </article>
  );
}

/* ── Main export ── */
export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery]       = useState("");
  const [openSlug, setOpenSlug]             = useState(null);

  const filtered = blogs.filter(b => {
    const mc = activeCategory === "All" || b.tagColor === activeCategory;
    const q  = searchQuery.trim().toLowerCase();
    const ms = !q || b.title.toLowerCase().includes(q) || b.description.toLowerCase().includes(q) || b.tag.toLowerCase().includes(q);
    return mc && ms;
  });

  const handleToggle = slug => {
    setOpenSlug(prev => (prev === slug ? null : slug));
  };

  const handleCategoryChange = val => {
    setActiveCategory(val);
    setOpenSlug(null);
  };

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
    setOpenSlug(null);
  };

  const clearFilters = () => {
    setActiveCategory("All");
    setSearchQuery("");
    setOpenSlug(null);
  };

  // Build grid items: card + optional detail panel injected after it
  const gridItems = [];
  filtered.forEach(blog => {
    gridItems.push(
      <ArticleCard
        key={blog.slug}
        blog={blog}
        isOpen={openSlug === blog.slug}
        onToggle={() => handleToggle(blog.slug)}
      />
    );
    if (openSlug === blog.slug) {
      gridItems.push(<DetailPanel key={`panel-${blog.slug}`} blog={blog} />);
    }
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::placeholder { color: #6b7280; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); border-radius: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(168,85,247,0.4); border-radius: 3px; }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(28px,-28px) scale(1.05); }
          66%      { transform: translate(-18px,18px) scale(0.95); }
        }
      `}</style>

      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          background: "#080810",
          color: "#fff",
          fontFamily: "'DM Sans', sans-serif",
          overflow: "hidden",
          padding: "60px 24px 96px",
        }}
      >
        {/* Ambient blobs */}
        {[
          { w: 440, h: 440, color: "rgba(168,85,247,0.14)", top: -80,   left: -80,  delay: 0 },
          { w: 340, h: 340, color: "rgba(236,72,153,0.10)", bottom: 0,  right: -60, delay: 2 },
          { w: 300, h: 300, color: "rgba(99,102,241,0.09)", top: "45%", left: "30%",delay: 1 },
          { w: 260, h: 260, color: "rgba(16,185,129,0.07)", bottom:"20%",left:"8%", delay: 3 },
        ].map((b, i) => (
          <div
            key={i}
            style={{
              position: "fixed",
              width: b.w, height: b.h,
              background: b.color,
              borderRadius: "50%",
              filter: "blur(100px)",
              pointerEvents: "none",
              zIndex: 0,
              top: b.top, left: b.left, bottom: b.bottom, right: b.right,
              animation: `float 20s ease-in-out infinite ${b.delay}s`,
            }}
          />
        ))}

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>

          {/* Hero */}
          <div style={{ marginBottom: 40, textAlign: "center" }}>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(40px,8vw,80px)",
                fontWeight: 700,
                lineHeight: 1.1,
                maxWidth: 820,
                margin: "0 auto 16px",
                background: "linear-gradient(135deg,#fff 30%,#c084fc 60%,#a855f7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Blogs &amp; Insights
            </h1>
            <p style={{ color: "#9ca3af", fontSize: "clamp(14px,2.5vw,16px)", maxWidth: 580, margin: "0 auto" }}>
              Exploring the intersection of design, technology, and user experience
            </p>
          </div>

          {/* Toolbar */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 40,
              padding: "12px 16px",
              background: "rgba(255,255,255,0.02)",
              borderRadius: 50,
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {/* Search */}
            <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
              <Search
                size={14}
                style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }}
              />
              <input
                type="text"
                placeholder="Search articles…"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: 40,
                  padding: "10px 16px 10px 40px",
                  color: "#fff",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  outline: "none",
                  transition: "all 0.3s",
                }}
                onFocus={e => { e.currentTarget.style.borderColor = "#a855f7"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                onBlur={e  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              />
            </div>

            {/* Category filters */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {CATEGORIES.map(cat => {
                const active = activeCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => handleCategoryChange(cat.value)}
                    style={{
                      borderRadius: 40,
                      padding: "7px 16px",
                      fontSize: 12,
                      fontWeight: active ? 600 : 400,
                      cursor: "pointer",
                      color: active ? "#fff" : "#9ca3af",
                      background: active ? "rgba(168,85,247,0.2)" : "transparent",
                      border: `1px solid ${active ? "#a855f7" : "rgba(255,255,255,0.09)"}`,
                      transition: "all 0.25s",
                      fontFamily: "'DM Sans', sans-serif",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = "rgba(168,85,247,0.5)"; e.currentTarget.style.color = "#fff"; } }}
                    onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "#9ca3af"; } }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section label */}
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#9ca3af",
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            {searchQuery || activeCategory !== "All" ? "Filtered results" : "Latest articles"}
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "50px 20px",
                background: "rgba(255,255,255,0.02)",
                borderRadius: 22,
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 16 }}>
                No articles found matching your criteria.
              </p>
              <button
                onClick={clearFilters}
                style={{
                  background: "rgba(168,85,247,0.15)",
                  border: "1px solid rgba(168,85,247,0.3)",
                  borderRadius: 40,
                  padding: "9px 22px",
                  color: "#c084fc",
                  cursor: "pointer",
                  fontSize: 13,
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.3s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(168,85,247,0.25)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(168,85,247,0.15)"; }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: 22,
                  marginBottom: 36,
                }}
              >
                {gridItems}
              </div>

              <div style={{ textAlign: "center", color: "#6b7280", fontSize: 12 }}>
                Showing {filtered.length} of {blogs.length} articles
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}