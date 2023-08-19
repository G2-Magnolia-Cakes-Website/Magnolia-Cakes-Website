import React from "react";
import AboutUsSection from "./Sections/AboutUsSection";
import SubheadingDivider from "../SubheadingDivider/SubheadingDivider";
import CarouselGallery from "../Carousel/CarouselGallery";

const HomePage = () => {
  return (
    <>
      <CarouselGallery />
      {/* <SubheadingDivider subheadingText="Cakes for all occasions" /> */}
      {/* <SubheadingDivider subheadingText="About Us" /> */}
      <AboutUsSection />
    </>
  );
};

export default HomePage;
