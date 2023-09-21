import React from "react";
import { Link } from "react-router-dom";
import { PAGELINKS } from "utils/constants";
import "./ProfileLink.css";

const ProfileLink = ({ user }) => {
    return (
      <Link className="profile-link" to={PAGELINKS.PROFILE_LINK}>
        {user ? `${user.first_name} ${user.last_name}` : "User Profile"}
      </Link>
    );
  };
  
  export default ProfileLink;