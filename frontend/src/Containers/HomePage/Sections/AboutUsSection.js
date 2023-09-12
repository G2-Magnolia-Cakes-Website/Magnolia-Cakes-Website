import React from "react";
import SquareButton from "Components/SquareButton/SquareButton";
import { useNavigate } from "react-router-dom";
import { PAGELINKS } from "utils/constants";
import { aboutUsPortrait } from "utils/cover";

import "./AboutUsSection.css";

const AboutUsSection2 = () => {
  const navigate = useNavigate();

  const onReadMoreButtonClick = () => {
    navigate(PAGELINKS.ABOUT_US_LINK);
  };

  return (
    <div className="about-us-section">
      <img
        className="about-us-portrait"
        src={aboutUsPortrait}
        alt="About Us Portrait"
      />
      <div className="about-us-text">
        <h2>About Us</h2>
        <p>
          Got a cake idea, whether conventional or wild? Let's craft it together
          with love and care.
        </p>
        <SquareButton
          buttonText="Read More"
          onClick={onReadMoreButtonClick}
          isUnfilled={true}
        />
      </div>
    </div>
  );
};

export default AboutUsSection2;
