import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { AuthContext } from '../../AuthContext';
import AboutUsSection from "./Sections/AboutUsSection";
import SubheadingDivider from "Components/SubheadingDivider/SubheadingDivider";
import CarouselGallery from "Components/Carousel/CarouselGallery";
import LocationPage from "Containers/LocationPage/LocationPage";
import DeliverySection from "./Sections/DeliverySection";
import GallerySection from "./Sections/GallerySection";
import FlavoursAndServings from "Containers/FlavoursAndServings/FlavoursAndServings";
import WelcomePopup from '../../Components/WelcomePopup/WelcomePopup';

const HomePage = ({ api }) => {

  const { user } = useContext(AuthContext);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  const handleCloseWelcomePopup = () => {
    setShowWelcomePopup(false);
  };

  useEffect(() => {
    if (user) {
      setShowWelcomePopup(true);

      const timer = setTimeout(() => {
        setShowWelcomePopup(false);
      }, 7000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [user]);

  return (
    <>
      {user && showWelcomePopup && ReactDOM.createPortal(
        <WelcomePopup onClose={handleCloseWelcomePopup} user={user} />,
        document.body
      )}
      <CarouselGallery api={api} />
      <GallerySection />
      {/* <SubheadingDivider subheadingText="Cakes for all occasions" /> */}
      <AboutUsSection />
      <FlavoursAndServings api={api} />
      <DeliverySection />
      <LocationPage api={api} />
    </>
  );
};

export default HomePage;
