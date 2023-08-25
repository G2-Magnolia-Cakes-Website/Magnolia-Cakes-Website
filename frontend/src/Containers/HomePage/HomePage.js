import React from "react";
import AboutUsSection from "./Sections/AboutUsSection";
import SubheadingDivider from "../../Components/SubheadingDivider/SubheadingDivider";
import CarouselGallery from "../../Components/Carousel/CarouselGallery";
import GallerySection from "./Sections/GallerySection";

const HomePage = () => {
  return (
    <>
      <CarouselGallery />
      <GallerySection />
      {/* <SubheadingDivider subheadingText="Cakes for all occasions" /> */}
      {/* <SubheadingDivider subheadingText="About Us" /> */}
      <AboutUsSection />
    </>
  );
};

export default HomePage;
