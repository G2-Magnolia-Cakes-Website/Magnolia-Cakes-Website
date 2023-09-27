import React from "react";
import AboutUsSection from "./Sections/AboutUsSection";
import SubheadingDivider from "Components/SubheadingDivider/SubheadingDivider";
import CarouselGallery from "Components/Carousel/CarouselGallery";
import LocationPage from "Containers/LocationPage/LocationPage";
import DeliverySection from "./Sections/DeliverySection";
import GallerySection from "./Sections/GallerySection";
import WelcomeSection from "./Sections/WelcomeSection";

const HomePage = ({ api }) => {
  return (
    <>
      <CarouselGallery api={api} />
      <WelcomeSection api={api} />
      <GallerySection api={api} />
      {/* <SubheadingDivider subheadingText="Cakes for all occasions" /> */}
      <AboutUsSection api={api} />
      <DeliverySection />
      <LocationPage api={api} />
    </>
  );
};

export default HomePage;
