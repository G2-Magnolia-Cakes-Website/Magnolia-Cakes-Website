import React, { useEffect, useState } from "react";
import AboutUsSection from "./Sections/AboutUsSection";
import SubheadingDivider from "Components/SubheadingDivider/SubheadingDivider";
import CarouselGallery from "Components/Carousel/CarouselGallery";
import LocationPage from "Containers/LocationPage/LocationPage";
import DeliverySection from "./Sections/DeliverySection";
import GallerySection from "./Sections/GallerySection";
import WelcomeSection from "./Sections/WelcomeSection";

const HomePage = ({ api }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch cakes data from the API
    const fetchImages = async () => {
      try {
        const response = await api.get("api/slider-images/");
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching cakes:", error);
      }
    };
    fetchImages();
  }, [api]);

  return (
    <>
      {images.length > 0 && <CarouselGallery images={images} />}
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
