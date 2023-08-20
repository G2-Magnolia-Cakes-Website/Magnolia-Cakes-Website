import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
  Keyboard,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import "./CarouselGallery.css";

import slides from "./cake-categories.json";
import CarouselItem from "./CarouselItem";
import magnoliaCakeLogo from "../../utils/Magnolia_Cake_logo.png";
import SquareButton from "../SquareButton/SquareButton";

const CarouselGallery = () => {
  const logo = (
    <img className="logo" src={magnoliaCakeLogo} alt="Magnolia Cake Logo" />
  );
  return (
    <div>
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination, Keyboard]}
        navigation={true}
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        style={{
          "--swiper-pagination-color": "#fff",
        }}
        grabCursor={true}
        autoplay={{ delay: 5000 }}
        loop={true}
        centeredSlides={true}
        effect="fade"
        crossFade={true}
      >
        <div className="call-to-action-inslide">
          <div className="call-to-action-wrapper">
            {logo}
            <div className="call-to-action-contents">
              <h2>Magnolia Cakes and Cupcakes</h2>
              <p>
                Delight in unforgettable moments with our exquisite cakes and
                cupcakes. Order now to experience pure indulgence!
              </p>
              <SquareButton buttonText="Get Started" />
            </div>
          </div>
        </div>
        {slides.map((slide) => (
          <SwiperSlide key={slide.image}>
            <CarouselItem image={slide.image} title={slide.title} />
          </SwiperSlide>
        ))}
        {/* <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide> */}
      </Swiper>
    </div>
  );
};

export default CarouselGallery;
