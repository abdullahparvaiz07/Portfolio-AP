import React from "react";
import { motion, type Variants } from "framer-motion";

interface MetadataItem {
  label: string;
  value: string;
}

const METADATA: MetadataItem[] = [
  { label: "BASED IN", value: "PAKISTAN" },
  { label: "FOCUS", value: "DIGITAL EXPERIENCES" },
  { label: "CURRENTLY EXPLORING", value: "AI + CREATIVE TECHNOLOGY" },
  { label: "AVAILABLE FOR", value: "SELECTED PROJECTS" },
];

interface Specialization {
  number: string;
  title: string;
  subtitle: string;
}

const SPECIALIZATIONS: Specialization[] = [
  {
    number: "01",
    title: "UI/UX DESIGN",
    subtitle: "Interfaces, Systems & Interactions",
  },
  {
    number: "02",
    title: "FULL-STACK DEVELOPMENT",
    subtitle: "Web Architecture, Next.js & APIs",
  },
  {
    number: "03",
    title: "AI EXPERIENCES",
    subtitle: "Generative Workflows & AI Agents",
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

const imageMaskVariants: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)", scale: 1.08 },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    transition: { duration: 1.4, ease: CUBIC_EASE, delay: 0.2 },
  },
};

const gridLineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: CUBIC_EASE, delay: 0.4 },
  },
};

const signalDotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.8 },
  },
};

