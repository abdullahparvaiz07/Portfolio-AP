import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RubiksCube } from "./RubiksCube";
import { AboutMePage } from "./AboutMePage";
import { Plus } from "lucide-react";

interface Principle {
  number: string;
  title: string;
  description: string;
  tag: string;
}

const PRINCIPLES: Principle[] = [
  {
    number: "01",
    title: "CRAFT & PRECISION",
    tag: "DESIGN SYSTEM",
    description: "Every pixel, transition, and micro-interaction is designed with intentionality and aesthetic rigor.",
  },
  {
    number: "02",
    title: "ENGINEERING RIGOR",
    tag: "ARCHITECTURE",
    description: "Clean, modular code built for speed, accessibility, scale, and long-term maintainability.",
  },
  {
    number: "03",
    title: "PRODUCT VISION",
    tag: "STRATEGY",
    description: "Bridging business goals and user needs into intuitive digital products that convert.",
  },
];

export const About: React.FC = () => {
  const [showAboutMePage, setShowAboutMePage] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const signatureRef = useRef<SVGPathElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const toggleExpand = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedIndex((prev) => (prev === index ? null : index));

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 320);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Title reveal animation
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll(".about-title-word");
      gsap.fromTo(
        words,
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top bottom-=80",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Signature drawing animation
    if (signatureRef.current) {
      const pathLength = signatureRef.current.getTotalLength();
      gsap.set(signatureRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });
      gsap.to(signatureRef.current, {
        strokeDashoffset: 0,
        duration: 2.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: signatureRef.current,
          start: "top bottom-=60",
          toggleActions: "play none none none",
        },
      });
    }

    // Magnetic stats hover drift
    const statsContainer = statsRef.current;
    if (statsContainer) {
      const items = statsContainer.querySelectorAll(".about-stat-item");
      const mouseMoveHandlers: Array<{ el: HTMLElement; fn: (e: MouseEvent) => void }> = [];
      const mouseLeaveHandlers: Array<{ el: HTMLElement; fn: () => void }> = [];

      items.forEach((itemNode) => {
        const item = itemNode as HTMLElement;
        
        const onMouseMove = (e: MouseEvent) => {
          const rect = item.getBoundingClientRect();
          const relX = e.clientX - rect.left;
          const relY = e.clientY - rect.top;
          gsap.to(item, {
            duration: 0.8,
            x: ((relX - rect.width / 2) / rect.width) * 15,
            y: ((relY - rect.height / 2) / rect.height) * 15,
            ease: "power2.out",
          });
        };

        const onMouseLeave = () => {
          gsap.to(item, {
            duration: 0.8,
            x: 0,
            y: 0,
            ease: "power2.out",
          });
        };

        item.addEventListener("mousemove", onMouseMove);
        item.addEventListener("mouseleave", onMouseLeave);

        mouseMoveHandlers.push({ el: item, fn: onMouseMove });
        mouseLeaveHandlers.push({ el: item, fn: onMouseLeave });
      });

      return () => {
        mouseMoveHandlers.forEach(({ el, fn }) => el.removeEventListener("mousemove", fn));
        mouseLeaveHandlers.forEach(({ el, fn }) => el.removeEventListener("mouseleave", fn));
      };
    }
  }, []);

  return (
    <>
      <section
        id="about"
        className="about-three-area py-120 position-relative z-1"
        style={{
          background: "#f8f8f8",
          borderTop: "1px solid #eaeaea",
          borderBottom: "1px solid #eaeaea",
          overflow: "hidden",
        }}
      >
        <div className="container tw-container-1800-px">
          <div className="about-three-top position-relative z-1">
            
            {/* Main About Layout */}
            <div className="row tw-gap-y-12 align-items-start justify-content-between">
              
              {/* Left Column: Heading and Number */}
              <div
                className="col-lg-5 lg:tw-border-r tw-border-neutral-200 lg:tw-pr-12"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="200"
              >
                <div
                  className="text-uppercase fw-bold text-black tw-mb-4 d-flex align-items-center tw-gap-3"
                  style={{ letterSpacing: "0.15em", fontSize: "0.75rem", opacity: 0.5 }}
                >
                  <span style={{ width: "20px", height: "1px", background: "black", display: "inline-block" }}></span>
                  ABOUT US
                </div>
                
                <div className="tw-text-xl fw-bold text-black tw-mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <span className="tw-border-b-2 tw-border-black tw-pb-2">02</span>
                </div>
                
                <h2
                  ref={titleRef}
                  className="text-black fw-bold tw-leading-none tw-m-0"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    letterSpacing: "0.03em",
                    fontSize: "clamp(4.2rem, 7.5vw, 9.5rem)",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <span className="about-title-word" style={{ display: "inline-block" }}>I DON'T JUST</span>
                  </div>
                  <div style={{ overflow: "hidden" }}>
                    <span className="about-title-word" style={{ display: "inline-block" }}>BUILD WEBSITES.</span>
                  </div>
                </h2>
              </div>

              {/* Right Column: Copywriting, Stats & Actions */}
              <div
                className="col-lg-6"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="300"
              >
                <div className="tw-max-w-xl">
                  {/* Availability Status Badge */}
                  <div className="d-inline-flex align-items-center tw-gap-2 tw-bg-white tw-px-4 tw-py-2 tw-rounded-full tw-mb-6 border border-neutral-200 shadow-sm">
                    <span className="position-relative d-flex tw-h-2.5 tw-w-2.5">
                      <span className="animate-ping position-absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span
                      className="text-neutral-800 fw-bold text-uppercase"
                      style={{ fontSize: "0.68rem", letterSpacing: "0.08em", fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Available for remote & freelance work
                    </span>
                  </div>

                  <p
                    className="tw-text-2xl lg:tw-text-3xl fw-medium text-black tw-mb-6 tw-leading-snug"
                    style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                  >
                    I design systems, interfaces and digital experiences that make ideas feel real.
                  </p>
                  
                  <p
                    className="tw-text-lg text-neutral-600 tw-mb-8 tw-leading-relaxed"
                    style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                  >
                    From concept to product, I help startups and businesses bring their ideas to life with clean design, solid code and thoughtful experiences. I enjoy transforming complex ideas into simple, powerful experiences. I care about the details—from the first interaction to the final line of code.
                  </p>

                   {/* Micro Stats Bar */}
                  <div ref={statsRef} className="d-flex align-items-center tw-gap-8 tw-mb-10 tw-py-4 tw-border-t tw-border-b tw-border-neutral-200 flex-wrap">
                    <div className="about-stat-item" style={{ transition: "transform 0.1s ease" }}>
                      <div className="fw-bold text-black tw-text-2xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>5+</div>
                      <div className="text-neutral-500 tw-text-xs text-uppercase fw-semibold" style={{ letterSpacing: "0.05em" }}>Years Experience</div>
                    </div>
                    <div style={{ width: "1px", height: "30px", background: "#e0e0e0" }} />
                    <div className="about-stat-item" style={{ transition: "transform 0.1s ease" }}>
                      <div className="fw-bold text-black tw-text-2xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>70+</div>
                      <div className="text-neutral-500 tw-text-xs text-uppercase fw-semibold" style={{ letterSpacing: "0.05em" }}>Projects Delivered</div>
                    </div>
                    <div style={{ width: "1px", height: "30px", background: "#e0e0e0" }} />
                    <div className="about-stat-item" style={{ transition: "transform 0.1s ease" }}>
                      <div className="fw-bold text-black tw-text-2xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>98%</div>
                      <div className="text-neutral-500 tw-text-xs text-uppercase fw-semibold" style={{ letterSpacing: "0.05em" }}>Client Satisfaction</div>
                    </div>
                  </div>

                  {/* Actions: Link & Signature */}
                  <div className="d-flex align-items-center tw-gap-12 flex-wrap">
                    <button
                      onClick={() => setShowAboutMePage(true)}
                      className="bg-transparent border-0 text-black fw-bold text-uppercase tw-text-sm tw-border-b-2 tw-border-black tw-pb-2 hover:tw-border-neutral-500 tw-transition-all d-inline-flex align-items-center tw-gap-2 cursor-pointer p-0"
                      style={{ letterSpacing: "0.1em" }}
                      aria-label="More About Abdullah Parvaiz"
                    >
                      MORE ABOUT ME <span>↗</span>
                    </button>

                    {/* Fluid Handwritten SVG Signature */}
                    <svg width="130" height="50" viewBox="0 0 150 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        ref={signatureRef}
                        d="M15 45c10-25 25-35 35-30 8 4-2 25-10 32-12 11-20 4-10-8 15-18 45-28 65-20 10 4 2 20-5 25-6 4-12 1-5-6 10-10 30-15 45-12"
                        stroke="black"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.85"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Row: Interactive 3D Rubik's Cube Showcase */}
            <div
              className="row justify-content-center tw-mt-16 tw-mb-16"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="400"
            >
              <div className="col-lg-5 d-flex justify-content-center position-relative">
                <RubiksCube />
              </div>
            </div>

            {/* ================= EXPANDABLE ACCORDION PRINCIPLES SECTION ================= */}
            <div
              className="tw-mt-12 tw-mb-16"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="450"
            >
              {/* Centered Sub-Header Tag */}
              <div className="text-center tw-mb-6">
                <span className="font-mono text-[10px] md:text-xs font-semibold tracking-[0.25em] text-neutral-500 uppercase">
                  COMPLEXITY → CLARITY
                </span>
              </div>

              {/* Expandable Principles Accordion List */}
              <div className="border-t border-black/15">
                {PRINCIPLES.map((p, index) => {
                  const isExpanded = expandedIndex === index;
                  return (
                    <div
                      key={p.number}
                      className="border-b border-black/15 transition-all duration-300 hover:bg-black/[0.02] cursor-pointer"
                      onClick={(e) => toggleExpand(e, index)}
                    >
                      {/* Compact Header Bar */}
                      <div className="py-5 md:py-6 px-2 md:px-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-6 md:gap-12 flex-1">
                          {/* Number */}
                          <span className="font-display text-4xl md:text-5xl font-normal text-[#090909] leading-none min-w-[45px]">
                            {p.number}
                          </span>

                          {/* Title */}
                          <h3 className="font-bold text-base md:text-lg tracking-wide uppercase text-[#090909] m-0 font-sans">
                            {p.title}
                          </h3>

                          {/* Tag */}
                          <span className="font-mono text-xs font-semibold tracking-[0.15em] text-neutral-500 uppercase hidden sm:inline-block">
                            • {p.tag}
                          </span>
                        </div>

                        {/* Right side + / - expand button */}
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-xs font-semibold tracking-[0.15em] text-neutral-500 uppercase sm:hidden">
                            • {p.tag}
                          </span>
                          <button
                            type="button"
                            aria-label={`Toggle details for ${p.title}`}
                            onClick={(e) => toggleExpand(e, index)}
                            className={`w-9 h-9 rounded-full border border-black/20 flex items-center justify-center transition-all duration-300 ${
                              isExpanded
                                ? "bg-[#f04a22] text-white border-[#f04a22] rotate-45"
                                : "bg-transparent text-black hover:bg-black hover:text-white"
                            }`}
                          >
                            <Plus size={18} strokeWidth={2} />
                          </button>
                        </div>
                      </div>

                      {/* Expandable Body */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isExpanded
                            ? "max-h-40 opacity-100 pb-6 px-2 md:px-4 pl-[70px] md:pl-[105px]"
                            : "max-h-0 opacity-0 pb-0"
                        }`}
                      >
                        <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-normal m-0 max-w-3xl">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* ================= FULL-BLEED DISCIPLINE MARQUEE STRIP ================= */}
        <div
          className="w-100 overflow-hidden tw-py-5 tw-mt-10 position-relative z-1"
          style={{
            background: "#f4f4f4",
            borderTop: "1px solid #e2e2e2",
            borderBottom: "1px solid #e2e2e2",
          }}
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="400"
        >
          <div
            className="d-flex align-items-center"
            style={{
              width: "max-content",
              animation: "marquee 30s linear infinite",
              willChange: "transform",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.animationPlayState = "paused";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.animationPlayState = "running";
            }}
          >
            {/* First half for marquee (50% of track) */}
            <div className="d-flex align-items-center flex-nowrap" style={{ flexShrink: 0 }}>
              {[...Array(3)].map((_, setIdx) => (
                <React.Fragment key={`first-${setIdx}`}>
                  {["DESIGN", "DEVELOPMENT", "AI", "PRODUCT", "BRANDING", "STRATEGY"].map((item) => (
                    <div key={`item-${setIdx}-${item}`} className="d-flex align-items-center flex-nowrap">
                      <span
                        className="fw-bold text-black text-uppercase tw-text-xs md:tw-text-sm"
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          letterSpacing: "0.22em",
                          padding: "0 2.5rem",
                          whiteSpace: "nowrap",
                          userSelect: "none",
                          transition: "color 0.25s ease, transform 0.25s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#f04a22";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "#000000";
                        }}
                      >
                        {item}
                      </span>
                      <span
                        style={{
                          color: "#c0c0c0",
                          fontSize: "1.1rem",
                          fontWeight: 300,
                          userSelect: "none",
                        }}
                      >
                        |
                      </span>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>

            {/* Second identical half for seamless infinite loop (50% of track) */}
            <div className="d-flex align-items-center flex-nowrap" style={{ flexShrink: 0 }} aria-hidden="true">
              {[...Array(3)].map((_, setIdx) => (
                <React.Fragment key={`second-${setIdx}`}>
                  {["DESIGN", "DEVELOPMENT", "AI", "PRODUCT", "BRANDING", "STRATEGY"].map((item) => (
                    <div key={`second-item-${setIdx}-${item}`} className="d-flex align-items-center flex-nowrap">
                      <span
                        className="fw-bold text-black text-uppercase tw-text-xs md:tw-text-sm"
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          letterSpacing: "0.22em",
                          padding: "0 2.5rem",
                          whiteSpace: "nowrap",
                          userSelect: "none",
                          transition: "color 0.25s ease, transform 0.25s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#f04a22";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "#000000";
                        }}
                      >
                        {item}
                      </span>
                      <span
                        style={{
                          color: "#c0c0c0",
                          fontSize: "1.1rem",
                          fontWeight: 300,
                          userSelect: "none",
                        }}
                      >
                        |
                      </span>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div>
          <img
            className="about-three-shape position-absolute start-0 w-100"
            src="/assets/images/shapes/about-three-shape.png"
            alt="shape"
          />
        </div>
      </section>

      {/* Full Page About Me Modal View */}
      {showAboutMePage && (
        <AboutMePage onClose={() => setShowAboutMePage(false)} />
      )}
    </>
  );
};

export default About;
