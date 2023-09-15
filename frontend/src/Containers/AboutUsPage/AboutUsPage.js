import React from "react";
import { aboutUsPortrait } from "utils/cover";

import "./AboutUsPage.css";

const AboutUsPage = ({ api }) => {
  return (
    <div className="about-us-page">
      <div className="portrait-wrapper">
        <img
          className="about-us-portrait"
          src={aboutUsPortrait}
          alt="About Us Portrait"
        />
      </div>
      <div className="page-content">
        <h1>About Us</h1>
        <p>
          Greetings! I'm Magnolia. I once thought that with a master's degree in
          Biology, my days would be filled with studying cells. But life served
          up a sweeter plan: baking! <br></br> <br></br>I use cakes as my
          canvas, painting with flavors and adding intricate details.
          <br></br>
          <br></br> Established in 2020 in Melbourne, Magnolia Cakes and
          Cupcakes is my heartfelt endeavor. Whether you're after a detailed
          design, a birthday treat, a corporate theme, or even if you have a
          wild cake idea in mind, I'm here to make it happen. Quality is a
          promise I stand by. I handpick only the highest quality ingredients,
          and if you have any dietary restrictions, just let me know – I'll
          ensure your needs are met. <br></br>
          <br></br> Each cake I create isn't just a dessert; it's a cherished
          slice of someone's special moment. This dedication to quality and
          detail has blessed me with many happy customers and wonderful reviews.
          <br></br>
          <br></br> Got a cake idea, whether conventional or wild? Let's craft
          it together with love and care.
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