export const AboutMePage: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.85, ease: CUBIC_EASE }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "#F3F1ED",
        color: "#08090A",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* Editorial Grain Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
        }}
      />

      <div className="container tw-container-1800-px position-relative py-5">
        
        {/* ── Top Fixed Navigation Bar ───────────────────────────────── */}
        <div className="d-flex align-items-center justify-content-between tw-mb-16 tw-pb-6 tw-border-b tw-border-neutral-300">
          <div className="d-flex align-items-center tw-gap-3">
            <motion.span
              variants={signalDotVariants}
              initial="hidden"
              animate="visible"
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#FF5A36",
                display: "inline-block",
                boxShadow: "0 0 10px rgba(255, 90, 54, 0.5)",
              }}
            />
            <span
              style={{
                fontFamily: "'Space Grotesk', monospace",
                fontSize: "0.82rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#22252A",
              }}
            >
              01 — ABOUT ME // EDITORIAL PROFILE
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "#08090A",
              color: "#F3F1ED",
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
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.backgroundColor = "#08090A";
            }}
          >
            ← BACK TO PORTFOLIO
          </button>
        </div>

        {/* ── Editorial Split Composition ───────────────────────────── */}
        <div className="row align-items-start justify-content-between tw-gy-12">
          
          {/* LEFT MAIN AREA */}
          <div className="col-lg-7">
            {/* Fragmented Headline Reveal */}
            <motion.div
              initial="hidden"
              animate="visible"
              className="tw-mb-10"
            >
              <motion.h2
                variants={line1Variants}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(3.8rem, 8.5vw, 10rem)",
                  lineHeight: 0.9,
                  letterSpacing: "0.02em",
                  color: "#08090A",
                  margin: 0,
                  textTransform: "uppercase",
                }}
              >
                I TURN IDEAS INTO
              </motion.h2>
              <motion.h2
                variants={line2Variants}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(3.8rem, 8.5vw, 10rem)",
                  lineHeight: 0.9,
                  letterSpacing: "0.02em",
                  color: "#08090A",
                  margin: 0,
                  textTransform: "uppercase",
                }}
              >
                DIGITAL EXPERIENCES.
              </motion.h2>
            </motion.div>

            {/* Architectural Divider Line */}
            <motion.div
              variants={gridLineVariants}
              initial="hidden"
              animate="visible"
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#08090A",
                transformOrigin: "left",
                marginBottom: "40px",
                opacity: 0.2,
              }}
            />

            {/* Confident Minimal Biography Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              style={{ maxWidth: "580px" }}
            >
              <p
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: "clamp(1.15rem, 1.8vw, 1.45rem)",
                  lineHeight: 1.55,
                  color: "#08090A",
                  fontWeight: 500,
                  marginBottom: "24px",
                }}
              >
                I'm Abdullah Parvaiz — a developer and digital creator focused on turning ambitious ideas into polished digital experiences.
              </p>
              
              <p
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                  lineHeight: 1.65,
                  color: "#22252A",
                  fontWeight: 400,
                  marginBottom: "24px",
                }}
              >
                I work across UI/UX design, frontend development, full-stack applications, and AI-powered experiences.
              </p>

              <p
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                  lineHeight: 1.65,
                  color: "#55585D",
                  fontWeight: 400,
                  margin: 0,
                }}
              >
                I believe the best digital products live at the intersection of technology, creativity, and thoughtful design.
              </p>
            </motion.div>
          </div>

          {/* RIGHT SIDE — EDITORIAL PORTRAIT */}
          <div className="col-lg-5 position-relative">
            <motion.div
              initial="hidden"
              animate="visible"
              className="position-relative"
            >
              {/* Architectural Frame Border Behind Image */}
              <div
                style={{
                  position: "absolute",
                  inset: "-12px -12px 12px 12px",
                  border: "1px solid rgba(8, 9, 10, 0.15)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />

              {/* Portrait Canvas Mask Container */}
              <motion.div
                variants={imageMaskVariants}
                style={{
                  position: "relative",
                  zIndex: 1,
                  overflow: "hidden",
                  backgroundColor: "#08090A",
                  aspectRatio: "3/4",
                  width: "100%",
                }}
              >
                {/* Desaturated / B&W Studio Editorial Portrait */}
                <img
                  src="/assets/images/thumbs/about-three-thumb.jpg"
                  alt="Abdullah Parvaiz — Portrait"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    filter: "grayscale(100%) contrast(120%) brightness(92%)",
                    transition: "filter 0.6s ease, transform 0.8s ease",
                  }}
                  onMouseEnter={(e) => {
                    const img = e.currentTarget;
                    img.style.filter = "grayscale(80%) contrast(125%) brightness(96%)";
                    img.style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget;
                    img.style.filter = "grayscale(100%) contrast(120%) brightness(92%)";
                    img.style.transform = "scale(1)";
                  }}
                />

                {/* Overlapping Architectural Caption Tag */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "16px",
                    backgroundColor: "#08090A",
                    color: "#F3F1ED",
                    padding: "8px 16px",
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    border: "1px solid rgba(243, 241, 237, 0.2)",
                  }}
                >
                  ABDULLAH PARVAIZ // 2026
                </div>
              </motion.div>

              {/* Corner Signal Indicator */}
              <div
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-6px",
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#FF5A36",
                  zIndex: 2,
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* ── THREE LARGE SPECIALIZATION TAGS ─────────────────────────── */}
        <div className="tw-mt-24">
          <div
            style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#BFC2C5",
              marginBottom: "24px",
            }}
          >
            [ SPECIALIZATIONS ]
          </div>

          <motion.div
            variants={gridLineVariants}
            initial="hidden"
            animate="visible"
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "#08090A",
              transformOrigin: "left",
              marginBottom: "32px",
              opacity: 0.15,
            }}
          />

          <div className="row tw-gy-6">
            {SPECIALIZATIONS.map((spec, i) => (
              <div key={spec.number} className="col-md-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  style={{
                    padding: "28px 24px",
                    border: "1px solid rgba(8, 9, 10, 0.12)",
                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                    transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    const card = e.currentTarget;
                    card.style.backgroundColor = "#08090A";
                    card.style.color = "#F3F1ED";
                    card.style.borderColor = "#08090A";
                    card.style.transform = "translateY(-4px)";
                    const num = card.querySelector(".spec-num") as HTMLElement;
                    if (num) num.style.color = "#FF5A36";
                    const title = card.querySelector(".spec-title") as HTMLElement;
                    if (title) title.style.color = "#F3F1ED";
                    const sub = card.querySelector(".spec-sub") as HTMLElement;
                    if (sub) sub.style.color = "#BFC2C5";
                  }}
                  onMouseLeave={(e) => {
                    const card = e.currentTarget;
                    card.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
                    card.style.color = "#08090A";
                    card.style.borderColor = "rgba(8, 9, 10, 0.12)";
                    card.style.transform = "translateY(0)";
                    const num = card.querySelector(".spec-num") as HTMLElement;
                    if (num) num.style.color = "#08090A";
                    const title = card.querySelector(".spec-title") as HTMLElement;
                    if (title) title.style.color = "#08090A";
                    const sub = card.querySelector(".spec-sub") as HTMLElement;
                    if (sub) sub.style.color = "#55585D";
                  }}
                >
                  <div
                    className="spec-num"
                    style={{
                      fontFamily: "'Space Grotesk', monospace",
                      fontSize: "1.6rem",
                      fontWeight: 700,
                      marginBottom: "12px",
                      color: "#08090A",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {spec.number}
                  </div>

                  <h3
                    className="spec-title"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      margin: "0 0 6px 0",
                      color: "#08090A",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {spec.title}
                  </h3>

                  <p
                    className="spec-sub"
                    style={{
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: "0.85rem",
                      color: "#55585D",
                      margin: 0,
                      transition: "color 0.3s ease",
                    }}
                  >
                    {spec.subtitle}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PERSONAL METADATA DETAILS (EDITORIAL GRID) ─────────────── */}
        <div className="tw-mt-20 tw-pt-12 tw-pb-16 tw-border-t tw-border-neutral-300">
          <div className="row tw-gy-8">
            {METADATA.map((meta, i) => (
              <div key={meta.label} className="col-6 col-md-3">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', monospace",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#777A80",
                      marginBottom: "6px",
                    }}
                  >
                    {meta.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.92rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#08090A",
                    }}
                  >
                    {meta.value}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default AboutMePage;
