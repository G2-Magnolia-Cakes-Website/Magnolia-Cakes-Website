import React from "react";
import AboutUsSection from "./Sections/AboutUsSection";
import SubheadingDivider from "../../Components/SubheadingDivider/SubheadingDivider";
import CarouselGallery from "../../Components/Carousel/CarouselGallery";
import LocationPage from "../LocationPage/LocationPage";

const HomePage = () => {
  return (
    <>
      <CarouselGallery />
      {/* <SubheadingDivider subheadingText="Cakes for all occasions" /> */}
      {/* <SubheadingDivider subheadingText="About Us" /> */}
      <AboutUsSection />
      <LocationPage />
    </>
  );
};

export default HomePage;
