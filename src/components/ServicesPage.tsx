import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";

interface ServiceDetail {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  techStack: string[];
}

const SERVICES_DEEP_DIVE: ServiceDetail[] = [
  {
    number: "01",
    title: "UI/UX & PRODUCT DESIGN",
    subtitle: "User Experience, Systems & Interactive Interfaces",
    description: "Designing intuitive, conversion-focused digital products that blend functional clarity with luxury aesthetics. From initial wireframes to complete design systems.",
    deliverables: ["User Journey Mapping", "High-Fidelity Wireframes", "Figma Design Systems", "Interactive Prototyping", "Usability Testing & Accessibility"],
    techStack: ["Figma", "Framer", "Adobe Creative Suite", "Prototyping"],
  },
  {
    number: "02",
    title: "FULL-STACK WEB DEVELOPMENT",
    subtitle: "High-Performance Applications & Modular Web Architecture",
    description: "Engineering robust, scalable web applications built for speed, security, and effortless user interaction. Clean, modern code structured for long-term growth.",
    deliverables: ["Custom Next.js & React Apps", "REST & GraphQL API Architecture", "Database Schema Design", "Responsive Layouts", "Core Web Vitals Optimization"],
    techStack: ["React.js", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
  },
  {
    number: "03",
    title: "AI AGENTS & AUTOMATION",
    subtitle: "Generative Workflows, Intelligent Bots & AI Integration",
    description: "Unlocking leverage through custom AI integrations and automated workflows. Empowering platforms with intelligent search, custom LLMs, and agentic pipelines.",
    deliverables: ["OpenAI API & LLM Integration", "Custom AI Agent Pipelines", "Vector Database Indexing", "Automated Workflow Systems", "RAG Application Setup"],
    techStack: ["OpenAI API", "Python", "LangChain", "Vector DBs", "n8n", "Make.com"],
  },
  {
    number: "04",
    title: "BRAND IDENTITY & VISUAL SYSTEMS",
    subtitle: "Unmistakable Brand Strategy & Digital Design Systems",
    description: "Crafting distinct visual identities that elevate brands above noise. Comprehensive style guides, logo mark creation, and digital asset toolkits.",
    deliverables: ["Logo & Symbol Mark Design", "Brand Guidelines & Style Guides", "Typography & Color Systems", "Digital Marketing Assets", "Design Tokens"],
    techStack: ["Brand Strategy", "Typography", "Visual Identity", "Asset Design"],
  },
  {
    number: "05",
    title: "PERFORMANCE AUDIT & STRATEGY",
    subtitle: "Speed Optimization, SEO & Conversion Architecture",
    description: "Diagnosing technical bottlenecks and optimizing web performance for maximum conversion rates, SEO ranking, and instant load speeds.",
    deliverables: ["Lighthouse 100/100 Audits", "Technical SEO Strategy", "Bundle Size & Asset Reduction", "Conversion Funnel Optimization", "Analytics & GA4 Setup"],
    techStack: ["SEO Audit", "Web Vitals", "Analytics", "Performance Tuning"],
  },
];

interface ProcessStep {
  number: string;
  phase: string;
  title: string;
  description: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    phase: "DISCOVERY",
    title: "Understanding & Mapping",
    description: "Deep dive into business goals, audience requirements, technical constraints, and key performance metrics.",
  },
  {
    number: "02",
    phase: "ARCHITECTURE",
    title: "Design & System Planning",
    description: "Structuring user flows, wireframes, component libraries, and technical backend infrastructure.",
  },
  {
    number: "03",
    phase: "EXECUTION",
    title: "Development & Integration",
    description: "Writing clean, typed, modular code with continuous testing and real-time interaction feedback.",
  },
  {
    number: "04",
    phase: "LAUNCH",
    title: "Optimization & Deployment",
    description: "Rigorous performance audits, SEO setup, production deployment, and post-launch support.",
  },
];

const CUBIC_EASE = [0.16, 1, 0.3, 1] as const;

const line1Variants: Variants = {
  hidden: { x: -40, opacity: 0, filter: "blur(4px)" },
  visible: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: CUBIC_EASE },
  },
};

const line2Variants: Variants = {
  hidden: { x: 40, opacity: 0, filter: "blur(4px)" },
  visible: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: CUBIC_EASE, delay: 0.15 },
  },
};

const gridLineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: CUBIC_EASE, delay: 0.4 },
  },
};

