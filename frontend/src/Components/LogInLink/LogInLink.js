import React from "react";
import { Link } from "react-router-dom";
import { PAGELINKS } from "../../utils/constants";
import "./LogInLink.css";

const LogInLink = () => {
  return (
    <Link className="login" to={PAGELINKS.LOGIN_LINK}>
      <button>{PAGELINKS.LOGIN_TEXT}</button>
    </Link>
  );
};

export default LogInLink;
