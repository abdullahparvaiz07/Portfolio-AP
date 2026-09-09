import React, { useState } from "react";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* ==================== Offcanvas Mobile Menu Start ==================== */}
      <div className={`tw-offcanvas-2-area p-relative ${isMenuOpen ? "opened" : ""}`}>
        <div className="tw-offcanvas-2-bg is-left left-box"></div>
        <div className="tw-offcanvas-2-bg is-right right-box d-none d-md-block"></div>
        <div className="tw-offcanvas-2-wrapper">
          <div className="tw-offcanvas-2-left left-box">
            <div className="tw-offcanvas-2-left-wrap d-flex justify-content-between align-items-center">
              <div className="twoffcanvas__logo">
                <a className="logo-1" href="#home" onClick={() => setIsMenuOpen(false)}>
                  <img src="/logo.png" alt="logo" />
                </a>
              </div>
              <div className="tw-offcanvas-2-close d-md-none text-end">
                <button
                  className="tw-offcanvas-2-close-btn"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text">
                    <span className="text-white">close</span>
                  </span>
                  <span className="d-inline-block">
                    <span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="32.621"
                          height="1.00918"
                          transform="matrix(0.704882 0.709325 -0.704882 0.709325 1.0061 0)"
                          fill="currentColor"
                        />
                        <rect
                          width="32.621"
                          height="1.00918"
                          transform="matrix(0.704882 -0.709325 0.704882 0.709325 0 23.2842)"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div className="tw-main-menu-mobile menu-hover-active counter-row">
              <nav className="tw-main-menu-content">
                <ul>
                  <li>
                    <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
                  </li>
                  <li>
                    <a href="#about" onClick={() => setIsMenuOpen(false)}>About Me</a>
                  </li>
                  <li>
                    <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
                  </li>
                  <li>
                    <a href="#works" onClick={() => setIsMenuOpen(false)}>Portfolio</a>
                  </li>
                  <li>
                    <a href="#awards" onClick={() => setIsMenuOpen(false)}>Awards</a>
                  </li>
                  <li>
                    <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="tw-offcanvas-2-right right-box d-none d-md-block p-relative">
            <div className="tw-offcanvas-2-close text-end">
              <button className="tw-offcanvas-2-close-btn" onClick={() => setIsMenuOpen(false)}>
                <span className="text">
                  <span>close</span>
                </span>
                <span className="d-inline-block">
                  <span>
                    <svg
                      width="38"
                      height="38"
                      viewBox="0 0 38 38"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.80859 9.80762L28.1934 28.1924"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.80859 28.1924L28.1934 9.80761"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              </button>
            </div>
            <div className="tw-offcanvas-2-right-inner d-flex flex-column justify-content-between h-100">
              <div className="twoffcanvas__contact-info">
                <div className="twoffcanvas__contact-title">
                  <h5 className="text-white">Contact us</h5>
                </div>
                <ul>
                  <li>
                    <span className="text-main-two-600 tw-text-xl">
                      <i className="ph ph-map-pin-line"></i>
                    </span>
                    <a
                      className="text-white"
                      href="https://www.google.com/maps/@23.8223586,90.3661283,15z"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Manchester 21, Zurich, CH
                    </a>
                  </li>
                  <li>
                    <span className="text-main-two-600 tw-text-xl">
                      <i className="ph ph-envelope"></i>
                    </span>
                    <a className="text-white" href="mailto:omioinfo@mail.com">
                      <span>omioinfo@mail.com</span>
                    </a>
                  </li>
                  <li>
                    <span className="text-main-two-600 tw-text-xl">
                      <i className="ph ph-phone-call"></i>
                    </span>
                    <a className="text-white" href="tel:+48555223224">
                      (+00) 678 345 98568
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-social">
                <ul className="tw-gap-2">
                  <li>
                    <a href="#facebook">
                      <span className="active-media d-flex align-items-center tw-gap-1">
                        Facebook <i className="ph ph-arrow-bend-up-right"></i>
                      </span>
                      <span className="hover-media">
                        <i className="ph ph-facebook-logo"></i>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#instagram">
                      <span className="active-media d-flex align-items-center tw-gap-1">
                        INSTAGRAM <i className="ph ph-arrow-bend-up-right"></i>
                      </span>
                      <span className="hover-media">
                        <i className="ph ph-instagram-logo"></i>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/abdullah-parvaiz-4a0492386/" target="_blank" rel="noopener noreferrer">
                      <span className="active-media d-flex align-items-center tw-gap-1">
                        LINKEDIN <i className="ph ph-arrow-bend-up-right"></i>
                      </span>
                      <span className="hover-media">
                        <i className="ph ph-linkedin-logo"></i>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ==================== Offcanvas Mobile Menu End ==================== */}

      {/* ==================== Header Start ==================== */}
      <header 
        className="header header-two header-three tw-transition-all tw-z-99 position-fixed w-100 start-0 top-0"
        style={{ 
          background: "#f5f5f5",
          paddingBlock: "15px",
          borderBottom: "1px solid #e8e8e8"
        }}
      >
        <div className="container tw-container-1800-px">
          <nav className="d-flex align-items-center justify-content-between position-relative">
            {/* Logo Start */}
            <div>
              <a href="#home" className="link">
                 <img
                  src="/logo.png"
                  alt="Logo"
                  className="max-w-200-px"
                  style={{ maxHeight: "42px", objectFit: "contain" }}
                />
              </a>
            </div>
            {/* Logo End */}

            {/* Menu Start: Hanging Black Capsule around Navlinks */}
            <div className="d-none d-lg-block position-absolute start-50 translate-middle-x" style={{ top: "0px" }}>
              <div 
                className="tw-px-8 tw-py-2"
                style={{ 
                  background: "#000000", 
                  borderBottomLeftRadius: "20px", 
                  borderBottomRightRadius: "20px",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderTop: "none",
                  marginTop: "-15px", // Offset top padding to hang flush from the screen edge
                  whiteSpace: "nowrap"
                }}
              >
                <ul className="d-flex align-items-center tw-gap-8" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {[
                    { name: "Home", href: "#home" },
                    { name: "About Me", href: "#about" },
                    { name: "Services", href: "#services" },
                    { name: "Portfolio", href: "#works" },
                    { name: "Awards", href: "#awards" },
                    { name: "Contact", href: "#contact" }
                  ].map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href} 
                        className="text-white fw-bold text-uppercase tw-text-xs md:tw-text-sm hover:tw-text-neutral-400 tw-transition-all"
                        style={{ letterSpacing: "0.12em", opacity: 0.85, whiteSpace: "nowrap" }}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Menu End */}

            {/* Header Right Start */}
            <div className="header-right d-flex align-items-center tw-gap-705">
              {/* Menu Button Start */}
              <div className="header-three-menu">
                <button
                  className="tw-offcanvas-open-btn tw-w-10 tw-h-10 lh-1 d-inline-flex justify-content-center align-items-center tw-transition-3 tw-rounded-md"
                  onClick={() => setIsMenuOpen(true)}
                  style={{ border: "1px solid rgba(0,0,0,0.1)", background: "rgba(0,0,0,0.03)" }}
                >
                  <span>
                    <img
                      className="tw-transition-3"
                      src="/assets/images/icons/header-three-toggle.svg"
                      alt="toggle"
                      style={{ height: "14px" }}
                    />
                  </span>
                </button>
              </div>
              {/* Menu Button End */}

              <div className="header-three-button d-none d-md-block">
                <a
                  className="bg-white text-black fw-bold tw-py-2 tw-px-6 d-inline-block text-uppercase tw-rounded-md tw-transition-all hover:bg-black hover:text-white"
                  href="#contact"
                  style={{ border: "1px solid black", letterSpacing: "0.05em", fontSize: "0.75rem" }}
                >
                  Let's Connect ↗
                </a>
              </div>
              {/* Header Button End */}
            </div>
            {/* Header Right End */}
          </nav>
        </div>
      </header>
      {/* ==================== Header End ==================== */}
    </>
  );
};