export const ServicesPage: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "#08090A",
        color: "#F3F1ED",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* Dark Editorial Grain Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
        }}
      />

      <div className="container tw-container-1800-px position-relative py-5">
        
        {/* ── Top Header Navigation Bar ──────────────────────────────── */}
        <div className="d-flex align-items-center justify-content-between tw-mb-16 tw-pb-6 tw-border-b tw-border-neutral-800">
          <div className="d-flex align-items-center tw-gap-3">
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#FF5A36",
                display: "inline-block",
                boxShadow: "0 0 12px rgba(255, 90, 54, 0.6)",
              }}
            />
            <span
              style={{
                fontFamily: "'Space Grotesk', monospace",
                fontSize: "0.82rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#BFC2C5",
              }}
            >
              02 — SERVICES // CAPABILITIES & CRAFT
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "#F3F1ED",
              color: "#08090A",
              border: "none",
              padding: "10px 24px",
              borderRadius: "100px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "transform 0.3s ease, background-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.backgroundColor = "#FF5A36";
              e.currentTarget.style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.backgroundColor = "#F3F1ED";
              e.currentTarget.style.color = "#08090A";
            }}
          >
            ← BACK TO PORTFOLIO
          </button>
        </div>

        {/* ── Page Hero Headline ────────────────────────────────────── */}
        <div className="tw-mb-20">
          <motion.div
            initial="hidden"
            animate="visible"
            className="tw-mb-8"
          >
            <motion.h2
              variants={line1Variants}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(3.8rem, 8vw, 9.5rem)",
                lineHeight: 0.9,
                letterSpacing: "0.02em",
                color: "#F3F1ED",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              SOLUTIONS BUILT FOR
            </motion.h2>
            <motion.h2
              variants={line2Variants}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(3.8rem, 8vw, 9.5rem)",
                lineHeight: 0.9,
                letterSpacing: "0.02em",
                color: "#F3F1ED",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              SCALE, PRECISION & IMPACT.
            </motion.h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: "clamp(1.1rem, 1.6vw, 1.35rem)",
              color: "#A0A3A8",
              maxWidth: "680px",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            A multi-disciplinary studio approach combining user experience research, modern frontend architecture, scalable backends, and AI agent integration.
          </motion.p>
        </div>

        {/* ── Services Architectural Accordion Grid ─────────────────── */}
        <div className="tw-mb-24">
          <div
            style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#777A80",
              marginBottom: "20px",
            }}
          >
            [ CAPABILITIES DEEP DIVE ]
          </div>

          <motion.div
            variants={gridLineVariants}
            initial="hidden"
            animate="visible"
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "#22252A",
              transformOrigin: "left",
              marginBottom: "32px",
            }}
          />

          <div className="d-flex flex-column tw-gap-6">
            {SERVICES_DEEP_DIVE.map((service, idx) => {
              const isExpanded = expandedIndex === idx;

              return (
                <div
                  key={service.number}
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "16px",
                    backgroundColor: isExpanded ? "rgba(255, 255, 255, 0.03)" : "transparent",
                    transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                    overflow: "hidden",
                  }}
                >
                  {/* Header Row */}
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                    className="w-100 bg-transparent border-0 text-start text-white p-4 p-md-5 d-flex align-items-center justify-content-between cursor-pointer"
                    style={{ transition: "background-color 0.3s ease" }}
                  >
                    <div className="d-flex align-items-center tw-gap-6">
                      <span
                        style={{
                          fontFamily: "'Space Grotesk', monospace",
                          fontSize: "1.8rem",
                          fontWeight: 700,
                          color: isExpanded ? "#FF5A36" : "#55585D",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {service.number}
                      </span>
                      <div>
                        <h3
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
                            fontWeight: 700,
                            letterSpacing: "0.04em",
                            margin: "0 0 4px 0",
                          }}
                        >
                          {service.title}
                        </h3>
                        <p
                          style={{
                            fontFamily: "'Instrument Sans', sans-serif",
                            fontSize: "0.9rem",
                            color: "#888B90",
                            margin: 0,
                          }}
                        >
                          {service.subtitle}
                        </p>
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: "1.8rem",
                        transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                        display: "inline-block",
                        color: isExpanded ? "#FF5A36" : "#F3F1ED",
                      }}
                    >
                      ＋
                    </span>
                  </button>

                  {/* Expandable Body */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: CUBIC_EASE }}
                      className="px-4 px-md-5 pb-5 tw-pt-2 tw-border-t tw-border-neutral-800"
                    >
                      <p
                        style={{
                          fontFamily: "'Instrument Sans', sans-serif",
                          fontSize: "1.05rem",
                          lineHeight: 1.65,
                          color: "#C0C3C8",
                          maxWidth: "800px",
                          marginBottom: "28px",
                        }}
                      >
                        {service.description}
                      </p>

                      <div className="row tw-gy-6">
                        {/* Scope Deliverables */}
                        <div className="col-md-7">
                          <div
                            style={{
                              fontFamily: "'Space Grotesk', monospace",
                              fontSize: "0.7rem",
                              fontWeight: 700,
                              letterSpacing: "0.15em",
                              textTransform: "uppercase",
                              color: "#FF5A36",
                              marginBottom: "12px",
                            }}
                          >
                            // KEY DELIVERABLES
                          </div>
                          <div className="d-flex flex-wrap tw-gap-2">
                            {service.deliverables.map((item) => (
                              <span
                                key={item}
                                style={{
                                  padding: "6px 14px",
                                  borderRadius: "100px",
                                  fontSize: "0.78rem",
                                  fontFamily: "'Space Grotesk', sans-serif",
                                  fontWeight: 600,
                                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                                  border: "1px solid rgba(255, 255, 255, 0.1)",
                                  color: "#F3F1ED",
                                }}
                              >
                                ✓ {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="col-md-5">
                          <div
                            style={{
                              fontFamily: "'Space Grotesk', monospace",
                              fontSize: "0.7rem",
                              fontWeight: 700,
                              letterSpacing: "0.15em",
                              textTransform: "uppercase",
                              color: "#BFC2C5",
                              marginBottom: "12px",
                            }}
                          >
                            // STACK & TOOLING
                          </div>
                          <div className="d-flex flex-wrap tw-gap-2">
                            {service.techStack.map((tech) => (
                              <span
                                key={tech}
                                style={{
                                  padding: "6px 14px",
                                  borderRadius: "100px",
                                  fontSize: "0.78rem",
                                  fontFamily: "'Space Grotesk', sans-serif",
                                  fontWeight: 600,
                                  backgroundColor: "#F3F1ED",
                                  color: "#08090A",
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 4-stage Workflow Methodology Grid ────────────────────── */}
        <div className="tw-mt-24 tw-mb-24">
          <div
            style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#777A80",
              marginBottom: "20px",
            }}
          >
            [ EXECUTION METHODOLOGY ]
          </div>

          <motion.div
            variants={gridLineVariants}
            initial="hidden"
            animate="visible"
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "#22252A",
              transformOrigin: "left",
              marginBottom: "32px",
            }}
          />

          <div className="row tw-gy-6">
            {PROCESS_STEPS.map((proc, i) => (
              <div key={proc.number} className="col-md-3 col-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  style={{
                    padding: "24px",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "12px",
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    height: "100%",
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between tw-mb-4">
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', monospace",
                        fontSize: "1.4rem",
                        fontWeight: 700,
                        color: "#FF5A36",
                      }}
                    >
                      {proc.number}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', monospace",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        color: "#777A80",
                        textTransform: "uppercase",
                      }}
                    >
                      {proc.phase}
                    </span>
                  </div>

                  <h4
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "#F3F1ED",
                      margin: "0 0 8px 0",
                    }}
                  >
                    {proc.title}
                  </h4>

                  <p
                    style={{
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: "0.82rem",
                      color: "#888B90",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {proc.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Page Footer CTA ────────────────────────────────────────── */}
        <div className="tw-mt-24 tw-pt-12 tw-pb-16 tw-border-t tw-border-neutral-800 text-center">
          <h3
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.5rem, 5vw, 5.5rem)",
              letterSpacing: "0.03em",
              color: "#F3F1ED",
              marginBottom: "24px",
            }}
          >
            HAVE A PROJECT IN MIND? LET'S BUILD.
          </h3>

          <a
            href="#contact"
            onClick={onClose}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px 36px",
              borderRadius: "100px",
              backgroundColor: "#FF5A36",
              color: "#FFFFFF",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              boxShadow: "0 8px 24px rgba(255, 90, 54, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px) scale(1.03)";
              e.currentTarget.style.boxShadow = "0 16px 36px rgba(255, 90, 54, 0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 90, 54, 0.3)";
            }}
          >
            START A PROJECT <span>↗</span>
          </a>
        </div>

      </div>
    </div>
  );
};

export default ServicesPage;
