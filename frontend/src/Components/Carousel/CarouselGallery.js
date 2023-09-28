import React, { useEffect, useState } from "react";

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

// import slides from "./cake-categories.json";
import CarouselItem from "./CarouselItem";

const CarouselGallery = ({ api }) => {
  const [images, setImages] = useState([]);

  // Loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Fetch cakes data from the API
    const fetchImages = async () => {
      try {
        const response = await api.get("api/slider-images/");
        console.log("kim", response.data);
        setImages(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cakes:", error);
      }
    };
    fetchImages();
  }, [api]);

  return (
    <div>

      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination, Keyboard]}
        navigation={true}
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        grabCursor={true}
        autoplay={{ delay: 4000 }}
        loop={true}
        centeredSlides={true}
        effect="fade"
      // crossFade={true}
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
    </div>
  );
};

export default CarouselGallery;
