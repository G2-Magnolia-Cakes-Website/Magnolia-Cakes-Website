import CarouselGallery from 'Components/Carousel/CarouselGallery';
import FlavoursAndServings from 'Containers/FlavoursAndServings/FlavoursAndServings';
import AboutUsSection from 'Containers/HomePage/Sections/AboutUsSection';
import DeliverySection from 'Containers/HomePage/Sections/DeliverySection';
import GallerySection from 'Containers/HomePage/Sections/GallerySection';
import LocationPage from 'Containers/LocationPage/LocationPage';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = ({api}) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Display an alert indicating a successful payment
    alert('Payment successful! You will be redirected to the homepage shortly.');

    // Immediately navigate to the homepage
    navigate('/');

  }, [navigate]);

  return (
    <div>

      <CarouselGallery api={api} />
      <GallerySection />
      {/* <SubheadingDivider subheadingText="Cakes for all occasions" /> */}
      <AboutUsSection />
      <FlavoursAndServings api={api} />
      <DeliverySection />
      <LocationPage api={api} />

    </div>
  );
};

export default SuccessPage;
