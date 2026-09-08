import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Components
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Portfolio } from "./components/Portfolio";
import { Awards } from "./components/Awards";
import { Capabilities } from "./components/Capabilities";
import { Contact } from "./components/Contact";

export const App: React.FC = () => {
  const ballRef = useRef<HTMLDivElement>(null);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      once: false,
      offset: 0,
      anchorPlacement: "top-bottom",
    });
  }, []);

  // Preloader Animation (runs once on mount)
  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;

    const svg = document.getElementById("preloaderSvg");
    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

    const preloaderTl = gsap.timeline();
    preloaderTl
      .to(".preloader-heading .load-text", {
        delay: 0.8,
        y: -80,
        opacity: 0,
        duration: 0.6,
      })
      .to(svg, {
        duration: 0.6,
        attr: { d: curve },
        ease: "power2.inOut",
      })
      .to(svg, {
        duration: 0.6,
        attr: { d: flat },
        ease: "power2.inOut",
      })
      .to(".preloader", {
        y: "-130%",
        duration: 0.8,
        ease: "power4.inOut",
      })
      .set(".preloader", {
        display: "none",
        zIndex: -1,
      });
  }, []);

  // Initialize ScrollSmoother
  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap || !window.ScrollTrigger || !window.ScrollSmoother) return;

    // Small delay for DOM readiness
    const timer = setTimeout(() => {
      gsap.registerPlugin(window.ScrollTrigger, window.ScrollSmoother, window.ScrollToPlugin);
      gsap.config({ nullTargetWarn: false });

      window.ScrollSmoother.create({
        smoothTouch: 0.2,
        smooth: 4,
        effects: true,
        normalizeScroll: false,
        ignoreMobileResize: true,
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      window.ScrollTrigger?.getAll().forEach((t: any) => t.kill());
    };
  }, []);

  // Initialize Magic Cursor Tracking
  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;

    const ball = ballRef.current;
    if (!ball) return;

    // Set cursor start configurations
    gsap.set(ball, {
      xPercent: -50,
      yPercent: -50,
      width: 5,
      height: 5,
      borderWidth: 1,
      opacity: 1,
    });

    const mouse = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    const ratio = 0.15;
    let active = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    const updatePosition = () => {
      if (!active) {
        pos.x += (mouse.x - pos.x) * ratio;
        pos.y += (mouse.y - pos.y) * ratio;
        gsap.set(ball, { x: pos.x, y: pos.y });
      }
    };

    gsap.ticker.add(updatePosition);

    // standard target hover styles - shrink and hide ball
    const handleLinkEnter = () => {
      gsap.to(ball, { duration: 0.3, scale: 0, opacity: 0 });
    };
    const handleLinkLeave = () => {
      gsap.to(ball, { duration: 0.3, scale: 1, opacity: 1 });
    };

    const addLinkListeners = () => {
      const links = document.querySelectorAll("a, button, .tw-hover-btn");
      links.forEach((el) => {
        if (el.hasAttribute("data-cursor") || el.closest("[data-cursor]")) return;
        el.addEventListener("mouseenter", handleLinkEnter);
        el.addEventListener("mouseleave", handleLinkLeave);
      });
    };

    // custom element hover overlay logic (e.g. data-cursor="View")
    const handleDataCursorEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const text = el.getAttribute("data-cursor") || "";

      ball.classList.add("with-blur");

      const viewDiv = document.createElement("div");
      viewDiv.className = "ball-view";
      viewDiv.innerText = text;
      ball.appendChild(viewDiv);

      gsap.to(ball, {
        duration: 0.3,
        yPercent: -75,
        width: 140,
        height: 140,
        opacity: 1,
        borderWidth: 1,
        zIndex: 999,
        backdropFilter: "blur(14px)",
        backgroundColor: "#ff6644",
        boxShadow: "0px 1px 3px 0px rgba(18, 20, 32, 0.14)",
      });
      gsap.to(viewDiv, { duration: 0.3, scale: 1, autoAlpha: 1 });
    };

    const handleDataCursorLeave = () => {
      const viewDiv = ball.querySelector(".ball-view");
      if (viewDiv) {
        gsap.to(viewDiv, { duration: 0.3, scale: 0, autoAlpha: 0 });
        setTimeout(() => viewDiv.remove(), 300);
      }
      gsap.to(ball, {
        duration: 0.3,
        yPercent: -50,
        width: 5,
        height: 5,
        opacity: 1,
        borderWidth: 1,
        backgroundColor: "#1c1d21",
        backdropFilter: "none",
        boxShadow: "none",
      });
    };

    const addDataCursorListeners = () => {
      const dataCursors = document.querySelectorAll("[data-cursor]");
      dataCursors.forEach((el) => {
        el.addEventListener("mouseenter", handleDataCursorEnter);
        el.addEventListener("mouseleave", handleDataCursorLeave);
      });
    };

    // Bind listeners after component has fully loaded
    const linkTimer = setTimeout(addLinkListeners, 800);
    const cursorTimer = setTimeout(addDataCursorListeners, 800);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(updatePosition);
      clearTimeout(linkTimer);
      clearTimeout(cursorTimer);
    };
  }, []);

  return (
    <>
      {/* Magic Cursor Element */}
      <div id="magic-cursor">
        <div id="ball" ref={ballRef}></div>
      </div>

      {/* Preloader */}
      <div className="preloader">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path id="preloaderSvg" d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"></path>
        </svg>
        <div className="preloader-heading">
          <div className="load-text">
            <span>L</span>
            <span>o</span>
            <span>a</span>
            <span>d</span>
            <span>i</span>
            <span>n</span>
            <span>g</span>
          </div>
        </div>
      </div>

      {/* Main Website View */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Header />
          <Hero />
          <About />
          <Services />
          <Portfolio />
          <Awards />
          <Capabilities />
          <Contact />
        </div>
      </div>
    </>
  );
};

