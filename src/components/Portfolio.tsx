import React, { useEffect, useRef } from "react";

interface ProjectItem {
  id: string;
  title: string;
  tags: string[];
  image: string;
  link: string;
}

const PORTFOLIO_DATA: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Epic Strategy App",
    tags: ["BRANDING", "web DESIGN"],
    image: "/assets/images/thumbs/portfolio-three-thumb1.jpg",
    link: "#portfolio-details",
  },
  {
    id: "proj-2",
    title: "Branding Identity",
    tags: ["BRANDING", "web DESIGN"],
    image: "/assets/images/thumbs/portfolio-three-thumb2.jpg",
    link: "#portfolio-details",
  },
  {
    id: "proj-3",
    title: "PixelCraft Mobile UI",
    tags: ["BRANDING", "web DESIGN"],
    image: "/assets/images/thumbs/portfolio-three-thumb3.jpg",
    link: "#portfolio-details",
  },
  {
    id: "proj-4",
    title: "Creative Studio",
    tags: ["BRANDING", "web DESIGN"],
    image: "/assets/images/thumbs/portfolio-three-thumb4.jpg",
    link: "#portfolio-details",
  },
];

export const Portfolio: React.FC = () => {
  const areaRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;

    // Registers standard ScrollTrigger
    gsap.registerPlugin(window.ScrollTrigger);

    // Pin the background "works" title watermark
    const trigger = gsap.to(shapeRef.current, {
      scrollTrigger: {
        trigger: areaRef.current,
        start: "top center-=200",
        pin: shapeRef.current,
        end: "bottom bottom-=200",
        markers: false,
        pinSpacing: false,
        scrub: 1,
      },
    });

    return () => {
      // Clean up GSAP trigger on component unmount
      if (trigger.scrollTrigger) {
        trigger.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section ref={areaRef} id="works" className="portfolio-three-area py-120 position-relative z-1 overflow-hidden">
      {/* Scroll pinned title background shape */}
      <div 
        ref={shapeRef} 
        className="portfolio-three-shape position-absolute top-0 start-0 w-100 d-flex justify-content-center overflow-hidden z-n1"
        style={{ pointerEvents: "none", width: "100%", left: 0, right: 0 }}
      >
        <h4 
          className="portfolio-three-shape-title text-center text-uppercase"
          style={{
            fontSize: "clamp(90px, 20vw, 360px)",
            width: "100%",
            textAlign: "center",
            letterSpacing: "0.04em",
            lineHeight: 0.85,
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          WORK
        </h4>
      </div>

      <div className="container tw-container-1800-px">
        <div className="row">
          <div className="col-xl-12">
            <div className="portfolio-three-wrapper d-flex justify-content-between flex-wrap align-items-start position-relative z-1">
              {PORTFOLIO_DATA.map((project) => (
                <div
                  key={project.id}
                  className="portfolio-three-item tw-rounded-lg tw-mb-705 portfolio-wrapper"
                >
                  <div className="portfolio-three-wrap d-flex justify-content-between flex-wrap row-gap-2">
                    <div className="tw-mb-6">
                      <div>
                        <h2 className="tw-text-605 fw-medium tw-mb-4">
                          <a className="hover-text-main-two-600" href={project.link}>
                            {project.title}
                          </a>
                        </h2>
                      </div>
                      <div className="portfolio-three-list portfolio-list">
                        <ul className="d-flex tw-gap-205 flex-wrap">
                          {project.tags.map((tag, tagIdx) => (
                            <li key={tagIdx}>
                              <a
                                className="text-uppercase text-heading fw-medium position-relative z-1 hover-bg-main-two-600 hover-border-main-two-600 hover-text-white tw-transition-3"
                                href="#works"
                              >
                                {tag}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div>
                      <div className="portfolio-three-button">
                        <a
                          className="portfolio-three-btn tw-w-8 tw-h-8 lh-1 d-inline-flex justify-content-center align-items-center text-heading rounded-circle hover-bg-main-two-600 hover-text-white"
                          href={project.link}
                        >
                          <i className="ph ph-arrow-up-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Portfolio Card Thumbnail */}
                  <div
                    className="portfolio-thumb not-hide-cursor fw-bold mb-0 tw-rounded-lg"
                    data-cursor="View"
                  >
                    <a className="d-block cursor-hide tw-rounded-lg" href={project.link}>
                      <img className="w-100 tw-rounded-lg" src={project.image} alt={project.title} />
                    </a>
                  </div>
                </div>
              ))}
              {/* Custom Action Row */}
              <div className="portfolio-action-row">
                <a className="tw-btn-premium-outline" href="#works">
                  <span>Explore Archive</span>
                  <i className="ph ph-arrow-right"></i>
                </a>
                <a className="tw-btn-premium-filled" href="#contact">
                  <span className="tw-btn-dot"></span>
                  <span>Let's Connect</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
