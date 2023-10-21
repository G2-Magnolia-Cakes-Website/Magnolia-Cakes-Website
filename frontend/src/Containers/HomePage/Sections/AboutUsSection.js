import React, { useEffect, useState } from "react";
import SquareButton from "Components/SquareButton/SquareButton";
import { useNavigate } from "react-router-dom";
import { PAGELINKS } from "utils/constants";
import { aboutUsPortrait } from "utils/cover";

import "./AboutUsSection.css";

const AboutUsSection = ({ api }) => {
  const navigate = useNavigate();
  const [content, setContent] = useState({
    heading: "About Us",
    paragraph: "Loading...",
  });

  const onReadMoreButtonClick = () => {
    navigate(PAGELINKS.ABOUT_US_LINK);
  };

  useEffect(() => {
    api
      .get("/api/homepage-about-us/")
      .then((response) => {
        // Set the retrieved content in the state
        setContent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [api]);

  return (
    <div className="about-us-section">
      <img
        className="about-us-portrait"
        src={aboutUsPortrait}
        alt="About Us Portrait"
      />
      <div className="about-us-text">
        <h2>{content.heading}</h2>
        <p>{content.paragraph}</p>
        <div className="readmore-white">
          <SquareButton
            buttonText="Read More"
            onClick={onReadMoreButtonClick}
            isUnfilled={true}
          />
        </div>
        <div className="readmore-black">
          <SquareButton
            buttonText="Read More"
            onClick={onReadMoreButtonClick}
            isUnfilled={true}
            color="black"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
