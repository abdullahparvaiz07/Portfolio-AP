import React from "react";

interface AwardItem {
  id: string;
  number: string;
  category: string;
  title: string;
  year: string;
  image: string;
}

const AWARDS_DATA: AwardItem[] = [
  {
    id: "award-1",
    number: "01",
    category: "Web Development",
    title: "Full Stack Developer",
    year: "2025",
    image: "/assets/images/thumbs/feature-three-thumb1.png",
  },
  {
    id: "award-2",
    number: "02",
    category: "Frontend Development",
    title: "ReactJS and Tailwind CSS",
    year: "2024",
    image: "/assets/images/thumbs/portfolio-two-thumb1.jpg",
  },
  {
    id: "award-3",
    number: "03",
    category: "Backend Development",
    title: "NodeJS and ExpressJS",
    year: "2025",
    image: "/assets/images/thumbs/portfolio-two-thumb2.png",
  },
  {
    id: "award-4",
    number: "04",
    category: "Creative Designing",
    title: "Figma, Canva and Adobe Photoshop",
    year: "2024",
    image: "/assets/images/thumbs/portfolio-two-thumb3.png",
  },
  {
    id: "award-5",
    number: "05",
    category: "Branding & Identity",
    title: "Creative Strategy",
    year: "2024",
    image: "/assets/images/thumbs/portfolio-two-thumb4.jpg",
  },
  {
    id: "award-6",
    number: "06",
    category: "AI & Tech",
    title: "OpenAI API, Python, and AI Agents",
    year: "2025",
    image: "/assets/images/thumbs/portfolio-thumb1.png",
  },
];

export const Awards: React.FC = () => {
  // Track cursor position inside the hovered row to shift the image preview
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const revealBg = e.currentTarget.querySelector(".hover__reveal-bg") as HTMLDivElement;
    if (revealBg) {
      revealBg.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  return (
    <div id="awards" className="feature-three-area py-120 position-relative z-1">
      <div className="container tw-container-1800-px">
        <div className="row">
          <div className="col-xl-12">
            <div className="feature-three-wrapper hover__widget">
              {AWARDS_DATA.map((award, index) => {
                const isCurrent = index === 0 ? "current" : "";

                return (
                  <div
                    key={award.id}
                    className={`feature-three-single hover__reveal-item ${isCurrent}`}
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="200"
                    onMouseMove={handleMouseMove}
                  >
                    <div className="feature-three-item d-flex justify-content-between align-items-center">
                      <div className="feature-three-left d-flex align-items-center">
                        <div>
                          <span className="feature-three-text tw-text-605 fw-medium text-white tw-transition-3 d-inline-block tw-w-20">
                            {award.number}
                          </span>
                        </div>
                        <div>
                          <span className="feature-three-text tw-text-605 fw-medium text-white tw-transition-3 d-inline-block tw-w-160-px">
                            {award.category}
                          </span>
                        </div>
                        <div>
                          <span className="feature-three-text tw-text-605 fw-medium text-white tw-transition-3 d-inline-block">
                            {award.title}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="feature-three-text tw-text-605 fw-medium text-white tw-transition-3 d-inline-block">
                          {award.year}
                        </span>
                      </div>
                    </div>
                    {/* Hover Reveal Image Container */}
                    <div
                      className="hover__reveal-bg bg-img"
                      style={{ backgroundImage: `url(${award.image})` }}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
