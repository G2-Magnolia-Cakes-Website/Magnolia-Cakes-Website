import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { AuthContext } from "../../AuthContext";
import AboutUsSection from "./Sections/AboutUsSection";
import SubheadingDivider from "Components/SubheadingDivider/SubheadingDivider";
import CarouselGallery from "Components/Carousel/CarouselGallery";
import LocationPage from "Containers/LocationPage/LocationPage";
import DeliverySection from "./Sections/DeliverySection";
import GallerySection from "./Sections/GallerySection";
import WelcomeSection from "./Sections/WelcomeSection";
import WelcomePopup from "../../Components/WelcomePopup/WelcomePopup";

const HomePage = ({ api }) => {
  const { user } = useContext(AuthContext);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  const handleCloseWelcomePopup = () => {
    setShowWelcomePopup(false);
  };

  useEffect(() => {
    const hasShownWelcomePopup = localStorage.getItem("hasShownWelcomePopup");

    if (user && !hasShownWelcomePopup) {
      setShowWelcomePopup(true);

      const timer = setTimeout(() => {
        setShowWelcomePopup(false);
      }, 7000);

      localStorage.setItem("hasShownWelcomePopup", "true");

      return () => {
        clearTimeout(timer);
      };
    }
  }, [user]);

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
      {user &&
        showWelcomePopup &&
        ReactDOM.createPortal(
          <WelcomePopup onClose={handleCloseWelcomePopup} user={user} />,
          document.body
        )}
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
