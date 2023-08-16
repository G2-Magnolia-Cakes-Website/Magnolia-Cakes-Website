import React from "react";
import { aboutUsPortrait } from "../../../utils/cover";
import SquareButton from "../../SquareButton/SquareButton";
import { useNavigate } from "react-router-dom";
import { PAGELINKS } from "../../../utils/constants";

import "./AboutUsSection.css";

const AboutUsSection = () => {
  const navigate = useNavigate();

  const onReadMoreButtonClick = () => {
    navigate(PAGELINKS.ABOUT_US_LINK);
  };

  return (
    <div className="about-us-section">
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
        <SquareButton buttonText="Read More" onClick={onReadMoreButtonClick} />
      </div>
      <img src={aboutUsPortrait} alt="About Us" />
    </div>
  );
};

export default AboutUsSection;
