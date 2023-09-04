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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at rutrum
          massa. Aliquam faucibus id lacus nec hendrerit. Nunc ac justo eget
          nibh lobortis pellentesque id eget sapien. In id placerat dui.
          Vestibulum sollicitudin turpis magna, vel convallis mi dictum in.
          Pellentesque consequat suscipit velit. Pellentesque vestibulum dui
          tellus, non vehicula erat efficitur nec. Nunc ullamcorper eu metus a
          sodales. Integer vitae bibendum ligula.
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
