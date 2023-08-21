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
import CallToAction from "../../Containers/HomePage/Sections/CallToAction";

const CarouselGallery = () => {
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
        <CallToAction />
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
