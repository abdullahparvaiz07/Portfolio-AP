import React, { useState } from "react";
import { ServicesPage } from "./ServicesPage";

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tags: string[];
  image: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "service-1",
    number: "01",
    title: "UI/UX & Product Design",
    tags: ["User Research", "Figma Design Systems", "Prototyping"],
    image: "/assets/images/thumbs/service-three-thumb1.png",
  },
  {
    id: "service-2",
    number: "02",
    title: "Full-Stack Development",
    tags: ["React & Next.js", "TypeScript", "Node.js & APIs, Database"],
    image: "/assets/images/thumbs/service-three-thumb3.png",
  },
  {
    id: "service-3",
    number: "03",
    title: "AI Agents & Automation",
    tags: ["OpenAI API", "N8N", "Vector DBs & Workflows"],
    image: "/assets/images/thumbs/service-three-thumb2 (2).png",
  },
  {
    id: "service-4",
    number: "04",
    title: "Branding & Visual Systems",
    tags: ["Brand Identity", "Typography Systems", "Design Tokens"],
    image: "/assets/images/thumbs/service-three-thumb4.png",
  },
];

export const Services: React.FC = () => {
  const [showServicesPage, setShowServicesPage] = useState(false);

  return (
    <>
      <section id="services" className="service-three-area bg-black pt-120 tw-pb-15">
        {/* ======================== Marquee Section =========================== */}
        <div className="marquee tw-pt-17 bg-black overflow-hidden relative w-full flex" style={{ flexDirection: "row" }}>
          {/* We output twice for a seamless infinite loop animation */}
          <div className="d-flex align-items-center justify-content-between tw-gap-16 w-max animate-[marquee_25s_linear_infinite] whitespace-nowrap">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="d-inline-flex align-items-center">
                <h2 className={`marquee-two-title marquee-three-title text-uppercase ${idx % 2 === 0 ? "text-white" : "text-stroke"}`}>
                  Services <span className="text-white">-</span>
                </h2>
              </div>
            ))}
          </div>
          <div className="d-flex align-items-center justify-content-between tw-gap-16 w-max animate-[marquee_25s_linear_infinite] whitespace-nowrap" aria-hidden="true">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="d-inline-flex align-items-center">
                <h2 className={`marquee-two-title marquee-three-title text-uppercase ${idx % 2 === 0 ? "text-white" : "text-stroke"}`}>
                  Services <span className="text-white">-</span>
                </h2>
              </div>
            ))}
          </div>
        </div>
        {/* ======================== Marquee Section End =========================== */}

        <div className="container tw-container-1800-px">
          <div className="row">
            <div className="col-12">
              <div className="service-three-wrapper">
                {SERVICES_DATA.map((service, index) => {
                  const alignClass = index % 2 === 0 ? "" : "ms-auto";
                  const animDir = index % 2 === 0 ? "fade-right" : "fade-left";
                  const delay = 200 + index * 100;

                  return (
                    <div
                      key={service.id}
                      className={`service-three-single ${alignClass}`}
                      data-aos={animDir}
                      data-aos-duration="2000"
                      data-aos-delay={delay}
                      onClick={() => setShowServicesPage(true)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="service-three-item d-flex justify-content-between align-items-center">
                        <div className="service-three-content d-flex tw-gap-14">
                          <div>
                            <span className="service-three-number text-white tw-text-xl d-inline-flex align-items-center tw-gap-3 lh-1 tw-mt-5 tw-transition-3">
                              {service.number}
                              <img
                                className="tw-transition-3"
                                src="/assets/images/icons/service-three-arrow.svg"
                                alt="arrow"
                              />
                            </span>
                          </div>
                          <div>
                            <div>
                              <h2 className="service-three-title tw-text-15 text-white tw-mb-4">
                                <span>{service.title}</span>
                              </h2>
                            </div>
                            <div className="portfolio-list portfolio-two-list">
                              <ul className="d-flex tw-gap-205 flex-wrap">
                                {service.tags.map((tag, tagIdx) => (
                                  <li key={tagIdx}>
                                    <span
                                      className="text-uppercase text-white tw-text-sm fw-medium position-relative z-1 hover-bg-main-two-600 hover-border-main-two-600 hover-text-heading tw-transition-3"
                                    >
                                      {tag}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="service-three-thumb" style={{ maxWidth: "440px", width: "100%", flexShrink: 0 }}>
                          <img src={service.image} alt={service.title} style={{ width: "100%", height: "auto", display: "block" }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Trigger Button */}
              <div className="tw-mt-12 text-center">
                <button
                  onClick={() => setShowServicesPage(true)}
                  style={{
                    backgroundColor: "#FF5A36",
                    color: "#FFFFFF",
                    border: "none",
                    padding: "16px 36px",
                    borderRadius: "100px",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    boxShadow: "0 8px 24px rgba(255, 90, 54, 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px) scale(1.03)";
                    e.currentTarget.style.boxShadow = "0 16px 36px rgba(255, 90, 54, 0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 90, 54, 0.3)";
                  }}
                >
                  EXPLORE ALL SERVICES DEEP DIVE <span>↗</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Services Page Overlay */}
      {showServicesPage && (
        <ServicesPage onClose={() => setShowServicesPage(false)} />
      )}
    </>
  );
};
