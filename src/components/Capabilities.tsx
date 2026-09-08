import React, { useState, useEffect, useRef, useCallback } from "react";
import FrozenKeyboard from "./FrozenKeyboard";

/* ─── Data ─────────────────────────────────────────────────────── */

interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  description: string;
  technologies: string[];
  highlights: string;
}

const CAPABILITIES_DATA: CapabilityItem[] = [
  {
    id: "cap-1",
    number: "01",
    title: "EXPERIENCE DESIGN",
    description: "Pixel-perfect interfaces crafted with empathy and intention.",
    technologies: ["Figma", "Framer", "UI/UX Prototyping", "User Research", "Wireframing", "Interaction Design", "Adobe Creative Suite"],
    highlights: "figma,framer",
  },
  {
    id: "cap-2",
    number: "02",
    title: "FULL-STACK DEVELOPMENT",
    description: "End-to-end systems built for scale, speed, and reliability.",
    technologies: ["ReactJS", "Next.js", "TypeScript", "NodeJS", "ExpressJS", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL", "Tailwind CSS"],
    highlights: "react,nextdotjs,nodedotjs,mongodb,postgresql,tailwindcss,typescript,graphql,javascript",
  },
  {
    id: "cap-3",
    number: "03",
    title: "AI & AUTOMATION",
    description: "Intelligent workflows that eliminate friction and unlock leverage.",
    technologies: ["OpenAI API", "LangChain", "Python", "Vector Databases", "n8n Automation", "Make.com", "Hugging Face"],
    highlights: "openai,python",
  },
  {
    id: "cap-4",
    number: "04",
    title: "BRANDING & IDENTITY",
    description: "Visual systems that make brands unmistakable and memorable.",
    technologies: ["Logo Design", "Style Guides", "Brand Strategy", "Typography Systems", "Visual Identity", "Asset Design"],
    highlights: "figma",
  },
  {
    id: "cap-5",
    number: "05",
    title: "PRODUCT STRATEGY",
    description: "Data-driven decisions from concept to market-fit.",
    technologies: ["Agile/Scrum", "Product Mapping", "Market Research", "SEO Optimization", "Web Performance Audit", "Analytics (GA4)"],
    highlights: "git,docker",
  },
];

const DEFAULT_HIGHLIGHTS = "figma,react,nodedotjs,typescript,python";

/* ─── Animated Number ──────────────────────────────────────────── */

function AnimatedNumber({ value }: { value: string }) {
  const [display, setDisplay] = useState("00");
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const target = parseInt(value, 10);
          let current = 0;
          const step = () => {
            current++;
            setDisplay(String(current).padStart(2, "0"));
            if (current < target) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

/* ─── Animated Rule ────────────────────────────────────────────── */

function AnimatedRule() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setWidth(100);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ width: "100%", height: "1px", overflow: "hidden" }}>
      <div
        style={{
          width: `${width}%`,
          height: "1px",
          background: "linear-gradient(90deg, #000 0%, transparent 100%)",
          transition: "width 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </div>
  );
}

/* ─── Capability Card (3D Flip) ────────────────────────────────── */

function CapabilityCard({
  item,
  index,
  onHover,
  onLeave,
}: {
  item: CapabilityItem;
  index: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsRevealed(true), index * 120);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  const handleEnter = () => {
    setIsFlipped(true);
    onHover();
  };

  const handleLeave = () => {
    setIsFlipped(false);
    onLeave();
  };

  /* Shared face styling */
  const faceBase: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: "16px",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    padding: "32px 28px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    overflow: "hidden",
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        perspective: "1000px",
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1)",
        cursor: "pointer",
        minHeight: "280px",
      }}
    >
      {/* Inner rotator */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          minHeight: "280px",
          transformStyle: "preserve-3d",
          transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT FACE ────────────────────────── */}
        <div
          style={{
            ...faceBase,
            background: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
          }}
        >
          {/* Number */}
          <div
            style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: "3.2rem",
              fontWeight: 700,
              lineHeight: 1,
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(0,0,0,0.12)",
              marginBottom: "16px",
              userSelect: "none",
            }}
          >
            <AnimatedNumber value={item.number} />
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1.15rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              margin: "0 0 8px 0",
              color: "#111",
            }}
          >
            {item.title}
          </h3>

          {/* Description */}
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "0.88rem",
              color: "#888",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            {item.description}
          </p>

          {/* Flip hint */}
          <div
            style={{
              marginTop: "auto",
              paddingTop: "20px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              opacity: 0.3,
              fontSize: "0.7rem",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#000",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 1l4 4-4 4" />
              <path d="M3 11V9a4 4 0 0 1 4-4h14" />
              <path d="M7 23l-4-4 4-4" />
              <path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </svg>
            Hover to reveal stack
          </div>
        </div>

        {/* ── BACK FACE ─────────────────────────── */}
        <div
          style={{
            ...faceBase,
            background: "#111",
            border: "1px solid rgba(255,255,255,0.08)",
            transform: "rotateY(180deg)",
            justifyContent: "flex-start",
          }}
        >
          {/* Back header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {item.number} — TECH STACK
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 3 21 3 21 8" />
              <line x1="4" y1="20" x2="21" y2="3" />
            </svg>
          </div>

          {/* Title on back */}
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              margin: "0 0 16px 0",
              color: "#fff",
            }}
          >
            {item.title}
          </h3>

          {/* Tech pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {item.technologies.map((tech, i) => (
              <span
                key={tech}
                style={{
                  display: "inline-block",
                  padding: "6px 14px",
                  borderRadius: "100px",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "0.02em",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.85)",
                  transform: isFlipped ? "translateY(0) scale(1)" : "translateY(6px) scale(0.95)",
                  opacity: isFlipped ? 1 : 0,
                  transition: `all 0.4s cubic-bezier(0.22,1,0.36,1) ${300 + i * 50}ms`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.background = "#fff";
                  el.style.color = "#111";
                  el.style.borderColor = "#fff";
                  el.style.transform = "translateY(-2px) scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.background = "rgba(255,255,255,0.08)";
                  el.style.color = "rgba(255,255,255,0.85)";
                  el.style.borderColor = "rgba(255,255,255,0.12)";
                  el.style.transform = "translateY(0) scale(1)";
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ─────────────────────────────────────────────── */

export const Capabilities: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeHighlights, setActiveHighlights] = useState<string>(DEFAULT_HIGHLIGHTS);

  const handleCardHover = useCallback((item: CapabilityItem) => {
    setActiveHighlights(item.highlights);
  }, []);

  const handleCardLeave = useCallback(() => {
    const activeItem = CAPABILITIES_DATA.find((c) => c.id === activeId);
    setActiveHighlights(activeItem?.highlights || DEFAULT_HIGHLIGHTS);
  }, [activeId]);

  const handleCardClick = useCallback((item: CapabilityItem) => {
    const isOpening = activeId !== item.id;
    setActiveId(isOpening ? item.id : null);
    setActiveHighlights(isOpening ? item.highlights : DEFAULT_HIGHLIGHTS);
  }, [activeId]);

  return (
    <section
      id="capabilities"
      className="position-relative z-1"
      style={{
        background: "#fafafa",
        borderTop: "1px solid #e8e8e8",
        paddingTop: "100px",
        paddingBottom: "100px",
        overflow: "hidden",
      }}
      data-kb-section="stack"
      data-kb-highlights={activeHighlights}
    >
      {/* Subtle noise texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
          pointerEvents: "none",
        }}
      />

      <div className="container tw-container-1800-px position-relative">
        {/* ── Header Zone ─────────────────────────────── */}
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="100"
        >
          <div
            className="text-uppercase fw-bold text-black tw-mb-4 d-flex align-items-center tw-gap-3"
            style={{ letterSpacing: "0.15em", fontSize: "0.75rem", opacity: 0.5 }}
          >
            <span style={{ width: "20px", height: "1px", background: "black", display: "inline-block" }} />
            CAPABILITIES & TECH
          </div>

          <div className="d-flex align-items-end justify-content-between flex-wrap tw-gap-6 tw-mb-6">
            <div>
              <div
                className="tw-text-xl fw-bold text-black tw-mb-5"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span className="tw-border-b-2 tw-border-black tw-pb-2">03</span>
              </div>
              <h2
                className="text-black fw-bold tw-leading-none tw-m-0"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  letterSpacing: "0.03em",
                  fontSize: "clamp(3.5rem, 7vw, 9rem)",
                }}
              >
                WHAT I BRING<br />TO THE TABLE
              </h2>
            </div>

            <p
              className="tw-m-0 d-none d-lg-block"
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "1.05rem",
                color: "#777",
                maxWidth: "360px",
                lineHeight: 1.6,
                paddingBottom: "8px",
              }}
            >
              A multi-disciplinary toolkit spanning design, engineering, AI, and strategy — built to ship products that matter.
            </p>
          </div>

          <AnimatedRule />
        </div>

        {/* ── 3D Keyboard Hero Zone ───────────────────── */}
        <div
          className="d-none d-lg-block"
          data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-delay="250"
          style={{
            width: "100%",
            height: "520px",
            marginTop: "40px",
            marginBottom: "48px",
            borderRadius: "20px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Soft vignette frame */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "20px",
              boxShadow: "inset 0 0 80px rgba(0,0,0,0.03)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          <FrozenKeyboard highlights={activeHighlights} />
        </div>

        {/* ── Capabilities Cards Grid ─────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginTop: "16px",
          }}
        >
          {CAPABILITIES_DATA.map((item, index) => (
            <CapabilityCard
              key={item.id}
              item={item}
              index={index}
              isActive={activeId === item.id}
              onHover={() => handleCardHover(item)}
              onLeave={handleCardLeave}
              onClick={() => handleCardClick(item)}
            />
          ))}
        </div>

        {/* ── Bottom CTA ──────────────────────────────── */}
        <div
          className="tw-mt-14 d-flex justify-content-center"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="600"
        >
          <a
            href="#contact"
            className="d-inline-flex align-items-center tw-gap-3 text-black fw-bold text-uppercase tw-text-sm tw-transition-all"
            style={{
              letterSpacing: "0.12em",
              padding: "14px 32px",
              borderRadius: "100px",
              border: "1.5px solid #000",
              textDecoration: "none",
              transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = "#000";
              el.style.color = "#fff";
              el.style.transform = "translateY(-3px)";
              el.style.boxShadow = "0 12px 32px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = "transparent";
              el.style.color = "#000";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "none";
            }}
          >
            LET'S WORK TOGETHER <span style={{ fontSize: "1.1rem" }}>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
};
