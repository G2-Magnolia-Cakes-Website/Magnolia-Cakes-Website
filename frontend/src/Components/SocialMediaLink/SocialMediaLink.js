import React from "react";
import { SOCIALMEDIAS } from "utils/constants";
import { Facebook, Instagram } from "utils/icons";
import "./SocialMediaLink.css";

const SocialMediaLink = (props) => {
  const { socialMedia, account_name, account_link } = props;

  const getSocialMediaSVG = () => {
    switch (socialMedia) {
      case SOCIALMEDIAS.FACEBOOK:
        return Facebook;
      case SOCIALMEDIAS.INSTAGRAM:
        return Instagram;
      default:
        throw new Error(`Invalid argument ${socialMedia}`);
    }
  };
  return (
    <div className="social-media-wrapper">
      <a href={account_link} target="_blank" rel="noreferrer">
        <img
          className="social-media-logo"
          src={getSocialMediaSVG()}
          alt={socialMedia}
        />
      </a>
      <a
        className="profile-name"
        href={account_link}
        target="_blank"
        rel="noreferrer"
      >
        {account_name}
      </a>
    </div>
  );
};

export default SocialMediaLink;
