import React, { useEffect, useState } from "react";
import welcomePhoto from "utils/welcome-photo.jpg";
import magnoliaFlower from "utils/magnolia_transparent.png";
import "./WelcomeSection.css";

const WelcomeSection = ({ api }) => {
  const [content, setContent] = useState({
    heading: "Loading...",
    paragraph: "Loading...",
    image: welcomePhoto,
  });

  useEffect(() => {
    api
      .get("/api/homepage-welcome/")
      .then((response) => {
        // Set the retrieved content in the state
        setContent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [api]);

  return (
    <div className="welcome-section">
      <div className="quote-wrapper">
        <p className="welcome-quote">
          Experience the Magic of Our Melbourne-Based Cake Studio, Where
          Artistry and the Love for Cake Making Harmoniously Combine
        </p>
      </div>

      <img
        src={magnoliaFlower}
        alt="Magnolia Flower"
        className="magnolia-flower"
      />
      <h2>{content.heading}</h2>
      <div className="welcome-body">
        <p>{content.paragraph}</p>
        <img className="welcome-cake" src={content.image} alt="welcome cake" />
      </div>
    </div>
  );
};

export default WelcomeSection;
