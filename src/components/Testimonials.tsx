import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  videoUrl: string;
  rating: number;
}

const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Sophia Reynolds",
    role: "Founder, Startup Studio",
    quote: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    avatar: "/assets/images/thumbs/testimonial-three-thumb1.jpg",
    videoUrl: "https://www.youtube.com/embed/Fvae8nxzVz4",
    rating: 5,
  },
  {
    id: "test-2",
    name: "Daniel Roberts",
    role: "CEO, Tech Company",
    quote: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    avatar: "/assets/images/thumbs/testimonial-three-thumb2.jpg",
    videoUrl: "https://www.youtube.com/embed/Fvae8nxzVz4",
    rating: 5,
  },
];

const BRANDS_DATA = [
  { default: "/assets/images/thumbs/marquee-two-thumb1.png", hover: "/assets/images/thumbs/marquee-two-thumb11.png" },
  { default: "/assets/images/thumbs/marquee-two-thumb2.png", hover: "/assets/images/thumbs/marquee-two-thumb22.png" },
  { default: "/assets/images/thumbs/marquee-thumb55.png", hover: "/assets/images/thumbs/marquee-thumb5.png" },
  { default: "/assets/images/thumbs/marquee-two-thumb4.png", hover: "/assets/images/thumbs/marquee-two-thumb44.png" },
  { default: "/assets/images/thumbs/marquee-thumb33.png", hover: "/assets/images/thumbs/marquee-thumb3.png" },
];

export const Testimonials: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <>
      <section className="testimonial-three-area pt-120 tw-pb-22">
        <div className="container tw-container-1800-px">
          {/* Section Heading */}
          <div className="row justify-content-center tw-mb-21">
            <div className="col-xl-10">
              <div className="text-center">
                <h2 className="testimonial-three-title text-heading tw-text-15 tw-itm-title tw-itm-anim">
                  Honest testimonials from clients highlighting my commitment to quality,
                  performance, & user-focused design that delivers real results
                </h2>
              </div>
            </div>
          </div>

          {/* Swiper Slider */}
          <div className="row">
            <div className="col-xl-12">
              <div className="testimonial-three-slider position-relative z-1">
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={30}
                  slidesPerView={1}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  className="swiper-container testimonial-three-active"
                >
                  {TESTIMONIALS_DATA.map((item) => (
                    <SwiperSlide key={item.id}>
                      <div className="testimonial-three-wrapper d-flex align-items-center tw-gap-9 tw-rounded-lg tw-mb-705">
                        {/* Thumbnail & Popup Trigger */}
                        <div className="testimonial-three-thumb position-relative z-1">
                          <img
                            className="w-100 h-100 tw-rounded-lg"
                            src={item.avatar}
                            alt={item.name}
                          />
                          <div className="testimonial-three-button position-absolute start-50 top-50 translate-middle">
                            <button
                              className="testimonial-three-btn tw-w-220 tw-h-220 lh-1 d-inline-flex align-items-center justify-content-center bg-white text-main-two-600 tw-text-2xl position-relative z-1 hover-text-main-two-600 rounded-circle border-0 outline-none cursor-pointer"
                              onClick={() => setActiveVideo(item.videoUrl)}
                            >
                              <i className="ph-bold ph-play"></i>
                              <span className="ripple"></span>
                            </button>
                          </div>
                        </div>

                        {/* Slide Content */}
                        <div className="testimonial-three-content w-100">
                          <div className="d-flex align-items-center justify-content-between tw-mb-16">
                            <div>
                              <span>
                                <img
                                  src="/assets/images/icons/testimonial-three-icon.svg"
                                  alt="quote-icon"
                                />
                              </span>
                            </div>
                            <div className="testimonial-three-review">
                              {[...Array(item.rating)].map((_, i) => (
                                <span key={i} className="text-heading tw-text-lg">
                                  <i className="ph-bold ph-star"></i>
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="tw-mb-15">
                            <p className="testimonial-three-paragraph text-heading tw-text-2xl fw-semibold">
                              {item.quote}
                            </p>
                          </div>
                          <div>
                            <h2 className="tw-text-2xl fw-medium">{item.name}</h2>
                            <p className="tw-text-lg">{item.role}</p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================== Brand Logos Section =========================== */}
      <section className="brand-three-area brand-two-area pb-120">
        <div className="container tw-container-1800-px">
          <div className="row">
            <div className="col-xl-12">
              <div className="text-center tw-mb-15">
                <h2 className="brand-three-title tw-text-xl tw-char-animation">
                  Loved by Teams Around the World
                </h2>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center flex-wrap tw-gap-4">
            {BRANDS_DATA.map((brand, idx) => (
              <div
                key={idx}
                className="brand-item brand-three-item position-relative z-1 tw-mb-1 group cursor-pointer"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay={200 + idx * 100}
                style={{ width: "16%" }}
              >
                <span className="brand-active-media transition-opacity duration-300 group-hover:opacity-0 block">
                  <img src={brand.default} alt="brand logo" />
                </span>
                <span className="brand-hover-media absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 block">
                  <img src={brand.hover} alt="brand logo hovered" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video IFrame Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 bg-black/85 flex items-center justify-center z-[9999] transition-opacity duration-300"
          onClick={() => setActiveVideo(null)}
        >
          <div className="relative w-full max-w-[800px] aspect-video mx-4">
            <button
              className="absolute -top-12 right-0 text-white text-3xl font-bold bg-transparent border-0 outline-none hover:text-main-two-600 cursor-pointer"
              onClick={() => setActiveVideo(null)}
            >
              &times;
            </button>
            <iframe
              className="w-full h-full rounded-lg"
              src={activeVideo}
              title="Testimonial Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};
