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

import BarLoader from "react-spinners/BarLoader";

import CarouselItem from "./CarouselItem";
import IntroQuote from "Components/IntroQuote/IntroQuote";

const CarouselGallery = ({ quote, images, loading }) => {
  return (
    <div className="pink-bg">
      <div className="carousel-wrapper">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination, Keyboard]}
          navigation={true}
          pagination={{ clickable: true }}
          keyboard={{ enabled: true }}
          grabCursor={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          centeredSlides={true}
          effect="fade"
          // crossFade={true}
          enabled={true}
          observer={true}
          observeParents={true}
          style={{
            // @ts-ignore
            "--swiper-navigation-size": "30px",
          }}
        >
          {images.map((i) => (
            <SwiperSlide key={i.id}>
              <CarouselItem image={i.image} title={i.name} />
            </SwiperSlide>
          ))}
        </Swiper>

        <BarLoader
          loading={loading}
          aria-label="Loading Spinner"
          data-testid="loader"
          width={"100%"}
        />

        <div className="intro-quote desktop">
          <IntroQuote quote={quote} />
        </div>
      </div>
      <div className="intro-quote mobile">
        <IntroQuote quote={quote} />
      </div>
    </div>
  );
};

export default CarouselGallery;
