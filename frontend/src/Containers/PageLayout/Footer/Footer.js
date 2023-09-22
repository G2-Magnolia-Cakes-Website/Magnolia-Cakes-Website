import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FooterSection from "./FooterSection/FooterSection";
import { FOOTERSECTIONS, PAGELINKS } from "utils/constants";
import SocialMediaLink from "Components/SocialMediaLink/SocialMediaLink";
import "./Footer.css";
// import magnoliaCakeLogo from "utils/Magnolia_Cake_logo.png";

const Footer = ({ api }) => {
  const [location, setLocation] = useState({
    section_heading: FOOTERSECTIONS.OUR_LOCATION,
    location_address: "Melbourne, VIC",
  });
  const [contact, setContact] = useState({
    section_heading: FOOTERSECTIONS.CONTACT_US,
    contact_us_info: "",
  });
  const [businessHrs, setBusinessHrs] = useState([]);
  const [socialMedias, setSocialMedias] = useState([]);

  useEffect(() => {
    // Make a GET request using the passed api instance
    api
      .get("/api/footer-location/")
      .then((response) => {
        // Set the retrieved content in the state
        setLocation(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    api
      .get("api/footer-contact-us/")
      .then((response) => {
        // Set the retrieved content in the state
        setContact(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    api
      .get("api/footer-business-hrs/")
      .then((response) => {
        // Set the retrieved content in the state
        setBusinessHrs(
          parseLineSeperatedString(response.data.business_hrs_info)
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    api
      .get("api/social-medias/")
      .then((response) => {
        // Set the retrieved content in the state
        setSocialMedias(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [api]);

  const parseLineSeperatedString = (content) => {
    return content.replaceAll("\r", "").split("\n");
  };

  return (
    <div className="footer">
      <div className="footer-row">
        <FooterSection headerText={location.section_heading}>
          <p>{location.location_address}</p>
          <Link to={PAGELINKS.LOCATION_LINK}>Click here to view map</Link>
        </FooterSection>
        <FooterSection headerText={contact.section_heading}>
          {parseLineSeperatedString(contact.contact_us_info).map((info) => (
            <p key={contact.contact_us_info.indexOf(info)}>{info}</p>
          ))}
        </FooterSection>
        <FooterSection headerText={FOOTERSECTIONS.FOLLOW_US}>
          <div className="social-medias">
            {socialMedias.map((platform) => (
              <SocialMediaLink
                key={platform.id}
                socialMedia={platform.social_media_platform}
                account_name={platform.account_name}
                account_link={platform.account_link}
              />
            ))}
          </div>
        </FooterSection>
      </div>
      <hr></hr>
      <div className="footer-row">
        <FooterSection>
          <div className="business-hours">
            {businessHrs.map((info) => (
              <p key={businessHrs.indexOf(info)}>{info}</p>
            ))}
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
