import React from "react";
import { Link } from "react-router-dom";
import FooterSection from "./FooterSection/FooterSection";
import { FOOTERSECTIONS, PAGELINKS, SOCIALMEDIAS } from "utils/constants";
import SocialMediaLink from "Components/SocialMediaLink/SocialMediaLink";
import "./Footer.css";
// import magnoliaCakeLogo from "utils/Magnolia_Cake_logo.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-row">
        <FooterSection headerText={FOOTERSECTIONS.OUR_LOCATION}>
          <p>Melbourne Victoria 3752</p>
          <Link to={PAGELINKS.LOCATION_LINK}>Click here to view map</Link>
        </FooterSection>
        <FooterSection headerText={FOOTERSECTIONS.CONTACT_US}>
          <p>Email: magnolia.cake.au@gmail.com</p>
          <p>Phone: 0422-733-882</p>
        </FooterSection>
        <FooterSection headerText={FOOTERSECTIONS.FOLLOW_US}>
          <div className="social-medias">
            <SocialMediaLink socialMedia={SOCIALMEDIAS.FACEBOOK} />
            <SocialMediaLink socialMedia={SOCIALMEDIAS.INSTAGRAM} />
          </div>
        </FooterSection>
      </div>
      <hr></hr>
      <div className="footer-row">
        <FooterSection>
          <div className="business-hours">
            <p>Business Hours</p>
            <p>Monday - Friday</p>
            <p>9:00 am - 18:00 pm</p>
            <p>Saturday - Sunday</p>
            <p>9:00 am - 17:00 pm</p>
          </div>
        </FooterSection>
        <FooterSection>
          <Link to={PAGELINKS.TERMS_AND_CONDITIONS_LINK}>
            {FOOTERSECTIONS.TERMS_AND_CONDITIONS}
          </Link>
          <Link to={PAGELINKS.FAQ}>{FOOTERSECTIONS.FAQ}</Link>
        </FooterSection>
        <FooterSection>
          <p>Magnolia Cakes and Cupcakes</p>
        </FooterSection>
      </div>
    </div>
  );
};

export default Footer;
