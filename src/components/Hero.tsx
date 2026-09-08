import React, { useEffect, useState, useRef } from "react";
import { TechCube } from "./TechCube";
import WireframeSphere from "./WireframeSphere";
import { FlipText } from "./FlipText";

// Reusable Counter component that triggers animation on intersection
export const Counter: React.FC<{ end: number; duration?: number }> = ({ end, duration = 1500 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const totalFrames = Math.round(duration / 16);
    const increment = end / totalFrames;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      start = Math.min(Math.round(increment * frame), end);
      setCount(start);

      if (start === end) {
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return <span ref={elementRef}>{count}</span>;
};

export const Hero: React.FC = () => {
  return (
    <section id="home" className="banner-three-area">
      <div className="container tw-container-1800-px">
        <div className="row">
          <div className="col-xl-12">
            <div className="banner-three-wrapper position-relative z-1">
              
              {/* Center Wireframe Sphere */}
              <div 
                className="position-absolute start-50 top-50"
                style={{ 
                  zIndex: 0, 
                  pointerEvents: "none", 
                  transform: "translate(-50%, -50%)",
                  width: "min(380px, 35vw)",
                  height: "min(380px, 35vw)",
                }}
              >
                <WireframeSphere />
              </div>

              <h1 className="banner-three-title text-black tw-mb-30" style={{ fontSize: "11.5vw", whiteSpace: "nowrap", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em", textTransform: "uppercase", textAlign: "center", position: "relative", zIndex: 1 }}>
                <FlipText>Abdullah Parvaiz</FlipText>
              </h1>
              <div className="banner-three-wrap d-flex justify-content-between align-items-end position-relative z-1">
                {/* Left Panel */}
                <div
                  className="banner-three-left tw-rounded-lg"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay="200"
                >
                  {/* Rotating Stamp Badge with TechCube positioned directly above Hello! text */}
                  <div className="tw-mb-6 d-inline-block position-relative" style={{ width: "180px", height: "180px" }}>
                    <div className="position-relative w-100 h-100 d-flex align-items-center justify-content-center">
                      <style>{`
                        @keyframes slowSpin {
                          from { transform: rotate(0deg); }
                          to { transform: rotate(360deg); }
                        }
                      `}</style>
                      {/* Rotating Text Circle */}
                      <svg 
                        className="w-100 h-100" 
                        viewBox="0 0 200 200"
                        style={{ animation: "slowSpin 35s linear infinite" }}
                      >
                        <path
                          id="textPath"
                          d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                          fill="none"
                        />
                        <text fill="#111111" style={{ fontSize: "9px", fontWeight: "bold", letterSpacing: "2.5px", textTransform: "uppercase", fontFamily: "'Space Grotesk', sans-serif", opacity: 0.25 }}>
                          <textPath href="#textPath" startOffset="0%">
                            • Full Stack • Frontend • Backend • AI Agent Developer • UI/UX Designer
                          </textPath>
                        </text>
                      </svg>
                      
                      {/* Center Symbol: 3D Tech Cube */}
                      <div className="position-absolute" style={{ pointerEvents: "auto" }}>
                        <TechCube />
                      </div>
                    </div>
                  </div>

                  <h2 className="banner-three-left-title tw-text-3xl tw-mb-6">
                    Hello! I'm Abdullah <br />
                    Parvaiz. a Full Stack Web developer.
                  </h2>
                  <div className="banner-three-list">
                    <ul>
                      {[
                        "Web Development",
                        "Branding & Identity",
                        "Creative Strategy",
                        "UI/UX Design",
                        "Frontend Development",
                      ].map((item, index) => (
                        <li
                          key={index}
                          className="tw-text-lg fw-medium d-inline-flex align-items-center tw-gap-2 tw-mb-4"
                        >
                          <span>
                            <img src="/assets/images/icons/banner-three-pluse.svg" alt="plus" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Center Title & Action */}
                <div
                  className="banner-three-center text-center"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay="200"
                >
                  <h3 className="banner-three-center-title tw-text-120">
                    Design, branding and web development made better.
                  </h3>
                  <div className="banner-three-button">
                    <a
                      className="tw-hover-btn bg-black text-white fw-bold tw-py-4 tw-px-10 d-inline-block hover-text-white text-uppercase tw-rounded-lg"
                      href="#works"
                    >
                      view projects
                      <span className="tw-hover-btn-circle-dot bg-main-two-600"></span>
                    </a>
                  </div>
                </div>

                {/* Right Panel: Counters */}
                <div
                  className="banner-three-right tw-rounded-lg"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay="300"
                >
                  {/* Stat 1 */}
                  <div className="banner-three-counter-item tw-rounded-md tw-mb-4 position-relative">
                    <h4 className="banner-three-counter-title tw-text-101 fw-semibold font-heading text-heading tw-mb-2 lh-1">
                      <Counter end={98} />%
                    </h4>
                    <p className="banner-three-counter-paragraph tw-text-lg fw-medium text-heading">
                      Client Satisfaction Rate
                    </p>
                  </div>

                  {/* Stat 2 */}
                  <div className="banner-three-counter-item tw-rounded-md tw-mb-4 ms-auto bg-black">
                    <h4 className="banner-three-counter-title tw-text-101 fw-semibold font-heading text-white tw-mb-2 lh-1">
                      <Counter end={70} />+
                    </h4>
                    <p className="banner-three-counter-paragraph tw-text-lg fw-medium text-white">
                      Projects Launched
                    </p>
                  </div>

                  {/* Stat 3 */}
                  <div className="banner-three-counter-item tw-rounded-md tw-mb-4">
                    <div className="d-flex align-items-center tw-mb-2">
                      {["team-img1.png", "team-img2.png", "team-img3.png", "team-img4.png"].map(
                        (imgName, idx) => (
                          <div
                            key={idx}
                            className="tw-w-9 tw-h-9 rounded-circle overflow-hidden tw-duration-300 hover-scale-2 tw-hover-z-9 position-relative border border-2 border-white"
                            style={{
                              marginLeft: idx > 0 ? "-16px" : "0px",
                              zIndex: idx + 1,
                            }}
                          >
                            <img
                              src={`/assets/images/thumbs/${imgName}`}
                              alt="Client"
                              className="w-100 h-100 object-fit-cover"
                            />
                          </div>
                        )
                      )}
                    </div>
                    <h4 className="banner-three-counter-title tw-text-101 fw-semibold font-heading text-heading tw-mb-2 lh-1">
                      <Counter end={96} />+
                    </h4>
                    <p className="banner-three-counter-paragraph tw-text-lg fw-medium text-heading">
                      Global Clients and Growing
                    </p>
                  </div>
                </div>

                {/* Shapes */}
                <div className="banner-three-line-shape position-absolute start-50 translate-middle-x z-n1">
                  <img src="/assets/images/shapes/banner-three-shape.png" alt="shape" />
                  <div className="banner-three-carcel-shape">
                    <div>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
