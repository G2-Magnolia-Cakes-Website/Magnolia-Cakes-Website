import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PAGELINKS } from "utils/constants";
import { User } from "utils/icons";

import "./ProfileLink.css";

const ProfileLink = ({ isMenuOpen }) => {
  return (
    <Link
      className={isMenuOpen ? "profile-link menu-open" : "profile-link"}
      to={PAGELINKS.PROFILE_LINK}
    >
      <img src={User} alt="Profile" className="profile-icon" />
    </Link>
  );
};

export default ProfileLink;
