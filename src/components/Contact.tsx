import React, { useState, useEffect, useRef } from "react";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  // GSAP SplitText headline animation on scroll
  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap || !window.ScrollTrigger || !window.SplitText) return;

    const timer = setTimeout(() => {
      const headline = headlineRef.current;
      if (!headline) return;

      const split = new window.SplitText(headline, { type: "chars" });

      gsap.fromTo(
        split.chars,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.03,
          scrollTrigger: {
            trigger: headline,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ firstName: "", email: "", message: "" });
    }, 4000);
  };

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isLabelActive = (field: string, value: string) =>
    focusedField === field || value.length > 0;

  return (
    <section id="contact" className="contact-section">
      {/* ═══════════════════════════════════════════════════════
          ACT 1 — THE STATEMENT
      ═══════════════════════════════════════════════════════ */}
      <div className="container tw-container-1800-px">
        <div className="contact-hero">
          <h2
            ref={headlineRef}
            className="contact-headline"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="100"
          >
            Let's Build Something{" "}
            <span className="contact-headline-accent">Extraordinary</span>
          </h2>
          <p
            className="contact-subline"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="300"
          >
            Have a project in mind? I'd love to hear about it. Let's
            collaborate and bring your vision to life.
          </p>
        </div>
      </div>

      {/* Decorative divider */}
      <div className="contact-divider" />

      {/* ═══════════════════════════════════════════════════════
          ACT 2 — THE DIALOGUE
      ═══════════════════════════════════════════════════════ */}
      <div className="container tw-container-1800-px">
        <div className="contact-body">
          <div className="contact-grid">
            {/* ── Left Column: Contact Info ── */}
            <div
              className="contact-info"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <span className="contact-info-label">Get in Touch</span>

              <a
                className="contact-info-item"
                href="mailto:abdullahparvaizofficial@gmail.com"
                aria-label="Send email to Abdullah"
              >
                abdullahparvaizofficial@gmail.com
              </a>
              <a
                className="contact-info-item"
                href="tel:+923166598137"
                aria-label="Call Abdullah"
              >
                +92 316 6598137
              </a>
              <span className="contact-info-item" style={{ cursor: "default" }}>
                Faisalabad, Pakistan
              </span>

              {/* Availability Indicator */}
              <div className="contact-availability">
                <span className="contact-availability-dot" aria-hidden="true" />
                <span className="contact-availability-text">
                  Available for freelance projects
                </span>
              </div>

              {/* Social Links — Uiverse.io by mahiatlinux */}
              <div className="contact-socials">
                <span className="contact-socials-label">Follow —</span>

                <ul className="example-1">
                  <li className="icon-content">
                    <a
                      href="https://www.linkedin.com/in/abdullah-parvaiz-4a0492386/"
                      aria-label="LinkedIn"
                      data-social="linkedin"
                      className="link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 24 24" width="26" height="26">
                        <path
                          d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </a>
                    <div className="tooltip">LinkedIn</div>
                  </li>
                  <li className="icon-content">
                    <a
                      href="https://www.spotify.com/"
                      aria-label="Spotify"
                      data-social="spotify"
                      className="link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg version="1.1" viewBox="0 0 100 100">
                        <path
                          d="M50,4C24.7,4,4,24.7,4,50s20.6,46,46,46s46-20.6,46-46S75.4,4,50,4z M71.6,71.5c0,0,0,0.1-0.1,0.1c-0.8,1.2-2,1.8-3.2,1.8 c-0.7,0-1.4-0.2-2-0.6c-10.2-6.3-23.3-7.7-38.8-4.1c-2.1,0.6-4-0.9-4.5-2.7c-0.6-2.3,0.9-4.1,2.7-4.6c17.7-4,32.6-2.3,44.4,5 c0.9,0.4,1.5,1,1.8,1.9C72.2,69.3,72.1,70.5,71.6,71.5z M76.9,59.3L76.9,59.3c-0.8,1.1-1.9,1.9-3.2,2.1c-0.2,0-0.5,0.1-0.7,0.1 c-0.8,0-1.6-0.3-2.3-0.7c-12-7.3-30.1-9.4-43.9-5c-2.5,0.6-5-0.7-5.6-3c-0.6-2.5,0.7-4.9,3-5.5c16.5-5,37.2-2.5,51.4,6.2 c0.8,0.4,1.5,1.3,1.8,2.5C77.9,57,77.6,58.3,76.9,59.3z M83.2,45.6c-1,1.4-2.7,2.1-4.4,2.1c-0.9,0-1.9-0.2-2.7-0.7c0,0,0,0,0,0 c-13.9-8.3-37.8-9.3-51.4-5.1c-2.7,0.8-5.5-0.7-6.4-3.3c-0.8-2.7,0.7-5.6,3.3-6.4c16.2-4.8,43-3.8,59.8,6.2 C83.8,39.6,84.7,42.9,83.2,45.6C83.3,45.5,83.3,45.5,83.2,45.6z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </a>
                    <div className="tooltip">Spotify</div>
                  </li>
                  <li className="icon-content">
                    <a
                      href="https://www.pinterest.com/"
                      aria-label="Pinterest"
                      data-social="pinterest"
                      className="link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg version="1.1" viewBox="0 0 100 100">
                        <path
                          d="M83,17.8C74.5,8.9,63.4,4.3,50,4.1C37.7,4.2,26.8,8.6,17.9,17.3C8.9,26,4.3,37,4.1,50c0,0,0,0,0,0c0,9.1,2.5,17.4,7.4,24.9 c4.9,7.4,11.6,13.2,20.1,17.1c0.3,0.1,0.7,0.1,1-0.1c0.3-0.2,0.5-0.5,0.5-0.8l0-4.9c0.1-2.1,0.7-5.3,1.7-9.5c1-4,1.7-6.7,1.9-7.6 c0.7-3,1.7-7.2,3-12.6c0.1-0.2,0-0.5-0.1-0.7c-0.4-0.8-1-2.6-1.5-6.6c0.1-2.7,0.8-5.2,2.1-7.3c1.2-2,3.1-3.1,5.7-3.5 c2,0.1,4.7,0.8,5.1,5.9c-0.1,1.8-0.8,4.5-1.9,8.1c-1.2,3.8-1.9,6.3-2.1,7.6c-0.7,2.5-0.2,4.8,1.5,6.8c1.6,1.9,3.8,2.9,6.5,3.1 c4.3-0.1,8.1-2.6,11.2-7.5c1.7-3,2.9-6.3,3.5-9.7c0.7-3.4,0.7-7.1,0-10.8c-0.7-3.8-2.2-7.1-4.5-9.8c0,0-0.1-0.1-0.1-0.1 c-4.3-3.7-9.5-5.3-15.6-5c-6,0.4-11.3,2.6-15.9,6.6c-2.9,3.2-4.8,7.1-5.7,11.6c-0.9,4.6,0,9.1,2.6,13.3c0.3,0.5,0.5,0.8,0.6,1 c0,0.3,0,1-0.5,2.8c-0.5,1.8-0.9,2.2-0.9,2.2c0,0-0.1,0-0.1,0.1c0,0-0.2,0-0.4-0.1c-2.2-1-3.9-2.4-5.2-4.2c-1.3-1.9-2.1-4-2.5-6.3 c-0.3-2.5-0.4-5-0.3-7.5c0.2-2.5,0.7-5.1,1.4-7.7c3-6.9,8.5-11.9,16.3-14.8c7.8-2.9,16-3.2,24.3-0.8c6.5,2.8,11,7.4,13.6,13.7 c2.5,6.4,2.8,13.4,0.8,20.8c-2.2,7.1-6.4,12.4-12.1,15.7c-5.6,2.8-10.8,3-15.7,0.7c-1.8-1.1-3.1-2.3-3.9-3.5c-0.2-0.3-0.6-0.5-1-0.5 c-0.4,0.1-0.7,0.3-0.8,0.7c-0.7,2.7-1.3,4.7-1.6,6.2c-1.4,5.4-2.6,9.2-3.4,11c-0.8,1.6-1.6,3.1-2.4,4.3c-0.2,0.3-0.2,0.6-0.1,0.9 s0.3,0.5,0.6,0.6c4.3,1.3,8.7,2,13,2c12.4-0.1,23.2-4.6,32.1-13.4C91.1,73.9,95.8,62.9,96,50C95.9,37.5,91.5,26.7,83,17.8z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </a>
                    <div className="tooltip">Pinterest</div>
                  </li>
                  <li className="icon-content">
                    <a
                      href="https://dribbble.com/"
                      aria-label="Dribbble"
                      data-social="dribbble"
                      className="link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg version="1.1" viewBox="0 0 100 100">
                        <path
                          d="M83.5,18.5C74.9,9.3,62.8,4,50.2,4c-6.1,0-12,1.1-17.6,3.4C15.2,14.5,4,31.3,4,50c0,13.9,6.2,26.9,17,35.7 C29.2,92.3,39.4,96,50,96c6.6,0,13.2-1.5,19.2-4.2c12.5-5.7,21.7-16.6,25.2-29.8C95.5,57.9,96,53.8,96,50 C96,38.3,91.6,27.1,83.5,18.5z M75,22.3c-0.7,0.9-1.4,1.8-2.1,2.6c-1.4,1.6-2.8,3-4.4,4.3c-0.3,0.3-0.6,0.6-1,0.8 c-1,0.9-2.1,1.7-3.2,2.5l-0.3,0.2c-1.1,0.7-2.2,1.5-3.5,2.2c-0.4,0.3-0.9,0.5-1.4,0.8c-0.8,0.5-1.7,0.9-2.7,1.4 c-0.6,0.3-1.2,0.5-1.8,0.8L54.3,38c-0.1,0-0.2,0.1-0.3,0.1c0,0,0,0,0,0c-1.3-2.6-2.4-4.9-3.5-7l-0.3-0.5c-1.1-2-2.2-4-3.3-6 l-0.7-1.3c-1.1-1.9-2.2-3.7-3.2-5.4l-0.7-1.1c-0.7-1.2-1.4-2.3-2.2-3.5c3.2-0.8,6.5-1.3,9.8-1.3c9.4,0,18.4,3.5,25.4,9.8 C75.3,21.9,75.2,22.1,75,22.3z M46.4,40.6c-1.4,0.4-2.9,0.8-4.4,1.1c-0.3,0-0.7,0.1-0.9,0.2c-6,1-12.5,1.4-19.4,1.1 c-0.3,0-0.6,0-0.9,0c-0.3,0-0.5,0-0.7,0c-2.5-0.2-4.9-0.4-7.2-0.7c2.3-11.2,9.6-20.9,19.8-26.1c2.1,3.3,4.2,6.7,6.3,10.3l0.4,0.7 c0.9,1.6,1.9,3.4,3.2,5.8l0.6,1.2C44.4,36.6,45.4,38.6,46.4,40.6z M24.4,51.1c2.2,0.1,4.2,0,6.2-0.1l0.7,0c0.4,0,0.9,0,1.3,0 c2.8-0.2,5.5-0.5,8.5-1c0.5-0.1,1-0.2,1.6-0.3l0.5-0.1c2.2-0.4,4.2-0.9,6.1-1.4c0.1,0,0.3-0.1,0.4-0.1l0.5,1.1 c1.2,2.8,2.3,5.5,3.3,8.1c0,0,0,0,0,0c-0.2,0.1-0.5,0.2-0.7,0.2c-2,0.6-4,1.4-5.9,2.2c-0.6,0.3-1.3,0.5-1.9,0.8 c-1.4,0.6-2.7,1.3-4.1,2.1l-0.3,0.2c-0.2,0.1-0.5,0.2-0.6,0.4c-1.5,0.9-3.1,1.9-4.7,3c-0.2,0.1-0.4,0.3-0.6,0.4 c-0.2,0.1-0.4,0.3-0.6,0.5c-1,0.7-2,1.5-3,2.3c-0.4,0.3-0.7,0.6-1.1,0.9l-0.3,0.3c-0.7,0.6-1.5,1.3-2.2,1.9l-0.2,0.2 c-0.4,0.4-0.7,0.7-1.1,1.1l-0.2,0.2c-0.6,0.6-1.3,1.3-2,2l-0.4,0.4c-0.2,0.2-0.4,0.4-0.5,0.6C16.1,69.9,12,60.2,12,50.3 c0,0,0.1,0,0.1,0c0.4,0,0.7,0,1.1,0.1c3.5,0.4,6.9,0.6,10.3,0.7C23.8,51,24.1,51.1,24.4,51.1z M29.5,81.9c0.2-0.2,0.3-0.4,0.5-0.5 c1-1.1,2-2.1,3-3c1.9-1.8,3.8-3.3,5.7-4.8c0.2-0.1,0.4-0.3,0.6-0.4c0.2-0.2,0.5-0.4,0.8-0.6c1.1-0.8,2.2-1.5,3.4-2.2 c0.1-0.1,0.2-0.1,0.3-0.2c0.1-0.1,0.2-0.1,0.3-0.2c1.4-0.8,2.9-1.6,4.5-2.3c0.3-0.1,0.6-0.2,0.8-0.4l0.6-0.3 c1.1-0.5,2.2-0.9,3.5-1.4c0.5-0.2,1.1-0.4,1.7-0.6l0.2-0.1c0.4-0.1,0.7-0.2,1.1-0.3c0,0,0,0,0,0c1.1,3.2,2.3,6.4,3.3,9.8l0.1,0.4 c1.1,3.6,2,7.3,2.9,10.8C51.7,89.8,39.3,88.3,29.5,81.9C29.4,81.9,29.4,81.9,29.5,81.9z M65.6,62.9c0.7-0.1,1.3-0.2,2-0.2 c2-0.2,4-0.2,5.9-0.2c0.2,0,0.4,0,0.6,0l0.2,0c2.2,0.1,4.6,0.3,6.9,0.6c0.4,0.1,0.9,0.1,1.3,0.2l0.6,0.1c0.7,0.1,1.5,0.3,2.2,0.4 c-3,7.6-8.3,14-15.2,18.3c-0.8-3.1-1.7-6.2-2.6-9.2l-0.1-0.4c-0.9-3-1.9-6.1-3.1-9.5C64.8,63.1,65.2,63,65.6,62.9z M81.6,55.2 C80,55,78.4,54.9,77,54.8l-0.9-0.1c-0.9-0.1-1.9-0.1-2.8-0.2c-0.2,0-0.3,0-0.5,0c-0.2,0-0.4,0-0.6,0c-2,0-3.9,0.1-5.9,0.3 c-0.2,0-0.3,0-0.5,0.1c-0.1,0-0.2,0-0.3,0c-1.3,0.1-2.6,0.3-3.9,0.5c-0.1-0.1-0.1-0.3-0.2-0.4c-0.1-0.2-0.2-0.5-0.3-0.7 c-1.1-2.9-2.3-5.7-3.2-7.8l-0.3-0.6c-0.1-0.1-0.1-0.3-0.2-0.4c0,0,0,0,0.1,0c0.2-0.1,0.5-0.2,0.7-0.3c0.6-0.2,1.2-0.5,1.8-0.8 c1.2-0.5,2.4-1.2,3.6-1.8c0.1-0.1,0.3-0.2,0.5-0.2c0.2-0.1,0.5-0.2,0.7-0.4c1.5-0.9,2.9-1.8,4.2-2.7l0.3-0.2 c0.2-0.1,0.4-0.3,0.6-0.4c0.9-0.6,1.9-1.4,2.8-2.2c1.5-1.2,2.9-2.5,4.3-4c0.8-0.8,1.5-1.6,2.2-2.4l0.4-0.5c0.5-0.5,0.9-1.1,1.3-1.6 C85.5,34.3,88,42.1,88,50c0,2-0.2,4.1-0.5,6.1c-0.3,0-0.6-0.1-0.8-0.1c-0.4-0.1-0.7-0.1-1.1-0.2l-1.1-0.2 C83.5,55.5,82.5,55.3,81.6,55.2z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </a>
                    <div className="tooltip">Dribbble</div>
                  </li>
                  <li className="icon-content">
                    <a
                      href="https://telegram.org/"
                      aria-label="Telegram"
                      data-social="telegram"
                      className="link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg version="1.1" viewBox="0 0 100 100">
                        <path
                          d="M95,9.9c-1.3-1.1-3.4-1.2-7-0.1c0,0,0,0,0,0c-2.5,0.8-24.7,9.2-44.3,17.3c-17.6,7.3-31.9,13.7-33.6,14.5 c-1.9,0.6-6,2.4-6.2,5.2c-0.1,1.8,1.4,3.4,4.3,4.7c3.1,1.6,16.8,6.2,19.7,7.1c1,3.4,6.9,23.3,7.2,24.5c0.4,1.8,1.6,2.8,2.2,3.2 c0.1,0.1,0.3,0.3,0.5,0.4c0.3,0.2,0.7,0.3,1.2,0.3c0.7,0,1.5-0.3,2.2-0.8c3.7-3,10.1-9.7,11.9-11.6c7.9,6.2,16.5,13.1,17.3,13.9 c0,0,0.1,0.1,0.1,0.1c1.9,1.6,3.9,2.5,5.7,2.5c0.6,0,1.2-0.1,1.8-0.3c2.1-0.7,3.6-2.7,4.1-5.4c0-0.1,0.1-0.5,0.3-1.2 c3.4-14.8,6.1-27.8,8.3-38.7c2.1-10.7,3.8-21.2,4.8-26.8c0.2-1.4,0.4-2.5,0.5-3.2C96.3,13.5,96.5,11.2,95,9.9z M30,58.3l47.7-31.6 c0.1-0.1,0.3-0.2,0.4-0.3c0,0,0,0,0,0c0.1,0,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2-0.1c-0.1,0.1-0.2,0.4-0.4,0.6L66,38.1 c-8.4,7.7-19.4,17.8-26.7,24.4c0,0,0,0,0,0.1c0,0-0.1,0.1-0.1,0.1c0,0,0,0.1-0.1,0.1c0,0.1,0,0.1-0.1,0.2c0,0,0,0.1,0,0.1 c0,0,0,0,0,0.1c-0.5,5.6-1.4,15.2-1.8,19.5c0,0,0,0,0-0.1C36.8,81.4,31.2,62.3,30,58.3z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </a>
                    <div className="tooltip">Telegram</div>
                  </li>
                </ul>
              </div>
            </div>

            {/* ── Right Column: Contact Form ── */}
            <div
              className="contact-form-wrapper"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="350"
            >
              <span className="contact-form-title">Send a Message</span>

              {isSubmitted ? (
                <div className="contact-success" role="status" aria-live="polite">
                  <div className="contact-success-checkmark">
                    <svg viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="contact-success-title">Message Sent!</h3>
                  <p className="contact-success-text">
                    Thank you for reaching out. I'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Name Field */}
                  <div className="contact-form-group">
                    <input
                      id="contact-name"
                      type="text"
                      className="contact-form-input"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      onFocus={() => setFocusedField("firstName")}
                      onBlur={() => setFocusedField(null)}
                      autoComplete="given-name"
                      aria-required="true"
                    />
                    <label
                      htmlFor="contact-name"
                      className={`contact-form-label ${
                        isLabelActive("firstName", formData.firstName)
                          ? "active"
                          : ""
                      }`}
                    >
                      Your Name
                    </label>
                  </div>

                  {/* Email Field */}
                  <div className="contact-form-group">
                    <input
                      id="contact-email"
                      type="email"
                      className="contact-form-input"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      autoComplete="email"
                      aria-required="true"
                    />
                    <label
                      htmlFor="contact-email"
                      className={`contact-form-label ${
                        isLabelActive("email", formData.email) ? "active" : ""
                      }`}
                    >
                      Email Address
                    </label>
                  </div>

                  {/* Message Field */}
                  <div className="contact-form-group">
                    <textarea
                      id="contact-message"
                      className="contact-form-textarea"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      rows={5}
                      aria-required="true"
                    />
                    <label
                      htmlFor="contact-message"
                      className={`contact-form-label ${
                        isLabelActive("message", formData.message)
                          ? "active"
                          : ""
                      }`}
                    >
                      Tell me about your project
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="contact-submit-btn">
                    <span>Send Message</span>
                    <span className="btn-arrow" aria-hidden="true">
                      →
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          ACT 3 — THE SIGNATURE
      ═══════════════════════════════════════════════════════ */}
      <div className="container tw-container-1800-px">
        <div className="contact-footer">
          <div className="contact-footer-grid">
            {/* Quick Links */}
            <div
              className="contact-footer-links"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <span className="contact-footer-links-title">Quick Links</span>
              <ul className="contact-footer-links-list">
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#about">About Me</a>
                </li>
                <li>
                  <a href="#works">Portfolio</a>
                </li>
                <li>
                  <a href="#services">Services</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>

            {/* Back to Top */}
            <button
              className="contact-back-to-top"
              onClick={handleScrollToTop}
              aria-label="Scroll back to top"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="300"
            >
              <i className="ph ph-arrow-up" />
            </button>

            {/* Copyright */}
            <div
              className="contact-footer-copy"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="400"
            >
              <span className="contact-footer-copy-name">Abdullah Parvaiz</span>
              <span className="contact-footer-copy-text">
                © {new Date().getFullYear()} All rights reserved
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Watermark Name */}
      <div className="contact-watermark">
        <h5 className="contact-watermark-text">Abdullah Parvaiz</h5>
      </div>

      {/* Background Shape */}
      <img
        className="contact-bg-shape"
        src="/assets/images/shapes/footer-three-bg-shape.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
    </section>
  );
};
