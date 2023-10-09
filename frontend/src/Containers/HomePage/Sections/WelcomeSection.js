import React, { useEffect, useState } from "react";
import welcomePhoto from "utils/welcome-photo.jpg";
import magnoliaFlower from "utils/magnolia_transparent.png";
import "./WelcomeSection.css";
import { parseStringToParagraphsByNewline } from "utils/parseParagraphs";
import CupcakesBanner from "Components/CupcakesBanner/CupcakesBanner";

const WelcomeSection = ({ api }) => {
  const [content, setContent] = useState({
    quote: ["Loading..."],
    heading: "Loading...",
    paragraph: ["Loading..."],
    image: welcomePhoto,
  });

  useEffect(() => {
    api
      .get("/api/homepage-welcome/")
      .then((response) => {
        // Set the retrieved content in the state
        const responseData = response.data;
        setContent({
          quote: parseStringToParagraphsByNewline(responseData.quote),
          heading: responseData.heading,
          paragraph: parseStringToParagraphsByNewline(responseData.paragraph),
          image: responseData.image,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [api]);

  return (
    <div className="welcome-section">
      {/* <div className="quote-wrapper">
        {content.quote.map((paragraph) => (
          <p className="welcome-quote">{paragraph}</p>
        ))}
      </div>

      <img
        src={magnoliaFlower}
        alt="Magnolia Flower"
        className="magnolia-flower"
      /> */}
      <h2>{content.heading}</h2>
      <div className="welcome-body">
        <div className="body-content">
          {content.paragraph.map((paragraph) => (
            <p>{paragraph}</p>
          ))}
        </div>

        <img className="welcome-cake" src={content.image} alt="welcome cake" />
      </div>
    </div>
  );
};

export default WelcomeSection;
