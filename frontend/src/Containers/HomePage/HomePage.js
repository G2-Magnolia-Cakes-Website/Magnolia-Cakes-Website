import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { AuthContext } from "../../AuthContext";
import AboutUsSection from "./Sections/AboutUsSection";
import CarouselGallery from "Components/Carousel/CarouselGallery";
import LocationPage from "Containers/LocationPage/LocationPage";
import DeliverySection from "./Sections/DeliverySection";
import GallerySection from "./Sections/GallerySection";
import WelcomeSection from "./Sections/WelcomeSection";
import WelcomePopup from "Components/WelcomePopup/WelcomePopup";
import { parseStringToParagraphsByNewline } from "utils/parseStringsToArray";
import CupcakesBanner from "Components/CupcakesBanner/CupcakesBanner";

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

  // Loading
  const [loading, setLoading] = useState(true);

  const [quote, setQuote] = useState(["Loading..."]);

  useEffect(() => {
    setLoading(true);
    // Fetch cakes data from the API
    const fetchImages = async () => {
      try {
        const response = await api.get("api/slider-images/");
        setImages(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cakes:", error);
      }
    };
    fetchImages();

    api
      .get("/api/homepage-welcome/")
      .then((response) => {
        // Set the retrieved content in the state
        const responseData = response.data;
        setQuote(parseStringToParagraphsByNewline(responseData.quote));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [api]);

  return (
    <>
      {user &&
        showWelcomePopup &&
        ReactDOM.createPortal(
          <WelcomePopup onClose={handleCloseWelcomePopup} user={user} />,
          document.body
        )}
      {images.length > 0 && (
        <CarouselGallery quote={quote} images={images} loading={loading} />
      )}
      <CupcakesBanner />
      <WelcomeSection api={api} />
      <GallerySection api={api} />
      <AboutUsSection api={api} />
      <DeliverySection />
      <LocationPage api={api} />
    </>
  );
};

export default HomePage;
