import React from "react";
import { NavLink } from "react-router-dom";
import magnoliaCakeLogo from "utils/Magnolia_Cake_logo.png";
import "./LogoHomeLink.css";

const LogoHomeLink = (props) => {
  const { height, margin } = props;

  return (
    <NavLink to="/">
      <img
        className="logo-home-link"
        src={magnoliaCakeLogo}
        alt="Magnolia Cake Logo"
        style={{ height: height, margin: margin }}
      />
    </NavLink>
  );
};

export default LogoHomeLink;
