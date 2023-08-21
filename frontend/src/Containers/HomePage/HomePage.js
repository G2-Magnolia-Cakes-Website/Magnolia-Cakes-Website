import React from "react";
import AboutUsSection from "./Sections/AboutUsSection";
import SubheadingDivider from "../../Components/SubheadingDivider/SubheadingDivider";
import CarouselGallery from "../../Components/Carousel/CarouselGallery";

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
