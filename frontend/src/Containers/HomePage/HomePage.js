import React from "react";
import AboutUsSection from "./Sections/AboutUsSection";
import SubheadingDivider from "Components/SubheadingDivider/SubheadingDivider";
import CarouselGallery from "Components/Carousel/CarouselGallery";
import LocationPage from "Containers/LocationPage/LocationPage";
import DeliverySection from "./Sections/DeliverySection";

const HomePage = () => {
  return (
    <>
      <CarouselGallery />
      {/* <SubheadingDivider subheadingText="Cakes for all occasions" /> */}
      <DeliverySection />
      {/* <SubheadingDivider subheadingText="About Us" /> */}
      <AboutUsSection />
      <LocationPage />
    </>
  );
};

export default HomePage;
