import React, { useState } from "react";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }
    // Simulate API Submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ firstName: "", email: "", message: "" });
    }, 3000);
  };

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" className="footer-three-area pt-120 tw-pb-10 position-relative z-1">
      <div className="container tw-container-1800-px">
        <div className="row justify-content-between pb-120">
          {/* Left Block */}
          <div className="col-xl-5 col-lg-6">
            <div
              className="footer-three-top-left tw-me-25"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <div className="tw-mb-9">
                <h2 className="tw-text-15 text-white tw-char-animation">
                  Let’s create something meaningful
                </h2>
              </div>
              <div className="d-inline-flex align-items-center tw-gap-6 tw-mb-10 flex-wrap">
                <a
                  className="tw-text-2xl fw-medium text-main-600 hover-underline hover-text-white"
                  href="mailto:unifexdonin@gmail.com"
                >
                  unifexdonin@gmail.com
                </a>
                <span className="tw-text-2xl fw-medium text-main-600">//</span>
                <a
                  className="tw-text-2xl fw-medium text-main-600 hover-underline hover-text-white"
                  href="tel:+442039991245"
                >
                  +44 20 3999 1245
                </a>
              </div>
              
              {/* Custom Uiverse Tooltip Social Links */}
              <div className="d-flex align-items-center tw-gap-8 tw-mt-10 flex-wrap">
                
                {/* Instagram Tooltip */}
                <div className="tooltip-container">
                  <div className="tooltip">
                    <div className="profile">
                      <div className="user">
                        <div className="img" style={{ color: "#e6683c", borderColor: "#e6683c" }}>IG</div>
                        <div className="details">
                          <div className="name" style={{ color: "#e6683c" }}>Instagram</div>
                          <div className="username">@abdullah.parvaiz</div>
                        </div>
                      </div>
                      <div className="about">1K+ Followers</div>
                    </div>
                  </div>
                  <div className="text-content">
                    <a className="icon" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                      <div className="layer">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span className="instagramSVG">
                          <svg
                            fill="white"
                            className="svgIcon"
                            viewBox="0 0 448 512"
                            height="1.5em"
                            width="1.5em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                          </svg>
                        </span>
                      </div>
                      <div className="text">Instagram</div>
                    </a>
                  </div>
                </div>

                {/* LinkedIn Tooltip */}
                <div className="tooltip-container">
                  <div className="tooltip">
                    <div className="profile">
                      <div className="user">
                        <div className="img" style={{ color: "#0077b5", borderColor: "#0077b5" }}>LN</div>
                        <div className="details">
                          <div className="name" style={{ color: "#0077b5" }}>LinkedIn</div>
                          <div className="username">@abdullahparvaiz</div>
                        </div>
                      </div>
                      <div className="about">500+ Connections</div>
                    </div>
                  </div>
                  <div className="text-content">
                    <a className="icon" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                      <div className="layer">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span className="linkedinSVG">
                          <svg
                            fill="white"
                            className="svgIcon"
                            viewBox="0 0 448 512"
                            height="1.5em"
                            width="1.5em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M100.28 448H7.4V148.9h92.88v299.1zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
                          </svg>
                        </span>
                      </div>
                      <div className="text">LinkedIn</div>
                    </a>
                  </div>
                </div>

                {/* GitHub Tooltip */}
                <div className="tooltip-container">
                  <div className="tooltip">
                    <div className="profile">
                      <div className="user">
                        <div className="img" style={{ color: "#ffffff", background: "#24292e", borderColor: "rgba(255,255,255,0.2)" }}>GH</div>
                        <div className="details">
                          <div className="name" style={{ color: "#ffffff" }}>GitHub</div>
                          <div className="username">@abdullahparvaiz</div>
                        </div>
                      </div>
                      <div className="about">40+ Repositories</div>
                    </div>
                  </div>
                  <div className="text-content">
                    <a className="icon" href="https://github.com" target="_blank" rel="noopener noreferrer">
                      <div className="layer">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span className="githubSVG">
                          <svg
                            fill="white"
                            className="svgIcon"
                            viewBox="0 0 496 512"
                            height="1.5em"
                            width="1.5em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5.7 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-.7zm-14.4-17.1c-1.2 1-.3 4.1 2 5.8 1.9 1.6 4.9 1.9 5.8.7 1.3-1.1.3-4.1-2-5.8-1.9-1.6-4.9-1.9-5.8-.7z"></path>
                          </svg>
                        </span>
                      </div>
                      <div className="text">GitHub</div>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="col-xl-6 col-lg-6">
            <div
              className="footer-three-form"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="300"
            >
              {isSubmitted ? (
                <div className="alert alert-success bg-main-600 text-heading tw-p-6 tw-rounded-lg text-center font-bold">
                  Thank you! Your message has been sent successfully.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="position-relative tw-mb-7">
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="form-control bg-transparent shadow-none tw-rounded-lg text-white tw-ps-7 tw-pe-13 tw-placeholder-text-neutral-100 focus-border-main-600 tw-h-18 focus-tw-placeholder-text-hidden tw-placeholder-transition-2"
                          placeholder="First Name"
                        />
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="position-relative tw-mb-7">
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="form-control bg-transparent shadow-none tw-rounded-lg text-white tw-ps-7 tw-pe-13 tw-placeholder-text-neutral-100 focus-border-main-600 tw-h-18 focus-tw-placeholder-text-hidden tw-placeholder-transition-2"
                          placeholder="Email Address"
                        />
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="position-relative tw-mb-7">
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="form-control bg-transparent shadow-none tw-h-196-px tw-rounded-lg text-white tw-ps-7 tw-pe-13 tw-placeholder-text-neutral-100 focus-border-main-600 focus-tw-placeholder-text-hidden tw-placeholder-transition-2"
                          placeholder="Message"
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="contact-button">
                        <button
                          type="submit"
                          className="tw-hover-btn bg-main-600 text-heading tw-text-xl fw-bold tw-py-4 tw-px-10 d-inline-flex justify-content-center w-100 hover-text-heading hover-bg-white tw-transition-3 tw-rounded-lg border-0 cursor-pointer"
                        >
                          submit message
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Middle Footer */}
      <div className="footer-three-border tw-px-18 tw-mb-10">
        <div className="container-fluid gx-0">
          <div className="row">
            <div className="col-xl-12">
              <div className="footer-three-middile d-flex align-items-center justify-content-between">
                <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                  <h4 className="tw-text-2xl text-white tw-mb-2">Quick Links</h4>
                  <ul className="d-flex tw-gap-2 flex-wrap">
                    <li>
                      <a className="tw-text-lg text-white" href="#home">Home,</a>
                    </li>
                    <li>
                      <a className="tw-text-lg text-white" href="#about">About Me,</a>
                    </li>
                    <li>
                      <a className="tw-text-lg text-white" href="#works">Portfolio,</a>
                    </li>
                    <li>
                      <a className="tw-text-lg text-white" href="#services">Service,</a>
                    </li>
                    <li>
                      <a className="tw-text-lg text-white" href="#contact">Contact</a>
                    </li>
                  </ul>
                </div>
                <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                  <a
                    className="footer-three-back-to-top tw-w-170 tw-h-170 lh-1 d-inline-flex justify-content-center align-items-center bg-main-two-600 text-white tw-text-3xl rounded-circle cursor-pointer"
                    href="#top"
                    onClick={handleScrollToTop}
                  >
                    <i className="ph ph-arrow-up"></i>
                  </a>
                </div>
                <div className="text-lg-end" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                  <h4 className="tw-text-2xl text-white tw-mb-2">Unifex Agency</h4>
                  <p className="tw-text-lg text-white">© 2025 Unifex Theme. All right reserved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Name */}
      <div>
        <div className="container tw-container-1800-px">
          <div className="row">
            <div className="col-xl-12">
              <div className="footer-three-bottom">
                <h5 className="footer-three-bottom-title text-white">Abdullah Parvaiz</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <img
          className="position-absolute top-0 start-0 z-n1"
          src="/assets/images/shapes/footer-three-bg-shape.png"
          alt="shape"
        />
      </div>
    </section>
  );
};
