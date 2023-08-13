import React from "react";
import FooterSection from "./FooterSection/FooterSection";
import { FOOTERSECTIONS, SOCIALMEDIAS } from "../../../utils/constants";
import SocialMediaLink from "../../../Components/SocialMediaLink/SocialMediaLink";
import "./Footer.css";
import magnoliaCakeLogo from "../../../utils/Magnolia_Cake_logo.png";

const Footer = () => {
  return (
    <div className="footer">
      <img className="logo" src={magnoliaCakeLogo} alt="Magnolia Cake Logo" />
      <div className="social-media-links-mobile">
        <SocialMediaLink socialMedia={SOCIALMEDIAS.FACEBOOK} />
        <SocialMediaLink socialMedia={SOCIALMEDIAS.INSTAGRAM} />
      </div>
      <div className="footer-sections-wrapper">
        <FooterSection headerText={FOOTERSECTIONS.OUR_LOCATION}>
          <p>Melbourne, VIC 3752</p>
        </FooterSection>
        <FooterSection headerText={FOOTERSECTIONS.CONTACT_US}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </FooterSection>
        <FooterSection headerText={FOOTERSECTIONS.TERMS_AND_CONDITIONS}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </FooterSection>
        <div className="social-media-links">
          <FooterSection headerText={FOOTERSECTIONS.FOLLOW_US}>
            <SocialMediaLink socialMedia={SOCIALMEDIAS.FACEBOOK} />
            <SocialMediaLink socialMedia={SOCIALMEDIAS.INSTAGRAM} />
          </FooterSection>
        </div>
      </div>
    </div>
  );
};

export default Footer;
