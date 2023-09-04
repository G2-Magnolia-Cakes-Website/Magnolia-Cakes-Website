import React from "react";
import socialMedias from "utils/socialMedias.json";
import { SOCIALMEDIAS } from "utils/constants";
import { Facebook, Instagram } from "utils/icons";
import "./SocialMediaLink.css";

const SocialMediaLink = (props) => {
  const { socialMedia } = props;

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

  const socialMediaDetails = socialMedias.find(
    (s) => s.socialMedia === socialMedia
  );

  const { profileName, url } = socialMediaDetails;

  return (
    <div className="social-media-wrapper">
      <a href={url} target="_blank" rel="noreferrer">
        <img
          className="social-media-logo"
          src={getSocialMediaSVG()}
          alt={socialMedia}
        />
      </a>
      <a className="profile-name" href={url} target="_blank" rel="noreferrer">
        {profileName}
      </a>
    </div>
  );
};

export default SocialMediaLink;
